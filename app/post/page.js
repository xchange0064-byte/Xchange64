'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PostListing() {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('other')
  const [location, setLocation] = useState('')
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
      else setUser(data.user)
    })
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    let image_url = null
    if (file) {
      const fileName = `${user.id}-${Date.now()}-${file.name}`
      const { error: uploadError } = await supabase.storage.from('listing-photos').upload(fileName, file)
      if (uploadError) { setError(uploadError.message); setLoading(false); return }
      const { data } = supabase.storage.from('listing-photos').getPublicUrl(fileName)
      image_url = data.publicUrl
    }

    const { error: insertError } = await supabase.from('listings').insert({
      seller_id: user.id,
      title,
      description,
      price: parseFloat(price),
      category,
      location,
      image_url,
    })

    setLoading(false)
    if (insertError) { setError(insertError.message); return }
    router.push('/')
  }

  return (
    <div className="container">
      <div className="topbar" style={{padding:'22px 0'}}>
        <Link href="/" className="logo">Madhu<span>giri</span></Link>
      </div>

      <form className="panel" onSubmit={handleSubmit}>
        <h2>Share an item</h2>

        <label>Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Fresh raw honey, 1kg jar" />

        <label>Description</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Where it's from, freshness, anything a buyer should know" />

        <label>Price (₹)</label>
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} required placeholder="200" />

        <label>Category</label>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="honey">Honey</option>
          <option value="peanuts">Peanuts</option>
          <option value="mangoes">Mangoes</option>
          <option value="sericulture">Sericulture / Silk</option>
          <option value="handicrafts">Handicrafts</option>
          <option value="farm-tools">Farm tools</option>
          <option value="books">Books</option>
          <option value="other">Other</option>
        </select>

        <label>Location</label>
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Area in Madhugiri" />

        <label>Photo</label>
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />

        <button className="btn btn-primary" style={{width:'100%', marginTop:24}} disabled={loading}>
          {loading ? 'Posting...' : 'Post listing'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}
