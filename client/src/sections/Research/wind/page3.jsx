import Tex2SVG from 'react-hook-mathjax';
import style from './wind.module.css';

function Page() {
   return (
      <div className={style.contentContainer}>
         <h1>The Math Behind Wind - Adiabatic Wind</h1>

         <h2>What if wind is not isothermal?</h2>

         <p>
            In this case, we have
            <Tex2SVG latex="P = K \rho^\gamma" />
            and the temperature{' '}
            <Tex2SVG display="inline" latex="T \propto P/\rho" /> is allowed to
            vary. The sound speed is then
            <Tex2SVG latex="\frac{\partial P}{\partial \rho} = c_s^2 = \frac{\gamma P}{\rho}" />
            How does this change our result for{' '}
            <Tex2SVG display="inline" latex="u(r)" />? It turns out a pressure
            gradient alone cannot drive an adiabatic wind. We must include an
            additional term.
            <Tex2SVG latex="\frac{1}{u}\frac{\partial u}{\partial r}(u^2 - c_s^2) = \frac{2c_s^2}{r} - \frac{GM}{r^2} + f_r(r)," />
            where we will assume{' '}
            <Tex2SVG display="inline" latex="f_r \propto r^{-2}" />. This is the
            same solution we get for Parker wind other than this additional{' '}
            <Tex2SVG display="inline" latex="f_r(r)" /> term and the fact that{' '}
            <Tex2SVG display="inline" latex="c_s^2" /> is no longer constant.
            But what is this external force term? In most cases, it is radiation
            pressure acting on the gas through one mechanism or another.
         </p>

         <h2>Radiation-driven wind</h2>

         <p>
            Since both gravity and the radiative term are{' '}
            <Tex2SVG display="inline" latex="\propto r^{-2}" />, we can combine
            them using a force scalar{' '}
            <Tex2SVG display="inline" latex="\kappa(r)" /> such that
         </p>

         <Tex2SVG latex="\frac{1}{u}\frac{\partial u}{\partial r}(u^2 - c_s^2) = \frac{2c_s^2}{r} + \kappa(r) \frac{GM}{r^2}." />
      </div>
   );
}

export default Page;
