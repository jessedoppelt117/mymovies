(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{10:function(e,t,a){},11:function(e,t,a){},15:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(4),l=a.n(c),o=(a(10),a(2)),s=(a(11),a(1));function u(e){var t=e.columns,a=e.data,n=Object(s.useTable)({columns:t,data:a,initialState:{sortBy:[{id:"title",desc:!1}]}},s.useSortBy,s.usePagination),c=n.getTableProps,l=n.getTableBodyProps,o=n.headerGroups,u=n.page,i=n.prepareRow,m=n.canPreviousPage,p=n.canNextPage,d=n.pageOptions,g=n.gotoPage,b=n.nextPage,f=n.previousPage,E=n.state.pageIndex;return r.a.createElement("div",{className:"movies"},r.a.createElement("table",Object.assign({className:"main-table"},c()),r.a.createElement("thead",null,o.map((function(e){return r.a.createElement("tr",e.getHeaderGroupProps(),e.headers.map((function(e){return r.a.createElement("th",e.getHeaderProps(e.getSortByToggleProps()),e.render("Header"),r.a.createElement("span",null,e.isSorted?e.isSortedDesc?" \ud83d\udd3d":" \ud83d\udd3c":""))})))}))),r.a.createElement("tbody",l(),u.map((function(e){return i(e),r.a.createElement("tr",Object.assign({onClick:function(){return function(e){console.log("In clicker",e.id)}(e)}},e.getRowProps()),e.cells.map((function(e){return r.a.createElement("td",e.getCellProps(),e.render("Cell"))})))})))),r.a.createElement("div",{className:"pagination"},r.a.createElement("button",{onClick:function(){return f()},disabled:!m},"<")," ",r.a.createElement("button",{onClick:function(){return b()},disabled:!p},">")," ",r.a.createElement("span",null,"Page"," ",r.a.createElement("strong",null,E+1," of ",d.length)," "),r.a.createElement("span",null,"| Go to page:"," ",r.a.createElement("input",{type:"number",defaultValue:E+1,className:"goto",onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;g(t)}}))," "))}var i=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1],l=Object(n.useState)([]),s=Object(o.a)(l,2),i=s[0],m=s[1],p=Object(n.useState)([]),d=Object(o.a)(p,2),g=(d[0],d[1]);return Object(n.useEffect)((function(){fetch("/getrows").then((function(e){return e.json()})).then((function(e){c(e.columns),m(e.data),g(e.extraData)}))}),[]),r.a.createElement("div",{className:"App"},r.a.createElement("h2",null,"Brian's Movies"),r.a.createElement(u,{columns:a,data:i}))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(i,null)),document.getElementById("root"))},5:function(e,t,a){e.exports=a(15)}},[[5,1,2]]]);
//# sourceMappingURL=main.34b5a081.chunk.js.map