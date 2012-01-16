/**
* @file src/base.js
* @author Asins - asinsimple AT gmail DOT com
* @version 0.1
* @date 2012-01-05
*/
"use strict";

!function(EcJs, window){
	var EcJs = window.EcJs = {}
	var laterCache = {};

	/**
	* @brief type 取得变量类型
	* @param obj {All} 变量
	* @return {String} 变量类型名
	*/
	"Boolean Number String Function Array Date RegExp Object".split(" ").forEach(function(name){
		typeMap[ "[object " + name + "]" ] = name.toLowerCase();
	}, typeMap);

	EcJs.type = function(obj) {
		return obj == null
			? String(obj)
			: typeMap[ Object.prototype.toString.call(obj) ] || "object"
	}

	/**
	* @brief mix 为一个对象添加更多成员
	*
	* @param target {Object} 目标对象
	* @param source {Object} 属性来源对象
	* @param ov {Boolean}(true) 表示复制时是否采用覆盖模式。默认为 true.
	*
	* @return <Object> r
	*/
	EcJs.mix = function(target, source, ov) {
		if (!target || !source) return target;
		if (ov === undefined) ov = true;
		for (var key in source) {
			if (ov || !(key in target)) {
				target[key] = source[key];
			}
		}
		return target;
	}

	EcJs.log = function(str){
		 console !== undefined && console.log(str);
	}

	EcJs.guid = function(){
		return ++GUID
	}

	/**
	* 延时执行callback方法
	* param id {String} 唯一标识符，如果id不指定later将无法手动或调用取消
	* param delay {Number} 延迟0或更高毫秒后执行callback
	* param callback {Function} 在delay毫秒后将被执行的方法
	* param obj {Object} 延时的时长 单位毫秒
	*	scope {Object} callback的作用域
	*	data {Object} callback方法的参数
	*	periodic {Boolean} 是否为周期性执行
	*
	* see http://benalman.com/projects/jquery-dotimeout-plugin/
	*
	* e.g.
	* see http://benalman.com/projects/jquery-dotimeout-plugin/
	*
	* var fn1 = function(a,b){console.log(a,b)};
	* var fn2 = function(a,b){console.log(a,b); return true};
	* 
	* later(1000, fn1, 3, 5); //一秒后运行fn1，并将3,5做为参数传给fn1
	* 
	* later('a', 1000, fn1);
	* later('a'); // 立刻停止'a'定时器
	* later('a', true); // 立刻执行fn1
	* 
	* later('b', 1000, fn2); // fn2中返回值为true，则每隔1秒执行一次fn2
	* later('b', false); // 立刻停止'b'定时器
	*/
	EcJs.later = function(){
		var sliceArgs = 3
			, args = arguments
			, data = {}
			, id = args[0]
			, delay = args[1]
			, callback = args[2]
		
		if(type(id) !== 'string'){
			sliceArgs--;
			id = 0;
			delay = args[0];
			callback = args[1];
		}

		if(id){
			data = laterCache[id] || (laterCache[id] = {})
		}

		// 清除此ID原有延时事件
		if(data.id){
			clearTimeout( data.id );
			delete data.id;
		}
		
		if(callback){
			data.fn = function(noPollingLoop){
				callback.apply(window, ArrayProto.slice.call(args, sliceArgs)) === true && !noPollingLoop
				? actuallySetTimeout()
				: cleanUp();
			};
			actuallySetTimeout();
		}
		else if(data.fn){
			delay === undefined ? cleanUp() : data.fn( delay === false );
			return true;
		}
		else{
			cleanUp();
		}

		function cleanUp(){
			if(id){
				delete laterCache[id];
			}
		}

		function actuallySetTimeout() {
			data.id = setTimeout( function(){ data.fn() }, delay );
		}
	}
}(EcJs, window)
