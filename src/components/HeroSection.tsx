export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute w-full h-full object-cover"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        お使いのブラウザは動画タグをサポートしていません。
      </video>
      <div className="relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-pulse">
          原生生物の世界
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          微小な生命の神秘と美しさを探求する
        </p>
        <a
          href="#gallery"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
        >
          作品を見る
        </a>
      </div>
    </section>
  )
}

