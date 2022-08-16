import { useRef } from 'react';
import { Link } from 'react-scroll';
import { Icons } from '@/components/elements';
import { useIsVisible } from '@/hooks';
import css from './About.module.css';

function IntroContainer() {
   const divRef = useRef(null);
   const isVisible = useIsVisible(divRef, true);

   return (
      <div
         ref={divRef}
         style={{ color: 'var(--color-black)' }}
         className={`${css.introContainer} ${isVisible ? css.active : null}`}
      >
         <h1 style={{ fontWeight: '100', color: 'var(--color-primary)' }}>
            Hi, I&apos;m{' '}
            <b style={{ fontWeight: '900', fontSize: '40px' }}>Chris</b>
         </h1>
         <p style={{ '--delay': '4.0s' } as React.CSSProperties}>
            I love math and physics.
         </p>
         <p style={{ '--delay': '5.5s' } as React.CSSProperties}>
            I also love designing awesome stuff,
         </p>
         <div className={css.test}>
            <p style={{ '--delay': '6.5s' } as React.CSSProperties}>
               like responsive sites,
            </p>
            <p style={{ '--delay': '7.25s' } as React.CSSProperties}>
               interactive figures,
            </p>
            <p style={{ '--delay': '8.0s' } as React.CSSProperties}>
               and complex simulations.
            </p>
         </div>
         <div
            style={{ '--delay': '9s' } as React.CSSProperties}
            className={css.linkIcon}
         >
            <Link smooth spy to="projects" containerId="mainContainer">
               <Icons.DownArrow
                  fill="black"
                  size="36"
                  style={{ cursor: 'pointer' }}
               />
            </Link>
         </div>
      </div>
   );
}

export default IntroContainer;
