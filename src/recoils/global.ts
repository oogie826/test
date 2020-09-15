import { atom, selector } from 'recoil'

export const loginDialogAtom = atom({
    key: 'loginDialogAtom',
    default: {
        renderComp: false,
        renderCss: false
    }
});

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
