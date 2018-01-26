# promise overwrite
`  const p3 = new MyPromise(function(resolve, reject) {
            reject(1)
        });
        const p6 = new MyPromise(function(resolve, reject) {
            resolve(2)
        })  `