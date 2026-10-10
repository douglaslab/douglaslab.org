function P(r,S,d,n,o=[]){const i=`#version 300 es
precision highp float;
`+o.map(t=>`#define ${t} 1
`).join("");let c=null,h=null,e=null;try{if(c=s(r,r.VERTEX_SHADER,i+S,`${n}.vert`),h=s(r,r.FRAGMENT_SHADER,i+d,`${n}.frag`),e=r.createProgram(),!e)throw new Error(`createProgram returned null for ${n}`);if(r.attachShader(e,c),r.attachShader(e,h),r.linkProgram(e),!r.getProgramParameter(e,r.LINK_STATUS))throw new Error(`Program link failed for ${n}: ${r.getProgramInfoLog(e)||""}`);r.detachShader(e,c),r.detachShader(e,h)}catch(t){throw e&&r.deleteProgram(e),t}finally{c&&r.deleteShader(c),h&&r.deleteShader(h)}const f=e,m=new Map,u=new Map;return{gl:r,program:f,uniform(t){let a=m.get(t);return a===void 0&&(a=r.getUniformLocation(f,t),m.set(t,a)),a},attrib(t){let a=u.get(t);return a===void 0&&(a=r.getAttribLocation(f,t),u.set(t,a)),a},destroy(){r.deleteProgram(f)}}}function s(r,S,d,n){const o=r.createShader(S);if(!o)throw new Error(`createShader returned null for ${n}`);try{if(r.shaderSource(o,d),r.compileShader(o),!r.getShaderParameter(o,r.COMPILE_STATUS)){const i=r.getShaderInfoLog(o)||"";throw new Error(`Shader compile failed for ${n}: ${i}
--- source ---
${d}`)}return o}catch(i){throw r.deleteShader(o),i}}export{P as createGlProgram};
//# sourceMappingURL=program-DkyvT7kn.js.map
