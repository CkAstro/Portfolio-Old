import css from './Binary.module.css';

function Page() {
   return (
      <div className={css.contentContainer}>
         <h1 style={{ fontWeight: '400' }}>
            The <span style={{ fontWeight: '900' }}>Circumstellar Medium</span>{' '}
            around a Binary
         </h1>

         <p>
            When a star emits wind in a binary, the binary interaction creates a
            fascinating spiral pattern in that wind. This can have profound
            results once that star goes supernova.
         </p>

         <p>For now, a few observed CSM spirals. Content coming soon!</p>

         <img
            src={require('@/assets/img/AFGL.webp')}
            alt="AFGL 3068"
            style={{ margin: '0 auto' }}
         />
         <div style={{ width: '450px', margin: '0 auto 16px auto' }}>
            AFGL 3068 observation (left), reimage (center), and simulation
            (right).
         </div>
         <img
            src={require('@/assets/img/RSculp.webp')}
            alt="R Sculptoris"
            style={{ margin: '0 auto' }}
         />
         <div style={{ width: '450px', margin: '0 auto 16px auto' }}>
            R Sculptoris observation (left) and simulation (right).
         </div>
      </div>
   );
}

export default Page;
