import Header from '../components/Header';
import ExhibitViewer from '../components/ExhibitViewer';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="pt-16">
        <ExhibitViewer />
      </main>
      <Footer />
    </div>
  )
}

