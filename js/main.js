const menuBtn = document.querySelector('.menu__btn');
const menu = document.querySelector('.menu__list');

menuBtn.addEventListener('click', (e) => {
    menu.classList.toggle('menu--active');
})