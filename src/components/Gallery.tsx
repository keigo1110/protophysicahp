'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const images = [
  { id: 1, src: '/video1.gif', title: 'アメーバの動き' },
  { id: 2, src: '/video2.gif', title: 'ゾウリムシの遊泳' },
  { id: 3, src: '/video3.gif', title: '原生動物の群れ' },
  { id: 4, src: '/video4.gif', title: '細胞分裂の瞬間' },
  { id: 5, src: '/video5.gif', title: '微生物の世界' },
  { id: 6, src: '/video6.gif', title: '原生生物の捕食' },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<{ id: number; src: string; title: string } | null>(null)

  return (
    <section id="gallery" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">ギャラリー</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image) => (
            <motion.div
              key={image.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedImage(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-semibold">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-4xl w-full">
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="w-full"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setSelectedImage(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}