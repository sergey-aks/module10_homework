/*
***
Модуль 10. API браузера.Задание 3
 
1. Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат

2. Добавить в чат механизм отправки гео-локации
При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить.
*/

const wssUrl = "wss://echo-ws-service.herokuapp.com";

const buttonSend = document.getElementById("send");
const buttonLocation = document.getElementById("geo");
const chatBody = document.getElementById("chatBody");
const chatInput = document.getElementById("chatInput");
const error = document.getElementById("error");

//Добавление сообщений в чат
function addMessage(message, messageStatus) {
    let messageWrap = document.createElement("div");
    messageWrap.classList.add("message-wrapper");
    let messageContent = document.createElement("div");
    messageContent.classList.add("message");
    if (messageStatus === "send") {
        messageWrap.classList.add("client-message");
    } else if (messageStatus === "receive") {
        messageWrap.classList.add("server-message");
    }
    messageContent.innerHTML = message;
    messageWrap.appendChild(messageContent);
    chatBody.appendChild(messageWrap);
};

//Кнопка отправить
buttonSend.addEventListener("click", (event) => {
    event.preventDefault();
    error.innerText = "";
    if (!chatInput.value) return (error.innerText = "Вы не ввели сообщение");
    const webSocket = new WebSocket(wssUrl);
    webSocket.addEventListener("open", (event) => {
        webSocket.send(chatInput.value);
        addMessage(chatInput.value, "send");
    });
    webSocket.addEventListener("message", (event) => {
        addMessage(event.data, "receive");
    });
});

//Кнопка гео-локация
buttonLocation.addEventListener("click", (event) => {
    event.preventDefault();
    error.innerText = "";
    
    if (!navigator.geolocation) return (error.innerText = "Геолокация не поддерживается вашим браузером");
    
    // Получаем координаты
    const successGeo = (position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let geoMessage = `<a href="https://www.openstreetmap.org/#map=16/${latitude}/${longitude}" target="_blank">Гео-локация</a>`;

        const webSocket = new WebSocket(wssUrl);
        webSocket.addEventListener("open", (event) => {
            webSocket.send(geoMessage);
            addMessage(geoMessage, "send");
        });
    };

    // Вывод ошибки
    const errorGeo = () => {
        error.innerText = 'Невозможно получить ваше местоположение';
    };

    navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
});


