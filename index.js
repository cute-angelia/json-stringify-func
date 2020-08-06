'use strict'

class Jsoner {
  replace(k, v) {
    if (typeof v === 'function') {
      return Function.prototype.toString.call(v)
    }
    return v
  }

  stringify(obj) {
    return JSON.stringify(obj, this.replace)
  }

  parse(str) {
    var thiz = this;
    var obj = JSON.parse(str)

    Object.getOwnPropertyNames(obj).forEach((key) => {
      if (typeof obj[key] == "object") {
        Object.getOwnPropertyNames(obj[key]).forEach((key2) => {
          if (typeof obj[key][key2] == "string" && obj[key][key2].indexOf("function") >= 0) {
            obj[key][key2] = thiz.looseJsonParse(obj[key][key2])
          }
        })
      }

      if (key.indexOf("handler") >= 0) {
        obj[key] = thiz.looseJsonParse(obj[key])
      }
    })

    return obj
  }

  looseJsonParse(obj) {
    return Function('"use strict";return (' + obj + ')')();
  }
}

module.exports.Jsoner = Jsoner;