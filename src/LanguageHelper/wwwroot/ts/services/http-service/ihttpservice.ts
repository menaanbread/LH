module HttpService {
    export interface IHttpService {
        get(url: string, data: Object, onSuccess?: (data: string) => void, onFail?: (data: string) => void): void;
        post(ur: string, data: Object, onSuccess?: (data: string) => void, onFail?: (data: string) => void): void;
    }
}
