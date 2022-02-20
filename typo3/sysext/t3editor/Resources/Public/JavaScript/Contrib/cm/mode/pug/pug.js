!function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../javascript/javascript"),require("../css/css"),require("../htmlmixed/htmlmixed")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../javascript/javascript","../css/css","../htmlmixed/htmlmixed"],t):t(CodeMirror)}((function(t){"use strict";t.defineMode("pug",(function(e){var n="keyword",i={"{":"}","(":")","[":"]"},r=t.getMode(e,"javascript");function a(){this.javaScriptLine=!1,this.javaScriptLineExcludesColon=!1,this.javaScriptArguments=!1,this.javaScriptArgumentsDepth=0,this.isInterpolating=!1,this.interpolationNesting=0,this.jsState=t.startState(r),this.restOfLine="",this.isIncludeFiltered=!1,this.isEach=!1,this.lastTag="",this.scriptType="",this.isAttrs=!1,this.attrsNest=[],this.inAttributeName=!0,this.attributeIsType=!1,this.attrValue="",this.indentOf=1/0,this.indentToken="",this.innerMode=null,this.innerState=null,this.innerModeForLine=!1}function s(t,e){if(t.match("#{"))return e.isInterpolating=!0,e.interpolationNesting=0,"punctuation"}function c(n,i){var r;if(n.match(/^:([\w\-]+)/))return e&&e.innerModes&&(r=e.innerModes(n.current().substring(1))),r||(r=n.current().substring(1)),"string"==typeof r&&(r=t.getMode(e,r)),u(n,i,r),"atom"}function u(n,i,r){r=t.mimeModes[r]||r,r=e.innerModes&&e.innerModes(r)||r,r=t.mimeModes[r]||r,r=t.getMode(e,r),i.indentOf=n.indentation(),r&&"null"!==r.name?i.innerMode=r:i.indentToken="string"}function o(e,n,i){if(e.indentation()>n.indentOf||n.innerModeForLine&&!e.sol()||i)return n.innerMode?(n.innerState||(n.innerState=n.innerMode.startState?t.startState(n.innerMode,e.indentation()):{}),e.hideFirstChars(n.indentOf+2,(function(){return n.innerMode.token(e,n.innerState)||!0}))):(e.skipToEnd(),n.indentToken);e.sol()&&(n.indentOf=1/0,n.indentToken=null,n.innerMode=null,n.innerState=null)}return a.prototype.copy=function(){var e=new a;return e.javaScriptLine=this.javaScriptLine,e.javaScriptLineExcludesColon=this.javaScriptLineExcludesColon,e.javaScriptArguments=this.javaScriptArguments,e.javaScriptArgumentsDepth=this.javaScriptArgumentsDepth,e.isInterpolating=this.isInterpolating,e.interpolationNesting=this.interpolationNesting,e.jsState=t.copyState(r,this.jsState),e.innerMode=this.innerMode,this.innerMode&&this.innerState&&(e.innerState=t.copyState(this.innerMode,this.innerState)),e.restOfLine=this.restOfLine,e.isIncludeFiltered=this.isIncludeFiltered,e.isEach=this.isEach,e.lastTag=this.lastTag,e.scriptType=this.scriptType,e.isAttrs=this.isAttrs,e.attrsNest=this.attrsNest.slice(),e.inAttributeName=this.inAttributeName,e.attributeIsType=this.attributeIsType,e.attrValue=this.attrValue,e.indentOf=this.indentOf,e.indentToken=this.indentToken,e.innerModeForLine=this.innerModeForLine,e},{startState:function(){return new a},copyState:function(t){return t.copy()},token:function(e,a){var p=o(e,a)||function(t,e){if(t.sol()&&(e.restOfLine=""),e.restOfLine){t.skipToEnd();var n=e.restOfLine;return e.restOfLine="",n}}(e,a)||function(t,e){if(e.isInterpolating){if("}"===t.peek()){if(e.interpolationNesting--,e.interpolationNesting<0)return t.next(),e.isInterpolating=!1,"punctuation"}else"{"===t.peek()&&e.interpolationNesting++;return r.token(t,e.jsState)||!0}}(e,a)||function(t,e){if(e.isIncludeFiltered){var n=c(t,e);return e.isIncludeFiltered=!1,e.restOfLine="string",n}}(e,a)||function(t,e){if(e.isEach){if(t.match(/^ in\b/))return e.javaScriptLine=!0,e.isEach=!1,n;if(t.sol()||t.eol())e.isEach=!1;else if(t.next()){for(;!t.match(/^ in\b/,!1)&&t.next(););return"variable"}}}(e,a)||function e(n,a){if(a.isAttrs){if(i[n.peek()]&&a.attrsNest.push(i[n.peek()]),a.attrsNest[a.attrsNest.length-1]===n.peek())a.attrsNest.pop();else if(n.eat(")"))return a.isAttrs=!1,"punctuation";if(a.inAttributeName&&n.match(/^[^=,\)!]+/))return"="!==n.peek()&&"!"!==n.peek()||(a.inAttributeName=!1,a.jsState=t.startState(r),"script"===a.lastTag&&"type"===n.current().trim().toLowerCase()?a.attributeIsType=!0:a.attributeIsType=!1),"attribute";var s=r.token(n,a.jsState);if(a.attributeIsType&&"string"===s&&(a.scriptType=n.current().toString()),0===a.attrsNest.length&&("string"===s||"variable"===s||"keyword"===s))try{return Function("","var x "+a.attrValue.replace(/,\s*$/,"").replace(/^!/,"")),a.inAttributeName=!0,a.attrValue="",n.backUp(n.current().length),e(n,a)}catch(t){}return a.attrValue+=n.current(),s||!0}}(e,a)||function(t,e){if(t.sol()&&(e.javaScriptLine=!1,e.javaScriptLineExcludesColon=!1),e.javaScriptLine){if(e.javaScriptLineExcludesColon&&":"===t.peek())return e.javaScriptLine=!1,void(e.javaScriptLineExcludesColon=!1);var n=r.token(t,e.jsState);return t.eol()&&(e.javaScriptLine=!1),n||!0}}(e,a)||function(t,e){if(e.javaScriptArguments)return 0===e.javaScriptArgumentsDepth&&"("!==t.peek()?void(e.javaScriptArguments=!1):("("===t.peek()?e.javaScriptArgumentsDepth++:")"===t.peek()&&e.javaScriptArgumentsDepth--,0===e.javaScriptArgumentsDepth?void(e.javaScriptArguments=!1):r.token(t,e.jsState)||!0)}(e,a)||function(t,e){if(e.mixinCallAfter)return e.mixinCallAfter=!1,t.match(/^\( *[-\w]+ *=/,!1)||(e.javaScriptArguments=!0,e.javaScriptArgumentsDepth=0),!0}(e,a)||function(t){if(t.match(/^yield\b/))return"keyword"}(e)||function(t){if(t.match(/^(?:doctype) *([^\n]+)?/))return"meta"}(e)||s(e,a)||function(t,e){if(t.match(/^case\b/))return e.javaScriptLine=!0,n}(e,a)||function(t,e){if(t.match(/^when\b/))return e.javaScriptLine=!0,e.javaScriptLineExcludesColon=!0,n}(e,a)||function(t){if(t.match(/^default\b/))return n}(e)||function(t,e){if(t.match(/^extends?\b/))return e.restOfLine="string",n}(e,a)||function(t,e){if(t.match(/^append\b/))return e.restOfLine="variable",n}(e,a)||function(t,e){if(t.match(/^prepend\b/))return e.restOfLine="variable",n}(e,a)||function(t,e){if(t.match(/^block\b *(?:(prepend|append)\b)?/))return e.restOfLine="variable",n}(e,a)||function(t,e){if(t.match(/^include\b/))return e.restOfLine="string",n}(e,a)||function(t,e){if(t.match(/^include:([a-zA-Z0-9\-]+)/,!1)&&t.match("include"))return e.isIncludeFiltered=!0,n}(e,a)||function(t,e){if(t.match(/^mixin\b/))return e.javaScriptLine=!0,n}(e,a)||function(t,e){return t.match(/^\+([-\w]+)/)?(t.match(/^\( *[-\w]+ *=/,!1)||(e.javaScriptArguments=!0,e.javaScriptArgumentsDepth=0),"variable"):t.match(/^\+#{/,!1)?(t.next(),e.mixinCallAfter=!0,s(t,e)):void 0}(e,a)||function(t,e){if(t.match(/^(if|unless|else if|else)\b/))return e.javaScriptLine=!0,n}(e,a)||function(t,e){if(t.match(/^(- *)?(each|for)\b/))return e.isEach=!0,n}(e,a)||function(t,e){if(t.match(/^while\b/))return e.javaScriptLine=!0,n}(e,a)||function(t,e){var n;if(n=t.match(/^(\w(?:[-:\w]*\w)?)\/?/))return e.lastTag=n[1].toLowerCase(),"script"===e.lastTag&&(e.scriptType="application/javascript"),"tag"}(e,a)||c(e,a)||function(t,e){if(t.match(/^(!?=|-)/))return e.javaScriptLine=!0,"punctuation"}(e,a)||function(t){if(t.match(/^#([\w-]+)/))return"builtin"}(e)||function(t){if(t.match(/^\.([\w-]+)/))return"qualifier"}(e)||function(t,e){if("("==t.peek())return t.next(),e.isAttrs=!0,e.attrsNest=[],e.inAttributeName=!0,e.attrValue="",e.attributeIsType=!1,"punctuation"}(e,a)||function(t,e){if(t.match(/^&attributes\b/))return e.javaScriptArguments=!0,e.javaScriptArgumentsDepth=0,"keyword"}(e,a)||function(t){if(t.sol()&&t.eatSpace())return"indent"}(e)||function(t,e){return t.match(/^(?:\| ?| )([^\n]+)/)?"string":t.match(/^(<[^\n]*)/,!1)?(u(t,e,"htmlmixed"),e.innerModeForLine=!0,o(t,e,!0)):void 0}(e,a)||function(t,e){if(t.match(/^ *\/\/(-)?([^\n]*)/))return e.indentOf=t.indentation(),e.indentToken="comment","comment"}(e,a)||function(t){if(t.match(/^: */))return"colon"}(e)||function(t,e){if(t.eat(".")){var n=null;return"script"===e.lastTag&&-1!=e.scriptType.toLowerCase().indexOf("javascript")?n=e.scriptType.toLowerCase().replace(/"|'/g,""):"style"===e.lastTag&&(n="css"),u(t,e,n),"dot"}}(e,a)||function(t){return t.next(),null}(e);return!0===p?null:p}}}),"javascript","css","htmlmixed"),t.defineMIME("text/x-pug","pug"),t.defineMIME("text/x-jade","pug")}));