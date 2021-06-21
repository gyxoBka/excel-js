const CODES = {
    A: 65,
    Z: 90
}

function createCell() {
    return `
        <div class="cell" contenteditable></div>
    `
}

function createCol(name) {
    return `
        <div class="column">${name}</div>
    `
}

function createRow(info, data) {
    return `
        <div class="row">
            <div class="row-info">${info ? info : ''}</div>
            <div class="row-data">${data}</div>
        </div>
    `
}

function toChar(uniCode) {
    return String.fromCodePoint(uniCode)
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map((_, j) => createCol(toChar(CODES.A + j)))
        .join('')

    rows.push(createRow(null, cols))

    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell)
            .join('')
        rows.push(createRow(i + 1, cells))
    }

    return rows.join('')
}