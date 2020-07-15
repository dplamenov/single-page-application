import user from '../models/user.js';
import extend from "../context.js";

export default {
    get: {
        register(context) {
            extend(context).then(function () {
                this.partial('../views/user/register.hbs');
            });
        },
        login(context) {
            extend(context).then(function () {
                this.partial('../views/user/login.hbs');
            });
        },
        logout(context) {
            extend(context).then(function () {
                const token = localStorage.getItem('user-token');
                user.logout(token).then((response) => {
                    localStorage.clear();
                    context.redirect('#/home');
                });
            });
        }
    },

    post: {
        register(context) {
            const data = {...context.params};

            const username = data.username;
            const password = data.password;
            const rePassword = data.rePassword;

            if(password !== rePassword){
                return;
            }

            user.register(username, password).then((response) => {
                context.redirect('#/user/login');
            });
        },
        login(context) {
            const data = {...context.params};
            const username = data.username;
            const password = data.password;

            user.login(username, password)
                .then(response => {
                    if (response.hasOwnProperty('errorData')) {
                        throw new Error(response.message);
                    }

                    return response;
                })
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('user-token', response['user-token']);
                    localStorage.setItem('user', JSON.stringify(response));
                    localStorage.setItem('user-id', response.objectId);
                    context.redirect('#/home');
                }).catch(error => {
                console.error(error);
            });
        }
    }
};