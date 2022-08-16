import { useState } from 'react';
import { ContentModal, Section } from '@/components/containers';
import { Navbar } from '@/components/elements';
import { Header, About, Projects, Research, Contact } from '@/sections';
import './index.css'; // global import

const App = () => {
   const [scrollValue, setScrollValue] = useState(0);

   const handleScroll = (event) => setScrollValue(event.target.scrollTop);

   return (
      <div id="mainContainer" className="mainContainer" onScroll={handleScroll}>
         <ContentModal />
         <Navbar scrollValue={scrollValue} />
         <Section
            navId="home"
            style={{
               height: '100vh',
               background: 'var(--color-black)',
               paddingTop: '0',
            }}
         >
            <Header />
         </Section>
         <Section
            navId="about"
            hasContent
            style={{
               minHeight: 'min(100vh, 1440px)',
               maxHeight: '1440px',
               background: 'var(--color-white)',
            }}
         >
            <About />
         </Section>
         <Section
            navId="projects"
            hasContent
            style={{ background: 'var(--color-white)' }}
         >
            <Projects />
         </Section>
         <Section
            navId="research"
            hasContent
            style={{ background: 'var(--color-secondary)' }}
         >
            <Research />
         </Section>
         <Section
            navId="contact"
            hasContent
            style={{
               minHeight: '100vh',
               background: 'var(--color-white)',
            }}
         >
            <Contact />
         </Section>
      </div>
   );
}

export { App };
