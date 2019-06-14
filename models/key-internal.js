/**
 * Tezos Azure Signer HSM
 *
 * Copyright (c) Matthew Smith <m@lattejed.com>
 * All rights reserved.
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons
 * to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

const assert = require('assert')
const {getPublicKeyFromXY} = require('./public-key')

const PK = require('../constants/pubkey-constants')
const AZ = require('../constants/azure-constants')

const getKeyFromHSMKey = function(key) {

  let {x, y, crv, kid} = key.key

  assert(x && y && crv && kid, 'A valid key is required')

  let k = {
    kid: kid,
    pk: getPublicKeyFromXY(x, y, crv, PK.TEZOS),
    pkh: getPublicKeyFromXY(x, y, crv, PK.TEZOS_HASH)
  }

  if (crv === AZ.CRV_P256) {
    k.signAlgo = AZ.SIGN_ALGO_P256
  }
  else if (crv === AZ.CRV_P256K) {
    k.signAlgo = AZ.SIGN_ALGO_P256K
  }
  else {
    assert(false, `Invalid key curve ${crv}`)
  }

  return k
}

const mapKeysFromHSMKeys = function(hsmKeys) {
  let keys = hsmKeys.map(getKeyFromHSMKey)
  return keys.reduce((acc, val) => {
    acc[val.pkh] = val
    return acc
  }, {})
}

module.exports = {
  getKeyFromHSMKey,
  mapKeysFromHSMKeys
}
