import './globals.css'

export const metadata = {
  title: 'Madhugiri — Share & Exchange',
  description: 'A community exchange for honey, peanuts, mangoes, handicrafts, and more from Madhugiri town.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
