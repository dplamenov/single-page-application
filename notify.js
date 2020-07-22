const infoNotification = document.querySelector('#infoBox');
const loadingNotification = document.querySelector('#loadingBox');
const errorNotification = document.querySelector('#errorBox');

infoNotification.addEventListener('click', hideNotification.bind(infoNotification));
errorNotification.addEventListener('click', hideNotification.bind(infoNotification));

export function showInfo(msg) {
    infoNotification.children[0].textContent = msg;
    infoNotification.style.display = 'block';

    setTimeout(hideNotification.bind(infoNotification), 3000);
}


export function showError(msg) {
    errorNotification.children[0].textContent = msg;
    errorNotification.style.display = 'block';
}

let loadingCounter = 0;

export function showLoading() {
    loadingCounter++;
    loadingNotification.style.display = 'block';
}

export function hideLoading() {
    loadingCounter--;
    loadingNotification.style.display = 'none';
}


function hideNotification() {
    // console.log(this);
    this.style.display = 'none';
}
