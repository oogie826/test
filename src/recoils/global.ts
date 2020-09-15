import { atom } from 'recoil'

export const isLoginAtom = atom({
    key: 'isLoginAtom',
    default: false,
})

export const loginDialogAtom = atom({
    key: 'loginDialogAtom',
    default: false,
})

export const userInfoAtom = atom({
    key: 'userInfoAtom',
    default: {
        username: '',
        fullname: '',
        belonging: '',
        kindergarten_name: '',
        auth: ''
        /*
            auth: 'guest', 'teacher', 'parent' 
        */
    }
})
