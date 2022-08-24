import { lazy, Suspense } from 'react';
import { ClusterItem, ContentPage } from '@/components/containers';
import { PageLoading } from '@/components/elements';

const Page1 = lazy(() => import('./Page1'));
const Page2 = lazy(() => import('./Page2'));
const Page3 = lazy(() => import('./Page3'));

const wind = {
   title: (
      <span style={{ fontWeight: '400', color: 'var(--color-white)' }}>
         Stellar <span style={{ fontWeight: '900' }}>Wind</span>
      </span>
   ),
   components: 'Python / Post-Processing / Algorithms',
   image: require('@/assets/img/wind.webp'),
   description: (
      <span style={{ color: 'var(--color-white)' }}>
         What is stellar wind? Learn how and why stars expel matter.
      </span>
   ),
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
      <ContentPage>
         <Suspense fallback={<PageLoading />}>
            <Page3 />
         </Suspense>
      </ContentPage>,
   ],
};

export const Wind = () => <ClusterItem info={wind} />;
