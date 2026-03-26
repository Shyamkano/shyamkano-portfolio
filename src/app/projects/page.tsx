import Navbar from '../../components/Navbar';
import Projects from '../../components/Projects';

export default function ProjectsPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <div>
        <Projects />
      </div>
    </main>
  );
}
