'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const videos = [
  { id: 1, src: '/video1.mp4', title: 'アメーバの動き' },
  { id: 2, src: '/video2.mp4', title: 'ゾウリムシの遊泳' },
  { id: 3, src: '/video3.mp4', title: '原生動物の群れ' },
  { id: 4, src: '/video4.mp4', title: '細胞分裂の瞬間' },
  { id: 5, src: '/video5.mp4', title: '微生物の世界' },
  { id: 6, src: '/video6.mp4', title: '原生生物の捕食' },
]

export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState<{ id: number; src: string; title: string } | null>(null)

  return (
    <section id="gallery" className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8 text-center">ギャラリー</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <video
                src={video.src}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <h3 className="text-xl font-semibold">{video.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="max-w-4xl w-full">
            <video
              src={selectedVideo.src}
              className="w-full"
              controls
              autoPlay
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setSelectedVideo(null)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

