'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type Exhibition = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  officialLink: string;
};

const shuffleArray = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// メンバーのサイトリンク（実際のURLに置き換えてください）
const memberLinks: {[key: string]: string} = {
  "岡空来": "#",
  "金澤政宜": "https://kanassi.info/",
  "中田裕紀": "https://yuki-nakata.org/",
  "南田桂吾": "https://keigominamida.com/"
};

// 派生作品のデータ
const derivativeWorks = [
  {
    id: 1,
    title: "Protozoa",
    description: "触れると動く",
    link: "https://protozoahp.vercel.app/"
  },
  {
    id: 2,
    title: "？？？",
    description: "浮遊して止まる",
    link: "# " //ここにリンクを入れる
  }
];

const exhibitData = {
  title: "Protophysica",
  team: {
    name: "4ZIGEN",
    members: shuffleArray([
      "岡空来",
      "金澤政宜",
      "中田裕紀",
      "南田桂吾"
    ])
  },
  description: "僕らが何かを制作する時、絵の具で色を付けたり、板を切り出したり、テープを貼り付けたりするように、スーパーキャパシタを制作物に取り付ける未来が考えられないだろうか。高速に充放電できるエネルギー貯蔵装置であるスーパーキャパシタ。小型で超軽量なところも素晴らしい。接触によるほんの一瞬の給電で溜め込んだエネルギーを制作物に取り付けることで、新たな制作の可能性が広がるだろう。",
  features: [
    "長寿命で繰り返し使える！",
    "瞬時に充電・放電が可能！",
    "環境にやさしい素材！",
    "幅広い温度で安定して使える！",
    "軽量でコンパクト！"
  ],
  images: [
    { id: 0, src: '/00.jpeg', title: '東京大学制作展' },
    { id: 1, src: '/01.gif', title: '東京大学制作展' },
    { id: 2, src: '/02.gif', title: '東京大学制作展' },
    { id: 3, src: '/03.gif', title: '東京大学制作展' },
    { id: 4, src: '/04.gif', title: '東京大学制作展' },
  ],
  exhibitions: [
    {
      id: 1,
      title: "東京大学制作展2024『付いて離れて』",
      date: "2024年11月7日 - 11月11日",
      location: "東京大学 工学部2号館",
      description: "スーパーキャパシタの新しい可能性を探る",
      image: "/00.jpeg",
      officialLink: "https://www.iiiexhibition.com/"
    }
  ] as Exhibition[]
}

export default function ExhibitViewer() {
  const [mounted, setMounted] = useState(false)
  const [currentImage, setCurrentImage] = useState(exhibitData.images[0])
  const [autoPlay, setAutoPlay] = useState(true)
  const [selectedExhibition, setSelectedExhibition] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let timer: NodeJS.Timeout;
    const currentIndex = exhibitData.images.findIndex(v => v.id === currentImage.id);
    const nextIndex = (currentIndex + 1) % exhibitData.images.length;
    const delays = [5000, 11000, 12000, 10000, 13000];
    const delay = delays[currentIndex];
    timer = setTimeout(() => {
      setCurrentImage(exhibitData.images[nextIndex]);
    }, delay);
    return () => clearTimeout(timer);
  }, [currentImage, autoPlay, mounted]);

  if (!mounted) return null;

  return (
    <>
      <section id="protophysica" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">{exhibitData.title}</h1>
              <div className="text-gray-300">
              <p className="font-medium mb-2">{exhibitData.team.name}</p>
              <div className="flex justify-center gap-3">
                {exhibitData.team.members.map((member) => (
                  <a
                    key={member}
                    href={memberLinks[member]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {member}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            <div className="lg:w-2/3">
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={currentImage.src}
                    alt={`Protophysica - ${currentImage.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
                    priority={currentImage.id === 0}
                    className="object-cover"
                  />
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-end">
                  <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                    {currentImage.title}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center space-x-4">
                <div className="flex space-x-2 overflow-x-auto pb-2 px-0.5 pt-0.5">
                  {exhibitData.images.map((image) => (
                    <motion.div
                      key={image.id}
                      className="flex-shrink-0 p-0.5"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-24 h-16 bg-gray-800 rounded overflow-hidden relative ${
                          currentImage.id === image.id ? 'ring-2 ring-green-400' : ''
                        }`}
                        onClick={() => {
                          setCurrentImage(image);
                          setAutoPlay(false);
                        }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={image.src}
                            alt={`Protophysica - ${image.title} サムネイル`}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className={`text-sm font-medium py-1 px-3 rounded-full transition-colors ${
                    autoPlay
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {autoPlay ? '自動再生中' : '自動再生'}
                </button>
              </div>
            </div>
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-semibold mb-4">作品について</h2>
              <p className="text-gray-300 mb-8">{exhibitData.description}</p>
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  スーパキャパシタの特徴
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {exhibitData.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="exhibitions" className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Exhibition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {exhibitData.exhibitions.map((exhibition) => (
              <motion.div
                key={exhibition.id}
                className={`bg-gray-800 rounded-lg overflow-hidden cursor-pointer
                  ${selectedExhibition === exhibition.id ? 'ring-2 ring-green-400' : ''}`}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedExhibition(
                  selectedExhibition === exhibition.id ? null : exhibition.id
                )}
              >
                <div className="aspect-video relative">
                  <div className="relative w-full h-full">
                    <Image
                      src={exhibition.image}
                      alt={`${exhibition.title} - ${exhibition.location}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold mb-1">{exhibition.title}</h3>
                    <p className="text-gray-300">{exhibition.date}</p>
                  </div>
                </div>
                {selectedExhibition === exhibition.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="p-4"
                  >
                    <p className="text-gray-300 mb-2">
                      <span className="font-semibold">場所:</span> {exhibition.location}
                    </p>
                    <div className="mt-4">
                      <a
                        href={exhibition.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors"
                      >
                        公式サイト
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="derivative-works" className="py-16 bg-black overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            follow-up works
          </motion.h2>

          {/* デスクトップ用マインドマップ */}
          <div className="relative w-full hidden md:block" style={{ height: "450px" }}>
            <MapSVG />
          </div>

          {/* モバイル用カードビュー */}
          <div className="md:hidden">
            <div className="space-y-8">
              {/* 親ノード - モバイル */}
              <MobileCard
                title="Protophysica"
                description="キャパシタ制作"
                type="parent"
                delay={0.1}
              />

              {/* 子ノード - モバイル */}
              <div className="pl-8 border-l-2 border-green-500 space-y-8">
                {derivativeWorks.map((work, index) => (
                  <MobileCard
                    key={work.id}
                    title={work.title}
                    description={work.description}
                    type="child"
                    delay={0.2 + index * 0.1}
                    link={work.link}
                  />
                ))}
              </div>

              {/* 未来の暗示 - 点線 */}
              <div className="h-12 ml-8 border-l-2 border-dashed border-gray-600"></div>
            </div>
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            viewport={{ once: true }}
          >
          </motion.div>
        </div>
      </section>
    </>
  )
}

// モバイル用カードコンポーネント
interface MobileCardProps {
  title: string;
  description: string;
  type: 'parent' | 'child' | 'future';
  delay: number;
  link?: string;
}

const MobileCard = ({ title, description, type, delay, link }: MobileCardProps) => {
  const cardContent = (
    <>
      <h3 className={`font-bold mb-2 ${
        type === 'parent' ? 'text-white text-2xl' :
        type === 'child' ? 'text-green-400 text-xl' :
        'text-gray-300 text-xl'
      }`}>
        {title}
      </h3>
      <p className={`${
        type === 'parent' ? 'text-gray-300 text-base' :
        'text-gray-400 text-base'
      }`}>
        {description}
      </p>
    </>
  );

  // リンクがある場合はaタグでラップ、ない場合は通常のdiv
  const CardWrapper = link ? (
    <motion.a
      href={link}
      className={`block p-5 rounded-lg ${
        type === 'parent' ? 'bg-gray-800 border-2 border-green-500' :
        type === 'child' ? 'bg-gray-800 hover:bg-gray-700 transition-colors' :
        'bg-gray-900 opacity-80'
      }`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      viewport={{ once: true }}
    >
      {cardContent}
    </motion.a>
  ) : (
    <motion.div
      className={`p-5 rounded-lg ${
        type === 'parent' ? 'bg-gray-800 border-2 border-green-500' :
        type === 'child' ? 'bg-gray-800' :
        'bg-gray-900 opacity-80'
      }`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
      viewport={{ once: true }}
    >
      {cardContent}
    </motion.div>
  );

  return CardWrapper;
};

// SVGマインドマップコンポーネント
const MapSVG = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref}>
      <svg className="w-full h-full" viewBox="0 0 1200 450" xmlns="http://www.w3.org/2000/svg">
        {/* 親ノード (左) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <rect x="100" y="200" width="200" height="110" rx="15" fill="#1F2937" stroke="#10B981" strokeWidth="2" />
          <text x="200" y="245" textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="28" fontWeight="bold">Protophysica</text>
          <text x="200" y="280" textAnchor="middle" dominantBaseline="middle" fill="#9CA3AF" fontSize="18">キャパシタ制作</text>
        </motion.g>

        {/* 中央への接続線 (上) */}
        <motion.path
          d="M300 230 L420 150"
          stroke="#10B981" strokeWidth="3" fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        />

        {/* 子ノード 1 (中央上) - クリック可能 */}
        <motion.a
          href={derivativeWorks[0].link}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="cursor-pointer"
          whileTap={{ scale: 0.98 }}
        >
          <motion.rect
            x="420" y="110" width="210" height="90" rx="15"
            fill="#1F2937" stroke="#10B981" strokeWidth="2"
            whileHover={{ fill: "#2D3748", stroke: "#34D399" }}
          />
          <text x="525" y="145" textAnchor="middle" dominantBaseline="middle" fill="#10B981" fontSize="24" fontWeight="bold">{derivativeWorks[0].title}</text>
          <foreignObject x="430" y="160" width="190" height="30">
            <div style={{ textAlign: 'center', color: 'white', fontSize: '16px' }}>
              {derivativeWorks[0].description}
            </div>
          </foreignObject>
        </motion.a>

        {/* 中央への接続線 (下) */}
        <motion.path
          d="M300 280 L420 290"
          stroke="#10B981" strokeWidth="3" fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 0.8, duration: 0.7 }}
        />

        {/* 子ノード 2 (中央下) - クリック可能 */}
        <motion.a
          href={derivativeWorks[1].link}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="cursor-pointer"
          whileTap={{ scale: 0.98 }}
        >
          <motion.rect
            x="420" y="250" width="210" height="90" rx="15"
            fill="#1F2937" stroke="#10B981" strokeWidth="2"
            whileHover={{ fill: "#2D3748", stroke: "#34D399" }}
          />
          <text x="525" y="285" textAnchor="middle" dominantBaseline="middle" fill="#10B981" fontSize="24" fontWeight="bold">{derivativeWorks[1].title}</text>
          <foreignObject x="430" y="300" width="190" height="30">
            <div style={{ textAlign: 'center', color: 'white', fontSize: '16px' }}>
              {derivativeWorks[1].description}
            </div>
          </foreignObject>
        </motion.a>

        {/* 右側への続きを示す点線 (上) */}
        <motion.path
          d="M630 150 L850 150"
          stroke="#6B7280" strokeWidth="3" strokeDasharray="6,6" fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        />

        {/* 右側への続きを示す点線 (下) */}
        <motion.path
          d="M630 290 L850 290"
          stroke="#6B7280" strokeWidth="3" strokeDasharray="6,6" fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        />

        {/* 説明テキスト */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <text x="200" y="340" textAnchor="middle" dominantBaseline="middle" fill="#9CA3AF" fontSize="18">原点</text>
          <text x="525" y="220" textAnchor="middle" dominantBaseline="middle" fill="#9CA3AF" fontSize="18">現在</text>
        </motion.g>
      </svg>
    </div>
  );
};