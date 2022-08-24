import { InteractiveCanvas } from '@/components/elements';
import css from './NeuralNet.module.css';

type Props = {
   onInteract: (ctx: any, mouseInfo: any) => void;
   draw: (ctx: any, val: Uint8Array) => void;
   inputData: any;
   outputData: any;
};

function NetworkInput({ onInteract, draw, inputData, outputData }: Props) {
   return (
      <div className={css.inputContainer}>
         <InteractiveCanvas
            draw={draw}
            onInteract={onInteract}
            data={inputData}
            style={{ width: '112px', height: '112px' }}
         />
         <InteractiveCanvas
            draw={draw}
            onInteract={() => null}
            data={outputData}
            style={{ width: '112px', height: '112px' }}
         />
      </div>
   );
}

export default NetworkInput;
