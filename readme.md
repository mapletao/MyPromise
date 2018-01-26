# promise overwrite
## 注册对象

### 成功对象
```  
const p3 = new MyPromise(function(resolve, reject) {
  reject(1)
}); 
```
```
const p2 = MyPromise.resolve(1)
```
### 拒绝对象
```
const p6 = new MyPromise(function(resolve, reject) {
  resolve(2)
})  
```
```
const p5 = MyPromise.reject(function(){})
```
### 延时拒绝对象
```  
const p = new MyPromise(function(resolve, reject) {
    setTimeout(() => reject(1), 1000)
}); 
```
### 延时成功对象
```
const p4 = new MyPromise(function(resolve, reject) {
    setTimeout(() => resolve(2), 1000)
});
```
## 测试函数
```
 function test(p, text) {
            p.then(res => {
                console.log(text, res)
            }, err => {
                console.log(text, 'reject ' + err)
            }).then(res => {
                console.log(text, res)
            }).finally(() => {
                console.log(text, 'finally', p)
            })
        }
```
## 测试调用
```
test(p, 'MyPromise')
test(p4, 'MyPromise')
test(p3, 'MyPromise')
test(p6, 'MyPromise')
test(p5, 'MyPromise')
test(p2, 'MyPromise')
```