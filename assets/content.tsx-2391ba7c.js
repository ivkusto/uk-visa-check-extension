import{c as v,i as d,F as C,a as m,b as _,S,t as p,d as j,e as f,f as b,g as B,r as k}from"./web-eeb21161.js";const O="_button_jltvo_1",E="_buttons_jltvo_5",I="_primaryButton_jltvo_11",L="_secondaryButton_jltvo_15",P="_container_jltvo_19",u={button:O,buttons:E,primaryButton:I,secondaryButton:L,container:P},R="_popup_13mcl_1",W="_list_13mcl_16",F="_listItem_13mcl_23",g={popup:R,list:W,listItem:F},M=p("<div><ul>"),q=p("<li>"),x=t=>v(S,{get when(){return t.opened},get children(){const n=M(),s=n.firstChild;return d(s,v(C,{get each(){return t.companies},children:e=>(()=>{const o=q();return d(o,()=>e.orgName),m(()=>_(o,g.listItem)),o})()})),m(e=>{const o=g.popup,r=g.list;return o!==e._v$&&_(n,e._v$=o),r!==e._v$2&&_(s,e._v$2=r),e},{_v$:void 0,_v$2:void 0}),n}}),A=p("<div><div>"),z=p("<button>👍"),D=p("<button>?"),G=({secondaryResult:t,primaryResult:n})=>{const[s,e]=f(!1),[o,r]=f(!1),[l,h]=f(n),N=()=>s()||o();return(()=>{const $=A(),y=$.firstChild;return d(y,(()=>{const i=b(()=>n.length>0);return()=>i()&&(()=>{const c=z();return c.$$click=()=>{e(a=>!a),r(!1),h(n)},m(a=>B(c,{[u.button]:!0,[u.primaryButton]:!0},a)),c})()})(),null),d(y,(()=>{const i=b(()=>t.length>0);return()=>i()&&(()=>{const c=D();return c.$$click=()=>{e(!1),r(a=>!a),h(t)},m(a=>B(c,{[u.button]:!0,[u.secondaryButton]:!0},a)),c})()})(),null),d($,v(x,{get opened(){return N()},get companies(){return l()}}),null),m(i=>{const c=u.container,a=u.buttons;return c!==i._v$&&_($,i._v$=c),a!==i._v$2&&_(y,i._v$2=a),i},{_v$:void 0,_v$2:void 0}),$})()};j(["click"]);window.addEventListener("load",async()=>{const t=document.querySelectorAll(".companyName");for(const n of t){const s=H(n);if(!s)continue;const e=s.split(/[^\d\w]/g),[o,r]=await Promise.all([J(e),K(e)]);if(!Q(o,r))continue;const l=document.createElement("div");n.appendChild(l),T(o,r,s,l)}});function H(t){return t.childNodes[0].textContent}function w(t){return new Promise((n,s)=>{chrome.runtime.sendMessage({action:"searchByOrgName",partialOrgName:t},e=>{n(e)})})}async function J(t){return t[0]?await w(t[0]):[]}async function K(t){return await t.splice(1).reduce(async(e,o)=>{const r=await e,l=await w(o);return r.concat(l)},Promise.resolve([]))}function Q(t,n){return!!t.length||n&&n.length>0}function T(t,n,s,e){k(()=>v(G,{primaryResult:t,secondaryResult:n||[],orgName:s}),e)}