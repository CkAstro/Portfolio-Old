import { ClusterItem, ContentPage } from 'components/containers';
import style from './csnrs.module.css';

const csnrs = {
   title: (
      <span style={{ fontWeight: '400', color: 'var(--color-white)' }}>
         Supernova <span style={{ fontWeight: '900' }}>Remnants</span>
      </span>
   ),
   components: 'FORTRAN / Data-Collection / HPC',
   image: require('assets/img/csnrs.webp'),
   description: (
      <span style={{ color: 'var(--color-white)' }}>
         A pulsar born during these fantastic explosions can create fascinating
         imagry.
      </span>
   ),
   pages: [
      <ContentPage>
         <div className={style.contentContainer}>
            <div className={style.center}>
               <p>Coming soon...</p>
            </div>
         </div>
      </ContentPage>,
   ],
};

function CSNRs() {
   return <ClusterItem info={csnrs} />;
}

export default CSNRs;
