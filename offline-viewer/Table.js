const url = new URL(import.meta.url)
url.protocol = 'ws:'
const socket = new WebSocket(url)
socket.onclose = () => {
    document.body.innerHTML = "the connection was closed by the server."
}

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
        return '<tr>' + Array.from(listboxElement.options)
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
    tableElement.innerHTML = [
        '<thead>',
        `<tr>`,
        Array.from(listboxElement.options)
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
/** @type {HTMLSelectElement} */
const listboxElement = document.createElement('select')
listboxElement.size = 20
listboxElement.multiple = true
listboxElement.style.position = 'absolute'
listboxElement.style.whiteSpace = 'pre-wrap'
listboxElement.style.width = '200px'
listboxElement.style.height = `${window.innerHeight - 8 * 2}px`
listboxElement.onchange = () => {
    socket.send(Array.from(listboxElement.selectedOptions).map(option => option.innerText).join(','))
}
document.body.appendChild(listboxElement)


/** @type {HTMLTableElement} */
const tableElement = document.createElement('table')
tableElement.style.marginLeft = '208px'
tableElement.addEventListener('click', event => {
    /** @type {HTMLTableCellElement} */
    const target =/** @type {HTMLTableCellElement} */(event.target)
    if (target.nodeName !== 'TH') return

    if (sortKey === target.innerText) {
        sortOrder = -1 * sortOrder
    } else {
        sortKey = target.innerText
    }
    parseTable()
    updateView()
})
document.body.appendChild(tableElement)



socket.onmessage = (/** @type {MessageEvent} */event) => {
    if (listboxElement.options.length === 0) {
        listboxElement.innerHTML = event.data
        listboxElement.dispatchEvent(new Event('change'))
    } else {
        tableElement.innerHTML = event.data
    }
}
