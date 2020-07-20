const backendlessUrl = (function (applicationId, restApiKey) {
    return `https://api.backendless.com/${applicationId}/${restApiKey}/users`;
})('B4A5D2C9-54C2-D965-FF4D-2E1C86495E00', 'C549A5F2-6C9E-4B0A-B6BC-1046C434D8BF');
console.log(backendlessUrl);
export default {
    register(username, password) {
        console.log(username);
        return fetch(`${backendlessUrl}/register`, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({username, password})
        })
            .then(response => response.json());
    },
    login(username, password) {
        return fetch(`${backendlessUrl}/login`, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({login: username, password})
        })
            .then(response => response.json())

    },
    logout(userToken) {
        return fetch(`${backendlessUrl}/logout`, {headers: {'user-token': userToken}});
    }
}