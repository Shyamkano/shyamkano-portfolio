import Navbar from '../../components/Navbar';
import About from '../../components/About';

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <div>
        <About />
      </div>
    </main>
  );
}
