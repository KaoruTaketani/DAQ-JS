export default (
    sz1,
    sz2
) => {
    return new Array(sz1).fill().map(_ => new Array(sz2 ?? sz1).fill(0))
}