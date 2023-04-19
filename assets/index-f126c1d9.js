const te=(e,n)=>e===n,ne=Symbol("solid-track"),B={equals:te};let se=Y;const x=1,O=2,H={owned:null,cleanups:null,context:null,owner:null};var d=null;let q=null,a=null,p=null,S=null,I=0;function $(e,n){const t=a,s=d,l=e.length===0,o=l?H:{owned:null,cleanups:null,context:null,owner:n===void 0?s:n},f=l?e:()=>e(()=>C(()=>U(o)));d=o,a=null;try{return v(f,!0)}finally{a=t,d=s}}function le(e,n){n=n?Object.assign({},B,n):B;const t={value:e,observers:null,observerSlots:null,comparator:n.equals||void 0},s=l=>(typeof l=="function"&&(l=l(t.value)),W(t,l));return[Q.bind(t),s]}function K(e,n,t){const s=X(e,n,!1,x);P(s)}function M(e,n,t){t=t?Object.assign({},B,t):B;const s=X(e,n,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=t.equals||void 0,P(s),Q.bind(s)}function C(e){if(a===null)return e();const n=a;a=null;try{return e()}finally{a=n}}function ie(e){return d===null||(d.cleanups===null?d.cleanups=[e]:d.cleanups.push(e)),e}function Q(){if(this.sources&&this.state)if(this.state===x)P(this);else{const e=p;p=null,v(()=>j(this),!1),p=e}if(a){const e=this.observers?this.observers.length:0;a.sources?(a.sources.push(this),a.sourceSlots.push(e)):(a.sources=[this],a.sourceSlots=[e]),this.observers?(this.observers.push(a),this.observerSlots.push(a.sources.length-1)):(this.observers=[a],this.observerSlots=[a.sources.length-1])}return this.value}function W(e,n,t){let s=e.value;return(!e.comparator||!e.comparator(s,n))&&(e.value=n,e.observers&&e.observers.length&&v(()=>{for(let l=0;l<e.observers.length;l+=1){const o=e.observers[l],f=q&&q.running;f&&q.disposed.has(o),(f?!o.tState:!o.state)&&(o.pure?p.push(o):S.push(o),o.observers&&Z(o)),f||(o.state=x)}if(p.length>1e6)throw p=[],new Error},!1)),n}function P(e){if(!e.fn)return;U(e);const n=d,t=a,s=I;a=d=e,oe(e,e.value,s),a=t,d=n}function oe(e,n,t){let s;try{s=e.fn(n)}catch(l){return e.pure&&(e.state=x,e.owned&&e.owned.forEach(U),e.owned=null),e.updatedAt=t+1,z(l)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?W(e,s):e.value=s,e.updatedAt=t)}function X(e,n,t,s=x,l){const o={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:n,owner:d,context:null,pure:t};return d===null||d!==H&&(d.owned?d.owned.push(o):d.owned=[o]),o}function J(e){if(e.state===0)return;if(e.state===O)return j(e);if(e.suspense&&C(e.suspense.inFallback))return e.suspense.effects.push(e);const n=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<I);)e.state&&n.push(e);for(let t=n.length-1;t>=0;t--)if(e=n[t],e.state===x)P(e);else if(e.state===O){const s=p;p=null,v(()=>j(e,n[0]),!1),p=s}}function v(e,n){if(p)return e();let t=!1;n||(p=[]),S?t=!0:S=[],I++;try{const s=e();return fe(t),s}catch(s){t||(S=null),p=null,z(s)}}function fe(e){if(p&&(Y(p),p=null),e)return;const n=S;S=null,n.length&&v(()=>se(n),!1)}function Y(e){for(let n=0;n<e.length;n++)J(e[n])}function j(e,n){e.state=0;for(let t=0;t<e.sources.length;t+=1){const s=e.sources[t];if(s.sources){const l=s.state;l===x?s!==n&&(!s.updatedAt||s.updatedAt<I)&&J(s):l===O&&j(s,n)}}}function Z(e){for(let n=0;n<e.observers.length;n+=1){const t=e.observers[n];t.state||(t.state=O,t.pure?p.push(t):S.push(t),t.observers&&Z(t))}}function U(e){let n;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),l=t.observers;if(l&&l.length){const o=l.pop(),f=t.observerSlots.pop();s<l.length&&(o.sourceSlots[f]=s,l[s]=o,t.observerSlots[s]=f)}}if(e.owned){for(n=e.owned.length-1;n>=0;n--)U(e.owned[n]);e.owned=null}if(e.cleanups){for(n=e.cleanups.length-1;n>=0;n--)e.cleanups[n]();e.cleanups=null}e.state=0,e.context=null}function z(e){throw e}const re=Symbol("fallback");function R(e){for(let n=0;n<e.length;n++)e[n]()}function ue(e,n,t={}){let s=[],l=[],o=[],f=0,i=n.length>1?[]:null;return ie(()=>R(o)),()=>{let u=e()||[],c,r;return u[ne],C(()=>{let h=u.length,w,m,T,L,k,y,b,A,E;if(h===0)f!==0&&(R(o),o=[],s=[],l=[],f=0,i&&(i=[])),t.fallback&&(s=[re],l[0]=$(ee=>(o[0]=ee,t.fallback())),f=1);else if(f===0){for(l=new Array(h),r=0;r<h;r++)s[r]=u[r],l[r]=$(g);f=h}else{for(T=new Array(h),L=new Array(h),i&&(k=new Array(h)),y=0,b=Math.min(f,h);y<b&&s[y]===u[y];y++);for(b=f-1,A=h-1;b>=y&&A>=y&&s[b]===u[A];b--,A--)T[A]=l[b],L[A]=o[b],i&&(k[A]=i[b]);for(w=new Map,m=new Array(A+1),r=A;r>=y;r--)E=u[r],c=w.get(E),m[r]=c===void 0?-1:c,w.set(E,r);for(c=y;c<=b;c++)E=s[c],r=w.get(E),r!==void 0&&r!==-1?(T[r]=l[c],L[r]=o[c],i&&(k[r]=i[c]),r=m[r],w.set(E,r)):o[c]();for(r=y;r<h;r++)r in T?(l[r]=T[r],o[r]=L[r],i&&(i[r]=k[r],i[r](r))):l[r]=$(g);l=l.slice(0,f=h),s=u.slice(0)}return l});function g(h){if(o[r]=h,i){const[w,m]=le(r);return i[r]=m,n(u[r],w)}return n(u[r])}}}function pe(e,n){return C(()=>e(n||{}))}const ce=e=>`Stale read from <${e}>.`;function ge(e){const n="fallback"in e&&{fallback:()=>e.fallback};return M(ue(()=>e.each,e.children,n||void 0))}function we(e){const n=e.keyed,t=M(()=>e.when,void 0,{equals:(s,l)=>n?s===l:!s==!l});return M(()=>{const s=t();if(s){const l=e.children;return typeof l=="function"&&l.length>0?C(()=>l(n?s:()=>{if(!C(t))throw ce("Show");return e.when})):l}return e.fallback},void 0,void 0)}function ae(e,n,t){let s=t.length,l=n.length,o=s,f=0,i=0,u=n[l-1].nextSibling,c=null;for(;f<l||i<o;){if(n[f]===t[i]){f++,i++;continue}for(;n[l-1]===t[o-1];)l--,o--;if(l===f){const r=o<s?i?t[i-1].nextSibling:t[o-i]:u;for(;i<o;)e.insertBefore(t[i++],r)}else if(o===i)for(;f<l;)(!c||!c.has(n[f]))&&n[f].remove(),f++;else if(n[f]===t[o-1]&&t[i]===n[l-1]){const r=n[--l].nextSibling;e.insertBefore(t[i++],n[f++].nextSibling),e.insertBefore(t[--o],r),n[l]=t[o]}else{if(!c){c=new Map;let g=i;for(;g<o;)c.set(t[g],g++)}const r=c.get(n[f]);if(r!=null)if(i<r&&r<o){let g=f,h=1,w;for(;++g<l&&g<o&&!((w=c.get(n[g]))==null||w!==r+h);)h++;if(h>r-i){const m=n[f];for(;i<r;)e.insertBefore(t[i++],m)}else e.replaceChild(t[i++],n[f++])}else f++;else n[f++].remove()}}}const V="_$DX_DELEGATE";function ye(e,n,t,s={}){let l;return $(o=>{l=o,n===document?e():he(n,e(),n.firstChild?null:void 0,t)},s.owner),()=>{l(),n.textContent=""}}function be(e,n,t){let s;const l=()=>{const f=document.createElement("template");return f.innerHTML=e,t?f.content.firstChild.firstChild:f.content.firstChild},o=n?()=>(s||(s=l())).cloneNode(!0):()=>C(()=>document.importNode(s||(s=l()),!0));return o.cloneNode=o,o}function Ae(e,n=window.document){const t=n[V]||(n[V]=new Set);for(let s=0,l=e.length;s<l;s++){const o=e[s];t.has(o)||(t.add(o),n.addEventListener(o,de))}}function me(e,n){n==null?e.removeAttribute("class"):e.className=n}function Se(e,n,t={}){const s=Object.keys(n||{}),l=Object.keys(t);let o,f;for(o=0,f=l.length;o<f;o++){const i=l[o];!i||i==="undefined"||n[i]||(_(e,i,!1),delete t[i])}for(o=0,f=s.length;o<f;o++){const i=s[o],u=!!n[i];!i||i==="undefined"||t[i]===u||!u||(_(e,i,!0),t[i]=u)}return t}function he(e,n,t,s){if(t!==void 0&&!s&&(s=[]),typeof n!="function")return D(e,n,s,t);K(l=>D(e,n(),l,t),s)}function _(e,n,t){const s=n.trim().split(/\s+/);for(let l=0,o=s.length;l<o;l++)e.classList.toggle(s[l],t)}function de(e){const n=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}});t;){const s=t[n];if(s&&!t.disabled){const l=t[`${n}Data`];if(l!==void 0?s.call(t,l,e):s.call(t,e),e.cancelBubble)return}t=t._$host||t.parentNode||t.host}}function D(e,n,t,s,l){for(;typeof t=="function";)t=t();if(n===t)return t;const o=typeof n,f=s!==void 0;if(e=f&&t[0]&&t[0].parentNode||e,o==="string"||o==="number")if(o==="number"&&(n=n.toString()),f){let i=t[0];i&&i.nodeType===3?i.data=n:i=document.createTextNode(n),t=N(e,t,s,i)}else t!==""&&typeof t=="string"?t=e.firstChild.data=n:t=e.textContent=n;else if(n==null||o==="boolean")t=N(e,t,s);else{if(o==="function")return K(()=>{let i=n();for(;typeof i=="function";)i=i();t=D(e,i,t,s)}),()=>t;if(Array.isArray(n)){const i=[],u=t&&Array.isArray(t);if(F(i,n,t,l))return K(()=>t=D(e,i,t,s,!0)),()=>t;if(i.length===0){if(t=N(e,t,s),f)return t}else u?t.length===0?G(e,i,s):ae(e,t,i):(t&&N(e),G(e,i));t=i}else if(n instanceof Node){if(Array.isArray(t)){if(f)return t=N(e,t,s,n);N(e,t,null,n)}else t==null||t===""||!e.firstChild?e.appendChild(n):e.replaceChild(n,e.firstChild);t=n}else console.warn("Unrecognized value. Skipped inserting",n)}return t}function F(e,n,t,s){let l=!1;for(let o=0,f=n.length;o<f;o++){let i=n[o],u=t&&t[o];if(i instanceof Node)e.push(i);else if(!(i==null||i===!0||i===!1))if(Array.isArray(i))l=F(e,i,u)||l;else if(typeof i=="function")if(s){for(;typeof i=="function";)i=i();l=F(e,Array.isArray(i)?i:[i],Array.isArray(u)?u:[u])||l}else e.push(i),l=!0;else{const c=String(i);u&&u.nodeType===3?(u.data=c,e.push(u)):e.push(document.createTextNode(c))}}return l}function G(e,n,t=null){for(let s=0,l=n.length;s<l;s++)e.insertBefore(n[s],t)}function N(e,n,t,s){if(t===void 0)return e.textContent="";const l=s||document.createTextNode("");if(n.length){let o=!1;for(let f=n.length-1;f>=0;f--){const i=n[f];if(l!==i){const u=i.parentNode===e;!o&&!f?u?e.replaceChild(l,i):e.insertBefore(l,t):u&&i.remove()}else o=!0}}else e.insertBefore(l,t);return[l]}export{ge as F,we as S,K as a,me as b,pe as c,Ae as d,le as e,M as f,Se as g,he as i,ye as r,be as t};
