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

});


(function () {
    app.run('#/home');
})();