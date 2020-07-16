import extend from "../context.js";
import object from "../models/object.js";

export default {
    get: {
        create(context) {
            extend(context).then(function () {
                this.partial("../views/object/create.hbs");
            });
        },
        all(context) {
            context.data = [];
            extend(context).then(function () {
                object.getAll().then((data) => {
                    console.log(data);
                    data.forEach(singleObject => {
                        context.data.push(singleObject);
                    });

                    this.partial("../views/object/all.hbs");
                });
            });
        },

        details(context) {
            const {id} = context.params;

            extend(context).then(function () {
                object.getById(id).then(resultObject => {
                    context.data = resultObject;
                    context.isOwner = resultObject.ownerId === localStorage.getItem('user-id');

                    this.partial('../views/object/details.hbs');
                });
            });
        }
    },

    post: {
        create(context) {
            extend(context).then(function () {
                const data = {...context.params};
                object.create(data).then(function () {
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
                    context.redirect('#/object/all');
                });
            });
        }
    }

}