import { AUTH_TYPE, callAPI, METHOD } from '../general';
import { IMAGE_KIT_IO_URL } from './url';

import { Buffer } from 'buffer';
import * as FormData from 'form-data';
import { sign } from 'jsonwebtoken';

export type GetTokenImageKitIOParams = {
    fileName: string
}

export type UploadFileParams = {
    file: string,
    fileName: string
}

export type UploadFileImageKitResponse = {
    fileId: string,
    name: string,
    size: number,
    versionInfo: {
        id: string,
        name: string,
    },
    filePath: string,
    url: string,
    fileType: string,
    height: number,
    width: number,
    orientation: number,
    thumbnailUrl: string,
    AITags: any
}

export function getTokenImageKitIO({ fileName }: GetTokenImageKitIOParams) {
    const iatTime = new Date().getTime();

    const TTL_TOKEN = 60000; // 60s
    const expTime = iatTime + TTL_TOKEN;

    const token = sign({
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

export async function uploadFile({ 
    file,
    fileName,
}: UploadFileParams): Promise<UploadFileImageKitResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);

    const tokenToUploadImage = Buffer.from(process.env.API_KEY_IMAGE_KIT_IO + ':').toString('base64');

    const resultUploadFile = await callAPI({
        url: IMAGE_KIT_IO_URL.UPLOAD_FILE,
        authType: AUTH_TYPE.BASIC_AUTH,
        token: tokenToUploadImage,
        method: METHOD.POST,
        isFormData: true,
        body: formData,
    });

    return resultUploadFile;
}