'use client'
import { useEffect, useState, useRef } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Chat() {
  const supabase = createClient()
  const { id } = useParams()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [body, setBody] = useState('')
  const [listing, setListing] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/login'); return }
      setUser(data.user)
    })
    supabase.from('listings').select('*').eq('id', id).single().then(({ data }) => setListing(data))
    loadMessages()

    const channel = supabase
      .channel(`messages-${id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `listing_id=eq.${id}` }, payload => {
        setMessages(prev => [...prev, payload.new])
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function loadMessages() {
    const { data } = await supabase.from('messages').select('*').eq('listing_id', id).order('created_at', { ascending: true })
    setMessages(data || [])
  }

  async function sendMessage(e) {
    e.preventDefault()
    if (!body.trim()) return
    await supabase.from('messages').insert({ listing_id: id, sender_id: user.id, body })
    setBody('')
  }

  return (
    <div className="container">
      <div className="topbar" style={{padding:'22px 0'}}>
        <Link href="/" className="logo">Madhu<span>giri</span></Link>
      </div>

      <h2 style={{marginBottom:8}}>{listing ? `About: ${listing.title}` : 'Chat'}</h2>
      <p style={{opacity:0.6, marginBottom:24}}>Messages here are only visible to you and the seller.</p>

      <div className="chat-box">
        {messages.length === 0 && <p style={{opacity:0.5, fontSize:'0.9rem'}}>Say hello to start the conversation.</p>}
        {messages.map(m => (
          <div key={m.id} className={`msg ${m.sender_id === user?.id ? 'mine' : 'theirs'}`}>
            {m.body}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={sendMessage} style={{display:'flex', gap:10, marginTop:16, maxWidth:480}}>
        <input
          style={{flex:1, background:'var(--panel)', border:'1px solid var(--line)', color:'var(--cream)', padding:'12px 16px', borderRadius:10}}
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Type a message..."
        />
        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  )
}
