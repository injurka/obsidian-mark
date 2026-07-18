# WebRTC (Web Real-Time Communication)

WebRTC — это технология, позволяющая устанавливать P2P (Peer-to-Peer) соединения между браузерами для передачи видео, аудио и произвольных бинарных данных (Data Channels) с минимальной задержкой.

Боль, которую мы решаем: классические HTTP-запросы (даже WebSockets) идут через сервер (брокер/релей). Для стриминга 4K-видео или игр задержка (latency) и пропускная способность сервера становятся бутылочным горлышком. WebRTC позволяет браузерам "договориться" и слать пакеты (UDP) напрямую друг другу, минуя ваши дорогостоящие сервера.

```mermaid
sequenceDiagram
    participant PeerA
    participant SignalingServer as Signaling Server (WebSocket)
    participant STUN as STUN/TURN Server
    participant PeerB
    
    PeerA->>STUN: What is my public IP?
    STUN-->>PeerA: 203.0.113.1
    PeerB->>STUN: What is my public IP?
    STUN-->>PeerB: 198.51.100.2
    
    PeerA->>SignalingServer: Send Offer (SDP) to PeerB
    SignalingServer->>PeerB: Offer from PeerA
    PeerB->>SignalingServer: Send Answer (SDP) to PeerA
    SignalingServer->>PeerA: Answer from PeerB
    
    Note over PeerA,PeerB: P2P соединение установлено (UDP)
    PeerA<-->>PeerB: Видео / Аудио / Данные
```

### Как это работает на практике
Чтобы два браузера соединились напрямую, им нужно узнать публичные IP-адреса друг друга. Для этого нужен **Signaling Server** (обычный сервер на WebSocket), через который клиенты обмениваются метаданными (SDP). Также нужны **STUN/TURN** серверы для обхода NAT (NAT Traversal). После успешного "рукопожатия" сигнальный сервер больше не нужен — трафик идет P2P.

### Пример кода (Базовая концепция)
```javascript
// 1. Создаем P2P соединение
const peerConnection = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
});

// 2. Получаем доступ к камере/микрофону
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

// 3. Обработка ICE кандидатов (передаем через Signaling Server)
peerConnection.onicecandidate = (event) => {
  if (event.candidate) {
    signalingServer.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
  }
};

// 4. Получение удаленного стрима
peerConnection.ontrack = (event) => {
  remoteVideoElement.srcObject = event.streams[0];
};
```

### Неочевидные нюансы и границы применимости
1. **TURN-сервера**: Если клиенты сидят за жесткими корпоративными фаерволами (Symmetric NAT), прямое соединение невозможно. Весь трафик придется пускать через TURN-сервер (релей), что убивает идею "бесплатного" P2P и нагружает ваши сервера.
2. **Ограничения P2P в группах**: WebRTC плохо масштабируется для видеоконференций на 100 человек. При P2P (Mesh-сеть) каждому участнику придется отправлять 99 видеопотоков. В таких случаях используют SFU (Selective Forwarding Unit) сервера (например, mediasoup, Janus), которые принимают один поток от клиента и раздают его остальным.
3. **DataChannels для игр**: WebRTC DataChannels — это единственный способ получить UDP-подобную передачу данных в браузере (ненадежную, но очень быструю). Идеально для мультиплеерных игр.
