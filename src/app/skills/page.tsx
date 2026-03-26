import Navbar from '../../components/Navbar';
import Skills from '../../components/Skills';

export default function SkillsPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <div>
        <Skills />
      </div>
    </main>
  );
}
