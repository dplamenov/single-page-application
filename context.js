export default function extend(context) {
    context.isLoggedIn = localStorage.getItem('user-token') !== null;
    context.email = (JSON.parse(localStorage.getItem('user')) || {}).username;
    context.userId = localStorage.getItem('user-id');

    return context.loadPartials({
        header: "../views/common/header.hbs",
        footer: "../views/common/footer.hbs"
    });
}