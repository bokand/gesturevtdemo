var ht=Object.defineProperty;var yt=(n,t,e)=>t in n?ht(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var a=(n,t,e)=>(yt(n,typeof t!="symbol"?t+"":t,e),e),J=(n,t,e)=>{if(!t.has(n))throw TypeError("Cannot "+e)};var u=(n,t,e)=>(J(n,t,"read from private field"),e?e.call(n):t.get(n)),O=(n,t,e)=>{if(t.has(n))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(n):t.set(n,e)},I=(n,t,e,i)=>(J(n,t,"write to private field"),i?i.call(n,e):t.set(n,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();class Et{constructor(t){a(this,"animationStartTime",0);a(this,"animationStartOffset",0);a(this,"networkDelay");a(this,"maxOffset");a(this,"offset",0);a(this,"parallax");a(this,"limitFingerDrag");a(this,"boostVelocity");this.networkDelay=t.networkDelay,this.maxOffset=t.targetOffset,this.parallax=t.parallax,this.limitFingerDrag=t.limitFingerDrag,this.boostVelocity=t.boostVelocity}startAnimating(t){this.animationStartTime=t,this.animationStartOffset=this.offset}pointerUp(t){return"success"}committed(){return performance.now()-this.animationStartTime>=this.networkDelay}}function vt(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var nt={exports:{}};(function(n){(function(){n.exports=t;function t(e,i,s,o){typeof s=="object"&&(o=s,s=!1),typeof o>"u"&&(o={});for(var l=0,m=0,y=0,p=0,c=e.length,f=0;f<c;++f)l+=e[f],m+=i[f],y+=e[f]*i[f],p+=e[f]*e[f];if(o.m=(y-l*m/c)/(p-l*l/c),o.b=m/c-o.m*l/c,s){for(var z=0,E=0;E<c;++E)z+=(i[E]-o.b-o.m*e[E])*(i[E]-o.b-o.m*e[E]);var G=c*p-l*l,K=1/(c-2)*z;o.bErr=Math.sqrt(K/G*p),o.mErr=Math.sqrt(c/G*K)}return function(gt){return o.m*gt+o.b}}})()})(nt);var bt=nt.exports;const Dt=vt(bt);function r(){throw new Error("missing element")}function st(n){let t={m:0};const e=n.map(s=>s.offset),i=n.map(s=>s.time);return Dt(i,e,!1,t),t.m,t.m}const Q=10,wt=10;class N{constructor(t){a(this,"mass",1);a(this,"initialVelocity",0);a(this,"dampingRatio");a(this,"undampedNaturalFrequency");a(this,"dampedNaturalFrequency");a(this,"lastNFrames");a(this,"name");a(this,"overshootCurve",t=>t);const e=(2*Math.PI/t.frequencyResponse)**2*this.mass;this.undampedNaturalFrequency=Math.sqrt(e/this.mass),this.dampedNaturalFrequency=this.undampedNaturalFrequency*Math.sqrt(Math.abs(1-t.dampingRatio**2)),this.dampingRatio=t.dampingRatio,this.lastNFrames=[],this.name=t.name,t.overshootCurve&&(this.overshootCurve=t.overshootCurve)}position(t,e){const i=this.undampedNaturalFrequency*this.dampingRatio,s=this.dampedNaturalFrequency,o=(this.initialVelocity+i*t)/s,l=t;let m=Math.exp(-i*e)*(o*Math.sin(s*e)+l*Math.cos(s*e));if(m<0&&(m=this.overshootCurve(m)),isNaN(m)||!isFinite(m))throw"Spring config invalid. Position: "+m;this.lastNFrames.push({offset:m,time:e});let y=!1;if(this.lastNFrames.length>Q){this.lastNFrames.shift();let p=0;for(let c of this.lastNFrames)p+=c.offset*c.offset;y=p<wt*Q}return m<1&&(y=!0),{offset:m,done:y}}velocity(){return st(this.lastNFrames)}}var D,g,w;class Pt extends Et{constructor(e){super(e);O(this,D,void 0);O(this,g,void 0);O(this,w,void 0);a(this,"lastRaf",null);a(this,"hasCommitted",!1);a(this,"hasAborted",!1);a(this,"pointerHistory",[]);a(this,"spring80FrequencyResponseInput",document.getElementById("spring80FrequencyResponse")??r());a(this,"spring80FrequencyResponseDisplay",document.getElementById("spring80FrequencyResponseDisplay")??r());a(this,"spring80DampingRatioInput",document.getElementById("spring80DampingRatio")??r());a(this,"spring80DampingRatioDisplay",document.getElementById("spring80DampingRatioDisplay")??r());a(this,"spring80FrequencyResponse",parseFloat(this.spring80FrequencyResponseInput.value));a(this,"spring80DampingRatio",parseFloat(this.spring80DampingRatioInput.value));this.animationStartOffset=0,this.spring80FrequencyResponseInput.addEventListener("input",()=>this.updateDisplays()),this.spring80DampingRatioInput.addEventListener("input",()=>this.updateDisplays()),I(this,D,new N({frequencyResponse:200,dampingRatio:.95,name:"100%"})),I(this,g,new N({frequencyResponse:this.spring80FrequencyResponse,dampingRatio:this.spring80DampingRatio,name:"80%"})),I(this,w,new N({frequencyResponse:200,dampingRatio:.9,name:"0%"}))}updateDisplays(){this.spring80FrequencyResponseDisplay.innerHTML=this.spring80FrequencyResponseInput.value,this.spring80DampingRatioDisplay.innerHTML=this.spring80DampingRatioInput.value}advance(e){e=e,!this.hasCommitted&&this.committed()&&(this.startAnimating(this.lastRaf||e),this.hasCommitted=!0,u(this,D).initialVelocity=u(this,g).velocity());const i=e-this.animationStartTime;let s=null;return this.hasAborted?(s=u(this,w).position(this.animationStartOffset,i),this.offset=Math.max(s.offset,0)):this.hasCommitted?(s=u(this,D).position(this.maxOffset-this.animationStartOffset,i),this.offset=this.maxOffset-s.offset):(s=u(this,g).position(this.maxOffset*.8-this.animationStartOffset,i),this.offset=this.maxOffset*.8-s.offset),this.lastRaf=e,{done:s.done&&(this.hasCommitted||this.hasAborted),fgOffset:this.offset,bgOffset:this.fgToBgOffset(this.offset),hasCommitted:this.hasCommitted}}pointerMove(e){return this.offset=this.fingerDragAdd(this.offset,e.movementX),this.pointerHistory.push({offset:this.offset,time:e.timeStamp}),this.pointerHistory.length>10&&this.pointerHistory.shift(),this.offset<0&&(this.offset=0),{done:!1,fgOffset:this.offset,bgOffset:this.fgToBgOffset(this.offset),hasCommitted:!1}}fingerDragAdd(e,i){return this.limitFingerDrag?e+.8*i:e+i}fgToBgOffset(e){return this.parallax?.25*(e-this.maxOffset):0}pointerUp(e){let i=st(this.pointerHistory);return this.boostVelocity&&(i*=2,i=Math.max(i,1)),i=Math.min(i,2),(this.offset+i*100)/this.maxOffset<.3?(this.hasAborted=!0,u(this,w).initialVelocity=-i,"abort"):(u(this,g).initialVelocity=-i,"success")}}D=new WeakMap,g=new WeakMap,w=new WeakMap;let S,W,k=!1,L=!1,P=!1,T=!1,q=!1,_=!1;const it=document.getElementById("scrim")??r(),$=document.getElementById("progress")??r(),Y=document.getElementById("progressContainer")??r(),x=document.getElementById("progress_bar")??r(),R=document.getElementById("networkDelayInput")??r(),Rt=document.getElementById("networkDelayDisplay")??r(),ot=document.getElementById("networkDelayLoadInput")??r(),Ot=document.getElementById("networkDelayLoadDisplay")??r(),It=document.getElementById("zoomDisplay")??r(),Ft=document.getElementById("settingLoadProgressBar")??r(),Bt=document.getElementById("settingParallax")??r(),St=document.getElementById("settingLimitFingerDrag")??r(),V=document.getElementById("settingZoom")??r(),Lt=document.getElementById("settingBackground")??r(),at=document.getElementById("settingProgressAttribution")??r(),qt=document.getElementById("settingUnloadHandler")??r(),xt=document.getElementById("settingBoostVelocity")??r();let rt="lightblue",d=0,j=0,A=0,M=[50,100,300,600,1200,2500],b=1,C=1,v=100,H=100;function At(){H=v,v=(v*185852+1)%34359738337;const n=v/34359738337;return console.log(n),"hsl("+360*n+", 50%, 50%)"}function Mt(){return Lt.checked?"white":At()}function lt(){let n=M[parseInt(R.value)],t=M[parseInt(ot.value)];return Math.max(n,t)}function kt(n){var t;((t=n.target)==null?void 0:t.id)!=""||k||(L=!0,h=Z(),W=document.startViewTransition(),W.ready.then(()=>{rt=document.documentElement.style.getPropertyValue("--main-background-color"),document.documentElement.style.setProperty("--main-background-color",Mt()),S=document.documentElement.animate({},{duration:0,pseudoElement:"::view-transition-new(root)"}),S.pause(),it.style.display="block"}))}function mt(n){return .3+(1-n/document.documentElement.getBoundingClientRect().width)*.5}let F=!1;function Ct(n){if(!L)return;let t=h.pointerMove(n);document.documentElement.style.setProperty("--fg-offset",`${t.fgOffset}px`),document.documentElement.style.setProperty("--bg-offset",`${t.bgOffset}px`),document.documentElement.style.setProperty("--scrim",`${mt(t.fgOffset)}`),ct(t.fgOffset),Nt(t.fgOffset)}function ct(n){let t=n/document.documentElement.getBoundingClientRect().width,e=1-(1-C)*t;document.documentElement.style.setProperty("--fg-scale",`${e}`)}function Nt(n){if(n/document.documentElement.getBoundingClientRect().width>.5){if(!F){let e=document.documentElement.animate([{"--bg-scale":C}],{duration:100,fill:"forwards"});e.finished.then(()=>{e.commitStyles(),e.cancel()}),F=!0}}else if(F){let e=document.documentElement.animate([{"--bg-scale":b}],{duration:100,fill:"forwards"});e.finished.then(()=>{e.commitStyles(),e.cancel()}),F=!1}}function Tt(n){if(!L)return;if(L=!1,T=!1,h.pointerUp(n)=="abort")X(),P=!0,v=H;else if(qt.checked){let e=document.documentElement.style.getPropertyValue("--fg-offset"),i=document.documentElement.style.getPropertyValue("--fg-scale"),s=document.documentElement.getBoundingClientRect().width*10/100,o=document.documentElement.animate([{"--fg-scale":1,"--fg-offset":s+"px"}],{duration:300,fill:"forwards"});o.finished.then(()=>{if(o.commitStyles(),o.cancel(),window.confirm("are you sure you want to leave this page?  It's very nice.")){let l=document.documentElement.animate([{"--fg-scale":i,"--fg-offset":e}],{duration:200,fill:"forwards"});l.finished.then(()=>{l.commitStyles(),l.cancel(),X(),P=!0,v=H,et().then(tt)})}});return}et().then(tt)}function Vt(){let n=document.documentElement.animate([{"--fg-scale":C,"--bg-scale":1}],{duration:100,fill:"forwards"});n.finished.then(()=>{n.commitStyles(),n.cancel()})}function X(){let n=document.documentElement.animate([{"--fg-scale":1,"--bg-scale":b}],{duration:100,fill:"forwards"});n.finished.then(()=>{n.commitStyles(),n.cancel()})}function tt(){_=!0,document.documentElement.animate([{"--scrim":0}],{duration:100}).finished.then(dt),q=!!Ft.checked&&!P,q?ft():U()}function ft(){let n=performance.now();if(n>=A){U();return}$.style.display="block",x.max=A-d,x.value=n-d,requestAnimationFrame(ft)}let h=Z();pt();function ut(n,t){const e=h.advance(n);document.documentElement.style.setProperty("--fg-offset",`${e.fgOffset}px`),document.documentElement.style.setProperty("--bg-offset",`${e.bgOffset}px`),document.documentElement.style.setProperty("--scrim",`${mt(e.fgOffset)}`),ct(e.fgOffset),n-d>800&&($.style.display="block"),e.hasCommitted&&!T&&(Vt(),T=!0),e.done?t():requestAnimationFrame(i=>{ut(i,t)})}function et(){return k=!0,d=performance.now(),j=d+parseFloat(R.value),A=d+lt(),console.log("start : "+d+" commit : "+j+" load : "+A),h.startAnimating(d),new Promise(n=>{ut(performance.now(),n)})}function dt(){_=!1,document.documentElement.style.setProperty("--fg-offset","0px"),document.documentElement.style.setProperty("--vertical-offset","0px"),document.documentElement.style.setProperty("--scrim","0.0"),document.documentElement.style.setProperty("--bg-scale",b.toString()),document.documentElement.style.setProperty("--fg-scale","1.0"),P&&(document.documentElement.style.setProperty("--main-background-color",rt),P=!1),S&&S.play(),it.style.display="none",q||(k=!1)}function U(){q=!1,$.style.display="none",x.removeAttribute("value"),x.removeAttribute("max"),_||(k=!1)}function pt(){dt(),U()}function Z(){return new Pt({networkDelay:M[parseInt(R.value)],targetOffset:document.documentElement.getBoundingClientRect().width,parallax:!!Bt.checked,limitFingerDrag:!!St.checked,boostVelocity:!!xt.checked})}function B(){Rt.innerHTML=M[parseInt(R.value)].toString(),Ot.innerHTML=lt().toString(),b=parseInt(V.value)/100,C=b+(1-b)/3,It.innerHTML=V.value.toString(),h.updateDisplays(),h=Z(),pt()}function Ht(){at.checked?Y.classList.add("attributed"):Y.classList.remove("attributed")}function _t(){R.addEventListener("input",B),ot.addEventListener("input",B),V.addEventListener("input",B),at.addEventListener("change",Ht),B(),window.addEventListener("pointerdown",kt),window.addEventListener("pointerup",Tt),window.addEventListener("pointermove",Ct)}onload=_t;
