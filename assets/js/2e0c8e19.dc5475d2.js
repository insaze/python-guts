"use strict";(self.webpackChunkpython_guts=self.webpackChunkpython_guts||[]).push([[5127],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>k});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},p=Object.keys(e);for(a=0;a<p.length;a++)n=p[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var p=Object.getOwnPropertySymbols(e);for(a=0;a<p.length;a++)n=p[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),s=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(i.Provider,{value:t},e.children)},c="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,p=e.originalType,i=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),c=s(n),d=r,k=c["".concat(i,".").concat(d)]||c[d]||m[d]||p;return n?a.createElement(k,l(l({ref:t},u),{},{components:n})):a.createElement(k,l({ref:t},u))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var p=n.length,l=new Array(p);l[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o[c]="string"==typeof e?e:r,l[1]=o;for(var s=2;s<p;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},762:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>i,contentTitle:()=>l,default:()=>m,frontMatter:()=>p,metadata:()=>o,toc:()=>s});var a=n(7462),r=(n(7294),n(3905));const p={tags:["\u041e\u043f\u0435\u0440\u0430\u0446\u0438\u0438","\u0414\u0435\u0440\u0435\u0432\u044c\u044f","ast"]},l="\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439 \u043f\u043e\u0434 \u043d\u0430\u0434\u0437\u043e\u0440\u043e\u043c ast",o={unversionedId:"notes/basics/operator-precedence-ast",id:"notes/basics/operator-precedence-ast",title:"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439 \u043f\u043e\u0434 \u043d\u0430\u0434\u0437\u043e\u0440\u043e\u043c ast",description:"\u0420\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0438\u043c, \u043a\u0430\u043a \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u0432\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u043e\u0433\u043e \u043c\u043e\u0434\u0443\u043b\u044f ast \u043c\u043e\u0436\u043d\u043e \u0443\u0437\u043d\u0430\u0442\u044c \u043f\u043e\u0440\u044f\u0434\u043e\u043a \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439:",source:"@site/docs/notes/basics/operator-precedence-ast.md",sourceDirName:"notes/basics",slug:"/notes/basics/operator-precedence-ast",permalink:"/python-guts/notes/basics/operator-precedence-ast",draft:!1,editUrl:"https://github.com/insaze/python-guts/tree/main/docs/notes/basics/operator-precedence-ast.md",tags:[{label:"\u041e\u043f\u0435\u0440\u0430\u0446\u0438\u0438",permalink:"/python-guts/tags/\u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438"},{label:"\u0414\u0435\u0440\u0435\u0432\u044c\u044f",permalink:"/python-guts/tags/\u0434\u0435\u0440\u0435\u0432\u044c\u044f"},{label:"ast",permalink:"/python-guts/tags/ast"}],version:"current",frontMatter:{tags:["\u041e\u043f\u0435\u0440\u0430\u0446\u0438\u0438","\u0414\u0435\u0440\u0435\u0432\u044c\u044f","ast"]},sidebar:"tutorialSidebar",previous:{title:"\u0412\u043b\u043e\u0436\u0435\u043d\u043d\u044b\u0435 \u043a\u043e\u043d\u0442\u0435\u043a\u0441\u0442\u043d\u044b\u0435 \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440\u044b",permalink:"/python-guts/notes/basics/nested-context-managers"},next:{title:"\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439",permalink:"/python-guts/notes/basics/operator-precedence"}},i={},s=[{value:"\u0421\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0435 \u0437\u0430\u043c\u0435\u0442\u043a\u0438",id:"\u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0435-\u0437\u0430\u043c\u0435\u0442\u043a\u0438",level:2},{value:"\u0421\u0441\u044b\u043b\u043a\u0438",id:"\u0441\u0441\u044b\u043b\u043a\u0438",level:2}],u={toc:s},c="wrapper";function m(e){let{components:t,...n}=e;return(0,r.kt)(c,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"\u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435-\u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439-\u043f\u043e\u0434-\u043d\u0430\u0434\u0437\u043e\u0440\u043e\u043c-ast"},"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439 \u043f\u043e\u0434 \u043d\u0430\u0434\u0437\u043e\u0440\u043e\u043c ast"),(0,r.kt)("p",null,"\u0420\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0438\u043c, \u043a\u0430\u043a \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u0432\u0441\u0442\u0440\u043e\u0435\u043d\u043d\u043e\u0433\u043e \u043c\u043e\u0434\u0443\u043b\u044f ",(0,r.kt)("inlineCode",{parentName:"p"},"ast")," \u043c\u043e\u0436\u043d\u043e \u0443\u0437\u043d\u0430\u0442\u044c \u043f\u043e\u0440\u044f\u0434\u043e\u043a \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"import ast\n\nprint(ast.dump(ast.parse('1 + 2 * 3 - 4', mode='eval'), indent=2))\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"Expression(\n  body=BinOp(\n    left=BinOp(\n      left=Constant(value=1),\n      op=Add(),\n      right=BinOp(\n        left=Constant(value=2),\n        op=Mult(),\n        right=Constant(value=3))),\n    op=Sub(),\n    right=Constant(value=4)))\n")),(0,r.kt)("p",null,"\u041a\u0430\u043a \u043c\u043e\u0436\u043d\u043e \u0432\u0438\u0434\u0435\u0442\u044c, \u043d\u0430\u0448\u0435 \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u043f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u0438\u0437 \u043e\u0431\u044b\u0447\u043d\u043e\u0439 \u0441\u0442\u0440\u043e\u043a\u0438 \u0432 \u0434\u0435\u0440\u0435\u0432\u043e."),(0,r.kt)("p",null,"\u0417\u0430\u0442\u0435\u043c \u0438\u043d\u0442\u0435\u0440\u043f\u0440\u0435\u0442\u0430\u0442\u043e\u0440 \u0432\u044b\u0447\u0438\u0441\u043b\u044f\u0435\u0442 \u0434\u0430\u043d\u043d\u043e\u0435 \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043f\u043e\u0438\u0441\u043a\u0430 \u0432 \u0433\u043b\u0443\u0431\u0438\u043d\u0443. \u0421\u0430\u043c\u044b\u0435 \u043d\u0438\u0436\u043d\u0438\u0435 (\u0441\u0430\u043c\u044b\u0435 \u0433\u043b\u0443\u0431\u043e\u043a\u0438\u0435) \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u0432\u044b\u0447\u0438\u0441\u043b\u044f\u044e\u0442\u0441\u044f \u0438 \u0441\u0432\u043e\u0440\u0430\u0447\u0438\u0432\u0430\u044e\u0442\u0441\u044f \u0432 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0437\u0430\u0442\u0435\u043c \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442\u0441\u044f \u0434\u043b\u044f \u0432\u044b\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u044f \u0432\u0435\u0440\u0445\u043d\u0438\u0445 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439."),(0,r.kt)("p",null,"\u041d\u0430 \u043f\u0440\u0438\u043c\u0435\u0440\u0435 ",(0,r.kt)("inlineCode",{parentName:"p"},"1 + 2 * 3 - 4")," \u043f\u043e\u0440\u044f\u0434\u043e\u043a \u0432\u044b\u0447\u0438\u0441\u043b\u0435\u043d\u0438\u0439 \u0431\u0443\u0434\u0435\u0442 \u0442\u0430\u043a\u0438\u043c:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"2 * 3"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"BinOp(\n  left=Constant(value=2),\n  op=Mult(),\n  right=Constant(value=3))\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"1 + (2 * 3)"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"BinOp(\n  left=Constant(value=1),\n  op=Add(),\n  right=BinOp(...))\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"(1 + (2 * 3)) - 4"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"BinOp(\n  left=BinOp(...),\n  op=Sub(),\n  right=Constant(value=4))\n")))),(0,r.kt)("p",null,"\u0420\u0430\u0441\u0441\u043c\u043e\u0442\u0440\u0438\u043c \u0431\u043e\u043b\u0435\u0435 \u0441\u043b\u043e\u0436\u043d\u044b\u0439 \u043f\u0440\u0438\u043c\u0435\u0440:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"X & 127 / 2 ** 3 and Y or Z << 2 ^ 9\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"Expression(\n  body=BoolOp(\n    op=Or(),\n    values=[\n      BoolOp(\n        op=And(),\n        values=[\n          BinOp(\n            left=Name(id='X', ctx=Load()),\n            op=BitAnd(),\n            right=BinOp(\n              left=Constant(value=127),\n              op=Div(),\n              right=BinOp(\n                left=Constant(value=2),\n                op=Pow(),\n                right=Constant(value=3)))),\n          Name(id='Y', ctx=Load())]),\n      BinOp(\n        left=BinOp(\n          left=Name(id='Z', ctx=Load()),\n          op=LShift(),\n          right=Constant(value=2)),\n        op=BitXor(),\n        right=Constant(value=9))]))\n")),(0,r.kt)("p",null,"\u0417\u0434\u0435\u0441\u044c \u0443\u0436\u0435 \u043c\u043e\u0436\u043d\u043e \u0432\u0438\u0434\u0435\u0442\u044c \u043e\u0442\u043b\u0438\u0447\u0438\u044f: \u043b\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438 \u043f\u0440\u0435\u0432\u0440\u0430\u0449\u0430\u044e\u0442\u0441\u044f \u043d\u0435 \u0432 ",(0,r.kt)("inlineCode",{parentName:"p"},"BinOp"),", \u0430 \u0432 ",(0,r.kt)("inlineCode",{parentName:"p"},"BoolOp"),", \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0441\u043e\u0434\u0435\u0440\u0436\u0438\u0442 \u0443\u0436\u0435 \u0441\u043f\u0438\u0441\u043e\u043a \u043e\u043f\u0435\u0440\u0430\u043d\u0434\u043e\u0432. "),(0,r.kt)("p",null,"\u0421\u043f\u0443\u0441\u043a\u0430\u0435\u043c\u0441\u044f \u0432 \u0441\u0430\u043c\u0443\u044e \u0433\u043b\u0443\u0431\u044c:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"2 ** 3"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"BinOp(\n  left=Constant(value=2),\n  op=Pow(),\n  right=Constant(value=3))\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"127 / (2 ** 3)"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"BinOp(\n  left=Constant(value=127),\n  op=Div(),\n  right=BinOp(...))\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"X & (127 / (2 ** 3))"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"BinOp(\n  left=Name(id='X', ctx=Load()),\n  op=BitAnd(),\n  right=BinOp(...))\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"(X & (127 / (2 ** 3))) and Y"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"BoolOp(\n  op=And(),\n  values=[\n    BinOp(...),\n    Name(id='Y', ctx=Load())])\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"Z << 2"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"BinOp(\n  left=Name(id='Z', ctx=Load()),\n  op=LShift(),\n  right=Constant(value=2))\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"(Z << 2) ^ 9"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"BinOp(\n  left=BinOp(...),\n  op=BitXor(),\n  right=Constant(value=9))\n"))),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"((X & (127 / (2 ** 3))) and Y) or ((Z << 2) ^ 9)"),(0,r.kt)("pre",{parentName:"li"},(0,r.kt)("code",{parentName:"pre",className:"language-python"},"BoolOp(\n  op=Or(),\n  values=[\n    BoolOp(...),\n    BinOp(...))\n")))),(0,r.kt)("h2",{id:"\u0441\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0435-\u0437\u0430\u043c\u0435\u0442\u043a\u0438"},"\u0421\u0432\u044f\u0437\u0430\u043d\u043d\u044b\u0435 \u0437\u0430\u043c\u0435\u0442\u043a\u0438"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"/python-guts/notes/basics/operator-precedence"},"\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0439"))),(0,r.kt)("h2",{id:"\u0441\u0441\u044b\u043b\u043a\u0438"},"\u0421\u0441\u044b\u043b\u043a\u0438"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.python.org/3/library/ast.html"},"\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430\u0446\u0438\u044f. ast \u2014 Abstract Syntax Trees"))))}m.isMDXComponent=!0}}]);