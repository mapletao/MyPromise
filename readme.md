# promise overwrite
`  const p3 = new MyPromise(function(resolve, reject) {
            reject(1)
        }); `
`  const p6 = new MyPromise(function(resolve, reject) {
            resolve(2)
        })  `
`  const p = new MyPromise(function(resolve, reject) {
    setTimeout(() => reject(1), 1000)
}); `
`  const p4 = new MyPromise(function(resolve, reject) {
    setTimeout(() => resolve(2), 1000)
});`
`
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
`
`
test(p, 'MyPromise')
test(p4, 'MyPromise')
test(p3, 'MyPromise')
test(p6, 'MyPromise')
`