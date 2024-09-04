// const ImageKit = require("imagekit");

// const imagekit = new ImageKit({
//     publicKey : "public_nCaUm1ZXWcgOf875zEECy/QgddQ=",
//     privateKey : "private_M9m15NHwZttnKex4AL/fBQYHqHc=",
//     urlEndpoint : "https://ik.imagekit.io/nk01q5kir"
// });

// console.log({
//     imagekit
// })

const jwt = require('jsonwebtoken');

const token = jwt.sign({
    'fileName': 'vivawool_product_001.jpg',
    'useUniqueFileName': 'false',
    'iat': 1725428247090,
    'exp': 1725471296000
}, 'private_M9m15NHwZttnKex4AL/fBQYHqHc=', {
    // expiresIn: 1725456896000,
    header: {
        alg: "HS256",
        typ: "JWT",
        kid: 'private_M9m15NHwZttnKex4AL/fBQYHqHc=',
    },
});

console.log({ token })