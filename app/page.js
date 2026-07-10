'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import Link from 'next/link'

export default function Home() {
  const supabase = createClient()
  const [listings, setListings] = useState([])
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    fetchListings()
  }, [])

  async function fetchListings() {
    setLoading(true)
    let q = supabase.from('listings').select('*').eq('status', 'active').order('created_at', { ascending: false })
    const { data } = await q
    setListings(data || [])
    setLoading(false)
  }

  const filtered = listings.filter(l => {
    const matchesQuery = l.title.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = category ? l.category === category : true
    return matchesQuery && matchesCategory
  })

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <>
      <div className="topbar">
        <Link href="/" className="logo">Madhu<span>giri</span></Link>
        <div className="nav-actions">
          {user ? (
            <>
              <Link href="/post" className="btn btn-primary">Share an item</Link>
              <button className="btn" onClick={signOut}>Sign out</button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">Sign in</Link>
          )}
        </div>
      </div>

      <div className="container">
        <div className="search-bar">
          <input
            placeholder="Search for items..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All categories</option>
            <option value="honey">Honey</option>
            <option value="peanuts">Peanuts</option>
            <option value="mangoes">Mangoes</option>
            <option value="sericulture">Sericulture / Silk</option>
            <option value="handicrafts">Handicrafts</option>
            <option value="farm-tools">Farm tools</option>
            <option value="books">Books</option>
            <option value="other">Other</option>
          </select>
        </div>

        {loading ? (
          <p style={{opacity:0.6}}>Loading listings...</p>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No listings yet</h3>
            <p>Be the first in Madhugiri to share something.</p>
          </div>
        ) : (
          <div className="grid">
            {filtered.map(item => (
              <Link key={item.id} href={`/listing/${item.id}`} className="card">
                <img src={item.image_url || 'https://placehold.co/400x400/2B1D12/F4E8D6?text=Madhugiri'} alt={item.title} />
                <div className="card-body">
                  <h3>{item.title}</h3>
                  <div className="price">${item.price}</div>
                  <div className="meta">{item.location || 'Location not set'}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
