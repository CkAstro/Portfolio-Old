import type { ShaderProgram } from '@/types';
import initBuffers from './initBuffers';
import type { Buffer } from './initBuffers';
import { cube } from './shapes';

class Renderable {
   glInstance: any;
   shaderProgram: ShaderProgram;
   buffers: Buffer;

   constructor(gl: any, shaderProgram: ShaderProgram) {
      this.glInstance = gl;
      this.shaderProgram = shaderProgram;
      this.buffers = initBuffers(gl, cube);
   }

   render() {
      const gl = this.glInstance;

      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertices);
      gl.vertexAttribPointer(
         this.shaderProgram.attribLocations.vertexPosition,
         3,
         gl.FLOAT,
         false,
         0,
         0
      );
      gl.enableVertexAttribArray(
         this.shaderProgram.attribLocations.vertexPosition
      );
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
      gl.drawElements(
         gl.TRIANGLES,
         this.buffers.indexCount,
         gl.UNSIGNED_SHORT,
         0
      );
   }
}

export default Renderable;
