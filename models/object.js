const backendlessUrl = (function (applicationId, restApiKey, tableName) {
    return `https://api.backendless.com/${applicationId}/${restApiKey}/data/${tableName}`;
})('B4A5D2C9-54C2-D965-FF4D-2E1C86495E00', '86D1644C-D1E2-441A-93B8-160A31079163', 'movies');

export default {
    create(object) {
        const userToken = sessionStorage.getItem('user-token');
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
    },

    //get all posts in collection and return filtered by owner
    getAllObjectByOwner(ownerId){
        const array = [];
        return this.getAll().then(function (data) {
            data.forEach(obj => {
                if(obj.ownerId === ownerId){
                    array.push(obj);
                }
            });

            console.log(data);
            console.log(array);
            return Promise.resolve(array);
        });
    }
};