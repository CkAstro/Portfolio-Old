// NOTE: this is a custom gl helper implementation
//    - majority of scene rendering stuff needs to be moved to Renderables
import { Renderable } from 'utils';
import { mat4 } from 'gl-matrix';

class GLHelper {
   constructor() {
      this.isInit = false;
      this.glInstance = null;
      this.shader = null;
      this.projectionMatrix = null;
      this.modelViewMatrix = null;
      this.eyePosition = null;
      this.renderable = null;

      this.zoom = null;
      this.azi = null;
      this.pol = null;

      this.FoV = 45.0;
      this.zNear = 0.1;
      this.zFar = 100.0;
   }

   init(gl, shader) {
      this.glInstance = gl;
      this.shader = shader;
      this.projectionMatrix = this.getProjectionMatrix();
      this.modelViewMatrix = mat4.create();
      this.renderable = new Renderable(gl, shader);

      this.isInit = true;
   }

   getProjectionMatrix() {
      const { width, height } = this.glInstance.canvas;
      return mat4.perspective(
         mat4.create(),
         (this.FoV * Math.PI) / 180.0,
         width / height,
         this.zNear,
         this.zFar
      );
   }

   getModelViewMatrix(camera) {
      const { width, height } = this.glInstance.canvas;
      const azimuthal = (2.0 * Math.PI * camera.azi) / width;
      const polar = (2.0 * Math.PI * camera.pol) / height;
      const { zoom } = camera;

      this.modelViewMatrix = mat4.create();
      mat4.translate(this.modelViewMatrix, this.modelViewMatrix, [
         0.0,
         0.0,
         zoom,
      ]);
      mat4.rotate(
         this.modelViewMatrix,
         this.modelViewMatrix,
         azimuthal,
         [0.0, 1.0, 0.0]
      );
      mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, polar, [
         Math.cos(azimuthal),
         0.0,
         Math.sin(azimuthal),
      ]);

      const invertedView = mat4.invert(mat4.create(), this.modelViewMatrix);
      this.eyePosition = [invertedView[12], invertedView[13], invertedView[14]];
   }

   renderScene(objects, scene, tex) {
      const gl = this.glInstance;

      // clear window
      gl.clearColor(0, 0, 0, 1.0);
      gl.clearDepth(1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);

      const { camera } = scene;
      this.getModelViewMatrix(camera);

      objects.forEach(() => {
         gl.useProgram(this.shader.program);
         gl.uniformMatrix4fv(
            this.shader.uniformLocations.projectionMatrix,
            false,
            this.projectionMatrix
         );
         gl.uniformMatrix4fv(
            this.shader.uniformLocations.modelViewMatrix,
            false,
            this.modelViewMatrix
         );

         gl.uniform3fv(this.shader.uniformLocations.eyePos, this.eyePosition);
         gl.uniform1f(this.shader.uniformLocations.nu, 10.0 ** scene.nu);
         gl.uniform1f(this.shader.uniformLocations.hideCSM, scene.unHideCSM);
         gl.uniform1f(this.shader.uniformLocations.resolution, scene.volDim);

         // enable data texture
         gl.activeTexture(gl.TEXTURE0);
         gl.bindTexture(gl.TEXTURE_3D, tex.data[0]);
         gl.uniform1i(this.shader.uniformLocations.volumeData, 0);

         // enable cmap texture
         gl.activeTexture(gl.TEXTURE1);
         gl.bindTexture(gl.TEXTURE_2D, tex.cmap[0]);
         gl.uniform1i(this.shader.uniformLocations.colormap, 1);

         this.renderable.render();
      });
   }
}

export default GLHelper;
