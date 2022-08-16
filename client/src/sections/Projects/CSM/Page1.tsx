import App from './App';
import style from './csm.module.css';

const Page = () => (
   <div className={style.contentContainer}>
      <h1 style={{ fontWeight: '100' }}>
         Circumstellar Medium{' '}
         <span style={{ fontWeight: '700' }}>Research Data</span>
      </h1>
      <p>
         View and interact with 36 research datasets. Data displayed is
         azimuthally-averaged density from the circumstellar medium around a
         windy binary star system (see &apos;Binary CSM below&apos;).
      </p>
      <App />
   </div>
);

export default Page;
