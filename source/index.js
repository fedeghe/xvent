
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

    };



    Area.prototype.bind = function () {
  
    };
