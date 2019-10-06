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

    var eventTarget = function (e) {
            e = e || JMVC.W.event;
            var targetElement = e.currentTarget || (typeof e.target !== 'undefined') ? e.target : e.srcElement;
            if (!targetElement) {
                return false;
            }

            while (targetElement.nodeType === 3 && targetElement.parentNode !== null) {
                targetElement = targetElement.parentNode;
            }

            return targetElement;  
        },
        stopPropagation = function (e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            if (e.cancelBubble !== null) {
                e.cancelBubble = true;
            }
        },
        getParams = function (att) {
            eval('var t = '+ att)
            return t;
            // return JSON.parse(att.replace(/'/g, '"'));
        },
        onHash = function (o, fun) {
            for (var i in o) o.hasOwnProperty(i) && fun(o[i], i);
        },
        Area = function (node, attrAct, attrPar) {
            this.node = node;
            this.attrAct = attrAct || false;
            this.attrPar = attrPar || false;
            this.map = {};
            this.binded = false;
            this.listening = true;
        };

    Area.prototype.listen = function (eventType, func, action, bubble) {
        return this;
    };



    Area.prototype.bind = function () {
  
    };
