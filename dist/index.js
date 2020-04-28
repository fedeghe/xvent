/*
                _                                       s
               u                                       :8
   uL   ..    88Nu.   u.                u.    u.      .88
 .@88b  @88R '88888.o888c      .u     x@88k u@88c.   :888ooo
'"Y888k/"*P   ^8888  8888   ud8888.  ^"8888""8888" -*8888888
   Y888L       8888  8888 :888'8888.   8888  888R    8888
    8888       8888  8888 d888 '88%"   8888  888R    8888
    `888N      8888  8888 8888.+"      8888  888R    8888
 .u./"888&    .8888b.888P 8888L        8888  888R   .8888Lu=
d888" Y888*"   ^Y8888*""  '8888c. .+  "*88*" 8888"  ^%888*
` "Y   Y"        `Y"       "88888%      ""   'Y"      'Y"
                             "YP'
1.0.0
*/
function Xvent(){var eventTarget=function(t){var a=t.currentTarget||void 0!==t.target?t.target:t.srcElement;if(!a)return!1;for(;3===a.nodeType&&null!==a.parentNode;)a=a.parentNode;return a},stopPropagation=function(t){t.stopPropagation&&t.stopPropagation(),null!==t.cancelBubble&&(t.cancelBubble=!0)},getParams=function(att){return eval("var t = "+att),t},xEach=function(t,a){if(t instanceof Array)t.forEach(a);else for(var n in t)t.hasOwnProperty(n)&&a(t[n],n)},Area=function(t,a,n){this.node=t,this.attrAct=a||!1,this.attrPar=n||!1,this.map={},this.binded=!1,this.listening=!0};return Area.prototype.listen=function(t,a,n,e){return this.map[t]||(this.map[t]=n?{}:[]),a.bubble=!!e,n?(this.map[t][n]||(this.map[t][n]=[]),this.map[t][n].push(a)):this.map[t].push(a),this},Area.prototype.clean=function(t,a){this.map[t]&&a?this.map[t][a]&&delete this.map[t][a]:delete this.map[t]},Area.prototype.enable=function(){this.listening=!0},Area.prototype.disable=function(){this.listening=!1},Area.prototype.bind=function(){var t=this;t.binded||(xEach(t.map,function(a,n){xEach(a,function(a,e){t.node.addEventListener(n,function(n){if(!t.listening)return!1;var i=eventTarget(n),r=n.currentTarget,o=n.type,p=i.dataset[t.attrAct];act=p?p.split(","):[],parTmp=i.dataset[t.attrPar],par=parTmp?getParams(parTmp):{},parameters=[n,par,i,r],0===act.length||act.indexOf(e)<0||(a instanceof Array?xEach(act,function(a){t.map[o]&&t.map[o][a]&&function(a){xEach(a,function(a){!a.bubble&&stopPropagation(n),a.apply(t.node,parameters)})}(t.map[o][a])}):(!a.bubble&&stopPropagation(n),a.apply(t.node,parameters)))})})}),console.log(t.map),this.binded=!0)},{list:[],add:function(t,a,n){var e=new Area(t,a,n);return this.list.push(e),e},disable:function(){xEach(this.list,function(t){t.disable()})},enable:function(){xEach(this.list,function(t){t.enable()})}}}