import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import ResearchSection from '../components/ResearchSection';
import GitHubActivity from '../components/GitHubActivity';
import ExperienceTimeline from '../components/ExperienceTimeline';
import CallToAction from '../components/CallToAction';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      
      <section id="about">
        <About />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="research">
        <ResearchSection />
      </section>

      <section id="skills">
        <Skills />
      </section>

      <section id="activity">
        <GitHubActivity />
      </section>

      <section id="journey">
        <ExperienceTimeline />
      </section>

      <section id="cta">
        <CallToAction />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
