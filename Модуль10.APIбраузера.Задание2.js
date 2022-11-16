/*
***
Модуль 10. API браузера.Задание 2
 
Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 
*/

const screenSizeButton = document.getElementById('screenSize');

screenSizeButton.addEventListener('click', () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    window.alert(`ширина экрана: ${screenWidth}, высота экрана: ${screenHeight}`);
})