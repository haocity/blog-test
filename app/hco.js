/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _html = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

__webpack_require__(3);
var MD5 = __webpack_require__(8);

var Hco = function () {
	function Hco(ele, webid, id) {
		_classCallCheck(this, Hco);

		var warp = document.createElement('div');
		this.ele = warp;
		this.cid = webid + '_' + id;
		warp.className = 'ew-comment';
		warp.innerHTML = (0, _html.html)('评论');
		if (typeof ele == "string") {
			ele = document.querySelector(ele);
		}
		ele.appendChild(warp);
		this.init(ele);
	}

	_createClass(Hco, [{
		key: 'init',
		value: function init(ele) {
			var _this = this;
			function $c(i) {
				return ele.querySelector(i);
			}
			this.$c = $c;
			var ew = new Object();
			this.now = 'father';
			this.id = this.cid;
			this.api = 'https://t5.haotown.cn/hcon';
			this.publish = $c('.ew-publish');
			//加载本地储存的信息
			if (localStorage && localStorage.getItem('ew')) {
				console.log('加载设置成功');
				var t = JSON.parse(localStorage.getItem('ew'));
				$c('.ew-email').value = t.email;
				$c('.ew-author').value = t.user;
				$c('.ew-weburl').value = t.weburl;
			}
			this.changersize();
			//ctrl和enter按下发送评论
			$c('.ew-textarea').addEventListener('keydown', function (event) {
				if (event.keyCode == 13 && event.ctrlKey) {
					$c('.ew-send-btn').click();
				}
			}, false);
			$c('.ew-send-btn').addEventListener('click', function () {
				_this.submitfun();
			}, false);
			//返回评论
			$c('.ew-publish-back').addEventListener('click', function () {
				_this.now = 'father';
				_this.publish.className = 'ew-publish';
				var earr = document.querySelectorAll('.ew-li-main');
				for (var i = 0; i < earr.length; i++) {
					if (earr[i].style.marginBottom) {
						earr[i].style.marginBottom = '4px';
					}
				}
			}, false);
			window.addEventListener('resize', function () {
				_this.changersize();
			});
			_this.update();
		}
	}, {
		key: 'changersize',
		value: function changersize() {
			var we = this.ele.querySelector(".ew-info");
			var w1 = we.offsetWidth;
			var arr = we.querySelectorAll("input");
			for (var i = 0; i < arr.length; i++) {
				if (w1 > 800) {
					arr[i].style.marginRight = "7px";
					arr[i].style.width = (w1 - 200) / 3 + 'px';
				} else {
					arr[i].style.marginRight = "";
					arr[i].style.width = "";
				}
			}
		}
		//提示框

	}, {
		key: 'alert',
		value: function alert(s) {
			var e = document.createElement('div');
			e.className = 'ew-alert';
			e.innerText = s;
			document.body.appendChild(e);
			setTimeout(function () {
				e.style.display = 'none';
				e.parentNode.removeChild(e);
			}, 1900);
		}
		//计算是几楼

	}, {
		key: 'getfloor',
		value: function getfloor(temp) {
			var lc = '#';
			var str = temp.toString();
			var arr = str.split('-');
			for (var i = 0; i < arr.length; i++) {
				if (i == arr.length - 1) {
					var t = parseInt(arr[i]) + 1;
					lc = lc + t;
				} else {
					lc = lc + (parseInt(arr[i]) + 1) + '-';
				}
			}
			return lc;
		}
		//时间计算

	}, {
		key: 'gettime',
		value: function gettime(time) {
			var temp = void 0;
			var nowdate = new Date();
			var c = nowdate.getTimezoneOffset();
			var nowtime = new Date().getTime();
			var timed = nowtime - time - c * 60000;
			if (timed < 60000) {
				temp = '刚刚';
			} else if (timed < 60000 * 60) {
				temp = new Date(timed).getMinutes() + '分钟前';
			} else if (timed < 60000 * 60 * 24) {
				temp = new Date(timed).getHours() + '小时前';
			} else {
				var t = new Date(parseInt(time));
				temp = t.getFullYear() + '年' + (t.getMonth() + 1) + '月' + t.getDate() + '日';
			}
			return temp;
		}

		//更新评论

	}, {
		key: 'update',
		value: function update(k) {
			var _this = this;
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					var json = JSON.parse(xmlhttp.responseText);
					_this.$c('.ew-list').innerHTML = "";
					for (var i = 0; i < json.data.length; i++) {
						var t = json.data[i];
						_this.sendcom(t.cid, t.user, t.email, t.weburl, t.time, t.text);
					}
					if (k != 'father' && k != undefined) {
						if (_this.$c('.ew-id-' + k + '>.ew-li-main>.ew-li-com-w>.ew-li-reply')) {
							_this.$c('.ew-id-' + k + '>.ew-li-main>.ew-li-com-w>.ew-li-reply').click();
						}
					}
					_this.ele.querySelector('.ew-bar').innerHTML = json.data.length + "条评论";
				}
			};

			xmlhttp.open("GET", this.api + "/get/?id=" + this.cid, true);
			xmlhttp.send();
		}
		//输出评论

	}, {
		key: 'sendcom',
		value: function sendcom(id, name, email, weburl, time, str) {
			var _this = this;
			var warp = document.createElement('div');
			var number = void 0;
			if (id == 'father') {
				number = _this.$c('.ew-list').querySelectorAll('.ew-li');
				warp.className = 'ew-li ew-id-' + number.length;
			} else if (_this.$c('.ew-id-' + id)) {
				number = _this.$c('.ew-id-' + id).querySelectorAll('.ew-li');
				warp.className = 'ew-li ew-id-' + id + '-' + number.length;
			} else {
				console.log('数据可能存在错误');
			}
			var xdom = (0, _html.html2)("https://v2ex.assets.uxengine.net/gravatar/" + MD5(email) + "?s=80&d=retro", weburl, name, _this.gettime(time), str);
			//commenthtml
			warp.innerHTML = xdom;
			warp.m = email;
			var btn = document.createElement('div');
			btn.className = 'ew-li-reply';
			btn.innerHTML = '回复';
			btn.addEventListener('click', function () {
				_this.now = this.i;
				var earr = document.querySelectorAll('.ew-li-main');
				for (var i = 0; i < earr.length; i++) {
					if (earr[i].style.marginBottom) {
						earr[i].style.marginBottom = 'auto';
					}
				}
				var e = warp.querySelector('.ew-li-main');
				_this.publish.className = 'ew-publish ew-publish-fly';
				_this.publish.style.top = e.offsetHeight + e.offsetTop + 6 + 'px';
				e.style.marginBottom = '210px';
				_this.$c('.ew-publish-title-lc').innerHTML = _this.getfloor(this.i);
			}, false);
			warp.querySelector('.ew-li-main>.ew-li-com-w').appendChild(btn);
			if (id == 'father') {
				btn.i = number.length;
				_this.$c('.ew-list').appendChild(warp);
			} else if (_this.$c('.ew-id-' + id + '>.ew-li-next')) {
				btn.i = id + '-' + number.length;
				_this.$c('.ew-id-' + id + '>.ew-li-next').appendChild(warp);
			} else {
				console.log('数据可能存在错误' + id);
			}
		}
		//提交

	}, {
		key: 'submitfun',
		value: function submitfun() {
			var _this = this;
			//验证url,e-mail
			var mailreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if (_this.$c('.ew-textarea').value.length <= 2) {
				_this.alert('内容太短了');
			} else if (!_this.$c('.ew-author').value) {
				_this.alert('请输入用户名');
			} else if (!mailreg.test(_this.$c('.ew-email').value)) {
				_this.alert('邮箱错误');
			} else {
				var myDate = new Date();
				var regarr = [/\n/g, /<script/g, /<\/script/g, /<style/g, /<\/style/g, /<\/div/g, /<div/g, /<\/pre/g, /<[a-z]+\s+on[a-z]+\s+?=/g];
				for (var i = 0; i < regarr.length; i++) {
					var tvalue = _this.$c('.ew-textarea').value.replace(regarr[i], "<br>");
				}
				//取父邮箱
				var pm = '';
				if (_this.now != 'father') {
					pm = this.$c('.ew-id-' + this.now).m;
				}
				//发送数据
				var postData = {
					id: _this.id,
					user: _this.$c('.ew-author').value,
					email: _this.$c('.ew-email').value,
					weburl: _this.$c('.ew-weburl').value,
					text: tvalue,
					cid: _this.now,
					url: document.location.href,
					title: document.title,
					pm: pm
				};
				postData = function (obj) {
					// 转成post需要的字符串.
					var str = "";
					for (var prop in obj) {
						str += prop + "=" + obj[prop] + "&";
					}
					return str;
				}(postData);
				var xhr = new XMLHttpRequest();
				xhr.open("POST", _this.api + '/send/', true);
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.onreadystatechange = function () {
					var XMLHttpReq = xhr;
					if (XMLHttpReq.readyState == 4) {
						if (XMLHttpReq.status == 200) {
							var t = JSON.parse(XMLHttpReq.responseText);
							if (t.success) {
								_this.update(_this.now);
								_this.alert('评论成功');
								_this.$c('.ew-textarea').value = '';
								var c = '{"user":"' + _this.$c('.ew-author').value + '","email":"' + _this.$c('.ew-email').value + '","weburl":"' + _this.$c('.ew-weburl').value + '"}';
								if (localStorage) {
									localStorage.setItem('ew', c);
								}
							} else {
								_this.alert('发送失败');
							}
						}
					}
				};
				xhr.send(postData);
				//发送end	
			}
		}
	}]);

	return Hco;
}();

window.Hco = Hco;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.html = html;
exports.html2 = html2;
/* HCO
 @author   HaoDong <ureygt@gmail.com> <http://www.haotown.cn>
 @license  The Star And Thank Author License (SATA)
 */
function html(title) {
	return "<div class=\"ew-publish\">\n\t\t\t\t<div class=\"ew-publish-title\">\u53D1\u8868\u65B0\u8BC4\u8BBA <span class=\"ew-publish-title-lc\">#0</span> <span class=\"ew-publish-back\">\u8FD4\u56DE\u8BC4\u8BBA</span></div>\n\t\t\t\t\t<div class=\"ew-textarea-warp\">\n\t\t\t\t\t\t<textarea node-type=\"textarea\" name=\"\" class=\"ew-textarea\" placeholder=\"\u8BC4\u8BBA..\" autocomplete=\"off\" spellcheck=\"false\"></textarea>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"ew-info\"><input class=\"text-block ew-author\"  name=\"author\" type=\"text\" value=\"\" size=\"30\" placeholder=\"\u6635\u79F0 *\" autocomplete=\"off\"><input class=\"text-block ew-email\"  name=\"email\" type=\"email\" value=\"\" size=\"30\" placeholder=\"\u90AE\u7BB1 *\" autocomplete=\"off\"><input class=\"text-block ew-weburl\"  name=\"url\" type=\"url\" value=\"\" size=\"30\" placeholder=\"\u7F51\u5740\" autocomplete=\"off\"><div class=\"ew-send-btn\">\u53D1\u9001</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ew-bar\">" + title + "</div>\n\t\t\t\t<div class=\"ew-list\">\n\t\t\t\t</div>";
}
function html2(avatar, weburl, name, time, text) {
	return "<div class=\"ew-li-main\">\n\t\t\t\t\t<div class=\"ew-li-logo\" style=\"background-image:url(" + avatar + ")\"></div>\n\t\t\t\t\t<div class=\"ew-li-com-w\">\n\t\t\t\t\t\t<div class=\"ew-li-user\"><a href=\"" + weburl + "\" target=\"_blank\">" + name + "</a></div>\n\t\t\t\t\t\t<div class=\"ew-li-time\">" + time + "</div>\n\t\t\t\t\t\t<pre class=\"ew-li-com\">" + text + "</pre>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ew-li-next\"></div>\n\t\t\t\t</div>";
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(6)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!./style.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!./style.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(5)(undefined);
// imports


// module
exports.push([module.i, ".ew-comment {\r\n\tpadding: 15px 10px;\r\n\tposition: relative;\r\n}\r\n\r\n.ew-publish {\r\n\toverflow: hidden;\r\n}\r\n\r\n.ew-publish-fly {\r\n\tposition: absolute;\r\n\ttop: 256px;\r\n\twidth: 100%;\r\n\tleft: 0;\r\n}\r\n\r\n.ew-publish-title {\r\n\tfont-size: 16px;\r\n\tpadding: 10px 0;\r\n\tfont-weight: 500;\r\n\tcolor: #565656;\r\n}\r\n\r\n.ew-publish-title-lc {\r\n\tcolor: #969292;\r\n\tdisplay: none;\r\n}\r\n\r\n.ew-publish-back {\r\n\tcolor: #e07e7e;\r\n\tdisplay: none;\r\n\tcursor: pointer;\r\n\tmargin-left: 30px;\r\n}\r\n\r\n.ew-publish-fly .ew-publish-back,.ew-publish-fly .ew-publish-title-lc {\r\n\tdisplay: inline-block;\r\n}\r\n\r\n.ew-textarea-warp {\r\n\t\t\t/*margin-left: 100px;*/\r\n\tbackground-color: #fff;\r\n\tborder-radius: 12px;\r\n\tpadding: 6px;\r\n\t\t\t/*background: #FFFFFF bottom right 20px no-repeat url(https://www.haotown.cn/changyan/3.png);*/\r\n\t\t\t/*box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);*/\r\n\tborder: 1px solid #d0d0d0;\r\n}\r\n\r\n.ew-textarea {\r\n\twidth: 100%;\r\n\theight: 70px;\r\n\tbackground: 0 0;\r\n\toverflow-x: hidden;\r\n\toverflow-y: auto;\r\n\tborder: 0;\r\n\tfont-size: 14px;\r\n\tcolor: #333;\r\n\tresize: none;\r\n\tline-height: normal;\r\n\ttext-align: left;\r\n\toutline: medium;\r\n}\r\n\r\n.ew-info {\r\n\tmargin-top: 20px;\r\n\tmargin-bottom: 10px;\r\n\tposition: relative;\r\n}\r\n\r\n.ew-info>.text-block {\r\n\theight: 25px;\r\n\twidth: 24%;\r\n\tmargin-right: 2%;\r\n\tborder: 1px solid #b5b5b5;\r\n\tborder-radius: 4px;\r\n\tpadding: 0 4px;\r\n\toutline: none;\r\n}\r\n\r\n.ew-info>.ew-send-btn {\r\n\tposition: absolute;\r\n\tright: 0;\r\n\ttop: -4px;\r\n\twidth: 108px;\r\n    background-color: #3b9bf1;\r\n\tcolor: #fff;\r\n\ttext-align: center;\r\n\tline-height: 40px;\r\n\tfont-size: 20px;\r\n\tborder-radius: 10px;\r\n\tcursor: pointer;\r\n}\r\n\r\n.ew-bar {\r\n\tbackground-color: #2483d8;\r\n\tcolor: #FFFFFF;\r\n\tmargin-top: 10px;\r\n\tmargin-bottom: 10px;\r\n\tfont-size: 15px;\r\n\tline-height: 32px;\r\n\tpadding: 0 17px;\r\n}\r\n\r\n.ew-li {\r\n\toverflow: hidden;\r\n}\r\n\r\n.ew-li-main {\r\n\toverflow: hidden;\r\n\tborder-left: 7px solid #2483d8;\r\n\tmargin-bottom: 4px;\r\n\tbackground-color: #fdfdfd;\r\n}\r\n\r\n.ew-li-com-w>.ew-li-com {\r\n\tmargin-left: 90px;\r\n\tfont-family: Avenir Next,Helvetica,Arial,Lantinghei SC,Microsoft YaHei,sans-serif;\r\n\tword-wrap: break-word;\r\n    white-space: normal;\r\n}\r\n\r\n.ew-li-com-w>.ew-li-user,.ew-li-com-w>.ew-li-time {\r\n\tdisplay: inline-block;\r\n\tcolor: #3a3a3a;\r\n\tfont-size: 15px;\r\n\tmargin-top: 12px;\r\n}\r\n\r\n.ew-li-user>a {\r\n\tcolor: #3a3a3a;\r\n\tfont-size: 15px;\r\n\ttext-decoration: none;\r\n}\r\n\r\n.ew-li-time {\r\n\tcolor: #797878;\r\n\tmargin-left: 10px;\r\n}\r\n\r\n.ew-li-main>.ew-li-logo {\r\n\tmargin: 16px 20px 16px 10px;\r\n\tbackground-image: url(https://0d077ef9e74d8.cdn.sohucs.com/clip_picture_1486299863299);\r\n\twidth: 60px;\r\n\theight: 60px;\r\n\tbackground-size: cover;\r\n\tborder-radius: 50%;\r\n\tfloat: left;\r\n}\r\n\r\n.ew-li-reply {\r\n\tfloat: right;\r\n\tcolor: #E88678;\r\n\tcursor: pointer;\r\n\tposition: relative;\r\n    right: 10px;\r\n    bottom: 5px;\r\n}\r\n\r\n.ew-li-next {\r\n\tmargin-left: 50px;\r\n}\r\n\r\n.ew-alert {\r\n\tposition: fixed;\r\n\twidth: 300px;\r\n\theight: 80px;\r\n\tbackground-color: rgba(51, 51, 51, 0.56);\r\n\tleft: 0;\r\n\tright: 0;\r\n\ttop: 0;\r\n\tbottom: 0;\r\n\tmargin: auto;\r\n\tline-height: 80px;\r\n\tz-index: 999;\r\n\tcolor: #fff;\r\n\ttext-align: center;\r\n\tfont-size: 25px;\r\n\tanimation: 0.8s tada;\r\n}\r\n\r\n@keyframes tada {\r\n\tfrom {\r\n\t\ttransform: scale3d(1, 1, 1);\r\n\t}\r\n\r\n\t10%, 20% {\r\n\t\ttransform: scale3d(.9, .9, .9) rotate3d(0, 0, 1, -3deg);\r\n\t}\r\n\r\n\t30%, 50%, 70%, 90% {\r\n\t\ttransform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\r\n\t}\r\n\r\n\t40%, 60%, 80% {\r\n\t\ttransform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\r\n\t}\r\n\r\n\tto {\r\n\t\ttransform: scale3d(1, 1, 1);\r\n\t}\r\n}\r\n@media only screen and (min-width: 100px) and (max-width: 800px) {\r\n\t.ew-info>.ew-send-btn{\r\n\t\tposition: relative;\r\n\t\ttop: 6px;\r\n\t\twidth: 100%;\r\n\t\tbox-shadow:none;\r\n\t}\r\n\t.ew-info>.text-block{\r\n    \twidth: 28%;\r\n    \tbox-sizing: content-box;\r\n\t}\r\n}", ""]);

// exports


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(7);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(9),
      utf8 = __webpack_require__(0).utf8,
      isBuffer = __webpack_require__(10),
      bin = __webpack_require__(0).bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message))
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),
/* 9 */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ })
/******/ ]);