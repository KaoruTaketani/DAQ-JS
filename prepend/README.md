## sources
### add1.js
```js
/// operator 1
let _length
length.addListener(arg => { _length = arg })
let _angle
angle.addListener(arg => {
    _angle = arg
    console.log(`length: ${_length}, angle: ${_angle}`)
})
/// operator 2
length.addListener(_ => {
    angle.assign(5)
})
/// index
length.assign(10)
```

### add2.js
```js
/// operator 2
length.addListener(_ => {
    angle.assign(5)
})
/// operator 1
let _length
length.addListener(arg => { _length = arg })
let _angle
angle.addListener(arg => {
    _angle = arg
    console.log(`length: ${_length}, angle: ${_angle}`)
})
/// index
length.assign(10)
```

### prepend1.js
```js
/// operator 1
let _length
length.prependListener(arg => { _length = arg })
let _angle
angle.addListener(arg => {
    _angle = arg
    console.log(`length: ${_length}, angle: ${_angle}`)
})
/// operator 2
length.addListener(_ => {
    angle.assign(5)
})
/// index
length.assign(10)
```

### prepend2.js
```js
/// operator 2
length.addListener(_ => {
    angle.assign(5)
})
/// operator 1
let _length
length.prependListener(arg => { _length = arg })
let _angle
angle.addListener(arg => {
    _angle = arg
    console.log(`length: ${_length}, angle: ${_angle}`)
})
/// index
length.assign(10)
```



## outputs
### add1.js
```
length: 10, angle: 5
```

### add2.js
```
length: undefined, angle: 5
```

### prepend1.js
```
length: 10, angle: 5
```

### prepend2.js
```
length: 10, angle: 5
```

