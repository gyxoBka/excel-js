export function capitalize(str) {
    if (!str || typeof str !== 'string')
        return ''

    return str[0].toUpperCase() + str.slice(1);
}

export function debounce(f, ms) {
    let isCooldown = false;

    return function() {
        if (isCooldown) return;

        isCooldown = true;
        setTimeout(() => isCooldown = false, ms);
        
        f.apply(this, arguments);
    };
}

export function range(start, end) {
    if (start > end) {
        [end, start] = [start, end]
    }

    return new Array(end - start + 1).fill('').map((_, index) => start + index)
}