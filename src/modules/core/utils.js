export function capitalize(str) {
    if (!str || typeof str !== 'string')
        return ''

    return str[0].toUpperCase() + str.slice(1);
}

export function debounce(f, ms) {
    let timeout
    
    return function(...args) {
        const later = () => {
            clearTimeout(timeout)
            f.apply(this, args)
        }

        clearTimeout(timeout)
        timeout = setTimeout(later, ms)
    }
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }

    return new Array(end - start + 1).fill('').map((_, index) => start + index)
}

export function storage(key, data = null) {
    if( !data) {
        return JSON.parse(localStorage.getItem(key))
    }

    localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
    if (typeof a === 'object' && typeof b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b)
    }

    return a === b
}

export function camelCaseToDash(str) {
    if (!str) {
        return null;
    }

    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase()
}

export function toInlineStyles(styles = {}) {
    return Object.keys(styles)
        .map(key => `${camelCaseToDash(key)}: ${styles[key]}`)
        .join(';')
}