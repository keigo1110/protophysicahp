'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const exhibitData = {
  title: "Protophysica",
  description: "僕らが何かを制作する時、絵の具で色を付けたり、板を切り出したり、テープを貼り付けたりするように、スーパーキャパシタを制作物に取り付ける未来が考えられないだろうか。高速に充放電できるエネルギー貯蔵装置であるスーパーキャパシタ。小型で超軽量なところも素晴らしい。接触によるほんの一瞬の給電で溜め込んだエネルギーを制作物に取り付けることで、新たな制作の可能性が広がるだろう。",
  images: [
    { id: 0, src: '/00.jpeg', title: '東京大学制作展' },
    { id: 1, src: '/01.gif', title: '東京大学制作展' },
    { id: 2, src: '/02.gif', title: '東京大学制作展' },
    { id: 3, src: '/03.gif', title: '東京大学制作展' },
    { id: 4, src: '/04.gif', title: '東京大学制作展' },
  ]
}

export default function ExhibitViewer() {
  const [mounted, setMounted] = useState(false)
  const [currentImage, setCurrentImage] = useState(exhibitData.images[0])
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let timer: NodeJS.Timeout;
    if (autoPlay) {
      timer = setTimeout(() => {
        const nextIndex = (exhibitData.images.findIndex(v => v.id === currentImage.id) + 1) % exhibitData.images.length;
        setCurrentImage(exhibitData.images[nextIndex]);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [currentImage, autoPlay, mounted]);

  if (!mounted) {
    return (
      <section id="exhibit" className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">{exhibitData.title}</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden" />
            </div>
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-semibold mb-4">作品について</h2>
              <p className="text-gray-300 mb-6">{exhibitData.description}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="exhibit" className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">{exhibitData.title}</h1>
        <div className="flex flex-col lg:flex-row gap-8">
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
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {exhibitData.images.map((image) => (
                  <motion.button
                    key={image.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 w-24 h-16 bg-gray-800 rounded overflow-hidden ${
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
            <p className="text-gray-300 mb-6">{exhibitData.description}</p>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                スーパキャパシタの特徴
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>長寿命で繰り返し使える！</li>
                <li>瞬時に充電・放電が可能！</li>
                <li>環境にやさしい素材！</li>
                <li>幅広い温度で安定して使える！</li>
                <li>軽量でコンパクト！</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}