import { ClusterItem, ContentPage } from '@/components/containers';
import css from './CSNRs.module.css';

const csnrs = {
   title: (
      <span style={{ fontWeight: '400', color: 'var(--color-white)' }}>
         Supernova <span style={{ fontWeight: '900' }}>Remnants</span>
      </span>
   ),
   components: 'FORTRAN / Data-Collection / HPC',
   image: require('@/assets/img/csnrs.webp'),
   description: (
      <span style={{ color: 'var(--color-white)' }}>
         A pulsar born during these fantastic explosions can create fascinating
         imagry.
      </span>
   ),
   pages: [
      <ContentPage>
         <div className={css.contentContainer}>
            <div className={css.center}>
               <p>Coming soon...</p>
            </div>
         </div>
      </ContentPage>,
   ],
};

export const CSNRs = () => <ClusterItem info={csnrs} />;
