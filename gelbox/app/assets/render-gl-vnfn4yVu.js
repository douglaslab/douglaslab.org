import{n as O,N as q,d as Q,e as Y,f as j,b as J,a as K,c as Z}from"./globalWarp-BgHvRkXS.js";import{c as z,G as l,V as g}from"./index-CG_tsik3.js";import{createGlProgram as D}from"./program-DkyvT7kn.js";import{createGlQuad as ee,bindQuadAttribs as U}from"./quad-0DRiqXI7.js";import{createGlMeshBatch as re}from"./meshBatch-BJXvUd4O.js";import b from"./passthrough.vert-C2lNNOhN.js";import oe from"./gel-passthrough.frag-C8CjQLHU.js";function M(e,u,f,a){const c=e.createTexture();if(!c)throw new Error(`createTexture failed${a?` (${a})`:""}`);e.bindTexture(e.TEXTURE_2D,c),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA8,u,f),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.bindTexture(e.TEXTURE_2D,null);const n=e.createFramebuffer();if(!n)throw new Error(`createFramebuffer failed${a?` (${a})`:""}`);e.bindFramebuffer(e.FRAMEBUFFER,n),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,c,0);const s=e.checkFramebufferStatus(e.FRAMEBUFFER);if(s!==e.FRAMEBUFFER_COMPLETE)throw e.bindFramebuffer(e.FRAMEBUFFER,null),e.deleteFramebuffer(n),e.deleteTexture(c),new Error(`framebuffer incomplete (status=0x${s.toString(16)})${a?` for ${a}`:""}`);return e.bindFramebuffer(e.FRAMEBUFFER,null),{gl:e,texture:c,framebuffer:n,width:u,height:f,destroy(){e.deleteFramebuffer(n),e.deleteTexture(c)}}}function I(e,u,f,a){let c=M(e,u,f,a?`${a}.a`:void 0),n=M(e,u,f,a?`${a}.b`:void 0);return{get current(){return c},get next(){return n},swap(){const s=c;c=n,n=s},destroy(){c.destroy(),n.destroy()}}}const te=`uniform sampler2D uTex0;
uniform sampler2D uTexWarp;
uniform vec2 uWarpScale;

in vec2 vTexCoord;
out vec4 fragColor;

void main() {
  // Cinder flips Surface rows on upload; our CPU upload remains top-down.
  vec2 controlCoord = vec2(vTexCoord.x, 1.0 - vTexCoord.y);
  vec2 warp = texture(uTexWarp, controlCoord).xy;
  warp = (warp - vec2(0.5, 0.5)) * 2.0;
  warp = warp * uWarpScale;
  fragColor = texture(uTex0, vTexCoord + warp);
}
`,ue=`uniform sampler2D uTex0;
uniform vec2 uResolution;
uniform vec2 uDirection;

out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 off1 = vec2(1.3333333333333333) * uDirection;
  vec4 c = vec4(0.0);
  c += texture(uTex0, uv) * 0.29411764705882354;
  c += texture(uTex0, uv + (off1 / uResolution)) * 0.35294117647058826;
  c += texture(uTex0, uv - (off1 / uResolution)) * 0.35294117647058826;
  fragColor = c;
}
`,ne=`uniform sampler2D uTex0;
uniform vec2 uResolution;
uniform vec2 uDirection;

out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 off1 = vec2(1.3846153846) * uDirection;
  vec2 off2 = vec2(3.2307692308) * uDirection;
  vec4 c = vec4(0.0);
  c += texture(uTex0, uv) * 0.2270270270;
  c += texture(uTex0, uv + (off1 / uResolution)) * 0.3162162162;
  c += texture(uTex0, uv - (off1 / uResolution)) * 0.3162162162;
  c += texture(uTex0, uv + (off2 / uResolution)) * 0.0702702703;
  c += texture(uTex0, uv - (off2 / uResolution)) * 0.0702702703;
  fragColor = c;
}
`,ie=`uniform sampler2D uTex0;
uniform vec2 uResolution;
uniform vec2 uDirection;

out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 off1 = vec2(1.411764705882353)  * uDirection;
  vec2 off2 = vec2(3.2941176470588234) * uDirection;
  vec2 off3 = vec2(5.176470588235294)  * uDirection;
  vec4 c = vec4(0.0);
  c += texture(uTex0, uv) * 0.1964825501511404;
  c += texture(uTex0, uv + (off1 / uResolution)) * 0.2969069646728344;
  c += texture(uTex0, uv - (off1 / uResolution)) * 0.2969069646728344;
  c += texture(uTex0, uv + (off2 / uResolution)) * 0.09447039785044732;
  c += texture(uTex0, uv - (off2 / uResolution)) * 0.09447039785044732;
  c += texture(uTex0, uv + (off3 / uResolution)) * 0.010381362401148057;
  c += texture(uTex0, uv - (off3 / uResolution)) * 0.010381362401148057;
  fragColor = c;
}
`;function xe(e,u,f){return z(e,()=>fe(e,u,f))}function fe(e,u,f){const a=O(u.width,f),c=O(u.height,f),n=I(e,a,c,"band"),s=I(e,a,c,"composite"),F=ee(e),T=D(e,b,te,"warp"),w=D(e,b,ue,"blur5"),A=D(e,b,ne,"blur9"),C=D(e,b,ie,"blur13"),E=D(e,b,oe,"composite",["GEL_COMPOSITE"]),B=re(e,{viewport:u,blend:"over"});let R=null,X=0,x=null,P=0,G=0;function N(r,o){return o===1?(R&&X===r||(R&&e.deleteTexture(R),X=r,R=e.createTexture(),e.bindTexture(e.TEXTURE_2D,R),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA8,r,1),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),R):(x&&P===r&&G===o||(x&&e.deleteTexture(x),P=r,G=o,x=e.createTexture(),e.bindTexture(e.TEXTURE_2D,x),e.texStorage2D(e.TEXTURE_2D,1,e.RGBA8,r,o),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)),x)}let h=[],_=q,v=null;function y(r,o){return o===1?r:{...r,brightness:r.brightness*o,smearBrightnessAbove:[r.smearBrightnessAbove[0]*o,r.smearBrightnessAbove[1]*o],smearBrightnessBelow:[r.smearBrightnessBelow[0]*o,r.smearBrightnessBelow[1]*o]}}function W(r){let o=0;for(const t of r)o+=t.data.length;const i=new Float32Array(o);let m=0;for(const t of r)i.set(t.data,m),m+=t.data.length;return{data:i,vertexCount:o/g}}function S(r){e.bindFramebuffer(e.FRAMEBUFFER,r.framebuffer),e.viewport(0,0,r.width,r.height),e.disable(e.BLEND),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT)}function $(r,o){const i=W([J(o),K(o),Z(o)]);B.draw({framebuffer:r.framebuffer,width:r.width,height:r.height},i,{clear:!0,clearColor:[0,0,0,1]})}function p(r,o){const i=N(o.width,o.height);e.bindTexture(e.TEXTURE_2D,i),e.texSubImage2D(e.TEXTURE_2D,0,0,0,o.width,o.height,e.RGBA,e.UNSIGNED_BYTE,o.data),e.bindFramebuffer(e.FRAMEBUFFER,r.next.framebuffer),e.viewport(0,0,r.next.width,r.next.height),e.disable(e.BLEND),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(T.program),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r.current.texture),e.uniform1i(T.uniform("uTex0"),0),e.activeTexture(e.TEXTURE1),e.bindTexture(e.TEXTURE_2D,i),e.uniform1i(T.uniform("uTexWarp"),1),e.uniform2f(T.uniform("uWarpScale"),o.scale[0],o.scale[1]),e.uniform2f(T.uniform("uPositionOffset"),0,0),e.uniform2f(T.uniform("uPositionScale"),u.width,u.height),e.uniform2f(T.uniform("uTexCoordOffset"),0,1),e.uniform2f(T.uniform("uTexCoordScale"),1,-1),e.uniform2f(T.uniform("uGelSize"),u.width,u.height),U(e,F.buffer,T.attrib("aPos"),T.attrib("aTexCoord")),e.drawArrays(e.TRIANGLE_STRIP,0,4),r.swap()}function k(r,o){let i=Math.floor(o);for(;i>0;){const m=Math.min(i,3),t=m===1?w:m===2?A:C;for(let d=0;d<2;d++)e.bindFramebuffer(e.FRAMEBUFFER,r.next.framebuffer),e.viewport(0,0,r.next.width,r.next.height),e.disable(e.BLEND),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT),e.useProgram(t.program),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r.current.texture),e.uniform1i(t.uniform("uTex0"),0),e.uniform2f(t.uniform("uResolution"),r.current.width,r.current.height),e.uniform2f(t.uniform("uDirection"),d===0?1:0,d===0?0:1),e.uniform2f(t.uniform("uPositionOffset"),0,0),e.uniform2f(t.uniform("uPositionScale"),u.width,u.height),e.uniform2f(t.uniform("uTexCoordOffset"),0,1),e.uniform2f(t.uniform("uTexCoordScale"),1,-1),e.uniform2f(t.uniform("uGelSize"),u.width,u.height),U(e,F.buffer,t.attrib("aPos"),t.attrib("aTexCoord")),e.drawArrays(e.TRIANGLE_STRIP,0,4),r.swap();i-=m}}function H(r,o,i,m){e.bindFramebuffer(e.FRAMEBUFFER,o.framebuffer),e.viewport(0,0,o.width,o.height),m&&(e.disable(e.BLEND),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT)),e.useProgram(E.program),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,r.texture),e.uniform1i(E.uniform("uTex0"),0),e.uniform3f(E.uniform("uTint"),i[0],i[1],i[2]),e.uniform2f(E.uniform("uPositionOffset"),0,0),e.uniform2f(E.uniform("uPositionScale"),u.width,u.height),e.uniform2f(E.uniform("uTexCoordOffset"),0,1),e.uniform2f(E.uniform("uTexCoordScale"),1,-1),e.uniform2f(E.uniform("uGelSize"),u.width,u.height),U(e,F.buffer,E.attrib("aPos"),E.attrib("aTexCoord")),e.enable(e.BLEND),e.blendFuncSeparate(e.ONE,e.ONE,e.ONE,e.ONE),e.blendEquation(e.FUNC_ADD),e.drawArrays(e.TRIANGLE_STRIP,0,4)}function V(){const r=_.h2oDistort?l.h2oDistort.faint:1;h.forEach((i,m)=>{const t=y(i,r);$(n.current,t);const d=Q({x1:t.rect.x1,x2:t.rect.x2,smileHeight:t.smileHeight,smileExp:t.smileExp},u,f);d&&p(n,d);const L=Y({rect:t.rect,wellDamage:t.wellDamage,wellDamageRandSeed:t.wellDamageRandSeed},u,f);L&&p(n,L),t.blur>0&&k(n,t.blur*f),H(n.current,s.current,t.color,m===0)}),h.length===0&&S(s.current),(!v||v.gw!==_)&&(v={gw:_,warp:j(_,u,f)});const o=v.warp;o&&p(s,o)}return{setBands(r){h=r},setGlobalWarp(r){_=r,v=null},render:V,get output(){return s.current},destroy(){B.destroy(),T.destroy(),w.destroy(),A.destroy(),C.destroy(),E.destroy(),F.destroy(),n.destroy(),s.destroy(),R&&e.deleteTexture(R),x&&e.deleteTexture(x)}}}export{xe as createGlGelRenderer};
//# sourceMappingURL=render-gl-vnfn4yVu.js.map
