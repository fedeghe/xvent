var xvent = (function () {

    var yyy = {
        click: {
            alert: [null, null]
        },
        dblclick: {
            alert2: [null]
        },
        mouseover: {
            overout: [null],
            blood: [null]
        },
        mouseout: {
            overout: [null]
        },
        change: {
            sel: [null]
        }
    }

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
        Area = function (node, attrAct, attrPar) {
            this.node = node;
            this.attrAct = attrAct || false;
            this.attrPar = attrPar || false;
            this.map = {};
            this.binded = false;
            this.listening = true;
        };

    Area.prototype.listen = function (eventType, func, action, bubble) {
        this.map[eventType] || (this.map[eventType] = action ? {} : []);
        // bubbles
        func['bubble'] = !!bubble;
        if (action) {
            this.map[eventType][action] || (this.map[eventType][action] = []);
            this.map[eventType][action].push(func);
        } else {
            this.map[eventType].push(func);
        }
        return this;
    };

    Area.prototype.clean = function (eventType, action) {
        this.map[eventType] &&
            !!action
            ? (this.map[eventType][action] && (delete this.map[eventType][action]))
            : (delete this.map[eventType]);
    };

    Area.prototype.enable = function () { this.listening = true; };

    Area.prototype.disable = function () { this.listening = false; };

    Area.prototype.bind = function () {
        var self = this;
        // console.debug(self.map)
        if (!self.binded) {
            // loop the map
            self.map.forEach()

            JMVC.each(self.map, function (fnArr, ev) {
                
                JMVC.each(fnArr, function (fn, i) {
                    JMVC.events.on(self.node, ev, function (e) {
                        if (!self.listening) { return false; }

                        var trg = eventTarget(e),
                            realtrg = e.currentTarget,
                            eventType = e.type,
                            act = JMVC.dom.attr(trg, self.attrAct),
                            par = JMVC.dom.attr(trg, self.attrPar);

                        // if is array
                        if (fn instanceof Array) {
                            act = act.length ? act.split('|') : false;
                            if (!act) { return false; }
                            par = { 'event': e, 'node': trg, 'realtarget': realtrg, 'params': par.length ? getParams(par) : false };

                            JMVC.each(act, function (a) {
                                self.map[eventType] &&
                                    self.map[eventType][a] &&
                                    (function (el, p) {
                                        JMVC.each(el, function (f) {
                                            f(p, trg, realtrg);
                                            !f.bubble && stopPropagation(e);
                                        });
                                    })(self.map[eventType][a], par);
                            });
                        } else {
                            fn.apply(self.node, [e, trg, realtrg]);
                            !fn.bubble && stopPropagation(e);
                        }
                    });
                });
            });
            this.binded = true;
        }
    };

    function getParams (att) {
        return JSON.parse(att.replace(/'/g, '"'));
    }

    return {
        list: [],
        add: function (node, attrAct, attrPar) {
            var newarea = new Area(node, attrAct, attrPar);
            this.list.push(newarea);
            return newarea;
        },
        disable: function () {
            JMVC.each(this.list, function (e) {
                e.disable();
            });
        },
        enable: function () {
            JMVC.each(this.list, function (e) {
                e.enable();
            });
        }
    };

})();