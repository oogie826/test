import { atom } from 'recoil'

export const isLoginAtom = atom({
    key: 'isLoginAtom',
    default: false,
})

export const loginDialogAtom = atom({
    key: 'loginDialogAtom',
    default: false,
})
