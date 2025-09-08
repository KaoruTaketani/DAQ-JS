export default (
    f,
    delay
) => {
    let isBusy
    return function () {
        if (isBusy) return

        isBusy = true
        setTimeout(() => {
            isBusy = false
            f()
        }, delay)
    }
}

