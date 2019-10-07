function create () {
    var eventTarget = function (e) {
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
        onEach = function (o, fun) {
            if (o instanceof Array) {
                o.forEach(fun)
            } else {
                for (var i in o) o.hasOwnProperty(i) && fun(o[i], i);
            }
        };

    /**
     * [ description]
     * @param  {[type]} node    [description]
     * @param  {[type]} attrAct [description]
     * @param  {[type]} attrPar [description]
     * @return {[type]}         [description]
     */
    var Area = function (node, attrAct, attrPar) {
        this.node = node;
        this.attrAct = attrAct || false;
        this.attrPar = attrPar || false;
        this.map = {};
        this.binded = false;
        this.listening = true;
    };
    /**
     * [ description]
     * @param  {[type]} eventType [description]
     * @param  {[type]} func      [description]
     * @param  {[type]} action    [description]
     * @param  {[type]} bubble    [description]
     * @return {[type]}           [description]
     */
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

    /**
     * [ description]
     * @param  {[type]} eventType [description]
     * @param  {[type]} action    [description]
     * @return {[type]}           [description]
     */
    Area.prototype.clean = function (eventType, action) {
        this.map[eventType] &&
            !!action
            ? (this.map[eventType][action] && (delete this.map[eventType][action]))
            : (delete this.map[eventType]);
    };

    /**
     * [ description]
     * @return {[type]} [description]
     */
    Area.prototype.enable = function () { this.listening = true; };

    /**
     * [ description]
     * @return {[type]} [description]
     */
    Area.prototype.disable = function () { this.listening = false; };

    /**
     * [ description]
     * @return {[type]} [description]
     */
    Area.prototype.bind = function () {
        var self = this;
        // console.debug(JSON.stringify(self.map));
        if (!self.binded) {
            // loop the map
            onEach(self.map, function (fnArr, ev) {
                onEach(fnArr, function (fn, i) {
                    self.node.addEventListener(ev, function (e) {
                        if (!self.listening) { return false; }

                        var trg = eventTarget(e),
                            realtrg = e.currentTarget,
                            eventType = e.type,
                            act = trg.dataset[self.attrAct],
                            par = trg.dataset[self.attrPar];

                        // if is array
                        if (fn instanceof Array) {
                            act = act.length ? act.split('|') : false;
                            if (!act) { return false; }
                            par = { 'event': e, 'node': trg, 'realtarget': realtrg, 'params': par.length ? getParams(par) : false };

                            onEach(act, function (a) {
                                self.map[eventType] &&
                                    self.map[eventType][a] &&
                                    (function (el, p) {
                                        onEach(el, function (f) {
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


    return {
        list: [],
        add: function (node, attrAct, attrPar) {
            var newarea = new Area(node, attrAct, attrPar);
            this.list.push(newarea);
            return newarea;
        },
        disable: function () {
            onEach(this.list, function (e) {
                e.disable();
            });
        },
        enable: function () {
            onEach(this.list, function (e) {
                e.enable();
            });
        }
    };
}

    