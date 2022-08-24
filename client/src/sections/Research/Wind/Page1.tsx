import Tex2SVG from 'react-hook-mathjax';
import css from './Wind.module.css';

function Page() {
   return (
      <div className={css.contentContainer}>
         <h1>Stellar Wind</h1>

         <p>
            All stars shed material in various ways during their lifetimes:
            explosively, as in nova or supernova outbursts, or continuously, in
            the form of &apos;stellar wind.&apos; Our sun only loses a few times
            10 <Tex2SVG display="inline" latex="^{-13}" /> of its mass each year
            via its &apos;solar wind,&apos; but more massive or more evolved
            stars can have much higher rates of mass loss. Stellar wind may be
            produced as radiation from within the star interacts with and ejects
            mass from its upper atmosphere, or as in the case of the Sun, simply
            as a hydrodynamical consequence of the star&apos;s hot{' '}
            <a
               href="https://spaceplace.nasa.gov/sun-corona/en/"
               target="_blank"
               rel="noreferrer"
            >
               corona
            </a>
            .
         </p>

         <img
            src={require('@/assets/img/corona.webp')}
            style={{ margin: '0 auto' }}
            alt="solar corona"
         />
         <div
            style={{
               margin: '0 auto 6px auto',
               textAlign: 'justify',
               width: '330px',
            }}
         >
            The solar corona captured during the 2017 total eclipse. Credit
            NASA, Aubrey Gemignani.
         </div>

         <p>
            Mass loss through stellar wind can have a significant impact on a
            star&apos;s evolution. The vast majority of stars (those of{' '}
            <a
               href="https://en.wikipedia.org/wiki/Stellar_mass"
               target="_blank"
               rel="noreferrer"
            >
               low and intermediate mass
            </a>
            ) do not produce a stellar wind of any significance until they
            complete core hydrogen burning and evolve off{' '}
            <a
               href="https://en.wikipedia.org/wiki/Main_sequence"
               target="_blank"
               rel="noreferrer"
            >
               main sequence
            </a>
            . Massive stars, however, generate enough radiative force that they
            will lose a significant portion of their mass over their lifespan,
            with stars above 20 solar masses able to shed a sizable portion of
            their mass during the main sequence phase.
         </p>

         <img
            src={require('@/assets/img/stellar_wind.webp')}
            style={{ margin: '0 auto' }}
            alt="stellar wind"
         />
         <div
            style={{
               margin: '0 auto 6px auto',
               textAlign: 'justify',
               width: '330px',
            }}
         >
            A simulated clumpy stellar wind which has been heavily stylized in
            post-processing.
         </div>

         <p>
            The next two pages explain how stellar wind behaves for a lone star,
            though they are math-heavy.
         </p>
      </div>
   );
}

export default Page;
