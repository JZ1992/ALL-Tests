! function() {
    function a(a) {
        b.r([c[a]])
    }
    var b = {
        r: function(a) {
            if (b[a].inited) return b[a].value;
            if ("function" != typeof b[a].value) return b[a].inited = !0, b[a].value;
            var c = {
                    exports: {}
                },
                d = b[a].value(null, c.exports, c);
            if (b[a].inited = !0, b[a].value = d, void 0 !== d) return d;
            for (var e in c.exports)
                if (c.exports.hasOwnProperty(e)) return b[a].inited = !0, b[a].value = c.exports, c.exports
        }
    };
    b[0] = {
        value: function() {
            function a(d, e, f, g) {
                return g = 0 | g, g > b ? f : (g++, c.each(f, function(b, f) {
                    d ? !b || "object" != typeof b && "function" != typeof b ? e[f] = b : (e[f] = e[f] || (c.isArray(b) ? [] : {}), e[f] = a(d, e[f], b, g)) : e[f] = b
                }), e)
            }
            var b = 10,
                c = {
                    extend: function(b, d) {
                        var e = !1;
                        if ("boolean" == typeof b ? (e = b, b = d, d = [].splice.call(arguments, 2)) : d = [].splice.call(arguments, 1), !b) throw new Error("Utils: extend, target can not be empty");
                        return c.each(d, function(c) {
                            (c && "object" == typeof c || "function" == typeof c) && a(e, b, c)
                        }), b
                    },
                    contains: function(a, b) {
                        return a.contains ? a.contains(b) : a.compareDocumentPosition ? !!(16 & a.compareDocumentPosition(b)) : void 0
                    },
                    getRect: function(a) {
                        return a.getBoundingClientRect()
                    },
                    isArray: function(a) {
                        return a && "[object Array]" === {}.toString.call(a)
                    },
                    isString: function(a) {
                        return "string" == typeof a
                    },
                    proxy: function(a, b) {
                        return function() {
                            return a.apply(b, arguments)
                        }
                    },
                    each: function(a, b) {
                        if (a)
                            if ("length" in a && "number" == typeof a.length)
                                for (var c = 0, d = a.length; d > c && b.call(null, a[c], c, a) !== !1; c++);
                            else
                                for (var e in a)
                                    if (a.hasOwnProperty(e) && b.call(null, a[e], e, a) === !1) break
                    }
                };
            return c
        }
    }, b[1] = {
        value: function() {
            var a = b.r(20);
            return a.createClass("Component", {
                constructor: function() {}
            })
        }
    }, b[2] = {
        value: function() {
            function a() {
                return ++d
            }
            var c = {},
                d = 0,
                e = !0,
                f = b.r(3),
                g = b.r(0),
                h = function(a) {
                    var b = a.type,
                        d = a.target,
                        f = this.__kfe_eid,
                        h = /^(?:before|after)/.test(b),
                        j = c[f][b];
                    return h || (i.trigger(d, "before" + b), e !== !1) ? (g.each(j, function(b) {
                        return b && b.call(d, a) === !1 ? e = !1 : void 0
                    }), void(h || i.trigger(d, "after" + b))) : (e = !0, !1)
                },
                i = {
                    addEvent: function(b, d, e) {
                        var f = !0,
                            g = null;
                        b.__kfe_eid || (f = !1, b.__kfe_eid = a(), c[b.__kfe_eid] = {}), g = c[b.__kfe_eid], g[d] || (f = !1, g[d] = []), g[d].push(e), f || b.addEventListener(d, h, !1)
                    },
                    trigger: function(a, b, c) {
                        c = c || f.createEvent(b, c), a.dispatchEvent(c)
                    }
                };
            return i
        }
    }, b[3] = {
        value: function() {
            return {
                createEvent: function(a) {
                    var b = document.createEvent("Event");
                    return b.initEvent(a, !0, !0), b
                }
            }
        }
    }, b[4] = {
        value: function() {
            var a = {},
                c = b.r(0);
            return c.extend(a, c, b.r(2)), a
        }
    }, b[5] = {
        value: function() {
            var a = b.r(20),
                c = b.r(8),
                d = a.createClass("ControllerComponent", {
                    constructor: function(a) {
                        this.kfEditor = a, this.components = {}, this.initComponents()
                    },
                    initComponents: function() {
                        this.components.listener = new c(this, this.kfEditor)
                    }
                });
            return d
        }
    }, b[6] = {
        value: function() {
            var a = {
                32: "\\,",
                "s+219": "\\{",
                "s+221": "\\}",
                220: "\\backslash",
                "s+51": "\\#",
                "s+52": "\\$",
                "s+53": "\\%",
                "s+54": "\\^",
                "s+55": "\\&",
                "s+189": "\\_",
                "s+192": "\\~"
            };
            return {
                getReplaceString: function(b) {
                    return a[b] || null
                }
            }
        }
    }, b[7] = {
        value: function() {
            var a = b.r(20),
                c = b.r(4),
                d = b.r(6),
                e = {
                    LEFT: 37,
                    RIGHT: 39,
                    DELETE: 8,
                    INPUT: 229
                };
            return a.createClass("InputComponent", {
                constructor: function(a, b) {
                    this.parentComponent = a, this.kfEditor = b, this.inputBox = this.createInputBox(), this.initServices(), this.initCommands(), this.initEvent()
                },
                initServices: function() {
                    this.kfEditor.registerService("control.update.input", this, {
                        updateInput: this.updateInput
                    }), this.kfEditor.registerService("control.insert.string", this, {
                        insertStr: this.insertStr
                    })
                },
                initCommands: function() {
                    this.kfEditor.registerCommand("focus", this, this.focus)
                },
                createInputBox: function() {
                    var a = this.kfEditor.getContainer(),
                        b = this.kfEditor.getDocument().createElement("input");
                    return b.className = "kf-editor-input-box", b.type = "text", b.isTrusted = !1, a.appendChild(b), b
                },
                focus: function() {
                    var a = null;
                    this.inputBox.focus(), this.kfEditor.requestService("syntax.has.cursor.info") || (a = this.kfEditor.requestService("syntax.get.root.group.info"), this.kfEditor.requestService("syntax.update.record.cursor", {
                        groupId: a.id,
                        startOffset: 0,
                        endOffset: a.content.length
                    }), this.kfEditor.requestService("control.update.input")), this.kfEditor.requestService("control.reselect")
                },
                setUntrusted: function() {
                    this.inputBox.isTrusted = !1
                },
                setTrusted: function() {
                    this.inputBox.isTrusted = !0
                },
                updateInput: function() {
                    var a = this.kfEditor.requestService("syntax.serialization");
                    this.setUntrusted(), this.inputBox.value = a.str, this.inputBox.selectionStart = a.startOffset, this.inputBox.selectionEnd = a.endOffset, this.inputBox.focus(), this.setTrusted()
                },
                insertStr: function(a) {
                    var b = this.kfEditor.requestService("syntax.serialization"),
                        c = b.str;
                    c = c.substring(0, b.startOffset) + " " + a + " " + c.substring(b.endOffset), this.restruct(c), this.updateInput(), this.kfEditor.requestService("ui.update.canvas.view")
                },
                initEvent: function() {
                    var a = this;
                    c.addEvent(this.inputBox, "keydown", function(b) {
                        var c = !1;
                        if (b.ctrlKey) return void a.processUserCtrl(b);
                        switch (b.keyCode) {
                            case e.INPUT:
                                return;
                            case e.LEFT:
                                b.preventDefault(), a.leftMove(), c = !0;
                                break;
                            case e.RIGHT:
                                b.preventDefault(), a.rightMove(), c = !0;
                                break;
                            case e.DELETE:
                                b.preventDefault(), a.delete(), c = !0
                        }
                        c && a.kfEditor.requestService("ui.update.canvas.view"), a.pretreatmentInput(b) || b.preventDefault()
                    }), c.addEvent(this.inputBox, "input", function() {
                        a.processingInput()
                    }), c.addEvent(this.inputBox, "blur", function() {
                        a.kfEditor.requestService("ui.toolbar.disable"), a.kfEditor.requestService("ui.toolbar.close"), a.kfEditor.requestService("control.cursor.hide"), a.kfEditor.requestService("render.clear.select")
                    }), c.addEvent(this.inputBox, "focus", function() {
                        a.kfEditor.requestService("ui.toolbar.enable"), this.isTrusted && a.kfEditor.requestService("control.reselect")
                    }), c.addEvent(this.inputBox, "paste", function(a) {
                        a.preventDefault()
                    })
                },
                hasRootplaceholder: function() {
                    return this.kfEditor.requestService("syntax.has.root.placeholder")
                },
                leftMove: function() {
                    this.hasRootplaceholder() || (this.kfEditor.requestService("syntax.cursor.move.left"), this.update())
                },
                rightMove: function() {
                    this.hasRootplaceholder() || (this.kfEditor.requestService("syntax.cursor.move.right"), this.update())
                },
                "delete": function() {
                    var a = null;
                    this.hasRootplaceholder() || (a = this.kfEditor.requestService("syntax.delete.group"), a ? (this.updateInput(), this.processingInput()) : (this.updateInput(), this.kfEditor.requestService("control.reselect")))
                },
                processUserCtrl: function(a) {
                    switch (a.preventDefault(), a.keyCode) {
                        case 65:
                            this.kfEditor.requestService("control.select.all");
                            break;
                        case 83:
                            this.kfEditor.requestService("print.image")
                    }
                },
                pretreatmentInput: function(a) {
                    var b = this.getKeyCode(a),
                        c = d.getReplaceString(b);
                    return null === c ? !0 : (this.insertStr(c), !1)
                },
                getKeyCode: function(a) {
                    return (a.shiftKey ? "s+" : "") + a.keyCode
                },
                processingInput: function() {
                    this.restruct(this.inputBox.value), this.kfEditor.requestService("ui.update.canvas.view")
                },
                restruct: function(a) {
                    this.kfEditor.requestService("render.draw", a), this.kfEditor.requestService("control.reselect")
                },
                update: function() {
                    this.updateInput(), this.kfEditor.requestService("control.reselect")
                }
            })
        }
    }, b[8] = {
        value: function() {
            var a = b.r(20),
                c = b.r(9),
                d = b.r(7),
                e = b.r(10);
            return a.createClass("MoveComponent", {
                constructor: function(a, b) {
                    this.parentComponent = a, this.kfEditor = b, this.components = {}, this.initComponents()
                },
                initComponents: function() {
                    this.components.location = new c(this, this.kfEditor), this.components.selection = new e(this, this.kfEditor), this.components.input = new d(this, this.kfEditor)
                }
            })
        }
    }, b[9] = {
        value: function() {
            function a(a) {
                return a.getBoundingClientRect()
            }
            var c = b.r(20);
            return c.createClass("LocationComponent", {
                constructor: function(a, b) {
                    this.parentComponent = a, this.kfEditor = b, this.paper = this.getPaper(), this.cursorShape = this.createCursor(), this.initServices(), this.initEvent()
                },
                getPaper: function() {
                    return this.kfEditor.requestService("render.get.paper")
                },
                initServices: function() {
                    this.kfEditor.registerService("control.cursor.relocation", this, {
                        relocationCursor: this.updateCursor
                    }), this.kfEditor.registerService("control.cursor.hide", this, {
                        hideCursor: this.hideCursor
                    }), this.kfEditor.registerService("control.reselect", this, {
                        reselect: this.reselect
                    }), this.kfEditor.registerService("control.get.cursor.location", this, {
                        getCursorLocation: this.getCursorLocation
                    })
                },
                createCursor: function() {
                    var a = new c.Rect(1, 0, 0, 0).fill("black");
                    return a.setAttr("style", "display: none"), this.paper.addShape(a), a
                },
                initEvent: function() {
                    var a = this.kfEditor.request("ui.canvas.container.event"),
                        b = this;
                    a.on("mousedown", function(a) {
                        a.preventDefault(), b.updateCursorInfo(a), b.kfEditor.requestService("control.update.input"), b.reselect()
                    })
                },
                updateCursorInfo: function(a) {
                    var b = null,
                        c = null,
                        d = -1;
                    return this.kfEditor.requestService("syntax.has.root.placeholder") ? (this.kfEditor.requestService("syntax.update.record.cursor", {
                        groupId: this.kfEditor.requestService("syntax.get.root.group.info").id,
                        startOffset: 0,
                        endOffset: 1
                    }), !1) : (b = this.kfEditor.requestService("position.get.wrap", a.target), b && this.kfEditor.requestService("syntax.is.placeholder.node", b.id) ? (c = this.kfEditor.requestService("position.get.group.info", b), void this.kfEditor.requestService("syntax.update.record.cursor", c.group.id, c.index, c.index + 1)) : (c = this.kfEditor.requestService("position.get.group", a.target), null === c && (c = this.kfEditor.requestService("syntax.get.root.group.info")), d = this.getIndex(a.clientX, c), void this.kfEditor.requestService("syntax.update.record.cursor", c.id, d)))
                },
                hideCursor: function() {
                    this.cursorShape.setAttr("style", "display: none")
                },
                reselect: function() {
                    var a = this.kfEditor.requestService("syntax.get.record.cursor"),
                        b = null;
                    return this.hideCursor(), this.kfEditor.requestService("syntax.is.select.placeholder") ? (b = this.kfEditor.requestService("syntax.get.group.content", a.groupId), void this.kfEditor.requestService("render.select.group", b.content[a.startOffset].id)) : void(a.startOffset === a.endOffset ? (this.updateCursor(), this.kfEditor.requestService("render.tint.current.cursor")) : this.kfEditor.requestService("render.select.current.cursor"))
                },
                updateCursor: function() {
                    var b = this.kfEditor.requestService("syntax.get.record.cursor");
                    if (b.startOffset !== b.endOffset) return void this.hideCursor();
                    var c = this.kfEditor.requestService("syntax.get.group.content", b.groupId),
                        d = 0 === b.endOffset,
                        e = d ? 0 : b.endOffset - 1,
                        f = c.content[e],
                        g = a(this.paper.container.node),
                        h = 0,
                        i = a(f),
                        j = this.cursorShape.getTransform(this.cursorShape),
                        k = this.kfEditor.requestService("render.get.canvas.zoom"),
                        l = this.paper.getZoom();
                    this.cursorShape.setHeight(i.height / k / l), h = d ? i.left - 2 : i.left + i.width - 2, h -= g.left, j.m.e = Math.floor(h / k / l) + .5, j.m.f = (i.top - g.top) / k / l, this.cursorShape.setMatrix(j), this.cursorShape.setAttr("style", "display: block")
                },
                getCursorLocation: function() {
                    var a = this.cursorShape.getRenderBox("paper");
                    return {
                        x: a.x,
                        y: a.y
                    }
                },
                getIndex: function(b, c) {
                    for (var d = -1, e = c.content, f = null, g = e.length - 1, h = null; g >= 0; g--)
                        if (d = g, h = e[g], f = a(h), f.left < b) {
                            f.left + f.width / 2 < b && (d += 1);
                            break
                        }
                    return d
                }
            })
        }
    }, b[10] = {
        value: function() {
            var a = b.r(20),
                c = b.r(4),
                d = 10;
            return a.createClass("SelectionComponent", {
                constructor: function(a, b) {
                    this.parentComponent = a, this.kfEditor = b, this.isDrag = !1, this.isMousedown = !1, this.startPoint = {
                        x: -1,
                        y: -1
                    }, this.startGroupIsPlaceholder = !1, this.startGroup = {}, this.initServices(), this.initEvent()
                },
                initServices: function() {
                    this.kfEditor.registerService("control.select.all", this, {
                        selectAll: this.selectAll
                    })
                },
                initEvent: function() {
                    var a = this.kfEditor.request("ui.canvas.container.event"),
                        b = this;
                    a.on("mousedown", function(a) {
                        return a.preventDefault(), b.kfEditor.requestService("syntax.has.root.placeholder") ? !1 : (b.isMousedown = !0, b.updateStartPoint(a.clientX, a.clientY), void b.updateStartGroup())
                    }), a.on("mouseup", function(a) {
                        a.preventDefault(), b.stopUpdateSelection()
                    }), a.on("mousemove", function(a) {
                        if (a.preventDefault(), b.isDrag) {
                            if (1 !== a.which) return void b.stopUpdateSelection();
                            b.updateSelection(a.target, a.clientX, a.clientY)
                        } else b.isMousedown && d < b.getDistance(a.clientX, a.clientY) && (b.kfEditor.requestService("control.cursor.hide"), b.startUpdateSelection())
                    }), a.on("dblclick", function(a) {
                        b.updateSelectionByTarget(a.target)
                    })
                },
                getDistance: function(a, b) {
                    var c = Math.abs(a - this.startPoint.x),
                        d = Math.abs(b - this.startPoint.y);
                    return Math.max(c, d)
                },
                updateStartPoint: function(a, b) {
                    this.startPoint.x = a, this.startPoint.y = b
                },
                updateStartGroup: function() {
                    var a = this.kfEditor.requestService("syntax.get.record.cursor");
                    this.startGroupIsPlaceholder = this.kfEditor.requestService("syntax.is.select.placeholder"), this.startGroup = {
                        groupInfo: this.kfEditor.requestService("syntax.get.group.content", a.groupId),
                        offset: a.startOffset
                    }
                },
                startUpdateSelection: function() {
                    this.isDrag = !0, this.isMousedown = !1, this.clearSelection()
                },
                stopUpdateSelection: function() {
                    this.isDrag = !1, this.isMousedown = !1, this.kfEditor.requestService("control.update.input")
                },
                clearSelection: function() {
                    this.kfEditor.requestService("render.clear.select")
                },
                updateSelection: function(a, b) {
                    var d = b > this.startPoint.x,
                        e = {},
                        f = null,
                        g = !1,
                        h = this.startGroup,
                        i = null,
                        j = this.getGroupInof(b, a);
                    j.groupInfo.id === h.groupInfo.id ? (e = {
                        groupId: j.groupInfo.id,
                        startOffset: h.offset,
                        endOffset: j.offset
                    }, this.startGroupIsPlaceholder && (d ? e.startOffset === e.endOffset && (e.endOffset += 1) : e.startOffset += 1)) : c.contains(h.groupInfo.groupObj, j.groupInfo.groupObj) ? e = {
                        groupId: h.groupInfo.id,
                        startOffset: h.offset,
                        endOffset: this.getIndex(h.groupInfo.groupObj, a, b)
                    } : c.contains(j.groupInfo.groupObj, h.groupInfo.groupObj) ? (e = {
                        groupId: j.groupInfo.id,
                        startOffset: this.kfEditor.requestService("position.get.index", j.groupInfo.groupObj, h.groupInfo.groupObj),
                        endOffset: j.offset
                    }, d || (e.startOffset += 1)) : (f = this.getCommunityGroup(h.groupInfo, j.groupInfo), f.startOffset === f.endOffset ? f.endOffset += 1 : (i = f.group.content[f.endOffset], g = this.kfEditor.requestService("position.get.area", i, b), g && (f.endOffset += 1), d || (f.startOffset += 1)), e = {
                        groupId: f.group.id,
                        startOffset: f.startOffset,
                        endOffset: f.endOffset
                    }), this.kfEditor.requestService("syntax.update.record.cursor", e.groupId, e.startOffset, e.endOffset), this.kfEditor.requestService("control.reselect")
                },
                updateSelectionByTarget: function(a) {
                    var b = this.kfEditor.requestService("position.get.parent.group", a),
                        c = null,
                        d = {};
                    if (null !== b) {
                        if (this.kfEditor.requestService("syntax.is.root.node", b.id)) return void this.selectAll();
                        this.kfEditor.requestService("syntax.is.virtual.node", b.id) ? (c = this.kfEditor.requestService("position.get.group.info", b.groupObj), d = {
                            groupId: c.group.id,
                            startOffset: c.index,
                            endOffset: c.index + 1
                        }) : d = {
                            groupId: b.id,
                            startOffset: 0,
                            endOffset: b.content.length
                        }, this.kfEditor.requestService("syntax.update.record.cursor", d), this.kfEditor.requestService("control.reselect"), this.kfEditor.requestService("control.update.input")
                    }
                },
                selectAll: function() {
                    var a = this.kfEditor.requestService("syntax.get.root.group.info"),
                        b = {
                            groupId: a.id,
                            startOffset: 0,
                            endOffset: a.content.length
                        };
                    this.kfEditor.requestService("syntax.update.record.cursor", b), this.kfEditor.requestService("control.reselect"), this.kfEditor.requestService("control.update.input")
                },
                getGroupInof: function(a, b) {
                    var c = this.kfEditor.requestService("position.get.group", b);
                    null === c && (c = this.kfEditor.requestService("syntax.get.root.group.info"));
                    var d = this.kfEditor.requestService("position.get.location.info", a, c);
                    return {
                        groupInfo: c,
                        offset: d
                    }
                },
                getIndex: function(a, b, d) {
                    var e = this.kfEditor.requestService("position.get.index", a, b),
                        f = this.kfEditor.requestService("syntax.get.group.content", a.id),
                        g = f.content[e],
                        h = c.getRect(g);
                    return h.left + h.width / 2 < d && (e += 1), e
                },
                getCommunityGroup: function(a, b) {
                    for (var d = null, e = a.groupObj, f = null;
                        (d = this.kfEditor.requestService("position.get.group.info", e)) && (e = d.group.groupObj, !c.contains(d.group.groupObj, b.groupObj)););
                    return f = d.group.groupObj, {
                        group: d.group,
                        startOffset: d.index,
                        endOffset: this.kfEditor.requestService("position.get.index", f, b.groupObj)
                    }
                }
            })
        }
    }, b[11] = {
        value: function() {
            return {
                GROUP: "kf-editor-group",
                VIRTUAL: "kf-editor-virtual-group"
            }
        }
    }, b[12] = {
        value: function() {
            function a(a) {
                var b = this.services[a];
                if (!b) throw new Error("KFEditor: not found service, " + a);
                return b
            }
            var c = b.r(20),
                d = b.r(4),
                e = {
                    formula: {
                        fontsize: 50,
                        autoresize: !1
                    },
                    ui: {
                        zoom: !0,
                        maxzoom: 2,
                        minzoom: 1
                    }
                },
                f = {},
                g = b.r(19).ResourceManager,
                h = c.createClass("KFEditor", {
                    constructor: function(a, b) {
                        this.options = d.extend(!0, {}, e, b), this.FormulaClass = null, this._readyState = !1, this._callbacks = [], this.container = a, this.services = {}, this.commands = {}, this.initResource()
                    },
                    isReady: function() {
                        return !!this._readyState
                    },
                    triggerReady: function() {
                        for (var a = null, b = this; a = this._callbacks.shift();) a.call(b, b)
                    },
                    ready: function(a) {
                        this._readyState ? a.call(this, this) : this._callbacks.push(a)
                    },
                    getContainer: function() {
                        return this.container
                    },
                    getDocument: function() {
                        return this.container.ownerDocument
                    },
                    getFormulaClass: function() {
                        return this.FormulaClass
                    },
                    getOptions: function() {
                        return this.options
                    },
                    initResource: function() {
                        var a = this;
                        g.ready(function(b) {
                            a.FormulaClass = b, a.initComponents(), a._readyState = !0, a.triggerReady()
                        }, this.options.resource)
                    },
                    initComponents: function() {
                        var a = this;
                        d.each(f, function(b, c) {
                            new b(a, a.options[c])
                        })
                    },
                    requestService: function(b) {
                        var c = a.call(this, b);
                        return c.service[c.key].apply(c.provider, [].slice.call(arguments, 1))
                    },
                    request: function(b) {
                        var c = a.call(this, b);
                        return c.service
                    },
                    registerService: function(a, b, c) {
                        var e = null;
                        for (e in c) c[e] && c.hasOwnProperty(e) && (c[e] = d.proxy(c[e], b));
                        this.services[a] = {
                            provider: b,
                            key: e,
                            service: c
                        }
                    },
                    registerCommand: function(a, b, c) {
                        this.commands[a] = {
                            executor: b,
                            execFn: c
                        }
                    },
                    execCommand: function(a) {
                        var b = this.commands[a];
                        if (!b) throw new Error("KFEditor: not found command, " + a);
                        return b.execFn.apply(b.executor, [].slice.call(arguments, 1))
                    }
                });
            return d.extend(h, {
                registerComponents: function(a, b) {
                    f[a] = b
                }
            }), h
        }
    }, b[13] = {
        value: function() {
            function a(a, b) {
                var c = this;
                this._callbacks = [], this.editor = new d(a, b), this.editor.ready(function() {
                    c._trigger()
                })
            }
            var c = b.r(20),
                d = b.r(12);
            return a.prototype._trigger = function() {
                var a = this.editor;
                c.Utils.each(this._callbacks, function(b) {
                    b.call(a, a)
                })
            }, a.prototype.ready = function(a) {
                this.editor.isReady() ? a.call(this.editor, this.editor) : this._callbacks.push(a)
            }, {
                create: function(b, c) {
                    return new a(b, c)
                }
            }
        }
    }, b[14] = {
        value: function() {
            return window.jQuery
        }
    }, b[15] = {
        value: function() {
            return {
                selectColor: "rgba(42, 106, 189, 0.2)",
                allSelectColor: "rgba(42, 106, 189, 0.6)"
            }
        }
    }, b[16] = {
        value: function() {
            var a = b.r(20),
                c = b.r(19),
                d = b.r(18);
            return a.createClass("PlaceholderExpression", {
                base: c.CompoundExpression,
                constructor: function() {
                    this.callBase(), this.setFlag("Placeholder"), this.label = null, this.box.setAttr("data-type", null), this.setOperator(new d)
                },
                setLabel: function(a) {
                    this.label = a
                },
                getLabel: function() {
                    return this.label
                },
                setAttr: function(a, b) {
                    "label" === a ? this.setLabel(b) : (a.label && (this.setLabel(a.label), delete a.label), this.callBase(a, b))
                },
                select: function() {
                    this.getOperator().select()
                },
                selectAll: function() {
                    this.getOperator().selectAll()
                },
                unselect: function() {
                    this.getOperator().unselect()
                }
            })
        }
    }, b[17] = {
        value: function() {
            function a(a) {
                c.PlaceholderExpression = b.r(16), c.Expression.prototype.select = function() {
                    this.box.fill(d)
                }, c.Expression.prototype.selectAll = function() {
                    this.box.fill(e)
                }, c.Expression.prototype.unselect = function() {
                    this.box.fill("transparent")
                }, a.getKFParser().expand({
                    parse: {
                        placeholder: {
                            name: "placeholder",
                            handler: function(a) {
                                return delete a.handler, a.operand = [], a
                            },
                            sign: !1
                        }
                    },
                    reverse: {
                        placeholder: function() {
                            return "\\placeholder "
                        }
                    }
                })
            }
            var c = b.r(19),
                d = b.r(15).selectColor,
                e = b.r(15).allSelectColor;
            return {
                ext: a
            }
        }
    }, b[18] = {
        value: function() {
            function a(a, b) {
                return null !== b ? d(a, b) : c(a)
            }

            function c(a) {
                var b = 35,
                    c = 50,
                    d = null;
                return d = new e.Rect(b, c, 0, 0).stroke("black").fill("transparent"), d.setAttr("stroke-dasharray", "5, 5"), a.addOperatorShape(d), d
            }

            function d(a, b) {
                var c = new e.Text(b).fill(f),
                    d = new e.Group,
                    g = 20,
                    h = 7,
                    i = new e.Rect(0, 0, 0, 0, h).stroke(f).fill("transparent"),
                    j = null;
                return c.setFontSize(40), d.addShape(i), d.addShape(c), a.addOperatorShape(d), j = c.getFixRenderBox(), i.stroke(f).fill("transparent"), i.setSize(j.width + 2 * g, j.height + 2 * g), i.setRadius(h), i.setAttr("stroke-dasharray", "5, 5"), c.setAttr({
                    dx: 0 - j.x,
                    dy: 0 - j.y
                }), c.translate(g, g), i
            }
            var e = b.r(20),
                f = b.r(29).rootPlaceholder.color,
                g = b.r(15).selectColor,
                h = b.r(15).allSelectColor;
            return e.createClass("PlaceholderOperator", {
                base: b.r(19).Operator,
                constructor: function() {
                    this.opShape = null, this.callBase("Placeholder")
                },
                applyOperand: function() {
                    this.opShape = a(this, this.parentExpression.getLabel()), this.parentExpression.expand(20, 20), this.parentExpression.translateElement(10, 10)
                },
                select: function() {
                    this.opShape.fill(g)
                },
                selectAll: function() {
                    this.opShape.fill(h)
                },
                unselect: function() {
                    this.opShape.fill("transparent")
                }
            })
        }
    }, b[19] = {
        value: function() {
            return window.kf
        }
    }, b[20] = {
        value: function() {
            return window.kity
        }
    }, b[21] = {
        value: function() {
            function a(a, b, c) {
                var i = null,
                    j = !c;
                b.attr = b.attr || {}, b.attr.id = a.getGroupId(), j ? d(a, b) : c.attr["data-root"] && "placeholder" === b.name && g(c.operand) && (b.attr.label = o);
                for (var k = 0, l = b.operand.length; l > k; k++) i = b.operand[k], h(b) ? e(a, k, b, i) : f(a, k, b, i);
                return b
            }

            function c() {
                return q + ++s
            }

            function d(a, b) {
                a.isResetId ? b.attr["data-root"] = "true" : b.attr["data-type"] = r.VIRTUAL
            }

            function e(b, c, d, e) {
                "brackets" === d.name && 2 > c || ("function" !== d.name || 0 !== c) && (d.attr["data-type"] = r.VIRTUAL, e ? "string" == typeof e ? (d.operand[c] = j(b), d.operand[c].operand[0] = e) : i(e) ? (d.operand[c] = j(b), d.operand[c].operand[0] = a(b, e, d.operand[c])) : d.operand[c] = a(b, e, d) : d.operand[c] = e)
            }

            function f(b, c, d, e) {
                d.attr["data-type"] = r.GROUP, d.operand[c] = e && "string" != typeof e ? "text" === e.name ? e : a(b, e, d) : e
            }

            function g(a) {
                var b = 1;
                if (a.length > 3) return !1;
                for (var c = 0, d = a.length; d > c; c++) a[c] !== m && a[c] && "placeholder" === a[c].name && b--;
                return !b
            }

            function h(a) {
                return !!n[a.name]
            }

            function i(a) {
                return "placeholder" === a.name
            }

            function j(a) {
                return {
                    name: p,
                    attr: {
                        "data-type": r.GROUP,
                        id: a.getGroupId()
                    },
                    operand: []
                }
            }
            var k = b.r(19).Parser,
                l = b.r(20),
                m = b.r(29).cursorCharacter,
                n = b.r(22),
                o = b.r(29).rootPlaceholder.content,
                p = "combination",
                q = "_kf_editor_",
                r = b.r(11),
                s = 0,
                t = l.createClass("Parser", {
                    constructor: function(a) {
                        this.kfEditor = a, this.callBase(), this.kfParser = k.use("latex"), this.initKFormulExtension(), this.pid = c(), this.groupRecord = 0, this.tree = null, this.isResetId = !0, this.initServices()
                    },
                    parse: function(b, c) {
                        var d = null;
                        return this.isResetId = !!c, this.isResetId && this.resetGroupId(), d = this.kfParser.parse(b), a(this, d.tree), d
                    },
                    serialization: function(a) {
                        return this.kfParser.serialization(a)
                    },
                    initServices: function() {
                        this.kfEditor.registerService("parser.parse", this, {
                            parse: this.parse
                        }), this.kfEditor.registerService("parser.latex.serialization", this, {
                            serialization: this.serialization
                        })
                    },
                    getKFParser: function() {
                        return this.kfParser
                    },
                    initKFormulExtension: function() {
                        b.r(17).ext(this)
                    },
                    resetGroupId: function() {
                        this.groupRecord = 0
                    },
                    getGroupId: function() {
                        return this.pid + "_" + ++this.groupRecord
                    }
                });
            return t
        }
    }, b[22] = {
        value: function() {
            return {
                radical: !0,
                fraction: !0,
                summation: !0,
                integration: !0,
                placeholder: !0,
                script: !0,
                superscript: !0,
                subscript: !0,
                brackets: !0,
                "function": !0
            }
        }
    }, b[23] = {
        value: function() {
            function a(b, c, d) {
                var e = null;
                return b.ownerSVGElement ? (b = b.parentNode, e = b.tagName.toLowerCase(), b && "body" !== e && "svg" !== e ? "kf-editor-group" === b.getAttribute("data-type") ? b : c && "kf-editor-virtual-group" === b.getAttribute("data-type") ? b : d && null !== b.getAttribute("data-flag") ? b : a(b, c, d) : null) : null
            }
            var c = b.r(20),
                d = b.r(4),
                e = c.createClass("PositionComponenet", {
                    constructor: function(a) {
                        this.kfEditor = a, this.initServices()
                    },
                    initServices: function() {
                        this.kfEditor.registerService("position.get.group", this, {
                            getGroupByTarget: this.getGroupByTarget
                        }), this.kfEditor.registerService("position.get.index", this, {
                            getIndexByTargetInGroup: this.getIndexByTargetInGroup
                        }), this.kfEditor.registerService("position.get.location.info", this, {
                            getLocationInfo: this.getLocationInfo
                        }), this.kfEditor.registerService("position.get.parent.group", this, {
                            getParentGroupByTarget: this.getParentGroupByTarget
                        }), this.kfEditor.registerService("position.get.wrap", this, {
                            getWrap: this.getWrap
                        }), this.kfEditor.registerService("position.get.area", this, {
                            getAreaByCursorInGroup: this.getAreaByCursorInGroup
                        }), this.kfEditor.registerService("position.get.group.info", this, {
                            getGroupInfoByNode: this.getGroupInfoByNode
                        }), this.kfEditor.registerService("position.get.parent.info", this, {
                            getParentInfoByNode: this.getParentInfoByNode
                        })
                    },
                    getGroupByTarget: function(b) {
                        var c = a(b, !1, !1);
                        return c ? this.kfEditor.requestService("syntax.get.group.content", c.id) : null
                    },
                    getIndexByTargetInGroup: function(a, b) {
                        var e = this.kfEditor.requestService("syntax.get.group.content", a.id),
                            f = -1;
                        return c.Utils.each(e.content, function(a, c) {
                            return f = c, d.contains(a, b) ? !1 : void 0
                        }), f
                    },
                    getAreaByCursorInGroup: function(a, b) {
                        var c = d.getRect(a);
                        return c.left + c.width / 2 < b
                    },
                    getLocationInfo: function(a, b) {
                        for (var c = -1, e = b.content, f = null, g = e.length - 1, h = null; g >= 0; g--)
                            if (c = g, h = e[g], f = d.getRect(h), f.left < a) {
                                f.left + f.width / 2 < a && (c += 1);
                                break
                            }
                        return c
                    },
                    getParentGroupByTarget: function(b) {
                        var c = a(b, !0, !1);
                        return c ? this.kfEditor.requestService("syntax.get.group.content", c.id) : null
                    },
                    getWrap: function(b) {
                        return a(b, !0, !0)
                    },
                    getGroupInfoByNode: function(b) {
                        var c = {},
                            e = a(b, !1, !1),
                            f = null;
                        if (!e) return null;
                        f = this.kfEditor.requestService("syntax.get.group.content", e.id);
                        for (var g = 0, h = f.content.length; h > g && (c.index = g, !d.contains(f.content[g], b)); g++);
                        return c.group = f, c
                    },
                    getParentInfoByNode: function(b) {
                        var c = a(b, !0, !1);
                        return c = this.kfEditor.requestService("syntax.get.group.content", c.id), {
                            group: c,
                            index: c.content.indexOf(b)
                        }
                    }
                });
            return e
        }
    }, b[24] = {
        value: function() {
            var a = b.r(20);
            return a.createClass("Printer", {
                constructor: function(a) {
                    this.kfEditor = a, this.initServices(), this.initCommands()
                },
                initServices: function() {
                    this.kfEditor.registerService("print.image", this, {
                        printImage: this.printImage
                    })
                },
                initCommands: function() {
                    this.kfEditor.registerCommand("get.image.data", this, this.getImageData)
                },
                printImage: function() {
                    var a = this.kfEditor.requestService("render.get.paper");
                    this._formatCanvas(), a.toPNG(function(a) {
                        document.body.innerHTML = '<img style="background: red;" src="' + a + '">'
                    }), this._restoreCanvas()
                },
                getImageData: function(a) {
                    var b = this.kfEditor.requestService("render.get.canvas"),
                        c = this.kfEditor.requestService("render.get.paper");
                    this._formatCanvas(), c.toPNG(function(c) {
                        a({
                            width: b.width,
                            height: b.height,
                            img: c
                        })
                    }), this._restoreCanvas()
                },
                _formatCanvas: function() {
                    var a = this.kfEditor.requestService("render.get.canvas"),
                        b = a.container.getRenderBox();
                    a.node.setAttribute("width", b.width), a.node.setAttribute("height", b.height), this.kfEditor.requestService("render.clear.canvas.transform"), this.kfEditor.requestService("control.cursor.hide"), this.kfEditor.requestService("render.clear.select")
                },
                _restoreCanvas: function() {
                    var a = this.kfEditor.requestService("render.get.canvas");
                    a.node.setAttribute("width", "100%"), a.node.setAttribute("height", "100%"), this.kfEditor.requestService("render.revert.canvas.transform"), this.kfEditor.requestService("control.cursor.relocation"), this.kfEditor.requestService("render.reselect")
                }
            })
        }
    }, b[25] = {
        value: function() {
            var a = b.r(20),
                c = b.r(19).Assembly,
                d = {
                    autoresize: !1,
                    fontsize: 50,
                    padding: [20, 50]
                },
                e = a.createClass("RenderComponent", {
                    base: b.r(1),
                    constructor: function(b, c) {
                        this.callBase(), this.options = a.Utils.extend({}, d, c), this.kfEditor = b, this.assembly = null, this.formula = null, this.relDisabled = !1, this.canvasZoom = 1, this.record = {
                            select: {},
                            cursor: {},
                            canvas: {}
                        }, this.initCanvas(), this.initServices(), this.initCommands()
                    },
                    initCanvas: function() {
                        var a = this.kfEditor.requestService("ui.get.canvas.container"),
                            b = this.kfEditor.getFormulaClass();
                        this.assembly = new c(new b(a, this.options)), this.formula = this.assembly.formula, this.setCanvasToCenter()
                    },
                    setCanvasOffset: function(a, b) {
                        var c = this.formula.getViewBox();
                        b = void 0 !== b ? b : -c.height / 2, this.formula.setViewBox(a, b, c.width, c.height)
                    },
                    setCanvasToCenter: function() {
                        var a = this.formula.getViewBox();
                        this.formula.setViewBox(-a.width / 2, -a.height / 2, a.width, a.height)
                    },
                    initServices: function() {
                        this.kfEditor.registerService("render.get.canvas", this, {
                            getCanvas: this.getCanvas
                        }), this.kfEditor.registerService("render.get.content.size", this, {
                            getContentSize: this.getContentSize
                        }), this.kfEditor.registerService("render.clear.canvas.transform", this, {
                            clearCanvasOffset: this.clearCanvasTransform
                        }), this.kfEditor.registerService("render.set.canvas.offset", this, {
                            setCanvasOffset: this.setCanvasOffset
                        }), this.kfEditor.registerService("render.set.canvas.to.center", this, {
                            setCanvasToCenter: this.setCanvasToCenter
                        }), this.kfEditor.registerService("render.revert.canvas.transform", this, {
                            revertCanvasTransform: this.revertCanvasTransform
                        }), this.kfEditor.registerService("render.relocation", this, {
                            relocation: this.relocation
                        }), this.kfEditor.registerService("render.disable.relocation", this, {
                            disableRelocation: this.disableRelocation
                        }), this.kfEditor.registerService("render.enable.relocation", this, {
                            enableRelocation: this.enableRelocation
                        }), this.kfEditor.registerService("render.select.group.content", this, {
                            selectGroupContent: this.selectGroupContent
                        }), this.kfEditor.registerService("render.select.group", this, {
                            selectGroup: this.selectGroup
                        }), this.kfEditor.registerService("render.select.group.all", this, {
                            selectAllGroup: this.selectAllGroup
                        }), this.kfEditor.registerService("render.tint.current.cursor", this, {
                            tintCurrentGroup: this.tintCurrentGroup
                        }), this.kfEditor.registerService("render.select.current.cursor", this, {
                            selectCurrentCursor: this.selectCurrentCursor
                        }), this.kfEditor.registerService("render.reselect", this, {
                            reselect: this.reselect
                        }), this.kfEditor.registerService("render.clear.select", this, {
                            clearSelect: this.clearSelect
                        }), this.kfEditor.registerService("render.set.canvas.zoom", this, {
                            setCanvasZoom: this.setCanvasZoom
                        }), this.kfEditor.registerService("render.get.canvas.zoom", this, {
                            getCanvasZoom: this.getCanvasZoom
                        }), this.kfEditor.registerService("render.get.paper.offset", this, {
                            getPaperOffset: this.getPaperOffset
                        }), this.kfEditor.registerService("render.draw", this, {
                            render: this.render
                        }), this.kfEditor.registerService("render.insert.string", this, {
                            insertString: this.insertString
                        }), this.kfEditor.registerService("render.insert.group", this, {
                            insertGroup: this.insertGroup
                        }), this.kfEditor.registerService("render.get.paper", this, {
                            getPaper: this.getPaper
                        })
                    },
                    initCommands: function() {
                        this.kfEditor.registerCommand("render", this, function(a) {
                            this.render(a), this.kfEditor.requestService("ui.update.canvas.view")
                        }), this.kfEditor.registerCommand("getPaper", this, this.getPaper)
                    },
                    relocation: function() {
                        this.relDisabled ? this.relocationToLeft() : this.relocationToCenter()
                    },
                    relocationToCenter: function() {
                        var a = this.formula.container.getRenderBox();
                        this.formula.container.setTranslate(-a.width / 2, -a.height / 2), this.setCanvasToCenter()
                    },
                    relocationToLeft: function() {
                        var a = this.formula.container.getRenderBox();
                        this.formula.container.setTranslate(0, -a.height / 2), this.setCanvasOffset(0)
                    },
                    selectGroup: function(a) {
                        var b = this.kfEditor.requestService("syntax.get.group.object", a);
                        this.clearSelect(), b.node.getAttribute("data-root") || (this.record.select.lastSelect = b, b.select())
                    },
                    selectGroupContent: function(a) {
                        null !== a.groupObj.getAttribute("data-placeholder") && (a = {
                            id: a.content[0].id
                        });
                        var b = this.kfEditor.requestService("syntax.get.group.object", a.id);
                        this.clearSelect(), this.record.select.lastSelect = b, b.node.getAttribute("data-root") || b.select()
                    },
                    selectAllGroup: function(a) {
                        null !== a.groupObj.getAttribute("data-placeholder") && (a = {
                            id: a.content[0].id
                        });
                        var b = this.kfEditor.requestService("syntax.get.group.object", a.id);
                        this.clearSelect(), this.record.select.lastSelect = b, b.selectAll()
                    },
                    selectCurrentCursor: function() {
                        var a = this.kfEditor.requestService("syntax.get.record.cursor"),
                            b = this.kfEditor.requestService("syntax.get.group.object", a.groupId),
                            c = null,
                            d = -1,
                            e = 0,
                            f = Math.min(a.startOffset, a.endOffset),
                            g = Math.max(a.startOffset, a.endOffset);
                        this.clearSelect(), this.record.select.lastSelect = b;
                        for (var h = f, i = g; i > h; h++) c = b.getOperand(h).getRenderBox(b), -1 == d && (d = c.x), e += c.width;
                        b.setBoxWidth(e), b.selectAll(), b.getBox().setTranslate(d, 0)
                    },
                    tintCurrentGroup: function() {
                        var a = this.kfEditor.requestService("syntax.get.record.cursor").groupId,
                            b = this.kfEditor.requestService("syntax.get.group.object", a),
                            c = this.kfEditor.requestService("syntax.is.placeholder.node", a);
                        this.clearSelect(), b.node.getAttribute("data-root") || (c && (b = this.kfEditor.requestService("syntax.get.group.object", b.operands[0].node.id)), this.record.select.lastSelect = b, b.select())
                    },
                    reselect: function() {
                        var a = this.kfEditor.requestService("syntax.get.record.cursor"),
                            b = null;
                        b = this.kfEditor.requestService("syntax.get.group.object", a.groupId), this.clearSelect(), this.record.select.lastSelect = b, b.node.getAttribute("data-root") || b.select()
                    },
                    clearSelect: function() {
                        var a = null,
                            b = this.record.select.lastSelect;
                        b && b.node.ownerSVGElement && (b.unselect(), a = b.getRenderBox(b), b.setBoxWidth(a.width), b.getBox().setTranslate(0, 0))
                    },
                    getPaper: function() {
                        return this.formula
                    },
                    render: function(a) {
                        var b = this.kfEditor.requestService("parser.parse", a, !0),
                            c = this.assembly.regenerateBy(b);
                        this.kfEditor.requestService("syntax.update.objtree", c)
                    },
                    enableRelocation: function() {
                        this.relDisabled = !1
                    },
                    disableRelocation: function() {
                        this.relDisabled = !0
                    },
                    setCanvasZoom: function(a) {
                        var b = this.formula.getViewPort();
                        this.canvasZoom = a, b.zoom = a, this.formula.setViewPort(b)
                    },
                    getCanvas: function() {
                        return this.formula
                    },
                    getContentSize: function() {
                        return this.formula.container.getRenderBox()
                    },
                    clearCanvasTransform: function() {
                        var a = this.record.canvas;
                        a.viewBox = this.formula.getViewBox(), a.contentOffset = this.formula.container.getTranslate(), this.setCanvasToCenter(), this.formula.node.removeAttribute("viewBox"), this.formula.container.setTranslate(0, 0)
                    },
                    revertCanvasTransform: function() {
                        var a = this.record.canvas,
                            b = a.viewBox;
                        return b ? (this.formula.setViewBox(b.x, b.y, b.width, b.height), this.formula.container.setTranslate(a.contentOffset), a.viewBox = null, void(a.contentOffset = null)) : !1
                    },
                    getCanvasZoom: function() {
                        return this.canvasZoom
                    }
                });
            return e
        }
    }, b[26] = {
        value: function() {
            var a = b.r(20);
            return a.createClass("DeleteComponent", {
                constructor: function(a, b) {
                    this.parentComponent = a, this.kfEditor = b
                },
                deleteGroup: function() {
                    var a = this.parentComponent.getCursorRecord(),
                        b = this.parentComponent.getObjectTree(),
                        c = b.mapping[a.groupId].strGroup;
                    return a.startOffset !== a.endOffset ? this.parentComponent.isSelectPlaceholder() ? this.parentComponent.isRootTree(c) ? !1 : (a = this.selectParentContainer(a.groupId), this.parentComponent.updateCursor(a), !1) : this.deleteSelection(c, a) : 0 === a.startOffset ? this.parentComponent.isRootTree(c) ? !1 : (a = this.selectParentContainer(a.groupId), this.parentComponent.updateCursor(a), !1) : c.operand.length > 1 ? (a = this.deletePrevGroup(c, a), this.parentComponent.updateCursor(a), a.startOffset === a.endOffset ? !0 : !1) : (a.startOffset = 0, a.endOffset = 1, c.operand[0].attr && this.parentComponent.isGroupNode(c.operand[0].attr.id) ? (this.parentComponent.updateCursor(a), !1) : (c.operand[0] = {
                        name: "placeholder",
                        operand: []
                    }, this.parentComponent.updateCursor(a), !0))
                },
                deletePrevGroup: function(a, b) {
                    var c = b.startOffset - 1,
                        d = a.operand[c];
                    return this.parentComponent.isLeafTree(d) ? (a.operand.splice(c, 1), b.startOffset -= 1, b.endOffset -= 1) : b.startOffset -= 1, b
                },
                deleteSelection: function(a, b) {
                    return 0 === b.startOffset && b.endOffset === a.operand.length ? (a.operand.length = 1, a.operand[0] = {
                        name: "placeholder",
                        operand: []
                    }, b.endOffset = 1) : (a.operand.splice(b.startOffset, b.endOffset - b.startOffset), b.endOffset = b.startOffset), this.parentComponent.updateCursor(b), !0
                },
                selectParentContainer: function(a) {
                    var b = this.parentComponent.getGroupObject(a).node,
                        c = this.kfEditor.requestService("position.get.group", b),
                        d = this.kfEditor.requestService("position.get.index", c.groupObj, b);
                    return {
                        groupId: c.id,
                        startOffset: d,
                        endOffset: d + 1
                    }
                }
            })
        }
    }, b[27] = {
        value: function() {
            function a(a) {
                var b = null,
                    c = this.parentComponent,
                    f = null;
                return f = c.getGroupContent(a.groupId), c.isSelectPlaceholder() ? e(this, f.content[a.startOffset], p.LEFT) : (a.startOffset === a.endOffset ? a.startOffset > 0 ? (b = f.content[a.startOffset - 1], l(b) ? a = d(this, b, p.LEFT) : (a.startOffset -= 1, m(b) || (a.endOffset = a.startOffset))) : a = e(this, f.groupObj, p.LEFT) : (a.startOffset = Math.min(a.startOffset, a.endOffset), a.endOffset = a.startOffset), a)
            }

            function c(a) {
                var b = null,
                    c = this.parentComponent,
                    f = null;
                return f = c.getGroupContent(a.groupId), c.isSelectPlaceholder() ? e(this, f.content[a.startOffset], p.RIGHT) : (a.startOffset === a.endOffset ? a.startOffset < f.content.length ? (b = f.content[a.startOffset], l(b) ? a = d(this, b, p.RIGHT) : (a.startOffset += 1, m(b) || (a.endOffset = a.startOffset))) : a = e(this, f.groupObj, p.RIGHT) : (a.endOffset = Math.max(a.startOffset, a.endOffset), a.startOffset = a.endOffset), a)
            }

            function d(a, b, c) {
                switch (c) {
                    case p.LEFT:
                        return f(a, b);
                    case p.RIGHT:
                        return h(a, b)
                }
                throw new Error("undefined move direction!")
            }

            function e(a, b, c) {
                switch (c) {
                    case p.LEFT:
                        return g(a, b);
                    case p.RIGHT:
                        return i(a, b)
                }
                throw new Error("undefined move direction!")
            }

            function f(a, b) {
                var c = a.parentComponent,
                    d = null,
                    e = null;
                if (m(b) || n(b)) return g(a, b);
                if (l(b)) {
                    if (d = c.getGroupContent(b.id), e = d.content[d.content.length - 1], n(e)) return g(a, e);
                    if (k(b)) return m(e) ? {
                        groupId: b.id,
                        startOffset: d.content.length - 1,
                        endOffset: d.content.length
                    } : k(e) && 1 === d.content.length ? f(a, e) : {
                        groupId: b.id,
                        startOffset: d.content.length,
                        endOffset: d.content.length
                    };
                    for (; !k(e) && !n(e) && !m(e);) d = c.getGroupContent(e.id), e = d.content[d.content.length - 1];
                    return n(e) ? g(a, e) : m(e) ? {
                        groupId: e.id,
                        startOffset: d.content.length,
                        endOffset: d.content.length
                    } : f(a, e)
                }
                return null
            }

            function g(a, b) {
                var c = a.kfEditor,
                    d = null;
                if (j(b)) return null;
                for (d = c.requestService("position.get.parent.info", b); 0 === d.index;) {
                    if (j(d.group.groupObj)) return {
                        groupId: d.group.id,
                        startOffset: 0,
                        endOffset: 0
                    };
                    if (k(d.group.groupObj) && d.group.content.length > 1) return {
                        groupId: d.group.id,
                        startOffset: 0,
                        endOffset: 0
                    };
                    d = c.requestService("position.get.parent.info", d.group.groupObj)
                }
                return k(d.group.groupObj) ? {
                    groupId: d.group.id,
                    startOffset: d.index,
                    endOffset: d.index
                } : (b = d.group.content[d.index - 1], l(b) ? k(b) ? f(a, b) : f(a, b) : n(b) ? g(a, b) : {
                    groupId: d.group.id,
                    startOffset: d.index,
                    endOffset: d.index
                })
            }

            function h(a, b) {
                var c = a.parentComponent,
                    d = null,
                    e = null;
                if (l(b)) {
                    if (d = c.getGroupContent(b.id), e = d.content[0], k(b)) return k(e) ? h(a, e) : m(e) ? {
                        groupId: b.id,
                        startOffset: 0,
                        endOffset: 1
                    } : {
                        groupId: b.id,
                        startOffset: 0,
                        endOffset: 0
                    };
                    for (; !k(e) && !m(e) && !n(e);) d = c.getGroupContent(e.id), e = d.content[0];
                    return m(e) ? {
                        groupId: e.id,
                        startOffset: 0,
                        endOffset: 0
                    } : n(e) ? i(a, e) : h(a, e)
                }
                return null
            }

            function i(a, b) {
                var c = a.kfEditor,
                    d = a.parentComponent,
                    e = null,
                    f = null;
                if (j(b)) return null;
                for (e = c.requestService("position.get.parent.info", b); e.index === e.group.content.length - 1;) {
                    if (j(e.group.groupObj)) return {
                        groupId: e.group.id,
                        startOffset: e.group.content.length,
                        endOffset: e.group.content.length
                    };
                    if (k(e.group.groupObj) && e.group.content.length > 1) return {
                        groupId: e.group.id,
                        startOffset: e.group.content.length,
                        endOffset: e.group.content.length
                    };
                    e = c.requestService("position.get.parent.info", e.group.groupObj)
                }
                return b = e.group.content[e.index + 1], n(b) ? i(a, b) : k(b) ? (f = d.getGroupContent(b.id), d.isPlaceholder(f.content[0].id) ? {
                    groupId: b.id,
                    startOffset: 0,
                    endOffset: 1
                } : {
                    groupId: b.id,
                    startOffset: 0,
                    endOffset: 0
                }) : {
                    groupId: e.group.id,
                    startOffset: e.index + 1,
                    endOffset: e.index + 1
                }
            }

            function j(a) {
                return !!a.getAttribute("data-root")
            }

            function k(a) {
                return "kf-editor-group" === a.getAttribute("data-type")
            }

            function l(a) {
                var b = a.getAttribute("data-type");
                return "kf-editor-group" === b || "kf-editor-virtual-group" === b
            }

            function m(a) {
                return "Placeholder" === a.getAttribute("data-flag")
            }

            function n(a) {
                return "Empty" === a.getAttribute("data-flag")
            }
            var o = b.r(20),
                p = {
                    LEFT: "left",
                    RIGHT: "right"
                };
            return o.createClass("MoveComponent", {
                constructor: function(a, b) {
                    this.parentComponent = a, this.kfEditor = b
                },
                leftMove: function() {
                    var b = this.parentComponent.getCursorRecord();
                    b = a.call(this, b), b && this.parentComponent.updateCursor(b)
                },
                rightMove: function() {
                    var a = this.parentComponent.getCursorRecord();
                    a = c.call(this, a), a && this.parentComponent.updateCursor(a)
                }
            })
        }
    }, b[28] = {
        value: function() {
            var a = b.r(20),
                c = b.r(27),
                d = b.r(26),
                e = b.r(29).cursorCharacter,
                f = b.r(11),
                g = a.createClass("SyntaxComponenet", {
                    constructor: function(a) {
                        this.kfEditor = a, this.record = {
                            cursor: {
                                group: null,
                                startOffset: -1,
                                endOffset: -1
                            }
                        }, this.components = {}, this.objTree = null, this.initComponents(), this.initServices(), this.initCommands()
                    },
                    initComponents: function() {
                        this.components.move = new c(this, this.kfEditor), this.components.delete = new d(this, this.kfEditor)
                    },
                    initServices: function() {
                        this.kfEditor.registerService("syntax.update.objtree", this, {
                            updateObjTree: this.updateObjTree
                        }), this.kfEditor.registerService("syntax.get.objtree", this, {
                            getObjectTree: this.getObjectTree
                        }), this.kfEditor.registerService("syntax.get.group.object", this, {
                            getGroupObject: this.getGroupObject
                        }), this.kfEditor.registerService("syntax.is.root.node", this, {
                            isRootNode: this.isRootNode
                        }), this.kfEditor.registerService("syntax.is.group.node", this, {
                            isGroupNode: this.isGroupNode
                        }), this.kfEditor.registerService("syntax.is.virtual.node", this, {
                            isVirtualNode: this.isVirtualNode
                        }), this.kfEditor.registerService("syntax.is.placeholder.node", this, {
                            isPlaceholder: this.isPlaceholder
                        }), this.kfEditor.registerService("syntax.is.select.placeholder", this, {
                            isSelectPlaceholder: this.isSelectPlaceholder
                        }), this.kfEditor.registerService("syntax.has.root.placeholder", this, {
                            hasRootplaceholder: this.hasRootplaceholder
                        }), this.kfEditor.registerService("syntax.valid.brackets", this, {
                            isBrackets: this.isBrackets
                        }), this.kfEditor.registerService("syntax.get.group.content", this, {
                            getGroupContent: this.getGroupContent
                        }), this.kfEditor.registerService("syntax.get.root.group.info", this, {
                            getRootGroupInfo: this.getRootGroupInfo
                        }), this.kfEditor.registerService("syntax.get.root", this, {
                            getRootObject: this.getRootObject
                        }), this.kfEditor.registerService("syntax.update.record.cursor", this, {
                            updateCursor: this.updateCursor
                        }), this.kfEditor.registerService("syntax.update.selection", this, {
                            updateSelection: this.updateSelection
                        }), this.kfEditor.registerService("syntax.get.record.cursor", this, {
                            getCursorRecord: this.getCursorRecord
                        }), this.kfEditor.registerService("syntax.has.cursor.info", this, {
                            hasCursorInfo: this.hasCursorInfo
                        }), this.kfEditor.registerService("syntax.serialization", this, {
                            serialization: this.serialization
                        }), this.kfEditor.registerService("syntax.cursor.move.left", this, {
                            leftMove: this.leftMove
                        }), this.kfEditor.registerService("syntax.cursor.move.right", this, {
                            rightMove: this.rightMove
                        }), this.kfEditor.registerService("syntax.delete.group", this, {
                            deleteGroup: this.deleteGroup
                        })
                    },
                    initCommands: function() {
                        this.kfEditor.registerCommand("get.source", this, this.getSource), this.kfEditor.registerCommand("content.is.empty", this, this.isEmpty)
                    },
                    updateObjTree: function(a) {
                        var b = a.select;
                        b && b.groupId && this.updateCursor(b.groupId, b.startOffset, b.endOffset), this.objTree = a
                    },
                    hasCursorInfo: function() {
                        return null !== this.record.cursor.group
                    },
                    isRootNode: function(a) {
                        return this.objTree.mapping.root.strGroup.attr.id === a
                    },
                    isGroupNode: function(a) {
                        var b = this.objTree.mapping[a].strGroup.attr["data-type"];
                        return b === f.GROUP || b === f.VIRTUAL
                    },
                    isVirtualNode: function(a) {
                        return this.objTree.mapping[a].strGroup.attr["data-type"] === f.VIRTUAL
                    },
                    isPlaceholder: function(a) {
                        var b = this.objTree.mapping[a];
                        return b ? (b = b.objGroup.node, "Placeholder" === b.getAttribute("data-flag")) : !1
                    },
                    isBrackets: function(a) {
                        return !!this.objTree.mapping[a].objGroup.node.getAttribute("data-brackets")
                    },
                    hasRootplaceholder: function() {
                        return "placeholder" === this.objTree.mapping.root.strGroup.operand[0].name
                    },
                    isSelectPlaceholder: function() {
                        var a = this.record.cursor,
                            b = null;
                        return a.endOffset - a.startOffset !== 1 ? !1 : (b = this.getGroupContent(a.groupId), this.isPlaceholder(b.content[a.startOffset].id) ? !0 : !1)
                    },
                    isLeafTree: function(a) {
                        return "string" == typeof a
                    },
                    isRootTree: function(a) {
                        return a.attr && a.attr["data-root"]
                    },
                    getObjectTree: function() {
                        return this.objTree
                    },
                    getGroupObject: function(a) {
                        return this.objTree.mapping[a].objGroup || null
                    },
                    getCursorRecord: function() {
                        return a.Utils.extend({}, this.record.cursor) || null
                    },
                    getGroupContent: function(b) {
                        var c = this.objTree.mapping[b],
                            d = [],
                            e = c.objGroup.operands,
                            f = e.length - 1,
                            g = "rtl" !== c.strGroup.traversal;
                        return a.Utils.each(e, function(a, b) {
                            g ? d.push(a.node) : d[f - b] = a.node
                        }), {
                            id: b,
                            traversal: c.strGroup.traversal || "ltr",
                            groupObj: c.objGroup.node,
                            content: d
                        }
                    },
                    getRootObject: function() {
                        return this.objTree.mapping.root.objGroup
                    },
                    getRootGroupInfo: function() {
                        var a = this.objTree.mapping.root.strGroup.attr.id;
                        return this.getGroupContent(a)
                    },
                    updateSelection: function(a) {
                        var b = this.objTree.mapping[a.id],
                            c = b.strGroup,
                            d = null,
                            f = null,
                            g = null,
                            h = -1,
                            i = -1;
                        if (d = a, f = b, "combination" === c.name) this.record.cursor = {
                            groupId: d.id,
                            startOffset: 0,
                            endOffset: c.operand.length
                        }, c.operand.unshift(e), c.operand.push(e);
                        else {
                            for (;
                                "combination" !== f.strGroup.name || 1 === d.content;) a = d, b = f, d = this.kfEditor.requestService("position.get.parent.group", b.objGroup.node), f = this.objTree.mapping[d.id];
                            var j = [].indexOf.call(d.content, a.groupObj);
                            this.record.cursor = {
                                groupId: d.id,
                                startOffset: j,
                                endOffset: j + 1
                            }, f.strGroup.operand.splice(j + 1, 0, e), f.strGroup.operand.splice(j, 0, e)
                        }
                        return g = this.kfEditor.requestService("parser.latex.serialization", this.objTree.parsedTree), h = g.indexOf(e), g = g.replace(e, ""), i = g.indexOf(e), f.strGroup.operand.splice(this.record.cursor.startOffset, 1), f.strGroup.operand.splice(this.record.cursor.endOffset, 1), {
                            str: g,
                            startOffset: h,
                            endOffset: i
                        }
                    },
                    getSource: function() {
                        return this.serialization().str.replace(e, "").replace(e, "")
                    },
                    isEmpty: function() {
                        return this.hasRootplaceholder()
                    },
                    serialization: function() {
                        var a = this.record.cursor,
                            b = this.objTree.mapping[a.groupId],
                            c = b.strGroup,
                            d = null,
                            f = -1,
                            g = -1;
                        return f = Math.min(a.endOffset, a.startOffset), g = Math.max(a.endOffset, a.startOffset), c.operand.splice(g, 0, e), c.operand.splice(f, 0, e), g += 1, d = this.kfEditor.requestService("parser.latex.serialization", this.objTree.parsedTree), c.operand.splice(g, 1), c.operand.splice(f, 1), f = d.indexOf(e), a.startOffset === a.endOffset && (d = d.replace(e, "")), g = d.lastIndexOf(e), {
                            str: d,
                            startOffset: f,
                            endOffset: g
                        }
                    },
                    updateCursor: function(a, b, c) {
                        var d = null;
                        1 === arguments.length && (c = a.endOffset, b = a.startOffset, a = a.groupId), void 0 === c && (c = b), b > c && (d = c, c = b, b = d), this.record.cursor = {
                            groupId: a,
                            startOffset: b,
                            endOffset: c
                        }
                    },
                    leftMove: function() {
                        this.components.move.leftMove()
                    },
                    rightMove: function() {
                        this.components.move.rightMove()
                    },
                    deleteGroup: function() {
                        return this.components.delete.deleteGroup()
                    },
                    insertSubtree: function(a) {
                        var b = this.record.cursor,
                            c = 0,
                            d = 0,
                            e = null,
                            f = 0;
                        this.isPlaceholder(b.groupId) ? this.replaceTree(a) : (c = Math.min(b.startOffset, b.endOffset), d = Math.max(b.startOffset, b.endOffset), f = d - c, e = this.objTree.mapping[b.groupId].strGroup, e.operand.splice(c, f, a), b.startOffset += 1, b.endOffset = b.startOffset)
                    },
                    replaceTree: function(a) {
                        var b = this.record.cursor,
                            c = this.objTree.mapping[b.groupId].objGroup.node,
                            d = this.kfEditor.requestService("position.get.parent.info", c),
                            e = this.objTree.mapping[d.group.id].strGroup;
                        e.operand[d.index] = a, b.groupId = d.group.id, b.startOffset = d.index + 1, b.endOffset = d.index + 1
                    }
                });
            return g
        }
    }, b[29] = {
        value: function() {
            return {
                cursorCharacter: "\uf155",
                rootPlaceholder: {
                    color: "#666",
                    content: "\u5728\u6b64\u5904\u952e\u5165\u516c\u5f0f",
                    fontsize: 16
                },
                scrollbar: {
                    padding: 5,
                    step: 150
                }
            }
        }
    }, b[30] = {
        value: function() {
            return {
                "\\pm": {
                    x: 5,
                    y: 0
                },
                "\\infty": {
                    x: 42,
                    y: 0
                },
                "=": {
                    x: 79,
                    y: 0
                },
                "\\sim": {
                    x: 116,
                    y: 0
                },
                "\\times": {
                    x: 153,
                    y: 0
                },
                "\\div": {
                    x: 190,
                    y: 0
                },
                "!": {
                    x: 227,
                    y: 0
                },
                "<": {
                    x: 264,
                    y: 0
                },
                "\\ll": {
                    x: 301,
                    y: 0
                },
                ">": {
                    x: 338,
                    y: 0
                },
                "\\gg": {
                    x: 375,
                    y: 0
                },
                "\\leq": {
                    x: 412,
                    y: 0
                },
                "\\geq": {
                    x: 449,
                    y: 0
                },
                "\\mp": {
                    x: 486,
                    y: 0
                },
                "\\cong": {
                    x: 523,
                    y: 0
                },
                "\\equiv": {
                    x: 560,
                    y: 0
                },
                "\\propto": {
                    x: 597,
                    y: 0
                },
                "\\approx": {
                    x: 634,
                    y: 0
                },
                "\\forall": {
                    x: 671,
                    y: 0
                },
                "\\partial": {
                    x: 708,
                    y: 0
                },
                "\\surd": {
                    x: 745,
                    y: 0
                },
                "\\cup": {
                    x: 782,
                    y: 0
                },
                "\\cap": {
                    x: 819,
                    y: 0
                },
                "\\varnothing": {
                    x: 856,
                    y: 0
                },
                "%": {
                    x: 893,
                    y: 0
                },
                "\\circ": {
                    x: 930,
                    y: 0
                },
                "\\exists": {
                    x: 967,
                    y: 0
                },
                "\\nexists": {
                    x: 1004,
                    y: 0
                },
                "\\in": {
                    x: 1041,
                    y: 0
                },
                "\\ni": {
                    x: 1078,
                    y: 0
                },
                "\\gets": {
                    x: 5,
                    y: 37
                },
                "\\uparrow": {
                    x: 42,
                    y: 37
                },
                "\\to": {
                    x: 79,
                    y: 37
                },
                "\\downarrow": {
                    x: 116,
                    y: 37
                },
                "\\leftrightarrow": {
                    x: 153,
                    y: 37
                },
                "\\therefore": {
                    x: 190,
                    y: 37
                },
                "\\because": {
                    x: 227,
                    y: 37
                },
                "+": {
                    x: 264,
                    y: 37
                },
                "-": {
                    x: 301,
                    y: 37
                },
                "\\neg": {
                    x: 338,
                    y: 37
                },
                "\\ast": {
                    x: 375,
                    y: 37
                },
                "\\cdot": {
                    x: 412,
                    y: 37
                },
                "\\vdots": {
                    x: 449,
                    y: 37
                },
                "\\ddots": {
                    x: 486,
                    y: 37
                },
                "\\aleph": {
                    x: 523,
                    y: 37
                },
                "\\beth": {
                    x: 560,
                    y: 37
                },
                "\\blacksquare": {
                    x: 597,
                    y: 37
                },
                "\\alpha": {
                    x: 634,
                    y: 37
                },
                "\\beta": {
                    x: 671,
                    y: 37
                },
                "\\gamma": {
                    x: 708,
                    y: 37
                },
                "\\delta": {
                    x: 745,
                    y: 37
                },
                "\\epsilon": {
                    x: 782,
                    y: 37
                },
                "\\zeta": {
                    x: 819,
                    y: 37
                },
                "\\eta": {
                    x: 856,
                    y: 37
                },
                "\\theta": {
                    x: 893,
                    y: 37
                },
                "\\iota": {
                    x: 930,
                    y: 37
                },
                "\\kappa": {
                    x: 967,
                    y: 37
                },
                "\\lambda": {
                    x: 1004,
                    y: 37
                },
                "\\mu": {
                    x: 1041,
                    y: 37
                },
                "\\nu": {
                    x: 1078,
                    y: 37
                },
                "\\xi": {
                    x: 5,
                    y: 74
                },
                "\\omicron": {
                    x: 42,
                    y: 74
                },
                "\\pi": {
                    x: 79,
                    y: 74
                },
                "\\rho": {
                    x: 116,
                    y: 74
                },
                "\\sigma": {
                    x: 153,
                    y: 74
                },
                "\\tau": {
                    x: 190,
                    y: 74
                },
                "\\upsilon": {
                    x: 227,
                    y: 74
                },
                "\\phi": {
                    x: 264,
                    y: 74
                },
                "\\chi": {
                    x: 301,
                    y: 74
                },
                "\\psi": {
                    x: 338,
                    y: 74
                },
                "\\omega": {
                    x: 375,
                    y: 74
                },
                "\\Alpha": {
                    x: 412,
                    y: 74
                },
                "\\Beta": {
                    x: 449,
                    y: 74
                },
                "\\Gamma": {
                    x: 486,
                    y: 74
                },
                "\\Delta": {
                    x: 523,
                    y: 74
                },
                "\\Epsilon": {
                    x: 560,
                    y: 74
                },
                "\\Zeta": {
                    x: 597,
                    y: 74
                },
                "\\Eta": {
                    x: 634,
                    y: 74
                },
                "\\Theta": {
                    x: 671,
                    y: 74
                },
                "\\Iota": {
                    x: 708,
                    y: 74
                },
                "\\Kappa": {
                    x: 745,
                    y: 74
                },
                "\\Lambda": {
                    x: 782,
                    y: 74
                },
                "\\Mu": {
                    x: 819,
                    y: 74
                },
                "\\Nu": {
                    x: 856,
                    y: 74
                },
                "\\Xi": {
                    x: 893,
                    y: 74
                },
                "\\Omicron": {
                    x: 930,
                    y: 74
                },
                "\\Pi": {
                    x: 967,
                    y: 74
                },
                "\\Rho": {
                    x: 1004,
                    y: 74
                },
                "\\Sigma": {
                    x: 1041,
                    y: 74
                },
                "\\Tau": {
                    x: 1078,
                    y: 74
                },
                "\\Upsilon": {
                    x: 5,
                    y: 111
                },
                "\\Phi": {
                    x: 42,
                    y: 111
                },
                "\\Chi": {
                    x: 79,
                    y: 111
                },
                "\\Psi": {
                    x: 116,
                    y: 111
                },
                "\\Omega": {
                    x: 153,
                    y: 111
                },
                "\\digamma": {
                    x: 190,
                    y: 111
                },
                "\\varepsilon": {
                    x: 227,
                    y: 111
                },
                "\\varkappa": {
                    x: 264,
                    y: 111
                },
                "\\varphi": {
                    x: 301,
                    y: 111
                },
                "\\varpi": {
                    x: 338,
                    y: 111
                },
                "\\varrho": {
                    x: 375,
                    y: 111
                },
                "\\varsigma": {
                    x: 412,
                    y: 111
                },
                "\\vartheta": {
                    x: 449,
                    y: 111
                },
                "\\neq": {
                    x: 486,
                    y: 111
                },
                "\\nless": {
                    x: 523,
                    y: 111
                },
                "\\ngtr": {
                    x: 560,
                    y: 111
                },
                "\\nleq": {
                    x: 597,
                    y: 111
                },
                "\\ngeq": {
                    x: 634,
                    y: 111
                },
                "\\nsim": {
                    x: 671,
                    y: 111
                },
                "\\lneqq": {
                    x: 708,
                    y: 111
                },
                "\\gneqq": {
                    x: 745,
                    y: 111
                },
                "\\nprec": {
                    x: 782,
                    y: 111
                },
                "\\nsucc": {
                    x: 819,
                    y: 111
                },
                "\\notin": {
                    x: 856,
                    y: 111
                },
                "\\nsubseteq": {
                    x: 893,
                    y: 111
                },
                "\\nsupseteq": {
                    x: 930,
                    y: 111
                },
                "\\subsetneq": {
                    x: 967,
                    y: 111
                },
                "\\supsetneq": {
                    x: 1004,
                    y: 111
                },
                "\\lnsim": {
                    x: 1041,
                    y: 111
                },
                "\\gnsim": {
                    x: 1078,
                    y: 111
                },
                "\\precnsim": {
                    x: 5,
                    y: 148
                },
                "\\succnsim": {
                    x: 42,
                    y: 148
                },
                "\\ntriangleleft": {
                    x: 79,
                    y: 148
                },
                "\\ntriangleright": {
                    x: 116,
                    y: 148
                },
                "\\ntrianglelefteq": {
                    x: 153,
                    y: 148
                },
                "\\ntrianglerighteq": {
                    x: 190,
                    y: 148
                },
                "\\nmid": {
                    x: 227,
                    y: 148
                },
                "\\nparallel": {
                    x: 264,
                    y: 148
                },
                "\\nvdash": {
                    x: 301,
                    y: 148
                },
                "\\nVdash": {
                    x: 338,
                    y: 148
                },
                "\\nvDash": {
                    x: 375,
                    y: 148
                },
                "\\nVDash": {
                    x: 412,
                    y: 148
                },
                "\\daleth": {
                    x: 449,
                    y: 148
                },
                "\\gimel": {
                    x: 486,
                    y: 148
                },
                "\\complement": {
                    x: 523,
                    y: 148
                },
                "\\ell": {
                    x: 560,
                    y: 148
                },
                "\\eth": {
                    x: 597,
                    y: 148
                },
                "\\hbar": {
                    x: 634,
                    y: 148
                },
                "\\hslash": {
                    x: 671,
                    y: 148
                },
                "\\mho": {
                    x: 708,
                    y: 148
                },
                "\\wp": {
                    x: 745,
                    y: 148
                },
                "\\circledS": {
                    x: 782,
                    y: 148
                },
                "\\Bbbk": {
                    x: 819,
                    y: 148
                },
                "\\Finv": {
                    x: 856,
                    y: 148
                },
                "\\Game": {
                    x: 893,
                    y: 148
                },
                "\\Im": {
                    x: 930,
                    y: 148
                },
                "\\Re": {
                    x: 967,
                    y: 148
                },
                "\\updownarrow": {
                    x: 1004,
                    y: 148
                },
                "\\Leftarrow": {
                    x: 1041,
                    y: 148
                },
                "\\Rightarrow": {
                    x: 1078,
                    y: 148
                },
                "\\Uparrow": {
                    x: 5,
                    y: 185
                },
                "\\Downarrow": {
                    x: 42,
                    y: 185
                },
                "\\Leftrightarrow": {
                    x: 79,
                    y: 185
                },
                "\\Updownarrow": {
                    x: 116,
                    y: 185
                },
                "\\longleftarrow": {
                    x: 153,
                    y: 185
                },
                "\\longrightarrow": {
                    x: 190,
                    y: 185
                },
                "\\longleftrightarrow": {
                    x: 227,
                    y: 185
                },
                "\\Longleftarrow": {
                    x: 264,
                    y: 185
                },
                "\\Longrightarrow": {
                    x: 301,
                    y: 185
                },
                "\\Longleftrightarrow": {
                    x: 338,
                    y: 185
                },
                "\\nearrow": {
                    x: 375,
                    y: 185
                },
                "\\nwarrow": {
                    x: 412,
                    y: 185
                },
                "\\searrow": {
                    x: 449,
                    y: 185
                },
                "\\swarrow": {
                    x: 486,
                    y: 185
                },
                "\\nleftarrow": {
                    x: 523,
                    y: 185
                },
                "\\nrightarrow": {
                    x: 560,
                    y: 185
                },
                "\\nLeftarrow": {
                    x: 597,
                    y: 185
                },
                "\\nRightarrow": {
                    x: 634,
                    y: 185
                },
                "\\nLeftrightarrow": {
                    x: 671,
                    y: 185
                },
                "\\leftharpoonup": {
                    x: 708,
                    y: 185
                },
                "\\leftharpoondown": {
                    x: 745,
                    y: 185
                },
                "\\rightharpoonup": {
                    x: 782,
                    y: 185
                },
                "\\rightharpoondown": {
                    x: 819,
                    y: 185
                },
                "\\upharpoonleft": {
                    x: 856,
                    y: 185
                },
                "\\upharpoonright": {
                    x: 893,
                    y: 185
                },
                "\\downharpoonleft": {
                    x: 930,
                    y: 185
                },
                "\\downharpoonright": {
                    x: 967,
                    y: 185
                },
                "\\leftrightharpoons": {
                    x: 1004,
                    y: 185
                },
                "\\rightleftharpoons": {
                    x: 1041,
                    y: 185
                },
                "\\leftleftarrows": {
                    x: 1078,
                    y: 185
                },
                "\\rightrightarrows": {
                    x: 5,
                    y: 222
                },
                "\\upuparrows": {
                    x: 42,
                    y: 222
                },
                "\\downdownarrows": {
                    x: 79,
                    y: 222
                },
                "\\leftrightarrows": {
                    x: 116,
                    y: 222
                },
                "\\rightleftarrows": {
                    x: 153,
                    y: 222
                },
                "\\looparrowleft": {
                    x: 190,
                    y: 222
                },
                "\\looparrowright": {
                    x: 227,
                    y: 222
                },
                "\\leftarrowtail": {
                    x: 264,
                    y: 222
                },
                "\\rightarrowtail": {
                    x: 301,
                    y: 222
                },
                "\\Lsh": {
                    x: 338,
                    y: 222
                },
                "\\Rsh": {
                    x: 375,
                    y: 222
                },
                "\\Lleftarrow": {
                    x: 412,
                    y: 222
                },
                "\\Rrightarrow": {
                    x: 449,
                    y: 222
                },
                "\\curvearrowleft": {
                    x: 486,
                    y: 222
                },
                "\\curvearrowright": {
                    x: 523,
                    y: 222
                },
                "\\circlearrowleft": {
                    x: 560,
                    y: 222
                },
                "\\circlearrowright": {
                    x: 597,
                    y: 222
                },
                "\\multimap": {
                    x: 634,
                    y: 222
                },
                "\\leftrightsquigarrow": {
                    x: 671,
                    y: 222
                },
                "\\twoheadleftarrow": {
                    x: 708,
                    y: 222
                },
                "\\twoheadrightarrow": {
                    x: 745,
                    y: 222
                },
                "\\rightsquigarrow": {
                    x: 782,
                    y: 222
                },
                "\\mathcal{A}": {
                    x: 819,
                    y: 222
                },
                "\\mathcal{B}": {
                    x: 856,
                    y: 222
                },
                "\\mathcal{C}": {
                    x: 893,
                    y: 222
                },
                "\\mathcal{D}": {
                    x: 930,
                    y: 222
                },
                "\\mathcal{E}": {
                    x: 967,
                    y: 222
                },
                "\\mathcal{F}": {
                    x: 1004,
                    y: 222
                },
                "\\mathcal{G}": {
                    x: 1041,
                    y: 222
                },
                "\\mathcal{H}": {
                    x: 1078,
                    y: 222
                },
                "\\mathcal{I}": {
                    x: 5,
                    y: 259
                },
                "\\mathcal{J}": {
                    x: 42,
                    y: 259
                },
                "\\mathcal{K}": {
                    x: 79,
                    y: 259
                },
                "\\mathcal{L}": {
                    x: 116,
                    y: 259
                },
                "\\mathcal{M}": {
                    x: 153,
                    y: 259
                },
                "\\mathcal{N}": {
                    x: 190,
                    y: 259
                },
                "\\mathcal{O}": {
                    x: 227,
                    y: 259
                },
                "\\mathcal{P}": {
                    x: 264,
                    y: 259
                },
                "\\mathcal{Q}": {
                    x: 301,
                    y: 259
                },
                "\\mathcal{R}": {
                    x: 338,
                    y: 259
                },
                "\\mathcal{S}": {
                    x: 375,
                    y: 259
                },
                "\\mathcal{T}": {
                    x: 412,
                    y: 259
                },
                "\\mathcal{U}": {
                    x: 449,
                    y: 259
                },
                "\\mathcal{V}": {
                    x: 486,
                    y: 259
                },
                "\\mathcal{W}": {
                    x: 523,
                    y: 259
                },
                "\\mathcal{X}": {
                    x: 560,
                    y: 259
                },
                "\\mathcal{Y}": {
                    x: 597,
                    y: 259
                },
                "\\mathcal{Z}": {
                    x: 634,
                    y: 259
                },
                "\\mathfrak{A}": {
                    x: 671,
                    y: 259
                },
                "\\mathfrak{B}": {
                    x: 708,
                    y: 259
                },
                "\\mathfrak{C}": {
                    x: 745,
                    y: 259
                },
                "\\mathfrak{D}": {
                    x: 782,
                    y: 259
                },
                "\\mathfrak{E}": {
                    x: 819,
                    y: 259
                },
                "\\mathfrak{F}": {
                    x: 856,
                    y: 259
                },
                "\\mathfrak{G}": {
                    x: 893,
                    y: 259
                },
                "\\mathfrak{H}": {
                    x: 930,
                    y: 259
                },
                "\\mathfrak{I}": {
                    x: 967,
                    y: 259
                },
                "\\mathfrak{J}": {
                    x: 1004,
                    y: 259
                },
                "\\mathfrak{K}": {
                    x: 1041,
                    y: 259
                },
                "\\mathfrak{L}": {
                    x: 1078,
                    y: 259
                },
                "\\mathfrak{M}": {
                    x: 5,
                    y: 296
                },
                "\\mathfrak{N}": {
                    x: 42,
                    y: 296
                },
                "\\mathfrak{O}": {
                    x: 79,
                    y: 296
                },
                "\\mathfrak{P}": {
                    x: 116,
                    y: 296
                },
                "\\mathfrak{Q}": {
                    x: 153,
                    y: 296
                },
                "\\mathfrak{R}": {
                    x: 190,
                    y: 296
                },
                "\\mathfrak{S}": {
                    x: 227,
                    y: 296
                },
                "\\mathfrak{T}": {
                    x: 264,
                    y: 296
                },
                "\\mathfrak{U}": {
                    x: 301,
                    y: 296
                },
                "\\mathfrak{V}": {
                    x: 338,
                    y: 296
                },
                "\\mathfrak{W}": {
                    x: 375,
                    y: 296
                },
                "\\mathfrak{X}": {
                    x: 412,
                    y: 296
                },
                "\\mathfrak{Y}": {
                    x: 449,
                    y: 296
                },
                "\\mathfrak{Z}": {
                    x: 486,
                    y: 296
                },
                "\\mathfrak{a}": {
                    x: 523,
                    y: 296
                },
                "\\mathfrak{b}": {
                    x: 560,
                    y: 296
                },
                "\\mathfrak{c}": {
                    x: 597,
                    y: 296
                },
                "\\mathfrak{d}": {
                    x: 634,
                    y: 296
                },
                "\\mathfrak{e}": {
                    x: 671,
                    y: 296
                },
                "\\mathfrak{f}": {
                    x: 708,
                    y: 296
                },
                "\\mathfrak{g}": {
                    x: 745,
                    y: 296
                },
                "\\mathfrak{h}": {
                    x: 782,
                    y: 296
                },
                "\\mathfrak{i}": {
                    x: 819,
                    y: 296
                },
                "\\mathfrak{j}": {
                    x: 856,
                    y: 296
                },
                "\\mathfrak{k}": {
                    x: 893,
                    y: 296
                },
                "\\mathfrak{l}": {
                    x: 930,
                    y: 296
                },
                "\\mathfrak{m}": {
                    x: 967,
                    y: 296
                },
                "\\mathfrak{n}": {
                    x: 1004,
                    y: 296
                },
                "\\mathfrak{o}": {
                    x: 1041,
                    y: 296
                },
                "\\mathfrak{p}": {
                    x: 1078,
                    y: 296
                },
                "\\mathfrak{q}": {
                    x: 5,
                    y: 333
                },
                "\\mathfrak{r}": {
                    x: 42,
                    y: 333
                },
                "\\mathfrak{s}": {
                    x: 79,
                    y: 333
                },
                "\\mathfrak{t}": {
                    x: 116,
                    y: 333
                },
                "\\mathfrak{u}": {
                    x: 153,
                    y: 333
                },
                "\\mathfrak{v}": {
                    x: 190,
                    y: 333
                },
                "\\mathfrak{w}": {
                    x: 227,
                    y: 333
                },
                "\\mathfrak{x}": {
                    x: 264,
                    y: 333
                },
                "\\mathfrak{y}": {
                    x: 301,
                    y: 333
                },
                "\\mathfrak{z}": {
                    x: 338,
                    y: 333
                },
                "\\mathbb{A}": {
                    x: 375,
                    y: 333
                },
                "\\mathbb{B}": {
                    x: 412,
                    y: 333
                },
                "\\mathbb{C}": {
                    x: 449,
                    y: 333
                },
                "\\mathbb{D}": {
                    x: 486,
                    y: 333
                },
                "\\mathbb{E}": {
                    x: 523,
                    y: 333
                },
                "\\mathbb{F}": {
                    x: 560,
                    y: 333
                },
                "\\mathbb{G}": {
                    x: 597,
                    y: 333
                },
                "\\mathbb{H}": {
                    x: 634,
                    y: 333
                },
                "\\mathbb{I}": {
                    x: 671,
                    y: 333
                },
                "\\mathbb{J}": {
                    x: 708,
                    y: 333
                },
                "\\mathbb{K}": {
                    x: 745,
                    y: 333
                },
                "\\mathbb{L}": {
                    x: 782,
                    y: 333
                },
                "\\mathbb{M}": {
                    x: 819,
                    y: 333
                },
                "\\mathbb{N}": {
                    x: 856,
                    y: 333
                },
                "\\mathbb{O}": {
                    x: 893,
                    y: 333
                },
                "\\mathbb{P}": {
                    x: 930,
                    y: 333
                },
                "\\mathbb{Q}": {
                    x: 967,
                    y: 333
                },
                "\\mathbb{R}": {
                    x: 1004,
                    y: 333
                },
                "\\mathbb{S}": {
                    x: 1041,
                    y: 333
                },
                "\\mathbb{T}": {
                    x: 1078,
                    y: 333
                },
                "\\mathbb{U}": {
                    x: 5,
                    y: 370
                },
                "\\mathbb{V}": {
                    x: 42,
                    y: 370
                },
                "\\mathbb{W}": {
                    x: 79,
                    y: 370
                },
                "\\mathbb{X}": {
                    x: 116,
                    y: 370
                },
                "\\mathbb{Y}": {
                    x: 153,
                    y: 370
                },
                "\\mathbb{Z}": {
                    x: 190,
                    y: 370
                },
                "\\mathrm{A}": {
                    x: 227,
                    y: 370
                },
                "\\mathrm{B}": {
                    x: 264,
                    y: 370
                },
                "\\mathrm{C}": {
                    x: 301,
                    y: 370
                },
                "\\mathrm{D}": {
                    x: 338,
                    y: 370
                },
                "\\mathrm{E}": {
                    x: 375,
                    y: 370
                },
                "\\mathrm{F}": {
                    x: 412,
                    y: 370
                },
                "\\mathrm{G}": {
                    x: 449,
                    y: 370
                },
                "\\mathrm{H}": {
                    x: 486,
                    y: 370
                },
                "\\mathrm{I}": {
                    x: 523,
                    y: 370
                },
                "\\mathrm{J}": {
                    x: 560,
                    y: 370
                },
                "\\mathrm{K}": {
                    x: 597,
                    y: 370
                },
                "\\mathrm{L}": {
                    x: 634,
                    y: 370
                },
                "\\mathrm{M}": {
                    x: 671,
                    y: 370
                },
                "\\mathrm{N}": {
                    x: 708,
                    y: 370
                },
                "\\mathrm{O}": {
                    x: 745,
                    y: 370
                },
                "\\mathrm{P}": {
                    x: 782,
                    y: 370
                },
                "\\mathrm{Q}": {
                    x: 819,
                    y: 370
                },
                "\\mathrm{R}": {
                    x: 856,
                    y: 370
                },
                "\\mathrm{S}": {
                    x: 893,
                    y: 370
                },
                "\\mathrm{T}": {
                    x: 930,
                    y: 370
                },
                "\\mathrm{U}": {
                    x: 967,
                    y: 370
                },
                "\\mathrm{V}": {
                    x: 1004,
                    y: 370
                },
                "\\mathrm{W}": {
                    x: 1041,
                    y: 370
                },
                "\\mathrm{X}": {
                    x: 1078,
                    y: 370
                },
                "\\mathrm{Y}": {
                    x: 5,
                    y: 407
                },
                "\\mathrm{Z}": {
                    x: 42,
                    y: 407
                },
                "\\mathrm{a}": {
                    x: 79,
                    y: 407
                },
                "\\mathrm{b}": {
                    x: 116,
                    y: 407
                },
                "\\mathrm{c}": {
                    x: 153,
                    y: 407
                },
                "\\mathrm{d}": {
                    x: 190,
                    y: 407
                },
                "\\mathrm{e}": {
                    x: 227,
                    y: 407
                },
                "\\mathrm{f}": {
                    x: 264,
                    y: 407
                },
                "\\mathrm{g}": {
                    x: 301,
                    y: 407
                },
                "\\mathrm{h}": {
                    x: 338,
                    y: 407
                },
                "\\mathrm{i}": {
                    x: 375,
                    y: 407
                },
                "\\mathrm{j}": {
                    x: 412,
                    y: 407
                },
                "\\mathrm{k}": {
                    x: 449,
                    y: 407
                },
                "\\mathrm{l}": {
                    x: 486,
                    y: 407
                },
                "\\mathrm{m}": {
                    x: 523,
                    y: 407
                },
                "\\mathrm{n}": {
                    x: 560,
                    y: 407
                },
                "\\mathrm{o}": {
                    x: 597,
                    y: 407
                },
                "\\mathrm{p}": {
                    x: 634,
                    y: 407
                },
                "\\mathrm{q}": {
                    x: 671,
                    y: 407
                },
                "\\mathrm{r}": {
                    x: 708,
                    y: 407
                },
                "\\mathrm{s}": {
                    x: 745,
                    y: 407
                },
                "\\mathrm{t}": {
                    x: 782,
                    y: 407
                },
                "\\mathrm{u}": {
                    x: 819,
                    y: 407
                },
                "\\mathrm{v}": {
                    x: 856,
                    y: 407
                },
                "\\mathrm{w}": {
                    x: 893,
                    y: 407
                },
                "\\mathrm{x}": {
                    x: 930,
                    y: 407
                },
                "\\mathrm{y}": {
                    x: 967,
                    y: 407
                },
                "\\mathrm{z}": {
                    x: 1004,
                    y: 407
                }
            }
        }
    }, b[31] = {
        value: function() {
            var a = b.r(4),
                c = b.r(20),
                d = {
                    min: 1,
                    max: 2
                },
                e = c.createClass("ScrollZoomController", {
                    constructor: function(b, c, e, f) {
                        this.kfEditor = c, this.target = e, this.zoom = 1, this.step = .05, this.options = a.extend({}, d, f), this.initEvent()
                    },
                    initEvent: function() {
                        var b = this.kfEditor,
                            c = this,
                            d = this.options.min,
                            e = this.options.max,
                            f = this.step;
                        a.addEvent(this.target, "mousewheel", function(a) {
                            a.preventDefault(), a.wheelDelta < 0 ? c.zoom -= c.zoom * f : c.zoom += c.zoom * f, c.zoom = Math.max(c.zoom, d), c.zoom = Math.min(c.zoom, e), b.requestService("render.set.canvas.zoom", c.zoom)
                        })
                    }
                });
            return e
        }
    }, b[32] = {
        value: function() {
            return {
                VIEW_STATE: {
                    NO_OVERFLOW: 0,
                    OVERFLOW: 1
                },
                scrollbar: {
                    step: 50,
                    thumbMinSize: 50
                }
            }
        }
    }, b[33] = {
        value: function() {
            return {
                "x=\\frac {-b\\pm\\sqrt {b^2-4ac}}{2a}": {
                    pos: {
                        x: 0,
                        y: 0
                    },
                    size: {
                        width: 310,
                        height: 73
                    }
                },
                "{\\placeholder/\\placeholder}": {
                    pos: {
                        x: 315,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\frac \\placeholder\\placeholder": {
                    pos: {
                        x: 376,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "a^2+b^2=c^2": {
                    pos: {
                        x: 437,
                        y: 0
                    },
                    size: {
                        width: 310,
                        height: 73
                    }
                },
                "{\\left(x+a\\right)}^2=\\sum^n_{k=0}{\\left(^n_k\\right)x^ka^{n-k}}": {
                    pos: {
                        x: 752,
                        y: 0
                    },
                    size: {
                        width: 310,
                        height: 73
                    }
                },
                "\\frac {dy}{dx}": {
                    pos: {
                        x: 1067,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\frac {\\Delta y}{\\Delta x}": {
                    pos: {
                        x: 1128,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\frac {\\delta y}{\\delta x}": {
                    pos: {
                        x: 1189,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\frac \\pi 2": {
                    pos: {
                        x: 1250,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\placeholder^\\placeholder": {
                    pos: {
                        x: 1311,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\placeholder^\\placeholder_\\placeholder": {
                    pos: {
                        x: 1372,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\placeholder_\\placeholder": {
                    pos: {
                        x: 1433,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "{^\\placeholder_\\placeholder\\placeholder}": {
                    pos: {
                        x: 1494,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                
                "e^{-i\\omega t}": {
                    pos: {
                        x: 1555,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "x^2": {
                    pos: {
                        x: 1616,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "{}^n_1Y": {
                    pos: {
                        x: 1677,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\sqrt \\placeholder": {
                    pos: {
                        x: 1738,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\sqrt [\\placeholder] \\placeholder": {
                    pos: {
                        x: 1799,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\sqrt [2] \\placeholder": {
                    pos: {
                        x: 1860,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\sqrt [3] \\placeholder": {
                    pos: {
                        x: 1921,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\frac {-b\\pm\\sqrt{b^2-4ac}}{2a}": {
                    pos: {
                        x: 1982,
                        y: 0
                    },
                    size: {
                        width: 137,
                        height: 75
                    }
                },
                "\\sqrt {a^2+b^2}": {
                    pos: {
                        x: 2124,
                        y: 0
                    },
                    size: {
                        width: 137,
                        height: 75
                    }
                },
                "\\int \\placeholder": {
                    pos: {
                        x: 2266,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\int^\\placeholder_\\placeholder\\placeholder": {
                    pos: {
                        x: 2327,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\iint\\placeholder": {
                    pos: {
                        x: 2388,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\iint^\\placeholder_\\placeholder\\placeholder": {
                    pos: {
                        x: 2449,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\iiint\\placeholder": {
                    pos: {
                        x: 2510,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\iiint^\\placeholder_\\placeholder\\placeholder": {
                    pos: {
                        x: 2571,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\sum\\placeholder": {
                    pos: {
                        x: 2632,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\sum^\\placeholder_\\placeholder\\placeholder": {
                    pos: {
                        x: 2693,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\sum_\\placeholder\\placeholder": {
                    pos: {
                        x: 2754,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\left(\\placeholder\\right)": {
                    pos: {
                        x: 2815,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\left[\\placeholder\\right]": {
                    pos: {
                        x: 2876,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\left\\{\\placeholder\\right\\}": {
                    pos: {
                        x: 2937,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\left|\\placeholder\\right|": {
                    pos: {
                        x: 2998,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\sin\\placeholder": {
                    pos: {
                        x: 3059,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\cos\\placeholder": {
                    pos: {
                        x: 3120,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\tan\\placeholder": {
                    pos: {
                        x: 3181,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\csc\\placeholder": {
                    pos: {
                        x: 3242,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\sec\\placeholder": {
                    pos: {
                        x: 3303,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\cot\\placeholder": {
                    pos: {
                        x: 3364,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\sin\\theta": {
                    pos: {
                        x: 3425,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\cos{2x}": {
                    pos: {
                        x: 3486,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                "\\tan\\theta=\\frac {\\sin\\theta}{\\cos\\theta}": {
                    pos: {
                        x: 3547,
                        y: 0
                    },
                    size: {
                        width: 137,
                        height: 75
                    }
                },//tom4/3添加向量上标箭头
                "\\overrightarrow{\\placeholder}": {
                    pos: {
                        x: 3679,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                //添加向量上标波浪线
                "\\widetilde{\\placeholder}": {
                    pos: {
                        x: 3679,
                        y: 0
                    },
                    size: {
                        width: 56,
                        height: 75
                    }
                },
                //end
            }
        }
    }, b[34] = {
        value: function() {
            function a(a) {
                var b = [],
                    c = a.path,
                    d = a.values;
                return e.Utils.each(d, function(a) {
                    var d = a,
                        e = a;
                    "string" != typeof a ? (d = a.img, e = a.key) : e = "\\" + a, b.push({
                        item: {
                            show: "" + c + d.toLowerCase() + ".png",
                            val: e
                        }
                    })
                }), b
            }
            var c = b.r(41),
                d = b.r(40),
                e = b.r(20),
                f = [{
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u9884\u8bbe<br/>",
                            className: "yushe-btn",
                            icon: "assets/images/toolbar/button/fx.png",
                            iconSize: {
                                w: 40
                            }
                        },
                        box: {
                            width: 367,
                            group: [{
                                title: "\u9884\u8bbe\u516c\u5f0f",
                                items: [{
                                    title: "\u9884\u8bbe\u516c\u5f0f",
                                    content: [{
                                        label: "\u4e8c\u6b21\u516c\u5f0f",
                                        item: {
                                            show: "assets/images/toolbar/ys/1.png",
                                            val: "x=\\frac {-b\\pm\\sqrt {b^2-4ac}}{2a}"
                                        }
                                    }, {
                                        label: "\u4e8c\u9879\u5f0f\u5b9a\u7406",
                                        item: {
                                            show: "assets/images/toolbar/ys/2.png",
                                            val: "{\\left(x+a\\right)}^2=\\sum^n_{k=0}{\\left(^n_k\\right)x^ka^{n-k}}"
                                        }
                                    }, {
                                        label: "\u52fe\u80a1\u5b9a\u7406",
                                        item: {
                                            show: "assets/images/toolbar/ys/3.png",
                                            val: "a^2+b^2=c^2"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DELIMITER
                }, {
                    type: c.AREA,
                    options: {
                        box: {
                            fixOffset: !0,
                            width: 527,
                            type: d.OVERLAP,
                            group: [{
                                title: "\u57fa\u7840\u6570\u5b66",
                                items: []
                            }, {
                                title: "\u5e0c\u814a\u5b57\u6bcd",
                                items: []
                            }, {
                                title: "\u6c42\u53cd\u5173\u7cfb\u8fd0\u7b97\u7b26",
                                items: []
                            }, {
                                title: "\u5b57\u6bcd\u7c7b\u7b26\u53f7",
                                items: []
                            }, {
                                title: "\u7bad\u5934",
                                items: []
                            }, {
                                title: "\u624b\u5199\u4f53",
                                items: []
                            }]
                        }
                    }
                }, {
                    type: c.DELIMITER
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u5206\u6570<br/>",
                            icon: "assets/images/toolbar/button/frac.png"
                        },
                        box: {
                            width: 332,
                            group: [{
                                title: "\u5206\u6570",
                                items: [{
                                    title: "\u5206\u6570",
                                    content: [{
                                        item: {
                                            show: "assets/images/toolbar/frac/1.png",
                                            val: "\\frac \\placeholder\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/frac/2.png",
                                            val: "{\\placeholder/\\placeholder}"
                                        }
                                    }]
                                }, {
                                    title: "\u5e38\u7528\u5206\u6570",
                                    content: [{
                                        item: {
                                            show: "assets/images/toolbar/frac/c1.png",
                                            val: "\\frac {dy}{dx}"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/frac/c2.png",
                                            val: "\\frac {\\Delta y}{\\Delta x}"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/frac/c4.png",
                                            val: "\\frac {\\delta y}{\\delta x}"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/frac/c5.png",
                                            val: "\\frac \\pi 2"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u4e0a\u4e0b\u6807<br/>",
                            icon: "assets/images/toolbar/button/script.png"
                        },
                        box: {
                            width: 332,
                            group: [{
                                title: "\u4e0a\u6807\u548c\u4e0b\u6807",
                                items: [{
                                    title: "\u4e0a\u6807\u548c\u4e0b\u6807",
                                    content: [{
                                        item: {
                                            show: "assets/images/toolbar/script/1.png",
                                            val: "\\placeholder^\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/script/2.png",
                                            val: "\\placeholder_\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/script/3.png",
                                            val: "\\placeholder^\\placeholder_\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/script/4.png",
                                            val: "{^\\placeholder_\\placeholder\\placeholder}"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/script/5.png",
                                            val: "\\underset{a}{\\rightarrow}"
                                        }
                                    }]
                                }, {
                                    title: "\u5e38\u7528\u7684\u4e0a\u6807\u548c\u4e0b\u6807",
                                    content: [{
                                        item: {
                                            show: "assets/images/toolbar/script/c1.png",
                                            val: "e^{-i\\omega t}"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/script/c2.png",
                                            val: "x^2"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/script/c3.png",
                                            val: "{}^n_1Y"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u6839\u5f0f<br/>",
                            icon: "assets/images/toolbar/button/sqrt.png"
                        },
                        box: {
                            width: 342,
                            group: [{
                                title: "\u6839\u5f0f",
                                items: [{
                                    title: "\u6839\u5f0f",
                                    content: [{
                                        item: {
                                            show: "assets/images/toolbar/sqrt/1.png",
                                            val: "\\sqrt \\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/sqrt/2.png",
                                            val: "\\sqrt [\\placeholder] \\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/sqrt/3.png",
                                            val: "\\sqrt [2] \\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/sqrt/4.png",
                                            val: "\\sqrt [3] \\placeholder"
                                        }
                                    }]
                                }, {
                                    title: "\u5e38\u7528\u6839\u5f0f",
                                    content: [{
                                        item: {
                                            show: "assets/images/toolbar/sqrt/c1.png",
                                            val: "\\frac {-b\\pm\\sqrt{b^2-4ac}}{2a}"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/sqrt/c2.png",
                                            val: "\\sqrt {a^2+b^2}"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u79ef\u5206<br/>",
                            icon: "assets/images/toolbar/button/int.png"
                        },
                        box: {
                            width: 332,
                            group: [{
                                title: "\u79ef\u5206",
                                items: [{
                                    title: "\u79ef\u5206",
                                    content: [{
                                        item: {
                                            show: "assets/images/toolbar/int/1.png",
                                            val: "\\int \\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/int/2.png",
                                            val: "\\int^\\placeholder_\\placeholder\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/int/3.png",
                                            val: "\\iint\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/int/4.png",
                                            val: "\\iint^\\placeholder_\\placeholder\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/int/5.png",
                                            val: "\\iiint\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/int/6.png",
                                            val: "\\iiint^\\placeholder_\\placeholder\\placeholder"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u5927\u578b<br/>\u8fd0\u7b97\u7b26",
                            icon: "assets/images/toolbar/button/sum.png"
                        },
                        box: {
                            width: 332,
                            group: [{
                                title: "\u6c42\u548c",
                                items: [{
                                    title: "\u6c42\u548c",
                                    content: [{
                                        item: {
                                            show: "assets/images/toolbar/large/1.png",
                                            val: "\\sum\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/large/2.png",
                                            val: "\\sum^\\placeholder_\\placeholder\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/large/3.png",
                                            val: "\\sum_\\placeholder\\placeholder"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u62ec\u53f7<br/>",
                            icon: "assets/images/toolbar/button/brackets.png"
                        },
                        box: {
                            width: 332,
                            group: [{
                                title: "\u65b9\u62ec\u53f7",
                                items: [{
                                    title: "\u65b9\u62ec\u53f7",
                                    content: [{
                                        item: {
                                            show: "assets/images/toolbar/brackets/1.png",
                                            val: "\\left(\\placeholder\\right)"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/brackets/2.png",
                                            val: "\\left[\\placeholder\\right]"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/brackets/3.png",
                                            val: "\\left\\{\\placeholder\\right\\}"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/brackets/4.png",
                                            val: "\\left|\\placeholder\\right|"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u51fd\u6570<br/>",
                            icon: "assets/images/toolbar/button/sin.png"
                        },
                        box: {
                            width: 340,
                            group: [{
                                title: "\u51fd\u6570",
                                items: [{
                                    title: "\u4e09\u89d2\u51fd\u6570",
                                    content: [{
                                        item: {
                                            show: "assets/images/toolbar/func/1.png",
                                            val: "\\sin\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/func/2.png",
                                            val: "\\cos\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/func/3.png",
                                            val: "\\tan\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/func/4.png",
                                            val: "\\csc\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/func/5.png",
                                            val: "\\sec\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/func/6.png",
                                            val: "\\cot\\placeholder"
                                        }
                                    }]
                                }, {
                                    title: "\u5e38\u7528\u51fd\u6570",
                                    content: [{
                                        item: {
                                            show: "assets/images/toolbar/func/c1.png",
                                            val: "\\sin\\theta"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/func/c2.png",
                                            val: "\\sin{2x}"
                                        }
                                    }, {
                                        item: {
                                            show: "assets/images/toolbar/func/c3.png",
                                            val: "\\tan\\theta=\\frac {\\sin\\theta}{\\cos\\theta}"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }];
            return function() {
                    var b = ["pm", "infty", {
                            key: "=",
                            img: "eq"
                        }, "sim", "times", "div", {
                            key: "!",
                            img: "tanhao"
                        }, {
                            key: "<",
                            img: "lt"
                        }, "ll", {
                            key: ">",
                            img: "gt"
                        }, "gg", "leq", "geq", "mp", "cong", "equiv", "propto", "approx", "forall", "partial", "surd", "cup", "cap", "varnothing", {
                            key: "%",
                            img: "baifenhao"
                        }, "circ", "exists", "nexists", "in", "ni", "gets", "uparrow", "to", "downarrow", "leftrightarrow", "therefore", "because", {
                            key: "+",
                            img: "plus"
                        }, {
                            key: "-",
                            img: "minus"
                        }, "neg", "ast", "cdot", "vdots", "ddots", "aleph", "beth", "blacksquare"],
                        c = f[2].options.box.group[0].items;
                    c.push({
                        title: "\u57fa\u7840\u6570\u5b66",
                        content: a({
                            path: "assets/images/toolbar/char/math/",
                            values: b
                        })
                    })
                }(),
                function() {
                    var b = [{
                            title: "\u5c0f\u5199",
                            values: ["alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega"]
                        }, {
                            title: "\u5927\u5199",
                            values: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega"]
                        }, {
                            title: "\u53d8\u4f53",
                            values: ["digamma", "varepsilon", "varkappa", "varphi", "varpi", "varrho", "varsigma", "vartheta"]
                        }],
                        c = f[2].options.box.group[1].items;
                    c.push({
                        title: b[0].title,
                        content: a({
                            path: "assets/images/toolbar/char/greek/lower/",
                            values: b[0].values
                        })
                    }), c.push({
                        title: b[1].title,
                        content: a({
                            path: "assets/images/toolbar/char/greek/upper/",
                            values: b[1].values
                        })
                    }), c.push({
                        title: b[2].title,
                        content: a({
                            path: "assets/images/toolbar/char/greek/misc/",
                            values: b[2].values
                        })
                    })
                }(),
                function() {
                    var b = [{
                            title: "\u6c42\u53cd\u5173\u7cfb\u8fd0\u7b97\u7b26",
                            values: ["neq", "nless", "ngtr", "nleq", "ngeq", "nsim", "lneqq", "gneqq", "nprec", "nsucc", "notin", "nsubseteq", "nsupseteq", "subsetneq", "supsetneq", "lnsim", "gnsim", "precnsim", "succnsim", "ntriangleleft", "ntriangleright", "ntrianglelefteq", "ntrianglerighteq", "nmid", "nparallel", "nvdash", {
                                key: "\\nVdash",
                                img: "nvdash-1"
                            }, {
                                key: "\\nvDash",
                                img: "nvdash-2"
                            }, {
                                key: "\\nVDash",
                                img: "nvdash-3"
                            }, "nexists"]
                        }],
                        c = f[2].options.box.group[2].items;
                    c.push({
                        title: b[0].title,
                        content: a({
                            path: "assets/images/toolbar/char/not/",
                            values: b[0].values
                        })
                    })
                }(),
                function() {
                    var b = ["aleph", "beth", "daleth", "gimel", "complement", "ell", "eth", "hbar", "hslash", "mho", "partial", "wp", "circledS", "Bbbk", "Finv", "Game", "Im", "Re"],
                        c = f[2].options.box.group[3].items;
                    c.push({
                        title: "\u5b57\u6bcd\u7c7b\u7b26\u53f7",
                        content: a({
                            path: "assets/images/toolbar/alphabetic/",
                            values: b
                        })
                    })
                }(),
                function() {
                    var b = ["gets", "to", "uparrow", "downarrow", "leftrightarrow", "updownarrow", {
                            key: "\\Leftarrow",
                            img: "u-leftarrow"
                        }, {
                            key: "\\Rightarrow",
                            img: "u-rightarrow"
                        }, {
                            key: "\\Uparrow",
                            img: "u-uparrow"
                        }, {
                            key: "\\Downarrow",
                            img: "u-downarrow"
                        }, {
                            key: "\\Leftrightarrow",
                            img: "u-leftrightarrow"
                        }, {
                            key: "\\Updownarrow",
                            img: "u-updownarrow"
                        }, "longleftarrow", "longrightarrow", "longleftrightarrow", {
                            key: "\\Longleftarrow",
                            img: "u-longleftarrow"
                        }, {
                            key: "\\Longrightarrow",
                            img: "u-longrightarrow"
                        }, {
                            key: "\\Longleftrightarrow",
                            img: "u-longleftrightarrow"
                        }, "nearrow", "nwarrow", "searrow", "swarrow", "nleftarrow", "nrightarrow", {
                            key: "\\nLeftarrow",
                            img: "u-nleftarrow"
                        }, {
                            key: "\\nRightarrow",
                            img: "u-nrightarrow"
                        }, {
                            key: "\\nLeftrightarrow",
                            img: "u-nleftrightarrow"
                        }, "leftharpoonup", "leftharpoondown", "rightharpoonup", "rightharpoondown", "upharpoonleft", "upharpoonright", "downharpoonleft", "downharpoonright", "leftrightharpoons", "rightleftharpoons", "leftleftarrows", "rightrightarrows", "upuparrows", "downdownarrows", "leftrightarrows", "rightleftarrows", "looparrowleft", "looparrowright", "leftarrowtail", "rightarrowtail", {
                            key: "\\Lsh",
                            img: "u-lsh"
                        }, {
                            key: "\\Rsh",
                            img: "u-rsh"
                        }, {
                            key: "\\Lleftarrow",
                            img: "u-lleftarrow"
                        }, {
                            key: "\\Rrightarrow",
                            img: "u-rrightarrow"
                        }, "curvearrowleft", "curvearrowright", "circlearrowleft", "circlearrowright", "multimap", "leftrightsquigarrow", "twoheadleftarrow", "twoheadrightarrow", "rightsquigarrow"],
                        c = f[2].options.box.group[4].items;
                    c.push({
                        title: "\u7bad\u5934",
                        content: a({
                            path: "assets/images/toolbar/arrow/",
                            values: b
                        })
                    })
                }(),
                function() {
                    var b = [{
                            title: "\u624b\u5199\u4f53",
                            values: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
                        }, {
                            title: "\u82b1\u4f53",
                            values: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
                        }, {
                            title: "\u53cc\u7ebf",
                            values: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
                        }, {
                            title: "\u7f57\u9a6c",
                            values: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
                        }],
                        c = f[2].options.box.group[5].items;
                    e.Utils.each(b[0].values, function(a, c) {
                        b[0].values[c] = {
                            key: "\\mathcal{" + a + "}",
                            img: a.toLowerCase()
                        }
                    }), e.Utils.each(b[1].values, function(a, c) {
                        b[1].values[c] = {
                            key: "\\mathfrak{" + a + "}",
                            img: a.replace(/[A-Z]/, function(a) {
                                return "u" + a.toLowerCase()
                            })
                        }
                    }), e.Utils.each(b[2].values, function(a, c) {
                        b[2].values[c] = {
                            key: "\\mathbb{" + a + "}",
                            img: a.toLowerCase()
                        }
                    }), e.Utils.each(b[3].values, function(a, c) {
                        b[3].values[c] = {
                            key: "\\mathrm{" + a + "}",
                            img: a.replace(/[A-Z]/, function(a) {
                                return "u" + a.toLowerCase()
                            })
                        }
                    }), c.push({
                        title: b[0].title,
                        content: a({
                            path: "assets/images/toolbar/char/cal/",
                            values: b[0].values
                        })
                    }), c.push({
                        title: b[1].title,
                        content: a({
                            path: "assets/images/toolbar/char/frak/",
                            values: b[1].values
                        })
                    }), c.push({
                        title: b[2].title,
                        content: a({
                            path: "assets/images/toolbar/char/bb/",
                            values: b[2].values
                        })
                    }), c.push({
                        title: b[3].title,
                        content: a({
                            path: "assets/images/toolbar/char/rm/",
                            values: b[3].values
                        })
                    })
                }(), window.iconConfig = f, f
        }
    }, b[35] = {
        value: function() {
            function a(a, b) {
                var c = [];
                return g.Utils.each(a, function(a) {
                    a.length > 1 && (a = "\\" + a), c.push({
                        key: a,
                        img: b,
                        pos: e[a]
                    })
                }), c
            }
            var c = b.r(41),
                d = b.r(40),
                e = b.r(30),
                f = b.r(33),
                g = b.r(20),
                h = [{
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u9884\u8bbe<br/>",
                            className: "yushe-btn",
                            icon: {
                                src: "kityformula/assets/images/toolbar/btn.png",
                                x: 0,
                                y: 0
                            },
                            iconSize: {
                                w: 40
                            }
                        },
                        box: {
                            width: 367,
                            group: [{
                                title: "\u9884\u8bbe\u516c\u5f0f",
                                items: [{
                                    title: "\u9884\u8bbe\u516c\u5f0f",
                                    content: [{
                                        label: "\u4e8c\u6b21\u516c\u5f0f",
                                        item: {
                                            val: "x=\\frac {-b\\pm\\sqrt {b^2-4ac}}{2a}"
                                        }
                                    }, {
                                        label: "\u4e8c\u9879\u5f0f\u5b9a\u7406",
                                        item: {
                                            val: "{\\left(x+a\\right)}^2=\\sum^n_{k=0}{\\left(^n_k\\right)x^ka^{n-k}}"
                                        }
                                    }, {
                                        label: "\u52fe\u80a1\u5b9a\u7406",
                                        item: {
                                            val: "a^2+b^2=c^2"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DELIMITER
                }, {
                    type: c.AREA,
                    options: {
                        box: {
                            fixOffset: !0,
                            width: 527,
                            type: d.OVERLAP,
                            group: [{
                                title: "\u57fa\u7840\u6570\u5b66",
                                items: []
                            }, {
                                title: "\u5e0c\u814a\u5b57\u6bcd",
                                items: []
                            }, {
                                title: "\u6c42\u53cd\u5173\u7cfb\u8fd0\u7b97\u7b26",
                                items: []
                            }, {
                                title: "\u5b57\u6bcd\u7c7b\u7b26\u53f7",
                                items: []
                            }, {
                                title: "\u7bad\u5934",
                                items: []
                            }, {
                                title: "\u624b\u5199\u4f53",
                                items: []
                            }]
                        }
                    }
                }, {
                    type: c.DELIMITER
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u5206\u6570<br/>",
                            icon: {
                                src: "kityformula/assets/images/toolbar/btn.png",
                                x: 45,
                                y: 0
                            }
                        },
                        box: {
                            width: 332,
                            group: [{
                                title: "\u5206\u6570",
                                items: [{
                                    title: "\u5206\u6570",
                                    content: [{
                                        item: {
                                            val: "\\frac \\placeholder\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "{\\placeholder/\\placeholder}"
                                        }
                                    }]
                                }, {
                                    title: "\u5e38\u7528\u5206\u6570",
                                    content: [{
                                        item: {
                                            val: "\\frac {dy}{dx}"
                                        }
                                    }, {
                                        item: {
                                            val: "\\frac {\\Delta y}{\\Delta x}"
                                        }
                                    }, {
                                        item: {
                                            val: "\\frac {\\delta y}{\\delta x}"
                                        }
                                    }, {
                                        item: {
                                            val: "\\frac \\pi 2"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u4e0a\u4e0b\u6807<br/>",
                            icon: {
                                src: "kityformula/assets/images/toolbar/btn.png",
                                x: 82,
                                y: 0
                            }
                        },
                        box: {
                            width: 332,
                            group: [{
                                title: "\u4e0a\u6807\u548c\u4e0b\u6807",
                                items: [{
                                    title: "\u4e0a\u6807\u548c\u4e0b\u6807",
                                    content: [{
                                        item: {
                                            val: "\\placeholder^\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\placeholder_\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\placeholder^\\placeholder_\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "{^\\placeholder_\\placeholder\\placeholder}"
                                        }
                                    }, {
                                        item: {//添加上标箭头
                                            val: "\\overrightarrow{\\placeholder}"
                                        }
                                    }, {
                                        item: {//添加上标波浪线
                                            val: "\\widetilde{\\placeholder}"
                                        }
                                    }]
                                }, {
                                    title: "\u5e38\u7528\u7684\u4e0a\u6807\u548c\u4e0b\u6807",
                                    content: [{
                                        item: {
                                            val: "e^{-i\\omega t}"
                                        }
                                    }, {
                                        item: {
                                            val: "x^2"
                                        }
                                    }, {
                                        item: {
                                            val: "{}^n_1Y"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u6839\u5f0f<br/>",
                            icon: {
                                src: "kityformula/assets/images/toolbar/btn.png",
                                x: 119,
                                y: 0
                            }
                        },
                        box: {
                            width: 342,
                            group: [{
                                title: "\u6839\u5f0f",
                                items: [{
                                    title: "\u6839\u5f0f",
                                    content: [{
                                        item: {
                                            val: "\\sqrt \\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\sqrt [\\placeholder] \\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\sqrt [2] \\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\sqrt [3] \\placeholder"
                                        }
                                    }]
                                }, {
                                    title: "\u5e38\u7528\u6839\u5f0f",
                                    content: [{
                                        item: {
                                            val: "\\frac {-b\\pm\\sqrt{b^2-4ac}}{2a}"
                                        }
                                    }, {
                                        item: {
                                            val: "\\sqrt {a^2+b^2}"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u79ef\u5206<br/>",
                            icon: {
                                src: "kityformula/assets/images/toolbar/btn.png",
                                x: 156,
                                y: 0
                            }
                        },
                        box: {
                            width: 332,
                            group: [{
                                title: "\u79ef\u5206",
                                items: [{
                                    title: "\u79ef\u5206",
                                    content: [{
                                        item: {
                                            val: "\\int \\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\int^\\placeholder_\\placeholder\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\iint\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\iint^\\placeholder_\\placeholder\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\iiint\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\iiint^\\placeholder_\\placeholder\\placeholder"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u5927\u578b<br/>\u8fd0\u7b97\u7b26",
                            icon: {
                                src: "kityformula/assets/images/toolbar/btn.png",
                                x: 193,
                                y: 0
                            }
                        },
                        box: {
                            width: 332,
                            group: [{
                                title: "\u6c42\u548c",
                                items: [{
                                    title: "\u6c42\u548c",
                                    content: [{
                                        item: {
                                            val: "\\sum\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\sum^\\placeholder_\\placeholder\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\sum_\\placeholder\\placeholder"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u62ec\u53f7<br/>",
                            icon: {
                                src: "kityformula/assets/images/toolbar/btn.png",
                                x: 230,
                                y: 0
                            }
                        },
                        box: {
                            width: 332,
                            group: [{
                                title: "\u65b9\u62ec\u53f7",
                                items: [{
                                    title: "\u65b9\u62ec\u53f7",
                                    content: [{
                                        item: {
                                            val: "\\left(\\placeholder\\right)"
                                        }
                                    }, {
                                        item: {
                                            val: "\\left[\\placeholder\\right]"
                                        }
                                    }, {
                                        item: {
                                            val: "\\left\\{\\placeholder\\right\\}"
                                        }
                                    }, {
                                        item: {
                                            val: "\\left|\\placeholder\\right|"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }, {
                    type: c.DRAPDOWN_BOX,
                    options: {
                        button: {
                            label: "\u51fd\u6570<br/>",
                            icon: {
                                src: "kityformula/assets/images/toolbar/btn.png",
                                x: 267,
                                y: 0
                            }
                        },
                        box: {
                            width: 340,
                            group: [{
                                title: "\u51fd\u6570",
                                items: [{
                                    title: "\u4e09\u89d2\u51fd\u6570",
                                    content: [{
                                        item: {
                                            val: "\\sin\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\cos\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\tan\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\csc\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\sec\\placeholder"
                                        }
                                    }, {
                                        item: {
                                            val: "\\cot\\placeholder"
                                        }
                                    }]
                                }, {
                                    title: "\u5e38\u7528\u51fd\u6570",
                                    content: [{
                                        item: {
                                            val: "\\sin\\theta"
                                        }
                                    }, {
                                        item: {
                                            val: "\\cos{2x}"
                                        }
                                    }, {
                                        item: {
                                            val: "\\tan\\theta=\\frac {\\sin\\theta}{\\cos\\theta}"
                                        }
                                    }]
                                }]
                            }]
                        }
                    }
                }];
            return function() {
                    var a = [],
                        b = "kityformula/assets/images/toolbar/other.png",
                        d = [];
                    g.Utils.each(h, function(b) {
                        b.type !== c.DELIMITER && (b = b.options.box.group, a = a.concat(b))
                    }), g.Utils.each(a, function(a) {
                        a = a.items;
                        for (var b = 0, c = a.length; c > b; b++) d = d.concat(a[b].content)
                    }), g.Utils.each(d, function(a) {
                        var c = f[a.item.val];
                        c && (a.item.img = b, a.item.pos = c.pos, a.item.size = c.size)
                    })
                }(),
                function() {
                    var b = ["pm", "infty", "=", "sim", "times", "div", "!", "<", "ll", ">", "gg", "leq", "geq", "mp", "cong", "equiv", "propto", "approx", "forall", "partial", "surd", "cup", "cap", "varnothing", "%", "circ", "exists", "nexists", "in", "ni", "gets", "uparrow", "to", "downarrow", "leftrightarrow", "therefore", "because", "+", "-", "neg", "ast", "cdot", "vdots", "aleph", "beth", "blacksquare"],
                        c = h[2].options.box.group[0].items;
                    c.push({
                        title: "\u57fa\u7840\u6570\u5b66",
                        content: a(b, "kityformula/assets/images/toolbar/char.png")
                    })
                }(),
                function() {
                    var b = [{
                            title: "\u5c0f\u5199",
                            values: ["alpha", "beta", "gamma", "delta", "epsilon", "zeta", "eta", "theta", "iota", "kappa", "lambda", "mu", "nu", "xi", "omicron", "pi", "rho", "sigma", "tau", "upsilon", "phi", "chi", "psi", "omega"]
                        }, {
                            title: "\u5927\u5199",
                            values: ["Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon", "Phi", "Chi", "Psi", "Omega"]
                        }, {
                            title: "\u53d8\u4f53",
                            values: ["digamma", "varepsilon", "varkappa", "varphi", "varpi", "varrho", "varsigma", "vartheta"]
                        }],
                        c = h[2].options.box.group[1].items;
                    c.push({
                        title: b[0].title,
                        content: a(b[0].values, "kityformula/assets/images/toolbar/char.png")
                    }), c.push({
                        title: b[1].title,
                        content: a(b[1].values, "kityformula/assets/images/toolbar/char.png")
                    }), c.push({
                        title: b[2].title,
                        content: a(b[2].values, "kityformula/assets/images/toolbar/char.png")
                    })
                }(),
                function() {
                    var b = [{
                            title: "\u6c42\u53cd\u5173\u7cfb\u8fd0\u7b97\u7b26",
                            values: ["neq", "nless", "ngtr", "nleq", "ngeq", "nsim", "lneqq", "gneqq", "nprec", "nsucc", "notin", "nsubseteq", "nsupseteq", "subsetneq", "supsetneq", "lnsim", "gnsim", "precnsim", "succnsim", "ntriangleleft", "ntriangleright", "ntrianglelefteq", "ntrianglerighteq", "nmid", "nparallel", "nvdash", "nVdash", "nvDash", "nVDash", "nexists"]
                        }],
                        c = h[2].options.box.group[2].items;
                    c.push({
                        title: b[0].title,
                        content: a(b[0].values, "kityformula/assets/images/toolbar/char.png")
                    })
                }(),
                function() {
                    var b = ["aleph", "beth", "daleth", "gimel", "complement", "ell", "eth", "hbar", "hslash", "mho", "partial", "wp", "circledS", "Bbbk", "Finv", "Game", "Im", "Re"],
                        c = h[2].options.box.group[3].items;
                    c.push({
                        title: "\u5b57\u6bcd\u7c7b\u7b26\u53f7",
                        content: a(b, "kityformula/assets/images/toolbar/char.png")
                    })
                }(),
                function() {
                    var b = ["gets", "to", "uparrow", "downarrow", "leftrightarrow", "updownarrow", "Leftarrow", "Rightarrow", "Uparrow", "Downarrow", "Leftrightarrow", "Updownarrow", "longleftarrow", "longrightarrow", "longleftrightarrow", "Longleftarrow", "Longrightarrow", "Longleftrightarrow", "nearrow", "nwarrow", "searrow", "swarrow", "nleftarrow", "nrightarrow", "nLeftarrow", "nRightarrow", "nLeftrightarrow", "leftharpoonup", "leftharpoondown", "rightharpoonup", "rightharpoondown", "upharpoonleft", "upharpoonright", "downharpoonleft", "downharpoonright", "leftrightharpoons", "rightleftharpoons", "leftleftarrows", "rightrightarrows", "upuparrows", "downdownarrows", "leftrightarrows", "rightleftarrows", "looparrowleft", "looparrowright", "leftarrowtail", "rightarrowtail", "Lsh", "Rsh", "Lleftarrow", "Rrightarrow", "curvearrowleft", "curvearrowright", "circlearrowleft", "circlearrowright", "multimap", "leftrightsquigarrow", "twoheadleftarrow", "twoheadrightarrow", "rightsquigarrow"],
                        c = h[2].options.box.group[4].items;
                    c.push({
                        title: "\u7bad\u5934",
                        content: a(b, "kityformula/assets/images/toolbar/char.png")
                    })
                }(),
                function() {
                    var b = [{
                            title: "\u624b\u5199\u4f53",
                            values: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
                        }, {
                            title: "\u82b1\u4f53",
                            values: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
                        }, {
                            title: "\u53cc\u7ebf",
                            values: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
                        }, {
                            title: "\u7f57\u9a6c",
                            values: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
                        }],
                        c = h[2].options.box.group[5].items;
                    g.Utils.each(b[0].values, function(a, c) {
                        b[0].values[c] = "mathcal{" + a + "}"
                    }), g.Utils.each(b[1].values, function(a, c) {
                        b[1].values[c] = "mathfrak{" + a + "}"
                    }), g.Utils.each(b[2].values, function(a, c) {
                        b[2].values[c] = "mathbb{" + a + "}"
                    }), g.Utils.each(b[3].values, function(a, c) {
                        b[3].values[c] = "mathrm{" + a + "}"
                    }), c.push({
                        title: b[0].title,
                        content: a(b[0].values, "kityformula/assets/images/toolbar/char.png")
                    }), c.push({
                        title: b[1].title,
                        content: a(b[1].values, "kityformula/assets/images/toolbar/char.png")
                    }), c.push({
                        title: b[2].title,
                        content: a(b[2].values, "kityformula/assets/images/toolbar/char.png")
                    }), c.push({
                        title: b[3].title,
                        content: a(b[3].values, "kityformula/assets/images/toolbar/char.png")
                    })
                }(), h
        }
    }, b[36] = {
        value: function() {
            function a(a, b, f) {
                switch (a) {
                    case i.DRAPDOWN_BOX:
                        return c(b, f);
                    case i.DELIMITER:
                        return d(b);
                    case i.AREA:
                        return e(b, f)
                }
            }

            function c(a, b) {
                return new g.DrapdownBox(a, b)
            }

            function d(a) {
                return new g.Delimiter(a)
            }

            function e(a, b) {
                return new g.Area(a, b)
            }
            var f = b.r(20),
                g = b.r(48),
                h = b.r(47),
                i = b.r(41),
                j = f.createClass("Tollbar", {
                    constructor: function(a, b, c) {
                        this.kfEditor = b, this.uiComponent = a, this.elementList = c, this.elements = [], this.initToolbarElements(), this.initServices(), this.initEvent()
                    },
                    initServices: function() {
                        this.kfEditor.registerService("ui.toolbar.disable", this, {
                            disableToolbar: this.disableToolbar
                        }), this.kfEditor.registerService("ui.toolbar.enable", this, {
                            enableToolbar: this.enableToolbar
                        }), this.kfEditor.registerService("ui.toolbar.close", this, {
                            closeToolbar: this.closeToolbar
                        })
                    },
                    initEvent: function() {
                        var a = this;
                        h.on(this.uiComponent.toolbarContainer, "mousedown", function(a) {
                            a.preventDefault()
                        }), h.on(this.uiComponent.toolbarContainer, "mousewheel", function(a) {
                            a.preventDefault()
                        }), h.on(this.kfEditor.getContainer(), "mousedown", function() {
                            a.notify("closeAll")
                        }), h.subscribe("data.select", function(b) {
                            a.insertSource(b)
                        })
                    },
                    insertSource: function(a) {
                        this.kfEditor.requestService("control.insert.string", a)
                    },
                    disableToolbar: function() {
                        f.Utils.each(this.elements, function(a) {
                            a.disable && a.disable()
                        })
                    },
                    enableToolbar: function() {
                        f.Utils.each(this.elements, function(a) {
                            a.enable && a.enable()
                        })
                    },
                    getContainer: function() {
                        return this.kfEditor.requestService("ui.get.canvas.container")
                    },
                    closeToolbar: function() {
                        this.closeElement()
                    },
                    notify: function(a) {
                        switch (a) {
                            case "closeAll":
                            case "closeOther":
                                return void this.closeElement(arguments[1])
                        }
                    },
                    closeElement: function(a) {
                        f.Utils.each(this.elements, function(b) {
                            b != a && b.hide && b.hide()
                        })
                    },
                    initToolbarElements: function() {
                        var b = this.elements,
                            c = this.uiComponent.toolbarContainer.ownerDocument,
                            d = this;
                        f.Utils.each(this.elementList, function(e) {
                            var f = a(e.type, c, e.options);
                            b.push(f), d.appendElement(f)
                        })
                    },
                    appendElement: function(a) {
                        a.setToolbar(this), a.attachTo(this.uiComponent.toolbarContainer)
                    }
                });
            return j
        }
    }, b[37] = {
        value: function() {
            var a = b.r(20),
                c = "kf-editor-ui-",
                d = 66,
                e = b.r(47),
                f = b.r(38),
                g = a.createClass("Area", {
                    constructor: function(a, b) {
                        this.options = b, this.doc = a, this.toolbar = null, this.disabled = !0, this.panelIndex = 0, this.maxPanelIndex = 0, this.currentItemCount = 0, this.lineMaxCount = 9, this.element = this.createArea(), this.container = this.createContainer(), this.panel = this.createPanel(), this.buttonContainer = this.createButtonContainer(), this.button = this.createButton(), this.mountPoint = this.createMountPoint(), this.moveDownButton = this.createMoveDownButton(), this.moveUpButton = this.createMoveUpButton(), this.boxObject = this.createBox(), this.mergeElement(), this.mount(), this.setListener(), this.initEvent()
                    },
                    initEvent: function() {
                        var a = this;
                        e.on(this.button, "mousedown", function(b) {
                            b.preventDefault(), b.stopPropagation(), 1 !== b.which || a.disabled || (a.showMount(), a.toolbar.notify("closeOther", a))
                        }), e.on(this.moveDownButton, "mousedown", function(b) {
                            b.preventDefault(), b.stopPropagation(), 1 !== b.which || a.disabled || (a.nextPanel(), a.toolbar.notify("closeOther", a))
                        }), e.on(this.moveUpButton, "mousedown", function(b) {
                            b.preventDefault(), b.stopPropagation(), 1 !== b.which || a.disabled || (a.prevPanel(), a.toolbar.notify("closeOther", a))
                        }), e.delegate(this.container, ".kf-editor-ui-area-item", "mousedown", function(b) {
                            b.preventDefault(), 1 !== b.which || a.disabled || e.publish("data.select", this.getAttribute("data-value"))
                        }), this.boxObject.initEvent()
                    },
                    disable: function() {
                        this.disabled = !0, this.boxObject.disable(), e.getClassList(this.element).remove(c + "enabled")
                    },
                    enable: function() {
                        this.disabled = !1, this.boxObject.enable(), e.getClassList(this.element).add(c + "enabled")
                    },
                    setListener: function() {
                        var a = this;
                        this.boxObject.setSelectHandler(function(b) {
                            e.publish("data.select", b), a.hide()
                        }), this.boxObject.setChangeHandler(function() {
                            a.updateContent()
                        })
                    },
                    createArea: function() {
                        var a = e.ele(this.doc, "div", {
                            className: c + "area"
                        });
                        return "width" in this.options && (a.style.width = this.options.width + "px"), a
                    },
                    checkMaxPanelIndex: function() {
                        this.maxPanelIndex = Math.ceil(this.currentItemCount / this.lineMaxCount / 2)
                    },
                    updateContent: function() {
                        var b = this.boxObject.getOverlapContent(),
                            d = 0,
                            e = null,
                            f = 0,
                            g = 0,
                            h = this.lineMaxCount,
                            i = [];
                        this.panel.innerHTML = "", a.Utils.each(b, function(b) {
                            var j = b.content;
                            a.Utils.each(j, function(a) {
                                f = Math.floor(d / h), g = d % h, d++, e = "top: " + (33 * f + 5) + "px; left: " + (32 * g + 5) + "px;", i.push('<div class="' + c + 'area-item" data-value="' + a.key + '" style="' + e + '"><div class="' + c + 'area-item-inner"><div class="' + c + 'area-item-img" style="background: url(' + a.img + ") no-repeat " + -a.pos.x + "px " + -a.pos.y + 'px;"></div></div></div>')
                            })
                        }), this.currentItemCount = d, this.panelIndex = 0, this.panel.style.top = 0, this.panel.innerHTML = i.join(""), this.checkMaxPanelIndex(), this.updatePanelButtonState()
                    },
                    mount: function() {
                        this.boxObject.mountTo(this.mountPoint)
                    },
                    showMount: function() {
                        this.mountPoint.style.display = "block", this.boxObject.updateSize()
                    },
                    hideMount: function() {
                        this.mountPoint.style.display = "none"
                    },
                    hide: function() {
                        this.hideMount(), this.boxObject.hide()
                    },
                    createButton: function() {
                        return e.ele(this.doc, "div", {
                            className: c + "area-button"
                        })
                    },
                    createMoveDownButton: function() {
                        return e.ele(this.doc, "div", {
                            className: c + "movedown-button",
                            content: ""
                        })
                    },
                    createMoveUpButton: function() {
                        return e.ele(this.doc, "div", {
                            className: c + "moveup-button",
                            content: ""
                        })
                    },
                    createMountPoint: function() {
                        return e.ele(this.doc, "div", {
                            className: c + "area-mount"
                        })
                    },
                    createBox: function() {
                        return new f(this.doc, this.options.box)
                    },
                    createContainer: function() {
                        return e.ele(this.doc, "div", {
                            className: c + "area-container"
                        })
                    },
                    createPanel: function() {
                        return e.ele(this.doc, "div", {
                            className: c + "area-panel"
                        })
                    },
                    createButtonContainer: function() {
                        return e.ele(this.doc, "div", {
                            className: c + "area-button-container"
                        })
                    },
                    mergeElement: function() {
                        this.buttonContainer.appendChild(this.moveUpButton), this.buttonContainer.appendChild(this.moveDownButton), this.buttonContainer.appendChild(this.button), this.container.appendChild(this.panel), this.element.appendChild(this.container), this.element.appendChild(this.buttonContainer), this.element.appendChild(this.mountPoint)
                    },
                    disablePanelUp: function() {
                        this.disabledUp = !0, e.getClassList(this.moveUpButton).add("kf-editor-ui-disabled")
                    },
                    enablePanelUp: function() {
                        this.disabledUp = !1, e.getClassList(this.moveUpButton).remove("kf-editor-ui-disabled")
                    },
                    disablePanelDown: function() {
                        this.disabledDown = !0, e.getClassList(this.moveDownButton).add("kf-editor-ui-disabled")
                    },
                    enablePanelDown: function() {
                        this.disabledDown = !1, e.getClassList(this.moveDownButton).remove("kf-editor-ui-disabled")
                    },
                    updatePanelButtonState: function() {
                        0 === this.panelIndex ? this.disablePanelUp() : this.enablePanelUp(), this.panelIndex + 1 >= this.maxPanelIndex ? this.disablePanelDown() : this.enablePanelDown()
                    },
                    nextPanel: function() {
                        this.disabledDown || this.panelIndex + 1 >= this.maxPanelIndex || (this.panelIndex++, this.panel.style.top = -this.panelIndex * d + "px", this.updatePanelButtonState())
                    },
                    prevPanel: function() {
                        this.disabledUp || 0 !== this.panelIndex && (this.panelIndex--, this.panel.style.top = -this.panelIndex * d + "px", this.updatePanelButtonState())
                    },
                    setToolbar: function(a) {
                        this.toolbar = a, this.boxObject.setToolbar(a)
                    },
                    attachTo: function(a) {
                        a.appendChild(this.element), this.updateContent(), this.updatePanelButtonState()
                    }
                });
            return g
        }
    }, b[38] = {
        value: function() {
            function a(a, b, c) {
                var d = [];
                return h.Utils.each(b, function(b) {
                    d.push(new q(c, a, b))
                }), d
            }

            function c(a) {
                return j.ele(a, "div", {
                    className: i + "overlap-container"
                })
            }

            function d(a, b) {
                return new m(a, {
                    className: "overlap-button",
                    label: "",
                    fixOffset: b.fixOffset
                })
            }

            function e(a, b) {
                return new n(a, b)
            }

            function f(a) {
                return a.getBoundingClientRect()
            }

            function g(a) {
                var b = "background: url( " + a.img + " ) no-repeat ";
                return b += -a.pos.x + "px ", b += -a.pos.y + "px;", b += " width: " + a.size.width + "px;", b += " height: " + a.size.height + "px;"
            }
            var h = b.r(20),
                i = "kf-editor-ui-",
                j = b.r(47),
                k = b.r(40),
                l = b.r(42),
                m = b.r(39),
                n = b.r(45),
                o = 20,
                p = h.createClass("Box", {
                    constructor: function(a, b) {
                        this.options = b, this.toolbar = null, this.options.type = this.options.type || k.DETACHED, this.doc = a, this.itemPanels = null, this.overlapButtonObject = null, this.overlapIndex = -1, this.element = this.createBox(), this.groupContainer = this.createGroupContainer(), this.itemGroups = this.createItemGroup(), this.mergeElement()
                    },
                    createBox: function() {
                        var a = j.ele(this.doc, "div", {
                            className: i + "box"
                        });
                        return "width" in this.options && (a.style.width = this.options.width + "px"), a
                    },
                    setToolbar: function(a) {
                        this.toolbar = a, this.overlapButtonObject && this.overlapButtonObject.setToolbar(a)
                    },
                    updateSize: function() {
                        var a = j.getRectBox(this.toolbar.getContainer()),
                            b = 30,
                            c = j.getRectBox(this.element);
                        if (this.options.type === k.DETACHED) {
                            if (c.bottom <= a.bottom) return void(this.element.scrollTop = 0);
                            this.element.style.height = c.height - (c.bottom - a.bottom + b) + "px"
                        } else {
                            var d = this.getCurrentItemPanel(),
                                e = null;
                            if (d.scrollTop = 0, c.bottom <= a.bottom) return;
                            e = f(d), d.style.height = a.bottom - e.top - b + "px"
                        }
                    },
                    initEvent: function() {
                        var a = "." + i + "box-item",
                            b = this;
                        
                        j.delegate(this.groupContainer, a, "mousedown", function(a) {
//                            console.log(a);
//                            alert('5');
                            a.preventDefault(), 1 === a.which && b.onselectHandler && b.onselectHandler(this.getAttribute("data-value"))
                        }), j.on(this.element, "mousedown", function(a) {
//                            alert('6');
                            a.stopPropagation(), a.preventDefault()
                        }), j.on(this.element, "mousewheel", function(a) {
                            a.preventDefault(), a.stopPropagation(), b.scroll(a.originalEvent.wheelDelta)
                        })
                    },
                    getNode: function() {
                        return this.element
                    },
                    setSelectHandler: function(a) {
                        this.onselectHandler = a
                    },
                    scroll: function(a) {
                        0 > a ? this.scrollDown() : (this.scrollUp(), this.element.scrollTop -= 20)
                    },
                    scrollDown: function() {
                        this.options.type === k.DETACHED ? this.element.scrollTop += o : this.getCurrentItemPanel().scrollTop += o
                    },
                    scrollUp: function() {
                        this.options.type === k.DETACHED ? this.element.scrollTop -= o : this.getCurrentItemPanel().scrollTop -= o
                    },
                    setChangeHandler: function(a) {
                        this.onchangeHandler = a
                    },
                    onchangeHandler: function() {},
                    createGroupContainer: function() {
                        return j.ele(this.doc, "div", {
                            className: i + "box-container"
                        })
                    },
                    getPositionInfo: function() {
                        return j.getRectBox(this.element)
                    },
                    createItemGroup: function() {
                        var a = this.createGroup();
                        switch (this.options.type) {
                            case k.DETACHED:
                                return a.items[0];
                            case k.OVERLAP:
                                return this.createOverlapGroup(a)
                        }
                        return null
                    },
                    enable: function() {
                        this.overlapButtonObject && this.overlapButtonObject.enable()
                    },
                    disable: function() {
                        this.overlapButtonObject && this.overlapButtonObject.disable()
                    },
                    hide: function() {
                        this.overlapButtonObject && this.overlapButtonObject.hideMount()
                    },
                    getOverlapContent: function() {
                        return this.options.type !== k.OVERLAP ? null : this.options.group[this.overlapIndex].items
                    },
                    createOverlapGroup: function(a) {
                        var b = a.title,
                            f = this,
                            g = c(this.doc),
                            k = d(this.doc, {
                                fixOffset: this.options.fixOffset
                            }),
                            l = e(this.doc, {
                                width: 150,
                                items: b
                            }),
                            m = j.ele(this.doc, "div", {
                                className: i + "wrap-group"
                            });
                        return this.overlapButtonObject = k, k.mount(l), k.initEvent(), l.initEvent(), h.Utils.each(a.items, function(b, c) {
                            var d = m.cloneNode(!1);
                            h.Utils.each(b, function(a) {
                                d.appendChild(a)
                            }), a.items[c] = d
                        }), this.itemPanels = a.items, l.setSelectHandler(function(c, d) {
                            f.overlapIndex = c, k.setLabel(b[c]), k.hideMount(), a.items[d].style.display = "none", a.items[c].style.display = "block", c !== d && f.updateSize(), f.onchangeHandler(c)
                        }), g.appendChild(k.getNode()), h.Utils.each(a.items, function(a, b) {
                            b > 0 && (a.style.display = "none"), g.appendChild(a)
                        }), l.select(0), [g]
                    },
                    getCurrentItemPanel: function() {
                        return this.itemPanels[this.overlapIndex]
                    },
                    getGroupList: function() {
                        var a = [];
                        return h.Utils.each(this.options.group, function(b) {
                            a.push(b.title)
                        }), {
                            width: 150,
                            items: a
                        }
                    },
                    createGroup: function() {
                        var b = this.doc,
                            c = [],
                            d = {
                                title: [],
                                items: []
                            },
                            e = null,
                            f = null,
                            g = k.DETACHED === this.options.type ? l.BIG : l.SMALL,
                            m = null;
                        return e = j.ele(this.doc, "div", {
                            className: i + "box-group"
                        }), m = e.cloneNode(!1), m.className = i + "box-group-item-container", h.Utils.each(this.options.group, function(k) {
                            d.title.push(k.title || ""), c = [], h.Utils.each(k.items, function(d) {
                                e = e.cloneNode(!1), m = m.cloneNode(!1), f = j.ele(b, "div", {
                                    className: i + "box-group-title",
                                    content: d.title
                                }), e.appendChild(f), e.appendChild(m), h.Utils.each(a(b, d.content, g), function(a) {
                                    a.appendTo(m)
                                }), c.push(e)
                            }), d.items.push(c)
                        }), d
                    },
                    mergeElement: function() {
                        var a = this.groupContainer;
                        this.element.appendChild(a), h.Utils.each(this.itemGroups, function(b) {
                            a.appendChild(b)
                        })
                    },
                    mountTo: function(a) {
                        a.appendChild(this.element)
                    },
                    appendTo: function(a) {
                        a.appendChild(this.element)
                    }
                }),
                q = h.createClass("BoxItem", {
                    constructor: function(a, b, c) {
                        this.type = a, this.doc = b, this.options = c, this.element = this.createItem(), this.labelNode = this.createLabel(), this.contentNode = this.createContent(), this.mergeElement()
                    },
                    getNode: function() {
                        return this.element
                    },
                    createItem: function() {
                        var a = j.ele(this.doc, "div", {
                            className: i + "box-item"
                        });
                        return a
                    },
                    createLabel: function() {
                        var a = null;
                        if ("label" in this.options) return a = j.ele(this.doc, "div", {
                            className: i + "box-item-label",
                            content: this.options.label
                        })
                    },
                    getContent: function() {},
                    createContent: function() {
                        switch (this.type) {
                            case l.BIG:
                                return this.createBigContent();
                            case l.SMALL:
                                return this.createSmallContent()
                        }
                    },
                    createBigContent: function() {
                        var a = this.doc,
                            b = j.ele(a, "div", {
                                className: i + "box-item-content"
                            }),
                            c = i + "box-item-val",
                            d = this.options.item,
                            e = null,
                            f = g(d);
                        return e = j.ele(a, "div", {
                            className: c
                        }), e.innerHTML = '<div class="' + i + 'item-image" style="' + f + '"></div>', this.element.setAttribute("data-value", d.val), b.appendChild(e), b
                    },
                    createSmallContent: function() {
                        var a = this.doc,
                            b = j.ele(a, "div", {
                                className: i + "box-item-content"
                            }),
                            c = i + "box-item-val",
                            d = this.options,
                            e = null;
                        return e = j.ele(a, "div", {
                            className: c
                        }), e.style.background = "url( " + d.img + " )", e.style.backgroundPosition = -d.pos.x + "px " + -d.pos.y + "px", this.element.setAttribute("data-value", d.key), b.appendChild(e), b
                    },
                    mergeElement: function() {
                        this.labelNode && this.element.appendChild(this.labelNode), this.element.appendChild(this.contentNode)
                    },
                    appendTo: function(a) {
                        a.appendChild(this.element)
                    }
                });
            return p
        }
    }, b[39] = {
        value: function() {
            function a(a) {
                var b = "url( " + a.src + " ) no-repeat ";
                return b += -a.x + "px ", b += -a.y + "px"
            }
            var c = b.r(20),
                d = "kf-editor-ui-",
                e = 7,
                f = {
                    iconSize: {
                        w: 32,
                        h: 32
                    }
                },
                g = b.r(47),
                h = c.createClass("Button", {
                    constructor: function(a, b) {
                        this.options = c.Utils.extend({}, f, b), this.eventState = !1, this.toolbar = null, this.displayState = !1, this.fixOffset = b.fixOffset || !1, this.doc = a, this.element = this.createButton(), this.disabled = !0, this.mountElement = null, this.icon = this.createIcon(), this.label = this.createLabel(), this.sign = this.createSign(), this.mountPoint = this.createMountPoint(), this.mergeElement()
                    },
                    initEvent: function() {
                        var a = this;
                        this.eventState || (this.eventState = !0, g.on(this.element, "mousedown", function(b) {
                            b.preventDefault(), b.stopPropagation(), 1 === b.which && (a.disabled || (a.toggleSelect(), a.toggleMountElement()))
                        }))
                    },
                    setToolbar: function(a) {
                        this.toolbar = a
                    },
                    toggleMountElement: function() {
                        this.displayState ? this.hideMount() : this.showMount()
                    },
                    setLabel: function(a) {
                        var b = "";
                        this.sign && (b = '<div class="' + d + 'button-sign"></div>'), this.label.innerHTML = a + b
                    },
                    toggleSelect: function() {
                        g.getClassList(this.element).toggle(d + "button-in")
                    },
                    unselect: function() {
                        g.getClassList(this.element).remove(d + "button-in")
                    },
                    select: function() {
                        g.getClassList(this.element).add(d + "button-in")
                    },
                    show: function() {
                        this.select(), this.showMount()
                    },
                    hide: function() {
                        this.unselect(), this.hideMount()
                    },
                    showMount: function() {
                        if (this.displayState = !0, this.mountPoint.style.display = "block", this.fixOffset) {
                            var a = this.element.getBoundingClientRect();
                            this.mountElement.setOffset(a.left + e, a.bottom)
                        }
                        var b = this.toolbar.getContainer(),
                            c = null,
                            d = g.getRectBox(b),
                            f = this.mountElement.getPositionInfo();
                        f.right > d.right && (c = g.getRectBox(this.element), this.mountPoint.style.left = c.right - f.right - 1 + "px"), this.mountElement.updateSize && this.mountElement.updateSize()
                    },
                    hideMount: function() {
                        this.displayState = !1, this.mountPoint.style.display = "none"
                    },
                    getNode: function() {
                        return this.element
                    },
                    mount: function(a) {
                        this.mountElement = a, a.mountTo(this.mountPoint)
                    },
                    createButton: function() {
                        var a = g.ele(this.doc, "div", {
                            className: d + "button"
                        });
                        return this.options.className && (a.className += " " + d + this.options.className), a
                    },
                    createIcon: function() {
                        if (!this.options.icon) return null;
                        var b = g.ele(this.doc, "div", {
                            className: d + "button-icon"
                        });
                        return "string" == typeof this.options.icon ? b.style.backgroundImage = "url(" + this.options.icon + ") no-repeat" : b.style.background = a(this.options.icon), this.options.iconSize.w && (b.style.width = this.options.iconSize.w + "px"), this.options.iconSize.h && (b.style.height = this.options.iconSize.h + "px"), b
                    },
                    createLabel: function() {
                        var a = g.ele(this.doc, "div", {
                            className: d + "button-label",
                            content: this.options.label
                        });
                        return a
                    },
                    createSign: function() {
                        return this.options.sign === !1 ? null : g.ele(this.doc, "div", {
                            className: d + "button-sign"
                        })
                    },
                    createMountPoint: function() {
                        return g.ele(this.doc, "div", {
                            className: d + "button-mount-point"
                        })
                    },
                    disable: function() {
                        this.disabled = !0, g.getClassList(this.element).remove(d + "enabled")
                    },
                    enable: function() {
                        this.disabled = !1, g.getClassList(this.element).add(d + "enabled")
                    },
                    mergeElement: function() {
                        this.icon && this.element.appendChild(this.icon), this.element.appendChild(this.label), this.sign && this.label.appendChild(this.sign), this.element.appendChild(this.mountPoint)
                    }
                });
            return h
        }
    }, b[40] = {
        value: function() {
            return {
                DETACHED: 1,
                OVERLAP: 2
            }
        }
    }, b[41] = {
        value: function() {
            return {
                DRAPDOWN_BOX: 1,
                AREA: 2,
                DELIMITER: 3
            }
        }
    }, b[42] = {
        value: function() {
            return {
                BIG: 1,
                SMALL: 2
            }
        }
    }, b[43] = {
        value: function() {
            var a = b.r(20),
                c = "kf-editor-ui-",
                d = b.r(47),
                e = a.createClass("Delimiter", {
                    constructor: function(a) {
                        this.doc = a, this.element = this.createDilimiter()
                    },
                    setToolbar: function() {},
                    createDilimiter: function() {
                        var a = d.ele(this.doc, "div", {
                            className: c + "delimiter"
                        });
                        return a.appendChild(d.ele(this.doc, "div", {
                            className: c + "delimiter-line"
                        })), a
                    },
                    attachTo: function(a) {
                        a.appendChild(this.element)
                    }
                });
            return e
        }
    }, b[44] = {
        value: function() {
            var a = b.r(20),
                c = b.r(47),
                d = b.r(39),
                e = b.r(38),
                f = a.createClass("DrapdownBox", {
                    constructor: function(a, b) {
                        this.options = b, this.toolbar = null, this.doc = a, this.buttonElement = this.createButton(), this.element = this.buttonElement.getNode(), this.boxElement = this.createBox(), this.buttonElement.mount(this.boxElement), this.initEvent()
                    },
                    initEvent: function() {
                        var a = this;
                        c.on(this.element, "mousedown", function(b) {
                            b.preventDefault(), b.stopPropagation(), a.toolbar.notify("closeOther", a)
                        }), this.buttonElement.initEvent(), this.boxElement.initEvent(), this.boxElement.setSelectHandler(function(b) {
                            c.publish("data.select", b), a.buttonElement.hide()
                        })
                    },
                    disable: function() {
                        this.buttonElement.disable()
                    },
                    enable: function() {
                        this.buttonElement.enable()
                    },
                    setToolbar: function(a) {
                        this.toolbar = a, this.buttonElement.setToolbar(a), this.boxElement.setToolbar(a)
                    },
                    createButton: function() {
                        return new d(this.doc, this.options.button)
                    },
                    show: function() {
                        this.buttonElement.show()
                    },
                    hide: function() {
                        this.buttonElement.hide()
                    },
                    createBox: function() {
                        return new e(this.doc, this.options.box)
                    },
                    attachTo: function(a) {
                        a.appendChild(this.element)
                    }
                });
            return f
        }
    }, b[45] = {
        value: function() {
            var a = b.r(20),
                c = "kf-editor-ui-",
                d = b.r(47),
                e = a.createClass("List", {
                    constructor: function(a, b) {
                        this.options = b, this.doc = a, this.onselectHandler = null, this.currentSelect = -1, this.element = this.createBox(), this.itemGroups = this.createItems(), this.mergeElement()
                    },
                    onselectHandler: function() {},
                    setSelectHandler: function(a) {
                        this.onselectHandler = a
                    },
                    createBox: function() {
                        var a = d.ele(this.doc, "div", {
                                className: c + "list"
                            }),
                            b = d.ele(this.doc, "div", {
                                className: c + "list-bg"
                            });
                        return "width" in this.options && (a.style.width = this.options.width + "px"), a.appendChild(b), a
                    },
                    select: function(a) {
                        var b = this.currentSelect; - 1 === b && (b = a), this.unselect(b), this.currentSelect = a, d.getClassList(this.itemGroups.items[a]).add(c + "list-item-select"), this.onselectHandler(a, b)
                    },
                    unselect: function(a) {
                        d.getClassList(this.itemGroups.items[a]).remove(c + "list-item-select")
                    },
                    setOffset: function(a, b) {
                        this.element.style.left = a + "px", this.element.style.top = b + "px"
                    },
                    initEvent: function() {
                        var a = "." + c + "list-item",
                            b = this;
                        d.delegate(this.itemGroups.container, a, "mousedown", function(a) {
                            a.preventDefault(), 1 === a.which && b.select(this.getAttribute("data-index"))
                        }), d.on(this.element, "mousedown", function(a) {
                            a.stopPropagation(), a.preventDefault()
                        })
                    },
                    getPositionInfo: function() {
                        return d.getRectBox(this.element)
                    },
                    createItems: function() {
                        var b = this.doc,
                            e = null,
                            f = null,
                            g = null,
                            h = [],
                            i = null;
                        return e = d.ele(this.doc, "div", {
                            className: c + "list-item"
                        }), i = e.cloneNode(!1), i.className = c + "list-item-container", a.Utils.each(this.options.items, function(a, j) {
                            f = e.cloneNode(!1), g = e.cloneNode(!1), g.className = c + "list-item-icon", f.appendChild(g), f.appendChild(d.ele(b, "text", a)), f.setAttribute("data-index", j), h.push(f), i.appendChild(f)
                        }), {
                            container: i,
                            items: h
                        }
                    },
                    mergeElement: function() {
                        this.element.appendChild(this.itemGroups.container)
                    },
                    mountTo: function(a) {
                        a.appendChild(this.element)
                    }
                });
            return e
        }
    }, b[46] = {
        value: function() {
            function a(a, b, c) {
                var d = a.createElement(b),
                    e = '<div class="$1"></div><div class="$2"></div>';
                return d.className = r + c, "thumb" === c && (c = r + c, d.innerHTML = e.replace("$1", c + "-left").replace("$2", c + "-right")), d
            }

            function c(a) {
                return a.getBoundingClientRect()
            }

            function d(a) {
                q.addEvent(a, "mousedown", function(a) {
                    a.preventDefault()
                })
            }

            function d(a) {
                q.addEvent(a.container, "mousedown", function(a) {
                    a.preventDefault()
                })
            }

            function e(a) {
                q.addEvent(a.widgets.track, "mousedown", function(b) {
                    h(this, a, b)
                })
            }

            function f(a) {
                q.addEvent(a.widgets.leftButton, "mousedown", function() {
                    j(a, -p.step)
                }), q.addEvent(a.widgets.rightButton, "mousedown", function() {
                    j(a, p.step)
                })
            }

            function g(a) {
                var b = !1,
                    c = 0,
                    d = 0,
                    e = a.values.trackWidth;
                q.addEvent(a.widgets.thumb, "mousedown", function(e) {
                    e.preventDefault(), e.stopPropagation(), b = !0, c = e.clientX, d = a.thumbLocationX
                }), q.addEvent(a.container.ownerDocument, "mouseup", function() {
                    b = !1, c = 0, d = 0
                }), q.addEvent(a.container.ownerDocument, "mousemove", function(f) {
                    if (b) {
                        var g = f.clientX - c,
                            h = d + g,
                            j = a.values.thumbWidth;
                        0 > h ? h = 0 : h + j > e && (h = e - j), i(a, h)
                    }
                })
            }

            function h(a, b, d) {
                var e = c(a),
                    f = b.values,
                    g = f.viewWidth / (f.contentWidth - f.viewWidth) * f.trackWidth,
                    h = d.clientX - e.left;
                h > f.offset ? f.offset + g > f.trackWidth ? k(b, f.trackWidth) : k(b, f.offset + g) : f.offset - g < 0 ? k(b, 0) : k(b, f.offset - g)
            }

            function i(a, b) {
                var c = a.values,
                    d = c.trackWidth - c.thumbWidth,
                    e = Math.floor(b / d * c.trackWidth);
                a.updateOffset(e), a.thumbLocationX = b, a.widgets.thumb.style.left = b + "px"
            }

            function j(a, b) {
                var c = a.leftOverflow + b;
                0 > c ? c = 0 : c > a.values.scrollWidth && (c = a.values.scrollWidth), m(a, c)
            }

            function k(a, b) {
                var c = a.values,
                    d = b / c.trackWidth,
                    e = c.trackWidth - c.thumbWidth,
                    f = 0;
                f = Math.floor(d * e), 0 > b && (b = 0, f = 0), a.updateOffset(b), a.widgets.thumb.style.left = f + "px", a.thumbLocationX = f
            }

            function l(a, b) {
                var c = a.values,
                    d = 0,
                    e = 0;
                d = b / (c.contentWidth - c.viewWidth), e = Math.floor(d * c.trackWidth), k(a, e)
            }

            function m(a, b) {
                var c = a.values,
                    d = b / (c.contentWidth - c.viewWidth);
                k(a, d * c.trackWidth)
            }
            var n = b.r(20),
                o = b.r(32).scrollbar,
                p = b.r(29).scrollbar,
                q = b.r(4),
                r = "kf-editor-ui-";
            return n.createClass("Scrollbar", {
                constructor: function(a, b) {
                    this.uiComponent = a, this.kfEditor = b, this.widgets = null, this.container = this.uiComponent.scrollbarContainer, this.state = !1, this.values = {
                        offset: 0,
                        left: 0,
                        viewWidth: 0,
                        contentWidth: 0,
                        trackWidth: 0,
                        thumbWidth: 0,
                        scrollWidth: 0
                    }, this.thumbLocationX = 0, this.leftOverflow = 0, this.rightOverflow = 0, this.isExpand = !0, this.initWidget(), this.mountWidget(), this.initSize(), this.hide(), this.initServices(), this.initEvent(), this.updateHandler = function() {}
                },
                initWidget: function() {
                    var b = this.container.ownerDocument;
                    this.widgets = {
                        leftButton: a(b, "div", "left-button"),
                        rightButton: a(b, "div", "right-button"),
                        track: a(b, "div", "track"),
                        thumb: a(b, "div", "thumb"),
                        thumbBody: a(b, "div", "thumb-body")
                    }
                },
                initSize: function() {
                    var a = c(this.widgets.leftButton).width,
                        b = c(this.widgets.rightButton).width;
                    this.values.viewWidth = c(this.container).width, this.values.trackWidth = this.values.viewWidth - a - b, this.widgets.track.style.width = this.values.trackWidth + "px"
                },
                initServices: function() {
                    this.kfEditor.registerService("ui.show.scrollbar", this, {
                        showScrollbar: this.show
                    }), this.kfEditor.registerService("ui.hide.scrollbar", this, {
                        hideScrollbar: this.hide
                    }), this.kfEditor.registerService("ui.update.scrollbar", this, {
                        updateScrollbar: this.update
                    }), this.kfEditor.registerService("ui.set.scrollbar.update.handler", this, {
                        setUpdateHandler: this.setUpdateHandler
                    }), this.kfEditor.registerService("ui.relocation.scrollbar", this, {
                        relocation: this.relocation
                    })
                },
                initEvent: function() {
                    d(this), e(this), g(this), f(this)
                },
                mountWidget: function() {
                    var a = this.widgets,
                        b = this.container;
                    for (var c in a) a.hasOwnProperty(c) && b.appendChild(a[c]);
                    a.thumb.appendChild(a.thumbBody), a.track.appendChild(a.thumb)
                },
                show: function() {
                    this.state = !0, this.container.style.display = "block"
                },
                hide: function() {
                    this.state = !1, this.container.style.display = "none"
                },
                update: function(a) {
                    var b = this.values.trackWidth,
                        c = 0;
                    return this.isExpand = a > this.values.contentWidth, this.values.contentWidth = a, this.values.scrollWidth = a - this.values.viewWidth, b >= a ? void this.hide() : (c = Math.max(Math.ceil(b * b / a), o.thumbMinSize), this.values.thumbWidth = c, this.widgets.thumb.style.width = c + "px", void(this.widgets.thumbBody.style.width = c - 10 + "px"))
                },
                setUpdateHandler: function(a) {
                    this.updateHandler = a
                },
                updateOffset: function(a) {
                    var b = this.values;
                    b.offset = a, b.left = a / b.trackWidth, this.leftOverflow = b.left * (b.contentWidth - b.viewWidth), this.rightOverflow = b.contentWidth - b.viewWidth - this.leftOverflow, this.updateHandler(b.left, b.offset, b)
                },
                relocation: function() {
                    var a = this.kfEditor.requestService("control.get.cursor.location"),
                        b = p.padding,
                        c = this.values.contentWidth,
                        d = this.values.viewWidth,
                        e = this.values.left * (c - d),
                        f = 0;
                    a.x < e ? (a.x < 0 && (a.x = 0), l(this, a.x)) : a.x + b > e + d ? (a.x += b, a.x > c && (a.x = c), f = a.x - d, l(this, f)) : this.isExpand ? m(this, this.leftOverflow) : m(this, c - d - this.rightOverflow)
                }
            })
        }
    }, b[47] = {
        value: function() {
            function a(a) {
                this.node = a, this.classes = a.className.replace(/^\s+|\s+$/g, "").split(/\s+/)
            }
            var c = b.r(14),
                d = b.r(20),
                e = {},
                f = {
                    ele: function(a, b, c) {
                        var d = null;
                        return "text" === b ? a.createTextNode(c) : (d = a.createElement(b), c.className && (d.className = c.className), c.content && (d.innerHTML = c.content), d)
                    },
                    getRectBox: function(a) {
                        return a.getBoundingClientRect()
                    },
                    on: function(a, b, d) {
                        return c(a).on(b, d), this
                    },
                    delegate: function(a, b, d, e) {
                        return c(a).delegate(b, d, e), this
                    },
                    publish: function(a, b) {
                        var c = e[a];
                        c && (b = [].slice.call(arguments, 1), d.Utils.each(c, function(a) {
                            a.apply(null, b)
                        }))
                    },
                    subscribe: function(a, b) {
                        e[a] || (e[a] = []), e[a].push(b)
                    },
                    getClassList: function(b) {
                        return b.classList || new a(b)
                    }
                };
            return a.prototype = {
                constructor: a,
                contains: function(a) {
                    return -1 !== this.classes.indexOf(a)
                },
                add: function(a) {
                    return -1 == this.classes.indexOf(a) && this.classes.push(a), this._update(), this
                },
                remove: function(a) {
                    var b = this.classes.indexOf(a);
                    return -1 !== b && (this.classes.splice(b, 1), this._update()), this
                },
                toggle: function(a) {
                    var b = this.contains(a) ? "remove" : "add";
                    return this[b](a)
                },
                _update: function() {
                    this.node.className = this.classes.join(" ")
                }
            }, f
        }
    }, b[48] = {
        value: function() {
            return {
                DrapdownBox: b.r(44),
                Delimiter: b.r(43),
                Area: b.r(37)
            }
        }
    }, b[49] = {
        value: function() {
            function a(a) {
                return h.ele(a, "div", {
                    className: "kf-editor-toolbar"
                })
            }

            function c(a) {
                return h.ele(a, "div", {
                    className: "kf-editor-inner-toolbar"
                })
            }

            function d(a) {
                var b = a.createElement("div");
                return b.className = "kf-editor-edit-area", b.style.width = "80%", b.style.height = "800px", b
            }

            function e(a) {
                var b = a.createElement("div");
                return b.className = "kf-editor-canvas-container", b
            }

            function f(a) {
                var b = a.createElement("div");
                return b.className = "kf-editor-edit-scrollbar", b
            }
            var g = b.r(20),
                h = b.r(47),
                i = b.r(4),
                j = b.r(32).VIEW_STATE,
                k = b.r(46),
                l = b.r(36),
                m = (b.r(31), b.r(35)),
                n = g.createClass("UIComponent", {
                    constructor: function(b, g) {
                        var h = null;
                        this.options = g, this.container = b.getContainer(), h = this.container.ownerDocument, this.components = {}, this.canvasRect = null, this.viewState = j.NO_OVERFLOW, this.kfEditor = b, this.toolbarWrap = a(h), this.toolbarContainer = c(h), this.editArea = d(h), this.canvasContainer = e(h), this.scrollbarContainer = f(h), this.toolbarWrap.appendChild(this.toolbarContainer), this.container.appendChild(this.toolbarWrap), this.editArea.appendChild(this.canvasContainer), this.container.appendChild(this.editArea), this.container.appendChild(this.scrollbarContainer), this.initComponents(), this.initServices(), this.initEvent(), this.updateContainerSize(this.container, this.toolbarWrap, this.editArea, this.canvasContainer), this.initScrollEvent()
                    },
                    initComponents: function() {
                        this.components.toolbar = new l(this, this.kfEditor, m), this.components.scrollbar = new k(this, this.kfEditor)
                    },
                    updateContainerSize: function(a, b, c) {
                        var d = a.getBoundingClientRect(),
                            e = b.getBoundingClientRect();
                        c.style.width = d.width + "px", c.style.height = d.bottom - e.bottom + "px"
                    },
                    initServices: function() {
                        this.kfEditor.registerService("ui.get.canvas.container", this, {
                            getCanvasContainer: this.getCanvasContainer
                        }), this.kfEditor.registerService("ui.update.canvas.view", this, {
                            updateCanvasView: this.updateCanvasView
                        }), this.kfEditor.registerService("ui.canvas.container.event", this, {
                            on: this.addEvent,
                            off: this.removeEvent,
                            trigger: this.trigger,
                            fire: this.trigger
                        })
                    },
                    initEvent: function() {},
                    initScrollEvent: function() {
                        var a = this;
                        this.kfEditor.requestService("ui.set.scrollbar.update.handler", function(b, c, d) {
                            c = Math.floor(b * (d.contentWidth - d.viewWidth)), a.kfEditor.requestService("render.set.canvas.offset", c)
                        })
                    },
                    getCanvasContainer: function() {
                        return this.canvasContainer
                    },
                    addEvent: function(a, b) {
                        i.addEvent(this.canvasContainer, a, b)
                    },
                    removeEvent: function() {},
                    trigger: function(a) {
                        i.trigger(this.canvasContainer, a)
                    },
                    updateCanvasView: function() {
                        var a = this.kfEditor.requestService("render.get.canvas"),
                            b = a.getContentContainer(),
                            c = null;
                        null === this.canvasRect && (this.canvasRect = this.canvasContainer.getBoundingClientRect()), c = b.getRenderBox("paper"), c.width > this.canvasRect.width ? (this.viewState === j.NO_OVERFLOW && (this.toggleViewState(), this.kfEditor.requestService("ui.show.scrollbar"), this.kfEditor.requestService("render.disable.relocation")), this.kfEditor.requestService("render.relocation"), this.kfEditor.requestService("ui.update.scrollbar", c.width), this.kfEditor.requestService("ui.relocation.scrollbar")) : (this.viewState === j.OVERFLOW && (this.toggleViewState(), this.kfEditor.requestService("ui.hide.scrollbar"), this.kfEditor.requestService("render.enable.relocation")), this.kfEditor.requestService("render.relocation"))
                    },
                    toggleViewState: function() {
                        this.viewState = this.viewState === j.NO_OVERFLOW ? j.OVERFLOW : j.NO_OVERFLOW
                    }
                });
            return n
        }
    }, b[50] = {
        value: function() {
            var a = b.r(12),
                c = b.r(13);
            a.registerComponents("ui", b.r(49)), a.registerComponents("parser", b.r(21)), a.registerComponents("render", b.r(25)), a.registerComponents("position", b.r(23)), a.registerComponents("syntax", b.r(28)), a.registerComponents("control", b.r(5)), a.registerComponents("print", b.r(24)), kf.EditorFactory = c
        }
    };
    var c = {
        "kf.start": 50
    };
    ! function() {
        try {
            a("kf.start")
        } catch (b) {}
    }(this)
}();