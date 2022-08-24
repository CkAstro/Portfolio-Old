import { useState } from 'react';
import { ContentModal, Section } from '@/components/containers';
import { Navbar } from '@/components/elements';
import { Header, About, Projects, Research, Contact } from '@/sections';
import './index.css'; // global import

export const App = () => {
   const [scrollValue, setScrollValue] = useState(0);

   const handleScroll = (event: any) => setScrollValue(event.target.scrollTop);

   return (
      <div id="mainContainer" className="mainContainer" onScroll={handleScroll}>
         <ContentModal />
         <Navbar scrollValue={scrollValue} />
         <Section
            navId="home"
            hasContent={false}
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
            hasContent={true}
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
            hasContent={true}
            style={{ background: 'var(--color-white)' }}
         >
            <Projects />
         </Section>
         <Section
            navId="research"
            hasContent={true}
            style={{ background: 'var(--color-secondary)' }}
         >
            <Research />
         </Section>
         <Section
            navId="contact"
            hasContent={true}
            style={{
               minHeight: '100vh',
               background: 'var(--color-white)',
            }}
         >
            <Contact />
         </Section>
      </div>
   );
};
