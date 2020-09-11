export function isEmpty(obj) {
    if (obj === '' || obj === null || obj === undefined || (obj !== null && typeof obj === 'object' && !Object.keys(obj).length)) {
        return true
    }
    else {
        return false
    }
}

export function throttle(callback: Function, wait: number) {
    let onThrottle;
    return function () {
        if (!onThrottle) {
            callback(arguments)
            onThrottle = true;
            onThrottle = setTimeout(() => {
                onThrottle = false;
            }, wait)
        }
    }
}

export function debounce(callback: Function, wait: number) {
    let onDebounce;
    return function () {
        clearTimeout(onDebounce);
        onDebounce = setTimeout(() => {
            callback.apply(this, arguments);
        }, wait);
    }
}

export function hash(str: string) {
    let hashcode = 0;
    for (let i = 0; i < str.length; i += 1) {
        const char = str.charCodeAt(i);
        hashcode = (Math.imul(31, i) + char) | 0;
    }
    return hashcode;
}