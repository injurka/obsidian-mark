SDP (Session Description Protocol) пакет формируется в браузере, инициирующем соединение в процессе установки `WebRTC` соединения. Этот пакет содержит всю необходимую информацию о параметрах соединения, включая типы медиа, кодеки, параметры и другие детали, необходимые для успешного установления соединения. Давайте подробно рассмотрим процесс формирования `SDP` пакета:

## 1. Инициализация WebRTC сессии

Когда пользователь инициирует `WebRTC` сессию (например, нажимая кнопку "Call" в веб-приложении), браузер начинает процесс установки соединения.

```ts
const peerConnection = new RTCPeerConnection();
```

## 2. Создание Offer или Answer

Браузер создаёт `SDP` офер (*offer*) или ответ (*answer*) в зависимости от роли в сессии:

- **Offer**: Создаётся инициатором соединения.
- **Answer**: Создаётся принимающей стороной в ответ на полученный offer.

#### Создание Offer

```ts
async function createOffer() {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer); // 3 пункт
    
    // Отправка offer на сигнальный сервер
    sendOfferToSignalServer(offer);
}
```

#### Создание Answer

```ts
async function createAnswer(offer: RTCSessionDescriptionInit) {
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    // Отправка answer на сигнальный сервер
    sendAnswerToSignalServer(answer);
}
```

## 3. Установка локальной описания сессии

Браузер устанавливает локальное описание сессии, вызывая метод `setLocalDescription` на объекте **RTCPeerConnection**.

```ts
await peerConnection.setLocalDescription(offer);
```

## 4. Формирование SDP

`SDP` пакет формируется на основе следующих параметров:

- **Типы медиа (Media Types)**: Видео, аудио, данные.
- **Кодеки (Codecs)**: Например, VP8 для видео, Opus для аудио.
- **Параметры медиапотоков (Media Stream Parameters)**: Разрешение видео, битрейт, частота кадров и т.д.
- **ICE Candidates (Interactive Connectivity Establishment)**: Информация о возможных путях соединения (IP адреса, порты, протоколы).
- **SRTP (Secure Real-time Transport Protocol)**: Параметры безопасности для защиты медиапотоков.
- **DTLS (Datagram Transport Layer Security)**: Параметры безопасности для защиты управляющих сообщений.

## 5. Структура SDP

`SDP` пакет имеет текстовый формат и состоит из нескольких строк, каждая из которых начинается с однобуквенного идентификатора (атрибута) и значения. Например:

- `v=0`: Версия SDP.
- `o=- 1234567890 1 IN IP4 127.0.0.1`: Идентификатор сессии и адрес.
- `s=-`: Название сессии.
- `t=0 0`: Время начала и окончания сессии.
- `m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126`: Описание медиапотока (аудио).
- `a=rtpmap:111 opus/48000/2`: Кодек Opus с частотой дискретизации 48000 Гц и двумя каналами.

## 6. Передача SDP

Сформированный `SDP` пакет передаётся другой стороне через сигнальный сервер, который может использовать `WebSocket` или другой протокол для передачи сообщений.
#### Отправка Offer на сигнальный сервер

```ts
function sendOfferToSignalServer(offer: RTCSessionDescriptionInit) {
    // Предположим, что у нас есть функция 
    // для отправки данных на сигнальный сервер
    signalServer.send({ type: 'offer', sdp: offer.sdp });
}
```

#### Отправка Answer на сигнальный сервер

```ts
function sendAnswerToSignalServer(answer: RTCSessionDescriptionInit) {
    signalServer.send({ type: 'answer', sdp: answer.sdp });
}
```

## 7. Установка удаленного описания сессии

Принимающая сторона устанавливает полученный `SDP` пакет как удаленное описание сессии, вызывая метод `setRemoteDescription` на объекте **RTCPeerConnection**.

```ts
async function setRemoteDescription(description: RTCSessionDescriptionInit) {
    await peerConnection.setRemoteDescription(
	    new RTCSessionDescription(description)
	);
}
```

## 8. Генерация и передача Answer

Если принимающая сторона создаёт `SDP` ответ (answer), она также устанавливает его как локальное описание сессии и передаёт обратно инициатору соединения.

```ts
async function handleOffer(offer) {
    await setRemoteDescription(offer);
    await createAnswer(offer);
}
```

## 9. Завершение установки соединения

После обмена `SDP` пакетами обе стороны имеют минимальное представление друг о друге и могут продолжить процесс установки соединения, включая обмен ICE кандидатами и установку безопасных соединений через DTLS и SRTP.

```ts
peerConnection.onicecandidate = event => {
    if (event.candidate) {
        // Отправка ICE кандидата на сигнальный сервер
        signalServer.send({ 
	        type: 'candidate', 
	        candidate: event.candidate 
		});
    }
};

// При получении ICE кандидата от другой стороны
function handleCandidate(candidate) {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
}
```

Таким образом, формирование `SDP` пакета является ключевым этапом в процессе установки WebRTC соединения, обеспечивая передачу всей необходимой информации для успешного соединения между участниками сессии.

## Полный пример

```ts
const peerConnection = new RTCPeerConnection();

async function createOffer() {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    sendOfferToSignalServer(offer);
}

async function createAnswer(offer) {
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    sendAnswerToSignalServer(answer);
}

function sendOfferToSignalServer(offer) {
    signalServer.send({ type: 'offer', sdp: offer.sdp });
}

function sendAnswerToSignalServer(answer) {
    signalServer.send({ type: 'answer', sdp: answer.sdp });
}

async function setRemoteDescription(description) {
    await peerConnection.setRemoteDescription(
	    new RTCSessionDescription(description)
	);
}

async function handleOffer(offer) {
    await setRemoteDescription(offer);
    await createAnswer(offer);
}

peerConnection.onicecandidate = event => {
    if (event.candidate) {
        signalServer.send({ 
	        type: 'candidate', 
	        candidate: event.candidate 
		});
    }
};

function handleCandidate(candidate) {
    peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
}
```