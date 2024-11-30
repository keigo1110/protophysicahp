import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed w-full z-10 bg-black bg-opacity-50 backdrop-blur-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Protophysica</Link>
        <ul className="flex space-x-6">
          <li><Link href="#protophysica" className="hover:text-green-400 transition-colors">概要</Link></li>
          <li><Link href="#exhibitions" className="hover:text-green-400 transition-colors">展覧会</Link></li>
        </ul>
      </nav>
    </header>
  )
}