import { atom, RecoilState, selector } from 'recoil'

export const loginDialogAtom = atom({
    key: 'loginDialogAtom',
    default: {
        isComponentVisible: false,
        isStyleVisible: false
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
