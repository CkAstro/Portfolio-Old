import { lazy, Suspense } from 'react';
import { ContentPage, Showcase } from '@/components/containers';
import { PageLoading } from '@/components/elements';

const Page1 = lazy(() => import('./Page1'));

const neuralnet = {
   title: (
      <span style={{ fontWeight: '100' }}>
         Behind the scenes of a{' '}
         <span style={{ fontWeight: '900' }}>neural network</span>
      </span>
   ),
   components: 'React / HTML5 Canvas / Data Processing / REST',
   image: require('@/assets/img/network.webp'),
   description:
      'A hand-written number-guessing network. Learn in detail how it works, and help train it.',
   link: null,
   pages: [
      <ContentPage style={{ background: '#d5d5d5' }}>
         <Suspense fallback={<PageLoading />}>
            <Page1 />
         </Suspense>
      </ContentPage>,
   ],
};

export const NeuralNet = () => <Showcase info={neuralnet} />;
