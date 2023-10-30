var Vt=Object.defineProperty;var Ht=(t,n,e)=>n in t?Vt(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var a=(t,n,e)=>(Ht(t,typeof n!="symbol"?n+"":n,e),e),mt=(t,n,e)=>{if(!n.has(t))throw TypeError("Cannot "+e)};var u=(t,n,e)=>(mt(t,n,"read from private field"),e?e.call(t):n.get(t)),T=(t,n,e)=>{if(n.has(t))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(t):n.set(t,e)},N=(t,n,e,i)=>(mt(t,n,"write to private field"),i?i.call(t,e):n.set(t,e),e);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();class _t{constructor(n){a(this,"animationStartTime",0);a(this,"animationStartOffset",0);a(this,"networkDelay");a(this,"maxOffset");a(this,"offset",0);a(this,"parallax");a(this,"fingerDragCurve");a(this,"boostVelocity");a(this,"targetStopPercent");a(this,"loadStart",0);a(this,"snapping",!1);this.networkDelay=n.networkDelay,this.maxOffset=n.targetOffset,this.parallax=n.parallax,this.fingerDragCurve=n.fingerDragCurve,this.boostVelocity=n.boostVelocity,this.targetStopPercent=n.targetStopPercent}setSnapping(n){return this.snapping=n,n}startAnimating(n){this.loadStart=n,this.animationStartTime=n,this.animationStartOffset=this.offset}restartAnimating(n){this.animationStartTime=n,this.animationStartOffset=this.offset}pointerUp(n){return"success"}committed(n){return n-this.loadStart>=this.networkDelay}}function Ut(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var It={exports:{}};(function(t){(function(){t.exports=n;function n(e,i,s,o){typeof s=="object"&&(o=s,s=!1),typeof o>"u"&&(o={});for(var c=0,r=0,I=0,g=0,m=e.length,h=0;h<m;++h)c+=e[h],r+=i[h],I+=e[h]*i[h],g+=e[h]*e[h];if(o.m=(I-c*r/m)/(g-c*c/m),o.b=r/m-o.m*c/m,s){for(var O=0,b=0;b<m;++b)O+=(i[b]-o.b-o.m*e[b])*(i[b]-o.b-o.m*e[b]);var C=m*g-c*c,ut=1/(m-2)*O;o.bErr=Math.sqrt(ut/C*g),o.mErr=Math.sqrt(m/C*ut)}return function(Nt){return o.m*Nt+o.b}}})()})(It);var $t=It.exports;const Wt=Ut($t);function l(){throw new Error("missing element")}function bt(t){let n={m:0};const e=t.map(s=>s.offset),i=t.map(s=>s.time);return Wt(i,e,!1,n),n.m,n.m}const dt=10,Zt=10;class Y{constructor(n){a(this,"mass",1);a(this,"initialVelocity",0);a(this,"dampingRatio");a(this,"undampedNaturalFrequency");a(this,"dampedNaturalFrequency");a(this,"lastNFrames");a(this,"name");a(this,"overshootCurve",n=>n);a(this,"preserveMinOscillation",0);const e=(2*Math.PI/n.frequencyResponse)**2*this.mass;this.undampedNaturalFrequency=Math.sqrt(e/this.mass),this.dampedNaturalFrequency=this.undampedNaturalFrequency*Math.sqrt(Math.abs(1-n.dampingRatio**2)),this.dampingRatio=n.dampingRatio,this.lastNFrames=[],this.name=n.name,n.overshootCurve&&(this.overshootCurve=n.overshootCurve)}position(n,e){const i=this.undampedNaturalFrequency*this.dampingRatio,s=this.dampedNaturalFrequency,o=(this.initialVelocity+i*n)/s,c=n;let r=(this.preserveMinOscillation+Math.exp(-i*e))*(o*Math.sin(s*e)+c*Math.cos(s*e));if(r<0&&(r=this.overshootCurve(r)),isNaN(r)||!isFinite(r))throw"Spring config invalid. Position: "+r;this.lastNFrames.push({offset:r,time:e});let I=!1;if(this.lastNFrames.length>dt){this.lastNFrames.shift();let g=0;for(let m of this.lastNFrames)g+=m.offset*m.offset;I=g<Zt*dt}return r<1&&(I=!0),{offset:r,done:I}}velocity(){return bt(this.lastNFrames)}}var P,f,D;class zt extends _t{constructor(e){super(e);T(this,P,void 0);T(this,f,void 0);T(this,D,void 0);a(this,"lastRaf",null);a(this,"hasCommitted",!1);a(this,"hasAborted",!1);a(this,"pointerHistory",[]);a(this,"snapping",!1);a(this,"mode","");a(this,"parallaxTo80",!1);a(this,"spring80FrequencyResponseInput",document.getElementById("spring80FrequencyResponse")??l());a(this,"spring80FrequencyResponseDisplay",document.getElementById("spring80FrequencyResponseDisplay")??l());a(this,"spring80DampingRatioInput",document.getElementById("spring80DampingRatio")??l());a(this,"spring80DampingRatioDisplay",document.getElementById("spring80DampingRatioDisplay")??l());a(this,"preserveMinOscillationInput",document.getElementById("preserveMinOscillation")??l());a(this,"preserveMinOscillationDisplay",document.getElementById("preserveMinOscillationDisplay")??l());a(this,"hookAtInput",document.getElementById("hookAt")??l());a(this,"hookAtDisplay",document.getElementById("hookAtDisplay")??l());a(this,"spring80FrequencyResponse",parseFloat(this.spring80FrequencyResponseInput.value));a(this,"spring80DampingRatio",parseFloat(this.spring80DampingRatioInput.value));a(this,"preserveMinOscillation",parseFloat(this.preserveMinOscillationInput.value));a(this,"hookAtPercent",parseFloat(this.hookAtInput.value));a(this,"hooked",!1);a(this,"pointerDownX",0);a(this,"dontBounceBackpageInput",document.getElementById("settingDontBounceBackpage")??l());a(this,"dontBounceBackpage",!!this.dontBounceBackpageInput.checked);a(this,"wobbleInput",document.getElementById("settingWobble")??l());a(this,"wobble",!!this.wobbleInput.checked);a(this,"slowDriftInput",document.getElementById("settingSlowDrift")??l());a(this,"slowDrift",!!this.slowDriftInput.checked);a(this,"postponeInput",document.getElementById("settingPostpone")??l());a(this,"postpone",!!this.postponeInput.checked);a(this,"postponed",0);this.animationStartOffset=0,this.spring80FrequencyResponseInput.addEventListener("input",()=>this.updateDisplays()),this.spring80DampingRatioInput.addEventListener("input",()=>this.updateDisplays()),this.preserveMinOscillationInput.addEventListener("input",()=>this.updateDisplays()),this.hookAtInput.addEventListener("input",()=>this.updateDisplays()),this.dontBounceBackpageInput.addEventListener("input",()=>this.updateDisplays()),this.wobbleInput.addEventListener("input",()=>this.updateDisplays()),this.slowDriftInput.addEventListener("input",()=>this.updateDisplays()),this.postponeInput.addEventListener("input",()=>this.updateDisplays()),N(this,P,new Y({frequencyResponse:200,dampingRatio:.95,name:"100%"})),N(this,f,new Y({frequencyResponse:this.spring80FrequencyResponse,dampingRatio:this.spring80DampingRatio,name:"80%"})),u(this,f).preserveMinOscillation=parseFloat(this.preserveMinOscillationInput.value),N(this,D,new Y({frequencyResponse:200,dampingRatio:.9,name:"0%"}))}updateDisplays(){this.spring80FrequencyResponseDisplay.innerHTML=this.spring80FrequencyResponseInput.value,this.spring80DampingRatioDisplay.innerHTML=this.spring80DampingRatioInput.value,this.preserveMinOscillationDisplay.innerHTML=this.preserveMinOscillationInput.value,this.hookAtDisplay.innerHTML=this.hookAtInput.value,this.dontBounceBackpage=!!this.dontBounceBackpageInput.checked,this.wobble=!!this.wobbleInput.checked,this.slowDrift=!!this.slowDriftInput.checked,u(this,f).preserveMinOscillation=parseFloat(this.preserveMinOscillationInput.value),this.postpone=!!this.postponeInput.checked}advance(e){e=e,!this.hasCommitted&&this.committed(e)&&(this.postpone&&(u(this,f).velocity()>0?this.postponed||(this.postponed=e):this.postponed=0),this.postponed||(this.restartAnimating(this.lastRaf||e),this.hasCommitted=!0,this.hooked?u(this,P).initialVelocity=u(this,f).velocity():(this.hooked=!0,u(this,P).initialVelocity=u(this,f).initialVelocity),isNaN(u(this,P).initialVelocity)&&(u(this,P).initialVelocity=-2)));let i=e-this.animationStartTime;this.postponed&&(i+=e-this.postponed);let s=null;if(!this.hooked)this.offset=this.animationStartOffset-i*u(this,f).initialVelocity;else if(this.hasAborted)s=u(this,D).position(this.animationStartOffset,i),this.offset=Math.max(s.offset,0);else if(this.hasCommitted)s=u(this,P).position(this.maxOffset-this.animationStartOffset,i),this.offset=this.maxOffset-s.offset;else{let r=this.targetStopPercent;this.slowDrift&&(r-=.25),s=u(this,f).position(this.maxOffset*r-this.animationStartOffset,i),this.offset=this.maxOffset*r-s.offset}!this.hooked&&this.offset>this.maxOffset*this.hookAtPercent/100&&(this.restartAnimating(this.lastRaf||e),this.hooked=!0,this.animationStartOffset=this.offset);let o=s?s.done:!1;if(this.wobble&&!this.hasCommitted&&(this.offset+=this.maxOffset*.02*Math.sin(2*Math.PI*i/1e3)),this.slowDrift&&!this.hasCommitted){let r=this.maxOffset*.25;this.offset+=r-r*1e3/(i+1e3)}let c=this.offset;return this.dontBounceBackpage&&(s=u(this,D).position(this.maxOffset-this.animationStartOffset,e-this.loadStart),c=this.maxOffset-Math.max(s.offset,0)),this.lastRaf=e,{done:o&&(this.hasCommitted||this.hasAborted),fgOffset:this.offset,bgOffset:this.fgToBgOffset(c),hasCommitted:this.hasCommitted}}pointerDown(e){this.pointerDownX=e.clientX}pointerMove(e){return this.offset=this.fingerDragCurve(e.clientX-this.pointerDownX),this.pointerHistory.push({offset:this.offset,time:e.timeStamp}),this.pointerHistory.length>10&&this.pointerHistory.shift(),this.offset<0&&(this.offset=0),{done:!1,fgOffset:this.offset,bgOffset:this.fgToBgOffset(this.offset),hasCommitted:!1}}fgToBgOffset(e){let i=0;return this.parallax?this.parallaxTo80?i=.25*(e-this.targetStopPercent*this.maxOffset):i=.25*(e-this.maxOffset):i=0,Math.min(0,i)}setDefaultVelocity(){this.offset=this.maxOffset/4,u(this,f).initialVelocity=this.boostVelocity?-1:-.5}setSnapping(e){return this.snapping=e,e}setMode(e){this.mode=e}setParallaxTo80(e){this.parallaxTo80=e}pointerUp(e){let i;return!this.snapping&&this.mode=="snapto"?i=0:(i=bt(this.pointerHistory),this.boostVelocity&&(i=Math.max(i,1)),i=Math.min(i,2.5),i=Math.max(i,.3)),u(this,D).initialVelocity=-i,(this.offset+i*100)/this.maxOffset<.3||i<-.1?(this.hasAborted=!0,u(this,D).initialVelocity=-i,"abort"):(u(this,f).initialVelocity=-i,"success")}}P=new WeakMap,f=new WeakMap,D=new WeakMap;let z=!1,$=!1,q=!1,tt=!1,x=!1,at=!1,w=[{main:"resources/srp-couches.png"},{main:"resources/pants-hemming-srp.png",precommit:"resources/pants-srp.png"},{main:"resources/srp-cats.png"},{main:"resources/banana-pie-srp.png"},{main:"resources/goo.gl-stock-a.png",precommit:"resources/goo.gl-stock-b.png"},{main:"resources/news-frontpage.png"},{main:"resources/news-article.png"}],y=0;const St=document.body??l(),Pt=document.getElementById("scrim")??l(),X=document.getElementById("globalProgress")??l(),wt=document.getElementById("attributedProgress")??l(),F=document.getElementById("networkDelayInput")??l(),Xt=document.getElementById("networkDelayDisplay")??l(),Gt=document.getElementById("zoomDisplay")??l(),Qt=document.getElementById("buttonTest")??l(),Kt=document.getElementById("buttonSettings")??l(),Dt=document.getElementById("settingsPanel")??l(),Bt=document.getElementById("screenshots")??l(),Jt=document.getElementById("targetStopDisplay")??l(),A=document.getElementById("dragCurve")??l(),j=document.getElementById("chevron")??l(),E=document.getElementById("chevronContainer")??l(),Yt=document.getElementById("settingChevron")??l();var yt;const W=((yt=document.getElementById("frontimg"))==null?void 0:yt.querySelector("img"))??l();var vt;const et=((vt=document.getElementById("midimg"))==null?void 0:vt.querySelector("img"))??l();var Et;const G=((Et=document.getElementById("midimgprecommit"))==null?void 0:Et.querySelector("img"))??l(),nt=document.getElementById("settingZoom")??l(),Ot=document.getElementById("settingProgressAttribution")??l(),jt=document.getElementById("settingUnloadHandler")??l(),kt=document.getElementById("settingBoostVelocity")??l(),Q=document.getElementById("settingTargetStop")??l(),te=document.getElementById("settingFadeForeground")??l(),ee=document.getElementById("settingWobble")??l(),ne=document.getElementById("settingSlowDrift")??l(),lt=document.getElementById("settingPulseScrim"),se=document.getElementById("settingPostpone")??l(),ie=document.getElementById("settingParallaxTo80")??l();let M=wt,st=M.querySelector(".bar"),Z=X.querySelector(".bar"),B=0,it=0,oe=["P25","P50","P75","P90","P95","P99"],ae=[30,100,330,660,1e3,2360];function le(t){let n=0;for(;t>ae[n];)n++;return n==0?"<P25":n==6?">P99":">"+oe[n-1]}let R=1,K=1,S=!1;ce();let L={};re();function re(){let t=document.querySelectorAll("input");for(const e of t)e&&(e.type=="checkbox"?L[e.id]=e.checked.toString():L[e.id]=e.value);let n=document.querySelectorAll("select");for(const e of n)L[e.id]=e.value}function ce(){console.log("PARSE");var t=window.location.href,n=new URL(t);for(const[e,i]of n.searchParams){console.log(e,i),e=="runTest"&&Tt();let s=document.getElementById(e);if(s&&s.nodeName=="INPUT"){let o=s;o.type=="checkbox"?o.checked=i=="true":o.value=i}}}function ue(){const t=new URL(window.location.toString());let n=document.querySelectorAll("input");for(const i of n)i&&(i.type=="checkbox"?L[i.id]!=i.checked.toString()?t.searchParams.set(i.id,i.checked.toString()):t.searchParams.delete(i.id):L[i.id]!=i.value?t.searchParams.set(i.id,i.value):t.searchParams.delete(i.id));let e=document.querySelectorAll("select");for(const i of e)t.searchParams.set(i.id,i.value);console.log("UPDATE");for(const[i,s]of t.searchParams)console.log(i,s);window.history.replaceState({},"",t)}function me(){let t=parseInt(F.value);return Math.min(Math.max(t+500,t*2),t+1e3)}function de(t){var n;((n=t.target)==null?void 0:n.classList[0])!="screenshot"||z&&!x||(q=!0,ct(),$=!0,p=J(),p.pointerDown(t))}function Mt(t){return .3+(1-t)*.5}let V=!1,v=null,_=0,ft=50;function U(t){if(!$)return;v||(v=t);let n=t.x-v.x;v=t,_=Math.min(Math.max(_+n,0),ft),Rt(_/ft);let e=p.pointerMove(t),i=e.fgOffset/document.documentElement.getBoundingClientRect().width;document.documentElement.style.setProperty("--fg-offset",`${e.fgOffset}px`),document.documentElement.style.setProperty("--bg-offset",`${e.bgOffset}px`),document.documentElement.style.setProperty("--scrim",`${Mt(i)}`),Ct(i),xt(e.fgOffset),fe(e.fgOffset)}let H=!1;function Rt(t){Yt.checked||(t=0),E.style.display="block",t>.7?(E.style.left="25px",E.style.borderRadius="50%",E.style.width=getComputedStyle(E).height,j.style.opacity="1",H||(navigator.vibrate(1),H=!0)):t>.1?(H=!1,E.style.left="1px",E.style.borderRadius="15px",E.style.width=`${E.getBoundingClientRect().height*(t-.1)/.6}px`,j.style.opacity=`${Math.min(Math.max((t-.5)/.2,0),1)}`):(H=!1,E.style.display="none",j.style.opacity="0")}function xt(t){let n=t/document.documentElement.getBoundingClientRect().width,e=1-(1-K)*n;document.documentElement.style.setProperty("--fg-scale",`${e}`)}function fe(t){if(t/document.documentElement.getBoundingClientRect().width>.5){if(!V){let e=document.documentElement.animate([{"--bg-scale":K}],{duration:100,fill:"forwards"});e.finished.then(()=>{e.commitStyles(),e.cancel()}),V=!0}}else if(V){let e=document.documentElement.animate([{"--bg-scale":R}],{duration:100,fill:"forwards"});e.finished.then(()=>{e.commitStyles(),e.cancel()}),V=!1}}let k=null;function ot(t){if(S){k=t;return}if(k=null,v=null,Rt(0),_=0,!$)return;if($=!1,tt=!1,p.pointerUp(t)=="abort")pt(),q=!0;else if(jt.checked){let e=document.documentElement.style.getPropertyValue("--fg-offset"),i=document.documentElement.style.getPropertyValue("--fg-scale"),s=document.documentElement.animate([{"--fg-scale":1,"--fg-offset":"0px"}],{duration:300,fill:"forwards"});s.finished.then(()=>{if(s.commitStyles(),s.cancel(),window.confirm("are you sure you want to leave this page?  It's very nice.")){let o=document.documentElement.animate([{"--fg-scale":i,"--fg-offset":e}],{duration:200,fill:"forwards"});o.finished.then(()=>{o.commitStyles(),o.cancel(),pt(),gt().then(ht)})}});return}gt().then(ht)}function pe(){let t=document.documentElement.animate([{"--fg-scale":K,"--bg-scale":1}],{duration:100,fill:"forwards"});t.finished.then(()=>{t.commitStyles(),t.cancel()});const n=G.animate({opacity:0},{duration:100,fill:"forwards"});n.finished.then(()=>{n.commitStyles(),n.cancel()})}function pt(){let t=document.documentElement.animate([{"--fg-scale":1,"--bg-scale":R}],{duration:100,fill:"forwards"});t.finished.then(()=>{t.commitStyles(),t.cancel()})}function ht(){at=!0,document.documentElement.animate([{"--scrim":0}],{duration:100}).finished.then(Ft),x=!q,x?At():rt()}function At(){if(!x)return;let t=performance.now();if(t>=it){rt();return}X.style.display="block",Z.max=it-B,Z.value=t-B,requestAnimationFrame(At)}let p=J();ct();let Lt=!!lt.checked;function qt(t,n){const e=p.advance(t);document.documentElement.style.setProperty("--fg-offset",`${e.fgOffset}px`),document.documentElement.style.setProperty("--bg-offset",`${e.bgOffset}px`);let i=e.fgOffset/document.documentElement.getBoundingClientRect().width;const s=Mt(i);Ct(i);let o=s;Lt&&(o+=.1*Math.sin(2*Math.PI*(t-B)/1e3+Math.PI)),document.documentElement.style.setProperty("--scrim",`${o}`),xt(e.fgOffset),t-B>350&&(M.style.display="block"),e.hasCommitted&&!tt&&(pe(),tt=!0),e.done?n():requestAnimationFrame(c=>{qt(c,n)})}function gt(){return z=!0,B=performance.now(),it=B+me(),p.startAnimating(B),new Promise(t=>{qt(performance.now(),t)})}function Ft(){at=!1,document.documentElement.style.setProperty("--fg-offset","0px"),document.documentElement.style.setProperty("--vertical-offset","0px"),document.documentElement.style.setProperty("--scrim","0.0"),document.documentElement.style.setProperty("--bg-scale",R.toString()),document.documentElement.style.setProperty("--fg-scale","1.0"),G.style.opacity="1",q||ge(),q=!1,x||(z=!1)}function rt(){x=!1,M.style.display="none",st.removeAttribute("value"),st.removeAttribute("max"),X.style.display="none",Z.removeAttribute("value"),Z.removeAttribute("max"),at||(z=!1)}function ct(){rt(),Ft()}function J(){const t=document.documentElement.getBoundingClientRect().width,n=parseFloat(Q.value);let e=s=>s;if(A.value=="linear80")e=s=>s*n;else if(A.value=="linearelastic")e=s=>{const o=s/t,c=.7;return o<c?s:(c+(o-c)/20)*t};else if(A.value=="snapto"){let s=0,o=0,c=-999;S=p.setSnapping(!1);let r=-1,I=4,g=1,m=[];e=h=>{c==-999&&(c=h);let O=h-c;if(c=h,S&&(s<r*t?(s+=I,s>=r*t&&(s=r*t,S=p.setSnapping(!1),o=0,k!==null&&ot(k))):s>r*t&&(s-=I,s<=r*t&&(s=r*t,S=p.setSnapping(!1),o=0,k!==null&&ot(k)))),S)return requestAnimationFrame(()=>{S&&v!==null&&U(v)}),s;m.push(O),m.length>5&&m.shift();let b=0;for(let C of m)C*g<0&&b++;return b==m.length&&(g=-g,o=0),o+=O,r<n&&o/t>.1?(r=n,S=p.setSnapping(!0),requestAnimationFrame(()=>{v!==null&&U(v)})):r>0&&o/t<-.05?(r=0,S=p.setSnapping(!0),requestAnimationFrame(()=>{v!==null&&U(v)})):s+=.1*O,s}}let i=new zt({networkDelay:parseInt(F.value),targetOffset:t,parallax:!0,fingerDragCurve:e,boostVelocity:!!kt.checked,targetStopPercent:n});return i.setMode(A.value),i.setParallaxTo80(!!ie.checked),i}function he(){let t=document.documentElement.getBoundingClientRect().width,n=J();n.setDefaultVelocity(),n.startAnimating(0);var e=document.getElementById("plot")??l();let i=e.width/1e3;e.height=t*i;var s=e.getContext("2d");if(!s)return;s.scale(i,i),s.lineWidth=3,s.strokeStyle="black",s.beginPath(),s.moveTo(0,0);for(var o=0;o<1e3;o++)s.lineTo(o,n.advance(o).fgOffset);s.stroke(),s.strokeStyle="red";let c=t*parseFloat(Q.value);s.beginPath(),s.moveTo(0,c),s.lineTo(1e3,c),s.stroke(),s.strokeStyle="green";let r=parseInt(F.value);s.beginPath(),s.moveTo(r,0),s.lineTo(r,t),s.stroke()}function d(){ue();let t=parseInt(F.value);Xt.innerHTML=t+"ms "+le(t),R=parseInt(nt.value)/100,K=R+(1-R)/3,Gt.innerHTML=nt.value.toString(),Lt=!!lt.checked,Jt.innerHTML=`${100*parseFloat(Q.value)}`,p.updateDisplays(),he(),p=J(),ct()}function Ct(t){te.checked&&(W.style.filter=`grayscale(${t})`)}function ge(){W.style.filter="",W.src=et.src,et.src=w[y].main,G.src=w[y].precommit??"",y=(y+1)%w.length}function Tt(){Dt.style.display="none",Pt.style.display="block",Bt.style.display="block",document.documentElement.style.setProperty("--main-background-color","#202020"),St.classList.add("test")}function ye(){Dt.style.display="flex",Pt.style.display="none",Bt.style.display="none",document.documentElement.style.setProperty("--main-background-color","white"),St.classList.remove("test")}function ve(){Ot.checked?M=wt:M=X,st=M.querySelector(".bar")}function Ee(){let t=document.querySelectorAll("input");for(const o of t)o.addEventListener("input",d);F.addEventListener("input",d),nt.addEventListener("input",d),Q.addEventListener("input",d),kt.addEventListener("input",d),A.addEventListener("change",d);let n=document.getElementById("spring80FrequencyResponse")??l(),e=document.getElementById("spring80DampingRatio")??l(),i=document.getElementById("preserveMinOscillation")??l(),s=document.getElementById("hookAt")??l();n.addEventListener("input",d),e.addEventListener("input",d),i.addEventListener("input",d),s.addEventListener("input",d),ee.addEventListener("input",d),ne.addEventListener("input",d),lt.addEventListener("input",d),se.addEventListener("input",d),Qt.addEventListener("click",Tt),Kt.addEventListener("click",ye),W.src=w[y].main,y=(y+1)%w.length,et.src=w[y].main,G.src=w[y].precommit??"",y=(y+1)%w.length,Ot.addEventListener("change",ve),d(),window.addEventListener("pointerdown",de),window.addEventListener("pointerup",ot),window.addEventListener("pointermove",U)}onload=Ee;
