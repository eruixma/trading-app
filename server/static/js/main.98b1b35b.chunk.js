(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{220:function(e,t,a){e.exports=a(413)},324:function(e,t,a){},413:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(52),i=a.n(c),s=a(7),o=a(8),l=a(10),m=a(9),u=a(11),p=a(26),h=a(59),d=a(1),f=a.n(d),b=a(175),E=a(20),g=a(6),y=a.n(g);function j(e){return r.a.createElement("i",{className:"icon icon-graph-line color-green"})}var O=Object(E.b)({theme:f.a.oneOf(["light","dark"]),product:f.a.any,user:f.a.any,onProfileClick:f.a.func,showMenu:f.a.bool,showSettings:f.a.bool,currApp:f.a.any,onToggleMenu:f.a.func,children:f.a.any},function(e){return e})(function(e){var t=e.children;return r.a.Children.only(t)}),v=Object(E.a)({theme:f.a.oneOf(["light","dark"])})(function(e){var t=e.theme,a=e.children;return r.a.createElement("div",{className:t},a)}),S=Object(E.a)({product:f.a.string,user:f.a.string,onProfileClick:f.a.func})(function(e){var t=e.product,a=e.user,n=e.onProfileClick;return r.a.createElement("header",{className:"sysbar"},r.a.createElement("div",{className:"items-container"},r.a.createElement("div",{className:"item"},r.a.createElement(j,null),r.a.createElement("span",{className:"product"},t))),r.a.createElement("div",{className:"items-container"},r.a.createElement("div",{className:"item hover",onClick:n},r.a.createElement("i",{className:"icon icon-profile"}),r.a.createElement("span",{className:"username"},a))))}),N=Object(E.a)({showSettings:f.a.bool})(function(e){var t=e.showSettings,a=e.children;return r.a.createElement("aside",{className:y()("settings",{hidden:!t})},a)}),k=Object(E.a)({showSettings:f.a.bool})(function(e){var t=e.showSettings,a=e.children;return r.a.createElement("div",{className:y()("app",{"slide-right":!t,"slide-left":t})},a)}),w=Object(E.a)({showMenu:f.a.bool,currApp:f.a.any,onToggleMenu:f.a.func})(function(e){var t=e.showMenu,a=e.currApp,n=e.onToggleMenu,c=e.children;return r.a.createElement("nav",{className:"appbar"},r.a.createElement("div",{className:"actions-left"},r.a.createElement("div",{className:"item",onClick:n},r.a.createElement("i",{className:y()("navigation-toggle",{closed:t})})),r.a.createElement("div",{className:y()("menu-anchor",{"open-menu":t})},"Menu"),r.a.createElement("div",{className:y()("title",{"open-menu":t})},a)),r.a.createElement("div",{className:"actions-right"},c))}),C=Object(E.a)({showMenu:f.a.bool})(function(e){var t=e.showMenu,a=e.children;return r.a.createElement("div",{className:y()("appnav",{hidden:!t})},a)});O.AppBar=w,O.AppWrapper=k,O.SettingsPanel=N,O.Header=S,O.Theme=v,O.AppContent=function(e){var t=e.children;return r.a.createElement("div",{className:"appcontent"},t)},O.AppMenu=C,O.AppBody=function(e){var t=e.children;return r.a.createElement("div",{className:"appbody"},t)};var T,A,x=O,M=(a(415).a.Search,x.AppBar),P=x.AppWrapper,R=x.SettingsPanel,q=x.Header,I=x.Theme,D=x.AppContent,_=x.AppMenu,W=x.AppBody,F=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,c=new Array(n),i=0;i<n;i++)c[i]=arguments[i];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(c)))).state={showMenu:!0,showSettings:!1},a.getSettings=function(){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"column sm-12 container"},r.a.createElement("div",{className:"profile"},r.a.createElement("i",{className:"icon icon-profile"}),r.a.createElement("div",{className:"username"},"Ruixin Ma")),r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"title"},"My settings"),r.a.createElement("div",{className:"item"},r.a.createElement("div",{className:"left"}," Switch theme"),r.a.createElement("div",{className:"right"},r.a.createElement("label",{className:"switch"},r.a.createElement("input",{type:"checkbox",checked:"light"===a.props.theme,onChange:function(e){a.props.changeTheme(e.target.checked?"light":"dark")}}),r.a.createElement("i",{className:"ball"}),r.a.createElement("span",{"data-enabled":"Light","data-disabled":"Dark"}))))),r.a.createElement("div",{className:"bottom"},r.a.createElement("button",{className:"btn big",type:"button"},r.a.createElement("i",{className:"icon icon-log-out"})," Sign out"))))},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:this.props.className},r.a.createElement(x,{theme:this.props.theme,product:"Stock Trading",user:this.props.user,onProfileClick:function(){return e.setState(function(e){return{showSettings:!e.showSettings}})},showMenu:this.state.showMenu,showSettings:this.state.showSettings,currApp:this.props.pageName,onToggleMenu:function(){return e.setState(function(e){return{showMenu:!e.showMenu}})}},r.a.createElement(I,null,r.a.createElement(q,null),r.a.createElement("main",null,r.a.createElement(R,null,this.getSettings()),r.a.createElement(P,null,r.a.createElement(M,null,this.props.appbar),r.a.createElement(W,null,r.a.createElement(_,null,this.props.menu),r.a.createElement(D,null,this.props.children)))))))}}]),t}(n.Component),B=Object(E.b)({store:f.a.object.isRequired,actions:f.a.object.isRequired,children:f.a.any},function(e){return e})(function(e){var t=e.children;return r.a.Children.only(t)}),L=Object(E.a)({store:f.a.object.isRequired,actions:f.a.object.isRequired})(function(e){var t=e.store,a=e.actions,n=e.children,c=Object(b.a)(e,["store","actions","children"]);return r.a.createElement(F,Object.assign({theme:t.app.theme,changeTheme:a.changeTheme},c),n)}),U=a(19),H=a(33),Y=a(97),X=a(17),z=a(416),V=a(417),G=a(418),J=Object(z.a)({CHANGE_THEME:function(e){return{theme:e}}}),K=J.changeTheme,Q=Object(V.a)(Object(X.a)({},Object(G.a)(K),function(e,t){var a=t.payload.theme;return Object(U.a)({},e,{theme:a})}),{theme:"dark"}),Z=a(139),$=a(41),ee=a.n($),te=a(70),ae=a.n(te),ne=Object(Z.a)("UPDATE_WORLD_INDICES"),re=Object(Z.a)("UPDATE_REALTIME_SECTOR"),ce=Object(Z.a)("UPDATE_STOCK"),ie=Object(Z.a)("UPDATE_SUMMARY"),se=Object(Z.a)("UPDATE_TIME_SERIES"),oe=Object(Z.a)("UPDATE_DAILY_TIME_SERIES"),le={fetchWorldIndices:function(){return function(e){ee.a.get("/api/v1/quotes/indices").then(function(t){e(ne(t))})}},fetchRealtimeSector:function(){return function(e){ee.a.get("/api/v1/quotes/sector").then(function(t){e(re(ae.a.mapValues(t.data,function(e){return parseFloat(e)})))})}},fetchPrice:function(e){return function(t){ee.a.get("/api/v1/quotes/price/".concat(e)).then(function(a){t(ce({symbol:e,price:a.data}))})}},fetchSummary:function(e){return function(t){ee.a.get("/api/v1/search/stocks?q=symbol:".concat(e)).then(function(a){t(ie({symbol:e,summary:a.data[0]}))})}},fetchIntradayTimeSeries:function(e){return function(t){ee.a.get("/api/v1/quotes/timeseries/".concat(e,"?function=TIME_SERIES_INTRADAY&interval=1")).then(function(a){t(se({symbol:e,intradayTimeSeries:a.data}))})}},fetchDailyTimeSeries:function(e){return function(t){ee.a.get("/api/v1/quotes/timeseries/".concat(e,"?function=TIME_SERIES_DAILY")).then(function(a){t(oe({symbol:e,dailyTimeSeries:a.data}))})}},updateWorldIndices:ne,updateRealtimeSector:re,updatePrice:ce,updateSummary:ie,updateTimeSeries:se,updateDailyTimeSeries:oe},me=Object(V.a)((T={},Object(X.a)(T,ne,function(e,t){var a=t.payload;return Object(U.a)({},e,{worldIndices:a.data})}),Object(X.a)(T,re,function(e,t){var a=t.payload;return Object(U.a)({},e,{realtimeSector:a})}),Object(X.a)(T,ce,function(e,t){var a=t.payload;return Object(U.a)({},e,{prices:Object(U.a)({},e.prices,Object(X.a)({},a.symbol,a.price))})}),Object(X.a)(T,ie,function(e,t){var a=t.payload;return Object(U.a)({},e,{summaries:Object(U.a)({},e.summaries,Object(X.a)({},a.symbol,a.summary))})}),Object(X.a)(T,se,function(e,t){var a=t.payload;return Object(U.a)({},e,{intradayTimeSeries:Object(U.a)({},e.intradayTimeSeries,Object(X.a)({},a.symbol,a.intradayTimeSeries))})}),Object(X.a)(T,oe,function(e,t){var a=t.payload;return Object(U.a)({},e,{dailyTimeSeries:Object(U.a)({},e.dailyTimeSeries,Object(X.a)({},a.symbol,a.dailyTimeSeries))})}),T),{worldIndices:[],realtimeSector:{"Information Technology":0,"Consumer Discretionary":0,Financials:0,"Consumer Staples":0,"Health Care":0,Utilities:0,Materials:0,"Communication Services":0,Energy:0,Industrials:0,"Real Estate":0},prices:{},summaries:{},intradayTimeSeries:{},dailyTimeSeries:{}}),ue=a(58),pe=a.n(ue),he=Object(Z.a)("UPDATE_SUGGESTIONS"),de=Object(Z.a)("UPDATE_SEARCH_RESULTS"),fe=Object(Z.a)("CLEAR_SUGGESTIONS"),be={fetchSuggestions:function(e){return function(t){ee.a.get(pe()("/api/v1/search/suggestions?q=".concat(e,"&limit=5"))).then(function(e){t(he(e))})}},search:function(e){return function(t){ee.a.get(pe()("/api/v1/search/stocks?q=".concat(e))).then(function(e){t(de(e)),e.data.forEach(function(e){t(le.fetchPrice(e.symbol))})})}},updateSuggestions:he,updateSearchResults:de,clearSuggestions:fe},Ee=Object(V.a)((A={},Object(X.a)(A,he,function(e,t){var a=t.payload;return Object(U.a)({},e,{suggestions:a.data})}),Object(X.a)(A,de,function(e,t){var a=t.payload;return Object(U.a)({},e,{searchResults:a.data})}),A),{suggestions:[],searchResults:[]});var ge=Object(Y.a)(function(e){return{store:Object(U.a)({},e)}},function(e){return{actions:Object(H.b)(Object(U.a)({},J,le,be),e)}})(B),ye=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"tree navigation"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(p.c,{className:"item",to:"/search"},"Search",r.a.createElement("i",{className:"icon icon-search right-align"}))),r.a.createElement("li",null,r.a.createElement(p.c,{className:"item",to:"/quotes"},"Quotes")),r.a.createElement("li",null,r.a.createElement(p.c,{className:"item",to:"/portfolio"},"Portfolio"))))}}]),t}(n.PureComponent),je=a(109),Oe=a(185),ve=a.n(Oe),Se=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"left"},r.a.createElement("div",{className:"title"},this.props.company),r.a.createElement("div",{className:"subtitle"},this.props.symbol))))}}]),t}(n.PureComponent),Ne=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).lastUpdateTime=Date.now(),a.updateTimeout=null,a.getOnSuggestionsFetchRequested=function(e){var t=e.value;"input-changed"===e.reason&&(a.updateTimeout&&clearTimeout(a.updateTimeout),a.updateTimeout=setTimeout(function(){a.props.fetchSuggestions(t),a.lastUpdateTime=Date.now(),a.updateTimeout=null},500))},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement(ve.a,{theme:ke.theme,suggestions:this.props.suggestions,onSuggestionsFetchRequested:this.getOnSuggestionsFetchRequested,onSuggestionsClearRequested:function(){return e.props.clearSuggestions()},getSuggestionValue:function(e){return e.company},renderSuggestion:function(e){return r.a.createElement(Se,e)},inputProps:{placeholder:"",value:this.props.value,onChange:this.props.onChange,autoFocus:!0}}))}}]),t}(n.PureComponent),ke={theme:{container:{position:"relative",marginBottom:"28px",height:"60px",width:"900px"},input:{marginRight:0,width:"100%",height:"100%",fontSize:"24px",paddingLeft:" 8px",cursor:"text",paddingLop:"21px"},suggestionsList:{listStyle:"none",marginLeft:"-47px"},suggestion:{padding:0}}},we=Object(je.a)(Ne),Ce=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={value:""},a.onChange=function(e,t){var n=t.newValue;a.setState({value:n})},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.store,a=e.actions,n=e.match,c=e.history,i=this.state.value;return r.a.createElement("div",{className:"tile",style:xe.tile},r.a.createElement("div",{className:"wrapper",style:xe.wrapper},r.a.createElement("div",{className:"row"},r.a.createElement("label",{style:xe.label},"Input symbol, company, description, or anything you like")),r.a.createElement("div",{className:"row"},r.a.createElement(we,{suggestions:t.search.suggestions,fetchSuggestions:a.fetchSuggestions,clearSuggestions:a.clearSuggestions,value:i,onChange:this.onChange})),r.a.createElement("div",{className:"row"},r.a.createElement("div",{style:xe.buttonWrapper},r.a.createElement("button",{className:"btn primary",style:xe.button,onClick:function(){c.push(pe()("".concat(n.path,"result?q=").concat(i))),a.search(i)}},"Search"),r.a.createElement("button",{className:"btn",style:xe.button},"I'm Feeling Lucky")))))}}]),t}(n.Component),Te=Object(E.a)({store:f.a.object.isRequired,actions:f.a.object.isRequired})(Object(h.f)(Ce)),Ae=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(ge,null,r.a.createElement(L,{pageName:r.a.createElement("span",{className:"title-name"},"Search stocks"),user:"Ruixin",menu:r.a.createElement(ye,null)},r.a.createElement(Te,{goto:this.props.history.push})))}}]),t}(n.Component),xe={button:{fontSize:"24px"},buttonWrapper:{margin:"0 auto"},label:{fontSize:"32px",margin:"0 auto",marginBottom:"28px"},tile:{height:"100%",width:"100%",justifyContent:"center"},wrapper:{margin:"0 auto 0 auto",marginBottom:"10%"}},Me=Object(je.a)(Ae),Pe=a(72),Re=a.n(Pe),qe=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).state={value:""},a.onChange=function(e){return a.setState({value:e})},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.location,t=Re.a.parse(e.search);this.setState({value:t.q})}},{key:"render",value:function(){var e=this,t=this.state.value,a=this.props,n=a.history,c=a.match,i=a.actions;return r.a.createElement("div",null,r.a.createElement("input",{type:"text",value:t,onChange:function(t){return e.onChange(t.target.value)},style:{width:"400px"}}),r.a.createElement("button",{onClick:function(){n.push(pe()("".concat(c.url,"?q=").concat(t))),i.search(t)},className:"btn primary"},"Search"))}}]),t}(n.Component),Ie=Object(E.a)({actions:f.a.object})(Object(h.f)(qe)),De=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).arrowIconClassName=function(e){return g("icon",{"icon-arrow-down":"-"===e.change.charAt(0),"icon-arrow-up":"+"===e.change.charAt(0)})},a.colorClassName=function(e){return g("item text-md",{"color-red":"-"===e.change.charAt(0),"color-green":"+"===e.change.charAt(0)})},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.location,a=e.search,n=Re.a.parse(t.search);n.q&&a(n.q)}},{key:"render",value:function(){var e=this,t=this.props,a=t.results,n=t.prices;return a.map(function(t){return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"tile sm-12",style:{height:"240px"}},r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"column sm-3"},n[t.symbol]?r.a.createElement("div",{style:{padding:16}},r.a.createElement("div",{className:"kpi"},r.a.createElement("div",{className:"item text-xl"},r.a.createElement("span",null,n[t.symbol].price)),r.a.createElement("div",{className:e.colorClassName(n[t.symbol])},r.a.createElement("span",null,r.a.createElement("i",{className:e.arrowIconClassName(n[t.symbol])})),r.a.createElement("span",null,n[t.symbol].change),r.a.createElement("span",null,"\xa0"))),r.a.createElement("table",{className:"table tiny dashed"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",{style:{fontWeight:500}},"Market Cap"),r.a.createElement("td",null,t.MarketCap)),r.a.createElement("tr",null,r.a.createElement("td",{style:{fontWeight:500}},"Enterprise Value"),r.a.createElement("td",null,t.EnterpriseValue)),r.a.createElement("tr",null,r.a.createElement("td",{style:{fontWeight:500}},"P/E (TTM)"),r.a.createElement("td",null,t.PE)),r.a.createElement("tr",null,r.a.createElement("td",{style:{fontWeight:500}},"P/B"),r.a.createElement("td",null,t.PB))))):r.a.createElement("div",{style:{display:"flex",justifyContent:"center",height:"100%",flexDirection:"column"}},r.a.createElement("div",{className:"loading",style:{margin:"0 auto"}}))),r.a.createElement("div",{className:"column sm-9"},r.a.createElement("h3",{style:{margin:0,marginBottom:8}},r.a.createElement(p.b,{to:"/quotes/stock/".concat(t.symbol)},"".concat(t.company,"  (").concat(t.symbol,")"))),r.a.createElement("p",null,t.description.replace("\\n\\n","").replace("\\","")))))))})}}]),t}(n.Component),_e=Object(E.a)({store:d.object.isRequired,actions:d.object.isRequired})(Object(h.f)(function(e){var t=e.store,a=e.actions,n=e.location;return r.a.createElement(De,{results:t.search.searchResults,prices:t.quotes.prices,search:a.search,location:n})})),We=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.location,a=(e.actions,Re.a.parse(t.search));a.q&&this.setState({value:a.q})}},{key:"render",value:function(){return""===this.props.location.search?r.a.createElement(h.a,{to:"/"}):r.a.createElement(ge,null,r.a.createElement(L,{pageName:r.a.createElement(Ie,null),user:"Ruixin",menu:r.a.createElement(ye,null)},r.a.createElement(_e,null)))}}]),t}(n.Component),Fe=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.match;return r.a.createElement(h.d,null,r.a.createElement(h.b,{exact:!0,path:"".concat(e.path,"/"),component:Me}),r.a.createElement(h.b,{path:"".concat(e.path,"/result"),component:We}))}}]),t}(n.Component),Be=(a(324),function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props,t=e.match,a=e.store.quotes.summaries,c=t.params.symbol;return r.a.createElement(n.Fragment,null,r.a.createElement("span",{className:"title-name"},a[c]&&a[c].company),r.a.createElement("span",{className:"subtitle"},c))}}]),t}(n.Component)),Le=Object(E.a)({store:f.a.object})(Object(h.f)(Be)),Ue=a(29),He=a(81),Ye=a(2),Xe=a(61),ze=a(131),Ve=a.n(ze),Ge=a(132),Je=a.n(Ge),Ke=a(46),Qe=a(85),Ze=a(108),$e=a(14),et=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.data,t=He.discontinuousTimeScaleProvider.inputDateAccessor(function(e){return e.time})(ae.a.sortBy(e.map(function(e){return Object(U.a)({},e,{time:Object(Ue.timeParse)("%Y-%m-%d %H:%M:%S")(e.time)})}),["time"])),a=t.data,n=t.xScale,c=t.xAccessor,i=t.displayXAccessor,s=[c(Object(Ye.last)(a)),c(a[0])];return r.a.createElement(Xe.b,{ratio:this.props.ratio,width:this.props.width,height:200,pointsPerPxThreshold:1,margin:{left:70,right:70,top:0,bottom:30},seriesName:this.props.symbol,data:a,xAccessor:c,displayXAccessor:i,xScale:n,xExtents:s},r.a.createElement(Xe.a,{id:1,yExtents:function(e){return[e.close]}},r.a.createElement(Ve.a,{axisAt:"bottom",orient:"bottom",stroke:"#f2f2f2",tickStroke:"#f2f2f2"}),r.a.createElement(Je.a,{axisAt:"left",orient:"left",ticks:7,stroke:"#f2f2f2",tickStroke:"#f2f2f2"}),r.a.createElement(Ke.MouseCoordinateX,{at:"bottom",orient:"bottom",displayFormat:Object(Ue.timeFormat)("%Y-%m-%d %H:%M:%S")}),r.a.createElement(Ke.MouseCoordinateY,{at:"right",orient:"right",displayFormat:Object($e.format)(",.2f")}),r.a.createElement(Qe.LineSeries,{yAccessor:function(e){return e.close},strokeWidth:2,hoverStrokeWidth:4,highlightOnHover:!0,stroke:"#288964"})),r.a.createElement(Ke.CrossHairCursor,{stroke:"#f2f2f2"}))}}]),t}(n.Component),tt=et=Object(Ze.fitWidth)(et),at=a(111),nt=a(215),rt=a(138),ct=a(44),it=a.n(ct),st=a(133),ot=a.n(st),lt=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e,t=this.props,a=t.type,n=t.data,c=t.width,i=t.ratio,s=He.discontinuousTimeScaleProvider.inputDateAccessor(function(e){return e.date}),o=Object(rt.ema)().id(0).options({windowSize:5}).merge(function(e,t){e.ema5=t}).stroke("#0082f0").accessor(function(e){return e.ema5}),l=Object(rt.ema)().id(0).options({windowSize:20}).merge(function(e,t){e.ema20=t}).stroke("#dcaf00").accessor(function(e){return e.ema20}),m=l(o(n.map(function(e){return Object(U.a)({},e,{date:Object(Ue.timeParse)("%Y-%m-%d")(e.time)})}))),u=s(ae.a.sortBy(m,["date"])),p=u.data,h=u.xScale,d=u.xAccessor,f=u.displayXAccessor;console.log(p);var b=[d(Object(Ye.last)(p)),d(p[Math.max(0,p.length-180)])];return r.a.createElement(Xe.b,(e={type:"svg",height:420,ratio:i,width:c,margin:{left:70,right:70,top:10,bottom:30}},Object(X.a)(e,"type",a),Object(X.a)(e,"seriesName",this.props.symbol),Object(X.a)(e,"data",p),Object(X.a)(e,"xScale",h),Object(X.a)(e,"xAccessor",d),Object(X.a)(e,"displayXAccessor",f),Object(X.a)(e,"xExtents",b),e),r.a.createElement(Xe.a,{id:100,yExtents:[function(e){return[e.high,e.low]}],textFill:"#f2f2f2"},r.a.createElement(at.XAxis,{axisAt:"bottom",orient:"bottom",tickStroke:"#f2f2f2",stroke:"#f2f2f2",ticks:20}),r.a.createElement(at.YAxis,{axisAt:"left",orient:"left",ticks:10,stroke:"none",tickStroke:"#f2f2f2"}),r.a.createElement(Ke.MouseCoordinateY,{at:"right",orient:"right",displayFormat:Object($e.format)(".2f")}),r.a.createElement(Qe.CandlestickSeries,{stroke:function(e){return e.close>e.open?"#288964":"#dc2d37"},wickStroke:function(e){return e.close>e.open?"#288964":"#dc2d37"},fill:function(e){return e.close>e.open?"#288964":"#dc2d37"}}),r.a.createElement(it.a,{yAccessor:o.accessor(),stroke:o.stroke(),strokeWidth:2}),r.a.createElement(it.a,{yAccessor:l.accessor(),stroke:l.stroke(),strokeWidth:2}),r.a.createElement(nt.OHLCTooltip,{forChart:1,origin:[0,0],textFill:"#f2f2f2",labelFill:"#0082f0"}),r.a.createElement(ot.a,{layout:"vertical",origin:[0,30],verticalSize:20,onClick:function(e){return console.log(e)},options:[{yAccessor:o.accessor(),yLabel:"".concat(o.type(),"(").concat(o.options().windowSize,")"),valueFill:o.stroke(),withShape:!0},{yAccessor:l.accessor(),yLabel:"".concat(l.type(),"(").concat(l.options().windowSize,")"),valueFill:l.stroke(),withShape:!0}]})),r.a.createElement(Xe.a,{id:200,height:150,yExtents:function(e){return e.volume},origin:function(e,t){return[0,t-150]}},r.a.createElement(at.YAxis,{axisAt:"right",orient:"right",ticks:5,tickFormat:Object($e.format)(".2s"),stroke:"none",tickStroke:"#f2f2f2"}),r.a.createElement(Ke.MouseCoordinateX,{at:"bottom",orient:"bottom",displayFormat:Object(Ue.timeFormat)("%Y-%m-%d")}),r.a.createElement(Ke.MouseCoordinateY,{at:"left",orient:"left",displayFormat:Object($e.format)(".4s")}),r.a.createElement(Qe.BarSeries,{yAccessor:function(e){return e.volume},fill:function(e){return e.close>e.open?"rgba(40, 137, 100, 0.5)":"rgba(220, 45, 55, 0.5)"}})),r.a.createElement(Ke.CrossHairCursor,{stroke:"#f2f2f2"}))}}]),t}(n.Component);lt.defaultProps={type:"svg"};var mt=lt=Object(Ze.fitWidth)(lt),ut=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(a=Object(l.a)(this,(e=Object(m.a)(t)).call.apply(e,[this].concat(r)))).arrowIconClassName=function(e){return g("icon",{"icon-arrow-down":"-"===e.change.charAt(0),"icon-arrow-up":"+"===e.change.charAt(0)})},a.colorClassName=function(e){return g("item text-md",{"color-red":"-"===e.change.charAt(0),"color-green":"+"===e.change.charAt(0)})},a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.match,a=e.actions;a.fetchDailyTimeSeries(t.params.symbol),a.fetchSummary(t.params.symbol),a.fetchPrice(t.params.symbol),a.fetchIntradayTimeSeries(t.params.symbol)}},{key:"render",value:function(){var e=this.props,t=e.store.quotes,a=t.prices,c=t.summaries,i=t.intradayTimeSeries,s=t.dailyTimeSeries,o=e.match.params.symbol,l=a[o],m=c[o],u=i[o],p=s[o];return r.a.createElement(n.Fragment,null,r.a.createElement("div",{className:"row",style:{height:"280px"}},r.a.createElement("div",{className:"tile sm-3"},r.a.createElement("div",{className:"content"},l&&m?r.a.createElement("div",{style:{margin:"0 auto"}},r.a.createElement("div",{className:"kpi"},r.a.createElement("div",{className:"item text-xl"},r.a.createElement("span",null,l.price)),r.a.createElement("div",{className:this.colorClassName(l)},r.a.createElement("span",null,r.a.createElement("i",{className:this.arrowIconClassName(l)})),r.a.createElement("span",null,l.change),r.a.createElement("span",null,"\xa0"))),r.a.createElement("table",{className:"table tiny dashed",style:{marginTop:"10px"}},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null),r.a.createElement("th",null))),r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",{style:{fontWeight:500}},"Market Cap"),r.a.createElement("td",null,Object($e.format)(",.4s")(m.MarketCap).replace(/G/,"B"))),r.a.createElement("tr",null,r.a.createElement("td",{style:{fontWeight:500}},"Enterprise Value"),r.a.createElement("td",null,Object($e.format)(",.4s")(m.EnterpriseValue).replace(/G/,"B"))),r.a.createElement("tr",null,r.a.createElement("td",{style:{fontWeight:500}},"P/E (TTM)"),r.a.createElement("td",null,Object($e.format)(",.2f")(m.PE))),r.a.createElement("tr",null,r.a.createElement("td",{style:{fontWeight:500}},"P/B"),r.a.createElement("td",null,Object($e.format)(",.2f")(m.PB))),r.a.createElement("tr",null,r.a.createElement("td",{style:{fontWeight:500}},"Headquarters"),r.a.createElement("td",null,m.location)),r.a.createElement("tr",null,r.a.createElement("td",{style:{fontWeight:500}},"Industry"),r.a.createElement("td",null,m.industry))))):r.a.createElement("div",{style:{display:"flex",justifyContent:"center",height:"100%",flexDirection:"column"}},r.a.createElement("div",{className:"loading",style:{margin:"0 auto"}})))),r.a.createElement("div",{className:"tile sm-9"},r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"left"},r.a.createElement("div",{className:"title"},"Intraday"))),r.a.createElement("div",{className:"content"},u?r.a.createElement(tt,{data:u,symbol:o}):r.a.createElement("div",{style:{display:"flex",justifyContent:"center",height:"100%",flexDirection:"column"}},r.a.createElement("div",{className:"loading",style:{margin:"0 auto"}}))))),r.a.createElement("div",{className:"row",style:{height:500}},r.a.createElement("div",{className:"tile sm-12"},r.a.createElement("div",{className:"header"},r.a.createElement("div",{className:"left"},r.a.createElement("div",{className:"title"},"Daily (10 years)"))),r.a.createElement("div",{className:"content"},p?r.a.createElement(mt,{data:p,symbol:o}):r.a.createElement("div",{style:{display:"flex",justifyContent:"center",height:"100%",flexDirection:"column"}},r.a.createElement("div",{className:"loading",style:{margin:"0 auto"}}))))))}}]),t}(n.Component),pt=Object(E.a)({store:f.a.object,actions:f.a.object})(Object(h.f)(ut)),ht=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(ge,null,r.a.createElement(L,{pageName:r.a.createElement(Le,null),user:"Ruixin",menu:r.a.createElement(ye,null)},r.a.createElement(pt,null)))}}]),t}(n.Component),dt=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.match;return r.a.createElement(h.d,null,r.a.createElement(h.b,{path:"".concat(e.path,"/stock/:symbol"),component:ht}))}}]),t}(n.Component),ft=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement(p.a,null,r.a.createElement(h.d,null,r.a.createElement(h.b,{exact:!0,path:"/",render:function(){return r.a.createElement(h.a,{to:"/search"})}}),r.a.createElement(h.b,{path:"/search",component:Fe}),r.a.createElement(h.b,{path:"/quotes",component:dt})))}}]),t}(n.Component),bt=a(216),Et=a.n(bt);var gt=a(217),yt=a(218),jt=Object(H.c)({app:Q,quotes:me,search:Ee}),Ot=Object(H.e)(jt,{},Object(H.d)(Object(H.a)(gt.a),function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},a=t.paths,n=t.config,r=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||H.d;return e?r(Et()(a,n)):r()}(!1)));i.a.render(r.a.createElement(yt.a,{store:Ot},r.a.createElement(ft,null)),document.getElementById("root"))}},[[220,1,2]]]);
//# sourceMappingURL=main.98b1b35b.chunk.js.map