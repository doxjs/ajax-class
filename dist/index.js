/**
** Created by Double Dimos        
*/
        
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var has = function has(obj, k) {
    return Object.hasOwnProperty.call(obj, k);
};

var Ajax = function () {
    function Ajax(method, url, async) {
        _classCallCheck(this, Ajax);

        this._xhr = new XMLHttpRequest();
        this.method = method;
        this.url = url;
        this.async = async;
    }

    _createClass(Ajax, [{
        key: 'abort',
        value: function abort() {
            this.xhr.abort();
        }
    }, {
        key: 'getResponseHeader',
        value: function getResponseHeader(k) {
            return this.xhr.getResponseHeader(k);
        }
    }, {
        key: 'on',
        value: function on(ev) {
            var _events$ev;

            for (var _len = arguments.length, fn = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                fn[_key - 1] = arguments[_key];
            }

            has(this.events, ev) ? (_events$ev = this.events[ev]).push.apply(_events$ev, fn) : this.events[ev] = [].concat(fn);
        }
    }, {
        key: 'options',
        value: function options(ops) {
            for (var i in ops) {
                !has(this, i) || (this[i] = ops[i]);
            }
        }
    }, {
        key: '_open',
        value: function _open() {
            for (var key in Ajax.defaults) {
                // dont use has(this, key), it cant check prototype
                if (key in this) {
                    if (Object.prototype.toString.call(Ajax.defaults[key]) === '[object Object]') {
                        this[key] = _extends({}, Ajax.defaults[key], this[key]);
                    } else {
                        this[key] = Ajax.defaults[key];
                    }
                }
            }
            var query = this.query;
            var url = !!query ? this.url + '?' + query : this.url;

            this.xhr.open(this.method, url, this.async);
        }
    }, {
        key: '_send',
        value: function _send() {
            var _this = this;

            for (var i in this.headers) {
                this.xhr.setRequestHeader(i, this.headers[i]);
            }

            var _loop = function _loop(_i) {
                _this.xhr.addEventListener(_i, function (event) {
                    _this.events[_i].forEach(function (f) {
                        return f.call(_this, event);
                    });
                });
            };

            for (var _i in this.events) {
                _loop(_i);
            }
            this.xhr.timeout = this.timeout;
            this.xhr.responseType = this.responseType;

            switch (this.requestType) {
                case 'text':
                    this.body = '' + this.body;
                    break;
                case 'json':
                    this.body = JSON.stringify(this.body);
                    break;
                case 'xml':
                    this.body = new XMLSerializer().serializeToString(this.body);
                    break;
                case 'formData':
                    var form = new FormData();
                    for (var _i2 in this.body) {
                        form.set(_i2, this.body[_i2]);
                    }
                    this.body = form;
                    break;
                case 'form':
                    var result = '';
                    for (var _i3 in this.body) {
                        result += '&' + _i3 + '=' + this.body[_i3];
                    }
                    this.body = result.replace(/^&+/, '');
                    break;
            }

            this.xhr.send(this.body);
            this.bodyUsed = true;
        }
    }, {
        key: 'fetch',
        value: function fetch() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                _this2._open();
                _this2.on('load', function () {
                    resolve(_this2.response);
                });
                _this2.on('error', reject);
                _this2._send();
            });
        }
    }, {
        key: 'xhr',
        set: function set(xhr) {
            this._xhr = xhr;
        },
        get: function get() {
            return this._xhr;
        }
    }, {
        key: 'body',
        set: function set(b) {
            this._body = b;
        },
        get: function get() {
            return this._body || '';
        }
    }, {
        key: 'bodyUsed',
        set: function set(bu) {
            this._bodyUsed = bu;
        },
        get: function get() {
            return this._bodyUsed || false;
        }
    }, {
        key: 'method',
        set: function set(m) {
            this._method = m;
        },
        get: function get() {
            return this._method || 'get';
        }
    }, {
        key: 'url',
        set: function set(u) {
            this._url = u;
        },
        get: function get() {
            return this._url || '/';
        }
    }, {
        key: 'responseType',
        set: function set(rt) {
            this._responseType = rt;
        },
        get: function get() {
            return this._responseType || 'json';
        }
    }, {
        key: 'charset',
        set: function set(c) {
            this._charset = c;
        },
        get: function get() {
            return this._charset || 'utf-8';
        }
    }, {
        key: 'async',
        set: function set(newValue) {
            this._async = !!newValue;
        },
        get: function get() {
            return this._async || true;
        }
    }, {
        key: 'headers',
        set: function set(hs) {
            this._headers = hs;
        },
        get: function get() {
            return this._headers || {};
        }
    }, {
        key: 'events',
        get: function get() {
            return this._events || (this._events = {});
        }
    }, {
        key: 'readyState',
        get: function get() {
            return this.xhr.readyState;
        }
    }, {
        key: 'status',
        get: function get() {
            return this.xhr.status;
        }
    }, {
        key: 'statusMessage',
        get: function get() {
            return this.xhr.statusText;
        }
    }, {
        key: 'timeout',
        set: function set(t) {
            this._timeout = t;
        },
        get: function get() {
            return this._timeout || 0;
        }
    }, {
        key: 'query',
        set: function set(q) {
            this._query = q;
        },
        get: function get() {
            if (this.queryUsed) {
                return '';
            }
            if (typeof this._query === 'string') {
                return this._query;
            }
            var result = '',
                query = this._query || {};
            for (var i in query) {
                result += '&' + encodeURIComponent(i) + '=' + encodeURIComponent(query[i]);
            }
            this.queryUsed = true;
            return result.replace(/^&+/, '');
        }
    }, {
        key: 'queryUsed',
        get: function get() {
            return this._queryUsed || false;
        },
        set: function set(qu) {
            this._queryUsed = qu;
        }
    }, {
        key: 'response',
        get: function get() {
            switch (this.responseType) {
                case 'text':
                    return this.xhr.responseText;
                case 'xml':
                    return this.xhr.responseXML;
                case 'json':
                    return Object.prototype.toString.call(this.xhr.response) == '[object Object]' ? this.xhr.response : JSON.parse(this.xhr.response);
                case 'arraybuffer':
                    return this.xhr.response;
                case 'blob':
                    return new Blob([this.xhr.response]);
                default:
                    return this.xhr.response;
            }
        }
    }]);

    return Ajax;
}();

Ajax.defaults = {};

export default Ajax;
