import{j as z,r as w,R as se,a as le}from"./vendor.98e56813.js";const re=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function i(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerpolicy&&(a.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?a.credentials="include":n.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(n){if(n.ep)return;n.ep=!0;const a=i(n);fetch(n.href,a)}};re();const de="_contentStrip_1j4sn_1",ue="_controls_1j4sn_6",ve="_now_1j4sn_10",me="_month_1j4sn_16",he="_year_1j4sn_21";var L={contentStrip:de,controls:ue,now:ve,month:me,year:he};const ge="_calendar_v9ajb_1",fe="_header_v9ajb_13";var p={calendar:ge,header:fe};const ye="_day_1lh6t_1",_e="_data_1lh6t_9",De="_inactive_1lh6t_16",be="_weekend_1lh6t_24",we="_today_1lh6t_28",Ne="_header_1lh6t_32",Ce="_title_1lh6t_46";var $={day:ye,data:_e,inactive:De,weekend:be,today:we,header:Ne,title:Ce};const ke="_item_1d14d_1",Se="_empty_1d14d_13",Ee="_more_1d14d_17",$e="_event_1d14d_22",xe="_big_1d14d_26";var S={item:ke,empty:Se,more:Ee,event:$e,big:xe};function ne(e){return e.toLocaleDateString(navigator.language,{weekday:"short"})}function Me(e){return e.toLocaleDateString(navigator.language,{weekday:"long",day:"numeric",month:"long"})}function Te(e){return e.toLocaleDateString(navigator.language,{month:"long"})}function Pe(e){return e.toLocaleDateString(navigator.language)}function Fe(e){return e.toLocaleDateString(navigator.language,{year:"numeric"})}function C(e){return e.toLocaleDateString(navigator.language,{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"numeric",hour12:!1})}function j(e,o){return e.getFullYear()==o.getFullYear()&&e.getMonth()==o.getMonth()&&e.getDate()==o.getDate()}function oe(e,o,i){return o<=e&&i>=e||j(e,o)||j(e,i)}function ee(e,o){if(j(e,o)){const i=o.getHours().toString().padStart(2,"0"),r=o.getMinutes().toString().padStart(2,"0");return`${i}:${r}`}else return o.toLocaleDateString(navigator.language)}let te=0;function ae(e,o,i,r){return te+=1,{uuid:te,name:e,from:o,to:i,color:r}}function R(){return"#add8e6"}function Be(e){if(e.startsWith("#")){if(e.length==4){const o=e.substring(1,2),i=e.substring(2,3),r=e.substring(3,4),n=parseInt(o,16)*17,a=parseInt(i,16)*17,l=parseInt(r,16)*17;return{r:n,g:a,b:l}}else if(e.length==7){const o=e.substring(1,3),i=e.substring(3,5),r=e.substring(5,7),n=parseInt(o,16),a=parseInt(i,16),l=parseInt(r,16);return{r:n,g:a,b:l}}}return{r:173,g:216,b:230}}function k(e){const o=Be(e),i=(o.r*299+o.g*587+o.b*114)/1e3;return isFinite(i)?i>125?"black":"white":"black"}const t=z.exports.jsx,d=z.exports.jsxs,x=z.exports.Fragment;function ce(e){const o=e.event.name,i=e.event.color,r=i!=null?i:R(),n=k(r),a=l=>{l.stopPropagation(),e.onClick()};if(e.day!==void 0){const l=e.day!==void 0?ee(e.day,e.event.from):"",h=e.day!==void 0?ee(e.day,e.event.to):"",c=e.day!==void 0?d("div",{children:[l," - ",h]}):t(x,{});return d("div",{className:`${S.big} ${S.event}`,style:{backgroundColor:r,color:n},onClick:a,children:[t("b",{children:o}),"\xA0",t("small",{children:c})]})}else return d("div",{className:`${S.item} ${S.event}`,style:{backgroundColor:r,color:n},onClick:a,children:[o,"\xA0"]})}function Le(e){var c;const o=e.date.getDay()==0||e.date.getDay()==6,i=e.date!==void 0&&e.month!==void 0?e.date.getMonth()!=e.month.getMonth():!1,r=e.today!==void 0?j(e.date,e.today):!1,n=s=>{s.stopPropagation(),e.viewDay!==void 0&&e.viewDay(e.date)},a=(c=e.events)==null?void 0:c.filter(s=>oe(e.date,s.from,s.to)),l=a!==void 0?a.length:0,h=[];for(let s=0;s<5;++s)if(s>=l||a===void 0)h.push(t("div",{className:`${S.item} ${S.empty}`,children:"Hic sunt leones\u2026"},`empty${s}`));else if(s==4&&l>5){const _=l-4;h.push(d("div",{className:`${S.item} ${S.more}`,onClick:n,children:["+ ",_," more event",_>1?"s":""]},"more"))}else h.push(t(ce,{event:a[s],onClick:()=>{e.editEvent!==void 0&&e.editEvent(a[s])}},a[s].uuid));return d("div",{className:`${$.day} ${o?$.weekend:""} ${i?$.inactive:""} ${r?$.today:""}`,children:[t("div",{className:$.header,children:ne(e.date)}),d("div",{className:$.data,onClick:n,children:[t("div",{className:$.title,children:e.date.getDate()}),h]})]})}function je(e){const o=new Date(e.month),i=e.today!==void 0?new Date(e.today):void 0;o.setDate(1);const r=o.getDay(),n=2-(r>0?r:7),a=[];for(let c=n;c<n+42;++c){const s=new Date(e.month);s.setDate(c),a.push(t(Le,{date:s,month:o,today:i,events:e.events,editEvent:e.editEvent,viewDay:e.viewDay},Pe(s)))}const l=[],h=new Date(0);for(let c=5;c<12;++c){h.setDate(c);const s=ne(h);l.push(t("div",{className:p.header,children:s},s))}return d("div",{className:p.calendar,children:[l,a]})}const Ie="_backdrop_ncuse_1",Re="_contentStrip_ncuse_16",Ve="_modal_ncuse_22";var q={backdrop:Ie,contentStrip:Re,modal:Ve};function I(e){const o=document.getElementsByTagName("body")[0];o!==void 0&&(e?o.style.overflow="auto":o.style.overflow="hidden")}function U(e){return t("div",{className:q.backdrop,children:t("div",{className:q.contentStrip,children:t("div",{className:q.modal,children:e.children})})})}const Ae="_header_wwkue_1",He="_title_wwkue_10",Oe="_controls_wwkue_16",We="_container_wwkue_20",Ye="_label_wwkue_24",Ke="_data_wwkue_28";var m={header:Ae,title:He,controls:Oe,container:We,label:Ye,data:Ke};function b(e,o){return{value:e,valid:o}}function G(e){return e.valid?"":"invalidInput"}function qe(e){return e.data!==void 0?Ge(e.data):t(x,{})}function Ge(e){var J,Q;const o=(J=e.new)!=null?J:!1,i=(Q=e.event.color)!=null?Q:R(),[r,n]=w.exports.useState(o),a=T(C(e.event.from),C(e.event.to)),[l,h]=w.exports.useState(b(e.event.name,B(e.event.name))),[c,s]=w.exports.useState(b(C(e.event.from),a.from)),[_,N]=w.exports.useState(b(C(e.event.to),a.to)),[g,F]=w.exports.useState(i);I(!1);function M(){I(!0),e.close()}function B(v){return v.trim().length>0}function T(v,D){let y=!0,E=!0;const X=Date.parse(v),Z=Date.parse(D);if(isFinite(X)||(y=!1),isFinite(Z)||(E=!1),y&&E){const ie=new Date(X);new Date(Z)<ie&&(y=!1,E=!1)}return{from:y,to:E}}const V=v=>{if(v.stopPropagation(),l.valid&&c.valid&&_.valid){const D=Date.parse(c.value),y=Date.parse(_.value);if(isFinite(D)&&isFinite(y)){const E=g.trim();e.event.name=l.value.trim(),e.event.from=new Date(D),e.event.to=new Date(y),e.event.color=E.length>0?E:void 0,e.save(e.event),e.new=!1,n(!1);return}}alert("Invalid input.")},A=v=>{var y;v.stopPropagation();const D=(y=e.new)!=null?y:!1;confirm("Cancel?")&&(D?M():(h(b(e.event.name,!0)),s(b(C(e.event.from),!0)),N(b(C(e.event.to),!0)),F(i),n(!1)))},H=v=>{v.stopPropagation(),confirm("Remove?")&&(e.remove(e.event),M())},O=v=>{v.stopPropagation(),n(!0)},W=v=>{v.stopPropagation(),M()},Y=v=>{const D=v.target.value;h(b(D,B(D)))},u=v=>{const D=v.target.value,y=T(D,_.value);s(b(D,y.from)),N(b(_.value,y.to))},f=v=>{const D=v.target.value,y=T(c.value,D);N(b(D,y.to)),s(b(c.value,y.from))},K=v=>{F(v.target.value)};return r?t(U,{children:d(x,{children:[d("div",{className:m.header,style:{color:k(g),backgroundColor:g},children:[t("div",{className:m.title,children:t("input",{type:"text",className:G(l),value:l.value,onChange:Y,placeholder:"Event name"})}),d("div",{className:m.controls,children:[t("button",{className:m.headerButton,style:{color:g,backgroundColor:k(g)},onClick:V,children:"Save"}),t("button",{className:m.headerButton,style:{color:g,backgroundColor:k(g)},onClick:A,children:"Cancel"})]})]}),d("div",{className:m.container,children:[d("label",{className:m.label,children:["From:",t("input",{type:"text",className:G(c),value:c.value,onChange:u,placeholder:C(e.event.from)})]}),d("label",{className:m.label,children:["To:",t("input",{type:"text",className:G(_),value:_.value,onChange:f,placeholder:C(e.event.to)})]}),d("label",{className:m.label,children:["Color:",t("input",{type:"text",value:g,onChange:K,placeholder:"#000000 format color"})]})]})]})}):t(U,{children:d(x,{children:[d("div",{className:m.header,style:{color:k(g),backgroundColor:g},children:[d("div",{className:m.title,children:[l.value,t("br",{}),t("small",{children:e.event.uuid})]}),d("div",{className:m.controls,children:[t("button",{className:m.headerButton,style:{color:g,backgroundColor:k(g)},onClick:H,children:"Delete"}),t("button",{className:m.headerButton,style:{color:g,backgroundColor:k(g)},onClick:O,children:"Edit"}),t("button",{className:m.headerButton,style:{color:g,backgroundColor:k(g)},onClick:W,children:"\xD7"})]})]}),d("div",{className:m.container,children:[t("div",{className:m.label,children:"From:"}),t("div",{className:m.data,children:c.value}),t("div",{className:m.label,children:"To:"}),t("div",{className:m.data,children:_.value})]})]})})}const Ue="_header_17h0g_1",ze="_title_17h0g_12",Je="_controls_17h0g_19",Qe="_headerButton_17h0g_23",Xe="_container_17h0g_28";var P={header:Ue,title:ze,controls:Je,headerButton:Qe,container:Xe};function Ze(e){return e.data!==void 0?pe(e.data):t(x,{})}function pe(e){var h;const o=Me(e.date);I(!1);const i=c=>{c.stopPropagation();const s=new Date(e.date);s.setHours(12),s.setMinutes(0);const _=new Date(s),N=ae("",s,_,R());e.addEvent(N)},r=c=>{c.stopPropagation(),I(!0),e.close()},n=(h=e.events)==null?void 0:h.filter(c=>oe(e.date,c.from,c.to)),a=n!==void 0?n.length:0,l=[];for(let c=0;c<a;++c)n!==void 0&&l.push(t(ce,{event:n[c],day:e.date,onClick:()=>{e.editEvent!==void 0&&e.editEvent(n[c])}},n[c].uuid));return t(U,{children:d(x,{children:[d("div",{className:P.header,children:[t("div",{className:P.title,children:o}),d("div",{className:P.controls,children:[t("button",{className:P.headerButton,onClick:i,children:"Add"}),t("button",{className:P.headerButton,onClick:r,children:"\xD7"})]})]}),t("div",{className:P.container,children:l})]})})}function et(){const[e,o]=w.exports.useState(new Date),[i,r]=w.exports.useState(new Date),[n,a]=w.exports.useState([]),[l,h]=w.exports.useState(void 0),[c,s]=w.exports.useState(void 0);function _(){const u=new Date(e);r(u)}function N(u){n.filter(f=>f.uuid==u.uuid).length==0&&(n.push(u),a(n))}function g(u){h({event:u,new:!0,save:N,remove:M,close:B})}function F(u){h({event:u,save:N,remove:M,close:B})}function M(u){const f=n.indexOf(u);delete n[f],a(n)}function B(){h(void 0)}function T(u){s({date:u,events:n,close:V,addEvent:g,editEvent:F})}function V(){s(void 0)}const A=u=>{u.stopPropagation();const f=new Date(i);f.setDate(0),r(f)},H=u=>{u.stopPropagation();const f=new Date(i);f.setDate(32),r(f)},O=u=>{u.stopPropagation(),_()},W=u=>{u.stopPropagation(),_(),T(e)},Y=u=>{u.stopPropagation();const f=new Date(e);f.setHours(12),f.setMinutes(0);const K=new Date(f);g(ae("",f,K,R()))};return d(x,{children:[d("div",{className:L.contentStrip,children:[d("div",{className:L.controls,children:[t("button",{onClick:A,children:"<"}),d("div",{className:L.now,children:[t("div",{className:L.month,children:Te(i)}),t("div",{className:L.year,children:Fe(i)})]}),t("button",{onClick:H,children:">"}),t("button",{onClick:O,children:"Current month"}),t("button",{onClick:W,children:"Today"}),t("button",{onClick:Y,children:"Add event"})]}),t(je,{today:e,month:i,events:n,editEvent:F,viewDay:T})]}),t(Ze,{data:c}),t(qe,{data:l})]})}se.render(t(le.StrictMode,{children:t(et,{})}),document.getElementById("root"));
