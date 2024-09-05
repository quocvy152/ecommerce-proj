import axios from "axios";

export enum METHOD {
    GET = 'GET',
    POST = 'POST'
}

export enum AUTH_TYPE {
    BASIC_AUTH = 'Basic',
    BEARER_TOKEN = 'Bearer'
}

export type CallAPIParams = {
    url: string,
    method: METHOD,
    isFormData?: Boolean,
    authType?: AUTH_TYPE,
    body?: object,
    token?: string
}

export type OptionsAxios = {
    url: string,
    method: METHOD,
    headers: {
        'Content-Type': string,
        'Accept': string,
        'Authorization'?: string
    },
    data?: object,
}

export async function callAPI({
    method,
    url,
    isFormData,
    authType,
    body, 
    token
}: CallAPIParams) {
    try {
        const options: OptionsAxios  = {
            url: url,
            method: method,
            headers: {
                'Content-Type': isFormData ? 'multipart/form-data; boundary=---011000010111000001101001' : 'application/json',
                'Accept': 'application/json',
            },
        };

        if(method == METHOD.POST) {
            options.data = body;
        }

        if(authType) {
            options.headers.Authorization = authType + ' ' + token;
        }

        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.log({ error })
        return {
            error: true,
            message: error.message
        }
    }
}