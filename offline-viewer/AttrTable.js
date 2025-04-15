/** @type {string[]} */
const keys = []
/** @type {object[]} */
const metadata = []
/** @type {string} */
let sortKey = 'name'
/** @type {number} */
let sortOrder = 1

function parseTable() {
    keys.splice(0)
    metadata.splice(0)
    Array.from(tableElement.rows).forEach((rowNode, row) => {
        if (row === 0) {
            rowNode.childNodes.forEach(node => {
                if (node.textContent === null) return
                keys.push(node.textContent)
            })
        } else {
            /** @type {any} */
            const obj = {}
            rowNode.childNodes.forEach((node, column) => {
                if (node.textContent === null) return
                const value = parseInt(node.textContent)
                obj[keys[column]] = Number.isNaN(value) ? node.textContent : value
            })
            metadata.push(obj)
        }
    })
}
function updateView() {
    // tableViewElement.innerHTML = tableElement.innerHTML
    // console.log(`sortOrder: ${sortOrder}, sortKey: ${sortKey}`)

    const innerHTML = metadata.sort((a, b) => {
        // const aValue = a[this._metadataSortKey]
        const aMap = new Map(Object.entries(a))
        const aValue = aMap.get(sortKey)
        // const bValue = b[this._metadataSortKey]
        const bMap = new Map(Object.entries(b))
        const bValue = bMap.get(sortKey)
        if (aValue === undefined) {
            if (bValue === undefined) {
                return 0
            } else {
                return 1 * sortOrder
            }
        } else {
            if (bValue === undefined) {
                return -1 * sortOrder
            } else {
                return aValue < bValue
                    ? -1 * sortOrder
                    : 1 * sortOrder
            }
        }
    }).map(row => {
        // const selected = selectedOptionInnerTexts(visibleColumnsElement.innerHTML)
        // const selected = Array.from(visibleColumnsElement.children).filter(node => node.selected)
        // return '<tr>' + optionInnerTexts(visibleColumnsElement.innerHTML)
        return '<tr>' + Array.from(visibleColumnsElement.options)
            .filter(column => column.selected)
            .map(column => {
                // const cell = row[column]
                const cellMap = new Map(Object.entries(row))
                const cell = cellMap.get(column.innerText)
                if (typeof cell === 'number') {
                    return Number.isInteger(cell) ? `<td align="right">${cell.toLocaleString()}</td>` : `<td align="right">${cell.toExponential()}</td>`
                } else {
                    return `<td>${cell}</td>`
                }
            }).join('') + '</tr>'
    }).join('')
    tableViewElement.innerHTML = [
        '<thead>',
        `<tr>`,
        Array.from(visibleColumnsElement.options)
            .filter(option => option.selected)
            .map(column => column.innerText === sortKey
                ? `<th style="${sortOrder === 1
                    ? 'text-decoration:underline'
                    : 'text-decoration:overline'}">${column.innerText}</th>`
                : `<th>${column.innerText}</th>`
            ).join(''),
        `</tr>`,
        '</thead>',
        '<tbody>',
        innerHTML,
        '</tbody>'
    ].join('')


}
/** @type {HTMLDialogElement} */
const dialogElement = document.createElement('dialog')
document.body.appendChild(dialogElement)

/** @type {HTMLSelectElement} */
const visibleColumnsElement = document.createElement('select')
visibleColumnsElement.size = 20
visibleColumnsElement.multiple = true
visibleColumnsElement.style.display = 'block'
visibleColumnsElement.style.width = '130px'
visibleColumnsElement.onchange = () => {
    // window.parent.electron.send('visibleColumnsInnerHTML', selectElementInnerHTML(visibleColumnsElement))
    updateView()
}
// dialogElement.appendChild(createLabelElement('visible', visibleColumnsElement))
dialogElement.appendChild(visibleColumnsElement)


/** @type {HTMLTableElement} */
const tableViewElement = document.createElement('table')
tableViewElement.addEventListener('dblclick', event => {
    /** @type {HTMLTableCellElement} */
    const target =/** @type {HTMLTableCellElement} */(event.target)
    if (target.nodeName !== 'TD') return
    dialogElement.showModal()
})
tableViewElement.addEventListener('click', event => {
    /** @type {HTMLTableCellElement} */
    const target =/** @type {HTMLTableCellElement} */(event.target)
    if (target.nodeName !== 'TH') return

    if (sortKey === target.innerText) {
        sortOrder = -1 * sortOrder
    } else {
        sortKey = target.innerText
    }
    updateView()
})
document.body.appendChild(tableViewElement)



/** @type {HTMLTableElement} */
const tableElement = document.getElementsByTagName('table')[0]
console.log(tableElement)
tableElement.style.display = 'none'
parseTable()
visibleColumnsElement.innerHTML = keys.map(key => `<option selected>${key}</option>`).join('')
updateView()





/** @type {HTMLInputElement} */
const closeButton = document.createElement('input')
closeButton.type = 'button'
closeButton.value = 'close'
closeButton.onclick = () => {
    dialogElement.close()
}
dialogElement.appendChild(closeButton)