(this["webpackJsonppatron-front"]=this["webpackJsonppatron-front"]||[]).push([[0],{17:function(e,t,a){e.exports=a(26)},22:function(e,t,a){},23:function(e,t,a){},25:function(e,t,a){},26:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(15),i=a.n(s),c=(a(22),a(4)),o=a(5),l=a(1),u=a(6),d=a(7),h=(a(23),a(9)),m=a(10),v=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={email:"",password:""},n.handleChange=n.handleChange.bind(Object(l.a)(n)),n}return Object(o.a)(a,[{key:"handleSubmit",value:function(e){e.preventDefault();var t=Object(m.a)({},this.state);this.props.onLogin(t)}},{key:"handleChange",value:function(e){this.setState(Object(h.a)({},e.target.id,e.target.value))}},{key:"handleFailedLogin",value:function(e){if(e)return r.a.createElement("div",{style:{color:"red"}},"Invalid email or password!")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,this.handleFailedLogin(this.props.failedLogin),r.a.createElement("form",{onSubmit:function(t){return e.handleSubmit(t)}},r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"mail"},"email:",r.a.createElement("input",{name:"email",id:"email",type:"email",value:this.state.email,onChange:this.handleChange}))),r.a.createElement("div",null,r.a.createElement("label",{htmlFor:"pass"},"password:",r.a.createElement("input",{name:"password",id:"password",type:"password",value:this.state.password,onChange:this.handleChange}))),r.a.createElement("input",{type:"submit",value:"Log in"})),r.a.createElement("button",{onClick:function(){return e.props.onStateChange(2)}},"Sign up"))}}]),a}(r.a.Component),p=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={name:"",email:"",password:""},n.handleChange=n.handleChange.bind(Object(l.a)(n)),n}return Object(o.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(h.a)({},e.target.id,e.target.value))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t=Object(m.a)({},this.state);this.props.onSignup(t)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",null,"Sign up"),r.a.createElement("form",{onSubmit:function(t){return e.handleSubmit(t)}},r.a.createElement("label",{htmlFor:"name"},"User name:",r.a.createElement("input",{name:"name",id:"name",type:"text",value:this.state.name,onChange:this.handleChange})),r.a.createElement("label",{htmlFor:"email"},"e-mail:",r.a.createElement("input",{name:"email",id:"email",type:"email",value:this.state.email,onChange:this.handleChange})),r.a.createElement("label",{htmlFor:"password"},"password:",r.a.createElement("input",{name:"password",id:"password",type:"password",value:this.state.password,onChange:this.handleChange})),r.a.createElement("input",{type:"submit",value:"Sign Up"})),r.a.createElement("button",{onClick:function(){return e.props.onStateChange(0)}},"Login"))}}]),a}(r.a.Component),f=a(2);function g(e){return r.a.createElement("nav",{className:"menu"},r.a.createElement("ul",{style:{listStyle:"none"}},r.a.createElement("li",{onClick:function(){return e.setServiceId(0)}},"Services list"),r.a.createElement("li",{onClick:function(){return e.setServiceId(-1)}},"Edit user"),e.serviceId>0?r.a.createElement(r.a.Fragment,null,r.a.createElement("li",{onClick:function(){return e.setSubService(0)}},"Service info"),r.a.createElement("li",{onClick:function(){return e.setSubService(1)}},"Levels"),r.a.createElement("li",{onClick:function(){return e.setSubService(2)}},"Patrons"),r.a.createElement("li",{onClick:function(){return e.setSubService(3)}},"To Do")):r.a.createElement("br",null),r.a.createElement("li",{onClick:function(){return e.onLogout(0)}},"Logout")))}function E(e){return r.a.createElement("div",null,"User Edit")}var b=a(3),S=a.n(b),y=a(8);function k(e){var t=r.a.useState([]),a=Object(f.a)(t,2),n=a[0],s=a[1];return r.a.useEffect((function(){function t(){return(t=Object(y.a)(S.a.mark((function e(t){var a,n,i;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=[],e.next=3,window.fetch("".concat(t.serverAddress,"/services"),{mode:"cors",headers:{Authorization:"Bearer ".concat(t.token)}});case 3:if(!(n=e.sent).ok){e.next=9;break}return e.next=7,n.json();case 7:i=e.sent,a=i.map((function(e){return r.a.createElement("li",{key:e.id,onClick:function(){return t.setServiceId(e.id)}},e.name)}));case 9:s(a);case 10:case"end":return e.stop()}}),e)})))).apply(this,arguments)}console.log("serviceList render"),function(e){t.apply(this,arguments)}(e)}),[e]),r.a.createElement("div",null,r.a.createElement("p",null,"Service List"),r.a.createElement("ul",{style:{listStyle:"none"}},n))}var O=a(13),j=a(16);a(25);function C(e){var t,a=[],n=Object(O.a)(e.keys);try{for(n.s();!(t=n.n()).done;){var s=t.value;a.push(r.a.createElement("div",{className:"data-cell",key:s,onDoubleClick:function(t){return e.onRowClick(t,e.data)}},"".concat(e.data[s])))}}catch(i){n.e(i)}finally{n.f()}return r.a.createElement("div",{className:"data-row"},a)}function w(e){var t=e.optionList.map((function(e){return r.a.createElement("option",{key:e,value:e},e)}));return r.a.createElement("span",{className:"data-cell"},r.a.createElement("select",{id:e.entry[0],name:e.entry[0],defaultValue:e.entry[1],onChange:function(t){return e.handleChange(t)}},t))}function L(e){return r.a.createElement("span",{className:"data-cell"},r.a.createElement("input",{id:e.entry[0],name:e.entry[0],size:16,value:e.entry[1]||"",onChange:function(t){return e.handleChange(t)}}))}var A=["done","for shipment","in progress","new"],I=new Map([["user",L],["active",function(e){return r.a.createElement("span",{className:"data-cell"},r.a.createElement("input",{type:"checkbox",id:e.entry[0],name:e.entry[0],checked:e.entry[1],onChange:function(t){return e.handleChange(t)}}))}],["value",function(e){return r.a.createElement("span",{className:"data-cell"},r.a.createElement("input",{id:e.entry[0],name:e.entry[0],type:"number",min:0,value:e.entry[1],onChange:function(t){return e.handleChange(t)}}))}],["status",w]]),x=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).state={formData:Object(m.a)({},e.dataPoint)},n.types=e.types||I,n.changeHandler=n.changeHandler.bind(Object(l.a)(n)),n}return Object(o.a)(a,[{key:"changeHandler",value:function(e){console.log("id:".concat(e.target.id," val:").concat(e.target.value));var t=this.state.formData;t[e.target.id]=e.target.value,this.setState({formData:t})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.props.onHandleEdit(this.state.formData)}},{key:"render",value:function(){var e=this,t=Object.entries(this.state.formData).map((function(t){var a=e.types.get(t[0]);return a?r.a.createElement(a,{key:t[0],entry:t,optionList:e.props.options||A,handleChange:e.changeHandler}):r.a.createElement("div",{className:"data-cell",key:t[0]},t[1])}));return r.a.createElement("form",{onSubmit:function(t){return e.handleSubmit(t)},className:"data-row"},t,r.a.createElement("input",{type:"submit",value:"Save",className:"data-cell"}))}}]),a}(r.a.Component),D=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;Object(c.a)(this,a),n=t.call(this,e);for(var r=new Map,s=0,i=Object.keys(n.props.data[0]);s<i.length;s++){var o=i[s];r.set(o,!0)}var u=new Map;return n.props.data.forEach((function(e){return u.set(e.id,e)})),n.types=n.props.types||null,n.state={editFocus:-1,sortMap:r,dataMap:u},n.handleSort=n.handleSort.bind(Object(l.a)(n)),n.handleDataRow=n.handleDataRow.bind(Object(l.a)(n)),n.handleEdit=n.handleEdit.bind(Object(l.a)(n)),n}return Object(o.a)(a,[{key:"handleSort",value:function(e){var t=new Map(this.state.sortMap),a=Object(j.a)(this.state.dataMap.values()).sort((function(a,n){return a[e]===n[e]?0:t.get(e)?a[e]>n[e]?1:-1:a[e]<n[e]?1:-1})),n=new Map;a.forEach((function(e){return n.set(e.id,e)})),t.set(e,!t.get(e)),this.setState({dataMap:n,sortMap:t})}},{key:"handleDataRow",value:function(e,t){console.log(e.target),console.log(e.target.parentNode),console.log(t),this.setState({editFocus:t.id})}},{key:"handleEdit",value:function(e){console.log(e);var t=new Map(this.state.dataMap);t.set(this.state.editFocus,e),this.setState({editFocus:-1,dataMap:t})}},{key:"render",value:function(){var e,t=this,a=this.state,n=a.dataMap,s=a.sortMap,i=a.editFocus,c=Array.from(s.keys()),o=c.map((function(e){return r.a.createElement("div",{className:"data-header-cell",key:e,onClick:function(){return t.handleSort(e)}},e)})),l=[],u=Object(O.a)(n);try{for(u.s();!(e=u.n()).done;){var d=e.value;d[0]===i?l.push(r.a.createElement(x,{key:d[0],dataPoint:n.get(i),onHandleEdit:this.handleEdit,types:this.types})):l.push(r.a.createElement(C,{key:d[0],data:d[1],keys:c,onRowClick:this.handleDataRow}))}}catch(h){u.e(h)}finally{u.f()}return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"data-table"},r.a.createElement("div",{className:"data-row"},o),l))}}]),a}(r.a.Component);function M(e){var t=r.a.useState(null),a=Object(f.a)(t,2),n=a[0],s=a[1];return r.a.useEffect((function(){function t(){return(t=Object(y.a)(S.a.mark((function t(){var a,n;return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.fetch("".concat(e.serverAddress,"/services/").concat(e.serviceId,"/levels"),{mode:"cors",headers:{Authorization:"Bearer ".concat(e.token)}});case 2:if(!(a=t.sent).ok){t.next=8;break}return t.next=6,a.json();case 6:n=t.sent,s(n);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e]),r.a.createElement("div",null,n?r.a.createElement(D,{data:n}):r.a.createElement("div",null,"Loading Level List..."))}function N(e){var t=r.a.useState(null),a=Object(f.a)(t,2),n=a[0],s=a[1];return r.a.useEffect((function(){function t(){return(t=Object(y.a)(S.a.mark((function t(){var a,n;return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.fetch("".concat(e.serverAddress,"/services/").concat(e.serviceId,"/patrons"),{mode:"cors",headers:{Authorization:"Bearer ".concat(e.token)}});case 2:if(!(a=t.sent).ok){t.next=8;break}return t.next=6,a.json();case 6:n=t.sent,s(n);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e]),r.a.createElement("div",null,n?r.a.createElement(D,{data:n}):r.a.createElement("div",null,"Loading Patron List..."))}var P=function e(t){for(var a={},n=0,r=Object.entries(t);n<r.length;n++){var s=r[n];if(s[1]&&"object"===typeof s[1]){var i=e(s[1]);Object.assign(a,i)}else a[s[0]]=s[1]}return a};function R(e){var t=r.a.useState(null),a=Object(f.a)(t,2),n=a[0],s=a[1],i=r.a.useState(null),c=Object(f.a)(i,2),o=(c[0],c[1]),l=new Map([["status",w],["notes",L],["reward",L]]);return r.a.useEffect((function(){function t(){return(t=Object(y.a)(S.a.mark((function t(){var a,n,r;return S.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,window.fetch("".concat(e.serverAddress,"/services/").concat(e.serviceId,"/complex"),{mode:"cors",headers:{Authorization:"Bearer ".concat(e.token)}});case 2:if(!(a=t.sent).ok){t.next=11;break}return t.next=6,a.json();case 6:n=t.sent,o(n),r=n.map((function(e){return P(e)})),console.log(r),s(r);case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}!function(){t.apply(this,arguments)}()}),[e]),r.a.createElement("div",null,n?r.a.createElement(D,{data:n,types:l}):r.a.createElement("div",null,"Loading Patron List..."))}function F(e){var t=r.a.useState(r.a.createElement("p",null,"Service not loaded")),a=Object(f.a)(t,2),n=a[0],s=a[1];return r.a.useLayoutEffect((function(){switch(console.log("Service Layout Effect fired"),e.subService){case 1:s(r.a.createElement(M,{serviceId:e.serviceId,token:e.token,serverAddress:e.serverAddress}));break;case 2:s(r.a.createElement(N,{serviceId:e.serviceId,token:e.token,serverAddress:e.serverAddress}));break;case 3:s(r.a.createElement(R,{serviceId:e.serviceId,token:e.token,serverAddress:e.serverAddress}));break;default:s(r.a.createElement("div",null,"Service Main"))}}),[e]),r.a.createElement("div",null,r.a.createElement("span",{style:{margin:"15px"}},"service ID ",e.serviceId),n)}function _(e){var t=r.a.useState(0),a=Object(f.a)(t,2),n=a[0],s=a[1],i=r.a.useState(0),c=Object(f.a)(i,2),o=c[0],l=c[1];return r.a.createElement("div",{className:"user-panel"},r.a.createElement(g,{serviceId:n,setServiceId:s,setSubService:l,onLogout:e.onStateChange}),n>0?r.a.createElement(F,{serviceId:n,subService:o,serverAddress:e.serverAddress,token:e.token}):-1===n?r.a.createElement(E,null):r.a.createElement(k,{serverAddress:e.serverAddress,token:e.token,setServiceId:s}))}var T=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).serverAddress=e.serverAddress,n.userStates=["logged out","logged in","signing up"],n.state={userState:0,token:null,failedLogin:!1},n.handleUserState=n.handleUserState.bind(Object(l.a)(n)),n.handleLogin=n.handleLogin.bind(Object(l.a)(n)),n.handleSignup=n.handleSignup.bind(Object(l.a)(n)),n}return Object(o.a)(a,[{key:"handlePage",value:function(e){switch(e){case 1:return r.a.createElement(_,{serverAddress:this.serverAddress,onStateChange:this.handleUserState,token:this.state.token});case 2:return r.a.createElement(p,{onStateChange:this.handleUserState,onSignup:this.handleSignup});default:return r.a.createElement(v,{onStateChange:this.handleUserState,onLogin:this.handleLogin,failedLogin:this.state.failedLogin})}}},{key:"handleUserState",value:function(e){e!==this.state.userState&&(2===e?this.setState({userState:e}):this.setState({userState:e,token:null}))}},{key:"handleLogin",value:function(e){var t=this;window.fetch("".concat(this.serverAddress,"/login"),{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.status<400?e.json():(t.setState({userState:0,failedLogin:!0}),"login failed!")})).then((function(e){e.token&&t.setState({token:e.token,userState:1,failedLogin:!1})})).catch((function(e){return console.log(e)}))}},{key:"handleSignup",value:function(e){var t=this;window.fetch("".concat(this.serverAddress,"/signup"),{method:"POST",mode:"cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.status<400?e.json():"signup failed"})).then((function(e){return console.log(e),t.setState({userState:0}),"signup successfull"})).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){return r.a.createElement("div",{id:"App"},r.a.createElement("div",null,"current state: ",this.userStates[this.state.userState]),this.handlePage(this.state.userState))}}]),a}(r.a.Component);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(T,{serverAddress:Object({NODE_ENV:"production",PUBLIC_URL:"/patron-helper-front",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,REACT_APP_SERV_URI:"https://patron-helper-test-back.herokuapp.com/"}).REACT_APP_SERVER_URI||"https://patron-helper-test-back.herokuapp.com/"})),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.8196f991.chunk.js.map