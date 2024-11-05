export default (
    a,
    b
) => {
    if (a.length !== b.length) return []

    const c = new Array(a.length)
    for (let i = 0; i < c.length; ++i)c[i] = a[i] + b[i]

    return c
}