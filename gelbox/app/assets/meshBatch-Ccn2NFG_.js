import{createGlProgram as C}from"./program-DkyvT7kn.js";import{V as F}from"./index-C9_Q1tKt.js";const B=`in vec2 aPos;
in vec4 aColor;

uniform vec2 uGelSize;

out vec4 vColor;

void main() {
  vec2 clipXY = vec2(
    (aPos.x / uGelSize.x) * 2.0 - 1.0,
    1.0 - (aPos.y / uGelSize.y) * 2.0
  );
  gl_Position = vec4(clipXY, 0.0, 1.0);
  vColor = aColor;
}
`,m=`in vec4 vColor;
out vec4 fragColor;

void main() {
  // Premultiplied additive — color RGB is already in linear space; alpha=1 for solid primitives
  fragColor = vec4(vColor.rgb * vColor.a, vColor.a);
}
`;function N(e,i){const n=C(e,B,m,`meshBatch-${i.blend}`);let t=e.createBuffer(),f=0,v=i.viewport.width,d=i.viewport.height;function A(r){f>=r||(f=Math.max(r,64*1024),e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,f,e.DYNAMIC_DRAW))}function s(){e.enable(e.BLEND),i.blend==="additive"?e.blendFuncSeparate(e.ONE,e.ONE,e.ONE,e.ONE):e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA),e.blendEquation(e.FUNC_ADD)}return{setViewport(r,o){v=r,d=o},draw(r,o,{clear:E,clearColor:R}){if(e.bindFramebuffer(e.FRAMEBUFFER,r.framebuffer),e.viewport(0,0,r.width,r.height),E){const a=R??[0,0,0,0];e.disable(e.BLEND),e.clearColor(a[0],a[1],a[2],a[3]),e.clear(e.COLOR_BUFFER_BIT)}if(o.vertexCount===0)return;A(o.data.byteLength),e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferSubData(e.ARRAY_BUFFER,0,o.data),e.useProgram(n.program),e.uniform2f(n.uniform("uGelSize"),v,d);const c=n.attrib("aPos"),u=n.attrib("aColor"),b=F*4;c>=0&&(e.enableVertexAttribArray(c),e.vertexAttribPointer(c,2,e.FLOAT,!1,b,0)),u>=0&&(e.enableVertexAttribArray(u),e.vertexAttribPointer(u,4,e.FLOAT,!1,b,8)),s(),e.drawArrays(e.TRIANGLES,0,o.vertexCount),e.disable(e.BLEND)},destroy(){n.destroy(),t&&e.deleteBuffer(t),t=null}}}export{N as createGlMeshBatch};
//# sourceMappingURL=meshBatch-Ccn2NFG_.js.map
