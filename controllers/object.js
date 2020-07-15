import extend from "../context.js";
import object from "../models/object.js";

export default {
    get: {
        create(context){
            extend(context).then(function () {
                this.partial("../views/object/create.hbs");
            });
        }
    }
}