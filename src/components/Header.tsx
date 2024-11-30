import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed w-full z-10 bg-black bg-opacity-50 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Protophysica</Link>
        <ul className="flex space-x-4">
          <li><Link href="#about" className="hover:text-green-400 transition-colors">概要</Link></li>
          <li><Link href="#exhibit" className="hover:text-green-400 transition-colors">展示</Link></li>
          <li><Link href="#contact" className="hover:text-green-400 transition-colors">お問い合わせ</Link></li>
        </ul>
      </nav>
    </header>
  )
}

