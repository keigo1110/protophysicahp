import Header from '../components/Header';
import ExhibitViewer from '../components/ExhibitViewer';
import Footer from '../components/Footer';
import Script from 'next/script';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-16">
        <ExhibitViewer />
      </main>
      <Footer />

      {/* 構造化データ (JSON-LD) */}
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: 'Protophysica',
            description: 'Protophysicaは、スーパーキャパシタの新しい可能性を提示し、デジタルアートの未来を切り開きます。高速充放電、長寿命、環境に優しい特徴を持つスーパーキャパシタ技術を活用した革新的な作品です。',
            creator: {
              '@type': 'Organization',
              name: '4ZIGEN',
              url: 'https://4zigenhp.vercel.app/'
            },
            image: 'https://protophysicahp.vercel.app/00.jpeg',
            dateCreated: '2024',
            keywords: 'Protophysica, スーパーキャパシタ, 4ZIGEN, デジタルアート, メディアアート',
            subjectOf: {
              '@type': 'Event',
              name: '東京大学制作展2024『付いて離れて』',
              startDate: '2024-11-07',
              endDate: '2024-11-11',
              location: {
                '@type': 'Place',
                name: '東京大学 工学部2号館',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: '東京',
                  addressCountry: 'JP'
                }
              },
              organizer: {
                '@type': 'Organization',
                name: '東京大学制作展',
                url: 'https://www.iiiexhibition.com/'
              }
            },
            isPartOf: {
              '@type': 'CreativeWorkSeries',
              name: 'Protophysica Series',
              hasPart: [
                {
                  '@type': 'CreativeWork',
                  name: 'Protozoa',
                  url: 'https://protozoahp.vercel.app/',
                  description: '触れると動く'
                },
                {
                  '@type': 'CreativeWork',
                  name: '？？？',
                  description: '浮遊して止まる'
                }
              ]
            }
          })
        }}
      />
    </div>
  )
}

