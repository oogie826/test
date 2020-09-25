declare namespace Common {
    interface Obj {
        [key: string]: any
    }
}

interface User {
    username: string,
    fullname: string,
    exp: number,
    auth: string,
}