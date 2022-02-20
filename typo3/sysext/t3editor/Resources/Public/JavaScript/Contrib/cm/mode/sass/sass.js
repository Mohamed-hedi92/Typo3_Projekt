!function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../css/css")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../css/css"],e):e(CodeMirror)}((function(e){"use strict";e.defineMode("sass",(function(r){var t=e.mimeModes["text/css"],n=t.propertyKeywords||{},o=t.colorKeywords||{},i=t.valueKeywords||{},a=t.fontProperties||{};var u,s=new RegExp("^"+["true","false","null","auto"].join("|")),f=new RegExp("^"+["\\(","\\)","=",">","<","==",">=","<=","\\+","-","\\!=","/","\\*","%","and","or","not",";","\\{","\\}",":"].join("|")),c=/^::?[a-zA-Z_][\w\-]*/;function p(e){return!e.peek()||e.match(/\s+$/,!1)}function l(e,r){var t=e.peek();return")"===t?(e.next(),r.tokenizer=x,"operator"):"("===t?(e.next(),e.eatSpace(),"operator"):"'"===t||'"'===t?(r.tokenizer=m(e.next()),"string"):(r.tokenizer=m(")",!1),"string")}function h(e,r){return function(t,n){return t.sol()&&t.indentation()<=e?(n.tokenizer=x,x(t,n)):(r&&t.skipTo("*/")?(t.next(),t.next(),n.tokenizer=x):t.skipToEnd(),"comment")}}function m(e,r){return null==r&&(r=!0),function t(n,o){var i=n.next(),a=n.peek(),u=n.string.charAt(n.pos-2);return"\\"!==i&&a===e||i===e&&"\\"!==u?(i!==e&&r&&n.next(),p(n)&&(o.cursorHalf=0),o.tokenizer=x,"string"):"#"===i&&"{"===a?(o.tokenizer=d(t),n.next(),"operator"):"string"}}function d(e){return function(r,t){return"}"===r.peek()?(r.next(),t.tokenizer=e,"operator"):x(r,t)}}function k(e){if(0==e.indentCount){e.indentCount++;var t=e.scopes[0].offset+r.indentUnit;e.scopes.unshift({offset:t})}}function w(e){1!=e.scopes.length&&e.scopes.shift()}function x(e,r){var t=e.peek();if(e.match("/*"))return r.tokenizer=h(e.indentation(),!0),r.tokenizer(e,r);if(e.match("//"))return r.tokenizer=h(e.indentation(),!1),r.tokenizer(e,r);if(e.match("#{"))return r.tokenizer=d(x),"operator";if('"'===t||"'"===t)return e.next(),r.tokenizer=m(t),"string";if(r.cursorHalf){if("#"===t&&(e.next(),e.match(/[0-9a-fA-F]{6}|[0-9a-fA-F]{3}/)))return p(e)&&(r.cursorHalf=0),"number";if(e.match(/^-?[0-9\.]+/))return p(e)&&(r.cursorHalf=0),"number";if(e.match(/^(px|em|in)\b/))return p(e)&&(r.cursorHalf=0),"unit";if(e.match(s))return p(e)&&(r.cursorHalf=0),"keyword";if(e.match(/^url/)&&"("===e.peek())return r.tokenizer=l,p(e)&&(r.cursorHalf=0),"atom";if("$"===t)return e.next(),e.eatWhile(/[\w-]/),p(e)&&(r.cursorHalf=0),"variable-2";if("!"===t)return e.next(),r.cursorHalf=0,e.match(/^[\w]+/)?"keyword":"operator";if(e.match(f))return p(e)&&(r.cursorHalf=0),"operator";if(e.eatWhile(/[\w-]/))return p(e)&&(r.cursorHalf=0),u=e.current().toLowerCase(),i.hasOwnProperty(u)?"atom":o.hasOwnProperty(u)?"keyword":n.hasOwnProperty(u)?(r.prevProp=e.current().toLowerCase(),"property"):"tag";if(p(e))return r.cursorHalf=0,null}else{if("-"===t&&e.match(/^-\w+-/))return"meta";if("."===t){if(e.next(),e.match(/^[\w-]+/))return k(r),"qualifier";if("#"===e.peek())return k(r),"tag"}if("#"===t){if(e.next(),e.match(/^[\w-]+/))return k(r),"builtin";if("#"===e.peek())return k(r),"tag"}if("$"===t)return e.next(),e.eatWhile(/[\w-]/),"variable-2";if(e.match(/^-?[0-9\.]+/))return"number";if(e.match(/^(px|em|in)\b/))return"unit";if(e.match(s))return"keyword";if(e.match(/^url/)&&"("===e.peek())return r.tokenizer=l,"atom";if("="===t&&e.match(/^=[\w-]+/))return k(r),"meta";if("+"===t&&e.match(/^\+[\w-]+/))return"variable-3";if("@"===t&&e.match(/@extend/)&&(e.match(/\s*[\w]/)||w(r)),e.match(/^@(else if|if|media|else|for|each|while|mixin|function)/))return k(r),"def";if("@"===t)return e.next(),e.eatWhile(/[\w-]/),"def";if(e.eatWhile(/[\w-]/)){if(e.match(/ *: *[\w-\+\$#!\("']/,!1)){u=e.current().toLowerCase();var y=r.prevProp+"-"+u;return n.hasOwnProperty(y)?"property":n.hasOwnProperty(u)?(r.prevProp=u,"property"):a.hasOwnProperty(u)?"property":"tag"}return e.match(/ *:/,!1)?(k(r),r.cursorHalf=1,r.prevProp=e.current().toLowerCase(),"property"):(e.match(/ *,/,!1)||k(r),"tag")}if(":"===t)return e.match(c)?"variable-3":(e.next(),r.cursorHalf=1,"operator")}return e.match(f)?"operator":(e.next(),null)}return{startState:function(){return{tokenizer:x,scopes:[{offset:0,type:"sass"}],indentCount:0,cursorHalf:0,definedVars:[],definedMixins:[]}},token:function(e,t){var n=function(e,t){e.sol()&&(t.indentCount=0);var n=t.tokenizer(e,t),o=e.current();if("@return"!==o&&"}"!==o||w(t),null!==n){for(var i=e.pos-o.length+r.indentUnit*t.indentCount,a=[],u=0;u<t.scopes.length;u++){var s=t.scopes[u];s.offset<=i&&a.push(s)}t.scopes=a}return n}(e,t);return t.lastToken={style:n,content:e.current()},n},indent:function(e){return e.scopes[0].offset}}}),"css"),e.defineMIME("text/x-sass","sass")}));