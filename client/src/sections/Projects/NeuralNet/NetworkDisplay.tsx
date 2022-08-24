import { useState, useEffect } from 'react';
import { InteractiveCanvas } from '@/components/elements';
import { getNeuralNet } from '@/api';
import { scaleUpData, getDefaultOutput } from './utils';
import css from './NeuralNet.module.css';

type NeuronProps = {
   draw: (ctx: any, val: Uint8Array) => void;
   weights: any;
   mask: any;
};

function Neuron({ draw, weights, mask }: NeuronProps): JSX.Element {
   const maskedWeights = mask
      ? scaleUpData(weights, true, mask)
      : scaleUpData(weights);
   return (
      <InteractiveCanvas
         draw={draw}
         onInteract={() => null}
         data={maskedWeights}
         style={{ width: '112px', height: '112px' }}
      />
   );
}

type Props = {
   draw: (ctx: any, val: Uint8Array) => void;
   mask: Uint8Array;
   setOutput: (val: any) => void;
};

type LayerData = { weights: any; bias: any; ind: number };

function NetworkDisplay({ draw, mask, setOutput }: Props) {
   const [networkData, setNetworkData] = useState<any>(null);
   const [layer1Data, setLayer1Data] = useState<any>([]);
   const [layer2Data, setLayer2Data] = useState<any>([]);

   // get network data on init
   useEffect(() => {
      getNeuralNet().then((data) => setNetworkData(data));
   }, []);

   // set layer data
   useEffect(() => {
      if (!networkData) return;
      let l1Data: LayerData[] = [];
      for (let i = 0; i < 16; i++) {
         const weights = networkData.layer1.weights[i];
         const bias = networkData.layer1.biases[i];
         l1Data = l1Data.concat({ weights, bias, ind: i });
      }
      setLayer1Data(l1Data);

      let l2Data: LayerData[] = [];
      for (let i = 0; i < 10; i++) {
         const weights = networkData.layer2.weights[i];
         const bias = networkData.layer2.biases[i];
         l2Data = l2Data.concat({ weights, bias, ind: i });
      }
      setLayer2Data(l2Data);
   }, [networkData]);

   useEffect(() => {
      if (!mask) return setOutput(getDefaultOutput());
      const l1Active = layer1Data.map((data: any, ind: number) => {
         let z = data.bias;
         for (let i = 0; i < data.weights.length; i++) {
            z += (data.weights[i] * (255 - mask[i])) / 255.0;
         }
         return { z, activation: 1.0 / (1.0 + Math.exp(-z)), ind };
      });

      const l2Active = layer2Data.map((data: any, ind: number) => {
         let z = data.bias;
         for (let i = 0; i < data.weights.length; i++) {
            z += data.weights[i] * l1Active[i].activation;
         }
         return { z, activation: 1.0 / (1.0 + Math.exp(-z)), ind };
      });

      return setOutput(l2Active);
   }, [mask]);

   const getNetworkNodes = () =>
      layer1Data.map((node: LayerData) => (
         <Neuron
            key={node.ind}
            draw={draw}
            weights={node.weights}
            mask={mask}
         />
      ));

   return <div className={css.displayContainer}>{getNetworkNodes()}</div>;
}

export default NetworkDisplay;
