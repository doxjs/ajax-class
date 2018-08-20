# usage
```js
    let xhr = new Ajax();
    // or
    let xhr = new Ajax('get', 'www.example.com', true);

    // offer many properties and methods that you can control Ajax instance
```

## properties
```ts
    readonly xhr: XMLHttpRequest;
    readonly readyState: string;
    readonly status: number;
    readonly statusMessage: string;
    readonly response: any;
    body: ArrayBuffer | Blob | string | {
        [key: string]: any
    } | FormData | HTMLFormElement;
    method: string;
    url: string;
    responseType: string;
    charset: string;
    async: boolean;
    headers: {
        [key: string]: string
    };
    length: number;
    events: {
        [key: string]: (event: Event) => void;
    };
    timeout: number;
    query: string;
    queryUsed: boolean;
    bodyUsed: boolean;
    options: (ops: object) => void;
    getResponseHeadaer: (key: string) => string;
    on: (ev: string, fn: (event: Event) => void) => void;
    abort: () => void;
    fetch: () => Promise<any>;
```

## methods
```ts
    // shortname of above properties setting
    options: (ops: object) => void;
    getResponseHeadaer: (key: string) => string;
    on: (ev: string, fn: (event: Event) => void) => void;
    abort: () => void;
    fetch: () => Promise;
```

Attention please, if you want to use `get` method, using `query` instead of `body`

```js
// you want to get some data from http://www.example.com?name=DoubleDimos&age=22

// codes below will not work correct
async getData() {
    let ajax = new Ajax('get', 'http://www.example.com', true);
    ajax.body = {
        name: 'Double Dimos',
        age: 22
    };
    return await ajax.fetch();
}

// using this instead

async getData() {
    let ajax = new Ajax('get', 'http://www.example.com', true);
    ajax.query = {
        name: 'Double Dimos',
        age: 22
    };
    return await ajax.fetch();
}

```
