import Navbar from '../../components/Navbar';
import Contact from '../../components/Contact';

export default function ContactPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <div>
        <Contact />
      </div>
    </main>
  );
}
