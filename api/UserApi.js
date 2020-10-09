import AxoisApiConfig from './AxiosApiConfig';

export default {
    login(data) {
        return AxoisApiConfig({
            url: '/users/login',
            method: 'post',
            data: data
        })
    },

    signUp(data) {
        return AxoisApiConfig({
            url: '/users/signup',
            method: 'post',
            data: data
        })
    },

    enrollUserChild(data) {
        return AxoisApiConfig({
            url: '/users/enroll-child',
            method: 'post',
            data: data
        })
    },
}