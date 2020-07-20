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
                const token = sessionStorage.getItem('user-token');
                user.logout(token).then((response) => {
                    sessionStorage.clear();
                    context.redirect('#/home');
                });
            });
        }
    },

    post: {
        register(context) {
            const data = {...context.params};

            console.log(context.params);

            const username = data.username;
            const password = data.password;
            const rePassword = data.repeatPassword;

            if(password !== rePassword){
                return;
            }

            user.register(username, password).then((response) => {
                console.log(this);
                this.login(context);
                // context.redirect('#/home');
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
                    sessionStorage.setItem('user-token', response['user-token']);
                    sessionStorage.setItem('user', JSON.stringify(response));
                    sessionStorage.setItem('user-id', response.objectId);
                    context.redirect('#/home');
                }).catch(error => {
                console.error(error);
            });
        }
    }
};