import AxoisApiConfig from './AxiosApiConfig';

export default {
    postEnrollKindergarten(data) {
        return AxoisApiConfig({
            url: '/kindergartens/enroll-kindergarten',
            method: 'post',
            data: data
        })
    },

    getKindergartenInfo(data) {
        return AxoisApiConfig({
            url: '/kindergartens/get-info',
            method: 'post',
            data: data
        })
    }
}