const scaleUpData = (
   data: Uint8Array,
   adjust: boolean = true,
   mask: number[] | null = null
): Uint8Array => {
   const scale = 4;
   const scaledData = new Uint8Array(4 * data.length * scale * scale);
   for (let pos = 0; pos < data.length; pos++) {
      let val = data[pos];
      if (adjust) {
         val = ((5.0 + val) / 10.0) * 255;
         val = Math.max(0, Math.min(255, val));
      }

      const axis = data.length ** 0.5;
      const i = pos % axis;
      const j = Math.floor(pos / axis);
      for (let u = 0; u < scale; u++) {
         for (let v = 0; v < scale; v++) {
            const col = i * scale + u;
            const row = j * scale + v;
            const scaledPos = row * axis * scale + col;
            for (let w = 0; w < 3; w++) {
               scaledData[4 * scaledPos + w] = val;
            }
            const dat = scaledData[4 * scaledPos];
            if (mask && mask[pos] !== 255)
               scaledData[4 * scaledPos + 0] = Math.max(
                  0,
                  255 - (255 - dat) ** 1.075
               );
            // if (mask && mask[pos] !== 255) scaledData[4*scaledPos+0] *= 0.8-0.25*(255-mask[pos])/255;
            if (mask && mask[pos] === 255) scaledData[4 * scaledPos + 2] *= 0.9;
            if (mask && mask[pos] === 255) scaledData[4 * scaledPos + 1] *= 0.9;
            scaledData[4 * scaledPos + 3] = 255; // opaque
         }
      }
   }
   return scaledData;
};

const normalizeData = (data: Uint8Array): Uint8Array => {
   const inputSize = data.length ** 0.5;

   // find left/right/top/bottom
   const positions = [inputSize, -1, inputSize, -1];
   for (let pos = 0; pos < data.length; pos++) {
      const i = pos % inputSize;
      const j = Math.floor(pos / inputSize);
      if (data[pos] < 255) {
         positions[0] = Math.min(positions[0], i);
         positions[1] = Math.max(positions[1], i);
         positions[2] = Math.min(positions[2], j);
         positions[3] = Math.max(positions[3], j);
      }
   }

   // shift data
   const shiftX = Math.floor((inputSize - positions[0] - positions[1]) / 2.0);
   const shiftY = Math.floor((inputSize - positions[2] - positions[3]) / 2.0);

   const shiftedData = new Uint8Array(data.length);
   for (let pos = 0; pos < data.length; pos++) {
      const i = pos % inputSize;
      const j = Math.floor(pos / inputSize);

      const iPos = i - shiftX;
      const jPos = j - shiftY;
      if (
         iPos < 0 ||
         iPos > inputSize - 1 ||
         jPos < 0 ||
         jPos > inputSize - 1
      ) {
         shiftedData[pos] = 255;
      } else {
         const shiftedPos = jPos * inputSize + iPos;
         shiftedData[pos] = data[shiftedPos];
      }
   }
   return shiftedData;
};

const scaleDownData = (data: Uint8Array): Uint8Array => {
   const inputSize = 28;
   const scale = 4;
   const scaledData = new Uint8Array(inputSize * inputSize);
   for (let pos = 0; pos < scaledData.length; pos++) {
      const i = pos % inputSize;
      const j = Math.floor(pos / inputSize);
      let avgValue = 0.0;
      for (let u = 0; u < scale; u++) {
         for (let v = 0; v < scale; v++) {
            const row = j * scale + v;
            const col = i * scale + u;
            const dataPos = row * scale * inputSize + col;
            avgValue += data[4 * dataPos];
         }
      }
      scaledData[pos] = avgValue / (scale * scale);
   }
   return scaledData;
};

type MousePos = {
   x: number;
   y: number;
};

const drawLineSegment = (ctx: any, lastPos: MousePos, thisPos: MousePos) => {
   if (!lastPos.x || !lastPos.y) return;
   const lineWidth = 8;
   ctx.lineWidth = lineWidth;

   // get unit vector of the line segment
   const vec = { x: thisPos.x - lastPos.x, y: thisPos.y - lastPos.y };
   const vec2 = (vec.x * vec.x + vec.y * vec.y) ** 0.5;
   const uvec = { x: vec.x / vec2, y: vec.y / vec2 };

   // then add unit vector to each end
   const v1 = {
      x: lastPos.x - (lineWidth / 4) * uvec.x,
      y: lastPos.y - (lineWidth / 4) * uvec.y,
   };
   const v2 = {
      x: thisPos.x + (lineWidth / 4) * uvec.x,
      y: thisPos.y + (lineWidth / 4) * uvec.y,
   };

   ctx.beginPath();
   ctx.moveTo(v1.x, v1.y);
   ctx.lineTo(v2.x, v2.y);
   ctx.stroke();
};

type NetworkOutput = {
   z: number | null;
   activation: number | null;
   ind: number;
};

const getDefaultOutput = (): NetworkOutput[] => {
   let output: NetworkOutput[] = [];
   for (let i = 0; i < 10; i++) {
      output = output.concat({ z: null, activation: null, ind: i });
   }
   return output;
};

export {
   scaleUpData,
   normalizeData,
   scaleDownData,
   drawLineSegment,
   getDefaultOutput,
};
