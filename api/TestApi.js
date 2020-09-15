import AxoisApiConfig from './AxiosApiConfig';

export default {
    InputTestData(data) {
        return AxoisApiConfig({
            url: '/kindergartens/input_data',
            method: 'post',
            data: data
        })
    },
}