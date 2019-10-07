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
function create(){var eventTarget=function(t){var n=t.currentTarget||void 0!==t.target?t.target:t.srcElement;if(!n)return!1;for(;3===n.nodeType&&null!==n.parentNode;)n=n.parentNode;return n},stopPropagation=function(t){t.stopPropagation&&t.stopPropagation(),null!==t.cancelBubble&&(t.cancelBubble=!0)},getParams=function(att){return eval("var t = "+att),t},onEach=function(t,n){if(t instanceof Array)t.forEach(n);else for(var e in t)t.hasOwnProperty(e)&&n(t[e],e)},Area=function(t,n,e){this.node=t,this.attrAct=n||!1,this.attrPar=e||!1,this.map={},this.binded=!1,this.listening=!0};return Area.prototype.listen=function(t,n,e,a){return this.map[t]||(this.map[t]=e?{}:[]),n.bubble=!!a,e?(this.map[t][e]||(this.map[t][e]=[]),this.map[t][e].push(n)):this.map[t].push(n),this},Area.prototype.clean=function(t,n){this.map[t]&&n?this.map[t][n]&&delete this.map[t][n]:delete this.map[t]},Area.prototype.enable=function(){this.listening=!0},Area.prototype.disable=function(){this.listening=!1},Area.prototype.bind=function(){var t=this;t.binded||(onEach(t.map,function(n,e){onEach(n,function(n,a){t.node.addEventListener(e,function(e){if(!t.listening)return!1;var a=eventTarget(e),i=e.currentTarget,r=e.type,o=a.dataset[t.attrAct],s=a.dataset[t.attrPar];if(n instanceof Array){if(!(o=!!o.length&&o.split("|")))return!1;s={event:e,node:a,realtarget:i,params:!!s.length&&getParams(s)},onEach(o,function(n){t.map[r]&&t.map[r][n]&&function(t,n){onEach(t,function(t){t(n,a,i),!t.bubble&&stopPropagation(e)})}(t.map[r][n],s)})}else n.apply(t.node,[e,a,i]),!n.bubble&&stopPropagation(e)})})}),this.binded=!0)},{list:[],add:function(t,n,e){var a=new Area(t,n,e);return this.list.push(a),a},disable:function(){onEach(this.list,function(t){t.disable()})},enable:function(){onEach(this.list,function(t){t.enable()})}}}