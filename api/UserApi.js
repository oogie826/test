import AxoisApiConfig from './AxiosApiConfig';

export default {
    Login(data) {
        return AxoisApiConfig({
            url: '/users/login',
            method: 'post',
            data: data
        })
    },

    Login(data) {
        return AxoisApiConfig({
            url: '/users/signup',
            method: 'post',
            data: data
        })
    },
}