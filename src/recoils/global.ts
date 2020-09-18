import { atom, selector } from 'recoil'

export const loginDialogAtom = atom({
    key: 'loginDialogAtom',
    default: {
        renderComp: false,
        renderCss: false
    }
});

export const userStateAtom = atom({
    key: 'userStateAtom',
    default: {
        username: '',
        auth: ''
        /*
            auth: 'guest', 'teacher', 'parent' 
        */
    }
})
