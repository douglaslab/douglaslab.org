const o=new WeakMap;function u(r,a,c){let e=o.get(r);e||(e=new Map,o.set(r,e));const n=a;let t=e.get(n);return t||(t=r.createShaderModule({label:c,code:a}),e.set(n,t),t)}export{u as createShaderModule};
//# sourceMappingURL=shader-DOwDLr9M.js.map
