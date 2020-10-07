/**
 * copy-cat: Copyright SquidDev 2020
 *
 * - @squid-dev/cc-web-term: Copyright SquidDev (BSD-3-Clause)
 * - preact: Copyright  (MIT)
 * - setimmediate: Copyright YuzuJS (MIT)
 *
 * @license
 */

define(['require', 'exports'], function (require, exports) { 'use strict';

    var n,u,i,t,r,o,f={},e=[],c=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s(n,l){for(var u in l)n[u]=l[u];return n}function a(n){var l=n.parentNode;l&&l.removeChild(n);}function v(n,l,u){var i,t=arguments,r={};for(i in l)"key"!==i&&"ref"!==i&&(r[i]=l[i]);if(arguments.length>3)for(u=[u],i=3;i<arguments.length;i++)u.push(t[i]);if(null!=u&&(r.children=u),"function"==typeof n&&null!=n.defaultProps)for(i in n.defaultProps)void 0===r[i]&&(r[i]=n.defaultProps[i]);return h(n,r,l&&l.key,l&&l.ref,null)}function h(l,u,i,t,r){var o={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:r};return null==r&&(o.__v=o),n.vnode&&n.vnode(o),o}function p(n){return n.children}function d(n,l){this.props=n,this.context=l;}function _(n,l){if(null==l)return n.__?_(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?_(n):null}function k(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return k(n)}}function w(l){(!l.__d&&(l.__d=!0)&&u.push(l)&&!m.__r++||t!==n.debounceRendering)&&((t=n.debounceRendering)||i)(m);}function m(){for(var n;m.__r=u.length;)n=u.sort(function(n,l){return n.__v.__b-l.__v.__b}),u=[],n.some(function(n){var l,u,i,t,r,o,f;n.__d&&(o=(r=(l=n).__v).__e,(f=l.__P)&&(u=[],(i=s({},r)).__v=i,t=T(f,r,i,l.__n,void 0!==f.ownerSVGElement,null,u,null==o?_(r):o),$(u,r),t!=o&&k(r)));});}function g(n,l,u,i,t,r,o,c,s,v){var y,d,k,w,m,g,b,A=i&&i.__k||e,P=A.length;for(s==f&&(s=null!=o?o[0]:P?_(i,0):null),u.__k=[],y=0;y<l.length;y++)if(null!=(w=u.__k[y]=null==(w=l[y])||"boolean"==typeof w?null:"string"==typeof w||"number"==typeof w?h(null,w,null,null,w):Array.isArray(w)?h(p,{children:w},null,null,null):null!=w.__e||null!=w.__c?h(w.type,w.props,w.key,null,w.__v):w)){if(w.__=u,w.__b=u.__b+1,null===(k=A[y])||k&&w.key==k.key&&w.type===k.type)A[y]=void 0;else for(d=0;d<P;d++){if((k=A[d])&&w.key==k.key&&w.type===k.type){A[d]=void 0;break}k=null;}m=T(n,w,k=k||f,t,r,o,c,s,v),(d=w.ref)&&k.ref!=d&&(b||(b=[]),k.ref&&b.push(k.ref,null,w),b.push(d,w.__c||m,w)),null!=m?(null==g&&(g=m),s=x(n,w,k,A,o,m,s),"option"==u.type?n.value="":"function"==typeof u.type&&(u.__d=s)):s&&k.__e==s&&s.parentNode!=n&&(s=_(k));}if(u.__e=g,null!=o&&"function"!=typeof u.type)for(y=o.length;y--;)null!=o[y]&&a(o[y]);for(y=P;y--;)null!=A[y]&&I(A[y],A[y]);if(b)for(y=0;y<b.length;y++)H(b[y],b[++y],b[++y]);}function x(n,l,u,i,t,r,o){var f,e,c;if(void 0!==l.__d)f=l.__d,l.__d=void 0;else if(t==u||r!=o||null==r.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(r),f=null;else {for(e=o,c=0;(e=e.nextSibling)&&c<i.length;c+=2)if(e==r)break n;n.insertBefore(r,o),f=o;}return void 0!==f?f:r.nextSibling}function A(n,l,u,i,t){var r;for(r in u)"children"===r||"key"===r||r in l||C(n,r,null,u[r],i);for(r in l)t&&"function"!=typeof l[r]||"children"===r||"key"===r||"value"===r||"checked"===r||u[r]===l[r]||C(n,r,l[r],u[r],i);}function P(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]="number"==typeof u&&!1===c.test(l)?u+"px":null==u?"":u;}function C(n,l,u,i,t){var r,o,f,e,c;if(t?"className"===l&&(l="class"):"class"===l&&(l="className"),"style"===l)if(r=n.style,"string"==typeof u)r.cssText=u;else {if("string"==typeof i&&(r.cssText="",i=null),i)for(e in i)u&&e in u||P(r,e,"");if(u)for(c in u)i&&u[c]===i[c]||P(r,c,u[c]);}else "o"===l[0]&&"n"===l[1]?(o=l!==(l=l.replace(/Capture$/,"")),f=l.toLowerCase(),l=(f in n?f:l).slice(2),u?(i||n.addEventListener(l,N,o),(n.l||(n.l={}))[l]=u):n.removeEventListener(l,N,o)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&!t&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/^xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u));}function N(l){this.l[l.type](n.event?n.event(l):l);}function z(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,t.__e&&("function"==typeof t.type&&t.__k.length>1&&z(t,l,u),l=x(u,t,t,n.__k,null,t.__e,l),"function"==typeof n.type&&(n.__d=l)));}function T(l,u,i,t,r,o,f,e,c){var a,v,h,y,_,k,w,m,b,x,A,P=u.type;if(void 0!==u.constructor)return null;(a=n.__b)&&a(u);try{n:if("function"==typeof P){if(m=u.props,b=(a=P.contextType)&&t[a.__c],x=a?b?b.props.value:a.__:t,i.__c?w=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(m,x):(u.__c=v=new d(m,x),v.constructor=P,v.render=L),b&&b.sub(v),v.props=m,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=s({},v.__s)),s(v.__s,P.getDerivedStateFromProps(m,v.__s))),y=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else {if(null==P.getDerivedStateFromProps&&m!==y&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(m,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(m,v.__s,x)||u.__v===i.__v){v.props=m,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,v.__h.length&&f.push(v),z(u,e,l);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(m,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(y,_,k);});}v.context=x,v.props=m,v.state=v.__s,(a=n.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=s(s({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(y,_)),A=null!=a&&a.type==p&&null==a.key?a.props.children:a,g(l,Array.isArray(A)?A:[A],u,i,t,r,o,f,e,c),v.base=u.__e,v.__h.length&&f.push(v),w&&(v.__E=v.__=null),v.__e=!1;}else null==o&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=j(i.__e,u,i,t,r,o,f,c);(a=n.diffed)&&a(u);}catch(l){u.__v=null,n.__e(l,u,i);}return u.__e}function $(l,u){n.__c&&n.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l){n.__e(l,u.__v);}});}function j(n,l,u,i,t,r,o,c){var s,a,v,h,y,p=u.props,d=l.props;if(t="svg"===l.type||t,null!=r)for(s=0;s<r.length;s++)if(null!=(a=r[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,r[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,d.is&&{is:d.is}),r=null,c=!1;}if(null===l.type)p!==d&&n.data!=d&&(n.data=d);else {if(null!=r&&(r=e.slice.call(n.childNodes)),v=(p=u.props||f).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=r)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&v&&h.__html==v.__html||(n.innerHTML=h&&h.__html||""));}A(n,d,p,t,c),h?l.__k=[]:(s=l.props.children,g(n,Array.isArray(s)?s:[s],l,u,i,"foreignObject"!==l.type&&t,r,o,f,c)),c||("value"in d&&void 0!==(s=d.value)&&s!==n.value&&C(n,"value",s,p.value,!1),"checked"in d&&void 0!==(s=d.checked)&&s!==n.checked&&C(n,"checked",s,p.checked,!1));}return n}function H(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l){n.__e(l,i);}}function I(l,u,i){var t,r,o;if(n.unmount&&n.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||H(t,null,u)),i||"function"==typeof l.type||(i=null!=(r=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(l){n.__e(l,u);}t.base=t.__P=null;}if(t=l.__k)for(o=0;o<t.length;o++)t[o]&&I(t[o],u,i);null!=r&&a(r);}function L(n,l,u){return this.constructor(n,u)}function M(l,u,i){var t,o,c;n.__&&n.__(l,u),o=(t=i===r)?null:i&&i.__k||u.__k,l=v(p,null,[l]),c=[],T(u,(t?u:i||u).__k=l,o||f,f,void 0!==u.ownerSVGElement,i&&!t?[i]:o?null:u.childNodes.length?e.slice.call(u.childNodes):null,c,i||f,t),$(c,l);}n={__e:function(n,l){for(var u,i;l=l.__;)if((u=l.__c)&&!u.__)try{if(u.constructor&&null!=u.constructor.getDerivedStateFromError&&(i=!0,u.setState(u.constructor.getDerivedStateFromError(n))),null!=u.componentDidCatch&&(i=!0,u.componentDidCatch(n)),i)return w(u.__E=u)}catch(l){n=l;}throw n}},d.prototype.setState=function(n,l){var u;u=this.__s!==this.state?this.__s:this.__s=s({},this.state),"function"==typeof n&&(n=n(u,this.props)),n&&s(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),w(this));},d.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),w(this));},d.prototype.render=p,u=[],i="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,m.__r=0,r=f,o=0;

    class Semaphore {
        constructor() {
            this.listeners = new Set();
        }
        attach(listener) {
            this.listeners.add(listener);
        }
        detach(listener) {
            this.listeners.delete(listener);
        }
        signal() {
            for (const listener of this.listeners)
                listener();
        }
    }

    var n$1,u$1,i$1,t$1,o$1,f$1={},e$1=[],c$1=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function s$1(n,l){for(var u in l)n[u]=l[u];return n}function a$1(n){var l=n.parentNode;l&&l.removeChild(n);}function v$1(n,l,u){var i,t=arguments,r={};for(i in l)"key"!==i&&"ref"!==i&&(r[i]=l[i]);if(arguments.length>3)for(u=[u],i=3;i<arguments.length;i++)u.push(t[i]);if(null!=u&&(r.children=u),"function"==typeof n&&null!=n.defaultProps)for(i in n.defaultProps)void 0===r[i]&&(r[i]=n.defaultProps[i]);return h$1(n,r,l&&l.key,l&&l.ref,null)}function h$1(l,u,i,t,r){var o={type:l,props:u,key:i,ref:t,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:r};return null==r&&(o.__v=o),n$1.vnode&&n$1.vnode(o),o}function p$1(n){return n.children}function d$1(n,l){this.props=n,this.context=l;}function _$1(n,l){if(null==l)return n.__?_$1(n.__,n.__.__k.indexOf(n)+1):null;for(var u;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e)return u.__e;return "function"==typeof n.type?_$1(n):null}function k$1(n){var l,u;if(null!=(n=n.__)&&null!=n.__c){for(n.__e=n.__c.base=null,l=0;l<n.__k.length;l++)if(null!=(u=n.__k[l])&&null!=u.__e){n.__e=n.__c.base=u.__e;break}return k$1(n)}}function w$1(l){(!l.__d&&(l.__d=!0)&&u$1.push(l)&&!m$1.__r++||t$1!==n$1.debounceRendering)&&((t$1=n$1.debounceRendering)||i$1)(m$1);}function m$1(){for(var n;m$1.__r=u$1.length;)n=u$1.sort(function(n,l){return n.__v.__b-l.__v.__b}),u$1=[],n.some(function(n){var l,u,i,t,r,o,f;n.__d&&(o=(r=(l=n).__v).__e,(f=l.__P)&&(u=[],(i=s$1({},r)).__v=i,t=T$1(f,r,i,l.__n,void 0!==f.ownerSVGElement,null,u,null==o?_$1(r):o),$$1(u,r),t!=o&&k$1(r)));});}function g$1(n,l,u,i,t,r,o,c,s,v){var y,d,k,w,m,g,b,A=i&&i.__k||e$1,P=A.length;for(s==f$1&&(s=null!=o?o[0]:P?_$1(i,0):null),u.__k=[],y=0;y<l.length;y++)if(null!=(w=u.__k[y]=null==(w=l[y])||"boolean"==typeof w?null:"string"==typeof w||"number"==typeof w?h$1(null,w,null,null,w):Array.isArray(w)?h$1(p$1,{children:w},null,null,null):null!=w.__e||null!=w.__c?h$1(w.type,w.props,w.key,null,w.__v):w)){if(w.__=u,w.__b=u.__b+1,null===(k=A[y])||k&&w.key==k.key&&w.type===k.type)A[y]=void 0;else for(d=0;d<P;d++){if((k=A[d])&&w.key==k.key&&w.type===k.type){A[d]=void 0;break}k=null;}m=T$1(n,w,k=k||f$1,t,r,o,c,s,v),(d=w.ref)&&k.ref!=d&&(b||(b=[]),k.ref&&b.push(k.ref,null,w),b.push(d,w.__c||m,w)),null!=m?(null==g&&(g=m),s=x$1(n,w,k,A,o,m,s),"option"==u.type?n.value="":"function"==typeof u.type&&(u.__d=s)):s&&k.__e==s&&s.parentNode!=n&&(s=_$1(k));}if(u.__e=g,null!=o&&"function"!=typeof u.type)for(y=o.length;y--;)null!=o[y]&&a$1(o[y]);for(y=P;y--;)null!=A[y]&&I$1(A[y],A[y]);if(b)for(y=0;y<b.length;y++)H$1(b[y],b[++y],b[++y]);}function x$1(n,l,u,i,t,r,o){var f,e,c;if(void 0!==l.__d)f=l.__d,l.__d=void 0;else if(t==u||r!=o||null==r.parentNode)n:if(null==o||o.parentNode!==n)n.appendChild(r),f=null;else {for(e=o,c=0;(e=e.nextSibling)&&c<i.length;c+=2)if(e==r)break n;n.insertBefore(r,o),f=o;}return void 0!==f?f:r.nextSibling}function A$1(n,l,u,i,t){var r;for(r in u)"children"===r||"key"===r||r in l||C$1(n,r,null,u[r],i);for(r in l)t&&"function"!=typeof l[r]||"children"===r||"key"===r||"value"===r||"checked"===r||u[r]===l[r]||C$1(n,r,l[r],u[r],i);}function P$1(n,l,u){"-"===l[0]?n.setProperty(l,u):n[l]="number"==typeof u&&!1===c$1.test(l)?u+"px":null==u?"":u;}function C$1(n,l,u,i,t){var r,o,f,e,c;if(t?"className"===l&&(l="class"):"class"===l&&(l="className"),"style"===l)if(r=n.style,"string"==typeof u)r.cssText=u;else {if("string"==typeof i&&(r.cssText="",i=null),i)for(e in i)u&&e in u||P$1(r,e,"");if(u)for(c in u)i&&u[c]===i[c]||P$1(r,c,u[c]);}else "o"===l[0]&&"n"===l[1]?(o=l!==(l=l.replace(/Capture$/,"")),f=l.toLowerCase(),l=(f in n?f:l).slice(2),u?(i||n.addEventListener(l,N$1,o),(n.l||(n.l={}))[l]=u):n.removeEventListener(l,N$1,o)):"list"!==l&&"tagName"!==l&&"form"!==l&&"type"!==l&&"size"!==l&&!t&&l in n?n[l]=null==u?"":u:"function"!=typeof u&&"dangerouslySetInnerHTML"!==l&&(l!==(l=l.replace(/^xlink:?/,""))?null==u||!1===u?n.removeAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase()):n.setAttributeNS("http://www.w3.org/1999/xlink",l.toLowerCase(),u):null==u||!1===u&&!/^ar/.test(l)?n.removeAttribute(l):n.setAttribute(l,u));}function N$1(l){this.l[l.type](n$1.event?n$1.event(l):l);}function z$1(n,l,u){var i,t;for(i=0;i<n.__k.length;i++)(t=n.__k[i])&&(t.__=n,t.__e&&("function"==typeof t.type&&t.__k.length>1&&z$1(t,l,u),l=x$1(u,t,t,n.__k,null,t.__e,l),"function"==typeof n.type&&(n.__d=l)));}function T$1(l,u,i,t,r,o,f,e,c){var a,v,h,y,_,k,w,m,b,x,A,P=u.type;if(void 0!==u.constructor)return null;(a=n$1.__b)&&a(u);try{n:if("function"==typeof P){if(m=u.props,b=(a=P.contextType)&&t[a.__c],x=a?b?b.props.value:a.__:t,i.__c?w=(v=u.__c=i.__c).__=v.__E:("prototype"in P&&P.prototype.render?u.__c=v=new P(m,x):(u.__c=v=new d$1(m,x),v.constructor=P,v.render=L$1),b&&b.sub(v),v.props=m,v.state||(v.state={}),v.context=x,v.__n=t,h=v.__d=!0,v.__h=[]),null==v.__s&&(v.__s=v.state),null!=P.getDerivedStateFromProps&&(v.__s==v.state&&(v.__s=s$1({},v.__s)),s$1(v.__s,P.getDerivedStateFromProps(m,v.__s))),y=v.props,_=v.state,h)null==P.getDerivedStateFromProps&&null!=v.componentWillMount&&v.componentWillMount(),null!=v.componentDidMount&&v.__h.push(v.componentDidMount);else {if(null==P.getDerivedStateFromProps&&m!==y&&null!=v.componentWillReceiveProps&&v.componentWillReceiveProps(m,x),!v.__e&&null!=v.shouldComponentUpdate&&!1===v.shouldComponentUpdate(m,v.__s,x)||u.__v===i.__v){v.props=m,v.state=v.__s,u.__v!==i.__v&&(v.__d=!1),v.__v=u,u.__e=i.__e,u.__k=i.__k,v.__h.length&&f.push(v),z$1(u,e,l);break n}null!=v.componentWillUpdate&&v.componentWillUpdate(m,v.__s,x),null!=v.componentDidUpdate&&v.__h.push(function(){v.componentDidUpdate(y,_,k);});}v.context=x,v.props=m,v.state=v.__s,(a=n$1.__r)&&a(u),v.__d=!1,v.__v=u,v.__P=l,a=v.render(v.props,v.state,v.context),v.state=v.__s,null!=v.getChildContext&&(t=s$1(s$1({},t),v.getChildContext())),h||null==v.getSnapshotBeforeUpdate||(k=v.getSnapshotBeforeUpdate(y,_)),A=null!=a&&a.type==p$1&&null==a.key?a.props.children:a,g$1(l,Array.isArray(A)?A:[A],u,i,t,r,o,f,e,c),v.base=u.__e,v.__h.length&&f.push(v),w&&(v.__E=v.__=null),v.__e=!1;}else null==o&&u.__v===i.__v?(u.__k=i.__k,u.__e=i.__e):u.__e=j$1(i.__e,u,i,t,r,o,f,c);(a=n$1.diffed)&&a(u);}catch(l){u.__v=null,n$1.__e(l,u,i);}return u.__e}function $$1(l,u){n$1.__c&&n$1.__c(u,l),l.some(function(u){try{l=u.__h,u.__h=[],l.some(function(n){n.call(u);});}catch(l){n$1.__e(l,u.__v);}});}function j$1(n,l,u,i,t,r,o,c){var s,a,v,h,y,p=u.props,d=l.props;if(t="svg"===l.type||t,null!=r)for(s=0;s<r.length;s++)if(null!=(a=r[s])&&((null===l.type?3===a.nodeType:a.localName===l.type)||n==a)){n=a,r[s]=null;break}if(null==n){if(null===l.type)return document.createTextNode(d);n=t?document.createElementNS("http://www.w3.org/2000/svg",l.type):document.createElement(l.type,d.is&&{is:d.is}),r=null,c=!1;}if(null===l.type)p!==d&&n.data!=d&&(n.data=d);else {if(null!=r&&(r=e$1.slice.call(n.childNodes)),v=(p=u.props||f$1).dangerouslySetInnerHTML,h=d.dangerouslySetInnerHTML,!c){if(null!=r)for(p={},y=0;y<n.attributes.length;y++)p[n.attributes[y].name]=n.attributes[y].value;(h||v)&&(h&&v&&h.__html==v.__html||(n.innerHTML=h&&h.__html||""));}A$1(n,d,p,t,c),h?l.__k=[]:(s=l.props.children,g$1(n,Array.isArray(s)?s:[s],l,u,i,"foreignObject"!==l.type&&t,r,o,f$1,c)),c||("value"in d&&void 0!==(s=d.value)&&s!==n.value&&C$1(n,"value",s,p.value,!1),"checked"in d&&void 0!==(s=d.checked)&&s!==n.checked&&C$1(n,"checked",s,p.checked,!1));}return n}function H$1(l,u,i){try{"function"==typeof l?l(u):l.current=u;}catch(l){n$1.__e(l,i);}}function I$1(l,u,i){var t,r,o;if(n$1.unmount&&n$1.unmount(l),(t=l.ref)&&(t.current&&t.current!==l.__e||H$1(t,null,u)),i||"function"==typeof l.type||(i=null!=(r=l.__e)),l.__e=l.__d=void 0,null!=(t=l.__c)){if(t.componentWillUnmount)try{t.componentWillUnmount();}catch(l){n$1.__e(l,u);}t.base=t.__P=null;}if(t=l.__k)for(o=0;o<t.length;o++)t[o]&&I$1(t[o],u,i);null!=r&&a$1(r);}function L$1(n,l,u){return this.constructor(n,u)}n$1={__e:function(n,l){for(var u,i;l=l.__;)if((u=l.__c)&&!u.__)try{if(u.constructor&&null!=u.constructor.getDerivedStateFromError&&(i=!0,u.setState(u.constructor.getDerivedStateFromError(n))),null!=u.componentDidCatch&&(i=!0,u.componentDidCatch(n)),i)return w$1(u.__E=u)}catch(l){n=l;}throw n}},d$1.prototype.setState=function(n,l){var u;u=this.__s!==this.state?this.__s:this.__s=s$1({},this.state),"function"==typeof n&&(n=n(u,this.props)),n&&s$1(u,n),null!=n&&this.__v&&(l&&this.__h.push(l),w$1(this));},d$1.prototype.forceUpdate=function(n){this.__v&&(this.__e=!0,n&&this.__h.push(n),w$1(this));},d$1.prototype.render=p$1,u$1=[],i$1="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,m$1.__r=0,o$1=0;

    const debug = window.location.protocol === "file:" || window.location.hostname === "localhost";
    /* eslint-disable no-console */
    const logger = debug
        ? (name) => (msg) => console.log(`[${name}] ${msg}`)
        : () => () => 0;

    const gifWorker = "gif.worker-8b0d4d4953c887a3.js";

    /*
     * The MIT License (MIT)
     *
     * Copyright (c) 2013-2018 Johan Nordberg
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in
     * all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
     * THE SOFTWARE.
     */
    const log = logger("GIF encoding");
    const defaults = {
        workers: 2,
        repeat: 0,
        background: "#fff",
        quality: 10,
        transparent: null,
        dither: false,
    };
    const frameDefaults = {
        delay: 500,
    };
    class GIF {
        constructor(options) {
            this.running = false;
            this.frames = [];
            this.freeWorkers = [];
            this.activeWorkers = [];
            this.nextFrame = 0;
            this.finishedFrames = 0;
            this.globalPalette = true;
            this.options = Object.assign(Object.assign({}, defaults), options);
        }
        addFrame(image, options) {
            let data;
            if (image instanceof ImageData) {
                data = image.data;
            }
            else if (image instanceof CanvasRenderingContext2D) {
                data = this.getContextData(image);
            }
            else {
                throw new Error("Invalid image");
            }
            this.frames.push(Object.assign(Object.assign(Object.assign({}, frameDefaults), options), { transparent: this.options.transparent, data }));
        }
        render() {
            if (this.running)
                throw new Error("Already rendering");
            this.running = true;
            this.nextFrame = 0;
            this.finishedFrames = 0;
            this.imageParts = this.frames.map(() => null);
            const numWorkers = this.spawnWorkers();
            // We need to wait for the palette
            if (this.globalPalette === true) {
                this.renderNextFrame();
            }
            else {
                for (let i = 0; i < numWorkers; i++)
                    this.renderNextFrame();
            }
            if (this.onProgress)
                this.onProgress(0);
        }
        abort() {
            while (true) {
                const worker = this.activeWorkers.shift();
                if (worker == null)
                    break;
                log("Killing active worker");
                worker.terminate();
            }
            this.running = false;
            if (this.onAbort)
                this.onAbort();
        }
        spawnWorkers() {
            const numWorkers = Math.min(this.options.workers, this.frames.length);
            for (let i = this.freeWorkers.length; i < numWorkers; i++) {
                log(`Spawning worker ${i}`);
                const worker = new Worker(gifWorker);
                worker.onmessage = (event) => {
                    this.activeWorkers.splice(this.activeWorkers.indexOf(worker), 1);
                    this.freeWorkers.push(worker);
                    return this.frameFinished(event.data);
                };
                this.freeWorkers.push(worker);
            }
            return numWorkers;
        }
        frameFinished(frame) {
            if (!this.imageParts)
                throw new Error("No image data!");
            log(`Frame ${frame.index} finished - ${this.activeWorkers.length} active`);
            this.finishedFrames++;
            if (this.onProgress)
                this.onProgress(this.finishedFrames / this.frames.length);
            this.imageParts[frame.index] = frame;
            // Remember calculated palette, spawn the rest of the workers
            if (this.globalPalette === true) {
                this.globalPalette = frame.globalPalette;
                log("Global palette analyzed");
                if (this.frames.length > 2) {
                    for (let i = 1; i < this.freeWorkers.length; i++)
                        this.renderNextFrame();
                }
            }
            if (this.imageParts.indexOf(null) >= 0) {
                return this.renderNextFrame();
            }
            else {
                return this.finishRendering();
            }
        }
        finishRendering() {
            if (!this.imageParts)
                throw new Error("No image data!");
            const imageParts = this.imageParts;
            let len = 0;
            for (const frame of imageParts) {
                len += (frame.data.length - 1) * frame.pageSize + frame.cursor;
            }
            const lastFrame = imageParts[this.frames.length - 1];
            len += lastFrame.pageSize - lastFrame.cursor;
            log(`Rendering finished - filesize ${Math.round(len / 1000)}kb`);
            const data = new Uint8Array(len);
            let offset = 0;
            for (const frame of imageParts) {
                for (let i = 0; i < frame.data.length; i++) {
                    data.set(frame.data[i], offset);
                    offset += i === frame.data.length - 1 ? frame.cursor : frame.pageSize;
                }
            }
            if (this.onFinished)
                this.onFinished(new Blob([data], { type: "image/gif" }));
        }
        renderNextFrame() {
            if (this.freeWorkers.length === 0)
                throw new Error("No free workers");
            if (this.nextFrame >= this.frames.length)
                return;
            const worker = this.freeWorkers.shift();
            const task = this.getTask(this.nextFrame++);
            log(`Starting frame ${task.index + 1} of ${this.frames.length}`);
            this.activeWorkers.push(worker);
            return worker.postMessage(task);
        }
        getContextData(ctx) {
            return ctx.getImageData(0, 0, this.options.width, this.options.height).data;
        }
        getTask(index) {
            const frame = this.frames[index];
            return {
                index,
                data: frame.data,
                last: index === (this.frames.length - 1),
                delay: frame.delay,
                dispose: -1,
                transparent: frame.transparent,
                width: this.options.width,
                height: this.options.height,
                quality: this.options.quality,
                dither: this.options.dither,
                globalPalette: this.globalPalette,
                repeat: this.options.repeat,
                canTransfer: true,
            };
        }
    }

    const pad = (val, len) => {
        const str = val.toString();
        return str.length >= len ? str : "0".repeat(len - str.length) + str;
    };
    /**
     * Save a Blob to a file
     *
     * @param prefix The file's prefix
     * @param extension The appropriate extension
     * @param blob The blob to save to
     */
    const saveBlob = (prefix, extension, blob) => {
        if (!blob)
            return;
        // Somewhat inspired by https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js
        // Goodness knows how well this works on non-modern browsers.
        const element = document.createElement("a");
        const url = URL.createObjectURL(blob);
        const now = new Date();
        element.download = `${prefix}-${now.getFullYear()}-${pad(now.getMonth() + 1, 2)}-${pad(now.getDate(), 2)}_` +
            `${pad(now.getHours(), 2)}-${pad(now.getMinutes(), 2)}.${extension}`;
        element.rel = "noopener";
        element.href = url;
        setTimeout(() => URL.revokeObjectURL(url), 60e3);
        setTimeout(() => {
            try {
                element.dispatchEvent(new MouseEvent("click"));
            }
            catch (e) {
                const mouseEvent = document.createEvent("MouseEvents");
                mouseEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
                element.dispatchEvent(mouseEvent);
            }
        }, 0);
    };

    var actionButton = "styles_action-button__29pOi";
    var iconFont = "styles_icon-font__1H3BG";
    var terminalView = "styles_terminal-view__37xWp";
    var terminalWrapper = "styles_terminal-wrapper__3I5uV";
    var terminalCanvas = "styles_terminal-canvas__2pOP7";
    var terminalBar = "styles_terminal-bar__37cZx";
    var terminalInfo = "styles_terminal-info__2RKpQ";
    var terminalButton = "styles_terminal-button__1drLp";
    var terminalButtonsRight = "styles_terminal-buttons-right__3bm4O";
    var terminalInput = "styles_terminal-input__1Vul2";
    var terminalProgress = "styles_terminal-progress__3wnSw";

    const mk = (child, viewbox) => {
        const node = v$1("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: viewbox !== null && viewbox !== void 0 ? viewbox : "0 0 1000 1000", class: iconFont }, child);
        return () => node;
    };
    const power = "M857 650q0 87 -34 166t-91 137 -137 92 -166 34 -167 -34 -136 -92 -92 -137 -34 -166q0 -102 45 -191t126 -151q24 -18 54 -14t46 28q18 23 14 53t-28 47q-54 41 -84 101t-30 127q0 58 23 111t61 91 91 61 111 23 110 -23 92 -61 61 -91 22 -111q0 -68 -30 -127t-84 -101q-23 -18 -28 -47t14 -53q17 -24 47 -28t53 14q81 61 126 151t45 191zm-357 -429v358q0 29 -21 50t-50 21 -51 -21 -21 -50v-358q0 -29 21 -50t51 -21 50 21 21 50z";
    const video = "M1000 346v608q0 23 -22 32 -7 3 -14 3 -15 0 -25 -10l-225 -225v92q0 67 -47 114t-113 47h-393q-67 0 -114 -47t-47 -114v-392q0 -67 47 -114t114 -47h393q66 0 113 47t47 114v92l225 -225q10 -10 25 -10 7 0 14 2 22 10 22 33z";
    const NoEntry = mk(v$1("path", { d: "M679 686v-72q0 -14 -11 -25t-25 -10h-429q-14 0 -25 10t-10 25v72q0 14 10 25t25 10h429q14 0 25 -10t11 -25zm178 -36q0 117 -57 215t-156 156 -215 58 -216 -58 -155 -156 -58 -215 58 -215 155 -156 216 -58 215 58 156 156 57 215z" }), "0 200 870 870");
    const Off = mk(v$1("path", { d: power }));
    const On = mk(v$1("path", { d: power, fill: "green" }));
    const Camera = mk(v$1("path", { d: "M536 525q66 0 113 47t47 114 -47 113 -113 47 -114 -47 -47 -113 47 -114 114 -47zm393 -232q59 0 101 42t41 101v500q0 59 -41 101t-101 42h-786q-59 0 -101 -42t-42 -101v-500q0 -59 42 -101t101 -42h125l28 -76q11 -27 39 -47t58 -20h286q29 0 57 20t39 47l29 76h125zm-393 643q103 0 176 -74t74 -176 -74 -177 -176 -73 -177 73 -73 177 73 176 177 74z" }), "0 0 1100 1100");
    const Videocam = mk(v$1("path", { d: video }), "0 100 1000 1000");
    const VideocamRecording = mk(v$1("path", { d: video, fill: "red" }), "0 100 1000 1000");
    const Fullscreen = mk(v$1("path", { d: "M421 261q0-7-5-13l-185-185 80-81q10-10 10-25t-10-25-25-11h-250q-15 0-25 11t-11 25v250q0 15 11 25t25 11 25-11l80-80 186 185q5 6 12 6t13-6l64-63q5-6 5-13z m436 482v-250q0-15-10-25t-26-11-25 11l-80 80-185-185q-6-6-13-6t-13 6l-64 64q-5 5-5 12t5 13l186 185-81 81q-10 10-10 25t10 25 25 11h250q15 0 26-11t10-25z" }), "0 -100 900 900");

    const convertMouseButton = (btn) => {
        switch (btn) {
            case 0: return 1; // Left
            case 1: return 3; // Middle
            case 2: return 2; // Right
            default: return undefined;
        }
    };
    const convertMouseButtons = (btn) => {
        if ((btn & 1) !== 0)
            return 1; // Left
        if ((btn & 2) !== 0)
            return 2; // Right
        if ((btn & 4) !== 0)
            return 3; // Middle
        return undefined;
    };
    /**
     * Mapping of KeyboardEvent.code and KeyboardEvent.key
     *
     * @see https://www.w3.org/TR/uievents-key/
     * @see https://www.w3.org/TR/uievents-code/
     */
    const keyboardCodes = {
        "Digit1": 0 /* One */, "1": 0 /* One */,
        "Digit2": 1 /* Two */, "2": 1 /* Two */,
        "Digit3": 2 /* Three */, "3": 2 /* Three */,
        "Digit4": 3 /* Four */, "4": 3 /* Four */,
        "Digit5": 4 /* Five */, "5": 4 /* Five */,
        "Digit6": 5 /* Six */, "6": 5 /* Six */,
        "Digit7": 6 /* Seven */, "7": 6 /* Seven */,
        "Digit8": 7 /* Eight */, "8": 7 /* Eight */,
        "Digit9": 8 /* Nine */, "9": 8 /* Nine */,
        "Digit0": 9 /* Zero */, "0": 9 /* Zero */,
        "Minus": 10 /* Minus */, "-": 10 /* Minus */,
        "Equal": 11 /* Equals */,
        "Backspace": 12 /* Backspace */,
        "Tab": 13 /* Tab */,
        "KeyQ": 30 /* Q */, "Q": 30 /* Q */,
        "KeyW": 36 /* W */, "W": 36 /* W */,
        "KeyE": 18 /* E */, "E": 18 /* E */,
        "KeyR": 31 /* R */, "R": 31 /* R */,
        "KeyT": 33 /* T */, "T": 33 /* T */,
        "KeyY": 38 /* Y */, "Y": 38 /* Y */,
        "KeyU": 34 /* U */, "U": 34 /* U */,
        "KeyI": 22 /* I */, "I": 22 /* I */,
        "KeyO": 28 /* O */, "O": 28 /* O */,
        "KeyP": 29 /* P */, "P": 29 /* P */,
        "BracketLeft": 40 /* LeftBracket */, "(": 40 /* LeftBracket */,
        "BracketRight": 41 /* RightBracket */, ")": 41 /* RightBracket */,
        "Enter": 42 /* Enter */,
        "ControlLeft": 43 /* LeftCtrl */, "Control": 43 /* LeftCtrl */,
        "KeyA": 14 /* A */, "A": 14 /* A */,
        "KeyS": 32 /* S */, "S": 32 /* S */,
        "KeyD": 17 /* D */, "D": 17 /* D */,
        "KeyF": 19 /* F */, "F": 19 /* F */,
        "KeyG": 20 /* G */, "G": 20 /* G */,
        "KeyH": 21 /* H */, "H": 21 /* H */,
        "KeyJ": 23 /* J */, "J": 23 /* J */,
        "KeyK": 24 /* K */, "K": 24 /* K */,
        "KeyL": 25 /* L */, "L": 25 /* L */,
        "Semicolon": 44 /* SemiColon */, ";": 44 /* SemiColon */,
        "Quote": 45 /* Apostrophe */, "'": 45 /* Apostrophe */,
        "Backquote": 46 /* Grave */, "`": 46 /* Grave */,
        "ShiftLeft": 47 /* LeftShift */, "Shift": 47 /* LeftShift */,
        "IntlBackslash": 48 /* Backslash */,
        "KeyZ": 39 /* Z */, "Z": 39 /* Z */,
        "KeyX": 37 /* X */, "X": 37 /* X */,
        "KeyC": 16 /* C */, "C": 16 /* C */,
        "KeyV": 35 /* V */, "V": 35 /* V */,
        "KeyB": 15 /* B */, "B": 15 /* B */,
        "KeyN": 27 /* N */, "N": 27 /* N */,
        "KeyM": 26 /* M */, "M": 26 /* M */,
        "Comma": 49 /* Comma */, ",": 49 /* Comma */,
        "Period": 50 /* Period */, ".": 50 /* Period */,
        "Slash": 51 /* Slash */, "/": 51 /* Slash */,
        "ShiftRight": 52 /* RightShift */,
        "NumpadMultiply": 53 /* Multiply */,
        "AltLeft": 54 /* LeftAlt */, "Alt": 54 /* LeftAlt */,
        "Space": 55 /* Space */, " ": 55 /* Space */,
        "CapsLock": 56 /* CapsLock */,
        "F1": 57 /* F1 */,
        "F2": 58 /* F2 */,
        "F3": 59 /* F3 */,
        "F4": 60 /* F4 */,
        "F5": 61 /* F5 */,
        "F6": 62 /* F6 */,
        "F7": 63 /* F7 */,
        "F8": 64 /* F8 */,
        "F9": 65 /* F9 */,
        "F10": 66 /* F10 */,
        "NumLock": 72 /* NumLock */,
        "ScollLock": 73 /* ScrollLock */,
        "Numpad7": 81 /* NumPad7 */,
        "Numpad8": 82 /* NumPad8 */,
        "Numpad9": 83 /* NumPad9 */,
        "NumpadSubtract": 84 /* NumPadSubtract */,
        "Numpad4": 78 /* NumPad4 */,
        "Numpad5": 79 /* NumPad5 */,
        "Numpad6": 80 /* NumPad6 */,
        "NumpadAdd": 85 /* NumPadAdd */,
        "Numpad1": 75 /* NumPad1 */,
        "Numpad2": 76 /* NumPad2 */,
        "Numpad3": 77 /* NumPad3 */,
        "Numpad0": 74 /* NumPad0 */,
        "NumpadDecimal": 86 /* NumPadDecimal */,
        "F11": 67 /* F11 */,
        "F12": 68 /* F12 */,
        "F13": 69 /* F13 */,
        "F14": 70 /* F14 */,
        "F15": 71 /* F15 */,
        // I have absolutely no clue about these. If someone has a keyboard with these
        // on, please confim that they're right.
        "KanaMode": 87 /* Kana */,
        "Convert": 88 /* Convert */,
        "NonConvert": 89 /* Noconvert */,
        "IntlYen": 90 /* Yen */,
        "NumpadEqual": 91 /* NumPadEquals */,
        "Cirmcumflex": 92 /* Circumflex */,
        "At": 93 /* At */,
        "Colon": 94 /* Colon */,
        "Underscore": 95 /* Underscore */,
        "Kanji": 96 /* Kanji */,
        "Stop": 97 /* Stop */,
        "Ax": 98 /* Ax */,
        "NumpadEnter": 42 /* Enter */,
        "ControlRight": 100 /* RightCtrl */,
        "NumpadComma": 101 /* NumPadComma */,
        "NumpadDivide": 102 /* NumPadDivide */,
        "AltRight": 103 /* RightAlt */,
        "Pause": 104 /* Pause */,
        "Home": 105 /* Home */,
        "ArrowUp": 106 /* Up */,
        "PageUp": 107 /* PageUp */,
        "ArrowLeft": 108 /* Left */,
        "ArrowRight": 109 /* Right */,
        "End": 110 /* End */,
        "ArrowDown": 111 /* Down */,
        "PageDown": 112 /* PageDown */,
        "Insert": 113 /* Insert */,
        "Delete": 114 /* Delete */,
    };
    const convertKey = (key) => keyboardCodes[key];
    const lwjgl2Codes = [
        2 /* one */, 3 /* two */, 4 /* three */, 5 /* four */, 6 /* five */, 7 /* six */, 8 /* seven */, 9 /* eight */, 10 /* nine */, 11 /* zero */,
        12 /* minus */,
        13 /* equals */,
        14 /* backspace */,
        15 /* tab */,
        30 /* a */, 48 /* b */, 46 /* c */, 32 /* d */, 18 /* e */, 33 /* f */, 34 /* g */, 35 /* h */, 23 /* i */, 36 /* j */, 37 /* k */, 38 /* l */, 50 /* m */, 49 /* n */, 24 /* o */, 25 /* p */, 16 /* q */, 19 /* r */, 31 /* s */, 20 /* t */, 22 /* u */, 47 /* v */, 17 /* w */, 45 /* x */, 21 /* y */, 44 /* z */,
        26 /* leftBracket */,
        27 /* rightBracket */,
        28 /* enter */,
        29 /* leftCtrl */,
        39 /* semiColon */,
        40 /* apostrophe */,
        41 /* grave */,
        42 /* leftShift */,
        43 /* backslash */,
        51 /* comma */,
        52 /* period */,
        53 /* slash */,
        54 /* rightShift */,
        55 /* multiply */,
        56 /* leftAlt */,
        57 /* space */,
        58 /* capsLock */,
        59 /* f1 */, 60 /* f2 */, 61 /* f3 */, 62 /* f4 */, 63 /* f5 */, 64 /* f6 */, 65 /* f7 */, 66 /* f8 */, 67 /* f9 */, 68 /* f10 */, 87 /* f11 */, 88 /* f12 */, 100 /* f13 */, 101 /* f14 */, 102 /* f15 */,
        69 /* numLock */,
        70 /* scrollLock */,
        82 /* numPad0 */, 79 /* numPad1 */, 80 /* numPad2 */, 81 /* numPad3 */, 75 /* numPad4 */, 76 /* numPad5 */, 77 /* numPad6 */, 71 /* numPad7 */, 72 /* numPad8 */, 73 /* numPad9 */,
        74 /* numPadSubtract */,
        78 /* numPadAdd */,
        83 /* numPadDecimal */,
        112 /* kana */,
        121 /* convert */,
        123 /* noconvert */,
        125 /* yen */,
        141 /* numPadEquals */,
        144 /* circumflex */,
        145 /* at */,
        146 /* colon */,
        147 /* underscore */,
        148 /* kanji */,
        149 /* stop */,
        150 /* ax */,
        156 /* numPadEnter */,
        157 /* rightCtrl */,
        179 /* numPadComma */,
        181 /* numPadDivide */,
        184 /* rightAlt */,
        197 /* pause */,
        199 /* home */,
        200 /* up */,
        201 /* pageUp */,
        203 /* left */,
        205 /* right */,
        207 /* end */,
        208 /* down */,
        209 /* pageDown */,
        210 /* insert */,
        211 /* delete */,
    ];
    const lwjgl2Code = (key) => lwjgl2Codes[key];

    const defaultPalette = {
        0: "rgb(240,240,240)",
        1: "rgb(242,178,51)",
        2: "rgb(229,127,216)",
        3: "rgb(153,178,242)",
        4: "rgb(222,222,108)",
        5: "rgb(127,204,25)",
        6: "rgb(242,178,204)",
        7: "rgb(76,76,76)",
        8: "rgb(153,153,153)",
        9: "rgb(76,153,178)",
        a: "rgb(178,102,229)",
        b: "rgb(37,49,146)",
        c: "rgb(127,102,76)",
        d: "rgb(87,166,78)",
        e: "rgb(204,76,76)",
        f: "rgb(0,0,0)",
    };
    class TerminalData {
        constructor() {
            this.palette = defaultPalette;
            this.currentFore = "0";
            this.sizeX = 0;
            this.sizeY = 0;
            this.cursorX = 0;
            this.cursorY = 0;
            this.cursorBlink = false;
            this.text = [];
            this.fore = [];
            this.back = [];
        }
        resize(width, height) {
            this.sizeX = width;
            this.sizeY = height;
            this.text = new Array(height);
            this.fore = new Array(height);
            this.back = new Array(height);
            let baseText = "";
            let baseFore = "";
            let baseBack = "";
            for (let x = 0; x < width; x++) {
                baseText += " ";
                baseFore += this.currentFore;
                baseBack += "f";
            }
            for (let y = 0; y < height; y++) {
                this.text[y] = baseText;
                this.fore[y] = baseFore;
                this.back[y] = baseBack;
            }
        }
    }

    const cellWidth = 6;
    const cellHeight = 9;
    const terminalMargin = 4;
    const fonts = {};
    const loadPalette = ({ image, paletteCache }, colour) => {
        const cached = paletteCache[colour];
        if (cached)
            return cached;
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = image.width;
        canvas.height = image.height;
        context.globalCompositeOperation = "destination-atop";
        context.fillStyle = colour;
        context.globalAlpha = 1.0;
        context.fillRect(0, 0, image.width, image.height);
        context.drawImage(image, 0, 0);
        paletteCache[colour] = canvas;
        return canvas;
    };
    const loadFont = (path) => {
        const cached = fonts[path];
        if (cached)
            return cached;
        const image = new Image();
        image.src = path;
        const font = fonts[path] = {
            path,
            image,
            scale: 1,
            margin: 1,
            paletteCache: {},
        };
        font.promise = new Promise(resolve => {
            image.onload = () => {
                for (const key in defaultPalette) {
                    if (!Object.prototype.hasOwnProperty.call(defaultPalette, key))
                        continue;
                    loadPalette(font, defaultPalette[key]);
                }
                font.scale = font.margin = image.width / 256;
                font.promise = undefined;
                resolve(font);
            };
        });
        return font;
    };
    const background = (ctx, x, y, color, scale, width, height, palette) => {
        let actualWidth = cellWidth * scale;
        let actualHeight = cellHeight * scale;
        let cellX = x * actualWidth + terminalMargin;
        let cellY = y * actualHeight + terminalMargin;
        if (x === 0) {
            cellX -= terminalMargin;
            actualWidth += terminalMargin;
        }
        if (x === width - 1) {
            actualWidth += terminalMargin;
        }
        if (y === 0) {
            cellY -= terminalMargin;
            actualHeight += terminalMargin;
        }
        if (y === height - 1) {
            actualHeight += terminalMargin;
        }
        ctx.beginPath();
        ctx.rect(cellX, cellY, actualWidth, actualHeight);
        ctx.fillStyle = palette[color];
        ctx.fill();
    };
    const foreground = (ctx, x, y, color, chr, palette, scale, font) => {
        if (font.promise)
            return;
        const actualWidth = cellWidth * scale;
        const actualHeight = cellHeight * scale;
        const cellX = x * actualWidth + terminalMargin;
        const cellY = y * actualHeight + terminalMargin;
        const charcode = chr.charCodeAt(0);
        const imageW = cellWidth * font.scale;
        const imageH = cellHeight * font.scale;
        const imgX = font.margin + (charcode % 16) * (imageW + font.margin * 2);
        const imgY = font.margin + Math.floor(charcode / 16) * (imageH + font.margin * 2);
        ctx.drawImage(loadPalette(font, palette[color]), imgX, imgY, imageW, imageH, cellX, cellY, cellWidth * scale, cellHeight * scale);
    };
    const terminal = (ctx, term, blink, scale, font) => {
        const sizeX = term.sizeX;
        const sizeY = term.sizeY;
        for (let y = 0; y < sizeY; y++) {
            for (let x = 0; x < sizeX; x++) {
                background(ctx, x, y, term.back[y].charAt(x), scale, term.sizeX, term.sizeY, term.palette);
                foreground(ctx, x, y, term.fore[y].charAt(x), term.text[y].charAt(x), term.palette, scale, font);
            }
        }
        if (blink && term.cursorBlink &&
            term.cursorX >= 0 && term.cursorX < sizeX &&
            term.cursorY >= 0 && term.cursorY < sizeY) {
            foreground(ctx, term.cursorX, term.cursorY, term.currentFore, "_", term.palette, scale, font);
        }
    };
    const bsod = (ctx, width, height, text, scale, font) => {
        ctx.beginPath();
        ctx.rect(0, 0, width * cellWidth * scale + terminalMargin * 2, height * cellHeight * scale + terminalMargin * 2);
        ctx.fillStyle = defaultPalette.b;
        ctx.fill();
        const startX = Math.floor((width - text.length) / 2);
        const startY = Math.floor((height - 1) / 2);
        for (let x = 0; x < text.length; x++) {
            foreground(ctx, startX + x, startY, "0", text.charAt(x), defaultPalette, scale, font);
        }
    };

    const log$1 = logger("Terminal");
    const clamp = (value, min, max) => {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    };
    const labelElement = (id, label) => {
        if (id === null && label === null)
            return "Unlabeled computer";
        if (id === null)
            return `${label}`;
        if (label === null)
            return `Computer #${id}`;
        return `${label} (Computer #${id})`;
    };
    class Terminal extends d$1 {
        constructor(props, context) {
            super(props, context);
            this.changed = false;
            this.lastBlink = false;
            this.mounted = false;
            this.drawQueued = false;
            this.lastX = -1;
            this.lastY = -1;
            this.gif = null;
            this.lastGifFrame = null;
            this.onResized = () => {
                this.changed = true;
                this.queueDraw();
            };
            this.onPaste = (event) => {
                this.onEventDefault(event);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.paste((event.clipboardData || window.clipboardData));
            };
            this.onMouse = (event) => {
                this.onEventDefault(event);
                if (!this.canvasElem)
                    return;
                // If we"re a mouse move and nobody is pressing anything, let"s
                // skip for now.
                if (event.type === "mousemove" && event.buttons === 0)
                    return;
                const x = clamp(Math.floor((event.pageX - this.canvasElem.offsetLeft - terminalMargin)
                    / (this.canvasElem.width - 2 * terminalMargin) * this.props.terminal.sizeX) + 1, 1, this.props.terminal.sizeX);
                const y = clamp(Math.floor((event.pageY - this.canvasElem.offsetTop - terminalMargin)
                    / (this.canvasElem.height - 2 * terminalMargin) * this.props.terminal.sizeY) + 1, 1, this.props.terminal.sizeY);
                switch (event.type) {
                    case "mousedown": {
                        const button = convertMouseButton(event.button);
                        if (button) {
                            this.props.computer.queueEvent("mouse_click", [button, x, y]);
                            this.lastX = x;
                            this.lastY = y;
                        }
                        break;
                    }
                    case "mouseup": {
                        const button = convertMouseButton(event.button);
                        if (button) {
                            this.props.computer.queueEvent("mouse_up", [button, x, y]);
                            this.lastX = x;
                            this.lastY = y;
                        }
                        break;
                    }
                    case "mousemove": {
                        const button = convertMouseButtons(event.buttons);
                        if (button && (x !== this.lastX || y !== this.lastY)) {
                            this.props.computer.queueEvent("mouse_drag", [button, x, y]);
                            this.lastX = x;
                            this.lastY = y;
                        }
                    }
                }
            };
            this.onMouseWheel = (event) => {
                this.onEventDefault(event);
                if (!this.canvasElem)
                    return;
                const x = clamp(Math.floor((event.pageX - this.canvasElem.offsetLeft - terminalMargin)
                    / (this.canvasElem.width - 2 * terminalMargin) * this.props.terminal.sizeX) + 1, 1, this.props.terminal.sizeX);
                const y = clamp(Math.floor((event.pageY - this.canvasElem.offsetTop - terminalMargin)
                    / (this.canvasElem.height - 2 * terminalMargin) * this.props.terminal.sizeY) + 1, 1, this.props.terminal.sizeY);
                if (event.deltaY !== 0) {
                    this.props.computer.queueEvent("mouse_scroll", [Math.sign(event.deltaY), x, y]);
                }
            };
            this.onEventDefault = (event) => {
                event.preventDefault();
                if (this.inputElem)
                    this.inputElem.focus();
            };
            this.onKey = (event) => {
                if (!this.canvasElem)
                    return;
                // Handle pasting. Might be worth adding shift+insert support too.
                // Note this is needed as we block the main paste event.
                if (event.type === "keydown" && (event.ctrlKey && event.code === "KeyV")) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data = window.clipboardData;
                    if (data) {
                        this.paste(data);
                        this.onEventDefault(event);
                    }
                    return;
                }
                // Try to pull the key number from the event. We first try the key code
                // (ideal, as it's independent of layout), then the key itself, or the
                // uppercase key (tacky shortcut to handle 'a' and 'A').
                let code = convertKey(event.code);
                if (code === undefined)
                    code = convertKey(event.key);
                if (code === undefined)
                    code = convertKey(event.key.toUpperCase());
                if (code !== undefined || event.key.length === 1)
                    this.onEventDefault(event);
                if (event.type === "keydown") {
                    if (code !== undefined)
                        this.props.computer.keyDown(code, event.repeat);
                    if (!event.altKey && !event.ctrlKey && event.key.length === 1) {
                        this.props.computer.queueEvent("char", [event.key]);
                    }
                }
                else if (event.type === "keyup") {
                    if (code !== undefined)
                        this.props.computer.keyUp(code);
                }
            };
            this.onInput = (event) => {
                const target = event.target;
                this.onEventDefault(event);
                // Some browsers (*cough* Chrome *cough*) don't provide
                // KeyboardEvent.{code, key} for printable characters. Let's scrape it from
                // the input instead.
                const value = target.value;
                if (!value)
                    return;
                target.value = "";
                this.props.computer.queueEvent(value.length === 1 ? "char" : "paste", [value]);
            };
            this.onTerminate = (event) => {
                this.onEventDefault(event);
                this.props.computer.queueEvent("terminate", []);
            };
            this.onChanged = () => {
                this.changed = true;
                this.queueDraw();
            };
            this.onPowerOff = (event) => {
                this.onEventDefault(event);
                this.props.computer.shutdown();
            };
            this.onPowerOn = (event) => {
                this.onEventDefault(event);
                this.props.computer.turnOn();
            };
            this.onScreenshot = (event) => {
                this.onEventDefault(event);
                if (!this.canvasElem)
                    return;
                this.canvasElem.toBlob(blob => saveBlob("computer", "png", blob), "image/png", 1);
            };
            this.onRecord = (event) => {
                this.onEventDefault(event);
                if (!this.canvasElem)
                    return;
                switch (this.state.recording) {
                    // Skip the cases when we've got no data
                    case 2 /* Rendering */:
                        break;
                    // If we're not recording, start recording.
                    case 0 /* None */:
                        this.gif = new GIF({
                            width: this.canvasElem.width,
                            height: this.canvasElem.height,
                            quality: 10,
                        });
                        this.lastGifFrame = Date.now();
                        this.setState({ recording: 1 /* Recording */ });
                        break;
                    case 1 /* Recording */:
                        if (!this.gif) {
                            this.setState({ recording: 0 /* None */ });
                            return;
                        }
                        this.setState({ recording: 2 /* Rendering */ });
                        this.addGifFrame(true);
                        this.gif.onFinished = blob => {
                            this.setState({ recording: 0 /* None */ });
                            saveBlob("computer", "gif", blob);
                        };
                        this.gif.onProgress = progress => this.setState({ progress });
                        this.gif.onAbort = () => {
                            this.setState({ recording: 0 /* None */ });
                            console.error("Rendering GIF failed");
                        };
                        this.gif.render();
                        this.gif = null;
                        this.lastGifFrame = null;
                }
            };
            this.makeFullscreen = (event) => {
                var _a;
                this.onEventDefault(event);
                (_a = this.base) === null || _a === void 0 ? void 0 : _a.requestFullscreen().catch(e => {
                    console.error("Cannot make full-screen", e);
                });
            };
            this.setState({
                recording: 0 /* None */,
                progress: 0,
            });
            this.vdom = [
                v$1("canvas", { class: terminalCanvas, onMouseDown: this.onMouse, onMouseUp: this.onMouse, onMouseMove: this.onMouse, onWheel: this.onMouseWheel, onContextMenu: this.onEventDefault }),
                v$1("input", { type: "text", class: terminalInput, onPaste: this.onPaste, onKeyDown: this.onKey, onKeyUp: this.onKey, onInput: this.onInput }),
            ];
        }
        componentDidMount() {
            // Fetch the "key" elements
            const base = this.base;
            this.canvasElem = base.querySelector(`.${terminalCanvas}`);
            this.canvasContext = this.canvasElem.getContext("2d");
            this.inputElem = base.querySelector(`.${terminalInput}`);
            this.wrapperElem = base.querySelector(`.${terminalWrapper}`);
            // Subscribe to some events to allow us to shedule a redraw
            window.addEventListener("resize", this.onResized);
            this.props.changed.attach(this.onChanged);
            // Set some key properties
            this.changed = true;
            this.lastBlink = false;
            this.mounted = true;
            // Focus on the input element
            if (this.props.focused)
                this.inputElem.focus();
            // And let's draw!
            this.queueDraw();
        }
        componentWillUnmount() {
            this.canvasElem = undefined;
            this.canvasContext = undefined;
            this.inputElem = undefined;
            this.props.changed.detach(this.onChanged);
            window.removeEventListener("resize", this.onResized);
            this.lastBlink = false;
            this.mounted = false;
            this.drawQueued = false;
        }
        render({ id, label, on }, { recording, progress }) {
            const recordingDisabled = recording === 2 /* Rendering */;
            return v$1("div", { class: terminalView },
                v$1("div", { class: terminalWrapper },
                    this.vdom,
                    v$1("div", { class: terminalBar },
                        v$1("button", { class: `${actionButton} ${terminalButton}`, type: "button", title: on ? "Turn this computer off" : "Turn this computer on", onClick: on ? this.onPowerOff : this.onPowerOn }, on ? v$1(On, null) : v$1(Off, null)),
                        v$1("span", { class: terminalInfo }, labelElement(id, label)),
                        v$1("span", { class: terminalButtonsRight },
                            v$1("button", { class: `${actionButton} ${terminalButton}`, type: "button", title: "Take a screenshot of the terminal.", onClick: this.onScreenshot },
                                v$1(Camera, null)),
                            v$1("button", { class: `${actionButton} ${terminalButton} ${recordingDisabled ? "disabled" : ""}`, type: "button", title: "Record the terminal to a GIF.", onClick: this.onRecord }, recording === 1 /* Recording */ ? v$1(VideocamRecording, null) : v$1(Videocam, null)),
                            v$1("button", { class: `${actionButton} ${terminalButton}`, type: "button", title: "Make the terminal full-screen", onClick: this.makeFullscreen },
                                v$1(Fullscreen, null)),
                            v$1("button", { class: `${actionButton} ${terminalButton}`, type: "button", title: "Send a `terminate' event to the computer.", onClick: this.onTerminate },
                                v$1(NoEntry, null)))),
                    v$1("div", { class: terminalProgress, style: `width: ${recording === 2 /* Rendering */ ? progress * 100 : 0}%` })));
        }
        componentDidUpdate() {
            this.changed = true;
            this.queueDraw();
            if (this.props.focused && this.inputElem)
                this.inputElem.focus();
        }
        queueDraw() {
            if (this.mounted && !this.drawQueued) {
                this.drawQueued = true;
                window.requestAnimationFrame(time => {
                    this.drawQueued = false;
                    if (!this.mounted)
                        return;
                    // We push the previous frame before drawing the next one.
                    this.addGifFrame();
                    this.draw(time);
                    // Schedule another redraw to handle the cursor blink
                    if (this.props.terminal.cursorBlink)
                        this.queueDraw();
                });
            }
        }
        draw(time) {
            if (!this.canvasElem || !this.canvasContext || !this.wrapperElem)
                return;
            const { terminal: terminal$1, font: fontPath } = this.props;
            const sizeX = terminal$1.sizeX || 51;
            const sizeY = terminal$1.sizeY || 19;
            const font = loadFont(fontPath);
            if (font.promise) {
                font.promise.then(() => this.queueDraw());
                return;
            }
            const blink = Math.floor(time / 400) % 2 === 0;
            const changed = this.changed;
            if (!changed && (!terminal$1.cursorBlink || this.lastBlink === blink ||
                terminal$1.cursorX < 0 || terminal$1.cursorX >= sizeX ||
                terminal$1.cursorY < 0 || terminal$1.cursorY >= sizeY)) {
                return;
            }
            this.lastBlink = blink;
            this.changed = false;
            // Calculate terminal scaling to fit the screen
            const actualWidth = this.wrapperElem.parentElement.clientWidth - terminalMargin * 2;
            /* [Note 'Padding']: 70px = 30px top-padding + action-bar + arbitrary bottom-padding. See styles.css too. */
            const actualHeight = this.wrapperElem.parentElement.clientHeight - terminalMargin * 2 - 70;
            const width = sizeX * cellWidth;
            const height = sizeY * cellHeight;
            // The scale has to be an integer (though converted within the renderer) to ensure pixels are integers.
            // Otherwise you get texture issues.
            const scale = Math.max(1, Math.min(Math.floor(actualHeight / height), Math.floor(actualWidth / width)));
            const ctx = this.canvasContext;
            // If we"re just redrawing the cursor. We"ve aborted earlier if the cursor is not visible/
            // out of range and hasn"t changed.
            if (!changed) {
                if (blink) {
                    foreground(ctx, terminal$1.cursorX, terminal$1.cursorY, terminal$1.currentFore, "_", terminal$1.palette, scale, font);
                }
                else {
                    const x = terminal$1.cursorX;
                    const y = terminal$1.cursorY;
                    background(ctx, x, y, terminal$1.back[y].charAt(x), scale, sizeX, sizeY, terminal$1.palette);
                    foreground(ctx, x, y, terminal$1.fore[y].charAt(x), terminal$1.text[y].charAt(x), terminal$1.palette, scale, font);
                }
                return;
            }
            // Actually update the canvas dimensions.
            const canvasWidth = width * scale + terminalMargin * 2;
            const canvasHeight = height * scale + terminalMargin * 2;
            if (this.canvasElem.height !== canvasHeight || this.canvasElem.width !== canvasWidth) {
                this.canvasElem.height = canvasHeight;
                this.canvasElem.width = canvasWidth;
                this.canvasElem.style.height = `${canvasHeight}px`;
                this.wrapperElem.style.width = this.canvasElem.style.width = `${canvasWidth}px`;
            }
            // Prevent blur when up/down-scaling
            ctx.imageSmoothingEnabled = false;
            /* eslint-disable @typescript-eslint/no-explicit-any */
            ctx.oImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled = false;
            ctx.msImageSmoothingEnabled = false;
            /* eslint-enable @typescript-eslint/no-explicit-any */
            // And render!
            if (terminal$1.sizeX === 0 && terminal$1.sizeY === 0) {
                bsod(ctx, sizeX, sizeY, "No terminal output", scale, font);
            }
            else {
                terminal(ctx, terminal$1, blink, scale, font);
            }
        }
        paste(clipboard) {
            if (!clipboard)
                return;
            let content = clipboard.getData("text");
            if (!content)
                return;
            // Limit to allowed characters (actually slightly more generous but
            // there you go).
            content = content.replace(/[^\x20-\xFF]/gi, "");
            // Strip to the first newline
            content = content.replace(/[\r\n].*/, "");
            // Limit to 512 characters
            content = content.substr(0, 512);
            // Abort if we"re empty
            if (!content)
                return;
            this.props.computer.queueEvent("paste", [content]);
        }
        addGifFrame(force) {
            if (!this.gif || !this.canvasContext)
                return;
            if (!this.lastGifFrame) {
                console.error("Pushing a frame, but no previous frame!!");
                return;
            }
            // We limit ourselves to 20fps, just so we're not producing an insane number
            // of frames.
            const now = Date.now();
            if (!force && now - this.lastGifFrame < 50)
                return;
            log$1(`Adding frame for ${now - this.lastGifFrame} seconds`);
            this.gif.addFrame(this.canvasContext, { delay: now - this.lastGifFrame });
            this.lastGifFrame = now;
        }
    }

    var __awaiter = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * Rather ugly wrapper for jszip which sets 'global' before loading it.
     *
     * Yes, it's horrible, but it's needed.
     */
    const newZip = () => __awaiter(void 0, void 0, void 0, function* () {
        const globalObj = window; // eslint-disable-line @typescript-eslint/no-explicit-any
        if (!globalObj.global)
            globalObj.global = globalObj;
        return new (yield new Promise(function (resolve, reject) { require(['./index-fcfbe0c1'], resolve, reject) })).default();
    });

    const mk$1 = (child) => {
        const node = v("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 1000 1000", class: iconFont }, child);
        return () => node;
    };
    const Cog = mk$1(v("path", { d: "M571 650q0 -59 -41 -101t-101 -42 -101 42 -42 101 42 101 101 42 101 -42 41 -101zm286 -61v124q0 7 -4 13t-11 7l-104 16q-10 30 -21 51 19 27 59 77 6 6 6 13t-5 13q-15 21 -55 61t-53 39q-7 0 -14 -5l-77 -60q-25 13 -51 21 -9 76 -16 104 -4 16 -20 16h-124q-8 0 -14 -5t-6 -12l-16 -103q-27 -9 -50 -21l-79 60q-6 5 -14 5 -8 0 -14 -6 -70 -64 -92 -94 -4 -5 -4 -13 0 -6 5 -12 8 -12 28 -37t30 -40q-15 -28 -23 -55l-102 -15q-7 -1 -11 -7t-5 -13v-124q0 -7 5 -13t10 -7l104 -16q8 -25 22 -51 -23 -32 -60 -77 -6 -7 -6 -14 0 -5 5 -12 15 -20 55 -60t53 -40q7 0 15 5l77 60q24 -13 50 -21 9 -76 17 -104 3 -16 20 -16h124q7 0 13 5t7 12l15 103q28 9 51 20l79 -59q5 -5 13 -5 7 0 14 5 72 67 92 95 4 5 4 12 0 7 -4 13 -9 12 -29 37t-30 40q15 28 23 54l102 16q7 1 12 7t4 13z" }));
    const Info = mk$1(v("path", { d: "M571 918v-89q0 -8 -5 -13t-12 -5h-54v-286q0 -8 -5 -13t-13 -5h-178q-8 0 -13 5t-5 13v89q0 8 5 13t13 5h53v179h-53q-8 0 -13 5t-5 13v89q0 8 5 13t13 5h250q7 0 12 -5t5 -13zm-71 -500v-89q0 -8 -5 -13t-13 -5h-107q-8 0 -13 5t-5 13v89q0 8 5 13t13 5h107q8 0 13 -5t5 -13zm357 232q0 117 -57 215t-156 156 -215 58 -216 -58 -155 -156 -58 -215 58 -215 155 -156 216 -58 215 58 156 156 57 215z" }));
    const Download = mk$1(v("path", { d: "M714 900q0 -15 -10 -25t-25 -11 -25 11 -11 25 11 25 25 11 25 -11 10 -25zm143 0q0 -15 -10 -25t-26 -11 -25 11 -10 25 10 25 25 11 26 -11 10 -25zm72 -125v179q0 22 -16 37t-38 16h-821q-23 0 -38 -16t-16 -37v-179q0 -22 16 -38t38 -16h259l75 76q33 32 76 32t76 -32l76 -76h259q22 0 38 16t16 38zm-182 -318q10 23 -8 39l-250 250q-10 11 -25 11t-25 -11l-250 -250q-17 -16 -8 -39 10 -21 33 -21h143v-250q0 -15 11 -25t25 -11h143q14 0 25 11t10 25v250h143q24 0 33 21z" }));
    const Lua = mk$1(v("path", { d: "M882 650c0 -211 -171 -382 -382 -382s-382 171 -382 382c0 211 171 382 382 382s382 -171 382 -382m-112 -158c0 -62 -50 -112 -112 -112s-111 50 -111 112c0 61 50 112 111 112s112 -51 112 -112m224 -224c0 -62 -50 -112 -112 -112s-112 50 -112 112c0 61 51 112 112 112s112 -50 112 -112", fill: "#000080" }));
    const Text = mk$1(v("path", { d: "M819 362q16 16 27 42t11 50v642q0 23 -15 38t-38 16h-750q-23 0 -38 -16t-16 -38v-892q0 -23 16 -38t38 -16h500q22 0 49 11t42 27zm-248 -136v210h210q-5 -17 -12 -23l-175 -175q-6 -7 -23 -12zm215 853v-572h-232q-23 0 -38 -16t-16 -37v-233h-429v858h715zm-572 -483q0 -7 5 -12t13 -5h393q8 0 13 5t5 12v36q0 8 -5 13t-13 5h-393q-8 0 -13 -5t-5 -13v-36zm411 125q8 0 13 5t5 13v36q0 8 -5 13t-13 5h-393q-8 0 -13 -5t-5 -13v-36q0 -8 5 -13t13 -5h393zm0 143q8 0 13 5t5 13v36q0 8 -5 13t-13 5h-393q-8 0 -13 -5t-5 -13v-36q0 -8 5 -13t13 -5h393z" }));
    const RightOpen = mk$1(v("path", { d: "M618 639l-414 415q-11 10 -25 10t-25 -10l-93 -93q-11 -11 -11 -25t11 -25l296 -297 -296 -296q-11 -11 -11 -25t11 -25l93 -93q10 -11 25 -11t25 11l414 414q10 11 10 25t-10 25z" }));
    const DownOpen = mk$1(v("path", { d: "M939 601l-414 413q-10 11 -25 11t-25 -11l-414 -413q-11 -11 -11 -26t11 -25l93 -92q10 -11 25 -11t25 11l296 296 296 -296q11 -11 25 -11t26 11l92 92q11 11 11 25t-11 26z" }));

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    (function (global, undefined$1) {

        if (global.setImmediate) {
            return;
        }

        var nextHandle = 1; // Spec says greater than zero
        var tasksByHandle = {};
        var currentlyRunningATask = false;
        var doc = global.document;
        var registerImmediate;

        function setImmediate(callback) {
          // Callback can either be a function or a string
          if (typeof callback !== "function") {
            callback = new Function("" + callback);
          }
          // Copy function arguments
          var args = new Array(arguments.length - 1);
          for (var i = 0; i < args.length; i++) {
              args[i] = arguments[i + 1];
          }
          // Store and register the task
          var task = { callback: callback, args: args };
          tasksByHandle[nextHandle] = task;
          registerImmediate(nextHandle);
          return nextHandle++;
        }

        function clearImmediate(handle) {
            delete tasksByHandle[handle];
        }

        function run(task) {
            var callback = task.callback;
            var args = task.args;
            switch (args.length) {
            case 0:
                callback();
                break;
            case 1:
                callback(args[0]);
                break;
            case 2:
                callback(args[0], args[1]);
                break;
            case 3:
                callback(args[0], args[1], args[2]);
                break;
            default:
                callback.apply(undefined$1, args);
                break;
            }
        }

        function runIfPresent(handle) {
            // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
            // So if we're currently running a task, we'll need to delay this invocation.
            if (currentlyRunningATask) {
                // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                // "too much recursion" error.
                setTimeout(runIfPresent, 0, handle);
            } else {
                var task = tasksByHandle[handle];
                if (task) {
                    currentlyRunningATask = true;
                    try {
                        run(task);
                    } finally {
                        clearImmediate(handle);
                        currentlyRunningATask = false;
                    }
                }
            }
        }

        function installNextTickImplementation() {
            registerImmediate = function(handle) {
                process.nextTick(function () { runIfPresent(handle); });
            };
        }

        function canUsePostMessage() {
            // The test against `importScripts` prevents this implementation from being installed inside a web worker,
            // where `global.postMessage` means something completely different and can't be used for this purpose.
            if (global.postMessage && !global.importScripts) {
                var postMessageIsAsynchronous = true;
                var oldOnMessage = global.onmessage;
                global.onmessage = function() {
                    postMessageIsAsynchronous = false;
                };
                global.postMessage("", "*");
                global.onmessage = oldOnMessage;
                return postMessageIsAsynchronous;
            }
        }

        function installPostMessageImplementation() {
            // Installs an event handler on `global` for the `message` event: see
            // * https://developer.mozilla.org/en/DOM/window.postMessage
            // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

            var messagePrefix = "setImmediate$" + Math.random() + "$";
            var onGlobalMessage = function(event) {
                if (event.source === global &&
                    typeof event.data === "string" &&
                    event.data.indexOf(messagePrefix) === 0) {
                    runIfPresent(+event.data.slice(messagePrefix.length));
                }
            };

            if (global.addEventListener) {
                global.addEventListener("message", onGlobalMessage, false);
            } else {
                global.attachEvent("onmessage", onGlobalMessage);
            }

            registerImmediate = function(handle) {
                global.postMessage(messagePrefix + handle, "*");
            };
        }

        function installMessageChannelImplementation() {
            var channel = new MessageChannel();
            channel.port1.onmessage = function(event) {
                var handle = event.data;
                runIfPresent(handle);
            };

            registerImmediate = function(handle) {
                channel.port2.postMessage(handle);
            };
        }

        function installReadyStateChangeImplementation() {
            var html = doc.documentElement;
            registerImmediate = function(handle) {
                // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                var script = doc.createElement("script");
                script.onreadystatechange = function () {
                    runIfPresent(handle);
                    script.onreadystatechange = null;
                    html.removeChild(script);
                    script = null;
                };
                html.appendChild(script);
            };
        }

        function installSetTimeoutImplementation() {
            registerImmediate = function(handle) {
                setTimeout(runIfPresent, 0, handle);
            };
        }

        // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
        var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
        attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

        // Don't get fooled by e.g. browserify environments.
        if ({}.toString.call(global.process) === "[object process]") {
            // For Node.js before 0.9
            installNextTickImplementation();

        } else if (canUsePostMessage()) {
            // For non-IE10 modern browsers
            installPostMessageImplementation();

        } else if (global.MessageChannel) {
            // For web workers, where supported
            installMessageChannelImplementation();

        } else if (doc && "onreadystatechange" in doc.createElement("script")) {
            // For IE 6–8
            installReadyStateChangeImplementation();

        } else {
            // For older browsers
            installSetTimeoutImplementation();
        }

        attachTo.setImmediate = setImmediate;
        attachTo.clearImmediate = clearImmediate;
    }(typeof self === "undefined" ? typeof commonjsGlobal === "undefined" ? commonjsGlobal : commonjsGlobal : self));

    class Callbacks {
        constructor(computer, config) {
            this.computer = computer;
            this.config = config;
        }
        getComputer() {
            return this.computer;
        }
        setInterval(callback, delay) {
            setInterval(callback, delay);
        }
        setImmediate(callback) {
            // Bodge, as there's no types for 'setImmediate'
            window.setImmediate(callback); // eslint-disable-line @typescript-eslint/no-explicit-any
        }
    }
    const start = (computer, config) => {
        new Promise(function (resolve, reject) { require(['./classes-4695ed88'], resolve, reject) })
            .then(x => x.default(new Callbacks(computer, config)))
            .catch(x => console.error("Cannot load classes", x));
    };

    const colours = "0123456789abcdef";
    const splitName = (file) => {
        const lastIndex = file.lastIndexOf("/");
        if (lastIndex < 0)
            return ["", file];
        return [file.substring(0, lastIndex), file.substring(lastIndex + 1)];
    };
    const joinName = (parent, child) => parent === "" ? child : `${parent}/${child}`;
    const empty = new Int8Array(0);
    const decoder = new TextDecoder("UTF-8", { fatal: false });
    const encoder = new TextEncoder();
    class FileSystemEntry {
        constructor(persistance, path, children, contents, attributes) {
            this.exists = true;
            this.persistance = persistance;
            this.path = path;
            this.children = children;
            this.contents = contents;
            this.attributes = attributes === null ? { modification: 0, creation: 0 } : attributes;
        }
        static create(persistance, path, directory) {
            const now = Date.now();
            const instance = new FileSystemEntry(persistance, path, directory ? [] : null, directory ? null : empty, { creation: now, modification: now });
            instance.save();
            return instance;
        }
        isDirectory() {
            return this.children != null;
        }
        getChildren() {
            if (this.children === null)
                throw Error("Not a directory");
            return this.children;
        }
        setChildren(children) {
            if (this.children === null)
                throw Error("Not a directory");
            this.children = children;
            if (this.semaphore)
                this.semaphore.signal();
            this.save();
        }
        getContents() {
            if (this.contents !== null)
                return this.contents;
            if (this.children !== null)
                throw Error("Not a file");
            return this.contents = this.persistance.getContents(this.path);
        }
        getStringContents() {
            return decoder.decode(this.getContents());
        }
        setContents(contents) {
            if (this.children !== null)
                throw Error("Not a file");
            if (!this.exists)
                return { error: "File has been deleted", value: null };
            this.attributes.modification = Date.now();
            if (typeof contents === "string") {
                const encoded = encoder.encode(contents);
                this.contents = new Int8Array(encoded);
            }
            else {
                this.contents = contents instanceof Int8Array ? contents : new Int8Array(contents);
            }
            this.save();
            if (this.semaphore)
                this.semaphore.signal();
            return { value: true };
        }
        delete() {
            this.exists = false;
            if (this.children === null) {
                this.persistance.removeContents(this.path);
            }
            else {
                this.persistance.removeChildren(this.path);
            }
            if (this.semaphore)
                this.semaphore.signal();
        }
        save() {
            if (this.children !== null)
                this.persistance.setChildren(this.path, this.children);
            if (this.contents !== null)
                this.persistance.setContents(this.path, this.contents);
            this.persistance.setAttributes(this.path, this.attributes);
        }
        getSemaphore() {
            return this.semaphore || (this.semaphore = new Semaphore());
        }
        doesExist() {
            return this.exists;
        }
        getAttributes() {
            const directory = this.isDirectory();
            return Object.assign({ directory, size: directory ? 0 : this.getContents().length }, this.attributes);
        }
    }
    class ComputerAccess {
        constructor(persistance, terminal, semaphore, stateChange) {
            this.filesystem = new Map();
            this.persistance = persistance;
            this.terminal = terminal;
            this.semaphore = semaphore;
            this.stateChanged = stateChange;
            this.label = persistance.getLabel();
            const queue = [""];
            while (true) {
                const path = queue.pop();
                if (path === undefined)
                    break;
                const children = persistance.getChildren(path);
                const attributes = persistance.getAttributes(path);
                if (children !== null) {
                    this.filesystem.set(path, new FileSystemEntry(persistance, path, children, null, attributes));
                    for (const child of children)
                        queue.push(joinName(path, child));
                }
                else if (path === "") {
                    // Create a new entry
                    this.filesystem.set("", new FileSystemEntry(persistance, "", [], null, attributes));
                }
                else {
                    // Assume it's a file
                    this.filesystem.set(path, new FileSystemEntry(persistance, path, null, null, attributes));
                }
            }
        }
        getLabel() {
            return this.label;
        }
        setState(label, on) {
            if (this.label !== label) {
                this.label = label;
                this.persistance.setLabel(label);
            }
            this.stateChanged(label, on);
        }
        updateTerminal(width, height, x, y, blink, cursorColour) {
            this.terminal.resize(width, height);
            this.terminal.cursorX = x;
            this.terminal.cursorY = y;
            this.terminal.cursorBlink = blink;
            this.terminal.currentFore = colours.charAt(cursorColour);
        }
        setTerminalLine(line, text, fore, back) {
            this.terminal.text[line] = text;
            this.terminal.fore[line] = fore;
            this.terminal.back[line] = back;
        }
        setPaletteColour(colour, r, g, b) {
            this.terminal.palette[colours.charAt(colour)] =
                `rgb(${(r * 0xFF) & 0xFF},${(g * 0xFF) & 0xFF},${(b * 0xFF) & 0xFF})`;
        }
        flushTerminal() {
            this.semaphore.signal();
        }
        getEntry(path) {
            return this.filesystem.get(path) || null;
        }
        createDirectory(path) {
            const entry = this.filesystem.get(path);
            if (!entry) {
                const [parentName, fileName] = splitName(path);
                const parent = this.createDirectory(parentName);
                if (parent.value === null)
                    return parent;
                const file = FileSystemEntry.create(this.persistance, path, true);
                parent.value.setChildren([...parent.value.getChildren(), fileName]);
                this.filesystem.set(path, file);
                return { value: file };
            }
            else if (entry.isDirectory()) {
                return { value: entry };
            }
            else {
                return { error: `/${path}: File exists`, value: null };
            }
        }
        createFile(path) {
            const entry = this.filesystem.get(path);
            if (!entry) {
                const [parentName, fileName] = splitName(path);
                const parent = this.filesystem.get(parentName);
                if (parent == null || !parent.isDirectory())
                    return { error: `/${path}: Access denied`, value: null };
                const file = FileSystemEntry.create(this.persistance, path, false);
                parent.setChildren([...parent.getChildren(), fileName]);
                this.filesystem.set(path, file);
                return { value: file };
            }
            else if (entry.isDirectory()) {
                return { error: `/${path}: Cannot write to directory`, value: null };
            }
            else {
                return { value: entry };
            }
        }
        deleteEntry(path) {
            const pathEntry = this.filesystem.get(path);
            if (!pathEntry)
                return pathEntry;
            // Remove from the parent
            const [parentName, fileName] = splitName(path);
            const parent = this.filesystem.get(parentName);
            parent.setChildren(parent.getChildren().filter(x => x !== fileName));
            // And delete any children
            const queue = [path];
            while (true) {
                const file = queue.pop();
                if (file === undefined)
                    break;
                const entry = this.filesystem.get(file);
                if (!entry)
                    continue;
                this.filesystem.delete(file);
                entry.delete();
                if (!entry.isDirectory())
                    continue;
                for (const child of entry.getChildren())
                    queue.push(joinName(file, child));
            }
        }
        onEvent(listener) {
            this.queueEventHandler = listener;
        }
        onShutdown(handler) {
            this.shutdownHandler = handler;
        }
        onTurnOn(handler) {
            this.turnOnHandler = handler;
        }
        onReboot(handler) {
            this.rebootHander = handler;
        }
        queueEvent(event, args) {
            if (this.queueEventHandler !== undefined)
                this.queueEventHandler(event, args.map(x => JSON.stringify(x)));
        }
        keyDown(key, repeat) {
            const code = lwjgl2Code(key);
            if (code !== undefined)
                this.queueEvent("key", [code, repeat]);
        }
        keyUp(key) {
            const code = lwjgl2Code(key);
            if (code !== undefined)
                this.queueEvent("key_up", [code]);
        }
        turnOn() {
            if (this.turnOnHandler !== undefined)
                this.turnOnHandler();
        }
        shutdown() {
            if (this.shutdownHandler !== undefined)
                this.shutdownHandler();
        }
        reboot() {
            if (this.rebootHander !== undefined)
                this.rebootHander();
        }
    }

    var container = "styles_container__3R4Xr";
    var actionButton$1 = "styles_action-button__3ZFAe styles_action-button__16psw";
    var tinyText = "styles_tiny-text__3SBEw";
    var infoDescription = "styles_info-description__3aQgJ";
    var computerView = "styles_computer-view__2EA5B";
    var computerSplit = "styles_computer-split__1OGQq";
    var terminalView$1 = "styles_terminal-view__3lhvZ";
    var editorView = "styles_editor-view__2lZSf";
    var fileList = "styles_file-list__2p5Lj";
    var fileTree = "styles_file-tree__17k0f";
    var fileEntryHead = "styles_file-entry-head__2ywbS";
    var fileComputerControl = "styles_file-computer-control__6qvT7";
    var fileComputer = "styles_file-computer__yNwIe";
    var fileComputerActions = "styles_file-computer-actions__1lx0h";
    var active = "styles_active__s-yxC";
    var fileEntryName = "styles_file-entry-name__2C5x2";
    var fileEntryIcon = "styles_file-entry-icon__2UFG3";
    var fileDropMarker = "styles_file-drop-marker__1ufdO";
    var dragging = "styles_dragging__25aMp";
    var editorPlaceholder = "styles_editor-placeholder__24yrL";
    var infoButtons = "styles_info-buttons__1wikg";
    var dialogueOverlay = "styles_dialogue-overlay__2OpJ3";
    var dialogueBox = "styles_dialogue-box__HM3jd";
    var formGroup = "styles_form-group__mz2aw";

    let monacoVal = null;
    let unique = 0;
    const modelFactory = (m, out, contents, name) => {
        unique++; // We keep a unique id to ensure the Uri is not repeated.
        const mode = name.endsWith(".lua") ? "luax" : undefined;
        const text = m.editor.createModel(contents, mode, m.Uri.file(`f${unique.toString(16)}/${name}`));
        text.updateOptions({ trimAutoWhitespace: true });
        text.detectIndentation(true, 2);
        const model = out;
        model.resolved = true;
        model.text = text;
        model.view = null;
        return model;
    };
    const forceModel = (model) => {
        if (model.resolved)
            return model;
        const resolved = modelFactory(monacoVal, model, model.contents, model.name);
        const old = model;
        delete old.contents;
        delete old.mode;
        return resolved;
    };
    const createModel = (contents, name) => {
        if (monacoVal)
            return modelFactory(monacoVal, {}, contents, name);
        const model = {
            resolved: false, contents, name,
            promise: new Promise(function (resolve, reject) { require(['./index-3a566e0d'], resolve, reject) }).then(m => {
                monacoVal = m;
                return forceModel(model);
            }),
        };
        return model;
    };
    class Editor extends d {
        constructor() {
            super(...arguments);
            /**
             * When the window resizes, we also need to update the editor's dimensions.
             */
            this.onResize = () => { var _a; return (_a = this.editor) === null || _a === void 0 ? void 0 : _a.layout(); };
        }
        componentDidMount() {
            window.addEventListener("resize", this.onResize);
            this.setupEditor();
        }
        setupEditor() {
            if (!monacoVal) {
                const promise = this.editorPromise = new Promise(function (resolve, reject) { require(['./index-3a566e0d'], resolve, reject) })
                    .then(x => {
                    monacoVal = x;
                    if (this.editorPromise !== promise)
                        return;
                    this.setupEditor();
                })
                    .catch(err => console.error(err));
                // TODO: Actually decent handling.
                return;
            }
            this.editorPromise = undefined;
            // Clear the body of any elements
            const base = this.base;
            while (base.firstChild)
                base.firstChild.remove();
            this.editor = monacoVal.editor.create(base, {
                roundedSelection: false,
                autoIndent: "full",
            });
            this.editor.addAction({
                id: "save",
                label: "Save",
                keybindings: [
                    monacoVal.KeyMod.CtrlCmd | monacoVal.KeyCode.KEY_S,
                ],
                contextMenuGroupId: "file",
                contextMenuOrder: 1.5,
                run: editor => {
                    if (this.props.settings.trimWhitespace) {
                        editor.getAction("editor.action.trimTrailingWhitespace").run();
                    }
                    this.props.doSave(editor.getValue());
                },
            });
            this.syncOptions();
        }
        componentWillUnmount() {
            window.removeEventListener("resize", this.onResize);
            if (!this.editor)
                return;
            // Save the view state back to the model
            forceModel(this.props.model).view = this.editor.saveViewState();
            // And save the file
            this.props.doSave(this.editor.getValue());
            // We set a new session to prevent destroying it when losing the editor
            this.editor.dispose();
        }
        componentWillUpdate() {
            if (!this.editor)
                return;
            // Save the view state back to the model
            forceModel(this.props.model).view = this.editor.saveViewState();
        }
        componentDidUpdate() {
            if (!this.editor)
                return;
            this.syncOptions();
        }
        syncOptions() {
            if (!this.editor)
                return;
            // No view patterns, alas.
            const settings = this.props.settings;
            const model = forceModel(this.props.model);
            this.editor.setModel(model.text);
            if (model.view)
                this.editor.restoreViewState(model.view);
            this.editor.updateOptions({
                renderWhitespace: settings.showInvisible ? "boundary" : "none",
            });
            if (monacoVal !== null) {
                monacoVal.editor.setTheme(settings.darkMode ? "vs-dark" : "vs");
            }
            // TODO: Tab size
            if (this.props.focused)
                this.editor.focus();
        }
        render() {
            return v("div", { class: editorView }, monacoVal ? undefined : v("div", { class: editorPlaceholder }, "Loading..."));
        }
    }

    const getIcon = (name, directory, expanded) => {
        if (directory)
            return expanded ? v(DownOpen, null) : v(RightOpen, null);
        if (name.endsWith(".lua"))
            return v(Lua, null);
        return v(Text, null);
    };
    class FileEntry extends d {
        shouldComponentUpdate({ entry, depth, opened }, { expanded }) {
            return entry !== this.props.entry || depth !== this.props.depth || opened !== this.props.opened ||
                expanded !== this.state.expanded;
        }
        render({ computer, entry, name, path, depth, opened, open }, { expanded }) {
            return v("li", null,
                v("div", { class: `${fileEntryHead} ${opened === path ? active : ""}`, style: `padding-left: ${depth}em`, onClick: entry.isDirectory() ? () => this.setState({ expanded: !expanded }) : () => open(path, entry) },
                    v("span", { class: fileEntryIcon }, getIcon(name, entry.isDirectory(), expanded || false)),
                    v("span", { class: fileEntryName }, name)),
                expanded
                    ? v(FileTree, { computer: computer, entry: entry, path: path, depth: depth, opened: opened, open: open })
                    : null);
        }
    }
    class FileTree extends d {
        constructor() {
            super(...arguments);
            this.listener = () => this.setState({ children: this.props.entry.getChildren() });
        }
        shouldComponentUpdate({ entry, depth, opened }, { children }) {
            return entry !== this.props.entry || depth !== this.props.depth || children !== this.state.children ||
                opened !== this.props.opened;
        }
        render({ computer, entry, path, depth, opened, open }, { children }) {
            // Handle the case when we may have been deleted.
            if (!entry.doesExist())
                return "";
            // Gather all children, and then sort them.
            const entries = (children || entry.getChildren()).map(childName => {
                const childPath = joinName(path, childName);
                const child = computer.getEntry(childPath);
                return {
                    name: childName, dir: child.isDirectory(),
                    node: v(FileEntry, { computer: computer, entry: child, path: childPath, name: childName, depth: depth === undefined ? 0 : depth + 1, opened: opened, open: open }),
                };
            });
            entries.sort((a, b) => {
                if (a.dir !== b.dir)
                    return a.dir ? -1 : 1;
                return a.name < b.name ? -1 : 1;
            });
            return v("ul", { class: fileTree }, entries.map(x => x.node));
        }
        componentDidMount() {
            this.props.entry.getSemaphore().attach(this.listener);
        }
        componentWillUnmount() {
            this.props.entry.getSemaphore().detach(this.listener);
        }
        componentDidUpdate({ entry }) {
            if (this.props.entry !== entry) {
                this.props.entry.getSemaphore().detach(this.listener);
                entry.getSemaphore().attach(this.listener);
            }
        }
    }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    // Use a lookup table to find the index.
    const lookup = new Uint8Array(256);
    for (let i = 0; i < chars.length; i++)
        lookup[chars.charCodeAt(i)] = i;
    const encode = (buffer) => {
        const bytes = new Uint8Array(buffer);
        const len = bytes.length;
        let base64 = "";
        for (let i = 0; i < len; i += 3) {
            base64 += chars[bytes[i] >> 2];
            base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
            base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
            base64 += chars[bytes[i + 2] & 63];
        }
        if ((len % 3) === 2) {
            base64 = base64.substring(0, base64.length - 1) + "=";
        }
        else if (len % 3 === 1) {
            base64 = base64.substring(0, base64.length - 2) + "==";
        }
        return base64;
    };
    const decode = (base64) => {
        let bufferLength = base64.length * 0.75;
        const len = base64.length;
        if (base64[base64.length - 1] === "=") {
            bufferLength--;
            if (base64[base64.length - 2] === "=") {
                bufferLength--;
            }
        }
        const arraybuffer = new ArrayBuffer(bufferLength);
        const bytes = new Uint8Array(arraybuffer);
        let p = 0;
        for (let i = 0; i < len; i += 4) {
            const encoded1 = lookup[base64.charCodeAt(i)];
            const encoded2 = lookup[base64.charCodeAt(i + 1)];
            const encoded3 = lookup[base64.charCodeAt(i + 2)];
            const encoded4 = lookup[base64.charCodeAt(i + 3)];
            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }
        return arraybuffer;
    };

    let enabled = true;
    const get = (key) => {
        if (!enabled)
            return null;
        try {
            return localStorage.getItem(key);
        }
        catch (e) {
            console.error("Error reading from storage, disabling all further access.", e);
            enabled = false;
            return null;
        }
    };
    const set = (key, value) => {
        if (!enabled)
            return;
        try {
            localStorage.setItem(key, value);
        }
        catch (e) {
            console.error("Error writing to localStorage, disabling all further access.", e);
            enabled = false;
        }
    };
    const remove = (key) => {
        if (!enabled)
            return;
        try {
            localStorage.removeItem(key);
        }
        catch (e) {
            console.error("Error writing to storage, disabling all further access.", e);
            enabled = false;
        }
    };

    const empty$1 = new Int8Array(0);
    /**
     * Persistance instance which saves to storage.
     */
    class StoragePersistence {
        constructor(id) {
            this.prefix = `computer[${id}]`;
        }
        getLabel() {
            return get(`${this.prefix}.label`);
        }
        setLabel(label) {
            if (label === null) {
                remove(`${this.prefix}.label`);
            }
            else {
                set(`${this.prefix}.label`, label);
            }
        }
        getContents(path) {
            const contents = get(`${this.prefix}.files[${path}].b64`);
            return contents ? new Int8Array(decode(contents)) : empty$1;
        }
        setContents(path, contents) {
            set(`${this.prefix}.files[${path}].b64`, encode(contents));
        }
        removeContents(path) {
            remove(`${this.prefix}.files[${path}].b64`);
        }
        getChildren(path) {
            const children = get(`${this.prefix}.files[${path}].children`);
            if (children === null)
                return null;
            try {
                return JSON.parse(children);
            }
            catch (e) {
                console.error(`Error loading path "${path}"`);
                return null;
            }
        }
        setChildren(path, children) {
            set(`${this.prefix}.files[${path}].children`, JSON.stringify(children));
        }
        removeChildren(path) {
            remove(`${this.prefix}.files[${path}].children`);
        }
        getAttributes(path) {
            const attributes = get(`${this.prefix}.files[${path}].attributes`);
            if (attributes === null)
                return null;
            try {
                return JSON.parse(attributes);
            }
            catch (e) {
                console.error(`Error loading attributes for "${path}"`);
                return null;
            }
        }
        setAttributes(path, attr) {
            set(`${this.prefix}.files[${path}].attributes`, JSON.stringify(attr));
        }
        removeAttributes(path) {
            remove(`${this.prefix}.files[${path}].attributes`);
        }
    }

    var __awaiter$1 = (window && window.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    const createZip = (computer) => __awaiter$1(void 0, void 0, void 0, function* () {
        const zip = yield newZip();
        const queue = [""];
        while (true) {
            const path = queue.pop();
            if (path === undefined)
                break;
            const entry = computer.getEntry(path);
            if (!entry)
                continue;
            if (entry.isDirectory()) {
                if (path !== "")
                    zip.folder(path);
                for (const child of entry.getChildren())
                    queue.push(joinName(path, child));
            }
            else {
                zip.file(path, entry.getContents());
            }
        }
        return zip.generateAsync({ type: "blob" });
    });
    /**
     * Determine if this is a simple archive - namely every child within it occurs
     * within a directory with the same name as the archive.
     * @param zip The zip to check.
     * @param name The zip file's name, without the `.zip` extension.
     * @return If this is a simple archive.
     */
    const isSimpleZip = (zip, name) => {
        for (const fileName in zip.files) {
            if (!Object.prototype.hasOwnProperty.call(zip.files, fileName))
                continue;
            // Require every child to be in the ${name} directory.
            if (!fileName.startsWith(name + "/"))
                return false;
        }
        return true;
    };
    class Computer extends d {
        constructor(props, context) {
            var _a;
            super(props, context);
            this.openFile = (path, file) => {
                if (file.isDirectory())
                    return;
                let entry = this.state.openFiles.get(file);
                if (typeof entry === "undefined") {
                    const model = createModel(file.getStringContents(), path);
                    const monitor = () => {
                        if (!file.doesExist()) {
                            // If the file has been deleted, dispose the model and remove from the cache.
                            if (model.resolved)
                                model.text.dispose();
                            file.getSemaphore().detach(monitor);
                            this.state.openFiles.delete(file);
                        }
                    };
                    entry = { model, monitor };
                    this.state.openFiles.set(file, entry);
                    file.getSemaphore().attach(monitor);
                }
                else {
                    // Update the contents from the file. Note, this may mess up the view a little - we'll have to cope.
                    const model = entry.model;
                    const contents = file.getStringContents();
                    if (model.resolved) {
                        if (contents !== model.text.getValue())
                            model.text.setValue(contents);
                    }
                    else {
                        model.contents = contents;
                    }
                }
                this.setState({ activeFile: { file, path, model: entry.model } });
            };
            this.openComputer = () => {
                this.setState({ activeFile: null });
            };
            this.saveZip = (e) => {
                e.preventDefault();
                e.stopPropagation();
                createZip(this.state.computer)
                    .then(x => saveBlob("computer", "zip", x))
                    .catch(err => console.error(err));
            };
            this.startDrag = (e) => {
                e.preventDefault();
                if (!this.state.dragging)
                    this.setState({ dragging: true });
            };
            this.stopDrag = () => {
                this.setState({ dragging: false });
            };
            this.dropFile = (e) => {
                e.preventDefault();
                this.setState({ dragging: false });
                if (!e.dataTransfer)
                    return;
                if (e.dataTransfer.items) {
                    const items = e.dataTransfer.items;
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];
                        if (item.kind === "file")
                            this.addFile(item.getAsFile());
                    }
                }
                else {
                    const files = e.dataTransfer.files;
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < files.length; i++)
                        this.addFile(files[i]);
                }
            };
            const terminal = new TerminalData();
            const terminalChanged = new Semaphore();
            const computer = new ComputerAccess( new StoragePersistence(0), terminal, terminalChanged, (label, on) => this.setState({ label, on }));
            // Create a startup file if specified.
            for (const field of window.location.search.substring(1).split("&")) {
                const [key, value] = field.split("=");
                if (key !== "startup")
                    continue;
                let contents;
                try {
                    contents = atob(value);
                }
                catch (e) {
                    console.error(e);
                    break;
                }
                contents = contents
                    .replace(/(\\|\n|")/g, "\\$1")
                    .replace("\r", "\\r").replace("\0", "\\0");
                // We create a startup script which deletes itself, and then runs the
                // original program. This allows it to be invisible, even in the event
                // of syntax errors.
                (_a = computer.createFile("startup.lua").value) === null || _a === void 0 ? void 0 : _a.setContents(`
fs.delete("startup.lua")
local fn, err = load("${contents}", "@startup.lua", nil, _ENV)
if not fn then error(err, 0) end
fn()`);
            }
            this.setState({
                terminal, terminalChanged, computer,
                activeFile: null, openFiles: new Map(),
                id: 0, on: false, label: computer.getLabel(),
                dragging: false,
            });
        }
        componentDidMount() {
            start(this.state.computer, this.props.computerSettings);
        }
        componentWillUnmount() {
            this.state.computer.shutdown();
            for (const [file, { model, monitor }] of this.state.openFiles) {
                if (model.resolved)
                    model.text.dispose();
                file.getSemaphore().detach(monitor);
            }
        }
        shouldComponentUpdate({ focused, settings }, { id, label, on, activeFile, dragging }) {
            return focused !== this.props.focused || settings !== this.props.settings ||
                id !== this.state.id || label !== this.state.label || on !== this.state.on ||
                activeFile !== this.state.activeFile || dragging !== this.state.dragging;
        }
        render({ settings, focused }, { terminal, terminalChanged, computer, activeFile, id, label, on, dragging: dragging$1 }) {
            return v("div", { class: computerView },
                v("div", { class: computerSplit },
                    v("div", { class: `${fileList} ${dragging$1 ? dragging : ""}`, onDragOver: this.startDrag, onDragLeave: this.stopDrag, onDrop: this.dropFile },
                        v("div", { class: fileComputerControl },
                            v("div", { class: `${fileComputer} ${activeFile == null ? active : ""}`, onClick: this.openComputer }, id ? `Computer #${id}` : "Computer"),
                            v("div", { class: fileComputerActions },
                                v("button", { class: actionButton$1, type: "button", onClick: this.saveZip, title: "Download all files as a zip" },
                                    v(Download, null)))),
                        v(FileTree, { computer: computer, entry: computer.getEntry(""), path: "", opened: activeFile === null ? null : activeFile.path, open: this.openFile }),
                        v("div", { class: fileDropMarker },
                            v("span", null, "Upload to your computer!"))),
                    activeFile == null
                        ? v("div", { class: terminalView$1 },
                            v(Terminal, { terminal: terminal, changed: terminalChanged, focused: focused, computer: computer, font: settings.terminalFont, id: id, label: label, on: on }))
                        : v(Editor, { model: activeFile.model, settings: settings, focused: focused, doSave: contents => activeFile.file.setContents(contents) })));
        }
        addOneFile(name, contents) {
            const index = name.lastIndexOf(".");
            const prefix = index > 0 ? name.substring(0, index) : name;
            const suffix = index > 0 ? name.substring(index) : "";
            // Add a number until we find a unique file. Or just give up at 100.
            const computer = this.state.computer;
            for (let i = 0; i < 100; i++) {
                const uniqueName = i === 0 ? name : `${prefix}.${i}${suffix}`;
                if (computer.getEntry(uniqueName))
                    continue;
                const result = this.state.computer.createFile(uniqueName);
                if (!result.value)
                    continue;
                result.value.setContents(contents);
                return;
            }
            console.warn(`Cannot write contents of ${name}.`);
        }
        addFile(file) {
            if (file.name.endsWith(".zip")) {
                // We attempt to unpack a zip file into a folder with the same name.
                newZip()
                    .then((zip) => __awaiter$1(this, void 0, void 0, function* () {
                    yield zip.loadAsync(file);
                    const computer = this.state.computer;
                    const zipName = file.name.substring(0, file.name.length - 4);
                    let dirName;
                    for (let i = 0; i < 100; i++) {
                        dirName = i === 0 ? zipName : `${zipName}.${i}`;
                        if (computer.getEntry(dirName))
                            continue;
                        const result = this.state.computer.createDirectory(dirName);
                        if (result.value)
                            break;
                    }
                    const offset = isSimpleZip(zip, zipName) ? zipName.length + 1 : 0;
                    for (const fileName in zip.files) {
                        if (!Object.prototype.hasOwnProperty.call(zip.files, fileName) || fileName.length === offset)
                            continue;
                        let fullName = `${dirName}/${fileName.substr(offset)}`;
                        const entry = zip.files[fileName];
                        if (entry.dir) {
                            if (fullName.endsWith("/"))
                                fullName = fullName.substring(0, fullName.length - 1);
                            if (!computer.createDirectory(fullName))
                                console.warn(`Cannot create directory ${fullName}.`);
                        }
                        else {
                            this.addOneFile(fullName, yield entry.async("arraybuffer"));
                        }
                    }
                }))
                    .catch(e => console.error(e));
            }
            else {
                const reader = new FileReader();
                reader.onload = () => this.addOneFile(file.name, reader.result);
                reader.readAsArrayBuffer(file);
            }
        }
    }

    const githubLink = v("div", { class: infoDescription },
        v("p", null,
            "Think you've found a bug? Have a suggestion? Why not put it on ",
            v("a", { href: "https://github.com/SquidDev-CC/", title: "The GitHub repository" }, "the GitHub repo"),
            "?"));
    const About = () => v("div", { class: dialogueBox },
        v("h2", null, "About"),
        v("p", null,
            "Copy Cat is a web emulator for the popular Minecraft mod ",
            v("a", { href: "https://github.com/SquidDev-CC/CC-Tweaked", target: "_blank", title: "CC: Tweaked's source code" }, "CC: Tweaked"),
            " (based on ComputerCraft by Dan200). Here you can play with a ComputerCraft computer, write and test programs and experiment to your heart's desire, without having to leave your browser!"),
        v("p", null,
            "However, due to the limitations of Javascript, some functionality may not be 100% accurate (most notably, that to do with HTTP and filesystems). For even closer emulation, I'd recommend ",
            v("a", { href: "https://emux.cc/", target: "_blank", title: "The CCEmuX emulator" }, "CCEmuX"),
            "."),
        v("p", null,
            "If you need help writing a program, I'd recommend checking out the ",
            v("a", { href: "https://forums.computercraft.cc/", target: "_blank", title: "The CC: Tweaked forums" }, "CC: Tweaked"),
            " or ",
            v("a", { href: "http://www.computercraft.info/forums2/", title: "The ComputerCraft forums", target: "_blank" }, "ComputerCraft"),
            " forums. ",
            v("a", { href: "http://www.computercraft.info/wiki/Main_Page", target: "_blank", title: "The CC: Tweaked wiki" }, "The CC: Tweaked wiki"),
            " may also be a good source of documentation."),
        v("p", null,
            "Of course, this emulator is sure to have lots of bugs and missing features. If you've found a problem, why not put it on ",
            v("strong", null,
                v("a", { href: "https://github.com/SquidDev-CC/copy-cat/issues", title: "The Copy Cat GitHub issue tracker" }, "the GitHub repo")),
            "?"),
        v("h3", null, "Credits"),
        v("p", null, "Copy Cat would not be possible without the help of several Open Source projects."),
        v("ul", null,
            v("li", null,
                v("a", { href: "https://github.com/konsoletyper/teavm", target: "_blank" }, "TeaVM"),
                ": Apache 2.0"),
            v("li", null,
                v("a", { href: "https://github.com/google/guava", target: "_blank" }, "Google Guava"),
                ": Apache 2.0"),
            v("li", null,
                v("a", { href: "https://github.com/apache/commons-lang", target: "_blank" }, "Apache Commons Lang"),
                ": Apache 2.0, Copyright 2001-2018 The Apache Software Foundation"),
            v("li", null,
                v("a", { href: "https://github.com/SquidDev/Cobalt", target: "_blank" }, "Cobalt/LuaJ"),
                ": MIT, Copyright (c) 2009-2011 Luaj.org. All rights reserved., modifications Copyright (c) 2015-2016 SquidDev"),
            v("li", null,
                v("a", { href: "https://github.com/SquidDev-CC/CC-Tweaked", target: "_blank" }, "CC: Tweaked"),
                ": ComputerCraft Public License"),
            v("li", null,
                v("a", { href: "https://github.com/FortAwesome/Font-Awesome/", target: "_blank" }, "Font Awesome"),
                ": CC BY 4.0"),
            v("li", null,
                "Numerous Javascript libraries. A full list can be found ",
                v("a", { href: "assets/dependencies.txt", target: "_blank" }, "in the dependencies list"),
                " or at the top of any Javascript file.")),
        v("pre", null, `This product includes software developed by Alexey Andreev (http://teavm.org).

This product includes software developed by The Apache Software Foundation (http://www.apache.org/).

This product includes software developed by Joda.org (http://www.joda.org/).`));

    /**
     * The persisted map for settings
     */
    class SettingStore {
        constructor() {
            this.data = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
            const settingJson = get("settings");
            if (settingJson !== null) {
                try {
                    this.data = JSON.parse(settingJson);
                }
                catch (e) {
                    console.error("Cannot read settings", e);
                }
            }
        }
        /** Get the value of a config property under the current storage */
        get(property) {
            return property.id in this.data ? this.data[property.id] : property.def;
        }
        /** Set a value and fire any callbacks */
        set(property, value) {
            if (this.get(property) === value)
                return;
            this.data[property.id] = value;
            property.changed(value);
            set("settings", JSON.stringify(this.data));
        }
    }
    class ConfigGroup {
        constructor(name, description, store) {
            this.properties = [];
            this.name = name;
            this.description = description;
            this.store = store;
        }
        add(property) {
            this.properties.push(property); // FIXME: Work out an appropriate cast.
            const value = this.store.get(property);
            if (value !== property.def)
                property.changed(value);
            return property;
        }
        addString(id, name, def, description, changed) {
            return this.add({ type: "string", id, name, description, def, changed });
        }
        addBoolean(id, name, def, description, changed) {
            return this.add({ type: "boolean", id, name, description, def, changed });
        }
        addOption(id, name, def, choices, description, changed) {
            return this.add({ type: "option", id, name, description, choices, def, changed });
        }
        addInt(id, name, def, min, max, description, changed) {
            return this.add({ type: "int", id, name, description, def, min, max, changed });
        }
    }
    function getUpdater(store, property, extract) {
        return e => {
            const value = extract(e.target);
            if (value !== undefined)
                store.set(property, value);
        };
    }
    const getString = (x) => x.value;
    const getNumber = (x) => {
        const v = parseInt(x.value, 10);
        return Number.isNaN(v) ? undefined : v;
    };
    const getBool = (x) => x.checked;
    const getOption = (def, choices) => (x) => {
        for (const { key } of choices) {
            if (key === x.value)
                return key;
        }
        return def;
    };
    const Settings = ({ store, configGroups }) => v("div", { class: dialogueBox },
        v("h2", null, "Settings"),
        configGroups.map(({ name, description, properties }) => [
            v("h3", null, name),
            description ? v("p", { class: tinyText }, description) : null,
            v("div", { class: formGroup }, properties.map(property => {
                switch (property.type) {
                    case "string":
                        return v("label", null,
                            property.name,
                            v("input", { type: "text", value: store.get(property), onChange: getUpdater(store, property, getString) }),
                            v("p", { class: tinyText }, property.description));
                    case "int":
                        return v("label", null,
                            property.name,
                            v("input", { type: "number", value: store.get(property), min: property.min, max: property.max, step: 1, onChange: getUpdater(store, property, getNumber) }),
                            v("p", { class: tinyText }, property.description));
                    case "boolean":
                        return v("label", null,
                            v("input", { type: "checkbox", checked: store.get(property), onInput: getUpdater(store, property, getBool) }),
                            property.name,
                            v("p", { class: tinyText }, property.description));
                    case "option":
                        return v("label", null,
                            property.name,
                            v("select", { value: store.get(property), onInput: getUpdater(store, property, getOption(property.def, property.choices)) }, property.choices.map(({ key, value }) => v("option", { value: key }, value))),
                            v("p", { class: tinyText }, property.description));
                }
            })),
        ]));

    const termFont = "term_font-7d20694439125422.png";

    const termFontHd = "term_font_hd-0506b6efe5f7feae.png";

    class Main extends d {
        constructor(props, context) {
            super(props, context);
            this.openSettings = () => {
                this.setState({
                    dialogue: ({ settingStorage, configGroups }) => v(Settings, { store: settingStorage, configGroups: configGroups }),
                });
            };
            this.closeDialogueClick = (e) => {
                if (e.target === e.currentTarget)
                    this.setState({ dialogue: undefined });
            };
            this.computerVDom = ({ settings, dialogue }) => {
                return v(Computer, { settings: settings, focused: dialogue === undefined, computerSettings: this.configFactory });
            };
            this.configFactory = (name, description) => {
                const existing = this.state.configGroups.find(x => x.name === name);
                if (existing) {
                    if (existing.description !== description) {
                        console.warn(`Different descriptions for ${name} ("${description}" and "${existing.description}")`);
                    }
                    return existing;
                }
                const group = new ConfigGroup(name, description, this.state.settingStorage);
                this.setState(s => ({ configGroups: [...s.configGroups, group] }));
                return group;
            };
        }
        componentWillMount() {
            const settingStorage = new SettingStore();
            const configEditor = new ConfigGroup("Editor", "Configure the built-in eidtor", settingStorage);
            const configTerminal = new ConfigGroup("Terminal", "Configure the terminal display", settingStorage);
            const configGroups = [configEditor, configTerminal];
            const state = {
                settingStorage, configGroups,
                settings: {
                    showInvisible: true, trimWhitespace: true, darkMode: false,
                    terminalFont: termFont,
                },
                currentVDom: this.computerVDom,
            };
            this.setState(state);
            // Declare our settings
            configEditor.addBoolean("editor.invisible", "Show invisible", state.settings.showInvisible, "Show invisible characters, such as spaces and tabs.", x => this.setState(s => ({ settings: Object.assign(Object.assign({}, s.settings), { showInvisible: x }) })));
            configEditor.addBoolean("editor.trim_whitespace", "Trim whitespace", state.settings.trimWhitespace, "Trim whitespace from files when saving.", x => this.setState(s => ({ settings: Object.assign(Object.assign({}, s.settings), { trimWhitespace: x }) })));
            configEditor.addBoolean("editor.dark", "Dark mode", state.settings.darkMode, "Only the editor currently, sorry.", x => this.setState(s => ({ settings: Object.assign(Object.assign({}, s.settings), { darkMode: x }) })));
            const fonts = {
                "standard": termFont,
                "hd": termFontHd,
                // Add some fallbacks for previous versions.
                [termFontHd]: termFontHd, "term_font_hd.png": termFontHd,
                [termFont]: termFont, "term_font.png": termFont
            };
            configTerminal.addOption("terminal.font", "Font", state.settings.terminalFont, [
                { key: "standard", value: "Standard font" },
                { key: "hd", value: "High-definition font" },
            ], "Which font the we should use within the terminal", x => this.setState(s => ({ settings: Object.assign(Object.assign({}, s.settings), { terminalFont: fonts[x] || termFontHd }) })));
        }
        shouldComponentUpdate(_, newState) {
            return this.state.currentVDom !== newState.currentVDom ||
                this.state.dialogue !== newState.dialogue ||
                this.state.settings !== newState.settings;
        }
        render(_, state) {
            return v("div", { class: container },
                state.currentVDom(state),
                v("div", { class: infoButtons },
                    v("button", { class: actionButton$1, title: "Configure how the emulator behaves", type: "button", onClick: this.openSettings },
                        v(Cog, null)),
                    v("button", { class: actionButton$1, title: "Find out more about the emulator", type: "button", onClick: () => this.setState({ dialogue: () => v(About, null) }) },
                        v(Info, null))),
                state.dialogue ?
                    v("div", { class: dialogueOverlay, onClick: this.closeDialogueClick }, state.dialogue(state)) : "");
        }
    }
    const main = () => {
        // Start the window!
        const page = document.getElementById("page");
        M(v(Main, null), page, page.lastElementChild || undefined);
    };

    exports.commonjsGlobal = commonjsGlobal;
    exports.createCommonjsModule = createCommonjsModule;
    exports.main = main;

});
