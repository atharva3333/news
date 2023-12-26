import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { ArticleProvider } from './context/ArticleContext'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'News App',
  description: 'Get latest news online',
}

export default function RootLayout({ children }) {
  return (
    <ArticleProvider>
    <html lang="en">
      <body className={inter.className}>
      <Navigation/>
      {children}</body>
    </html>
    </ArticleProvider>
  )
}
