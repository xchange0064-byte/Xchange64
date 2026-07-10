'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ListingDetail() {
  const supabase = createClient()
  const { id } = useParams()
  const router = useRouter()
  const [listing, setListing] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    supabase.from('listings').select('*').eq('id', id).single().then(({ data }) => {
      setListing(data)
      setLoading(false)
    })
  }, [id])

  async function markSold() {
    await supabase.from('listings').update({ status: 'sold' }).eq('id', id)
    router.push('/')
  }

  async function deleteListing() {
    await supabase.from('listings').delete().eq('id', id)
    router.push('/')
  }

  if (loading) return <div className="container"><p style={{opacity:0.6, marginTop:40}}>Loading...</p></div>
  if (!listing) return <div className="container"><p style={{marginTop:40}}>Listing not found.</p></div>

  const isOwner = user && user.id === listing.seller_id

  return (
    <div className="container">
      <div className="topbar" style={{padding:'22px 0'}}>
        <Link href="/" className="logo">Madhu<span>giri</span></Link>
      </div>

      <div className="detail-grid">
        <img src={listing.image_url || 'https://placehold.co/600x600/2B1D12/F4E8D6?text=Madhugiri'} alt={listing.title} />
        <div>
          <h1>{listing.title}</h1>
          <p style={{color:'var(--gold-soft)', fontSize:'1.4rem', fontWeight:600, marginTop:12}}>₹{listing.price}</p>
          <p style={{opacity:0.6, marginTop:6}}>{listing.location}</p>
          <p style={{marginTop:20, lineHeight:1.6}}>{listing.description}</p>

          {listing.status === 'sold' && <p style={{marginTop:16, color:'#f3a8a8'}}>This item has been marked sold.</p>}

          {isOwner ? (
            <div style={{display:'flex', gap:12, marginTop:24}}>
              {listing.status !== 'sold' && <button className="btn btn-primary" onClick={markSold}>Mark as sold</button>}
              <button className="btn" onClick={deleteListing}>Delete listing</button>
            </div>
          ) : (
            <Link href={user ? `/chat/${listing.id}` : '/login'} className="btn btn-primary" style={{display:'inline-block', marginTop:24}}>
              Message seller
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
