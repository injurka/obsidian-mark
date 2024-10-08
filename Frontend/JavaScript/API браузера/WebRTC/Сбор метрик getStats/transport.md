## Описание: 

Содержит статистику о транспорте, используемом для передачи данных. Эти данные помогают оценить состояние и безопасность транспортного уровня WebRTC-соединения.

## Поля:

### `bytesSent`

- **Описание**: Количество байтов, отправленных через транспорт.
- **Тип данных**: Число.

### `bytesReceived`

- **Описание**: Количество байтов, полученных через транспорт.
- **Тип данных**: Число.

### `dtlsState`

- **Описание**: Состояние DTLS (Datagram Transport Layer Security) соединения. Возможные значения: `new`, `connecting`, `connected`, `closed`, `failed`.
- **Тип данных**: Строка.

### `selectedCandidatePairId`

- **Описание**: Идентификатор выбранной пары кандидатов (локальный и удаленный), используемой для передачи данных.
- **Тип данных**: Строка.

### `localCertificateId`

- **Описание**: Идентификатор локального сертификата, используемого для защиты соединения.
- **Тип данных**: Строка.

### `remoteCertificateId`

- **Описание**: Идентификатор удаленного сертификата, используемого для защиты соединения.
- **Тип данных**: Строка.

### `tlsVersion`

- **Описание**: Версия TLS (Transport Layer Security), используемая для защиты соединения.
- **Тип данных**: Строка.

### `dtlsCipher`

- **Описание**: Название шифра DTLS, используемого для защиты соединения.
- **Тип данных**: Строка.

### `srtpCipher`

- **Описание**: Название шифра SRTP (Secure Real-time Transport Protocol), используемого для защиты медиаданных.
- **Тип данных**: Строка.

### `selectedCandidatePairChanges`

- **Описание**: Количество изменений выбранной пары кандидатов за время существования соединения.
- **Тип данных**: Число.
