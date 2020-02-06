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

module.exports = {

  PRE_PK_P256: '03b28b7f',
  PRE_PK_P256K: '03fee256',

  PRE_PKH_P256: '04b106',
  PRE_PKH_P256K: '04b103',

  PRE_SIG_P256: '36f02c34',
  PRE_SIG_P256K: '0d7365133f',

  PRE_CHAIN_ID: '575200',

  MAGIC_BLOCK: '01',
  MAGIC_ENDORSE: '02',
  MAGIC_GENERIC: '03'

}
