import{c as n,g as a}from"./config-63eb9ce4.js";async function m(r){return new Promise((i,o)=>{const e=indexedDB.open(n.dbName,1);e.onsuccess=t=>{const s=a(t).result.transaction(n.store,"readonly").objectStore(n.store).index(n.index).openCursor(IDBKeyRange.only(r.toLowerCase())),u=[];s.onsuccess=d=>{const c=a(d).result;if(c){const g=c.value;u.push(g),c.continue()}else i(u)},s.onerror=()=>{o(s.error)}},e.onerror=t=>{o(a(t).error)}})}chrome.runtime.onMessage.addListener((r,i,o)=>{if(r.action==="searchByOrgName")return m(r.partialOrgName).then(e=>{o(e)}).catch(e=>{console.error("Error searching by orgName:",e)}),!0});
