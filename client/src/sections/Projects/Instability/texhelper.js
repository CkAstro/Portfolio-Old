// NOTE: this is a custom texture helper implementation
//    - init() loads 41 data textures for animation

// NOTE: on page switch, a new gl instance is created and this must recreate
//    all textures; attempted to save texture buffer and recreate from buffer
//    data, but this is no faster than just recreating from image

const getBaseUrl = (hostname) => {
   if (hostname.includes('localhost')) return 'http://localhost:3004/api/img';
   if (hostname.includes('192')) return `http://${hostname}:3004/api/img`;
   return '/api/img';
}

class TextureHelper {
   constructor() {
      this.loaded = 0;
      this.textures = {
         data: [],
         cmap: [],
      }
      this.glInstance = null;
      this.isInit = false;
      this.baseUrl = getBaseUrl(window.location.hostname);
   }

   init(gl) {
      this.glInstance = gl;
      this.loaded = 0;
      this.textures = {
         data: [],
         cmap: [],
      }

      // scaling process in data texture will lock up browser, delay added for CSS transition
      setTimeout(() => {
         this.textures.cmap = this.textures.cmap.concat(this.loadCmapFromImage('instability_cmap.png'));
         for (let i=0; i<41; i++) {
            const file = i < 10 
               ? `instability_64__0${i}.png`
               : `instability_64__${i}.png`
            ;
            this.textures.data = this.textures.data.concat(this.loadDataFromImage(file));
         }
      }, 750);

      this.isInit = true;
   }

   loadCmapFromImage(imgFile) {
      const gl = this.glInstance;
      const texture = gl.createTexture();

      const image = new Image;
      image.onload = () => {
         gl.bindTexture(gl.TEXTURE_2D, texture);
         gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
      image.crossOrigin = '';
      image.src = `${this.baseUrl}/${imgFile}`;
      return texture;
   }

   loadDataFromImage(imgFile) {
      const gl = this.glInstance;
      const texture = gl.createTexture();

      const image = new Image;
      image.onload = () => {
         const canvas = document.createElement('canvas');
         canvas.width = image.width;
         canvas.height = image.height;
         const ctx = canvas.getContext('2d');
         ctx.drawImage(image, 0, 0);

         let volRes;
         if (image.width === image.height) {
            const guess = image.width**(2./3.);
            if (Math.abs(guess - Math.round(guess)) < 0.1) volRes = Math.round(guess);
         }
         if (!volRes) return console.log('non-pow(2)**3 image dimensions not yet accounted for');

         // init 3D texture
         gl.bindTexture(gl.TEXTURE_3D, texture);
         gl.texStorage3D(gl.TEXTURE_3D, 1, gl.RGBA32F, volRes, volRes, volRes);
         gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
         gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
         gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

         // loop through image and fill texture
         let sliceCount = Math.floor(volRes**0.5);
         if (volRes % sliceCount) sliceCount += 1;    // add one if not perfect square
         const dataBuffer = new Float32Array(4*volRes*volRes*volRes);
         for (let k=0; k<volRes; k++) {
            // grab each slice, scale, and add to dataBuffer
            const x = k % sliceCount;
            const y = Math.floor(k/sliceCount);
            const img = ctx.getImageData(x*volRes, y*volRes, volRes, volRes);
   
            for (let j=0; j<volRes; j++) {
               for (let i=0; i<volRes; i++) {
                  for (let n=0; n<3; n++) {
                     // NOTE, this is (j,i,k) instead of (k,i,j) to re-orient incorrect images
                     dataBuffer[4*j*volRes*volRes+4*i*volRes+4*k+n] = img.data[4*j*volRes+4*i+n] / 255.0;
                  }
               }
            }
         }
         // add to texture layer by layer
         gl.texSubImage3D(gl.TEXTURE_3D, 0, 0, 0, 0, volRes, volRes, volRes, gl.RGBA, gl.FLOAT, dataBuffer);
         return this.loaded++;
      }
      image.crossOrigin = '';
      image.src = `${this.baseUrl}/${imgFile}`;
      return texture;
   }
}

export default TextureHelper;