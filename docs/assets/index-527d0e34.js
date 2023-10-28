var Tt=Object.defineProperty;var Nt=(t,n,e)=>n in t?Tt(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var a=(t,n,e)=>(Nt(t,typeof n!="symbol"?n+"":n,e),e),ct=(t,n,e)=>{if(!n.has(t))throw TypeError("Cannot "+e)};var u=(t,n,e)=>(ct(t,n,"read from private field"),e?e.call(t):n.get(t)),q=(t,n,e)=>{if(n.has(t))throw TypeError("Cannot add the same private member more than once");n instanceof WeakSet?n.add(t):n.set(t,e)},F=(t,n,e,s)=>(ct(t,n,"write to private field"),s?s.call(t,e):n.set(t,e),e);(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();class Vt{constructor(n){a(this,"animationStartTime",0);a(this,"animationStartOffset",0);a(this,"networkDelay");a(this,"maxOffset");a(this,"offset",0);a(this,"parallax");a(this,"fingerDragCurve");a(this,"boostVelocity");a(this,"targetStopPercent");a(this,"loadStart",0);this.networkDelay=n.networkDelay,this.maxOffset=n.targetOffset,this.parallax=n.parallax,this.fingerDragCurve=n.fingerDragCurve,this.boostVelocity=n.boostVelocity,this.targetStopPercent=n.targetStopPercent}startAnimating(n){this.loadStart=n,this.animationStartTime=n,this.animationStartOffset=this.offset}restartAnimating(n){this.animationStartTime=n,this.animationStartOffset=this.offset}pointerUp(n){return"success"}committed(n){return n-this.loadStart>=this.networkDelay}}function Ht(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var vt={exports:{}};(function(t){(function(){t.exports=n;function n(e,s,i,o){typeof i=="object"&&(o=i,i=!1),typeof o>"u"&&(o={});for(var c=0,l=0,E=0,h=0,m=e.length,p=0;p<m;++p)c+=e[p],l+=s[p],E+=e[p]*s[p],h+=e[p]*e[p];if(o.m=(E-c*l/m)/(h-c*c/m),o.b=l/m-o.m*c/m,i){for(var B=0,I=0;I<m;++I)B+=(s[I]-o.b-o.m*e[I])*(s[I]-o.b-o.m*e[I]);var L=m*h-c*c,lt=1/(m-2)*B;o.bErr=Math.sqrt(lt/L*h),o.mErr=Math.sqrt(m/L*lt)}return function(Ct){return o.m*Ct+o.b}}})()})(vt);var _t=vt.exports;const $t=Ht(_t);function r(){throw new Error("missing element")}function Et(t){let n={m:0};const e=t.map(i=>i.offset),s=t.map(i=>i.time);return $t(s,e,!1,n),n.m,n.m}const ut=10,Ut=10;class J{constructor(n){a(this,"mass",1);a(this,"initialVelocity",0);a(this,"dampingRatio");a(this,"undampedNaturalFrequency");a(this,"dampedNaturalFrequency");a(this,"lastNFrames");a(this,"name");a(this,"overshootCurve",n=>n);a(this,"preserveMinOscillation",0);const e=(2*Math.PI/n.frequencyResponse)**2*this.mass;this.undampedNaturalFrequency=Math.sqrt(e/this.mass),this.dampedNaturalFrequency=this.undampedNaturalFrequency*Math.sqrt(Math.abs(1-n.dampingRatio**2)),this.dampingRatio=n.dampingRatio,this.lastNFrames=[],this.name=n.name,n.overshootCurve&&(this.overshootCurve=n.overshootCurve)}position(n,e){const s=this.undampedNaturalFrequency*this.dampingRatio,i=this.dampedNaturalFrequency,o=(this.initialVelocity+s*n)/i,c=n;let l=(this.preserveMinOscillation+Math.exp(-s*e))*(o*Math.sin(i*e)+c*Math.cos(i*e));if(l<0&&(l=this.overshootCurve(l)),isNaN(l)||!isFinite(l))throw"Spring config invalid. Position: "+l;this.lastNFrames.push({offset:l,time:e});let E=!1;if(this.lastNFrames.length>ut){this.lastNFrames.shift();let h=0;for(let m of this.lastNFrames)h+=m.offset*m.offset;E=h<Ut*ut}return l<1&&(E=!0),{offset:l,done:E}}velocity(){return Et(this.lastNFrames)}}var b,f,P;class Wt extends Vt{constructor(e){super(e);q(this,b,void 0);q(this,f,void 0);q(this,P,void 0);a(this,"lastRaf",null);a(this,"hasCommitted",!1);a(this,"hasAborted",!1);a(this,"pointerHistory",[]);a(this,"spring80FrequencyResponseInput",document.getElementById("spring80FrequencyResponse")??r());a(this,"spring80FrequencyResponseDisplay",document.getElementById("spring80FrequencyResponseDisplay")??r());a(this,"spring80DampingRatioInput",document.getElementById("spring80DampingRatio")??r());a(this,"spring80DampingRatioDisplay",document.getElementById("spring80DampingRatioDisplay")??r());a(this,"preserveMinOscillationInput",document.getElementById("preserveMinOscillation")??r());a(this,"preserveMinOscillationDisplay",document.getElementById("preserveMinOscillationDisplay")??r());a(this,"hookAtInput",document.getElementById("hookAt")??r());a(this,"hookAtDisplay",document.getElementById("hookAtDisplay")??r());a(this,"spring80FrequencyResponse",parseFloat(this.spring80FrequencyResponseInput.value));a(this,"spring80DampingRatio",parseFloat(this.spring80DampingRatioInput.value));a(this,"preserveMinOscillation",parseFloat(this.preserveMinOscillationInput.value));a(this,"hookAtPercent",parseFloat(this.hookAtInput.value));a(this,"hooked",!1);a(this,"pointerDownX",0);a(this,"dontBounceBackpageInput",document.getElementById("settingDontBounceBackpage")??r());a(this,"dontBounceBackpage",!!this.dontBounceBackpageInput.checked);a(this,"wobbleInput",document.getElementById("settingWobble")??r());a(this,"wobble",!!this.wobbleInput.checked);a(this,"slowDriftInput",document.getElementById("settingSlowDrift")??r());a(this,"slowDrift",!!this.slowDriftInput.checked);a(this,"postponeInput",document.getElementById("settingPostpone")??r());a(this,"postpone",!!this.postponeInput.checked);a(this,"postponed",!1);this.animationStartOffset=0,this.spring80FrequencyResponseInput.addEventListener("input",()=>this.updateDisplays()),this.spring80DampingRatioInput.addEventListener("input",()=>this.updateDisplays()),this.preserveMinOscillationInput.addEventListener("input",()=>this.updateDisplays()),this.hookAtInput.addEventListener("input",()=>this.updateDisplays()),this.dontBounceBackpageInput.addEventListener("input",()=>this.updateDisplays()),this.wobbleInput.addEventListener("input",()=>this.updateDisplays()),this.slowDriftInput.addEventListener("input",()=>this.updateDisplays()),this.postponeInput.addEventListener("input",()=>this.updateDisplays()),F(this,b,new J({frequencyResponse:200,dampingRatio:.95,name:"100%"})),F(this,f,new J({frequencyResponse:this.spring80FrequencyResponse,dampingRatio:this.spring80DampingRatio,name:"80%"})),u(this,f).preserveMinOscillation=parseFloat(this.preserveMinOscillationInput.value),F(this,P,new J({frequencyResponse:200,dampingRatio:.9,name:"0%"}))}updateDisplays(){this.spring80FrequencyResponseDisplay.innerHTML=this.spring80FrequencyResponseInput.value,this.spring80DampingRatioDisplay.innerHTML=this.spring80DampingRatioInput.value,this.preserveMinOscillationDisplay.innerHTML=this.preserveMinOscillationInput.value,this.hookAtDisplay.innerHTML=this.hookAtInput.value,this.dontBounceBackpage=!!this.dontBounceBackpageInput.checked,this.wobble=!!this.wobbleInput.checked,this.slowDrift=!!this.slowDriftInput.checked,u(this,f).preserveMinOscillation=parseFloat(this.preserveMinOscillationInput.value),this.postpone=!!this.postponeInput.checked}advance(e){if(e=e,!this.hasCommitted&&this.committed(e)){let l=!1;this.postpone&&u(this,f).velocity()>0&&(l=!0),l||(this.restartAnimating(this.lastRaf||e),this.hasCommitted=!0,this.hooked?u(this,b).initialVelocity=u(this,f).velocity():(this.hooked=!0,u(this,b).initialVelocity=u(this,f).initialVelocity),isNaN(u(this,b).initialVelocity)&&(u(this,b).initialVelocity=-2))}const s=e-this.animationStartTime;let i=null;if(!this.hooked)this.offset=this.animationStartOffset-s*u(this,f).initialVelocity;else if(this.hasAborted)i=u(this,P).position(this.animationStartOffset,s),this.offset=Math.max(i.offset,0);else if(this.hasCommitted)i=u(this,b).position(this.maxOffset-this.animationStartOffset,s),this.offset=this.maxOffset-i.offset;else{let l=this.targetStopPercent;this.slowDrift&&(l-=.25),i=u(this,f).position(this.maxOffset*l-this.animationStartOffset,s),this.offset=this.maxOffset*l-i.offset}!this.hooked&&this.offset>this.maxOffset*this.hookAtPercent/100&&(this.restartAnimating(this.lastRaf||e),this.hooked=!0,this.animationStartOffset=this.offset);let o=i?i.done:!1;if(this.wobble&&!this.hasCommitted&&(this.offset+=this.maxOffset*.02*Math.sin(2*Math.PI*s/1e3)),this.slowDrift&&!this.hasCommitted){let l=this.maxOffset*.25;this.offset+=l-l*1e3/(s+1e3)}let c=this.offset;return this.dontBounceBackpage&&(i=u(this,P).position(this.maxOffset-this.animationStartOffset,e-this.loadStart),c=this.maxOffset-Math.max(i.offset,0)),this.lastRaf=e,{done:o&&(this.hasCommitted||this.hasAborted),fgOffset:this.offset,bgOffset:this.fgToBgOffset(c),hasCommitted:this.hasCommitted}}pointerDown(e){this.pointerDownX=e.clientX}pointerMove(e){return this.offset=this.fingerDragCurve(e.clientX-this.pointerDownX),this.pointerHistory.push({offset:this.offset,time:e.timeStamp}),this.pointerHistory.length>10&&this.pointerHistory.shift(),this.offset<0&&(this.offset=0),{done:!1,fgOffset:this.offset,bgOffset:this.fgToBgOffset(this.offset),hasCommitted:!1}}fgToBgOffset(e){return this.parallax?.25*(e-this.maxOffset):0}setDefaultVelocity(){this.offset=this.maxOffset/4,u(this,f).initialVelocity=this.boostVelocity?-2.5:-1}pointerUp(e){let s=Et(this.pointerHistory);return this.boostVelocity&&(s*=3,s=Math.max(s,1)),s=Math.min(s,2.5),s=Math.max(s,.3),u(this,P).initialVelocity=-s,(this.offset+s*100)/this.maxOffset<.3||s<-.1?(this.hasAborted=!0,u(this,P).initialVelocity=-s,"abort"):(u(this,f).initialVelocity=-s,"success")}}b=new WeakMap,f=new WeakMap,P=new WeakMap;let W=!1,_=!1,A=!1,j=!1,M=!1,it=!1,S=[{main:"resources/srp-couches.png"},{main:"resources/pants-hemming-srp.png",precommit:"resources/pants-srp.png"},{main:"resources/srp-cats.png"},{main:"resources/banana-pie-srp.png"},{main:"resources/goo.gl-stock-a.png",precommit:"resources/goo.gl-stock-b.png"},{main:"resources/news-frontpage.png"},{main:"resources/news-article.png"}],g=0;const It=document.body??r(),bt=document.getElementById("scrim")??r(),Z=document.getElementById("globalProgress")??r(),St=document.getElementById("attributedProgress")??r(),x=document.getElementById("networkDelayInput")??r(),Zt=document.getElementById("networkDelayDisplay")??r(),zt=document.getElementById("zoomDisplay")??r(),Xt=document.getElementById("buttonTest")??r(),Gt=document.getElementById("buttonSettings")??r(),Pt=document.getElementById("settingsPanel")??r(),wt=document.getElementById("screenshots")??r(),Qt=document.getElementById("targetStopDisplay")??r(),N=document.getElementById("dragCurve")??r(),Y=document.getElementById("chevron")??r(),v=document.getElementById("chevronContainer")??r(),Kt=document.getElementById("settingChevron")??r();var ht;const $=((ht=document.getElementById("frontimg"))==null?void 0:ht.querySelector("img"))??r();var gt;const tt=((gt=document.getElementById("midimg"))==null?void 0:gt.querySelector("img"))??r();var yt;const z=((yt=document.getElementById("midimgprecommit"))==null?void 0:yt.querySelector("img"))??r(),et=document.getElementById("settingZoom")??r(),Dt=document.getElementById("settingProgressAttribution")??r(),Jt=document.getElementById("settingUnloadHandler")??r(),Bt=document.getElementById("settingBoostVelocity")??r(),X=document.getElementById("settingTargetStop")??r(),Yt=document.getElementById("settingFadeForeground")??r(),jt=document.getElementById("settingWobble")??r(),te=document.getElementById("settingSlowDrift")??r(),ot=document.getElementById("settingPulseScrim")??r(),ee=document.getElementById("settingPostpone")??r();let O=St,nt=O.querySelector(".bar"),U=Z.querySelector(".bar"),D=0,st=0,ne=["P25","P50","P75","P80","P85","P90","P95","P99"],G=[20,80,270,340,440,580,880,2040],k=1,Q=1;ie();let R={};se();function se(){let t=document.querySelectorAll("input");for(const e of t)e&&(e.type=="checkbox"?R[e.id]=e.checked.toString():R[e.id]=e.value);let n=document.querySelectorAll("select");for(const e of n)R[e.id]=e.value}function ie(){console.log("PARSE");var t=window.location.href,n=new URL(t);for(const[e,s]of n.searchParams){console.log(e,s),e=="runTest"&&Ft();let i=document.getElementById(e);if(i&&i.nodeName=="INPUT"){let o=i;o.type=="checkbox"?o.checked=s=="true":o.value=s}}}function oe(){const t=new URL(window.location.toString());let n=document.querySelectorAll("input");for(const s of n)s&&(s.type=="checkbox"?R[s.id]!=s.checked.toString()?t.searchParams.set(s.id,s.checked.toString()):t.searchParams.delete(s.id):R[s.id]!=s.value?t.searchParams.set(s.id,s.value):t.searchParams.delete(s.id));let e=document.querySelectorAll("select");for(const s of e)t.searchParams.set(s.id,s.value);console.log("UPDATE");for(const[s,i]of t.searchParams)console.log(s,i);window.history.replaceState({},"",t)}function ae(){let t=G[parseInt(x.value)];return Math.min(Math.max(t+500,t*2),t+1e3)}function re(t){var n;((n=t.target)==null?void 0:n.classList[0])!="screenshot"||W&&!M||(A=!0,rt(),_=!0,w=K(),w.pointerDown(t))}function Ot(t){return .3+(1-t)*.5}let C=!1,y=null,V=0,mt=50;function H(t){if(!_)return;y||(y=t);let n=t.x-y.x;y=t,V=Math.min(Math.max(V+n,0),mt),kt(V/mt);let e=w.pointerMove(t),s=e.fgOffset/document.documentElement.getBoundingClientRect().width;document.documentElement.style.setProperty("--fg-offset",`${e.fgOffset}px`),document.documentElement.style.setProperty("--bg-offset",`${e.bgOffset}px`),document.documentElement.style.setProperty("--scrim",`${Ot(s)}`),qt(s),Mt(e.fgOffset),le(e.fgOffset)}let T=!1;function kt(t){Kt.checked||(t=0),v.style.display="block",t>.7?(v.style.left="25px",v.style.borderRadius="50%",v.style.width=getComputedStyle(v).height,Y.style.opacity="1",T||(navigator.vibrate(1),T=!0)):t>.1?(T=!1,v.style.left="1px",v.style.borderRadius="15px",v.style.width=`${v.getBoundingClientRect().height*(t-.1)/.6}px`,Y.style.opacity=`${Math.min(Math.max((t-.5)/.2,0),1)}`):(T=!1,v.style.display="none",Y.style.opacity="0")}function Mt(t){let n=t/document.documentElement.getBoundingClientRect().width,e=1-(1-Q)*n;document.documentElement.style.setProperty("--fg-scale",`${e}`)}function le(t){if(t/document.documentElement.getBoundingClientRect().width>.5){if(!C){let e=document.documentElement.animate([{"--bg-scale":Q}],{duration:100,fill:"forwards"});e.finished.then(()=>{e.commitStyles(),e.cancel()}),C=!0}}else if(C){let e=document.documentElement.animate([{"--bg-scale":k}],{duration:100,fill:"forwards"});e.finished.then(()=>{e.commitStyles(),e.cancel()}),C=!1}}function ce(t){if(y=null,kt(0),V=0,!_)return;if(_=!1,j=!1,w.pointerUp(t)=="abort")dt(),A=!0;else if(Jt.checked){let e=document.documentElement.style.getPropertyValue("--fg-offset"),s=document.documentElement.style.getPropertyValue("--fg-scale"),i=document.documentElement.animate([{"--fg-scale":1,"--fg-offset":"0px"}],{duration:300,fill:"forwards"});i.finished.then(()=>{if(i.commitStyles(),i.cancel(),window.confirm("are you sure you want to leave this page?  It's very nice.")){let o=document.documentElement.animate([{"--fg-scale":s,"--fg-offset":e}],{duration:200,fill:"forwards"});o.finished.then(()=>{o.commitStyles(),o.cancel(),dt(),pt().then(ft)})}});return}pt().then(ft)}function ue(){let t=document.documentElement.animate([{"--fg-scale":Q,"--bg-scale":1}],{duration:100,fill:"forwards"});t.finished.then(()=>{t.commitStyles(),t.cancel()});const n=z.animate({opacity:0},{duration:100,fill:"forwards"});n.finished.then(()=>{n.commitStyles(),n.cancel()})}function dt(){let t=document.documentElement.animate([{"--fg-scale":1,"--bg-scale":k}],{duration:100,fill:"forwards"});t.finished.then(()=>{t.commitStyles(),t.cancel()})}function ft(){it=!0,document.documentElement.animate([{"--scrim":0}],{duration:100}).finished.then(Lt),M=!A,M?Rt():at()}function Rt(){if(!M)return;let t=performance.now();if(t>=st){at();return}Z.style.display="block",U.max=st-D,U.value=t-D,requestAnimationFrame(Rt)}let w=K();rt();let At=!!ot.checked;function xt(t,n){const e=w.advance(t);document.documentElement.style.setProperty("--fg-offset",`${e.fgOffset}px`),document.documentElement.style.setProperty("--bg-offset",`${e.bgOffset}px`);let s=e.fgOffset/document.documentElement.getBoundingClientRect().width;const i=Ot(s);qt(s);let o=i;At&&(o+=.1*Math.sin(2*Math.PI*(t-D)/1e3+Math.PI)),document.documentElement.style.setProperty("--scrim",`${o}`),Mt(e.fgOffset),t-D>800&&(O.style.display="block"),e.hasCommitted&&!j&&(ue(),j=!0),e.done?n():requestAnimationFrame(c=>{xt(c,n)})}function pt(){return W=!0,D=performance.now(),st=D+ae(),w.startAnimating(D),new Promise(t=>{xt(performance.now(),t)})}function Lt(){it=!1,document.documentElement.style.setProperty("--fg-offset","0px"),document.documentElement.style.setProperty("--vertical-offset","0px"),document.documentElement.style.setProperty("--scrim","0.0"),document.documentElement.style.setProperty("--bg-scale",k.toString()),document.documentElement.style.setProperty("--fg-scale","1.0"),z.style.opacity="1",A||de(),A=!1,M||(W=!1)}function at(){M=!1,O.style.display="none",nt.removeAttribute("value"),nt.removeAttribute("max"),Z.style.display="none",U.removeAttribute("value"),U.removeAttribute("max"),it||(W=!1)}function rt(){at(),Lt()}function K(){const t=document.documentElement.getBoundingClientRect().width,n=parseFloat(X.value);let e=s=>s;if(N.value=="linear80")e=s=>s*n;else if(N.value=="linearelastic")e=s=>{const i=s/t,o=.7;return i<o?s:(o+(i-o)/20)*t};else if(N.value=="snapto"){let s=0,i=0,o=-999,c=!1,l=-1,E=4,h=1,m=[];e=p=>{o==-999&&(o=p);let B=p-o;if(o=p,c&&(s<l*t?(s+=E,s>=l*t&&(s=l*t,c=!1,i=0)):s>l*t&&(s-=E,s<=l*t&&(s=l*t,c=!1,i=0))),c)return requestAnimationFrame(()=>{y!==null&&H(y)}),s;m.push(B),m.length>5&&m.shift();let I=0;for(let L of m)L*h<0&&I++;return I==m.length&&(h=-h,i=0),i+=B,l<n&&i/t>.1?(l=n,c=!0,requestAnimationFrame(()=>{y!==null&&H(y)})):l>0&&i/t<-.05?(l=0,c=!0,requestAnimationFrame(()=>{y!==null&&H(y)})):s+=.1*B,s}}return new Wt({networkDelay:G[parseInt(x.value)],targetOffset:t,parallax:!0,fingerDragCurve:e,boostVelocity:!!Bt.checked,targetStopPercent:n})}function me(){let t=document.documentElement.getBoundingClientRect().width,n=K();n.setDefaultVelocity(),n.startAnimating(0);var e=document.getElementById("plot")??r();let s=e.width/1e3;e.height=t*s;var i=e.getContext("2d");if(!i)return;i.scale(s,s),i.lineWidth=3,i.strokeStyle="black",i.beginPath(),i.moveTo(0,0);for(var o=0;o<1e3;o++)i.lineTo(o,n.advance(o).fgOffset);i.stroke(),i.strokeStyle="red";let c=t*parseFloat(X.value);i.beginPath(),i.moveTo(0,c),i.lineTo(1e3,c),i.stroke(),i.strokeStyle="green";let l=G[parseInt(x.value)];i.beginPath(),i.moveTo(l,0),i.lineTo(l,t),i.stroke()}function d(){oe();let t=parseInt(x.value);Zt.innerHTML=ne[t]+"="+G[t].toString(),k=parseInt(et.value)/100,Q=k+(1-k)/3,zt.innerHTML=et.value.toString(),At=!!ot.checked,Qt.innerHTML=`${100*parseFloat(X.value)}`,w.updateDisplays(),me(),w=K(),rt()}function qt(t){Yt.checked&&($.style.filter=`grayscale(${t})`)}function de(){$.style.filter="",$.src=tt.src,tt.src=S[g].main,z.src=S[g].precommit??"",g=(g+1)%S.length}function Ft(){Pt.style.display="none",bt.style.display="block",wt.style.display="block",document.documentElement.style.setProperty("--main-background-color","#202020"),It.classList.add("test")}function fe(){Pt.style.display="flex",bt.style.display="none",wt.style.display="none",document.documentElement.style.setProperty("--main-background-color","white"),It.classList.remove("test")}function pe(){Dt.checked?O=St:O=Z,nt=O.querySelector(".bar")}function he(){let t=document.querySelectorAll("input");for(const o of t)o.addEventListener("input",d);x.addEventListener("input",d),et.addEventListener("input",d),X.addEventListener("input",d),Bt.addEventListener("input",d),N.addEventListener("input",d);let n=document.getElementById("spring80FrequencyResponse")??r(),e=document.getElementById("spring80DampingRatio")??r(),s=document.getElementById("preserveMinOscillation")??r(),i=document.getElementById("hookAt")??r();n.addEventListener("input",d),e.addEventListener("input",d),s.addEventListener("input",d),i.addEventListener("input",d),jt.addEventListener("input",d),te.addEventListener("input",d),ot.addEventListener("input",d),ee.addEventListener("input",d),Xt.addEventListener("click",Ft),Gt.addEventListener("click",fe),$.src=S[g].main,g=(g+1)%S.length,tt.src=S[g].main,z.src=S[g].precommit??"",g=(g+1)%S.length,Dt.addEventListener("change",pe),d(),window.addEventListener("pointerdown",re),window.addEventListener("pointerup",ce),window.addEventListener("pointermove",H)}onload=he;
