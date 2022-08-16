

// vertex shader
const vs = 
`#version 300 es
   in vec4 aVertexPosition;
   uniform mat4 uModelViewMatrix;
   uniform mat4 uProjectionMatrix;
   uniform vec3 uEyePos;               // effective camera position

   out vec3 rayDirection;
   flat out vec3 eyePos;

   void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      eyePos = uEyePos;
      rayDirection = aVertexPosition.xyz - uEyePos;
   }
`;

const fs = 
`#version 300 es
   precision highp float;

   in vec3 rayDirection;
   flat in vec3 eyePos;

   uniform highp sampler3D volumeData;
   uniform highp sampler2D colormap;

   uniform float uResolution;    

   out vec4 color;                        // vertex shader output
   
   // determine if LoS intersects cube
   vec2 intersectCube(vec3 eye, vec3 dir) { 
      vec3 cubeMin = vec3(-1.0);
      vec3 cubeMax = vec3(1.0);
      vec3 invDir = 1.0 / dir;
      vec3 tmpMin = invDir * (cubeMin - eye);
      vec3 tmpMax = invDir * (cubeMax - eye);
      vec3 vecMin = min(tmpMin, tmpMax);
      vec3 vecMax = max(tmpMin, tmpMax);
      return vec2(
         max(vecMin.x, max(vecMin.y, vecMin.z)),
         min(vecMax.x, min(vecMax.y, vecMax.z))
      );
   }

   void main(void) {
      vec3 rayDir = normalize(rayDirection);

      vec2 cube = intersectCube(eyePos, rayDir);
      if (cube.x > cube.y) discard;
      cube.x = max(cube.x, 0.0);

      vec3 dlVec = 1.0 / (vec3(uResolution) * abs(rayDir));
      float dl = min(dlVec.x, min(dlVec.y, dlVec.z));

      vec3 p = eyePos + cube.x * rayDir;
      color = vec4(0.0);

      for (float l=cube.x; l<cube.y; l+=dl) {
         float val = texture(volumeData, (p+1.0)*0.5).r;
         vec4 cval = texture(colormap, vec2(val, 0.5)); 
         // cval.a = 1.0 - pow(1.0 - cval.a, 0.25);
         cval.a = cval.a * 0.25;

         color.rgb += (1.0 - color.a) * cval.a * cval.rgb;
         color.a += (1.0 - color.a) * cval.a;
         if (color.a > 0.95) break;

         p += rayDir * dl;
      }
      // if (color.a == 0.0) color = vec4(vec3(0.0), 1.0);
   }
`;

function loadShader(gl, type, source) {

   // send source to shader and compile
   const shader = gl.createShader(type);
   gl.shaderSource(shader, source);
   gl.compileShader(shader);

   // check if shader compiled successfully
   if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('Could not compile shader; WebGL cannot run.');
      gl.deleteShader(shader);
      return null;
   }
   return shader;
}

const buildShader = gl => {

   // load shaders
   const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vs);
   const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fs);

   // create program, attach shaders
   const shaderProgram = gl.createProgram();
   gl.attachShader(shaderProgram, vertexShader);
   gl.attachShader(shaderProgram, fragmentShader);
   gl.linkProgram(shaderProgram);

   // alert if shader program failed
   if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Could not initialize shader program; WebGL cannot run.');
      return null;
   }

   return {
      program: shaderProgram,
      attribLocations: {
         vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
         projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
         modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
         resolution: gl.getUniformLocation(shaderProgram, 'uResolution'),
         volumeData: gl.getUniformLocation(shaderProgram, 'volumeData'),
         colormap: gl.getUniformLocation(shaderProgram, 'colormap'),
         eyePos: gl.getUniformLocation(shaderProgram, 'uEyePos'),
      },
   }
}

export default buildShader;