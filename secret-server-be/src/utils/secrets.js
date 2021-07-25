const crypto = require('crypto')
const base64url = require('base64url')

const algorithm = 'aes-256-ctr'
const key = process.env.CRYPTO_SECRET

const encrypt = (secretText) => {
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(algorithm, key, iv)

    return base64url.encode(Buffer.concat([iv, cipher.update(secretText), cipher.final()]).toString('base64'))
}

const decrypt = (hash) => {
    let encrypted = Buffer.from(base64url.decode(hash), 'base64')
    const iv = encrypted.slice(0, 16)

    encrypted = encrypted.slice(16)

    const decipher = crypto.createDecipheriv(algorithm, key, iv)


    let decryptedData = decipher.update(encrypted)

    decryptedData += decipher.final()
    return decryptedData
}

module.exports = {
    encrypt,
    decrypt
}