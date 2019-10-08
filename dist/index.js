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
function create(){var eventTarget=function(t){var n=t.currentTarget||void 0!==t.target?t.target:t.srcElement;if(!n)return!1;for(;3===n.nodeType&&null!==n.parentNode;)n=n.parentNode;return n},stopPropagation=function(t){t.stopPropagation&&t.stopPropagation(),null!==t.cancelBubble&&(t.cancelBubble=!0)},getParams=function(att){return eval("var t = "+att),t},onEach=function(t,n){if(t instanceof Array)t.forEach(n);else for(var a in t)t.hasOwnProperty(a)&&n(t[a],a)},Area=function(t,n,a){this.node=t,this.attrAct=n||!1,this.attrPar=a||!1,this.map={},this.binded=!1,this.listening=!0};return Area.prototype.listen=function(t,n,a,e){return this.map[t]||(this.map[t]=a?{}:[]),n.bubble=!!e,a?(this.map[t][a]||(this.map[t][a]=[]),this.map[t][a].push(n)):this.map[t].push(n),this},Area.prototype.clean=function(t,n){this.map[t]&&n?this.map[t][n]&&delete this.map[t][n]:delete this.map[t]},Area.prototype.enable=function(){this.listening=!0},Area.prototype.disable=function(){this.listening=!1},Area.prototype.bind=function(){var t=this;t.binded||(onEach(t.map,function(n,a){onEach(n,function(n,e){t.node.addEventListener(a,function(a){if(!t.listening)return!1;var i=eventTarget(a),r=a.currentTarget,o=a.type,p=i.dataset[t.attrAct];act=p?p.split(","):[],parTmp=i.dataset[t.attrPar],par=parTmp?getParams(parTmp):{},parameters=[a,par,i,r],0===act.length||act.indexOf(e)<0||(n instanceof Array?onEach(act,function(n){t.map[o]&&t.map[o][n]&&function(n){onEach(n,function(n){!n.bubble&&stopPropagation(a),n.apply(t.node,parameters)})}(t.map[o][n])}):(!n.bubble&&stopPropagation(a),n.apply(t.node,parameters)))})})}),console.log(t.map),this.binded=!0)},{list:[],add:function(t,n,a){var e=new Area(t,n,a);return this.list.push(e),e},disable:function(){onEach(this.list,function(t){t.disable()})},enable:function(){onEach(this.list,function(t){t.enable()})}}}