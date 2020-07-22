import controllers from './controllers/index.js';

const app = new Sammy('#root', function () {
    //set view engine
    this.use('Handlebars', 'hbs');

    //home
    this.get('#/home', controllers.home.get.home);

    //user service
    this.get('#/register', controllers.user.get.register);
    this.post('#/register', controllers.user.post.register.bind(controllers.user.post));
    this.get('#/login', controllers.user.get.login);
    this.post('#/login', controllers.user.post.login);
    this.get('#/logout', controllers.user.get.logout);

    this.get('#/object/create', controllers.object.get.create); // show create form for new object
    this.post('#/object/create', controllers.object.post.create); // store newly created object

    this.get('#/object/all',  controllers.object.get.all); // list all object
    this.get('#/object/details/:id', controllers.object.get.details); // get specific object
    this.get('#/object/update/:id', controllers.object.get.edit); // show update form for specific object
    this.post('#/object/update/:id', controllers.object.put.update); // store newly created specific object
    this.get('#/object/delete/:id', controllers.object.delete.delete); // delete object by id

    this.get('#/object/:id/ticket', controllers.object.put.ticketBuy);
    this.get('#/user/object', controllers.object.get.objectsByUsers);

});


(function () {
    app.run('#/home');
})();