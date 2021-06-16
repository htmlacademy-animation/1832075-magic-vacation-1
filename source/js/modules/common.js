export default () => {
    window.onload = function() {
        document.querySelector('html').classList.add('js-load');
        document.querySelector('.page-header__menu').querySelector('.js-menu-link').classList.add('active')
    }
};
