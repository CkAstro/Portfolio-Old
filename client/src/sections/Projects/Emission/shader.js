

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

   uniform float nu;
   uniform float uResolution;    
   uniform float uHideCSM;                // T/F is converted to 1.0/0.0

   out vec4 color;                        // vertex shader output
   
   // determine if LoS intersects sphere
   // 'd' gives front and back intersection points if
   // LoS = eye + d*dir                   // dir must be normalized
   // dot(eye+d*dir, eye+d*dir) = radius**2
   vec2 intersectSphere(vec3 eye, vec3 dir) {
      float uo = dot(dir, eye);
      float oo = dot(eye, eye);
      float inner = dot(                  // quick uo*uo - (oo-r**2)
         vec2(uo, -1.0),
         vec2(uo, oo-1.0)                // radius == 0.5
      ); 
      if (inner < 0.0) {
         return vec2(1.0, 0.0);           // force x > y so we toss point
      }
      float width = sqrt(inner);
      return vec2(
         -uo - width,
         -uo + width
      );
   }

   void main(void) {
      float uStepRes = 1.0;

      vec3 rayDir = normalize(rayDirection);
      // float nu1 = 1.0 / nu;
      float nu2 = pow(nu, -2.1);

      vec2 sph = intersectSphere(eyePos, rayDir);
      if (sph.x > sph.y) discard;
      sph.x = max(sph.x, 0.0);

      vec3 dlVec = 1.0 / (vec3(uResolution) * abs(rayDir));
      float dl = uStepRes * min(dlVec.x, min(dlVec.y, dlVec.z));

      vec3 p = eyePos + sph.x * rayDir;
      float tau = 1.0;
      float Iv = 0.0;

      for (float l=sph.x; l<sph.y; l+=dl) {
         vec4 val = texture(volumeData, (p+1.0)*0.5);
         if (abs(p.y) > 0.29*2.0) val.r = 0.0;      // noise cutoff

         // emission
         if (val.r > 0.0) Iv += tau * val.r;// * nu1;

         // attenuation
         float kv = val.g * nu2;
         if (kv > 1.0 || kv < 0.0) {
            tau = 0.01;             // for CSM view
            break;
         }
         tau *= 1.0 - kv;
         if (tau < 0.01) break;     // break if opaque
         p += rayDir * dl;
      }

      Iv *= (log(nu) * 434.29) / nu;
      vec3 clr = texture(colormap, vec2(Iv, 0.5)).rgb;
      vec3 csm = vec3(0.0, 0.0, 0.75-tau);
      color = vec4(clr + uHideCSM*csm, 1.0);
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
         hideCSM: gl.getUniformLocation(shaderProgram, 'uHideCSM'),
         eyePos: gl.getUniformLocation(shaderProgram, 'uEyePos'),
         nu: gl.getUniformLocation(shaderProgram, 'nu'),
      },
   }
}

export default buildShader;