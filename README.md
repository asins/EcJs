以EcmaScript5 为开发启点，遵循CommonJS中Modules/Wrappings规范的define形式，运行于web浏览器中的JS框架

# 加入以下EcmaScript5 内容

 * Array.prototype.forEach
 * Array.prototype.indexOf
 * Array.prototype.lastIndexOf
 * Array.prototype.filter
 * Array.prototype.map
 * Function.prototype.bind
 * String.prototype.trim
 * Date.now

# EcJs中默认加入了以下内容

  - EcJs.type(obj) 返回变量的类型 支持 Boolean Number String Function Array Date RegExp Object 类型
  - EcJs.mix(rec, sup, deep) 对象混合函数，支持深层混合
  - EcJs.guid() 得到一个唯一的ID
  - EcJs.later() 延时执行
  - EcJs.load(ids, factory, forUrl)
  - define(id, deps, factory) 模块注册函数

# 感谢
