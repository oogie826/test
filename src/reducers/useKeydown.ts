import { useCallback, useReducer } from 'react'

function reducer(state, action) {
    switch (action.type) {
        case 'ENTER':
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.name]: action.value
                }
            }
    }
}

export default function useKeydown(initForm) {
    const [form, dispatch] = useReducer(reducer, initForm);

    const onKeyDownCode = useCallback(ev => {
        const code = ev.target
        dispatch({ type: 'ENTER', code});
    }, []);

    return [form, onKeyDownCode];
}