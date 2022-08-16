import { InteractiveCanvas } from '@/components/elements';

const _xTickCount = 6;
const _boxSize = 4;
const _mainLineWidth = 2;

const resetContext = (ctx: any) => {
   ctx.strokeStyle = 'black';
   ctx.lineWidth = _mainLineWidth;
   ctx.setLineDash([]);
};

const drawData = (ctx, origin, { data, dataPoint }, lengthX, lengthY) => {
   const ymin = data.layout.angular.min[dataPoint.x];
   const ymax = data.layout.angular.max[dataPoint.x];
   const vals = data.layout.angular.vals[dataPoint.x];

   ctx.lineWidth = _mainLineWidth;
   ctx.beginPath();
   for (let i = 0; i < vals.length; i++) {
      const x = (i / vals.length) * lengthX;
      const y = ((vals[i] - ymin) / (ymax - ymin)) * lengthY;
      if (i === 0) ctx.moveTo(origin.x + x, origin.y - y);
      ctx.lineTo(origin.x + x, origin.y - y);
   }
   ctx.stroke();

   // clean up and return
   return resetContext(ctx);
};

const drawTickText = (ctx, loc, val) => {
   ctx.font = '12px Arial';
   ctx.textAlign = 'center';

   let text = val.toString().split('.');
   text =
      text[0].length > 3
         ? `${text[0].slice(0, text[0].length - 3)}.${text[0][3]}k`
         : `${text[0]}${text[1] ? '.' : ''}${text[1] ? text[1][0] : ''}`;
   ctx.fillText(text, loc.x, loc.y);
};

const drawTick = (ctx, origin, dir, size, ticks) => {
   ctx.strokeStyle = 'black';
   ctx.lineWidth = size.lineWidth;

   // first draw ticks
   ctx.beginPath();
   for (let i = 0; i < ticks.length; i++) {
      const tick = ticks[i];
      const p1 =
         dir === 'x'
            ? { x: origin.x + tick.position, y: origin.y }
            : { x: origin.x, y: origin.y - tick.position };
      const p2 =
         dir === 'x'
            ? { x: origin.x + tick.position, y: origin.y + size.lineHeight }
            : { x: origin.x - size.lineHeight, y: origin.y - tick.position };
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
   }
   ctx.stroke();

   if (size.lineHeight < 6) return resetContext(ctx);

   // then draw text
   for (let i = 0; i < ticks.length; i++) {
      const loc =
         dir === 'x'
            ? { x: origin.x + ticks[i].position, y: origin.y + 20 }
            : { x: origin.x - 20, y: origin.y - ticks[i].position + 5 };
      drawTickText(ctx, loc, ticks[i].value);
   }

   // clean up and return
   return resetContext(ctx);
};

const drawTicks = (
   ctx,
   origin,
   { jmax, zyc, data, dataPoint },
   lengthX,
   lengthY
) => {
   // x axis major
   const dy = (zyc.vals[jmax - 1] - zyc.vals[0]) / (_xTickCount - 1);
   let xTicks = [];
   for (let i = 0; i < _xTickCount; i++) {
      xTicks = xTicks.concat({
         value: zyc.vals[0] + i * dy,
         position: i * (lengthX / (_xTickCount - 1)),
      });
   }
   drawTick(ctx, origin, 'x', { lineWidth: 2, lineHeight: 6 }, xTicks);

   // y axis major
   const ymin = data.layout.angular.min[dataPoint.x];
   const ymax = data.layout.angular.max[dataPoint.x];
   let yTicksMajor = [];
   for (let j = Math.floor(ymin); j < Math.floor(ymax) + 2; j++) {
      if (j < ymax && j > ymin)
         yTicksMajor = yTicksMajor.concat({
            value: j,
            position: ((j - ymin) / (ymax - ymin)) * lengthY,
         });
   }
   drawTick(ctx, origin, 'y', { lineWidth: 2, lineHeight: 6 }, yTicksMajor);

   let yTicksMinor = [];
   for (let j = Math.floor(ymin); j < Math.floor(ymax) + 2; j++) {
      for (let i = 2; i < 10; i++) {
         const val = Math.log(i * 10 ** j) / Math.log(10);
         if (val < ymax && val > ymin)
            yTicksMinor = yTicksMinor.concat({
               value: val,
               position: ((val - ymin) / (ymax - ymin)) * lengthY,
            });
      }
   }
   drawTick(ctx, origin, 'y', { lineWidth: 1, lineHeight: 4 }, yTicksMinor);

   return resetContext(ctx);
};

const drawAxes = (ctx, origin, data, lengthX, lengthY) => {
   ctx.strokeStyle = 'black';
   ctx.lineWidth = 2;

   ctx.beginPath();
   ctx.moveTo(origin.x, origin.y);
   ctx.lineTo(origin.x, origin.y - lengthY - 1);
   ctx.moveTo(origin.x, origin.y);
   ctx.lineTo(origin.x + lengthX + 1, origin.y);
   ctx.stroke();

   drawTicks(ctx, origin, data, lengthX, lengthY);

   // clean up and return
   return resetContext(ctx);
};

const drawCrosshair = (
   ctx,
   origin,
   { jmax, data, dataPoint },
   lengthX,
   lengthY
) => {
   const xloc = origin.x + (dataPoint.y / jmax) * lengthX;
   const ymin = data.layout.angular.min[dataPoint.x];
   const ymax = data.layout.angular.max[dataPoint.x];
   const yval = data.layout.angular.vals[dataPoint.x][dataPoint.y];
   const yloc = origin.y - ((yval - ymin) / (ymax - ymin)) * lengthY;

   ctx.strokeStyle = 'red';
   ctx.lineWidth = 2;
   ctx.setLineDash([5, 5]);

   ctx.beginPath();
   ctx.moveTo(xloc, origin.y);
   if (yloc + _boxSize < origin.y) ctx.lineTo(xloc, yloc + _boxSize);
   ctx.moveTo(xloc, origin.y - lengthY);
   ctx.lineTo(xloc, yloc - _boxSize);
   ctx.stroke();

   ctx.setLineDash([]);
   ctx.beginPath();
   ctx.rect(
      xloc - _boxSize,
      yloc - _boxSize,
      2 * _boxSize + 1,
      2 * _boxSize + 1
   );
   ctx.stroke();

   return resetContext(ctx);
};

const drawRadialPlot = (ctx, data) => {
   if (!data) return; // this will init without data
   if (!data.dataPoint) return;

   // first, clear grid on update
   ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
   const origin = { x: 30, y: ctx.canvas.height - 45 };

   const lengthX = data.scale.x * ctx.canvas.width;
   const lengthY = data.scale.y * ctx.canvas.height;

   drawData(ctx, origin, data, lengthX, lengthY);
   drawCrosshair(ctx, origin, data, lengthX, lengthY);
   drawAxes(ctx, origin, data, lengthX, lengthY);
};

function AngularPlot({ data, setDataPoint }) {
   const updateDataPoint = (ctx, mouseInfo, dataContainer) => {
      if (!dataContainer || !mouseInfo.isActive) return;
      const { top, left } = mouseInfo.rect;
      const clickLocation = {
         x: mouseInfo.location.x - left,
         y: mouseInfo.location.y - top,
      };
      const origin = { x: 30, y: ctx.canvas.height - 45 };
      const lengthX = dataContainer.scale.x * ctx.canvas.width;
      const lengthY = dataContainer.scale.y * ctx.canvas.height;

      if (clickLocation.x < origin.x || clickLocation.x > origin.x + lengthX)
         return;
      if (clickLocation.y > origin.y || clickLocation.y < origin.y - lengthY)
         return;

      const theAdjust = Math.floor(
         ((clickLocation.x - origin.x) / lengthX) * dataContainer.jmax
      );
      setDataPoint({ x: dataContainer.dataPoint.x, y: theAdjust });
   };

   return (
      <InteractiveCanvas
         draw={drawRadialPlot}
         onInteract={updateDataPoint}
         data={data}
         setStyle={{ width: '100%', height: '100%' }}
      />
   );
}

export default AngularPlot;
