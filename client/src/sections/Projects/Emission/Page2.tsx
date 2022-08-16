import Tex2SVG from 'react-hook-mathjax';
import css from './emission.module.css';

function Page() {
   return (
      <div className={css.contentContainer}>
         <h1>About the Figure</h1>

         <p>
            The simulation is run assuming two stars are orbiting each other
            prior to one going supernova. Before the explosion, the start begins
            ejecting its mass in a dense wind, which creates a disk about the
            equatorial plane. This environment is called a circumstellar medium
            (CSM).
         </p>

         <div className={css.contentContainer__flexSection}>
            <div>
               <h2>The CSM</h2>
               <p>
                  To the right is a simplified picture. The progenitor star (the
                  one about to supernova) ejects mass at a high rate and creates
                  a dense disk.
               </p>
               <p>
                  This disk will eventually both prevent the supernova blastwave
                  from expanding and prevent light from reaching the camera.
               </p>
            </div>
            <div>
               {/* these images are manually sized as compressing smaller image makes filesize larger... */}
               <img
                  alt="circumstellar medium"
                  src={require('assets/img/emission_csm.webp')}
                  width="350px"
               />
            </div>
         </div>

         <div className={css.contentContainer__flexSection}>
            <div>
               <img
                  alt="supernova explosion"
                  src={require('assets/img/emission_nova.webp')}
                  width="350px"
               />
            </div>
            <div style={{ maxWidth: '500px' }}>
               <h2>The Supernova</h2>
               <p>
                  Once the stellar core collapses and the star explodes,
                  material is forced radially outward at over 1/10th the speed
                  of light. Material in the polar region will meet little
                  resistance, while material in the orbital plane will encounter
                  resistance from the dense CSM disk.
               </p>
               <p>
                  This results in an hourglass-like shape in the supernova. The
                  more dense the CSM, the thinner the mid-section is. Bright
                  spots will form near the outer edges of the blastwave (orange
                  in the figure to the left) as surrounding gas is shock-heated
                  by the blastwave.
               </p>
            </div>
         </div>

         <div className={css.contentContainer__flexSection}>
            <div>
               <h2>Synchrotron Emission</h2>
               <p>
                  The shock-heated gas will begin to radiate light at all
                  frequencies, with intensity dependent on wavelength.
               </p>
               <p>This light will radiate outward in all directions.</p>
               <p>
                  Although only one light source is shown in this figure, each
                  point on the blastwave is emanating <i>some</i> light.
               </p>
            </div>
            <div>
               <img
                  alt="light emission"
                  src={require('assets/img/emission_light.webp')}
                  width="350px"
               />
            </div>
         </div>

         <div className={css.contentContainer__flexSection}>
            <div>
               <h2>Observing the Light</h2>
               <p>
                  Observers on Earth happen to place a camera as shown in the
                  image to the right. We will receive a certain amount of light
                  from this point on the supernova. We will receive some light
                  from all bright spots on the supernova and we can construct an
                  image similar to the figure on the previous page.
               </p>
               <p>But what happens if the system is rotated?</p>
            </div>
            <div>
               <img
                  alt="observing the light"
                  src={require('assets/img/emission_obs1.webp')}
                  width="350px"
               />
            </div>
         </div>

         <div className={css.contentContainer__flexSection}>
            <div>
               <img
                  alt="observing the light (new angle)"
                  src={require('assets/img/emission_obs2.webp')}
                  width="350px"
               />
            </div>
            <div style={{ maxWidth: '500px' }}>
               <h2>A Different Orientation</h2>
               <p>
                  Here, the supernova is rotated 60 degrees. We are in the same
                  location, and now the light must pass through the dense
                  circumstellar medium.
               </p>
               <p>
                  It turns out this will block some of the light we receive. In
                  fact, any light from the &apos;other side&apos; of the dense
                  disk is obscured. Low-frequency light (try setting{' '}
                  <Tex2SVG display="inline" latex="\log_{10}(\nu) < 8.5" />) can
                  barely penetrate this and the observer will only ever see one
                  half of the explosion. High-frequency light, however, can
                  penetrate reletively easily and the full supernova may be
                  observed at that wavelength.
               </p>
               <p>
                  Turning on the CSM (blue in the figure on the previous page)
                  will reveal the area blocking the light. Rotating the figure
                  will demonstrate how this light may be revealed at different
                  orientations.
               </p>
            </div>
         </div>
      </div>
   );
}

export default Page;
