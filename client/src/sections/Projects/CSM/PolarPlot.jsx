import { InteractiveCanvas } from '@/components/elements';

const pi = Math.PI;
const _boxSize = 4; // for crosshairs
const _mainLineWidth = 1;

const resetContext = (ctx) => {
   ctx.strokeStyle = 'black';
   ctx.lineWidth = _mainLineWidth;
   ctx.setLineDash([]);
};

const drawImage = (ctx, { imax, origin, imageData }) => {
   // convert image data into canvas image
   const xSize = imax;
   const ySize = imax * 2; // purposefully using imax
   const image = ctx.createImageData(xSize, ySize);
   for (let i = 0; i < xSize; i++) {
      for (let j = 0; j < ySize; j++) {
         const dataPos = i * ySize + j;
         for (let k = 0; k < 4; k++) {
            const imgPos = 4 * dataPos + k;
            image.data[imgPos] = imageData[dataPos][k];
         }
      }
   }
   ctx.putImageData(image, origin.x, origin.y - imax);

   // clean up and return
   return resetContext(ctx);
};

const drawGrid = (ctx, { origin, zxc, imax }) => {
   // grid outline, inner radius must depend on data
   // ir == inner radius; or == outer radius
   const ir = (zxc.vals[0] / zxc.vals[imax - 1]) * imax;
   const or = imax;

   ctx.lineWidth = 2;
   ctx.beginPath();
   ctx.arc(origin.x, origin.y, or, -pi / 2.0, pi / 2.0, false); // outer arc
   ctx.lineTo(origin.x, origin.y + ir);
   ctx.arc(origin.x, origin.y, ir, pi / 2.0, -pi / 2.0, true); // inner arc
   ctx.lineTo(origin.x, origin.y - or);
   ctx.stroke();

   // clean up and return
   return resetContext(ctx);
};

const drawRadialAxis = (ctx, { origin, the0, rad1, rad2, ir, or }) => {
   // we draw radial dashes this way so they remain consistent
   // dash will always start at start of draw, so we draw from outer bound
   //    to the box
   ctx.strokeStyle = 'red';
   ctx.lineWidth = 2;
   ctx.setLineDash([5, 5]);

   // only draw segment if it's in bounds
   ctx.beginPath();
   ctx.moveTo(origin.x + ir * Math.sin(the0), origin.y - ir * Math.cos(the0));
   if (rad1 > ir)
      ctx.lineTo(
         origin.x + rad1 * Math.sin(the0),
         origin.y - rad1 * Math.cos(the0)
      );
   ctx.moveTo(origin.x + or * Math.sin(the0), origin.y - or * Math.cos(the0));
   if (rad2 < or)
      ctx.lineTo(
         origin.x + rad2 * Math.sin(the0),
         origin.y - rad2 * Math.cos(the0)
      );
   ctx.stroke();

   // clean up and return
   return resetContext(ctx);
};

const drawAngularAxis = (ctx, { origin, rad0, the1, the2, or }) => {
   // we draw arcs as we do so the dashes remain consistent
   // they will always start at start of arc, so starting from outer bound
   //    and moving arc to box will keep it from 'moving'
   const dashScale = rad0 / or;
   ctx.strokeStyle = 'red';
   ctx.lineWidth = 2;
   ctx.setLineDash([8 * dashScale, 8 * dashScale]); // scale dashing

   // only draw segment if it's in bounds
   ctx.beginPath();
   if (the1 > -pi / 2.0)
      ctx.arc(origin.x, origin.y, rad0, -pi / 2.0, the1, false);
   ctx.moveTo(origin.x, origin.y + rad0);
   if (the2 < pi / 2) ctx.arc(origin.x, origin.y, rad0, pi / 2, the2, true);
   ctx.stroke();

   // clean up and return
   return resetContext(ctx);
};

const drawLocationBox = (ctx, { xloc, yloc }) => {
   ctx.strokeStyle = 'white';
   ctx.lineWidth = 2;

   // draw box around active pixel
   ctx.beginPath();
   ctx.rect(
      xloc - _boxSize,
      yloc - _boxSize,
      2 * _boxSize + 1,
      2 * _boxSize + 1
   );
   ctx.stroke();

   // clean up and return
   return resetContext(ctx);
};

const drawCrosshair = (ctx, { zxc, zyc, imax, dataPoint, origin }) => {
   // scale zxc to pixel radius
   const zxcScaled = zxc.vals.map((val) => (imax * val) / zxc.vals[imax - 1]);
   const ir = (zxc.vals[0] / zxc.vals[imax - 1]) * imax; // inner rad
   const or = imax; // outer radius

   // actual pixel coordinate is (rad0, the0) or (xloc, yloc)
   const rad0 = zxcScaled[dataPoint.x];
   const the0 = zyc.vals[dataPoint.y];
   const xloc = rad0 * Math.sin(the0) + origin.x;
   const yloc = origin.y - rad0 * Math.cos(the0);

   // exclude the origin to find crosshair angles
   const xtmp = rad0 * Math.sin(the0);
   const ytmp = rad0 * Math.cos(the0);

   // get crosshair bounds
   let rad1; // 'below' crosshair box
   let rad2; // 'above' crosshair box
   let the1; // 'before' crosshair box
   let the2; // 'after' crosshair box

   if (the0 < pi / 4.0) {
      rad1 = (ytmp - _boxSize) / Math.cos(the0);
      rad2 = (ytmp + _boxSize) / Math.cos(the0);
      the1 = Math.asin((xtmp - _boxSize) / rad0) - pi / 2.0;
      the2 = Math.asin((xtmp + _boxSize) / rad0) - pi / 2.0;
   } else if (the0 < pi / 2.0) {
      rad1 = (xtmp - _boxSize) / Math.sin(the0);
      rad2 = (xtmp + _boxSize) / Math.sin(the0);
      the1 = Math.acos((ytmp + _boxSize) / rad0) - pi / 2.0;
      the2 = Math.acos((ytmp - _boxSize) / rad0) - pi / 2.0;
   } else if (the0 < (3 * pi) / 4.0) {
      rad1 = (xtmp - _boxSize) / Math.sin(the0);
      rad2 = (xtmp + _boxSize) / Math.sin(the0);
      the1 = Math.acos((ytmp + _boxSize) / rad0) - pi / 2.0;
      the2 = Math.acos((ytmp - _boxSize) / rad0) - pi / 2.0;
   } else {
      rad1 = (ytmp + _boxSize) / Math.cos(the0);
      rad2 = (ytmp - _boxSize) / Math.cos(the0);
      the1 = -Math.asin((xtmp + _boxSize) / rad0) + pi / 2.0;
      the2 = -Math.asin((xtmp - _boxSize) / rad0) + pi / 2.0;
   }

   // draw all elements
   drawRadialAxis(ctx, { origin, the0, rad1, rad2, ir, or });
   drawAngularAxis(ctx, { origin, rad0, the1, the2, ir, or });
   drawLocationBox(ctx, { xloc, yloc });
};

const drawPolarPlot = (ctx, data) => {
   if (!data) return; // this will init without data

   // first, clear grid on update
   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

   // load and display image data
   drawImage(ctx, data);

   // draw crosshairs
   drawCrosshair(ctx, data);

   // draw grid overlay last (cover crosshairs)
   drawGrid(ctx, data);
};

const PolarPlot = ({ data, setDataPoint }) => {
   const updateDataPoint = (ctx, mouseInfo, dataContainer) => {
      if (!dataContainer || !mouseInfo.isActive) return;
      const { top, left } = mouseInfo.rect;
      const clickLocation = {
         x: mouseInfo.location.x - left,
         y: mouseInfo.location.y - top,
      };
      const { origin, imax, jmax, zxc, zyc } = dataContainer;
      if (clickLocation.x < origin.x || clickLocation.x > origin.x + imax)
         return;
      if (
         clickLocation.y < origin.y - imax ||
         clickLocation.y > origin.y + imax
      )
         return;

      // get radial location
      const rad2 =
         (clickLocation.x - origin.x) * (clickLocation.x - origin.x) +
         (clickLocation.y - origin.y) * (clickLocation.y - origin.y);
      const ir = (zxc.vals[0] / zxc.vals[imax - 1]) * imax;
      if (rad2 < ir * ir || rad2 > imax * imax) return;
      const radAdjust = Math.floor(((rad2 ** 0.5 - ir) / (imax - ir)) * imax);

      // get polar location
      const the = Math.atan2(
         clickLocation.x - origin.x,
         origin.y - clickLocation.y
      );
      const theAdjust = Math.floor(
         ((the - zyc.vals[0]) / (zyc.vals[jmax - 1] - zyc.vals[0])) * jmax
      );

      setDataPoint({
         x: Math.max(0, Math.min(imax - 1, radAdjust)),
         y: Math.max(0, Math.min(jmax - 1, theAdjust)),
      });
   };

   return (
      <InteractiveCanvas
         draw={drawPolarPlot}
         onInteract={updateDataPoint}
         data={data}
         setStyle={{ width: '100%', height: '100%' }}
      />
   );
};

export default PolarPlot;
