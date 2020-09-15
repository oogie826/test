import AxoisApiConfig from './AxiosApiConfig';

export default {
    EstimateKindergarten(data) {
        return AxoisApiConfig({
            url: '/kindergarten/estimate/:kindergarten_name',
            method: 'post',
            data: data
        })
    },

    GetKindergartenInfo() {
        return AxoisApiConfig({
            url: '/kindergarten/estimate/:kindergarten_name',
            method: 'get',
        })
    }
}