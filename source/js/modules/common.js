export default () => {
    window.onload = function() {
        document.querySelector('html').classList.add('js-load');
        if (document.location.hash != undefined && document.querySelector('.js-menu-link[href*="' + document.location.hash + '"]') != null) {
            document.querySelector('.js-menu-link[href*="' + document.location.hash + '"]').classList.add('active');
        } else {
            document.querySelector('.page-header__menu').querySelector('.js-menu-link').classList.add('active');
        }
    }
};

export function storyClearBody() {
    document.body.classList.remove('body__purple', 'body__blue', 'body__lightblue', 'body__durkpurple');
}