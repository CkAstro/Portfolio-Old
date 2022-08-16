import Tex2SVG from 'react-hook-mathjax';
import App from './App';
import css from './Emission.module.css';

function Page() {
   return (
      <div className={css.contentContainer}>
         <h1 style={{ fontWeight: '100' }}>
            Supernova <span style={{ fontWeight: '700' }}>Emission</span>
         </h1>
         <p>
            This animation is <b>interactive</b>. Use your mouse/finger to
            rotate it. Note this is graphically intense and may have trouble on
            mobile and older PCs. Use the <b>slider</b> and <b>button</b> below
            to change the frequency <Tex2SVG display="inline" latex="\nu" /> of
            light and to toggle the circumstellar medium. More information
            available on the next page!
         </p>
         <App />
      </div>
   );
}

export default Page;
