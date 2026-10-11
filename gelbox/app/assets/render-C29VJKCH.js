import{w as _,a as C,V as W,G as L}from"./index-BlzBdb9c.js";import{b as q,a as $,c as I,n as A,N as k,d as X,e as H,f as Y}from"./globalWarp-Cb-iXEQY.js";import{createShaderModule as B}from"./shader-DOwDLr9M.js";import{createMeshBatch as Q}from"./meshBatch-BGTuoqLC.js";import{createUniformBuffer as G,writeVec2 as h,writeVec4 as j}from"./uniforms-CDgHj7gd.js";import{createQuad as O}from"./quad-DVmPaCt9.js";import M from"./passthrough.vert-Dpbd90Z0.js";import J from"./gel-passthrough.frag-Cs1BeiKx.js";function K(e,t,i,o="rgba8unorm-srgb",p){const d=C(e,{label:p,size:{width:t,height:i},format:o,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC});return{texture:d,view:d.createView(),width:t,height:i,format:o,destroy(){d.destroy()}}}function Z(e,t,i,o="rgba8unorm-srgb",p){let d=N(e,t,i,o,p?`${p}.a`:void 0),u=N(e,t,i,o,p?`${p}.b`:void 0);return{get current(){return d},get next(){return u},swap(){const s=d;d=u,u=s},destroy(){d.destroy(),u.destroy()}}}function N(...e){return _(e[0],()=>K(...e))}function V(...e){return _(e[0],()=>Z(...e))}function z(e,t){const i=B(e,`
    @group(0) @binding(0) var source: texture_2d<f32>;
    @vertex fn vertex(@builtin(vertex_index) index: u32) -> @builtin(position) vec4f {
      let x = f32((index << 1u) & 2u);
      let y = f32(index & 2u);
      return vec4f(x * 2.0 - 1.0, y * 2.0 - 1.0, 0.0, 1.0);
    }
    @fragment fn fragment(@builtin(position) position: vec4f) -> @location(0) vec4f {
      let dimensions = textureDimensions(source);
      let pixel = vec2i(i32(position.x), i32(dimensions.y) - 1 - i32(position.y));
      return textureLoad(source, pixel, 0);
    }
  `,"native-primitive-flip"),o=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}}]}),p=e.createRenderPipeline({label:"native-primitive-flip",layout:e.createPipelineLayout({bindGroupLayouts:[o]}),vertex:{module:i,entryPoint:"vertex"},fragment:{module:i,entryPoint:"fragment",targets:[{format:t}]},primitive:{topology:"triangle-list"}});return{run(d,u,s){const y=e.createBindGroup({layout:o,entries:[{binding:0,resource:u.view}]}),x=d.beginRenderPass({label:"native-primitive-flip",colorAttachments:[{view:s.view,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});x.setPipeline(p),x.setBindGroup(0,y),x.draw(3),x.end()}}}function ee(e,t,i="rgba8unorm-srgb"){const o=Q(e,{viewport:t,blend:"over",format:i,flipY:!0}),p=z(e,i);function d(u){let s=0;for(const n of u)s+=n.data.length;const y=new Float32Array(s);let x=0;for(const n of u)y.set(n.data,x),x+=n.data.length;return{data:y,vertexCount:s/W}}return{draw(u,s,y,x){const n=d([q(y),$(y),I(y)]);o.draw(u,s.next.view,n,{clear:!0,clearColor:{r:0,g:0,b:0,a:1},callIdx:x}),p.run(u,s.next,s.current)},destroy(){o.destroy()}}}const re=`struct PassUniforms {
  positionOffset: vec2f,
  positionScale:  vec2f,
  texCoordOffset: vec2f,
  texCoordScale:  vec2f,
  gelSize:        vec2f,
  _pad:           vec2f,
};

struct BlurUniforms {
  resolution: vec2f,
  direction:  vec2f,
};

@group(0) @binding(0) var<uniform> uPass:    PassUniforms;
@group(0) @binding(1) var          uTex0:    texture_2d<f32>;
@group(0) @binding(2) var          uSampler: sampler;
@group(0) @binding(3) var<uniform> uBlur:    BlurUniforms;

@fragment
fn fs_main(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
  let uv = fragCoord.xy / uBlur.resolution;
  let off1 = vec2f(1.3333333333333333) * uBlur.direction;
  var c = vec4f(0.0);
  c += textureSample(uTex0, uSampler, uv) * 0.29411764705882354;
  c += textureSample(uTex0, uSampler, uv + (off1 / uBlur.resolution)) * 0.35294117647058826;
  c += textureSample(uTex0, uSampler, uv - (off1 / uBlur.resolution)) * 0.35294117647058826;
  return c;
}
`,te=`struct PassUniforms {
  positionOffset: vec2f, positionScale: vec2f,
  texCoordOffset: vec2f, texCoordScale: vec2f,
  gelSize: vec2f, _pad: vec2f,
};
struct BlurUniforms { resolution: vec2f, direction: vec2f };

@group(0) @binding(0) var<uniform> uPass:    PassUniforms;
@group(0) @binding(1) var          uTex0:    texture_2d<f32>;
@group(0) @binding(2) var          uSampler: sampler;
@group(0) @binding(3) var<uniform> uBlur:    BlurUniforms;

@fragment
fn fs_main(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
  let uv = fragCoord.xy / uBlur.resolution;
  let off1 = vec2f(1.3846153846) * uBlur.direction;
  let off2 = vec2f(3.2307692308) * uBlur.direction;
  var c = vec4f(0.0);
  c += textureSample(uTex0, uSampler, uv) * 0.2270270270;
  c += textureSample(uTex0, uSampler, uv + (off1 / uBlur.resolution)) * 0.3162162162;
  c += textureSample(uTex0, uSampler, uv - (off1 / uBlur.resolution)) * 0.3162162162;
  c += textureSample(uTex0, uSampler, uv + (off2 / uBlur.resolution)) * 0.0702702703;
  c += textureSample(uTex0, uSampler, uv - (off2 / uBlur.resolution)) * 0.0702702703;
  return c;
}
`,ne=`struct PassUniforms {
  positionOffset: vec2f, positionScale: vec2f,
  texCoordOffset: vec2f, texCoordScale: vec2f,
  gelSize: vec2f, _pad: vec2f,
};
struct BlurUniforms { resolution: vec2f, direction: vec2f };

@group(0) @binding(0) var<uniform> uPass:    PassUniforms;
@group(0) @binding(1) var          uTex0:    texture_2d<f32>;
@group(0) @binding(2) var          uSampler: sampler;
@group(0) @binding(3) var<uniform> uBlur:    BlurUniforms;

@fragment
fn fs_main(@builtin(position) fragCoord: vec4f) -> @location(0) vec4f {
  let uv = fragCoord.xy / uBlur.resolution;
  let off1 = vec2f(1.411764705882353)  * uBlur.direction;
  let off2 = vec2f(3.2941176470588234) * uBlur.direction;
  let off3 = vec2f(5.176470588235294)  * uBlur.direction;
  var c = vec4f(0.0);
  c += textureSample(uTex0, uSampler, uv) * 0.1964825501511404;
  c += textureSample(uTex0, uSampler, uv + (off1 / uBlur.resolution)) * 0.2969069646728344;
  c += textureSample(uTex0, uSampler, uv - (off1 / uBlur.resolution)) * 0.2969069646728344;
  c += textureSample(uTex0, uSampler, uv + (off2 / uBlur.resolution)) * 0.09447039785044732;
  c += textureSample(uTex0, uSampler, uv - (off2 / uBlur.resolution)) * 0.09447039785044732;
  c += textureSample(uTex0, uSampler, uv + (off3 / uBlur.resolution)) * 0.010381362401148057;
  c += textureSample(uTex0, uSampler, uv - (off3 / uBlur.resolution)) * 0.010381362401148057;
  return c;
}
`;function oe(e,t,i="rgba8unorm-srgb",o=t){const p=O(e),d=B(e,M,"passthrough.vert"),u=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]});function s(m,S){const T=e.createPipelineLayout({bindGroupLayouts:[u]});return e.createRenderPipeline({label:S,layout:T,vertex:{module:d,entryPoint:"vs_main",buffers:[p.layout]},fragment:{module:m,entryPoint:"fs_main",targets:[{format:i}]},primitive:{topology:"triangle-strip"}})}const y=[s(B(e,re,"blur5"),"blur5"),s(B(e,te,"blur9"),"blur9"),s(B(e,ne,"blur13"),"blur13")],x=e.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),n=G(e,48,"blur-pass-uniforms");h(n.view,0,0,0),h(n.view,8,t.width,t.height),h(n.view,16,0,0),h(n.view,24,1,1),h(n.view,32,t.width,t.height),h(n.view,40,0,0),n.upload(e.queue);const a=G(e,16,"blur-uniforms-h");h(a.view,0,o.width,o.height),h(a.view,8,1,0),a.upload(e.queue);const g=G(e,16,"blur-uniforms-v");h(g.view,0,o.width,o.height),h(g.view,8,0,1),g.upload(e.queue);function w(m,S){return e.createBindGroup({layout:u,entries:[{binding:0,resource:{buffer:n.buffer}},{binding:1,resource:m},{binding:2,resource:x},{binding:3,resource:{buffer:S}}]})}return{run(m,S,T){let r=Math.floor(T);for(;r>0;){const f=Math.min(r,3),c=y[f-1];for(let b=0;b<2;b++){const P=b===0?a:g,l=w(S.current.view,P.buffer),v=m.beginRenderPass({colorAttachments:[{view:S.next.view,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});v.setPipeline(c),v.setBindGroup(0,l),v.setVertexBuffer(0,p.buffer),v.draw(p.vertexCount),v.end(),S.swap()}r-=f}},destroy(){n.destroy(),a.destroy(),g.destroy(),p.destroy()}}}const ue=`struct PassUniforms {
  positionOffset: vec2f, positionScale: vec2f,
  texCoordOffset: vec2f, texCoordScale: vec2f,
  gelSize: vec2f, _pad: vec2f,
};
struct WarpUniforms { scale: vec2f, _pad: vec2f };

@group(0) @binding(0) var<uniform> uPass:    PassUniforms;
@group(0) @binding(1) var          uTex0:    texture_2d<f32>;
@group(0) @binding(2) var          uSampler: sampler;
@group(0) @binding(3) var          uTexWarp: texture_2d<f32>;
@group(0) @binding(4) var<uniform> uWarp:    WarpUniforms;

@fragment
fn fs_main(@location(0) texcoord: vec2f) -> @location(0) vec4f {
  // Cinder flips Surface rows on upload; the top-down CPU field already
  // matches WebGPU texture coordinates. Only displacement Y needs inversion.
  let controlCoord = texcoord;
  var warp = textureSample(uTexWarp, uSampler, controlCoord).xy;
  warp = (warp - vec2f(0.5, 0.5)) * 2.0;
  warp = warp * uWarp.scale * vec2f(1.0, -1.0);
  return textureSample(uTex0, uSampler, texcoord + warp);
}
`;function ie(e,t,i="rgba8unorm-srgb"){const o=O(e),p=B(e,M,"passthrough.vert"),d=B(e,ue,"warp.frag"),u=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:4,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),s=e.createPipelineLayout({bindGroupLayouts:[u]}),y=e.createRenderPipeline({label:"warp",layout:s,vertex:{module:p,entryPoint:"vs_main",buffers:[o.layout]},fragment:{module:d,entryPoint:"fs_main",targets:[{format:i}]},primitive:{topology:"triangle-strip"}}),x=e.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),n=G(e,48,"warp-pass-uniforms");h(n.view,0,0,0),h(n.view,8,t.width,t.height),h(n.view,16,0,0),h(n.view,24,1,1),h(n.view,32,t.width,t.height),h(n.view,40,0,0),n.upload(e.queue);const a=[],g=[],w=[],m=[];function S(r,f,c,b,P){for(;r.length<=f;)r.push({tex:C(e,{label:`${P}[${r.length}]`,size:{width:c,height:b},format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),width:c,height:b});const l=r[f];return l.width===c&&l.height===b||(l.tex.destroy(),l.tex=C(e,{label:`${P}[${f}]`,size:{width:c,height:b},format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),l.width=c,l.height=b),l}function T(r,f,c){for(;r.length<=f;)r.push(G(e,16,`${c}[${r.length}]`));return r[f]}return{run(r,f,c,b,P){const l=P==="1d",v=l?a:g,F=l?w:m,U=S(v,b,c.width,c.height,l?"warp-tex-1d":"warp-tex-2d"),E=T(F,b,l?"warp-uniforms-1d":"warp-uniforms-2d");e.queue.writeTexture({texture:U.tex},c.data,{bytesPerRow:c.width*4,rowsPerImage:c.height},{width:c.width,height:c.height}),h(E.view,0,c.scale[0],c.scale[1]),h(E.view,8,0,0),E.upload(e.queue);const D=e.createBindGroup({layout:u,entries:[{binding:0,resource:{buffer:n.buffer}},{binding:1,resource:f.current.view},{binding:2,resource:x},{binding:3,resource:U.tex.createView()},{binding:4,resource:{buffer:E.buffer}}]}),R=r.beginRenderPass({colorAttachments:[{view:f.next.view,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});R.setPipeline(y),R.setBindGroup(0,D),R.setVertexBuffer(0,o.buffer),R.draw(o.vertexCount),R.end(),f.swap()},destroy(){n.destroy();for(const r of w)r.destroy();for(const r of m)r.destroy();w.length=0,m.length=0;for(const r of a)r.tex.destroy();for(const r of g)r.tex.destroy();a.length=0,g.length=0,o.destroy()}}}function se(e,t,i="rgba8unorm-srgb"){const o=O(e),p=B(e,M,"passthrough.vert"),d=B(e,J,"gel-passthrough.frag"),u=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),s=e.createPipelineLayout({bindGroupLayouts:[u]}),y=e.createRenderPipeline({label:"composite",layout:s,vertex:{module:p,entryPoint:"vs_main",buffers:[o.layout]},fragment:{module:d,entryPoint:"fs_composite",targets:[{format:i,blend:{color:{srcFactor:"one",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"triangle-strip"}}),x=e.createSampler({magFilter:"linear",minFilter:"linear",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"}),n=G(e,48,"composite-pass-uniforms"),a=n.view;a.setFloat32(0,0,!0),a.setFloat32(4,0,!0),a.setFloat32(8,t.width,!0),a.setFloat32(12,t.height,!0),a.setFloat32(16,0,!0),a.setFloat32(20,0,!0),a.setFloat32(24,1,!0),a.setFloat32(28,1,!0),a.setFloat32(32,t.width,!0),a.setFloat32(36,t.height,!0),a.setFloat32(40,0,!0),a.setFloat32(44,0,!0),n.upload(e.queue);const g=[];function w(m){for(;g.length<=m;)g.push(G(e,16,`composite-uniforms[${g.length}]`));return g[m]}return{run(m,S,T,r,f,c){const b=w(c);j(b.view,0,r[0],r[1],r[2],1),b.upload(e.queue);const P=e.createBindGroup({layout:u,entries:[{binding:0,resource:{buffer:n.buffer}},{binding:1,resource:S.view},{binding:2,resource:x},{binding:3,resource:{buffer:b.buffer}}]}),l=m.beginRenderPass({colorAttachments:[{view:T.view,loadOp:f?"clear":"load",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]});l.setPipeline(y),l.setBindGroup(0,P),l.setVertexBuffer(0,o.buffer),l.draw(o.vertexCount),l.end()},destroy(){n.destroy();for(const m of g)m.destroy();g.length=0,o.destroy()}}}function ae(e,t,i,o="rgba8unorm"){const p=A(t.width,i),d=A(t.height,i),u=V(e,p,d,o,"band"),s=V(e,p,d,o,"composite"),y=ee(e,t,o),x=oe(e,t,o,{width:p,height:d}),n=ie(e,t,o),a=se(e,t,o);let g=[],w=k,m=null;function S(r,f){return f===1?r:{...r,brightness:r.brightness*f,smearBrightnessAbove:[r.smearBrightnessAbove[0]*f,r.smearBrightnessAbove[1]*f],smearBrightnessBelow:[r.smearBrightnessBelow[0]*f,r.smearBrightnessBelow[1]*f]}}function T(){const r=e.createCommandEncoder({label:"gel-render"}),f=w.h2oDistort?L.h2oDistort.faint:1;let c=0;g.forEach((P,l)=>{const v=S(P,f);y.draw(r,u,v,l);const F=X({x1:v.rect.x1,x2:v.rect.x2,smileHeight:v.smileHeight,smileExp:v.smileExp},t,i);F&&n.run(r,u,F,c++,"1d");const U=H({rect:v.rect,wellDamage:v.wellDamage,wellDamageRandSeed:v.wellDamageRandSeed},t,i);U&&n.run(r,u,U,c++,"1d"),v.blur>0&&x.run(r,u,v.blur*i),a.run(r,u.current,s.current,v.color,l===0,l)}),g.length===0&&r.beginRenderPass({label:"gel-render-empty-clear",colorAttachments:[{view:s.current.view,loadOp:"clear",storeOp:"store",clearValue:{r:0,g:0,b:0,a:1}}]}).end(),(!m||m.gw!==w)&&(m={gw:w,warp:Y(w,t,i)});const b=m.warp;b&&n.run(r,s,b,0,"2d"),e.queue.submit([r.finish()])}return{setBands(r){g=r},setGlobalWarp(r){w=r,m=null},render:()=>_(e,T),get output(){return s.current},destroy(){y.destroy(),x.destroy(),n.destroy(),a.destroy(),u.destroy(),s.destroy()}}}function ve(e,t,i,o="rgba8unorm"){return _(e,()=>ae(e,t,i,o))}export{ve as createGelRenderer};
//# sourceMappingURL=render-C29VJKCH.js.map
