;
(function(win) {

    const _toString = Object.prototype.toString;
    const _isArray = Array.isArray;

    const PENDING = 'pending';
    const RESOLVED = 'resolved';
    const REJECTED = 'rejected';
    let cid = 0
    const myPromises = []


    /**
     * 
     * @api noop空操作
     * @apiGroup common
     * @apiname noop
     */
    function noop() {}
    /**
     * @api isPrimitive判断是否为基本类型
     * @apiParam {any} value required 待检测的值
     * @apiGroup common
     * @apiName isPrimitive
     * @apiDescription 判断是否为基本类型
     */
    function isPrimitive(value) {
        return (
            typeof value === 'string' ||
            typeof value === 'number' ||
            typeof value === 'boolean'
        );
    }

    /**
     * @api getErrorText 获取错误文字
     * @apiParam {any} value required 错误的值
     * @apiGroup common
     * @apiName getErrorText
     * @apiDescription 获取错误文字
     */
    function getErrorText(value) {
        return isPrimitive(value) ? value : _toString.call(value);
    }

    function errorType(val) {
        return 'MyPromise resolver ' + getErrorText(val) + ' is not a function'
    }
    /**
     * @api {overWrite} MyPromise
     * @apiGroup MyPromise
     * @apiName MyPromise
     * @apiParam {any} resolver required 创建MyPromise对象时的值
     * @apiDescription promise
     * @apiVersion 0.1.0
     */
    function MyPromise(resolver) {
        if (typeof resolver !== 'function') {
            throw new TypeError(errorType(resolver));
            return !1;
        }
        if (!(this instanceof MyPromise)) {
            throw new TypeError('undefined is not a MyPromise');
            return !1;
        }
        this.status = PENDING;
        this.value = undefined;
        cid += 1
        this.cid = cid
        if (noop !== resolver) {
            initMyPromise(this, resolver)
        }
    }
    MyPromise.prototype = {
        construct: MyPromise,
        then: then,
        catch: function(reject) {
            this.then(null, reject)
        },
        finally: function(cb) {
            this.then(cb, cb)
        }
    }

    /**
     * @api initMyPromise 初始化运行传入函数参数
     * @apiParam {MyPromise} myPromise required MyPromise对象
     * @apiParam {function} resolver 创建后执行的方法
     * @apiGroup MyPromise
     * @apiName initMyPromise
     */
    function initMyPromise(myPromise, resolver) {
        resolver(initParentPromise(myPromise, _resolve), initParentPromise(myPromise, _reject))
    }
    /**
     * @api initParentPromise 初始化运行new 运行的封装函数
     * @apiParam {MyPromise} myPromise required MyPromise对象
     * @apiParam {function} resolver 执行方法
     * @apiGroup MyPromise
     * @apiName initParentPromise
     * @apiDescription 1:返回处理后的犯法 2: 执行处理方法之后执行then方法
     */

    function initParentPromise(myPromise, resolve) {
        return function(resolve, myPromise, val) {
            resolve.bind(null, myPromise)(val)
            initMyPromiseComplete(myPromise, resolve === _resolve ? true : false)
        }.bind(null, resolve, myPromise)
    }
    /**
     * 
     * @apiParam {MyPromise} myPromise MyPromise 对象
     * @apiParam {boolean} temp 拒绝或成功状态
     * @api firstMyPromiseComplete MyPromise原始对象执行完成
     * @apiDescription MyPromise原始（初始）（执行链的第一个）对象执行完成调用
     * @apiGroup MyPromise
     * @apiName initMyPromiseComplete
     * 
     */
    function initMyPromiseComplete(myPromise, temp) {
        nextTick(runThen.bind(null, myPromise), temp)
    }
    /**
     * 
     * @api MyPromise 方法
     * @apiGroup MyPromise
     */
    MyPromise.resolve = resolve;
    MyPromise.reject = reject;
    MyPromise.all = _all;
    MyPromise.race = _race;

    /**
     * 
     * @api resolve 成功并返回MyPromise对象
     * @apiGroup MyPromise
     * @apiName resolve
     * @apiParam {any} val 成功并返回MyPromise对象
     * @apiDescription 1: 如果为基础类型值则直接返回 2: 如果是MyPromise对象则直接返回 3:如果为方法则新创建当前方法
     */

    function resolve(val) {
        if (val instanceof MyPromise) {
            return val;
        }
        if (val.then && typeof val.then === 'function') {
            return new MyPromise(val.then)
        }
        const myPromise = new MyPromise(noop);
        _resolve(myPromise, val);
        return myPromise;
    }
    /**
     * 
     * @api _resolve 成功当前数据处理
     * @apiGroup MyPromise
     * @apiName _resolve
     * @apiParam {any} val 成功信息
     * @apiDescription 1: 修改当前MyPromise对象的status值（resolved） 2: 赋值当前MyPromise的值
     */
    function _resolve(myPromise, val) {
        if (myPromise.status !== PENDING) {
            return !1;
        }
        myPromise.status = RESOLVED;
        myPromise.value = val;
    }

    /**
     * 
     * @api reject 拒绝并返回MyPromise对象
     * @apiGroup MyPromise
     * @apiName reject
     * @apiParam {any} val 成功并返回MyPromise对象
     * @apiDescription 1: 修改当前MyPromise对象的status值（reject） 2: 赋值当前MyPromise的值
     */
    function reject(val) {
        if (val instanceof MyPromise) {
            return val;
        }
        const myPromise = new MyPromise(noop);
        _reject(myPromise, val);
        return myPromise;
    }
    /**
     * 
     * @api _reject 拒绝返回
     * @apiGroup MyPromise
     * @apiName _reject
     * @apiParam {any} val 拒绝信息
     */
    function _reject(myPromise, val) {
        if (myPromise.status !== PENDING) {
            return !1;
        }
        myPromise.status = REJECTED;
        myPromise.value = val;
    }


    /**
     * @api then then方法处理
     * @apiGroup MyPromise
     * @apiName then
     * @apiParam {function} resolve required
     * @apiParam {function} reject
     * @apiDescription 1:then方法返回新的Mypromise对象 2:如果没有函数传入则返回当前MyPromise对象 3:如果当前承诺未完成 则将当前then中的resolve和reject保存起来 
     * 4:如果承诺完成 则执行对应的方法并执行后续then方法
     */
    function then(resolve, reject) {
        const myPromise = new this.construct(noop);
        if (!resolve && !reject) {
            return this;
        }
        if (this.status === PENDING) {
            myPromise.resolveFun = resolve
            myPromise.rejectFun = reject
        } else if (this.status === RESOLVED) {
            resolve && nextTick(resolveNextTick(resolve, myPromise), this.value);
        } else if (this.status === REJECTED) {
            reject && nextTick(rejectNextTick(reject, myPromise), this.value);
        }
        myPromise.parentId = this.cid
        myPromises.push(myPromise)
        return myPromise;
    }
    /**
     * 
     * @apiParam {MyPromise} child当前执行完的MyPromise
     * @apiParam {boolean} temp成功或者拒绝
     * @api runThen 执行完当前Mypromise之后处理then函数
     * @apiGroup MyPromise
     * @apiName runThen
     * @apiDescription 1: 是否有下个MyPromise对象，有则执行对应的方法
     */
    function runThen(myPromise, temp) {
        const currentMyPromise = getCurrentMyPromise(myPromise.cid);
        removeCurrentMyPromise(myPromise)
        const rejectPromise = getRejectFun(currentMyPromise)
        currentMyPromise &&
            temp ? (typeof currentMyPromise.resolveFun) === 'function' &&
            nextTick(resolveNextTick(currentMyPromise.resolveFun, currentMyPromise), myPromise.value) :
            rejectPromise &&
            nextTick(rejectNextTick(rejectPromise.rejectFun, rejectPromise), myPromise.value);
    }
    /**
     * @api getRejectFun 获取拒绝执行函数
     * @param {MyPromise} myPromise 
     * @apiName getRejectFun
     * @apiGroup MyPromise
     */
    function getRejectFun(myPromise) {
        if (!myPromise) {
            return !1
        }
        if ((typeof myPromise.rejectFun) === 'function') {
            return myPromise
        }
        return getRejectFun(getCurrentMyPromise(myPromise.cid))
    }
    /**
     * 
     * @apiParam {number} cId
     * @apiGroup MyPromise
     * @apiName getCurrentMyPromise
     * @api getCurrentMyPromise 获取当前MyPromise对象
     * @apiDescription 1：获取下个MyPromise对象
     */
    function getCurrentMyPromise(cId) {
        if (!myPromises.some(myPromise => myPromise.parentId === cId)) {
            return !1
        }
        const myPromise = myPromises.filter(myPromise => myPromise.parentId === cId)[0]
        return myPromise
    }
    /**
     * 
     * @apiParam {myPromise} myPromise
     * @apiGroup MyPromise
     * @apiName removeCurrentMyPromise
     * @api removeCurrentMyPromise 从对象列表中删除当前执行完的对象
     * 
     */
    function removeCurrentMyPromise(myPromise) {
        ~myPromises.indexOf(myPromise) && myPromises.splice(myPromises.indexOf(myPromise), 1);
        return true
    }
    /**
     * 
     * @apiParam {myPromise} myPromise
     * @apiParam {function} resolve
     * @apiGroup MyPromise
     * @apiName resolveNextTick
     * @api resolveNextTick 成功执行函数处理
     * @apiDescription 1: 返回成功处理过后的函数 2：绑定对象MyPromise对象 3: 执行完后处理后续then方法
     */
    function resolveNextTick(resolve, myPromise) {
        return function(resolve, myPromise, val) {
            resolve(val);
            runThen(myPromise, true);
        }.bind(null, resolve, myPromise)
    }
    /**
     * 
     * @apiParam {myPromise} myPromise
     * @apiParam {function} reject
     * @apiGroup MyPromise
     * @apiName rejectNextTick
     * @api rejectNextTick 拒绝执行函数处理
     * @apiDescription 1: 返回拒绝处理过后的函数 2：绑定对象MyPromise对象 3: 执行完后处理后续then方法
     */
    function rejectNextTick(reject, myPromise) {
        return function(reject, myPromise, val) {
            reject(val);
            runThen(myPromise, true);
        }.bind(null, reject, myPromise)
    }
    /**
     * @api all
     * @apiGroup MyPromise
     * @apiName all
     */
    function _all(vals) {
        const myPromiseAll = new MyPromise(noop);
        const result = [];
        let errorTip = false;
        const successHandle = () => {
            if (result.length !== vals.length) {
                return !1
            }
            _resolve(myPromiseAll, result);
            initMyPromiseComplete(myPromiseAll, true)
        }
        const errHandle = msg => {
            if (errorTip) {
                return !1
            }
            errorTip = true;
            _reject(myPromiseAll, msg);
            initMyPromiseComplete(myPromiseAll, false)
        }
        if (!_isArray(vals)) {
            errHandle(errorType('undefined'));
            return myPromiseAll;
        }
        for (let i = 0; i < vals.length; i++) {
            const myPromise = vals[i];
            if (myPromise instanceof MyPromise) {
                if (myPromise.status === RESOLVED) {
                    result[i] = myPromise.value;
                    successHandle();
                } else if (myPromise.status === REJECTED) {
                    errHandle(myPromise.value);
                    break;
                } else {
                    myPromise.then(res => {
                        result[i] = res;
                        successHandle();
                    }, err => {
                        errHandle(err);
                    })
                }
            } else {
                result[i] = myPromise;
                successHandle();
            }
        }
        return myPromiseAll
    }
    /**
     * @api race
     * @apiGroup MyPromise
     * @apiName race
     */
    function _race(vals) {
        const myPromiseRace = new MyPromise(noop);
        let completeStatus = false;
        const completeHandle = (msg, cb) => {
            if (completeStatus) {
                return !1
            }
            completeStatus = true;
            cb(myPromiseRace, msg)
            initMyPromiseComplete(myPromiseRace, resolve === _resolve ? true : false)
        }
        if (!_isArray(vals)) {
            completeHandle(errorType('undefined'), _reject);
            return myPromiseRace;
        }
        for (let i = 0; i < vals.length; i++) {
            const myPromise = vals[i];
            if (myPromise instanceof MyPromise) {
                if (myPromise.status === RESOLVED) {
                    // completeHandle(myPromise.value, _resolve);
                    nextTick(completeHandle.bind(null, myPromise.value), _resolve);
                    break;
                } else if (myPromise.status === REJECTED) {
                    completeHandle(myPromise.value, _reject);
                    break;
                } else {
                    myPromise.then(res => {
                        completeHandle(res, _resolve);
                    }, err => {
                        completeHandle(err, _reject);
                    })
                }
            } else {
                nextTick(completeHandle.bind(null, myPromise.value), _resolve);
                break
            }
        }
        return myPromiseRace;
    }
    /**
     * @api done
     * @apiGroup MyPromise
     * @apiName done
     */
    function _done() {}
    /**
     * 
     * @api nextTick 延时处理then方法执行时间
     * @apiParam {function} callback 执行函数
     * @apiParam {any} val 传递值
     * @apiName nextTick
     * @apiGroup common
     * @apiDescription 延时处理then方法执行时间
     *      
     */
    function nextTick(callback, val) {
        setTimeout(callback, 0, val);
    }

    win.MyPromise = MyPromise
})(window);