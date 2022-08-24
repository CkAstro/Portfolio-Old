import { lazy, Suspense } from 'react';
import { ClusterItem, ContentPage } from '@/components/containers';
import { PageLoading } from '@/components/elements';

const Page1 = lazy(() => import('./Page1'));

const binary = {
   title: (
      <span style={{ fontWeight: '400', color: 'var(--color-white)' }}>
         <span style={{ fontWeight: '900' }}>Binary</span> CSM
      </span>
   ),
   components: 'FORTRAN / MPI / HPC / Bash',
   image: require('@/assets/img/binary.webp'),
   description: (
      <span style={{ color: 'var(--color-white)' }}>
         Explore the unique environment around evolved stars before they
         supernova.
      </span>
   ),
   pages: [
      <ContentPage>
         <Suspense fallback={<PageLoading />}>
            <Page1 />
         </Suspense>
      </ContentPage>,
   ],
};

export const Binary = () => <ClusterItem info={binary} />;
