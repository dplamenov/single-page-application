export default function extend(context) {
    context.isLoggedIn = sessionStorage.getItem('user-token') !== null;
    context.username = (JSON.parse(sessionStorage.getItem('user')) || {}).username;
    context.userId = sessionStorage.getItem('user-id');

    return context.loadPartials({
        header: "../views/common/header.hbs",
        footer: "../views/common/footer.hbs"
    });
}