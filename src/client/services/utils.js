export function getFromLocalStorage(key) {
    let item = localStorage.getItem(key);
    try {
        return JSON.parse(item);
    } catch (e) {
        return item;
    }
}

export function setToLocalStorage(key, value) {
    if (typeof value === 'object') {
        value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
}