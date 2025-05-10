import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8" role="contentinfo" aria-label="サイトフッター">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center justify-center space-y-6">
          <a
            href="https://4zigenhp.vercel.app/"
            className="text-xl font-bold hover:text-green-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="4ZIGENの公式サイトへ"
          >
            4ZIGEN
          </a>

          <div>
            <p>&copy; {new Date().getFullYear()} Protophysica. All rights reserved.</p>
            <p className="text-sm text-gray-400 mt-1">
              本作品は、小さくて軽くてすごいが作る可能性を提示します。
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

