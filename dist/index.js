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
var xvent=function(){function t(t){return JSON.parse(t.replace(/'/g,'"'))}var n=function(t){t=t||JMVC.W.event;var n=t.currentTarget||void 0!==t.target?t.target:t.srcElement;if(!n)return!1;for(;3===n.nodeType&&null!==n.parentNode;)n=n.parentNode;return n},e=function(t){t.stopPropagation&&t.stopPropagation(),null!==t.cancelBubble&&(t.cancelBubble=!0)},i=function(t,n,e){this.node=t,this.attrAct=n||!1,this.attrPar=e||!1,this.map={},this.binded=!1,this.listening=!0};return i.prototype.listen=function(t,n,e,i){return this.map[t]||(this.map[t]=e?{}:[]),n.bubble=!!i,e?(this.map[t][e]||(this.map[t][e]=[]),this.map[t][e].push(n)):this.map[t].push(n),this},i.prototype.clean=function(t,n){this.map[t]&&n?this.map[t][n]&&delete this.map[t][n]:delete this.map[t]},i.prototype.enable=function(){this.listening=!0},i.prototype.disable=function(){this.listening=!1},i.prototype.bind=function(){var i=this;i.binded||(i.map.forEach(),JMVC.each(i.map,function(a,r){JMVC.each(a,function(a,o){JMVC.events.on(i.node,r,function(r){if(!i.listening)return!1;var o=n(r),s=r.currentTarget,p=r.type,u=JMVC.dom.attr(o,i.attrAct),c=JMVC.dom.attr(o,i.attrPar);if(a instanceof Array){if(!(u=!!u.length&&u.split("|")))return!1;c={event:r,node:o,realtarget:s,params:!!c.length&&t(c)},JMVC.each(u,function(t){i.map[p]&&i.map[p][t]&&function(t,n){JMVC.each(t,function(t){t(n,o,s),!t.bubble&&e(r)})}(i.map[p][t],c)})}else a.apply(i.node,[r,o,s]),!a.bubble&&e(r)})})}),this.binded=!0)},{list:[],add:function(t,n,e){var a=new i(t,n,e);return this.list.push(a),a},disable:function(){JMVC.each(this.list,function(t){t.disable()})},enable:function(){JMVC.each(this.list,function(t){t.enable()})}}}();