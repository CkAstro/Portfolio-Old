import { lazy, Suspense } from 'react';
import { ClusterItem, ContentPage } from '@/components/containers';
import { PageLoading } from '@/components/elements';

const Page1 = lazy(() => import('./Page1'));
const Page2 = lazy(() => import('./Page2'));

const emission = {
   title: (
      <span style={{ fontWeight: '400' }}>
         Supernova <span style={{ fontWeight: '900' }}>Emission</span>
      </span>
   ),
   components: 'WebGL / GLSL / Python / FORTRAN',
   image: require('assets/img/emission.webp'),
   description:
      'Interact with a supernova simulation and see how emission changes with the view.',
   pages: [
      <ContentPage>
         <Suspense fallback={<PageLoading />}>
            <Page1 />
         </Suspense>
      </ContentPage>,
      <ContentPage>
         <Suspense fallback={<PageLoading />}>
            <Page2 />
         </Suspense>
      </ContentPage>,
   ],
};

export const Emission = () => <ClusterItem info={emission} />;
