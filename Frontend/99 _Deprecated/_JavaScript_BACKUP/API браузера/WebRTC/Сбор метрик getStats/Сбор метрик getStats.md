Метод `getStats` в WebRTC используется для получения статистики о соединении и потоках медиаданных. Этот метод возвращает объект, содержащий различные статистические данные, которые могут быть полезны для мониторинга и диагностики проблем с качеством соединения. Вот подробное описание полей, которые могут быть возвращены методом `getStats`:

## Основные поля
### [[candidate-pair]]

- **Описание**: Содержит статистику о паре кандидатов (локальный и удаленный), участвующих в соединении.
- **Поля**: `availableOutgoingBitrate`, `bytesReceived`, `bytesSent`, `currentRoundTripTime`, `lastPacketReceivedTimestamp`, `lastPacketSentTimestamp`, `nominated`, `priority`, `readable`, `selected`, `state`, `totalRoundTripTime`, `transportId`, `writable`.

### [[certificate]]

- **Описание**: Содержит статистику о сертификате, используемом для защиты соединения.
- **Поля**: `fingerprint`, `fingerprintAlgorithm`, `base64Certificate`, `issuerCertificateId`.

###  [[codec]]

- **Описание**: Содержит статистику о кодеке, используемом для кодирования и декодирования медиаданных.
- **Поля**: `payloadType`, `codecType`, `mimeType`, `clockRate`, `channels`, `sdpFmtpLine`.

### [[inbound-rtp]]

- **Описание**: Содержит статистику о входящих медиапотоках (RTP).
- **Поля**: `bytesReceived`, `packetsReceived`, `packetsLost`, `jitter`, `fractionLost`, `framesDecoded`, `framesPerSecond`, `qpSum`, `mediaType`, `codecId`, `transportId`, `remoteId`.

### [[local-candidate]]

- **Описание**: Содержит статистику о локальном кандидате (ICE).
- **Поля**: `id`, `timestamp`, `type`, `address`, `port`, `protocol`, `candidateType`, `priority`, `url`, `relayProtocol`, `deleted`.

### [[media-playout]]

- **Описание**: Содержит статистику о воспроизведении медиаданных на стороне клиента.
- **Поля**: `kind`, `synthesizedSamplesDuration`, `synthesizedSamplesEvents`, `totalPlayoutDelay`, `totalSamplesDuration`, `totalSamplesReceived`.

### [[media-source]]

- **Описание**: Содержит статистику о источнике медиаданных на стороне клиента.
- **Поля**: `kind`, `audioLevel`, `totalAudioEnergy`, `totalSamplesDuration`, `echoReturnLoss`, `echoReturnLossEnhancement`.

### [[outbound-rtp]]

- **Описание**: Содержит статистику о исходящих медиапотоках (RTP).
- **Поля**: `bytesSent`, `packetsSent`, `framesEncoded`, `framesPerSecond`, `qpSum`, `mediaType`, `codecId`, `transportId`, `remoteId`.

### [[peer-connection]]

- **Описание**: Содержит статистику о самом peer connection.
- **Поля**: `dataChannelsOpened`, `dataChannelsClosed`, `dataChannelsRequested`, `dataChannelsAccepted`.

### [[remote-candidate]]

- **Описание**: Содержит статистику о удаленном кандидате (ICE).
- **Поля**: `id`, `timestamp`, `type`, `address`, `port`, `protocol`, `candidateType`, `priority`, `url`.

### [[transport]]

- **Описание**: Содержит статистику о транспорте, используемом для передачи данных.
- **Поля**: `bytesSent`, `bytesReceived`, `dtlsState`, `selectedCandidatePairId`, `localCertificateId`, `remoteCertificateId`, `tlsVersion`, `dtlsCipher`, `srtpCipher`, `selectedCandidatePairChanges`.

## Пример getStats в формате json

```json
{
  "candidate-pair": {
    "availableOutgoingBitrate": 123456,
    "bytesReceived": 789012,
    "bytesSent": 345678,
    "currentRoundTripTime": 0.05,
    "lastPacketReceivedTimestamp": "2023-10-01T12:34:56.789Z",
    "lastPacketSentTimestamp": "2023-10-01T12:34:56.789Z",
    "nominated": true,
    "priority": 123456789,
    "readable": true,
    "selected": true,
    "state": "succeeded",
    "totalRoundTripTime": 0.5,
    "transportId": "transport-1",
    "writable": true
  },
  "certificate": {
    "fingerprint": "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD",
    "fingerprintAlgorithm": "sha-256",
    "base64Certificate": "MII...",
    "issuerCertificateId": "issuer-cert-1"
  },
  "codec": {
    "payloadType": 111,
    "codecType": "audio",
    "mimeType": "audio/opus",
    "clockRate": 48000,
    "channels": 2,
    "sdpFmtpLine": "minptime=10;useinbandfec=1"
  },
  "inbound-rtp": {
    "bytesReceived": 123456,
    "packetsReceived": 1234,
    "packetsLost": 5,
    "jitter": 0.02,
    "fractionLost": 0.004,
    "framesDecoded": 300,
    "framesPerSecond": 30,
    "qpSum": 1500,
    "mediaType": "video",
    "codecId": "codec-1",
    "transportId": "transport-1",
    "remoteId": "remote-1"
  },
  "local-candidate": {
    "id": "local-candidate-1",
    "timestamp": "2023-10-01T12:34:56.789Z",
    "type": "local-candidate",
    "address": "192.168.1.1",
    "port": 12345,
    "protocol": "udp",
    "candidateType": "host",
    "priority": 123456789,
    "url": "stun:stun.example.com",
    "relayProtocol": "udp",
    "deleted": false
  },
  "media-playout": {
    "kind": "audio",
    "synthesizedSamplesDuration": 0.5,
    "synthesizedSamplesEvents": 10,
    "totalPlayoutDelay": 0.05,
    "totalSamplesDuration": 10.0,
    "totalSamplesReceived": 48000
  },
  "media-source": {
    "kind": "video",
    "audioLevel": 0.75,
    "totalAudioEnergy": 0.9,
    "totalSamplesDuration": 10.0,
    "echoReturnLoss": 15.0,
    "echoReturnLossEnhancement": 20.0
  },
  "outbound-rtp": {
    "bytesSent": 123456,
    "packetsSent": 1234,
    "framesEncoded": 300,
    "framesPerSecond": 30,
    "qpSum": 1500,
    "mediaType": "video",
    "codecId": "codec-1",
    "transportId": "transport-1",
    "remoteId": "remote-1"
  },
  "peer-connection": {
    "dataChannelsOpened": 2,
    "dataChannelsClosed": 1,
    "dataChannelsRequested": 3,
    "dataChannelsAccepted": 2
  },
  "remote-candidate": {
    "id": "remote-candidate-1",
    "timestamp": "2023-10-01T12:34:56.789Z",
    "type": "remote-candidate",
    "address": "192.168.1.2",
    "port": 12346,
    "protocol": "udp",
    "candidateType": "host",
    "priority": 123456789,
    "url": "stun:stun.example.com"
  },
  "transport": {
    "bytesSent": 123456,
    "bytesReceived": 123456,
    "dtlsState": "connected",
    "selectedCandidatePairId": "candidate-pair-1",
    "localCertificateId": "local-cert-1",
    "remoteCertificateId": "remote-cert-1",
    "tlsVersion": "TLS 1.3",
    "dtlsCipher": "TLS_AES_128_GCM_SHA256",
    "srtpCipher": "AES_CM_128_HMAC_SHA1_80",
    "selectedCandidatePairChanges": 2
  }
}
```