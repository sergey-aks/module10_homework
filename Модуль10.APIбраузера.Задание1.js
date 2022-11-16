/*
***
Модуль 10. API браузера.Задание 1
 
Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео). При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.
*/

const changeIconButton = document.getElementById('butt');
const icons = document.getElementsByClassName("icon");

changeIconButton.addEventListener('click', () => {
    for (let i = 0; i < icons.length; i++) {
        icons[i].classList.toggle("active");
    };
})