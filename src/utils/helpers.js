export const readCookie = (key, signOut) => {
    try {
        const value = document.cookie ?
            document.cookie.split('; ').find(row => row.startsWith(key)).split('=')[1] :
            '';

        return value;
    }
    catch (error) {
        console.error('unable to read cookie', error);
        signOut();
        return null;
    }
};

export const isEmpty = (obj) => {
    return !obj || Object.keys(obj).length === 0;
};

export const isValidUrl = (string) => {
    let url = null;

    try {
        url = new URL(string);
    }
    catch (error) {
        return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
};
