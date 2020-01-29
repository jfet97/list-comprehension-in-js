/*!
 * 
 *   list-comprehension-in-js v0.0.12
 *   https://github.com/jfet97/list-comprehension-in-js
 * 
 *   Copyright (c) Andrea Simone Costa (https://github.com/jfet97)
 * 
 *   This source code is licensed under the MIT license found in the
 *   LICENSE file in the root directory of this source tree.
 * 
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["list-comprehension-in-js"]=t():e["list-comprehension-in-js"]=t()}(this,(function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=3)}({3:function(e,t,r){"use strict";function n(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:[],t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:0;if("number"!=typeof r||"number"!=typeof t)throw TypeError("The 'start' and the 'nOfElements' actual parameters must be numbers");var n=[];if(0<=r&&0<t){var o=0,u=!0,i=!1,f=void 0;try{for(var l,a,c=e[Symbol.iterator]();!(u=(l=c.next()).done)&&(a=l.value,o!=r+t);u=!0)o>=r&&n.push(a),o++}catch(e){i=!0,f=e}finally{try{u||null==c.return||c.return()}finally{if(i)throw f}}}return n}r.r(t),r.d(t,"take",(function(){return n}))}})}));