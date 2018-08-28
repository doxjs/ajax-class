export default class Ajax {
    static defaults: {
        [key: string]: any;
    };
    constructor(method?: string, url?: string, async?: boolean);
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
    requestType: string;
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
    accept: string;
    query: string | {
        [key: string]: string;
    };
    queryUsed: boolean;
    bodyUsed: boolean;
    options: (ops: object) => void;
    getResponseHeadaer: (key: string) => string;
    on: (ev: string, fn: (event: Event) => void) => void;
    abort: () => void;
    fetch: () => Promise<any>;
}