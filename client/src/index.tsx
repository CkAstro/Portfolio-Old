import ReactDOM from 'react-dom/client';
import {
   ModalProvider,
   DisplayProvider,
   MousePositionProvider,
} from '@/contexts';
import {App} from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
   <ModalProvider>
      <DisplayProvider>
         <MousePositionProvider>
            <App/>
         </MousePositionProvider>
      </DisplayProvider>
   </ModalProvider>
);