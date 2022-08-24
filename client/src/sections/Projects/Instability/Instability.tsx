import { lazy, Suspense } from 'react';
import { ClusterItem, ContentPage } from '@/components/containers';
import { PageLoading } from '@/components/elements';

const Page1 = lazy(() => import('./Page1'));
const Page2 = lazy(() => import('./Page2'));

const instability = {
   title: (
      <span style={{ fontWeight: '400' }}>
         Fluid <span style={{ fontWeight: '900' }}>Instabilities</span>
      </span>
   ),
   components: 'React / WebGL / Fetch API',
   image: require('@/assets/img/instability.webp'),
   description: 'Watch a fluid instability evolve in full 3D.',
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

export const Instability = () => <ClusterItem info={instability} />;
