/// <reference path="../../../typings/jquery.d.ts" />

module HttpService {
    export class JQueryHttpService implements IHttpService {

        public get(url: string, data: Object, onSuccess?: (data: string) => void, onFail?: (data: string) => void): void {
            this.makeRequest(url, data, "GET", onSuccess, onFail);
        }

        public post(url: string, data: Object, onSuccess?: (data: string) => void, onFail?: (data: string) => void): void {
            this.makeRequest(url, data, "POST", onSuccess, onFail);
        }

        private makeRequest(url: string, data: Object, httpMethod: string,
                    onSuccess: (data: string) => void, onFail: (data: string) => void): void {
            $.ajax({
                data: data,
                type: httpMethod,
                url: url
            })
            .done(onSuccess)
            .fail(onFail);
        }
    }
}
