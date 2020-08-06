## JSON-STRINGIFY-FUNC

正常情况下是：

```
const data1 = {
  a: 'aaa',
  fn: function() {
    return true
  }
}
JSON.stringify(data)

// 结果是  "{"a":"aaa"}"

```

使用本 js 是支持 function
