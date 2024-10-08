['a', 'b', 'c', 'd', 'e'].reduce((previous, value) => previous.then(() =>
    new Promise(resolve => {
        setTimeout(() => {
            console.log(value)
            resolve()
        }, 1000)
    })
), Promise.resolve())
