(function(g) {
	if (!g.SOHUZ) {
		g.SOHUZ = {}
	}
	g.SOHUZ.CONF = {
		url_api: "https://www.kuaizhan.com",
		url_res: "//cdn.kuaizhan.com",
		
		
		
	}
})(window);
(function($, g) {
	if (!g.postAdInfo) {
		g.postAdInfo = [];
		for (var i = 0; i < 15; i++) {
			g.postAdInfo.push({
				showCount: 0,
				isRepeatedComponent: false
			})
		}
	}
	if (!g.postRenderInfo) {
		g.postRenderInfo = []
	}
	g.isShowPostAd = true;
	if (!g.SOHUZ) g.SOHUZ = {};
	var Z = g.SOHUZ,
		n = {},
		windowWidth = null;
	Z.isTouch = function() {
		return "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch
	};
	Z.isPreviewMode = function() {
		return Z.page["mode"] && Z.page["mode"] === "preview"
	};
	
	n.winWidth = function() {
		if (!windowWidth && document.body) {
			windowWidth = document.body.offsetWidth
		}
		return windowWidth
	};
	g.winWidth = n.winWidth;
	n.imgResize = function($img, w, radioFree) {
		var picw = 0,
			pich = 0;
		if (!radioFree) {
			if (w < 240) {
				picw = 240;
				pich = 180
			} else if (w < 640) {
				picw = 640;
				pich = 480
			} else {
				picw = 1e3;
				pich = 750
			}
		} else {
			if (w < 640) {
				picw = 640;
				pich = 0
			} else {
				picw = 1e3;
				pich = 0
			}
		}
		var src = $img.attr("src"),
			p_url = /\/[0-9a-zA-Z]{32}-[0-9]+-[0-9]+$/,
			n_url = /\d+x\d+$/,
			newSrc = src;
		if (p_url.test(src)) {
			newSrc = src.replace(/-[0-9]+-[0-9]+/, "-" + picw + "-" + pich)
		} else if (n_url.test(src)) {
			newSrc = src.replace(n_url, picw + "x" + pich)
		}
		$img.attr("src", newSrc);
		$img.css("width", w + "px")
	};
	g.maxImg = function($img, radioFree) {
		n.imgResize($img, n.winWidth(), radioFree)
	};
	Z.api = {
		fix_protocol: function(url) {
			if (url && url.indexOf("//") == 0) {
				return "http:" + url
			}
			return url
		},
		share_info: function() {
			if (Z.share.pic) {
				Z.share.pic = this.fix_protocol(Z.share.pic)
			}
			return $.extend({
				url: window.location.href
			}, Z.share)
		},
		page_info: function() {
			return Z.page
		}
	};
	Z.layout = {
		append_float: function(direction, $el, size) {
			var sel_map = {
				top: "kz-top-float-layer",
				bottom: "kz-page-bottom-float-layer"
			};
			if (!sel_map[direction]) {
				throw new Error("unkonw direction param.")
			}
			var sel = sel_map[direction],
				float_layer = $("body").find("[data-role='" + sel + "']");
			var $kz_manage = $("body").find("[data-role='kz-manage']").size() > 0 ? $("body").find("[data-role='kz-manage']") : $("body").find("[data-role='footer-manage']");
			$kz_manage.before($el);
			switch (direction) {
			case "top":
				var h = size && size.height ? size.height : $el.height();
				var shadow = $("<div></div>").css({
					height: h
				});
				$("#phone-main").prepend(shadow);
				$el.data("float-shadow", shadow);
				break;
			case "bottom":
				var h = size && size.height ? size.height : $el.height();
				var shadow = $("<div></div>").css({
					height: h
				});
				$("#phone-main").append(shadow);
				$el.data("float-shadow", shadow);
				break
			}
		}
	};

})(Zepto, this);
(function(win, doc, $) {
	var kzEvent = {
		events: [],
		registerEvents: function registerEvents(events) {
			var _this = this;
			events.forEach(function(event) {
				if (_this.events.indexOf(event) > -1) {
					console.warn("".concat(event, " is already registered, please communicate with developer"))
				} else {
					_this.events.push(event);
					$.Event(event, {
						bubbles: false
					})
				}
			})
		},
		on: function on(event, callback) {
			$(doc.body).on(event, function(e) {
				for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key]
				}
				callback.apply(void 0, args)
			})
		},
		trigger: $(doc.body).trigger.bind($(doc.body))
	};
	win.kzEvent = kzEvent
})(window, document, $);
(function() {
	

	function render(wrap, html) {
		var root = document.createElement("div");
		root.innerHTML = html;
		wrap.append(root)
	}
	function toast(msg) {
		render(document.querySelector("body"), html);
		setTimeout(function() {
			document.getElementsByClassName("xqui-toast")[0].getElementsByClassName("xqui-toast-msg")[0].innerHTML = msg;
			var toastTag = document.getElementsByClassName("xqui-toast")[0];
			toastTag.className = toastTag.className.replace("toastAnimate", "");
			setTimeout(function() {
				toastTag.className = toastTag.className + " toastAnimate"
			}, 100)
		}, 500)
	}
	if (!window.xqui) {
		window.xqui = {}
	}
	window.xqui.toast = toast
})();
(function(win) {
	win._jumpInnerPage = function(plugin) {
		var formList = document.getElementsByClassName("mod-form");
		if (formList.length > 0) {
			var targetTop = formList[0].offsetTop;
			win.scrollTo(0, targetTop)
		}
	}
})(window);
(function($, g) {
	var Z = g.SOHUZ,
		doc = g.document,
		ui = Z.ui ? Z.ui : {};
	var loader_tpl = '<div class="mod-loader">' + '<span class="icon-loading"></span>' + "<h1>加载中...</h1>" + "</div>",
		picview_tpl = '<div class="picview" style="z-index:13;">' + '<div style="position: relative;">' + '<div class="close-div">' + '<p class="close font-ico" style="font-size:30px;line-height:60px;margin-right:10px;color:white;display: block;position: absolute;right: 0;text-align: center;">&#xe010;</p>' + "</div>" + '<div class="picwrap" style="text-align: center;"><img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" style="float:left;"></div>' + '<div class="desc" style="color: white;line-height: 16px;overflow:hidden;word-wrap: break-word;"></div>' + "</div>" + "</div>",
		toast_tpl = '<div class="mui-toast">' + '<div class="inner"></div>' + "</div>",
		endEvent = function(event) {
			event.preventDefault()
		};
	ui.loader = {
		show: function(msg) {
			var m = this;
			if (!m.wrap) {
				m.wrap = $(loader_tpl);
				$(doc.body).append(m.wrap)
			}
			if (msg) {
				m.wrap.find("h1").html(msg)
			}
			m.wrap.show()
		},
		hide: function() {
			this.wrap.hide()
		}
	};
	ui.toast = {
		show: function(opt) {
			var m = this;
			if (!m.wrap) {
				m.wrap = $(toast_tpl);
				$(doc.body).append(m.wrap)
			}
			if (typeof opt === "string") {
				opt = {
					msg: opt
				}
			}
			if (opt.msg) {
				m.wrap.find(".inner").html(opt.msg)
			}
			m.wrap.addClass("show")
		},
		hide: function(delay) {
			var m = this;
			if (!delay) {
				delay = 0
			}
			setTimeout(function() {
				m.wrap.removeClass("show")
			}, delay)
		}
	};
	ui.PicView = function(opt) {
		var m = this,
			wrap = $(picview_tpl).hide(),
			pg = opt.pg;
		$(doc.body).append(wrap);
		pg.find("li").not(".st-link").find("img").tap(function() {
			m.show($(this));
			doc.body.addEventListener("touchmove", endEvent, false)
		});
		m.wrap = wrap;
		m.pg = pg
	};
	ui.PicView.prototype = {
		show: function(img) {
			var m = this,
				src = img.attr("src"),
				desc = img.next("p").html(),
				wrap = m.wrap;
			var close_div = m.wrap.find(".close-div"),
				pic_wrap = m.wrap.find(".picwrap"),
				img = pic_wrap.find("img"),
				desc_div = m.wrap.find(".desc");
			if (!desc) {
				desc = ""
			}
			wrap.find(".close").on("touchstart click", function(e) {
				e.stopPropagation();
				if (e.type == "touchstart") {} else if (e.type == "click") {
					m.hide()
				}
			});
			m.wrap.find(".picwrap img").attr("src", src);
			window.maxImg(m.wrap.find(".picwrap img"));
			desc = desc.length > 100 ? desc.substring(0, 100) + "..." : desc;
			m.wrap.find(".desc").html(desc);
			close_div.css("height", "60px").css("width", $(window).width());
			desc_div.css("width", $(window).width() - 20).css("padding", "10px");
			m.wrap.show();
			var pic_wrap_height = $(window).height() - 60 - desc_div.height();
			pic_wrap.css("height", pic_wrap_height);
			var imgHeight = window.winWidth() * .75;
			img.css("margin-top", Math.floor((pic_wrap_height - imgHeight) / 2) + "px")
		},
		hide: function() {
			this.wrap.find(".close").off("touchstart click");
			doc.body.removeEventListener("touchmove", endEvent, false);
			this.wrap.hide()
		}
	};
	Z.ui = ui
})(Zepto, this);

function SwipeV1(container, options) {
	"use strict";
	var noop = function() {};
	var offloadFn = function(fn) {
			setTimeout(fn || noop, 0)
		};
	var browser = {
		addEventListener: !! window.addEventListener,
		touch: "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
		transitions: function(temp) {
			var props = ["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"];
			for (var i in props) if (temp.style[props[i]] !== undefined) return true;
			return false
		}(document.createElement("swipe"))
	};
	if (!container) return;
	var element = container.children[0];
	var slides, slidePos, width;
	options = options || {};
	var index = parseInt(options.startSlide, 10) || 0;
	var speed = options.speed || 300;
	options.continuous = options.continuous ? options.continuous : true;

	function setup() {
		slides = element.children;
		slidePos = new Array(slides.length);
		width = container.getBoundingClientRect().width || container.offsetWidth;
		var pos = slides.length;
		while (pos--) {
			var slide = slides[pos];
			slide.style.display = "block";
			slide.setAttribute("data-index", pos);
			if (browser.transitions) {
				move(pos, index > pos ? -width : index < pos ? width : 0, 0)
			}
		}
		if (!browser.transitions) {
			container.style.visibility = "visible"
		}
	}
	function prev() {
		if (index) slide(index - 1);
		else if (options.continuous) slide(slides.length - 1)
	}
	function next() {
		if (index < slides.length - 1) slide(index + 1);
		else if (options.continuous) slide(0)
	}
	function slide(to, slideSpeed) {
		if (index == to) return;
		if (browser.transitions) {
			var diff = Math.abs(index - to) - 1;
			var direction = Math.abs(index - to) / (index - to);
			while (diff--) move((to > index ? to : index) - diff - 1, width * direction, 0);
			move(index, width * direction, slideSpeed || speed);
			move(to, 0, slideSpeed || speed)
		} else {
			animate(index * -width, to * -width, slideSpeed || speed)
		}
		index = to;
		offloadFn(options.callback && options.callback(index, slides[index]))
	}
	function move(index, dist, speed) {
		translate(index, dist, speed);
		slidePos[index] = dist
	}
	function translate(index, dist, speed) {
		var slide = slides[index];
		var style = slide && slide.style;
		if (!style) return;
		style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = speed + "ms";
		style.webkitTransform = "translate(" + dist + "px,0)" + "translateZ(0)";
		style.msTransform = style.MozTransform = style.OTransform = "translateX(" + dist + "px)"
	}
	function animate(from, to, speed) {
		if (!speed) {
			element.style.left = to + "px";
			return
		}
		var start = +new Date;
		var timer = setInterval(function() {
			var timeElap = +new Date - start;
			if (timeElap > speed) {
				element.style.left = to + "px";
				if (delay) begin();
				options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
				clearInterval(timer);
				return
			}
			element.style.left = (to - from) * (Math.floor(timeElap / speed * 100) / 100) + from + "px"
		}, 4)
	}
	var delay = options.auto || 0;
	var interval;

	function begin() {
		interval = setTimeout(next, delay)
	}
	function stop() {
		delay = 0;
		clearTimeout(interval)
	}
	var start = {};
	var delta = {};
	var isScrolling;
	var events = {
		handleEvent: function(event) {
			switch (event.type) {
			case "touchstart":
				this.start(event);
				break;
			case "touchmove":
				this.move(event);
				break;
			case "touchend":
				offloadFn(this.end(event));
				break;
			case "webkitTransitionEnd":
			case "msTransitionEnd":
			case "oTransitionEnd":
			case "otransitionend":
			case "transitionend":
				offloadFn(this.transitionEnd(event));
				break;
			case "resize":
				offloadFn(setup.call());
				break
			}
			if (options.stopPropagation) event.stopPropagation()
		},
		start: function(event) {
			var touches = event.touches[0];
			start = {
				x: touches.pageX,
				y: touches.pageY,
				time: +new Date
			};
			isScrolling = undefined;
			delta = {};
			element.addEventListener("touchmove", this, false);
			element.addEventListener("touchend", this, false)
		},
		move: function(event) {
			if (event.touches.length > 1 || event.scale && event.scale !== 1) return;
			if (options.disableScroll) event.preventDefault();
			var touches = event.touches[0];
			delta = {
				x: touches.pageX - start.x,
				y: touches.pageY - start.y
			};
			if (typeof isScrolling == "undefined") {
				isScrolling = !! (isScrolling || Math.abs(delta.x) < Math.abs(delta.y))
			}
			if (!isScrolling) {
				event.preventDefault();
				stop();
				delta.x = delta.x / (!index && delta.x > 0 || index == slides.length - 1 && delta.x < 0 ? Math.abs(delta.x) / width + 1 : 1);
				translate(index - 1, delta.x + slidePos[index - 1], 0);
				translate(index, delta.x + slidePos[index], 0);
				translate(index + 1, delta.x + slidePos[index + 1], 0)
			}
		},
		end: function(event) {
			var duration = +new Date - start.time;
			var isValidSlide = Number(duration) < 250 && Math.abs(delta.x) > 20 || Math.abs(delta.x) > width / 2;
			var isPastBounds = !index && delta.x > 0 || index == slides.length - 1 && delta.x < 0;
			var direction = delta.x < 0;
			if (!isScrolling) {
				if (isValidSlide && !isPastBounds) {
					if (direction) {
						move(index - 1, -width, 0);
						move(index, slidePos[index] - width, speed);
						move(index + 1, slidePos[index + 1] - width, speed);
						index += 1
					} else {
						move(index + 1, width, 0);
						move(index, slidePos[index] + width, speed);
						move(index - 1, slidePos[index - 1] + width, speed);
						index += -1
					}
					options.callback && options.callback(index, slides[index])
				} else {
					move(index - 1, -width, speed);
					move(index, 0, speed);
					move(index + 1, width, speed)
				}
			}
			element.removeEventListener("touchmove", events, false);
			element.removeEventListener("touchend", events, false)
		},
		transitionEnd: function(event) {
			if (parseInt(event.target.getAttribute("data-index"), 10) == index) {
				if (delay) begin();
				options.transitionEnd && options.transitionEnd.call(event, index, slides[index])
			}
		}
	};
	setup();
	if (delay) begin();
	if (browser.addEventListener) {
		if (browser.touch) element.addEventListener("touchstart", events, false);
		if (browser.transitions) {
			element.addEventListener("webkitTransitionEnd", events, false);
			element.addEventListener("msTransitionEnd", events, false);
			element.addEventListener("oTransitionEnd", events, false);
			element.addEventListener("otransitionend", events, false);
			element.addEventListener("transitionend", events, false)
		}
		window.addEventListener("resize", events, false)
	} else {
		window.onresize = function() {
			setup()
		}
	}
	return {
		setup: function() {
			setup()
		},
		slide: function(to, speed) {
			slide(to, speed)
		},
		prev: function() {
			stop();
			prev()
		},
		next: function() {
			stop();
			next()
		},
		getPos: function() {
			return index
		},
		kill: function() {
			stop();
			element.style.width = "auto";
			element.style.left = 0;
			var pos = slides.length;
			while (pos--) {
				var slide = slides[pos];
				slide.style.width = "100%";
				slide.style.left = 0;
				if (browser.transitions) translate(pos, 0, 0)
			}
			if (browser.addEventListener) {
				element.removeEventListener("touchstart", events, false);
				element.removeEventListener("webkitTransitionEnd", events, false);
				element.removeEventListener("msTransitionEnd", events, false);
				element.removeEventListener("oTransitionEnd", events, false);
				element.removeEventListener("otransitionend", events, false);
				element.removeEventListener("transitionend", events, false);
				window.removeEventListener("resize", events, false)
			} else {
				window.onresize = null
			}
		}
	}
}(function($, win) {
	var doc = win.document,
		Z = win.SOHUZ,
		ui = Z.ui,
		CONF = Z.CONF,
		url_api = CONF["url_api"];
	if (!Z.isTouch()) {
		$(doc).delegate("body", "click", function(e) {
			$(e.target).trigger("tap")
		})
	}
	if (navigator.userAgent.indexOf("KZNativeNav") >= 0) {
		$("html").addClass("native-nav-on")
	}
	$(function() {
		var doc = $(win.document),
			picgroup = $("div.mod-picgroup"),
			picview = null,
			index_url = SOHUZ.page.index_url ? SOHUZ.page.index_url : "/",
			is_embed = window.location.href.indexOf("embed=true") > 0 ? true : false,
			is_preview = window.location.origin == url_api;
		$("#phone-main .phone-header").on("click", ".site-title", function() {
			if (is_preview) {
				window.location.href = window.location.pathname == "/preview/theme-preview" ? "/preview/theme-preview?site_id=" + Z.page.site_id : "/preview/?site_id=" + Z.page.site_id
			} else {
				window.location.href = is_embed ? index_url + "/?embed=true" : index_url
			}
		});
		if (is_embed) {
			doc.on("click", "a", function(e) {
				var url = this.href,
					l = url.length,
					ih = url.indexOf("#"),
					p = url.indexOf("?") > -1 ? "&embed=true" : "?embed=true";
				if (ih > -1) {
					var sub = url.substr(ih);
					url = url.replace(sub, p + sub)
				} else {
					url = url + p
				}
				this.href = url
			})
		}
		if (SOHUZ.page.is_sogou) {
			var current_loc = window.location.href,
				base_url = current_loc.substr(0, current_loc.lastIndexOf("/") + 1);
			doc.on("click", "a[data-link-type], a[data-link-res-type]", function(e) {
				if (this.pathname.match(/.*\.html$/gi) || this.href.toLowerCase().indexOf("tel:") == 0) {
					return true
				}
				var url = this.pathname.substr(1) + this.search + this.hash;
				e.preventDefault();
				e.stopPropagation();
				window.location = base_url + url.replace(/\//g, "-") + ".html"
			});
			$("#phone-main .phone-header").on("click", ".login a", function(e) {
				var url = this.pathname.substr(1) + this.search + this.hash;
				window.location = SOHUZ.page.site_url + url;
				e.preventDefault();
				e.stopPropagation();
				return false
			});
			$("#phone-main .mod-global-nav").on("click", ".title a", function(e) {
				window.location = SOHUZ.page.site_url;
				e.preventDefault();
				e.stopPropagation();
				return false
			})
		}
		var ctx = {
			is_touch: Z.isTouch(),
			is_embed: is_embed,
			doc: doc,
			conf: CONF,
			ui: ui,
			page: Z.page
		};

		function navon(on) {
			if (on) {
				doc.find("body").addClass("nav-on");
				var videos = $(".mod-video iframe.video");
				for (var i = 0; i < videos.length; i++) {
					var elem = $(videos[i]);
					elem.height(0)
				}
			} else {
				doc.find("body").removeClass("nav-on");
				var videos = $(".mod-video iframe.video");
				for (var i = 0; i < videos.length; i++) {
					var elem = $(videos[i]);
					elem.height(elem.data("height"))
				}
			}
		}(function(ctx) {
			var tn = $("#js-theme-nav"),
				doc = ctx.doc,
				nav_on = false;
			if (tn.hasClass("mod-themenav4")) {
				tn.find("i.font-ico").tap(function() {
					tn.addClass("mod-themenav-more");
					navon(true);
					nav_on = true;
					return false
				}).click(function() {
					tn.addClass("mod-themenav-more");
					navon(true);
					nav_on = true;
					return false
				});
				doc.on("tap", function(e) {
					if (nav_on) {
						var t = $(e.target);
						if (t.parents(".mod-themenav4").length == 0 && !t.hasClass(".mod-themenav4")) {
							tn.removeClass("mod-themenav-more");
							navon(false);
							nav_on = false
						}
					}
				})
			} else if (tn.hasClass("mod-themenav1") || tn.hasClass("mod-themenav2")) {
				if (tn.hasClass("mod-themenav2")) {
					doc.find("body").addClass("nav-on-bottom");
					SOHUZ.layout.append_float("bottom", tn, {
						height: 45
					})
				}
				var ul = tn.find("ul"),
					len = tn.find("li").length;
				if (len > 5) {

					doc.on("tap", function(e) {
						if (nav_on) {
							var t = $(e.target);
							if (t.parents(".mod-themenav1,.mod-themenav2").length == 0 && !t.hasClass(".mod-themenav1") && !t.hasClass(".mod-themenav2")) {
								tn.removeClass("mod-themenav-more");
								navon(false);
								nav_on = false
							}
						}
					})
				}
			}
		})(ctx);
		(function(ctx) {
			var tn = $("[data-role='mod-nav-theme']"),
				doc = ctx.doc;
			if (tn.hasClass("t3")) {
				var nh = $("[data-role='nav-header']");
				tn.before(nh.find("[data-role='nav-icon-more']"));
				nh.css("display", "none")
			}
			if (tn.hasClass("t4")) {
				var navlist = tn.find("ul.list-items"),
					dropbox = tn.find(".dropbox ul"),
					len = navlist.find("li.item-cell").length;
				if (len > 5) {
					var d_items = dropbox.find("li").slice(4).clone();
					dropbox.empty();
					dropbox.append(d_items);
					while (len > 4) {
						navlist.find("li.item-cell").last().remove();
						len--
					}
				}
				doc.find("[data-role='kz-page-bottom-float-layer']").prepend(tn);
				var h = tn.height();
				if (h > 0) {
					doc.find("#phone-main").append($("<div></div>").css({
						height: h
					}))
				}
			}
			if (tn.hasClass("t5")) {
				var navlist = tn.find("ul.list-items li"),
					len = navlist.length;
				if (len < 6) {
					tn.find(".list-section").addClass("low")
				}
			}
		})(ctx);
		if (picgroup.length > 0) {
			picgroup = picgroup.filter(function(index) {
				var $w = picgroup.eq(index);
				if ($w.closest("[data-component]").length > 0) {
					return false
				}
				return true
			});
			if (picgroup.length > 0) {
				picview = new ui.PicView({
					pg: picgroup
				})
			}
		}
		function initFocus() {
			if (ctx.is_touch) {
				for (var i = 0; i < $(".swipe").length; i++) {
					var w = document.querySelectorAll(".swipe")[i],
						$w = $(w);
					if ($w.parents("[data-component]").length > 0) {
						continue
					}
					new SwipeV1(w, {
						startSlide: 0,
						speed: 400,
						auto: false,
						continuous: true,
						disableScroll: false,
						stopPropagation: false,
						callback: function(index, elem) {
							$(elem).parents(".focus-w").find(".focus-ctr").eq(index).addClass("cur").siblings().removeClass("cur")
						},
						transitionEnd: function(index, elem) {
							$(elem).parents(".focus-w").find(".focus-ctr").find("span").removeClass("cur").eq(index).addClass("cur")
						}
					})
				}
			}
		}
		initFocus();
		$(win).bind("orientationchange", function(event) {
			initFocus()
		});

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) && window.require) {
			require(["/"], function(img_viewer) {
				img_viewer(doc.find("#page-content"))
			})
		}
		$(function() {
			function addDynamicJS(src, container, callback) {
				var container = container || document.body;
				var script = document.createElement("script");
				script.setAttribute("type", "text/javascript");
				script.src = src;
				container.appendChild(script);
				if (callback) {
					script.onload = callback
				}
			}
			function isMobile() {
				var mobile = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
				return mobile != null
			}

			
							
							function isPC() {
								var userAgentInfo = navigator.userAgent;
								var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
								var flag = true;
								for (var v = 0; v < Agents.length; v++) {
									if (userAgentInfo.indexOf(Agents[v]) > 0) {
										flag = false;
										break
									}
								}
								return flag
							}
							
							
							
							if (!document.querySelector(".kz-pc")) {
								var adLayDisplay = document.querySelector(".kz-page-ad-inner-layer") ? getComputedStyle(document.querySelector(".kz-page-ad-inner-layer")).display : "undefined";
								
								//if (adLayDisplay == "none" || parentLayDisplay == "none") {
									$("body").trigger("monitor-ad-bebavior")
								}
							//}
			
				});
				(function() {
					if (document.querySelector(".mod-js")) {}
				})()
		
	})
})(Zepto, this);