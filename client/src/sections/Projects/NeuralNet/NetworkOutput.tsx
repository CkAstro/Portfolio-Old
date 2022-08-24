import { memo } from 'react';
import css from './NeuralNet.module.css';

const getColor = (data: number) => {
   if (!data) return 'gray';

   const val = parseInt((data * 100).toFixed());
   if (val > 85) return 'green';
   if (val > 0) return 'orange';
   return 'red';
};

type DisplayProps = {
   output: any;
   handleSubmit: (val: number) => void;
   userResponse: 'yes' | 'no' | 'submit' | null;
};

const OutputDisplay = memo(
   ({ output, handleSubmit, userResponse }: DisplayProps) =>
      output.map((data: any, ind: number) => {
         const color = getColor(data.activation);
         const val = (data.activation * 100).toFixed();
         return (
            <div
               key={data.ind}
               onClick={
                  userResponse && userResponse !== 'submit'
                     ? () => handleSubmit(ind)
                     : undefined
               }
               className={`noselect ${css.outputValue} ${css[color]} ${
                  userResponse && userResponse !== 'submit' ? css.active : ''
               }`}
            >
               <div className={css.numDisplay}>{ind}</div>
               <div className={color}>{data.activation ? `${val}%` : null}</div>
            </div>
         );
      })
);

type Props = {
   output: any;
   handleClear: () => void;
   handleSubmit: (val: number) => void;
   userResponse: 'yes' | 'no' | 'submit' | null;
};

function NetworkOutput({
   output,
   handleClear,
   handleSubmit,
   userResponse,
}: Props) {
   return (
      <div className={css.outputContainer}>
         <div className={css.clearButton} onClick={handleClear}>
            clear
         </div>
         <OutputDisplay
            output={output}
            handleSubmit={handleSubmit}
            userResponse={userResponse}
         />
      </div>
   );
}

export default NetworkOutput;
