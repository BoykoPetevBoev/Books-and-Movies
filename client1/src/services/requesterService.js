
const defaultUrl = 'http://localhost:5000/'

const request = async (url, options) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const message = await response.json();
            throw new Error(message.message);
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err.message);
        return err.message;
    }
};

const getOptions = async (method = 'get', body) => {

    const options = {
        method,
        headers: {},
    };

    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }

    return options;
};

const get = async (path) => {
    const url = `${defaultUrl}${path}`
    const options = await getOptions('get');
    return await request(url, options);
}

const post = async (path, data) => {
    const url = `${defaultUrl}${path}`
    const options = await getOptions('post', data);
    return await request(url, options);
}

const put = async (path, data) => {
    const url = `${defaultUrl}${path}`
    const options = await getOptions('put', data);
    return await request(url, options);
}

const del = async (path) => {
    const url = `${defaultUrl}${path}`
    const options = await getOptions('delete');
    return await request(url, options);
}

export const api = {
    get,
    post,
    put,
    del
}

