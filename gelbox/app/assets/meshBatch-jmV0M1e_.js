import{w as g,V,b as m}from"./index-DJr3iDrQ.js";import{createUniformBuffer as x,writeVec2 as c}from"./uniforms-D27IV6HW.js";import{createShaderModule as d}from"./shader-DOwDLr9M.js";const z=`struct GeomUniforms {
  gelSize: vec2f,
  _pad:    vec2f,
};

@group(0) @binding(0) var<uniform> uGeom: GeomUniforms;

struct VsOut {
  @builtin(position) clipPos: vec4f,
  @location(0) color: vec4f,
};

@vertex
fn vs_main(@location(0) position: vec2f, @location(1) color: vec4f) -> VsOut {
  let clipXY = vec2f(
    (position.x / uGeom.gelSize.x) * 2.0 - 1.0,
    1.0 - (position.y / uGeom.gelSize.y) * 2.0
  );
  var out: VsOut;
  out.clipPos = vec4f(clipXY, 0.0, 1.0);
  out.color   = color;
  return out;
}

// Reflect the primitive before rasterization so top-left WebGPU coverage
// becomes native OpenGL bottom-left coverage after the exact pixel flip.
@vertex
fn vs_flipped(@location(0) position: vec2f, @location(1) color: vec4f) -> VsOut {
  var out: VsOut;
  out.clipPos = vec4f(
    (position.x / uGeom.gelSize.x) * 2.0 - 1.0,
    (position.y / uGeom.gelSize.y) * 2.0 - 1.0,
    0.0, 1.0
  );
  out.color = color;
  return out;
}
`,O=`@fragment
fn fs_main(@location(0) color: vec4f) -> @location(0) vec4f {
  // Premultiplied additive — color RGB is already in linear space; alpha=1 for solid primitives
  return vec4f(color.rgb * color.a, color.a);
}
`,b=64*1024;function U(e){return e==="additive"?{color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}}:{color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}}}function _(e,r){const v=r.format??"rgba8unorm-srgb",h=d(e,z,"geometry.vert"),y=d(e,O,"geometry.frag"),f=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}}]}),B=e.createRenderPipeline({label:`meshBatch-${r.blend}`,layout:e.createPipelineLayout({bindGroupLayouts:[f]}),vertex:{module:h,entryPoint:r.flipY?"vs_flipped":"vs_main",buffers:[{arrayStride:V*4,stepMode:"vertex",attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:4*2,format:"float32x4"}]}]},fragment:{module:y,entryPoint:"fs_main",targets:[{format:v,blend:U(r.blend)}]},primitive:{topology:"triangle-list"}}),a=x(e,16,"meshBatch-uniforms");c(a.view,0,r.viewport.width,r.viewport.height),c(a.view,8,0,0),a.upload(e.queue);const G=e.createBindGroup({layout:f,entries:[{binding:0,resource:{buffer:a.buffer}}]}),s=[];function P(t,i){for(;s.length<=t;)s.push({buffer:m(e,{label:`meshBatch-vbo[${s.length}]`,size:b,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),size:b});const o=s[t];if(o.size>=i)return o;o.buffer.destroy();let n=o.size;for(;n<i;)n*=2;return o.size=n,o.buffer=m(e,{label:`meshBatch-vbo[${t}]`,size:n,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),o}return{setViewport(t,i){c(a.view,0,t,i),a.upload(e.queue)},draw(t,i,o,{clear:n,clearColor:S,callIdx:w}){return g(e,()=>{const u=S??{r:0,g:0,b:0,a:0};if(o.vertexCount===0){n&&t.beginRenderPass({colorAttachments:[{view:i,loadOp:"clear",storeOp:"store",clearValue:u}]}).end();return}const p=P(w,o.data.byteLength);e.queue.writeBuffer(p.buffer,0,o.data);const l=t.beginRenderPass({colorAttachments:[{view:i,loadOp:n?"clear":"load",storeOp:"store",...n?{clearValue:u}:{}}]});l.setPipeline(B),l.setBindGroup(0,G),l.setVertexBuffer(0,p.buffer),l.draw(o.vertexCount),l.end()})},destroy(){for(const t of s)t.buffer.destroy();s.length=0,a.destroy()}}}function L(e,r){return g(e,()=>_(e,r))}export{L as createMeshBatch};
//# sourceMappingURL=meshBatch-jmV0M1e_.js.map
