const isLocalStorageAvailable: boolean = (() => {
    if (typeof window === 'undefined' || !window.localStorage) {
        return false
    }
    try {
        const key = "fUjXn2r59"; // A random key
        const value = "test";
        localStorage.setItem(key, value);
        localStorage.getItem(key);
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        return false;
    }
})();

export function saveToLocalStorage(key: string, value: string, expired: number): number{
    if (!isLocalStorageAvailable) {
        return -1;
    }
    const savedItem = {
        value: value,
        expired: Date.now() + 1000 * expired
    };
    try {
        localStorage.setItem(`casbinjs_${key}`, JSON.stringify(savedItem));
    } catch (e) {
        throw(e)
        // TODO: Process the quotaExceededError
    }
    return 0;
}

/***
 * return: a string.
 * If ret == null, it means there is no such user permission.
 */
export function loadFromLocalStorage(key: string): string | null{
    if (!isLocalStorageAvailable) {
        return null;
    }
    const itemStr = localStorage.getItem(`casbinjs_${key}`);
    // No cache
    if (itemStr === null) {
        return null;
    }
    const item = JSON.parse(itemStr);

    if (Date.now() > item["expired"]){
        localStorage.removeItem(`casbinjs_${key}`);
        return null;
    } else {
        return item['value'];
    }
}

export function removeLocalStorage(key: string) {
    localStorage.removeItem(`casbinjs_${key}`);
}
