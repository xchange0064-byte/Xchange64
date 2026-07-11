'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Login() {
  const supabase = createClient()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('email')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function sendOtp(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithOtp({ email })
    setLoading(false)
    if (error) { setError(error.message); return }
    setStep('otp')
  }

  async function verifyOtp(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: 'email'
    })
    setLoading(false)
    if (error) { setError(error.message); return }
    const user = data.user
    await supabase.from('profiles').upsert({ id: user.id, phone: email })
    router.push('/')
  }

  return (
    <div className="container">
      <div className="topbar" style={{padding:'22px 0'}}>
        <Link href="/" className="logo">Madhu<span>giri</span></Link>
      </div>

      {step === 'email' ? (
        <form className="panel" onSubmit={sendOtp}>
          <h2>Sign in</h2>
          <p style={{opacity:0.6, fontSize:'0.85rem', marginTop:-8, marginBottom:8}}>
            A community exchange from Madhugiri town
          </p>
          <label>Email address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button className="btn btn-primary" style={{width:'100%', marginTop:20}} disabled={loading}>
            {loading ? 'Sending code...' : 'Send code'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      ) : (
        <form className="panel" onSubmit={verifyOtp}>
          <h2>Enter the code</h2>
          <label>We emailed a 6-digit code to {email}</label>
          <input
            type="text"
            placeholder="123456"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            required
          />
          <button className="btn btn-primary" style={{width:'100%', marginTop:20}} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify & sign in'}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  )
}
