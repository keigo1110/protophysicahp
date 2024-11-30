'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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
              <p className="text-sm">
                {exhibitData.team.members.join(' / ')}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 mb-16">
            <div className="lg:w-2/3">
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={currentImage.src}
                  alt={currentImage.title}
                  className="w-full h-full object-cover"
                />
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
                        className={`w-24 h-16 bg-gray-800 rounded overflow-hidden ${
                          currentImage.id === image.id ? 'ring-2 ring-green-400' : ''
                        }`}
                        onClick={() => {
                          setCurrentImage(image);
                          setAutoPlay(false);
                        }}
                      >
                        <img
                          src={image.src}
                          alt={image.title}
                          className="w-full h-full object-cover"
                        />
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
                  <img
                    src={exhibition.image}
                    alt={exhibition.title}
                    className="w-full h-full object-cover"
                  />
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
    </>
  )
}