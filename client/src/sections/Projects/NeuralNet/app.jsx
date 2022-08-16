import { useState, useEffect } from 'react';
import { putNeuralNet } from 'api';
import {
   drawLineSegment,
   scaleDownData,
   normalizeData,
   scaleUpData,
   getDefaultOutput,
} from './utils';
import NetworkInput from './networkinput';
import NetworkOutput from './networkoutput';
import NetworkDisplay from './networkdisplay';
import style from './neuralnet.module.css';

const drawCanvas = (ctx, data) => {
   if (!data) {
      const img = ctx.createImageData(ctx.canvas.width, ctx.canvas.height);
      for (let i = 0; i < img.data.length; i++) {
         img.data[i] = 255;
      }
      return ctx.putImageData(img, 0, 0);
   }
   const img = ctx.createImageData(ctx.canvas.width, ctx.canvas.height);
   for (let i = 0; i < img.data.length; i++) {
      img.data[i] = data[i];
   }
   return ctx.putImageData(img, 0, 0);
};

function App() {
   const [input, setInput] = useState(null);
   const [mask, setMask] = useState(null);
   const [normalizedInput, setNormalizedInput] = useState(null);
   const [output, setOutput] = useState(getDefaultOutput());
   const [userResponse, setUserResponse] = useState(null);
   const [displayIsHidden, setDisplayIsHidden] = useState(false);

   useEffect(() => {
      if (window.innerWidth < 830) return setDisplayIsHidden(true);
      return setDisplayIsHidden(false);
   }, [window.innerWidth]);

   const handleInteract = (ctx, mouseInfo) => {
      if (!mouseInfo.isActive) return;
      const { top, left, width, height } = mouseInfo.rect;

      // check for mouse-up
      if (!mouseInfo.click) {
         const imageData = ctx.getImageData(0, 0, width, height);
         setInput(imageData.data);
      }
      const thisPos = {
         x: mouseInfo.location.x - left,
         y: mouseInfo.location.y - top,
      };
      const lastPos = {
         x: mouseInfo.prevLocation.x - left,
         y: mouseInfo.prevLocation.y - top,
      };
      drawLineSegment(ctx, lastPos, thisPos);
   };

   // when input is updated (after draw complete),
   useEffect(() => {
      if (!input) return;
      const scaled = scaleDownData(input);
      const inputMask = normalizeData(scaled);
      const normalized = scaleUpData(inputMask, false);
      setMask(inputMask);
      setNormalizedInput(normalized);
   }, [input]);

   const handleClear = () => {
      setInput(null);
      setMask(null);
      setNormalizedInput(null);
      setOutput(getDefaultOutput());
      setUserResponse(null);
   };

   const buildGuess = () => {
      const maxVal = Math.max(...output.map((n) => n.activation));
      const guess = output.filter((n) => n.activation === maxVal);
      return guess[0] ? (
         <>
            <p>
               Is your number is a{' '}
               <span className={style.guess}>{guess[0].ind}</span>
            </p>
            <p>{`(${(guess[0].activation * 100).toFixed()}% certainty)`}</p>
            <p>Is this correct?</p>
            <div className={style.responseContainer}>
               <div onClick={() => setUserResponse('yes')}>Yes</div>
               <div onClick={() => setUserResponse('no')}>No</div>
            </div>
         </>
      ) : null;
   };

   const handleSubmit = (ind) => {
      putNeuralNet({ mask, output, userResponse, guess: ind }).then(() =>
         setUserResponse('submit')
      );
   };

   const afterResponseMessage = (
      <div className={style.responseMessage}>
         <p>
            If you would like to help build this system, please select the
            number you drew from above, and it will be submitted to the server.
         </p>
      </div>
   );

   const afterSubmitMessage = (
      <div className={style.responseMessage}>
         <p>Thank you for helping to build the network!</p>
      </div>
   );

   const networkDisplay = displayIsHidden ? (
      <NetworkDisplay draw={() => null} mask={mask} setOutput={setOutput} />
   ) : (
      <NetworkDisplay draw={drawCanvas} mask={mask} setOutput={setOutput} />
   );

   const getGuessAreaMessage = (response) => {
      if (!response) return buildGuess();
      if (response === 'submit') return afterSubmitMessage;
      return afterResponseMessage;
   };

   const guessAreaMessage = getGuessAreaMessage(userResponse);

   return (
      <div className={style.networkContainer}>
         <div className={style.interactContainer}>
            <NetworkInput
               onInteract={handleInteract}
               draw={drawCanvas}
               inputData={input}
               outputData={normalizedInput}
            />
            <NetworkOutput
               output={output}
               handleClear={handleClear}
               handleSubmit={handleSubmit}
               userResponse={userResponse}
            />
            <div className={style.guessContainer}>{guessAreaMessage}</div>
         </div>
         {networkDisplay}
      </div>
   );
}

export default App;
