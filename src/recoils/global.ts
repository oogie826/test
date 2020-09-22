import { atom, RecoilState, selector } from 'recoil'

export const loginDialogAtom = atom({
    key: 'loginDialogAtom',
    default: {
        isComponentVisible: false,
        isStyleVisible: false
    }
});

// 사용자 정보 및 권한
export const userStateAtom = atom({
    key: 'userStateAtom',
    default: {
        username: '',
        auth: ''
        /*
            auth: 'guest', 'teacher', 'parent', 'director'
        */
    }
})