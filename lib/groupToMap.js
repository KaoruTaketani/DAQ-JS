/**
 * @param {object[]} objects
 * @param {function} callback
 * @returns {Map<string|number,object[]>}
 */
export default (
    objects,
    callback
) => objects.reduce((map, current) => {
    const key = callback(current),
        values = map.get(key)
    if (values !== undefined) {
        // map.set(key, values.push(current))
        values.push(current)
        // console.log(values)
        // map.set(key,values)
    } else {
        map.set(key, [current])
    }
    return map
}, new Map())