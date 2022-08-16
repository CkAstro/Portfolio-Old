/* eslint-disable indent */
import { useState, useEffect } from 'react';
import { ButtonGroup } from '@/components/elements';
import { getCSMData } from '@/api';
import { Point } from '@/types';
import PolarPlot from './PolarPlot';
import RadialPlot from './RadialPlot';
import AngularPlot from './AngularPlot';
import css from './CSM.module.css';

const App = () => {
   const [mrto, setMrto] = useState<string | number>('10');
   const [vwind, setVwind] = useState<string | number>('15');
   const [vrto, setVrto] = useState<string | number>('10');
   const [CSMData, setCSMData] = useState<any>(null);
   const [dataPoint, setDataPoint] = useState<Point>({ x: 115, y: 35 });

   const polarData = CSMData
      ? {
           imageData: CSMData.imageData,
           imax: CSMData.imax,
           jmax: CSMData.jmax,
           zxc: CSMData.zxc,
           zyc: CSMData.zyc,
           dataPoint,
           origin: { x: 10, y: CSMData.imax + 10 },
        }
      : null;

   const angularData = CSMData
      ? {
           imax: CSMData.imax,
           jmax: CSMData.jmax,
           zyc: CSMData.zyc,
           dataPoint,
           data: CSMData.data,
           scale: { x: 0.85, y: 0.7 },
        }
      : null;

   const radialData = CSMData
      ? {
           imax: CSMData.imax,
           jmax: CSMData.jmax,
           zxc: CSMData.zxc,
           dataPoint,
           data: CSMData.data,
           scale: { x: 0.85, y: 0.7 },
        }
      : null;

   useEffect(() => {
      getCSMData(mrto, vwind, vrto).then((response) => setCSMData(response));
   }, [mrto, vwind, vrto]);

   return (
      <>
         <div className={css.buttonContainer}>
            <ButtonGroup
               value={mrto}
               setter={setMrto}
               header="Mass Ratio"
               buttons={[
                  { text: '1.0', value: '10' },
                  { text: '1.5', value: '15' },
                  { text: '2.0', value: '20' },
                  { text: '2.5', value: '25' },
               ]}
            />
            <ButtonGroup
               value={vwind}
               setter={setVwind}
               header="Wind Speed"
               buttons={[
                  { text: '15', value: '15' },
                  { text: '20', value: '20' },
                  { text: '25', value: '25' },
               ]}
            />
            <ButtonGroup
               value={vrto}
               setter={setVrto}
               header="Speed Ratio"
               buttons={[
                  { text: '1.0', value: '10' },
                  { text: '1.5', value: '15' },
                  { text: '2.0', value: '20' },
               ]}
            />
         </div>
         <div className={css.canvasGrid}>
            <div className={css.rightGrid}>
               <PolarPlot data={polarData} setDataPoint={setDataPoint} />
            </div>
            <div className={css.leftGrid}>
               <AngularPlot data={angularData} setDataPoint={setDataPoint} />
            </div>
            <div className={css.leftGrid}>
               <RadialPlot data={radialData} setDataPoint={setDataPoint} />
            </div>
         </div>
      </>
   );
};

export default App;
