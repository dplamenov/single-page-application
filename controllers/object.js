import extend from "../context.js";
import object from "../models/object.js";
import * as notify from "../notify.js";

export default {
    get: {
        create(context) { //show create form
            extend(context).then(function () {
                this.partial("../views/object/create.hbs");
            });
        },
        all(context) {
            context.data = [];
            notify.showLoading();
            extend(context).then(function () {
                object.getAll().then((data) => {
                    data.forEach(singleObject => {
                        context.data.push(singleObject);
                    });

                    context.data.sort((a, b) => {
                        return Number(b.tickets) - Number(a.tickets);
                    });

                    if (context.params.hasOwnProperty('search')) {
                        const q = context.params.search.toLowerCase();
                        context.data = context.data.filter(e => e.genres.includes(q));
                    }

                    notify.hideLoading();
                    this.partial("../views/object/allMovies.hbs");
                });
            });
        },

        edit(context) {
            const {id} = context.params;

            extend(context).then(function () {
                notify.showLoading();
                object.getById(id).then(resultObject => {
                    context.data = resultObject;
                    context.isOwner = resultObject.ownerId === localStorage.getItem('user-id');

                    object.getAllObjectByOwner(context.userId).then(data => {
                        context.posts = data;
                        notify.hideLoading();
                        this.partial('../views/object/edit.hbs');
                    });
                });
            });

        },
        details(context) {
            const {id} = context.params;

            extend(context).then(function () {
                notify.showLoading();
                object.getById(id).then(resultObject => {
                    context.data = resultObject;

                    notify.hideLoading();
                    this.partial('../views/object/details.hbs');
                });
            });
        },
        objectsByUsers(context) {
            extend(context).then(function () {
                notify.showLoading();
                const userId = sessionStorage.getItem('user-id');

                object.getAllObjectByOwner(userId).then((data) => {
                    context.data = data;
                    notify.hideLoading();
                    this.partial('../views/object/myMovies.hbs');
                });
            });
        }
    },

    post: {
        create(context) {
            extend(context).then(function () {
                const data = {...context.params};

                data.genres = JSON.stringify(data.genres.split(' '));
                data.tickets = Number(data.tickets);
                object.create(data).then(function () {
                    notify.showInfo('Movie created successfully.');
                    context.redirect('#/home');
                });
            });
        }
    },

    delete: {
        delete(context) {
            extend(context).then(function () {
                const {id} = context.params;
                object.delete(id).then(() => {
                    notify.showInfo('Movie removed successfully!');
                    context.redirect('#/home');
                });
            });
        }
    },

    put: {
        update(context) {
            extend(context).then(function () {
                const {id} = context.params;
                const data = {...context.params};
                delete data.id;

                data.tickets = Number(data.tickets);

                object.updatePartially(id, data)
                    .then(() => {
                        notify.showInfo('Movie updated successfully.');
                        context.redirect('#/home');
                    });
            });
        },

        ticketBuy(context) {
            extend(context).then(function () {
                const {id} = context.params;

                object.getById(id).then(obj => {
                    object.updatePartially(id, {tickets: obj.tickets - 1}).then(function () {
                        context.redirect('#/object/all');
                    });
                });
            });
        }
    }
}