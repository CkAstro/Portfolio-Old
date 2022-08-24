import { Cluster } from '@/components/containers';
import { Binary } from './Binary';
import { Wind } from './Wind';
import { CSNRs } from './CSNRs';
import css from './Research.module.css';

export const Research = () => {
   return (
      <>
         <div className={css.headerContainer}>
            <h1 style={{ color: 'var(--color-white)' }} className={css.style1}>
               Astrophysics <span style={{ fontWeight: '900' }}>Research</span>
            </h1>
         </div>
         <Cluster>
            <Wind />
            <Binary />
            <CSNRs />
         </Cluster>
      </>
   );
};
