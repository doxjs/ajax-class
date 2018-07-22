/**
** Created by Double Dimos        
*/
        
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var types = {
    form: 'application/x-www-form-urlencoded',
    formData: 'multipart/form-data',
    json: 'text/plain',
    text: 'text/plain',
    xml: 'text/xml'
};
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
            var _this = this;

            this.xhr.open(this.method, this.url + '?' + this.query, this.async);

            this.headers = _extends({}, this.headers, _defineProperty({}, 'Accept', this.accept));

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
        }
    }, {
        key: '_send',
        value: function _send() {
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
                    for (var i in this.body) {
                        form.set(i, this.body[i]);
                    }
                    this.body = form;
                    break;
                case 'form':
                    var result = '';
                    for (var _i2 in this.body) {
                        result += '&' + _i2 + '=' + this.body[_i2];
                    }
                    this.body = result.replace(/^&+/, '');
                    break;
            }

            this.xhr.send(this.body);
        }
    }, {
        key: 'fetch',
        value: function fetch() {
            var _this2 = this;

            this._open();
            var promise = new Promise(function (resolve, reject) {
                _this2.on('load', function () {
                    resolve(_this2.response);
                });
            });

            this.on('error', reject);
            this._send();

            return promise;
        }
    }, {
        key: 'xhr',
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
        key: 'requestType',
        set: function set(rt) {
            this._requestType = rt;
        },
        get: function get() {
            return has(types, this._requestType) ? this._requestType : 'json';
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
        key: 'accept',
        set: function set(a) {
            this._accept = a;
        },
        get: function get() {
            return this._accept || '*/*';
        }
    }, {
        key: 'query',
        set: function set(q) {
            this._query = q;
        },
        get: function get() {
            if (typeof this._query === 'string') {
                return this._query;
            }
            var result = '',
                query = this._query || {};
            for (var i in query) {
                result += '&' + i + '=' + query[i];
            }
            return result.replace(/^&+/, '');
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

export default Ajax;
