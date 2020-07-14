import extend from '../context.js';

export default {
    get: {
        home(context){
            extend(context).then(function (x) {
                this.partial('../views/home/home.hbs');
            });
        }
    }
};