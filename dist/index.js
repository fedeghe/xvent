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
function create(){var eventTarget=function(t){var n=t.currentTarget||void 0!==t.target?t.target:t.srcElement;if(!n)return!1;for(;3===n.nodeType&&null!==n.parentNode;)n=n.parentNode;return n},stopPropagation=function(t){t.stopPropagation&&t.stopPropagation(),null!==t.cancelBubble&&(t.cancelBubble=!0)},getParams=function(att){return eval("var t = "+att),t},onEach=function(t,n){if(t instanceof Array)t.forEach(n);else for(var e in t)t.hasOwnProperty(e)&&n(t[e],e)},Area=function(t,n,e){this.node=t,this.attrAct=n||!1,this.attrPar=e||!1,this.map={},this.binded=!1,this.listening=!0};return Area.prototype.listen=function(t,n,e,a){return this.map[t]||(this.map[t]=e?{}:[]),n.bubble=!!a,e?(this.map[t][e]||(this.map[t][e]=[]),this.map[t][e].push(n)):this.map[t].push(n),this},Area.prototype.clean=function(t,n){this.map[t]&&n?this.map[t][n]&&delete this.map[t][n]:delete this.map[t]},Area.prototype.enable=function(){this.listening=!0},Area.prototype.disable=function(){this.listening=!1},Area.prototype.bind=function(){var t=this;t.binded||(onEach(t.map,function(n,e){onEach(n,function(n,a){t.node.addEventListener(e,function(e){if(!t.listening)return!1;var i=eventTarget(e),r=e.currentTarget,o=e.type,s=i.dataset[t.attrAct],p=i.dataset[t.attrPar],c=p?getParams(p):{},u=[e,c,i,r];if(a===s)if(n instanceof Array){if(!(s=!!s.length&&s.split("|")))return!1;onEach(s,function(n){t.map[o]&&t.map[o][n]&&function(n){onEach(n,function(n){!n.bubble&&stopPropagation(e),n.apply(t.node,u)})}(t.map[o][n])})}else!n.bubble&&stopPropagation(e),n.apply(t.node,u)})})}),console.log(t.map),this.binded=!0)},{list:[],add:function(t,n,e){var a=new Area(t,n,e);return this.list.push(a),a},disable:function(){onEach(this.list,function(t){t.disable()})},enable:function(){onEach(this.list,function(t){t.enable()})}}}