import extend from '../context.js';
import object from '../models/object.js';

export default {
    get: {
        home(context) {
            extend(context).then(function (x) {
                object.getAllObjectByOwner(context.userId).then(data => {
                    context.posts = data;
                    this.partial('../views/home/home.hbs');
                });
            });
        }
    }
};