export let userLocalStorage = {
    get: () => {
        let dataJson = localStorage.getItem("USER");
        return JSON.parse(dataJson);
    },
    set: (info) => {
        let dataJson = JSON.stringify(info);
        localStorage.setItem("USER", dataJson);
    },
    remove: () => {
        localStorage.removeItem("USER");
    },
};

// ============================================

export let userDetailLocalStorage = {
    get: () => {
        let dataJson = localStorage.getItem("USERDETAIL");
        return JSON.parse(dataJson);
    },
    set: (userDetail) => {
        let dataJson = JSON.stringify(userDetail);
        localStorage.setItem("USERDETAIL", dataJson);
    },
    remove: () => {
        localStorage.removeItem("USERDETAIL");
    },
};