import { InteractiveCanvas } from 'components/elements';
import style from './neuralnet.module.css';

function NetworkInput({ onInteract, draw, inputData, outputData }) {
   return (
      <div className={style.inputContainer}>
         <InteractiveCanvas
            draw={draw}
            onInteract={onInteract}
            data={inputData}
            setStyle={{ width: '112px', height: '112px' }}
         />
         <InteractiveCanvas
            draw={draw}
            onInteract={() => null}
            data={outputData}
            setStyle={{ width: '112px', height: '112px' }}
         />
      </div>
   );
}

export default NetworkInput;
