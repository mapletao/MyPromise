define({ "api": [  {    "type": "overWrite",    "url": "MyPromise",    "title": "",    "group": "MyPromise",    "name": "MyPromise",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "any",            "optional": false,            "field": "resolver",            "description": "<p>required 创建MyPromise对象时的值</p>"          }        ]      }    },    "description": "<p>promise</p>",    "version": "0.1.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "type": "",    "url": "MyPromise",    "title": "方法",    "group": "MyPromise",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise",    "name": "Mypromise"  },  {    "type": "",    "url": "_reject",    "title": "拒绝返回",    "group": "MyPromise",    "name": "_reject",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "any",            "optional": false,            "field": "val",            "description": "<p>拒绝信息</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "type": "",    "url": "_resolve",    "title": "成功当前数据处理",    "group": "MyPromise",    "name": "_resolve",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "any",            "optional": false,            "field": "val",            "description": "<p>成功信息</p>"          }        ]      }    },    "description": "<p>1: 修改当前MyPromise对象的status值（resolved） 2: 赋值当前MyPromise的值</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "type": "",    "url": "all",    "title": "",    "group": "MyPromise",    "name": "all",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "type": "",    "url": "done",    "title": "",    "group": "MyPromise",    "name": "done",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "number",            "optional": false,            "field": "cId",            "description": ""          }        ]      }    },    "group": "MyPromise",    "name": "getCurrentMyPromise",    "type": "",    "url": "getCurrentMyPromise",    "title": "获取当前MyPromise对象",    "description": "<p>1：获取下个MyPromise对象</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "type": "",    "url": "initMyPromise",    "title": "初始化运行传入函数参数",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "MyPromise",            "optional": false,            "field": "myPromise",            "description": "<p>required MyPromise对象</p>"          },          {            "group": "Parameter",            "type": "function",            "optional": false,            "field": "resolver",            "description": "<p>创建后执行的方法</p>"          }        ]      }    },    "group": "MyPromise",    "name": "initMyPromise",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "type": "",    "url": "initParentPromise",    "title": "初始化运行new 运行的封装函数",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "MyPromise",            "optional": false,            "field": "myPromise",            "description": "<p>required MyPromise对象</p>"          },          {            "group": "Parameter",            "type": "function",            "optional": false,            "field": "resolver",            "description": "<p>执行方法</p>"          }        ]      }    },    "group": "MyPromise",    "name": "initParentPromise",    "description": "<p>1:返回处理后的犯法 2: 执行处理方法之后执行then方法</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "type": "",    "url": "race",    "title": "",    "group": "MyPromise",    "name": "race",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "type": "",    "url": "reject",    "title": "拒绝并返回MyPromise对象",    "group": "MyPromise",    "name": "reject",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "any",            "optional": false,            "field": "val",            "description": "<p>成功并返回MyPromise对象</p>"          }        ]      }    },    "description": "<p>1: 修改当前MyPromise对象的status值（reject） 2: 赋值当前MyPromise的值</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "myPromise",            "optional": false,            "field": "myPromise",            "description": ""          },          {            "group": "Parameter",            "type": "function",            "optional": false,            "field": "reject",            "description": ""          }        ]      }    },    "group": "MyPromise",    "name": "rejectNextTick",    "type": "",    "url": "rejectNextTick",    "title": "拒绝执行函数处理",    "description": "<p>1: 返回拒绝处理过后的函数 2：绑定对象MyPromise对象 3: 执行完后处理后续then方法</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "myPromise",            "optional": false,            "field": "myPromise",            "description": ""          }        ]      }    },    "group": "MyPromise",    "name": "removeCurrentMyPromise",    "type": "",    "url": "removeCurrentMyPromise",    "title": "从对象列表中删除当前执行完的对象",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "type": "",    "url": "resolve",    "title": "成功并返回MyPromise对象",    "group": "MyPromise",    "name": "resolve",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "any",            "optional": false,            "field": "val",            "description": "<p>成功并返回MyPromise对象</p>"          }        ]      }    },    "description": "<p>1: 如果为基础类型值则直接返回 2: 如果是MyPromise对象则直接返回 3:如果为方法则新创建当前方法</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "myPromise",            "optional": false,            "field": "myPromise",            "description": ""          },          {            "group": "Parameter",            "type": "function",            "optional": false,            "field": "resolve",            "description": ""          }        ]      }    },    "group": "MyPromise",    "name": "resolveNextTick",    "type": "",    "url": "resolveNextTick",    "title": "成功执行函数处理",    "description": "<p>1: 返回成功处理过后的函数 2：绑定对象MyPromise对象 3: 执行完后处理后续then方法</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "MyPromise",            "optional": false,            "field": "child",            "description": "<p>当前执行完的MyPromise</p>"          },          {            "group": "Parameter",            "type": "boolean",            "optional": false,            "field": "temp",            "description": "<p>成功或者拒绝</p>"          }        ]      }    },    "type": "",    "url": "runThen",    "title": "执行完当前Mypromise之后处理then函数",    "group": "MyPromise",    "name": "runThen",    "description": "<p>1: 是否有下个MyPromise对象，有则执行对应的方法</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "type": "",    "url": "then",    "title": "then方法处理",    "group": "MyPromise",    "name": "then",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "function",            "optional": false,            "field": "resolve",            "description": "<p>required</p>"          },          {            "group": "Parameter",            "type": "function",            "optional": false,            "field": "reject",            "description": ""          }        ]      }    },    "description": "<p>1:then方法返回新的Mypromise对象 2:如果没有函数传入则返回当前MyPromise对象 3:如果当前承诺未完成 则将当前then中的resolve和reject保存起来 4:如果承诺完成 则执行对应的方法并执行后续then方法</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "MyPromise"  },  {    "type": "",    "url": "getErrorText",    "title": "获取错误文字",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "any",            "optional": false,            "field": "value",            "description": "<p>required 错误的值</p>"          }        ]      }    },    "group": "common",    "name": "getErrorText",    "description": "<p>获取错误文字</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "common"  },  {    "type": "",    "url": "isPrimitive判断是否为基本类型",    "title": "",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "any",            "optional": false,            "field": "value",            "description": "<p>required 待检测的值</p>"          }        ]      }    },    "group": "common",    "name": "isPrimitive",    "description": "<p>判断是否为基本类型</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "common"  },  {    "type": "",    "url": "nextTick",    "title": "延时处理then方法执行时间",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "function",            "optional": false,            "field": "callback",            "description": "<p>执行函数</p>"          },          {            "group": "Parameter",            "type": "any",            "optional": false,            "field": "val",            "description": "<p>传递值</p>"          }        ]      }    },    "name": "nextTick",    "group": "common",    "description": "<p>延时处理then方法执行时间</p>",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "common"  },  {    "type": "",    "url": "noop空操作",    "title": "",    "group": "common",    "name": "noop",    "version": "0.0.0",    "filename": "src/myPromise.js",    "groupTitle": "common"  }] });
