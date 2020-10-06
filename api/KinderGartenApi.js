import AxoisApiConfig from './AxiosApiConfig';

export default {
    postEnrollKindergarten(data) {
        return AxoisApiConfig({
            url: '/kindergartens/enroll-kindergarten',
            method: 'post',
            data: data
        })
    },

    getKindergartenInfo(params) {
        return AxoisApiConfig({
            url: `/kindergartens/get-info/${params}`,
            method: 'get',
        })
    },

    getKindergartenInfoByUsername(params) {
        return AxoisApiConfig({
            url: `/kindergartens/get-info/username/${params}`,
            method: 'get',
        })
    },
    
    postKindergartenReview(data) {
        return AxoisApiConfig({
            url: '/kindergartens/enroll-review',
            method: 'post',
            data: data
        })
    }
}