// API calls
export const getDummyDetails = () => {
    const timeout = 1500;

    return new Promise(resolve => setTimeout(resolve({
        data: {
            'data': {},
            'message': 'Details Fetched Successfully.',
            'code': 200,
            'success': true,
            'error': [],
        },
    }), timeout));
};
