import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';
import BlogsSection from '../../components/BlogsSection';

export const metadata: Metadata = {
  title: 'Digital Narratives | Shyamkano Portfolio',
  description: 'Explore technical breakdowns, research papers, and architectural insights directly synchronized from the LUMEN publishing engine.',
};

export default function BlogsPage() {
  return (
    <main style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />
      <div>
        <BlogsSection />
      </div>
    </main>
  );
}
