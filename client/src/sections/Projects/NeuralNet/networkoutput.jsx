import { memo } from 'react';
import style from './neuralnet.module.css';

const getColor = (data) => {
   if (!data) return 'gray';

   const val = (data * 100).toFixed();
   if (val > 85) return 'green';
   if (val > 0) return 'orange';
   return 'red';
};

const OutputDisplay = memo(({ output, handleSubmit, userResponse }) =>
   output.map((data, ind) => {
      const color = getColor(data.activation);
      const val = (data.activation * 100).toFixed();
      return (
         <div
            key={data.ind}
            onClick={
               userResponse && userResponse !== 'submit'
                  ? () => handleSubmit(ind)
                  : null
            }
            className={`noselect ${style.outputValue} ${style[color]} ${
               userResponse && userResponse !== 'submit' ? style.active : ''
            }`}
         >
            <div className={style.numDisplay}>{ind}</div>
            <div className={color}>{data.activation ? `${val}%` : null}</div>
         </div>
      );
   })
);

function NetworkOutput({ output, handleClear, handleSubmit, userResponse }) {
   return (
      <div className={style.outputContainer}>
         <div className={style.clearButton} onClick={handleClear}>
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
