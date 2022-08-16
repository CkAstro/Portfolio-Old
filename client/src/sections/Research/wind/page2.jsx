import Tex2SVG from 'react-hook-mathjax';
import style from './wind.module.css';

function Page() {
   return (
      <div className={style.contentContainer}>
         <h1>The Math Behind Wind - Isothermal Parker Wind</h1>

         <p>
            The solar corona is a supersonic wind heated to 10
            <Tex2SVG display="inline" latex="^6" /> degrees Kelvin which expands
            out to about twice the Earth-Sun distance in all directions. This
            constant-temperature (isothermal) wind was first described by Eugene
            Parker as what is now known as a{' '}
            <a
               href="http://www.scholarpedia.org/article/Parker_Wind"
               target="_blank"
               rel="noreferrer"
            >
               Parker wind
            </a>
            . The derivation is as follows:
         </p>

         <p>Conservation of mass tells us</p>

         <Tex2SVG latex="\frac{\partial \rho}{\partial t} + \nabla \cdot(\rho \vec{u}) = 0" />

         <p>and conservation of momentum is</p>

         <Tex2SVG latex="\frac{\partial}{\partial t}(\rho \vec{u}) + \nabla \cdot (\rho \vec{u}\vec{u}) + \nabla P = \vec{f}," />

         <p>
            where <Tex2SVG display="inline" latex="\vec{f}" /> is some external
            force per unit mass. We will assume the star emits a spherically
            symmetric wind, so these equations will only depend on radius. If we
            take this momentum equation and write it in spherical coordinates,
            it becomes
         </p>

         <Tex2SVG latex="u\frac{\partial u}{\partial r} + \frac{1}{\rho}\frac{\partial P}{\partial r} = -\frac{GM}{r^2}," />

         <p>
            where the last term is the force of gravity acting on the wind.
            Writing the mass equation in spherical coordinates gives
         </p>

         <Tex2SVG latex="\frac{1}{r}\frac{\partial}{\partial r}\left(r^2\rho u\right) = 0." />

         <p>
            Here, we can ignore the <Tex2SVG display="inline" latex="1/r" />{' '}
            term and we see the derivative inside the parenthesis is equal to
            zero, meaning its integral is a constant. We will choose{' '}
            <Tex2SVG display="inline" latex="\dot{M}" /> for this constant,
            which is the mass-per-unit time carried by the wind, or the
            mass-loss rate of the star.
         </p>

         <Tex2SVG latex="\dot{M} = 4\pi r^2 \rho u" />

         <p>We may rewrite this in a more useful form for later:</p>

         <Tex2SVG latex="\rho(r, u) = \frac{\dot{M}}{4\pi r^2 u}." />

         <p>
            Finally, we can express the pressure in terms of the sound speed,{' '}
            <Tex2SVG display="inline" latex="c_s" />. The gas is adiabatic, so
         </p>

         <Tex2SVG latex="P = c_s^2 \rho." />

         <p>
            Now, we can work on the{' '}
            <Tex2SVG display="inline" latex="\partial P/\partial r" /> term. As
            we see above, we do not know pressure in terms of radius, so we must
            apply the chain rule as follows.
         </p>

         <Tex2SVG latex="\frac{\partial P}{\partial r} = \frac{\partial P}{\partial \rho}\left[\frac{\partial \rho}{\partial r} + \frac{\partial \rho}{\partial u}\frac{\partial u}{\partial r}\right]" />

         <p>
            The first term in the brackets is found using{' '}
            <Tex2SVG display="inline" latex="\rho(r, u)" />, and is given by
         </p>

         <Tex2SVG latex="\frac{\partial \rho}{\partial r} = -\frac{2\dot{M}}{4\pi r^3 u} = -\frac{2 \rho}{r}," />

         <p>
            where we have replaced the{' '}
            <Tex2SVG display="inline" latex="\dot{M}" /> term with our
            expression for <Tex2SVG display="inline" latex="\rho" />. We
            don&apos;t have a solution for{' '}
            <Tex2SVG display="inline" latex="\partial u/\partial r" /> either,
            but that is actually what we&apos;re trying to solve for. The other
            expression in the second term is
         </p>

         <Tex2SVG latex="\frac{\partial \rho}{\partial u} = -\frac{\dot{M}}{4\pi r^2 u^2} = -\frac{\rho}{u}." />

         <p>
            For the final term, we use{' '}
            <Tex2SVG display="inline" latex="P = c_s^2\rho" /> to show
         </p>

         <Tex2SVG latex="\frac{\partial P}{\partial \rho} = c_s^2." />

         <p>Combining all these gives</p>

         <Tex2SVG latex="\frac{\partial P}{\partial r} = -c_s^2\left[\frac{2\rho}{r} + \frac{\rho}{u}\right]," />

         <p>and the full expression is</p>

         <Tex2SVG latex="u\frac{\partial u}{\partial r} - \frac{2c_s^2}{r} - \frac{c_s^2}{u} = -\frac{GM}{r^2}." />

         <p>With a little re-aranging, we can show</p>

         <Tex2SVG latex="\frac{1}{u}\frac{\partial u}{\partial r}(u^2 - c_s^2) = \frac{2c_s^2}{r} - \frac{GM}{r^2}." />

         <p>
            This result is known as the Parker wind solution. The first thing we
            should notice about this is the left-hand side becomes zero when{' '}
            <Tex2SVG display="inline" latex="u = c_s" />. This is known as a
            &apos;critical velocity&apos;, where the wind transitions to or from
            supersonic speed (where it travels faster than it&apos;s own speed
            of sound). When this term is zero, either the right-hand side must
            be zero or{' '}
            <Tex2SVG display="inline" latex="\partial u/\partial r" /> must be
            infinite. We can set the right-hand side to zero to show
         </p>

         <Tex2SVG latex="\frac{2c_s^2}{r} = \frac{GM}{r^2} \to r = \frac{GM}{2c_s^2}." />

         <p>
            This value of <Tex2SVG display="inline" latex="r" /> is a critical
            radius, and we see the wind cannot transition to supersonic speeds
            anywhere but this radius. Defining the critical radius as{' '}
            <Tex2SVG display="inline" latex="r_c" />, the above Parker equation
            may be integrated to show
         </p>

         <Tex2SVG latex="\left(\frac{u}{c_s}\right)^2 - \log\left(\frac{u}{c_s}\right)^2 = 4\log\left(\frac{r}{r_c}\right) + 4\frac{r_c}{r} + C," />

         <p>
            where <Tex2SVG display="inline" latex="C" /> is a constant. If we
            look at the case where <Tex2SVG display="inline" latex="u=c_s" />{' '}
            and <Tex2SVG display="inline" latex="r=r_c" />, we see{' '}
            <Tex2SVG display="inline" latex="C = -3" />.
         </p>
      </div>
   );
}

export default Page;
