/**
 * @param {string} label
 * @param {HTMLSelectElement|HTMLInputElement} [element]
 * @returns {HTMLLabelElement}
 */
export default (
    label,
    element
) => {
    const labelElement = document.createElement('label')
    if (element) {
        // console.log(element.type)
        if (element.type === 'number') {
            element.style.width = '130px'
            element.style.display = 'block'
            element.style.margin = 'auto'
            labelElement.innerText = label
            labelElement.appendChild(element)
        }
        if (element.type === 'checkbox') {
            labelElement.style.display = 'block'
            labelElement.appendChild(element)
            labelElement.appendChild(document.createTextNode(label))
        }
        if (element.type === 'radio') {
            element.value = label
            labelElement.style.display = 'block'
            labelElement.appendChild(element)
            labelElement.appendChild(document.createTextNode(label))
        }
        if (element.type === 'select-one') {
            element.style.width = '130px'
            element.style.display = 'block'
            element.style.margin = 'auto'
            labelElement.innerText = label
            labelElement.appendChild(element)
        }
        if (element.type === 'select-multiple') {
            labelElement.innerText = label
            labelElement.appendChild(element)
        }
        labelElement.style.width = '130px'
        // labelElement.style.display = 'block'
        // labelElement.style.margin = 'auto'
        labelElement.style.paddingLeft = '10px'
    } else {
        labelElement.innerText = label
    }

    return labelElement
}