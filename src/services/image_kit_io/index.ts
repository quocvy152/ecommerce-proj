import jwt from 'jsonwebtoken';

import { AUTH_TYPE, callAPI, METHOD } from '../general';
import { IMAGE_KIT_IO_URL } from './url';

export type GetTokenImageKitIOParams = {
    fileName: string
}

export async function getTokenImageKitIO({ fileName }: GetTokenImageKitIOParams) {
    const iatTime = new Date().getTime();

    const TTL_TOKEN = 60000; // 60s
    const expTime = iatTime + TTL_TOKEN;

    const token = jwt.sign({
        'fileName': fileName,
        'useUniqueFileName': 'false',
        'iat': iatTime,
        'exp': expTime
    }, process.env.API_KEY_IMAGE_KIT_IO, {
        header: {
            alg: 'HS256',
            typ: 'JWT',
            kid: process.env.API_KEY_IMAGE_KIT_IO,
        },
    });
    
    console.log({ token })

    return token;
}

export async function uploadFile({ formData, token }) {
    const resultUploadFile = await callAPI({
        method: METHOD.POST,
        url: IMAGE_KIT_IO_URL.UPLOAD_FILE,
        isFormData: true,
        authType: AUTH_TYPE.BASIC_AUTH,
        body: formData,
        token: token,
    });
    return resultUploadFile;
}