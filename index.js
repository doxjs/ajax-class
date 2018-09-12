const is = Object.is || ((a, b) => a === b);
const has = (obj, k) => Object.hasOwnProperty.call(obj, k);

class Ajax {

    constructor(method, url, async) {
        this._xhr = new XMLHttpRequest();
        this.method = method;
        this.url = url;
        this.async = async;
    }

    set xhr(xhr) {
        this._xhr = xhr;
    }

    get xhr() {
        return this._xhr;
    }

    set body(b) {
        this._body = b;
    }

    get body() {
        return this._body || '';
    }

    set bodyUsed(bu) {
        this._bodyUsed = bu;
    }

    get bodyUsed() {
        return this._bodyUsed || false;
    }

    set method(m) {
        this._method = m;
    }

    get method() {
        return this._method || 'get';
    }

    set url(u) {
        this._url = u;
    }

    get url() {
        return this._url || '/';
    }

    set responseType(rt) {
        this._responseType = rt;
    }

    get responseType() {
        return this._responseType || 'json';
    }

    set charset(c) {
        this._charset = c;
    }

    get charset() {
        return this._charset || 'utf-8';
    }

    set async(newValue) {
        this._async = !!newValue;
    }

    get async() {
        return this._async || true;
    }

    set headers(hs) {
        this._headers = hs;
    }

    get headers() {
        return this._headers || {};
    }

    get events() {
        return this._events || (this._events = {});
    }

    get readyState() {
        return this.xhr.readyState;
    }

    get status() {
        return this.xhr.status;
    }

    get statusMessage() {
        return this.xhr.statusText;
    }

    set timeout(t) {
        this._timeout = t;
    }

    get timeout() {
        return this._timeout || 0;
    }

    set query(q) {
        this._query = q;
    }

    get query() {
        if (this.queryUsed) {
            return '';
        }
        if (typeof this._query === 'string') {
            return this._query;
        }
        let result = '', query = this._query || {};
        for (let i in query) {
            result += `&${encodeURIComponent(i)}=${encodeURIComponent(query[i])}`;
        }
        this.queryUsed = true;
        return result.replace(/^&+/, '');
    }

    get queryUsed() {
        return this._queryUsed || false;
    }

    set queryUsed(qu) {
        this._queryUsed = qu;
    }

    get response() {
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

    abort() {
        this.xhr.abort();
    }

    getResponseHeader(k) {
        return this.xhr.getResponseHeader(k);
    }

    on(ev, ...fn) {
        has(this.events, ev) ? this.events[ev].push(...fn) : (this.events[ev] = [...fn]);
    }

    options(ops) {
        for (let i in ops) {
            !has(this, i) || (this[i] = ops[i]);
        }
    }

    _open() {
        for (let key in Ajax.defaults) {
            // dont use has(this, key), it cant check prototype
            if (key in this) {
                if (Object.prototype.toString.call(Ajax.defaults[key]) === '[object Object]') {
                    this[key] = {
                        ...Ajax.defaults[key],
                        ...this[key]
                    };
                } else {
                    this[key] = this[key] || Ajax.defaults[key];
                }
            }
        }
        const query = this.query;
        const url = !!query ? this.url + '?' + query : this.url;

        this.xhr.open(this.method, url, this.async);
    
    }

    _send() {

        for (let i in this.headers) {
            this.xhr.setRequestHeader(i, this.headers[i]);
        }

        for (let i in this.events) {
            this.xhr.addEventListener(i, (event) => {
                this.events[i].forEach(f => f.call(this, event));
            });
        }
        this.xhr.timeout = this.timeout;
        this.xhr.responseType = this.responseType;

        switch (this.requestType) {
            case 'text':
                this.body = `${this.body}`;
                break;
            case 'json':
                this.body = JSON.stringify(this.body);
                break;
            case 'xml':
                this.body = new XMLSerializer().serializeToString(this.body);
                break;
            case 'formData':
                let form = new FormData();
                for (let i in this.body) {
                    form.set(i, this.body[i]);
                }
                this.body = form;
                break;
            case 'form':
                let result = '';
                for (let i in this.body) {
                    result += `&${i}=${this.body[i]}`;
                }
                this.body = result.replace(/^&+/, '');
                break;
        }

        this.xhr.send(this.body);
        this.bodyUsed = true;
    }

    fetch() {
        return new Promise((resolve, reject) => {
            this._open();
            this.on('load', () => {
                resolve(this.response);
            });
            this.on('error', reject);
            this._send();
        });
    }
}

Ajax.defaults = {};

export default Ajax;
