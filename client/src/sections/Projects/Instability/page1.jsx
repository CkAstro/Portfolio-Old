import App from './app';
import style from './instability.module.css';

function Page() {
   return (
      <div className={style.contentContainer}>
         <h1 style={{ fontWeight: '100' }}>
            A Rayleigh-Taylor{' '}
            <span style={{ fontWeight: '700' }}>Instability</span>
         </h1>
         <p>
            This animation is <b>interactive</b>. Use your mouse/finger to
            rotate it. Note this is graphically intense and may have trouble on
            mobile. Head to the next page to learn how this instability forms.
         </p>
         <App />
      </div>
   );
}

export default Page;
