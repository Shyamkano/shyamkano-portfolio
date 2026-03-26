import Navbar from '../../components/Navbar';
import ExperienceTimeline from '../../components/ExperienceTimeline';

export default function JourneyPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <div>
        <ExperienceTimeline />
      </div>
    </main>
  );
}
