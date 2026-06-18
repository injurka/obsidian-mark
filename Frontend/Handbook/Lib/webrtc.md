---
title: WebRTC
tags:
  - webrtc
  - browser-api
  - p2p
  - realtime
---

## Что такое WebRTC

**WebRTC** (Web Real-Time Communication) — открытый стандарт и набор браузерных API для организации **peer-to-peer (P2P) коммуникации** прямо между браузерами: видео, аудио и произвольные данные передаются без прохождения через медиа-сервер.

Ключевые характеристики:
- **P2P-модель** — медиапоток идёт напрямую между клиентами, не через сервер
- **Встроено в браузер** — не требует плагинов; поддерживается Chrome, Firefox, Safari, Edge
- **Стандарт W3C + IETF** — `RTCPeerConnection`, `RTCDataChannel` и `getUserMedia` стандартизированы
- **Шифрование обязательно** — весь трафик шифруется через DTLS и SRTP

> **Важно:** Сервер всё равно нужен — но только для *signaling* (обмена метаданными о соединении). Медиа-данные при успешном P2P-соединении через сервер не проходят.

### Архитектурная схема

```
[Peer A] <------ P2P медиапоток (SRTP/DTLS) ------> [Peer B]
    |                                                    |
    +-------- Signaling Server (SDP/ICE обмен) ---------+
                   (WebSocket / HTTP / любой транспорт)
```

---

## Ключевые API

### RTCPeerConnection

Центральный API WebRTC. Управляет всем жизненным циклом P2P-соединения: установкой, поддержкой, завершением.

```javascript
const pc = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    // TURN-сервер при необходимости:
    // { urls: 'turn:turn.example.com', username: 'user', credential: 'pass' }
  ]
});

// Добавление локального медиапотока
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
stream.getTracks().forEach(track => pc.addTrack(track, stream));

// Обработка входящего потока от удалённого пира
pc.ontrack = (event) => {
  remoteVideo.srcObject = event.streams[0];
};

// ICE-кандидаты, собранные локально — нужно отправить удалённому пиру
pc.onicecandidate = (event) => {
  if (event.candidate) {
    signalingChannel.send({ type: 'ice-candidate', candidate: event.candidate });
  }
};
```

### MediaStream / getUserMedia

`navigator.mediaDevices.getUserMedia` запрашивает доступ к камере и/или микрофону и возвращает `MediaStream`.

```javascript
// Видео + аудио
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

// Только экран (screen sharing)
const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });

// Привязка потока к <video>-элементу
const videoEl = document.querySelector('#localVideo');
videoEl.srcObject = stream;
videoEl.play();
```

Объект `MediaStream` состоит из `MediaStreamTrack`-дорожек (аудио/видео), которые можно добавлять, заменять или удалять из `RTCPeerConnection` через `addTrack` / `replaceTrack` / `removeTrack`.

### RTCDataChannel

Канал для передачи **произвольных данных** (текст, `ArrayBuffer`, `Blob`) поверх того же P2P-соединения.

```javascript
// Инициатор создаёт канал
const dataChannel = pc.createDataChannel('chat', {
  ordered: true,       // гарантированный порядок (как TCP)
  // maxRetransmits: 0 // или ненадёжный режим (как UDP)
});

dataChannel.onopen = () => console.log('DataChannel открыт');
dataChannel.onmessage = (e) => console.log('Получено:', e.data);

// Ответчик получает канал через событие
pc.ondatachannel = (event) => {
  const channel = event.channel;
  channel.onmessage = (e) => console.log('Сообщение:', e.data);
};

// Отправка данных
dataChannel.send('Hello, peer!');
dataChannel.send(new Uint8Array([1, 2, 3]).buffer); // бинарные данные
```

---

## Установка соединения: Signaling, ICE, STUN/TURN

### Пошаговый процесс

Соединение между двумя пирами устанавливается в несколько этапов:

**1. Инициатор создаёт Offer (SDP)**
```javascript
const offer = await pc.createOffer();
await pc.setLocalDescription(offer);
// Отправляем offer удалённому пиру через signaling-сервер
signalingChannel.send({ type: 'offer', sdp: offer });
```

**2. Ответчик получает Offer, создаёт Answer**
```javascript
// Получаем offer от инициатора
await pc.setRemoteDescription(new RTCSessionDescription(offerSdp));
const answer = await pc.createAnswer();
await pc.setLocalDescription(answer);
// Отправляем answer обратно
signalingChannel.send({ type: 'answer', sdp: answer });
```

**3. Инициатор применяет Answer**
```javascript
await pc.setRemoteDescription(new RTCSessionDescription(answerSdp));
```

**4. Обмен ICE-кандидатами (параллельно шагам 1–3)**
```javascript
// На каждом пире: собранные кандидаты отправляются через signaling
pc.onicecandidate = ({ candidate }) => {
  if (candidate) signalingChannel.send({ type: 'ice-candidate', candidate });
};

// При получении кандидата от удалённого пира
signalingChannel.onmessage = async ({ data }) => {
  if (data.type === 'ice-candidate') {
    await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
};
```

**5. Соединение установлено**

Когда ICE-проверка проходит успешно, `pc.connectionState` становится `'connected'` и медиапоток начинает идти напрямую.

---

## SDP — Session Description Protocol

**SDP** — текстовый протокол-описание медиасессии. Определяет:
- Поддерживаемые кодеки (VP8, H.264, Opus и т.д.)
- Параметры медиадорожек (разрешение, битрейт)
- Сетевые адреса и порты
- Направление потока (`sendrecv`, `sendonly`, `recvonly`)

### Структура SDP-блока

```
v=0
o=- 4611731400430051336 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0 1
m=audio 9 UDP/TLS/RTP/SAVPF 111
a=rtpmap:111 opus/48000/2
a=fmtp:111 minptime=10;useinbandfec=1
m=video 9 UDP/TLS/RTP/SAVPF 96
a=rtpmap:96 VP8/90000
```

### Паттерн Offer/Answer

```
Peer A                    Peer B
  |--- createOffer() ------->|
  |   (SDP с возможностями)  |
  |<-- createAnswer() -------|
  |   (SDP с согласованием)  |
```

После обмена оба пира знают, какие кодеки использовать и на каких портах работать.

---

## ICE Candidates: STUN и TURN серверы

### ICE (Interactive Connectivity Establishment)

ICE — механизм поиска наилучшего сетевого пути между пирами. Браузер собирает несколько типов кандидатов:

| Тип кандидата | Описание |
|---|---|
| `host` | Локальный IP-адрес устройства |
| `srflx` (server reflexive) | Публичный IP, полученный через STUN |
| `relay` | IP TURN-сервера (резервный вариант) |

### STUN-сервер

**STUN** (Session Traversal Utilities for NAT) — помогает пиру узнать свой публичный IP и порт за NAT.

```javascript
const pc = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
});
```

STUN — лёгкий, бесплатно доступны публичные серверы Google. Работает в ~80% случаев.

### TURN-сервер

**TURN** (Traversal Using Relays around NAT) — ретранслятор трафика, когда прямое P2P-соединение невозможно (симметричный NAT, корпоративный файрвол).

```javascript
const pc = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    {
      urls: 'turn:turn.example.com:3478',
      username: 'myuser',
      credential: 'mypassword'
    }
  ]
});
```

> **TURN требует ресурсов** — весь медиатрафик проходит через TURN-сервер, поэтому он платный и требует правильного масштабирования. Популярные реализации: **coturn**, **Xirsys**.

---

## Пример: P2P видеозвонок (loopback)

Полный пример двух пиров на одной странице без signaling-сервера — для понимания механики.

```html
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>WebRTC Loopback Demo</title>
  <style>
    video { width: 320px; height: 240px; background: #222; }
  </style>
</head>
<body>
  <video id="localVideo" autoplay muted playsinline></video>
  <video id="remoteVideo" autoplay playsinline></video>
  <br>
  <button id="startBtn">Начать звонок</button>

  <script>
    const localVideo  = document.getElementById('localVideo');
    const remoteVideo = document.getElementById('remoteVideo');
    const startBtn    = document.getElementById('startBtn');

    let localStream, pcCaller, pcCallee;

    startBtn.onclick = async () => {
      startBtn.disabled = true;

      // 1. Получаем локальный поток
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      localVideo.srcObject = localStream;

      // 2. Создаём два RTCPeerConnection (имитация двух пиров)
      const iceConfig = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
      pcCaller = new RTCPeerConnection(iceConfig);
      pcCallee = new RTCPeerConnection(iceConfig);

      // 3. ICE-кандидаты: каждый пир передаёт кандидаты напрямую другому
      pcCaller.onicecandidate = ({ candidate }) => {
        if (candidate) pcCallee.addIceCandidate(candidate);
      };
      pcCallee.onicecandidate = ({ candidate }) => {
        if (candidate) pcCaller.addIceCandidate(candidate);
      };

      // 4. Callee получает входящий трек
      pcCallee.ontrack = ({ streams }) => {
        remoteVideo.srcObject = streams[0];
      };

      // 5. Caller добавляет треки из локального потока
      localStream.getTracks().forEach(track => pcCaller.addTrack(track, localStream));

      // 6. Offer -> Answer обмен (локально, без сети)
      const offer = await pcCaller.createOffer();
      await pcCaller.setLocalDescription(offer);
      await pcCallee.setRemoteDescription(offer);

      const answer = await pcCallee.createAnswer();
      await pcCallee.setLocalDescription(answer);
      await pcCaller.setRemoteDescription(answer);

      // Соединение установлено — remoteVideo покажет локальную камеру через P2P
    };
  </script>
</body>
</html>
```

В реальном приложении шаг 6 (обмен SDP) происходит через WebSocket-сервер, а ICE-кандидаты тоже передаются через него.

---

## RTCDataChannel: передача данных

`RTCDataChannel` работает поверх SCTP через DTLS и позволяет передавать любые данные без медиапотоков.

### Надёжный режим (ordered, like TCP)

```javascript
// Peer A — инициатор
const channel = pcA.createDataChannel('file-transfer', { ordered: true });

channel.onopen = () => {
  // Отправка текста
  channel.send(JSON.stringify({ type: 'hello', from: 'peerA' }));

  // Отправка файла кусками
  const CHUNK_SIZE = 16384; // 16 KB
  async function sendFile(file) {
    const buffer = await file.arrayBuffer();
    for (let offset = 0; offset < buffer.byteLength; offset += CHUNK_SIZE) {
      channel.send(buffer.slice(offset, offset + CHUNK_SIZE));
      // Ждём, пока буфер освободится
      if (channel.bufferedAmount > CHUNK_SIZE * 8) {
        await new Promise(r => { channel.onbufferedamountlow = r; });
      }
    }
    channel.send(JSON.stringify({ type: 'done' }));
  }
};

// Peer B — получатель
pcB.ondatachannel = ({ channel }) => {
  const chunks = [];
  channel.onmessage = ({ data }) => {
    if (typeof data === 'string') {
      const msg = JSON.parse(data);
      if (msg.type === 'done') {
        const blob = new Blob(chunks);
        const url = URL.createObjectURL(blob);
        console.log('Файл получен:', url);
      }
    } else {
      chunks.push(data); // ArrayBuffer-чанк
    }
  };
};
```

### Ненадёжный режим (unordered, like UDP)

```javascript
// Для игровых состояний, телеметрии — где важна скорость, не доставка
const unreliableChannel = pc.createDataChannel('game-state', {
  ordered: false,
  maxRetransmits: 0  // не повторять при потере
});
```

### Состояния канала

```javascript
channel.readyState; // 'connecting' | 'open' | 'closing' | 'closed'

channel.onopen  = () => console.log('Канал открыт');
channel.onclose = () => console.log('Канал закрыт');
channel.onerror = (e) => console.error('Ошибка канала:', e);
```

---

## Ограничения и подводные камни

### NAT Traversal

- **Симметричный NAT** (~15–20% сетей) блокирует P2P — тогда STUN не помогает и нужен TURN
- TURN-сервер — бутылочное горлышко: стоит денег и требует инфраструктуры
- Мобильные сети (4G/5G CGNAT) всё чаще используют многоуровневый NAT

### Signaling-сервер обязателен

WebRTC не определяет протокол сигнализации — это сознательное решение стандарта. На практике используют:

| Вариант | Описание |
|---|---|
| **WebSocket** | Самый распространённый — двусторонний канал |
| **HTTP long-polling** | Запасной вариант |
| **Firebase / Supabase Realtime** | BaaS для быстрого прототипа |
| **Socket.io** | Абстракция над WebSocket |

### Совместимость браузеров

- **Safari** — поддерживает WebRTC, но с отставанием в фичах; `RTCDataChannel` в Safari имеет ограничения
- **Safari iOS** требует `playsinline` на `<video>` и пользовательского жеста для автовоспроизведения
- Prefixed-версии (`webkit`-) давно устарели, но могут встречаться в старых кодовых базах

### Производительность и масштабирование

- **Mesh-топология** (каждый со всеми) плохо масштабируется: N участников = N×(N-1)/2 соединений
- Для конференций используют **SFU** (Selective Forwarding Unit, например mediasoup, Janus) — сервер пересылает потоки без декодирования
- **MCU** (Multipoint Control Unit) — сервер микширует потоки на сервере; проще для клиента, дороже серверно

### Безопасность

- WebRTC работает **только через HTTPS** (или localhost) — `getUserMedia` недоступен на HTTP
- Весь медиатрафик шифруется обязательно (SRTP + DTLS) — нельзя отключить
- Утечка IP через WebRTC: браузер может раскрыть реальный IP даже за VPN — это известная проблема приватности

### Отладка

```javascript
// Детальная статистика соединения
const stats = await pc.getStats();
stats.forEach(report => {
  if (report.type === 'candidate-pair' && report.state === 'succeeded') {
    console.log('Активная пара ICE:', report);
  }
  if (report.type === 'inbound-rtp') {
    console.log('Входящий RTP:', report.packetsLost, 'потерь');
  }
});
```

Также доступен встроенный отладчик в браузере: `chrome://webrtc-internals` (Chrome) и `about:webrtc` (Firefox).

## Источники

- [WebRTC API — MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API)
- [WebRTC для начинающих — web.dev](https://web.dev/articles/webrtc-basics)
- [RFC 8825 — Overview: Real-Time Protocols for Browser-Based Applications](https://datatracker.ietf.org/doc/html/rfc8825)
- [WebRTC samples — GitHub](https://github.com/webrtc/samples)
- [coturn — TURN/STUN сервер](https://github.com/coturn/coturn)