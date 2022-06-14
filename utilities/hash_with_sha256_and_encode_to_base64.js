const crypto = require("crypto")

//hash with sha256 and encode result to base64
const hash_with_sha256_and_encode_to_base64 = (parameter_1) =>
{
            let hash =  crypto.createHash('SHA-256')

            hash.update(parameter_1)

            return hash.digest("base64")    
}

module.exports = hash_with_sha256_and_encode_to_base64