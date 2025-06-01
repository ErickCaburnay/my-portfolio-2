import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
})

export const metadata = {
  title: 'Erick Caburnay | Portfolio',
  description: 'A modern portfolio website showcasing web development projects and UI/UX designs',
  keywords: 'web developer, portfolio, UI/UX designer, frontend developer, React, Next.js',
  author: 'Erick Jefferson R. Caburnay',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://unpkg.com/boxicons@latest/css/boxicons.min.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={poppins.className}>
        <div className="fixed-bg"></div>
        {children}
      </body>
    </html>
  )
}