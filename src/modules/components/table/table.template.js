const CODES = {
    A: 65,
    Z: 90
}

function createCell(row) {
    return function (_, col) {
        return `
            <div 
                class="cell" 
                contenteditable 
                data-type="cell"
                data-col="${col}" 
                data-id="${row}:${col}"
                >
            </div>
        `        
    }
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

    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(createCell(row))
            .join('')
        rows.push(createRow(row + 1, cells))
    }

    return rows.join('')
}