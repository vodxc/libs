var base2 = {
  name: "base2",
  version: "1.0",
  exports: "Base,Package,Abstract,Module,Enumerable,Map,Collection,RegGrp,Undefined,Null,This,True,False,assignID,detect,global",
  namespace: ""
};
new
function(_y) {
  var Undefined = K(),
  Null = K(null),
  True = K(true),
  False = K(false),
  This = function() {
    return this
  };
  var global = This();
  var base2 = global.base2;
  var _z = /%([1-9])/g;
  var _g = /^\s\s*/;
  var _h = /\s\s*$/;
  var _i = /([\/()[\]{}|*+-.,^$?\\])/g;
  var _9 = /try/.test(detect) ? /\bbase\b/: /.*/;
  var _a = ["constructor", "toString", "valueOf"];
  var _j = detect("(jscript)") ? new RegExp("^" + rescape(isNaN).replace(/isNaN/, "\\w+") + "$") : {
    test: False
  };
  var _k = 1;
  var _2 = Array.prototype.slice;
  _5();
  function assignID(a) {
    if (!a.base2ID) a.base2ID = "b2_" + _k++;
    return a.base2ID
  };
  var _b = function(a, b) {
    base2.__prototyping = this.prototype;
    var c = new this;
    if (a) extend(c, a);
    delete base2.__prototyping;
    var e = c.constructor;
    function d() {
      if (!base2.__prototyping) {
        if (this.constructor == arguments.callee || this.__constructing) {
          this.__constructing = true;
          e.apply(this, arguments);
          delete this.__constructing
        } else {
          return extend(arguments[0], c)
        }
      }
      return this
    };
    c.constructor = d;
    for (var f in Base) d[f] = this[f];
    d.ancestor = this;
    d.base = Undefined;
    if (b) extend(d, b);
    d.prototype = c;
    if (d.init) d.init();
    return d
  };
  var Base = _b.call(Object, {
    constructor: function() {
      if (arguments.length > 0) {
        this.extend(arguments[0])
      }
    },
    base: function() {},
    extend: delegate(extend)
  },
  Base = {
    ancestorOf: function(a) {
      return _7(this, a)
    },
    extend: _b,
    forEach: function(a, b, c) {
      _5(this, a, b, c)
    },
    implement: function(a) {
      if (typeof a == "function") {
        a = a.prototype
      }
      extend(this.prototype, a);
      return this
    }
  });
  var Package = Base.extend({
    constructor: function(e, d) {
      this.extend(d);
      if (this.init) this.init();
      if (this.name && this.name != "base2") {
        if (!this.parent) this.parent = base2;
        this.parent.addName(this.name, this);
        this.namespace = format("var %1=%2;", this.name, String2.slice(this, 1, -1))
      }
      if (e) {
        var f = base2.JavaScript ? base2.JavaScript.namespace: "";
        e.imports = Array2.reduce(csv(this.imports),
        function(a, b) {
          var c = h(b) || h("JavaScript." + b);
          return a += c.namespace
        },
        "var base2=(function(){return this.base2})();" + base2.namespace + f) + lang.namespace;
        e.exports = Array2.reduce(csv(this.exports),
        function(a, b) {
          var c = this.name + "." + b;
          this.namespace += "var " + b + "=" + c + ";";
          return a += "if(!" + c + ")" + c + "=" + b + ";"
        },
        "", this) + "this._l" + this.name + "();";
        var g = this;
        var i = String2.slice(this, 1, -1);
        e["_l" + this.name] = function() {
          Package.forEach(g,
          function(a, b) {
            if (a && a.ancestorOf == Base.ancestorOf) {
              a.toString = K(format("[%1.%2]", i, b));
              if (a.prototype.toString == Base.prototype.toString) {
                a.prototype.toString = K(format("[object %1.%2]", i, b))
              }
            }
          })
        }
      }
      function h(a) {
        a = a.split(".");
        var b = base2,
        c = 0;
        while (b && a[c] != null) {
          b = b[a[c++]]
        }
        return b
      }
    },
    exports: "",
    imports: "",
    name: "",
    namespace: "",
    parent: null,
    addName: function(a, b) {
      if (!this[a]) {
        this[a] = b;
        this.exports += "," + a;
        this.namespace += format("var %1=%2.%1;", a, this.name)
      }
    },
    addPackage: function(a) {
      this.addName(a, new Package(null, {
        name: a,
        parent: this
      }))
    },
    toString: function() {
      return format("[%1]", this.parent ? String2.slice(this.parent, 1, -1) + "." + this.name: this.name)
    }
  });
  var Abstract = Base.extend({
    constructor: function() {
      throw new TypeError("Abstract class cannot be instantiated.");
    }
  });
  var _m = 0;
  var Module = Abstract.extend(null, {
    namespace: "",
    extend: function(a, b) {
      var c = this.base();
      var e = _m++;
      c.namespace = "";
      c.partial = this.partial;
      c.toString = K("[base2.Module[" + e + "]]");
      Module[e] = c;
      c.implement(this);
      if (a) c.implement(a);
      if (b) {
        extend(c, b);
        if (c.init) c.init()
      }
      return c
    },
    forEach: function(c, e) {
      _5(Module, this.prototype,
      function(a, b) {
        if (typeOf(a) == "function") {
          c.call(e, this[b], b, this)
        }
      },
      this)
    },
    implement: function(a) {
      var b = this;
      var c = b.toString().slice(1, -1);
      if (typeof a == "function") {
        if (!_7(a, b)) {
          this.base(a)
        }
        if (_7(Module, a)) {
          for (var e in a) {
            if (b[e] === undefined) {
              var d = a[e];
              if (typeof d == "function" && d.call && a.prototype[e]) {
                d = _n(a, e)
              }
              b[e] = d
            }
          }
          b.namespace += a.namespace.replace(/base2\.Module\[\d+\]/g, c)
        }
      } else {
        extend(b, a);
        _c(b, a)
      }
      return b
    },
    partial: function() {
      var c = Module.extend();
      var e = c.toString().slice(1, -1);
      c.namespace = this.namespace.replace(/(\w+)=b[^\)]+\)/g, "$1=" + e + ".$1");
      this.forEach(function(a, b) {
        c[b] = partial(bind(a, c))
      });
      return c
    }
  });
  function _c(a, b) {
    var c = a.prototype;
    var e = a.toString().slice(1, -1);
    for (var d in b) {
      var f = b[d],
      g = "";
      if (d.charAt(0) == "@") {
        if (detect(d.slice(1))) _c(a, f)
      } else if (!c[d]) {
        if (d == d.toUpperCase()) {
          g = "var " + d + "=" + e + "." + d + ";"
        } else if (typeof f == "function" && f.call) {
          g = "var " + d + "=base2.lang.bind('" + d + "'," + e + ");";
          c[d] = _o(a, d)
        }
        if (a.namespace.indexOf(g) == -1) {
          a.namespace += g
        }
      }
    }
  };
  function _n(a, b) {
    return function() {
      return a[b].apply(a, arguments)
    }
  };
  function _o(b, c) {
    return function() {
      var a = _2.call(arguments);
      a.unshift(this);
      return b[c].apply(b, a)
    }
  };
  var Enumerable = Module.extend({
    every: function(c, e, d) {
      var f = true;
      try {
        forEach(c,
        function(a, b) {
          f = e.call(d, a, b, c);
          if (!f) throw StopIteration;
        })
      } catch(error) {
        if (error != StopIteration) throw error;
      }
      return !! f
    },
    filter: function(e, d, f) {
      var g = 0;
      return this.reduce(e,
      function(a, b, c) {
        if (d.call(f, b, c, e)) {
          a[g++] = b
        }
        return a
      },
      [])
    },
    invoke: function(b, c) {
      var e = _2.call(arguments, 2);
      return this.map(b, (typeof c == "function") ?
      function(a) {
        return a == null ? undefined: c.apply(a, e)
      }: function(a) {
        return a == null ? undefined: a[c].apply(a, e)
      })
    },
    map: function(c, e, d) {
      var f = [],
      g = 0;
      forEach(c,
      function(a, b) {
        f[g++] = e.call(d, a, b, c)
      });
      return f
    },
    pluck: function(b, c) {
      return this.map(b,
      function(a) {
        return a == null ? undefined: a[c]
      })
    },
    reduce: function(c, e, d, f) {
      var g = arguments.length > 2;
      forEach(c,
      function(a, b) {
        if (g) {
          d = e.call(f, d, a, b, c)
        } else {
          d = a;
          g = true
        }
      });
      return d
    },
    some: function(a, b, c) {
      return ! this.every(a, not(b), c)
    }
  });
  var _1 = "#";
  var Map = Base.extend({
    constructor: function(a) {
      if (a) this.merge(a)
    },
    clear: function() {
      for (var a in this) if (a.indexOf(_1) == 0) {
        delete this[a]
      }
    },
    copy: function() {
      base2.__prototyping = true;
      var a = new this.constructor;
      delete base2.__prototyping;
      for (var b in this) if (this[b] !== a[b]) {
        a[b] = this[b]
      }
      return a
    },
    forEach: function(a, b) {
      for (var c in this) if (c.indexOf(_1) == 0) {
        a.call(b, this[c], c.slice(1), this)
      }
    },
    get: function(a) {
      return this[_1 + a]
    },
    getKeys: function() {
      return this.map(II)
    },
    getValues: function() {
      return this.map(I)
    },
    has: function(a) {
      /*@cc_on @*/
      /*@if(@_jscript_version<5.5)return $Legacy.has(this,_1+a);@else @*/
      return _1 + a in this;
      /*@end @*/
    },
    merge: function(b) {
      var c = flip(this.put);
      forEach(arguments,
      function(a) {
        forEach(a, c, this)
      },
      this);
      return this
    },
    put: function(a, b) {
      this[_1 + a] = b
    },
    remove: function(a) {
      delete this[_1 + a]
    },
    size: function() {
      var a = 0;
      for (var b in this) if (b.indexOf(_1) == 0) a++;
      return a
    },
    union: function(a) {
      return this.merge.apply(this.copy(), arguments)
    }
  });
  Map.implement(Enumerable);
  Map.prototype.filter = function(e, d) {
    return this.reduce(function(a, b, c) {
      if (!e.call(d, b, c, this)) {
        a.remove(c)
      }
      return a
    },
    this.copy(), this)
  };
  var _0 = "~";
  var Collection = Map.extend({
    constructor: function(a) {
      this[_0] = new Array2;
      this.base(a)
    },
    add: function(a, b) {
      assert(!this.has(a), "Duplicate key '" + a + "'.");
      this.put.apply(this, arguments)
    },
    clear: function() {
      this.base();
      this[_0].length = 0
    },
    copy: function() {
      var a = this.base();
      a[_0] = this[_0].copy();
      return a
    },
    forEach: function(a, b) {
      var c = this[_0];
      var e = c.length;
      for (var d = 0; d < e; d++) {
        a.call(b, this[_1 + c[d]], c[d], this)
      }
    },
    getAt: function(a) {
      var b = this[_0].item(a);
      return (b === undefined) ? undefined: this[_1 + b]
    },
    getKeys: function() {
      return this[_0].copy()
    },
    indexOf: function(a) {
      return this[_0].indexOf(String(a))
    },
    insertAt: function(a, b, c) {
      assert(this[_0].item(a) !== undefined, "Index out of bounds.");
      assert(!this.has(b), "Duplicate key '" + b + "'.");
      this[_0].insertAt(a, String(b));
      this[_1 + b] = null;
      this.put.apply(this, _2.call(arguments, 1))
    },
    item: function(a) {
      return this[typeof a == "number" ? "getAt": "get"](a)
    },
    put: function(a, b) {
      if (!this.has(a)) {
        this[_0].push(String(a))
      }
      var c = this.constructor;
      if (c.Item && !instanceOf(b, c.Item)) {
        b = c.create.apply(c, arguments)
      }
      this[_1 + a] = b
    },
    putAt: function(a, b) {
      arguments[0] = this[_0].item(a);
      assert(arguments[0] !== undefined, "Index out of bounds.");
      this.put.apply(this, arguments)
    },
    remove: function(a) {
      if (this.has(a)) {
        this[_0].remove(String(a));
        delete this[_1 + a]
      }
    },
    removeAt: function(a) {
      var b = this[_0].item(a);
      if (b !== undefined) {
        this[_0].removeAt(a);
        delete this[_1 + b]
      }
    },
    reverse: function() {
      this[_0].reverse();
      return this
    },
    size: function() {
      return this[_0].length
    },
    slice: function(a, b) {
      var c = this.copy();
      if (arguments.length > 0) {
        var e = this[_0],
        d = e;
        c[_0] = Array2(_2.apply(e, arguments));
        if (c[_0].length) {
          d = d.slice(0, a);
          if (arguments.length > 1) {
            d = d.concat(e.slice(b))
          }
        }
        for (var f = 0; f < d.length; f++) {
          delete c[_1 + d[f]]
        }
      }
      return c
    },
    sort: function(c) {
      if (c) {
        this[_0].sort(bind(function(a, b) {
          return c(this[_1 + a], this[_1 + b], a, b)
        },
        this))
      } else this[_0].sort();
      return this
    },
    toString: function() {
      return "(" + (this[_0] || "") + ")"
    }
  },
  {
    Item: null,
    create: function(a, b) {
      return this.Item ? new this.Item(a, b) : b
    },
    extend: function(a, b) {
      var c = this.base(a);
      c.create = this.create;
      if (b) extend(c, b);
      if (!c.Item) {
        c.Item = this.Item
      } else if (typeof c.Item != "function") {
        c.Item = (this.Item || Base).extend(c.Item)
      }
      if (c.init) c.init();
      return c
    }
  });
  var _p = /\\(\d+)/g,
  _q = /\\./g,
  _r = /\(\?[:=!]|\[[^\]]+\]/g,
  _s = /\(/g,
  _t = /\$(\d+)/,
  _u = /^\$\d+$/;
  var RegGrp = Collection.extend({
    constructor: function(a, b) {
      this.base(a);
      this.ignoreCase = !!b
    },
    ignoreCase: false,
    exec: function(g, i) {
      g += "";
      var h = this,
      j = this[_0];
      if (!j.length) return g;
      if (i == RegGrp.IGNORE) i = 0;
      return g.replace(new RegExp(this, this.ignoreCase ? "gi": "g"),
      function(a) {
        var b, c = 1,
        e = 0;
        while ((b = h[_1 + j[e++]])) {
          var d = c + b.length + 1;
          if (arguments[c]) {
            var f = i == null ? b.replacement: i;
            switch (typeof f) {
            case "function":
              return f.apply(h, _2.call(arguments, c, d));
            case "number":
              return arguments[c + f];
            default:
              return f
            }
          }
          c = d
        }
        return a
      })
    },
    insertAt: function(a, b, c) {
      if (instanceOf(b, RegExp)) {
        arguments[1] = b.source
      }
      return base(this, arguments)
    },
    test: function(a) {
      return this.exec(a) != a
    },
    toString: function() {
      var d = 1;
      return "(" + this.map(function(c) {
        var e = (c + "").replace(_p,
        function(a, b) {
          return "\\" + (d + Number(b))
        });
        d += c.length + 1;
        return e
      }).join(")|(") + ")"
    }
  },
  {
    IGNORE: "$0",
    init: function() {
      forEach("add,get,has,put,remove".split(","),
      function(b) {
        _8(this, b,
        function(a) {
          if (instanceOf(a, RegExp)) {
            arguments[0] = a.source
          }
          return base(this, arguments)
        })
      },
      this.prototype)
    },
    Item: {
      constructor: function(a, b) {
        if (b == null) b = RegGrp.IGNORE;
        else if (b.replacement != null) b = b.replacement;
        else if (typeof b != "function") b = String(b);
        if (typeof b == "string" && _t.test(b)) {
          if (_u.test(b)) {
            b = parseInt(b.slice(1))
          } else {
            var c = '"';
            b = b.replace(/\\/g, "\\\\").replace(/"/g, "\\x22").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\$(\d+)/g, c + "+(arguments[$1]||" + c + c + ")+" + c).replace(/(['"])\1\+(.*)\+\1\1$/, "$1");
            b = new Function("return " + c + b + c)
          }
        }
        this.length = RegGrp.count(a);
        this.replacement = b;
        this.toString = K(a + "")
      },
      length: 0,
      replacement: ""
    },
    count: function(a) {
      a = (a + "").replace(_q, "").replace(_r, "");
      return match(a, _s).length
    }
  });
  var lang = {
    name: "lang",
    version: base2.version,
    exports: "assert,assertArity,assertType,base,bind,copy,extend,forEach,format,instanceOf,match,pcopy,rescape,trim,typeOf",
    namespace: ""
  };
  function assert(a, b, c) {
    if (!a) {
      throw new(c || Error)(b || "Assertion failed.");
    }
  };
  function assertArity(a, b, c) {
    if (b == null) b = a.callee.length;
    if (a.length < b) {
      throw new SyntaxError(c || "Not enough arguments.");
    }
  };
  function assertType(a, b, c) {
    if (b && (typeof b == "function" ? !instanceOf(a, b) : typeOf(a) != b)) {
      throw new TypeError(c || "Invalid type.");
    }
  };
  function copy(a) {
    var b = {};
    for (var c in a) {
      b[c] = a[c]
    }
    return b
  };
  function pcopy(a) {
    _d.prototype = a;
    return new _d
  };
  function _d() {};
  function base(a, b) {
    return a.base.apply(a, b)
  };
  function extend(a, b) {
    if (a && b) {
      if (arguments.length > 2) {
        var c = b;
        b = {};
        b[c] = arguments[2]
      }
      var e = global[(typeof b == "function" ? "Function": "Object")].prototype;
      if (base2.__prototyping) {
        var d = _a.length,
        c;
        while ((c = _a[--d])) {
          var f = b[c];
          if (f != e[c]) {
            if (_9.test(f)) {
              _8(a, c, f)
            } else {
              a[c] = f
            }
          }
        }
      }
      for (c in b) {
        if (e[c] === undefined) {
          var f = b[c];
          if (c.charAt(0) == "@") {
            if (detect(c.slice(1))) extend(a, f)
          } else {
            var g = a[c];
            if (g && typeof f == "function") {
              if (f != g) {
                if (_9.test(f)) {
                  _8(a, c, f)
                } else {
                  f.ancestor = g;
                  a[c] = f
                }
              }
            } else {
              a[c] = f
            }
          }
        }
      }
    }
    return a
  };
  function _7(a, b) {
    while (b) {
      if (!b.ancestor) return false;
      b = b.ancestor;
      if (b == a) return true
    }
    return false
  };
  function _8(c, e, d) {
    var f = c[e];
    var g = base2.__prototyping;
    if (g && f != g[e]) g = null;
    function i() {
      var a = this.base;
      this.base = g ? g[e] : f;
      var b = d.apply(this, arguments);
      this.base = a;
      return b
    };
    i.method = d;
    i.ancestor = f;
    c[e] = i
  };
  if (typeof StopIteration == "undefined") {
    StopIteration = new Error("StopIteration")
  }
  function forEach(a, b, c, e) {
    if (a == null) return;
    if (!e) {
      if (typeof a == "function" && a.call) {
        e = Function
      } else if (typeof a.forEach == "function" && a.forEach != arguments.callee) {
        a.forEach(b, c);
        return
      } else if (typeof a.length == "number") {
        _e(a, b, c);
        return
      }
    }
    _5(e || Object, a, b, c)
  };
  forEach.csv = function(a, b, c) {
    forEach(csv(a), b, c)
  };
  forEach.detect = function(c, e, d) {
    forEach(c,
    function(a, b) {
      if (b.charAt(0) == "@") {
        if (detect(b.slice(1))) forEach(a, arguments.callee)
      } else e.call(d, a, b, c)
    })
  };
  function _e(a, b, c) {
    if (a == null) a = global;
    var e = a.length || 0,
    d;
    if (typeof a == "string") {
      for (d = 0; d < e; d++) {
        b.call(c, a.charAt(d), d, a)
      }
    } else {
      for (d = 0; d < e; d++) {
        /*@cc_on @*/
        /*@if(@_jscript_version<5.2)if($Legacy.has(a,d))@else @*/
        if (d in a)
        /*@end @*/
        b.call(c, a[d], d, a)
      }
    }
  };
  function _5(g, i, h, j) {
    var k = function() {
      this.i = 1
    };
    k.prototype = {
      i: 1
    };
    var l = 0;
    for (var m in new k) l++;
    _5 = (l > 1) ?
    function(a, b, c, e) {
      var d = {};
      for (var f in b) {
        if (!d[f] && a.prototype[f] === undefined) {
          d[f] = true;
          c.call(e, b[f], f, b)
        }
      }
    }: function(a, b, c, e) {
      for (var d in b) {
        if (a.prototype[d] === undefined) {
          c.call(e, b[d], d, b)
        }
      }
    };
    _5(g, i, h, j)
  };
  function instanceOf(a, b) {
    if (typeof b != "function") {
      throw new TypeError("Invalid 'instanceOf' operand.");
    }
    if (a == null) return false;
    /*@cc_on if(typeof a.constructor!="function"){return typeOf(a)==typeof b.prototype.valueOf()}@*/
    if (a.constructor == b) return true;
    if (b.ancestorOf) return b.ancestorOf(a.constructor);
    /*@if(@_jscript_version<5.1)@else @*/
    if (a instanceof b) return true;
    /*@end @*/
    if (Base.ancestorOf == b.ancestorOf) return false;
    if (Base.ancestorOf == a.constructor.ancestorOf) return b == Object;
    switch (b) {
    case Array:
      return !! (typeof a == "object" && a.join && a.splice);
    case Function:
      return typeOf(a) == "function";
    case RegExp:
      return typeof a.constructor.$1 == "string";
    case Date:
      return !! a.getTimezoneOffset;
    case String:
    case Number:
    case Boolean:
      return typeOf(a) == typeof b.prototype.valueOf();
    case Object:
      return true
    }
    return false
  };
  function typeOf(a) {
    var b = typeof a;
    switch (b) {
    case "object":
      return a == null ? "null": typeof a.constructor == "undefined" ? _j.test(a) ? "function": b: typeof a.constructor.prototype.valueOf();
    case "function":
      return typeof a.call == "function" ? b: "object";
    default:
      return b
    }
  };
  var JavaScript = {
    name: "JavaScript",
    version: base2.version,
    exports: "Array2,Date2,Function2,String2",
    namespace: "",
    bind: function(c) {
      var e = global;
      global = c;
      forEach.csv(this.exports,
      function(a) {
        var b = a.slice(0, -1);
        extend(c[b], this[a]);
        this[a](c[b].prototype)
      },
      this);
      global = e;
      return c
    }
  };
  function _6(b, c, e, d) {
    var f = Module.extend();
    var g = f.toString().slice(1, -1);
    forEach.csv(e,
    function(a) {
      f[a] = unbind(b.prototype[a]);
      f.namespace += format("var %1=%2.%1;", a, g)
    });
    forEach(_2.call(arguments, 3), f.implement, f);
    var i = function() {
      return f(this.constructor == f ? c.apply(null, arguments) : arguments[0])
    };
    i.prototype = f.prototype;
    for (var h in f) {
      if (h != "prototype" && b[h]) {
        f[h] = b[h];
        delete f.prototype[h]
      }
      i[h] = f[h]
    }
    i.ancestor = Object;
    delete i.extend;
    i.namespace = i.namespace.replace(/(var (\w+)=)[^,;]+,([^\)]+)\)/g, "$1$3.$2");
    return i
  };
  if ((new Date).getYear() > 1900) {
    Date.prototype.getYear = function() {
      return this.getFullYear() - 1900
    };
    Date.prototype.setYear = function(a) {
      return this.setFullYear(a + 1900)
    }
  }
  var _f = new Date(Date.UTC(2006, 1, 20));
  _f.setUTCDate(15);
  if (_f.getUTCHours() != 0) {
    forEach.csv("FullYear,Month,Date,Hours,Minutes,Seconds,Milliseconds",
    function(b) {
      extend(Date.prototype, "setUTC" + b,
      function() {
        var a = base(this, arguments);
        if (a >= 57722401000) {
          a -= 3600000;
          this.setTime(a)
        }
        return a
      })
    })
  }
  Function.prototype.prototype = {};
  if ("".replace(/^/, K("$$")) == "$") {
    extend(String.prototype, "replace",
    function(a, b) {
      if (typeof b == "function") {
        var c = b;
        b = function() {
          return String(c.apply(null, arguments)).split("$").join("$$")
        }
      }
      return this.base(a, b)
    })
  }
  var Array2 = _6(Array, Array, "concat,join,pop,push,reverse,shift,slice,sort,splice,unshift", Enumerable, {
    combine: function(e, d) {
      if (!d) d = e;
      return Array2.reduce(e,
      function(a, b, c) {
        a[b] = d[c];
        return a
      },
      {})
    },
    contains: function(a, b) {
      return Array2.indexOf(a, b) != -1
    },
    copy: function(a) {
      var b = _2.call(a);
      if (!b.swap) Array2(b);
      return b
    },
    flatten: function(c) {
      var e = 0;
      return Array2.reduce(c,
      function(a, b) {
        if (Array2.like(b)) {
          Array2.reduce(b, arguments.callee, a)
        } else {
          a[e++] = b
        }
        return a
      },
      [])
    },
    forEach: _e,
    indexOf: function(a, b, c) {
      var e = a.length;
      if (c == null) {
        c = 0
      } else if (c < 0) {
        c = Math.max(0, e + c)
      }
      for (var d = c; d < e; d++) {
        if (a[d] === b) return d
      }
      return - 1
    },
    insertAt: function(a, b, c) {
      Array2.splice(a, b, 0, c);
      return c
    },
    item: function(a, b) {
      if (b < 0) b += a.length;
      return a[b]
    },
    lastIndexOf: function(a, b, c) {
      var e = a.length;
      if (c == null) {
        c = e - 1
      } else if (c < 0) {
        c = Math.max(0, e + c)
      }
      for (var d = c; d >= 0; d--) {
        if (a[d] === b) return d
      }
      return - 1
    },
    map: function(c, e, d) {
      var f = [];
      Array2.forEach(c,
      function(a, b) {
        f[b] = e.call(d, a, b, c)
      });
      return f
    },
    remove: function(a, b) {
      var c = Array2.indexOf(a, b);
      if (c != -1) Array2.removeAt(a, c)
    },
    removeAt: function(a, b) {
      Array2.splice(a, b, 1)
    },
    swap: function(a, b, c) {
      if (b < 0) b += a.length;
      if (c < 0) c += a.length;
      var e = a[b];
      a[b] = a[c];
      a[c] = e;
      return a
    }
  });
  Array2.reduce = Enumerable.reduce;
  Array2.like = function(a) {
    return typeOf(a) == "object" && typeof a.length == "number"
  };
  var _v = /^((-\d+|\d{4,})(-(\d{2})(-(\d{2}))?)?)?T((\d{2})(:(\d{2})(:(\d{2})(\.(\d{1,3})(\d)?\d*)?)?)?)?(([+-])(\d{2})(:(\d{2}))?|Z)?$/;
  var _4 = {
    FullYear: 2,
    Month: 4,
    Date: 6,
    Hours: 8,
    Minutes: 10,
    Seconds: 12,
    Milliseconds: 14
  };
  var _3 = {
    Hectomicroseconds: 15,
    UTC: 16,
    Sign: 17,
    Hours: 18,
    Minutes: 20
  };
  var _w = /(((00)?:0+)?:0+)?\.0+$/;
  var _x = /(T[0-9:.]+)$/;
  var Date2 = _6(Date,
  function(a, b, c, e, d, f, g) {
    switch (arguments.length) {
    case 0:
      return new Date;
    case 1:
      return typeof a == "number" ? new Date(a) : Date2.parse(a);
    default:
      return new Date(a, b, arguments.length == 2 ? 1 : c, e || 0, d || 0, f || 0, g || 0)
    }
  },
  "", {
    toISOString: function(c) {
      var e = "####-##-##T##:##:##.###";
      for (var d in _4) {
        e = e.replace(/#+/,
        function(a) {
          var b = c["getUTC" + d]();
          if (d == "Month") b++;
          return ("000" + b).slice( - a.length)
        })
      }
      return e.replace(_w, "").replace(_x, "$1Z")
    }
  });
  delete Date2.forEach;
  Date2.now = function() {
    return (new Date).valueOf()
  };
  Date2.parse = function(a, b) {
    if (arguments.length > 1) {
      assertType(b, "number", "default date should be of type 'number'.")
    }
    var c = match(a, _v);
    if (c.length) {
      if (c[_4.Month]) c[_4.Month]--;
      if (c[_3.Hectomicroseconds] >= 5) c[_4.Milliseconds]++;
      var e = new Date(b || 0);
      var d = c[_3.UTC] || c[_3.Hours] ? "UTC": "";
      for (var f in _4) {
        var g = c[_4[f]];
        if (!g) continue;
        e["set" + d + f](g);
        if (e["get" + d + f]() != c[_4[f]]) {
          return NaN
        }
      }
      if (c[_3.Hours]) {
        var i = Number(c[_3.Sign] + c[_3.Hours]);
        var h = Number(c[_3.Sign] + (c[_3.Minutes] || 0));
        e.setUTCMinutes(e.getUTCMinutes() + (i * 60) + h)
      }
      return e.valueOf()
    } else {
      return Date.parse(a)
    }
  };
  var String2 = _6(String,
  function(a) {
    return new String(arguments.length == 0 ? "": a)
  },
  "charAt,charCodeAt,concat,indexOf,lastIndexOf,match,replace,search,slice,split,substr,substring,toLowerCase,toUpperCase", {
    csv: csv,
    format: format,
    rescape: rescape,
    trim: trim
  });
  delete String2.forEach;
  function trim(a) {
    return String(a).replace(_g, "").replace(_h, "")
  };
  function csv(a) {
    return a ? (a + "").split(/\s*,\s*/) : []
  };
  function format(c) {
    var e = arguments;
    var d = new RegExp("%([1-" + (arguments.length - 1) + "])", "g");
    return (c + "").replace(d,
    function(a, b) {
      return e[b]
    })
  };
  function match(a, b) {
    return (a + "").match(b) || []
  };
  function rescape(a) {
    return (a + "").replace(_i, "\\$1")
  };
  var Function2 = _6(Function, Function, "", {
    I: I,
    II: II,
    K: K,
    bind: bind,
    compose: compose,
    delegate: delegate,
    flip: flip,
    not: not,
    partial: partial,
    unbind: unbind
  });
  function I(a) {
    return a
  };
  function II(a, b) {
    return b
  };
  function K(a) {
    return function() {
      return a
    }
  };
  function bind(a, b) {
    var c = typeof a != "function";
    if (arguments.length > 2) {
      var e = _2.call(arguments, 2);
      return function() {
        return (c ? b[a] : a).apply(b, e.concat.apply(e, arguments))
      }
    } else {
      return function() {
        return (c ? b[a] : a).apply(b, arguments)
      }
    }
  };
  function compose() {
    var c = _2.call(arguments);
    return function() {
      var a = c.length,
      b = c[--a].apply(this, arguments);
      while (a--) b = c[a].call(this, b);
      return b
    }
  };
  function delegate(b, c) {
    return function() {
      var a = _2.call(arguments);
      a.unshift(this);
      return b.apply(c, a)
    }
  };
  function flip(a) {
    return function() {
      return a.apply(this, Array2.swap(arguments, 0, 1))
    }
  };
  function not(a) {
    return function() {
      return ! a.apply(this, arguments)
    }
  };
  function partial(e) {
    var d = _2.call(arguments, 1);
    return function() {
      var a = d.concat(),
      b = 0,
      c = 0;
      while (b < d.length && c < arguments.length) {
        if (a[b] === undefined) a[b] = arguments[c++];
        b++
      }
      while (c < arguments.length) {
        a[b++] = arguments[c++]
      }
      if (Array2.contains(a, undefined)) {
        a.unshift(e);
        return partial.apply(null, a)
      }
      return e.apply(this, a)
    }
  };
  function unbind(b) {
    return function(a) {
      return b.apply(a, _2.call(arguments, 1))
    }
  };
  function detect() {
    var d = NaN
    /*@cc_on||@_jscript_version@*/
    ;
    var f = global.java ? true: false;
    if (global.navigator) {
      var g = /MSIE[\d.]+/g;
      var i = document.createElement("span");
      var h = navigator.userAgent.replace(/([a-z])[\s\/](\d)/gi, "$1$2");
      if (!d) h = h.replace(g, "");
      if (g.test(h)) h = h.match(g)[0] + " " + h.replace(g, "");
      base2.userAgent = navigator.platform + " " + h.replace(/like \w+/gi, "");
      f &= navigator.javaEnabled()
    }
    var j = {};
    detect = function(a) {
      if (j[a] == null) {
        var b = false,
        c = a;
        var e = c.charAt(0) == "!";
        if (e) c = c.slice(1);
        if (c.charAt(0) == "(") {
          try {
            b = new Function("element,jscript,java,global", "return !!" + c)(i, d, f, global)
          } catch(ex) {}
        } else {
          b = new RegExp("(" + c + ")", "i").test(base2.userAgent)
        }
        j[a] = !!(e ^ b)
      }
      return j[a]
    };
    return detect(arguments[0])
  };
  base2 = global.base2 = new Package(this, base2);
  var exports = this.exports;
  lang = new Package(this, lang);
  exports += this.exports;
  JavaScript = new Package(this, JavaScript);
  eval(exports + this.exports);
  lang.base = base;
  lang.extend = extend
};

