以EcmaScript5 为开发启点，遵循CommonJS中Modules/Wrappings规范的define形式，运行于web浏览器中的JS框架

# 加入以下EcmaScript5 内容

 * Array.prototype.forEach 遍历数组中的每一项
 * Array.prototype.indexOf 正向查找
 * Array.prototype.lastIndexOf 逆向查找
 * Array.prototype.filter 从一个数组中选出符合条件的元素，不过并不改变原来的数组
 * Array.prototype.map  对一个数组每一个元素执行函数并把结果作为一个数组返回
 * Object.create
 * Function.prototype.bind
 * String.prototype.trim
 * Date.now

# EcJs中默认加入了以下内容

  - EcJs.type(obj) 返回变量的类型 支持 Boolean Number String Function Array Date RegExp Object 类型
  - EcJs.mix(rec, sup, deep) 对象混合函数，支持深层混合
  - EcJs.guid() 得到一个唯一的数字ID
  - EcJs.later() 延时执行
  - EcJs.load(ids, factory, forUrl)
  - define(id, deps, factory) 模块注册函数

# 感谢

EcJs.load/define的实现来源于玉伯的[seajs](https://github.com/seajs/seajs)，谢之!