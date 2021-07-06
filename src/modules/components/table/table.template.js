const CODES = {
    A: 65,
    Z: 90
}

function createCell(_, col) {
    return `
        <div class="cell" contenteditable data-col="${col}"></div>
    `
}

function createCol(name, index) {
    return `
        <div class="column" data-type="resizable" data-col="${index}">
            ${name}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `
}

function createRow(info, data) {
    const resize = info ? '<div class="row-resize" data-resize="row"></div>' : ''
    return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${info ? info : ''}
                ${resize}
            </div>
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
        .map((_, j) => createCol(toChar(CODES.A + j), j))
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