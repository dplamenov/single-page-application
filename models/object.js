const backendlessUrl = (function (applicationId, restApiKey, tableName) {
    return `https://api.backendless.com/${applicationId}/${restApiKey}/data/${tableName}`;
})('B4A5D2C9-54C2-D965-FF4D-2E1C86495E00', 'C549A5F2-6C9E-4B0A-B6BC-1046C434D8BF', 'foods');

const userToken = localStorage.getItem('user-token');
export default {
    create(object) {
        console.log(userToken);
        return fetch(backendlessUrl, {
            method: 'post', headers: { 'Content-type': 'application/json', 'user-token': userToken }, body: JSON.stringify(object)
        }).
        then(response => response.json());
    },

    getAll() {
        return fetch(backendlessUrl).then(response => response.json());
    },

    getById(id) {
        return fetch(`${backendlessUrl}/${id}`).then(response => response.json());
    },

    delete(id) {
        return fetch(`${backendlessUrl}/${id}`, { method: 'delete' }).then(response => response.json());
    },

    updatePartially(id, data) {
        return fetch(`${backendlessUrl}/${id}`, {
            method: 'put',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
};