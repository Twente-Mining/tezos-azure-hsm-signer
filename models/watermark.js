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

const path = require('path')
const fs = require('fs-extra')
const {magic, blockLevel} = require('./operation')
const WM_FILE = 'watermarks.json'

const opEqual = function(wm, tz, op) {
  return wm.tz === tz && wm.op === op
}

const getWatermarks = function(dir) {
  let file = path.join(dir, WM_FILE)
  fs.ensureFileSync(file)
  let json = fs.readFileSync(file).toString()
  return json.length === 0 ? {} : JSON.parse(json)
}

const canSign = function(dir, tz, op) {
  let watermarks = getWatermarks(dir)
  let mb = magic(op)
  let wm = watermarks[`${tz}_${mb}`]
  if (!!wm && opEqual(wm, tz, op) && blockLevel(op) <= blockLevel(wm.op)) {
    return false
  }
  return true
}

const setWatermark = function(dir, tz, op) {
  let file = path.join(dir, WM_FILE)
  let watermarks = getWatermarks(dir)
  let mb = magic(op)
  watermarks[`${tz}_${mb}`] = {
    tz: tz,
    op: op
  }
  fs.writeFileSync(file, JSON.stringify(watermarks, null, 2))
}

module.exports = {
  canSign,
  setWatermark
}
