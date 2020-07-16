import controllers from './controllers/index.js';

const app = new Sammy('#root', function () {
    //set view engine
    this.use('Handlebars', 'hbs');

    //home
    this.get('#/home', controllers.home.get.home);

    //user
    this.get('#/user/register', controllers.user.get.register);
    this.post('#/user/register', controllers.user.post.register);
    this.get('#/user/login', controllers.user.get.login);
    this.post('#/user/login', controllers.user.post.login);
    this.get('#/user/logout', controllers.user.get.logout);

    this.get('#/object/create', controllers.object.get.create);
    this.post('#/object/create', controllers.object.post.create);

    this.get('#/object/all',  controllers.object.get.all);
    this.get('#/object/details/:id', controllers.object.get.details);

});


(function () {
    app.run('#/home');
})();