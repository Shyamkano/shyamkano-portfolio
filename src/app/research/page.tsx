import Navbar from '../../components/Navbar';
import ResearchSection from '../../components/ResearchSection';

export default function ResearchPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <div>
        <ResearchSection />
      </div>
    </main>
  );
}
