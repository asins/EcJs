/**
* @file src/es5-shim.js
* @brief 让低版本浏览器支持EcmaScript5的一些方法
* @author Asins - asinsimple AT gmail DOT com
* @version 
* @date 2012-01-05
*/

/*
 * 加入以下EcmaScript 5内容
 * Array.prototype.forEach 遍历数组中的每一项
 * Array.isArray 是否为数组
 * Array.prototype.indexOf 正向查找
 * Array.prototype.lastIndexOf 逆向查找
 * Array.prototype.filter 从一个数组中选出符合条件的元素，不改变原来的数组
 * Array.prototype.map  对一个数组每一个元素执行函数并把结果作为一个数组返回
 * Array.prototype.unique 去除重复项
 * Function.prototype.bind
 * String.prototype.trim
 * Date.now
 */
var ArrayProto = Array.prototype
	, StringProto = String.prototype
	, FunctionProto = Function.prototype
	
// ES5 Array.forEach
ArrayProto.forEach || (ArrayProto.forEach = function(callback, thisp){
	var i = 0
		len = this.length >>> 0

	for(; i < len; i++){
		if (i in this)
			callback.call(thisp, this[i], i, this)
	}
})

// Array.isArray
Array.isArray || (Array.isArray = function(obj){
	return EcJs.type(obj) === 'array';
});

// Array.indexOf
ArrayProto.indexOf || (ArrayProto.indexOf = function(searchElement, fromIndex){
	var len = this.length >>> 0

	fromIndex = ~~fromIndex;

	if (fromIndex < 0) fromIndex = Math.max(len + fromIndex, 0);

	for (; fromIndex < len; fromIndex++) {
		if (this[fromIndex] === searchElement) return fromIndex;
	}
	return -1;
})

// Array.lastIndexOf
ArrayProto.lastIndexOf || (ArrayProto.lastIndexOf = function(searchElement, fromIndex){
	var len = this.length

	if(fromIndex !== 0){
		fromIndex = ~~fromIndex;
	}

	fromIndex = fromIndex > 0
		? Math.min(fromIndex, len-1)
		: len + fromIndex - 1

	for (; fromIndex >= 0; fromIndex--) {
		if (this[fromIndex] === searchElement) return fromIndex;
	}
	return -1;
})

// Array.filter
ArrayProto.filter || (ArrayProto.filter = function(callback, thisp){
	var len = this.length >>> 0
		, res = []
		, i = 0

	for(; i<len; i++){
		if(i in this && callback.call(thisp, this[i], i, this))
			res.push(this[i]);
	}
	return res;
})

ArrayProto.map || (ArrayProto.map = function(callback, thisp){
	//if(type(callback) !== 'function') throw new TypeError;

	var len = this.length >>> 0;
		, res = new Array(len)
		, i = 0

	for(; i<len; i++){
		if(i in this) res[i] = callback.call(thisp, this[i], i, this)
	}
	return res;
})

// Function.prototype.bind
FunctionProto.bind || (FunctionProto.bind = function(obj){
	var me = this
		, args = ArrayProto.slice.call(arguments, 1)
		, nop = function () {}
		, bound = function () {
			return me.apply( this instanceof nop ? this : ( obj || {} ),
				args.concat( ArrayProto.slice.call(arguments) ) );
		};

		bound.prototype = this.prototype;

		return bound;
})

//String.trim
StringProto.trim || (StringProto.trim = function() {
	return String(this).replace(/^\s+|\s+$/g, '');
})

// Date.now
Date.now || (Date.now = function(){
	return +new Date();
})
