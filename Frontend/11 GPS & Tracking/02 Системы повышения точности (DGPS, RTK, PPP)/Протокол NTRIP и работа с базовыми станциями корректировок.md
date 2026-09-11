# Протокол NTRIP и работа с базовыми станциями корректировок

> [!info] Навигация
> Родительский раздел: [[GPS & Tracking MOC]]

## Введение

Для работы систем сантиметровой точности (RTK) мобильный приемник (ровер) должен непрерывно получать бинарный поток поправок в формате **RTCM 3.x** с задержкой не более 1–2 секунд. Исторически поправки передавались по УКВ-радиомодемам (UHF 433/868 МГц), что ограничивало дальность прямой видимостью и требовало установки собственной громоздкой мачты.

В 2004 году Федеральное агентство картографии и геодезии Германии (BKG) разработало открытый протокол **NTRIP (Networked Transport of RTCM via Internet Protocol)**, ставший де-факто мировым стандартом передачи дифференциальных поправок через сотовые сети и Интернет (стандарт RTCM 10410.1).

```mermaid
flowchart LR
    subgraph Base_Network ["Сеть базовых станций"]
        B1["Базовая станция 1"]
        B2["Базовая станция 2"]
        B1 -->|"RTCM 3.x (TCP)"| N_SERVER["NTRIP Server"]
        B2 -->|"RTCM 3.x (TCP)"| N_SERVER
    end

    subgraph Caster_Core ["NTRIP Caster (Облачный брокер)"]
        N_SERVER -->|"Source Stream"| CASTER["NTRIP Caster<br/>- Аутентификация (Basic Auth)<br/>- Mountpoints (Точки монтирования)<br/>- VRS (Виртуальная опорная станция)"]
    end

    subgraph Mobile_Rovers ["Пользователи (NTRIP Client)"]
        CASTER -->|"HTTP/1.1 Streaming (RTCM)"| R1["Ровер 1: Дрон БПЛА"]
        CASTER -->|"HTTP/1.1 Streaming (RTCM)"| R2["Ровер 2: Смартфон с RTK"]
        R1 -.->|"Обратный NMEA $GPGGA (Координаты)"| CASTER
    end
```

---

## 1. Архитектура и участники NTRIP

Протокол строится по классической модели Pub/Sub (издатель-подписчик) поверх протокола HTTP/1.1 и включает 4 роли:

### 1. NTRIP Source (Источник данных)
Физический мультисистемный приемник базовой станции (Base Station), установленный на жестком геодезическом пилоне с известными с субмиллиметровой точностью координатами. Генерирует непрерывный поток бинарных пакетов **RTCM 3.x** (MSM4/MSM7) с частотой 1 Гц.

### 2. NTRIP Server (Сервер передачи)
Программный сервис или встроенный в базовый приемник стек, устанавливающий TCP-соединение с Кастером и «пушащий» (Push) поток данных RTCM от источника.

### 3. NTRIP Caster (Кастер / Диспетчер потоков)
Центральный сервер-брокер (HTTP-сервер специального назначения):
- Принимает входящие потоки от сотен серверов.
- Организует потоки по именованным **точкам монтирования (Mountpoints)**.
- Ведет учет пользователей (User/Password), проверяет права доступа и биллинг.
- Раздает бинарный RTCM-поток тысячам подключенных клиентов (HTTP Chunked Streaming).

### 4. NTRIP Client (Клиент / Ровер)
Мобильное устройство (БПЛА, беспилотный автомобиль, геодезический контроллер или Node.js/Web-сервис). Подключается к Кастеру, выбирает точку монтирования и передает принятый поток RTCM в порт GNSS-чипсета (UART/SPI/USB).

---

## 2. Анатомия протокола NTRIP v2.0 поверх HTTP

NTRIP — это остроумное использование протокола HTTP, позволяющее навигационным потокам без проблем проходить через любые корпоративные фаерволы и NAT сотовых операторов по портам `80`, `443` или стандартному `2101`.

### Шаг 1: Запрос таблицы точек монтирования (Source Table Request)
Перед подключением клиент запрашивает у Кастера список всех доступных базовых станций:
```http
GET / HTTP/1.1
Host: rtk.geoprovider.com:2101
User-Agent: NTRIP MyClient/1.0
Accept: */*
Connection: close
```

**Ответ Кастера (Таблица Source Table):**
Кастер возвращает текстовые CSV-строки с описанием потоков (префикс `STR`):
```text
SOURCETABLE 200 OK
Content-Type: text/plain
Content-Length: 485

STR;MOSCOW_VRS;MOSCOW_VRS;RTCM 3.2;1004(1),1006(10),1008(10),1012(1);2;GPS+GLO;BKG;RUS;55.75;37.61;1;1;Trimble NetR9;none;B;N;9600;
STR;SPB_BASE;SPB_BASE;RTCM 3.3;MSM7(1),1006(5);2;GPS+GLO+GAL+BDS;Emlid;RUS;59.93;30.31;0;0;u-blox ZED-F9P;none;B;N;19200;
ENDSOURCETABLE
```

В таблице клиент видит: имя Mountpoint, используемый формат (RTCM 3.x), поддерживаемые созвездия (GPS+GLO+GAL+BDS), широту/долготу базовой станции и признак необходимости обратной отправки координат (`NMEA=1`).

---

### Шаг 2: Установка стрима данных (Streaming Connection)

Клиент отправляет HTTP-запрос на выбранный Mountpoint:
```http
GET /SPB_BASE HTTP/1.1
Host: rtk.geoprovider.com:2101
User-Agent: NTRIP GNSS-Client/2.0
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
Ntrip-Version: Ntrip/2.0
Connection: keep-alive
```

**Ответ Кастера:**
```http
HTTP/1.1 200 OK
Content-Type: gnss/data
Server: NTRIP Caster/2.0
Cache-Control: no-cache
Connection: keep-alive

<бинарный поток байт RTCM 3.x (начиная с преамбулы 0xD3)>
```

С этого момента TCP-сокет не закрывается: сервер бесконечно льет бинарные кадры поправок с частотой 1–2 раза в секунду.

---

## 3. Одиночная база vs Сетевой RTK (VRS — Virtual Reference Station)

Если подключаться к одиночной физической базе (`SPB_BASE`), точность RTK зависит от расстояния: каждые $10\text{ км}$ удаления от базы добавляют около $1\text{ см}$ погрешности к решению из-за раскорреляции атмосферы.

Для решения этой проблемы ведущие операторы разворачивают **сетевой RTK (Network RTK / VRS)**:

```mermaid
sequenceDiagram
    autonumber
    participant Rover as Мобильный Ровер (NTRIP Client)
    participant Caster as NTRIP Caster (VRS Сервер)
    participant Net as Сеть реальных базовых станций

    Rover->>Caster: Подключение к Mountpoint "VRS"
    Rover->>Caster: Отправка своих текущих координат ($GPGGA)
    Note over Caster: Сервер видит, где находится ровер!
    Caster->>Net: Запрос данных от 3-4 окружающих станций
    Note over Caster: Математический расчет поля атмосферных градиентов
    Caster->>Rover: Генерация потока RTCM от ВИРТУАЛЬНОЙ базы в 5 метрах от ровера!
    Rover->>Rover: Мгновенный RTK Fix с идеальной компенсацией!
```

### Как работает VRS:
1. Клиент подключается к точке монтирования `VRS`.
2. Каждые 5–10 секунд клиент отправляет в сторону Кастера строку `$GPGGA` со своими текущими координатами (автономная точность $2-3$ м).
3. Сервер Кастера математически интерполирует ионосферные и геометрические ошибки сети станций и **синтезирует виртуальную базовую станцию**, находящуюся в 5 метрах от клиента.
4. Клиент получает поправки с нулевой длиной базиса ($Baseline \approx 0$), что гарантирует надежнейший **RTK Fix** за считанные секунды по всей площади покрытия сети.

---

## 4. Реализация NTRIP Client на TypeScript / Node.js

Ниже представлен компактный промышленный пример NTRIP-клиента, подключающегося к кастеру и пересылающего бинарный поток RTCM в последовательный порт GNSS-приемника:

```typescript
import net from 'node:net';

interface NtripConfig {
  host: string;
  port: number;
  mountpoint: string;
  username?: string;
  password?: string;
  sendGGAIntervalMs?: number;
}

export class SimpleNtripClient {
  private socket: net.Socket | null = null;
  private ggaTimer: NodeJS.Timeout | null = null;

  constructor(private config: NtripConfig) {}

  public connect(onRtcmData: (chunk: Buffer) => void): void {
    this.socket = new net.Socket();

    this.socket.connect(this.config.port, this.config.host, () => {
      console.log(`[NTRIP] Connected to ${this.config.host}:${this.config.port}`);

      // Формирование HTTP/NTRIP заголовка
      const auth = this.config.username && this.config.password
        ? `Authorization: Basic ${Buffer.from(`${this.config.username}:${this.config.password}`).toString('base64')}\r\n`
        : '';

      const request = 
        `GET /${this.config.mountpoint} HTTP/1.1\r\n` +
        `Host: ${this.config.host}:${this.config.port}\r\n` +
        `User-Agent: NTRIP TypeScript-Client/1.0\r\n` +
        `Ntrip-Version: Ntrip/2.0\r\n` +
        auth +
        `Connection: close\r\n\r\n`;

      this.socket?.write(request);
    });

    let isHeaderParsed = false;
    let headerBuffer = '';

    this.socket.on('data', (data: Buffer) => {
      if (!isHeaderParsed) {
        headerBuffer += data.toString('latin1');
        const headerEndIndex = headerBuffer.indexOf('\r\n\r\n');

        if (headerEndIndex !== -1) {
          isHeaderParsed = true;
          const statusLine = headerBuffer.split('\r\n')[0];
          console.log(`[NTRIP] Caster Response: ${statusLine}`);

          // Если в первом чанке уже есть полезные бинарные данные после заголовка
          const binaryStart = Buffer.byteLength(headerBuffer.substring(0, headerEndIndex + 4), 'latin1');
          if (data.length > binaryStart) {
            onRtcmData(data.subarray(binaryStart));
          }

          this.startGgaLoop();
        }
      } else {
        // Потоковые бинарные данные RTCM 3.x
        onRtcmData(data);
      }
    });

    this.socket.on('error', (err) => console.error('[NTRIP] Socket error:', err));
    this.socket.on('close', () => {
      console.log('[NTRIP] Connection closed');
      if (this.ggaTimer) clearInterval(this.ggaTimer);
    });
  }

  // Для VRS-сетей необходимо регулярно отправлять NMEA GGA с позицией ровера
  private startGgaLoop(): void {
    if (!this.config.sendGGAIntervalMs) return;
    
    // Пример синтетической строки GGA
    const sampleGGA = '$GPGGA,120000.00,5545.1234,N,03737.5678,E,1,08,1.0,150.0,M,14.0,M,,*42\r\n';
    
    this.ggaTimer = setInterval(() => {
      if (this.socket && !this.socket.destroyed) {
        this.socket.write(sampleGGA);
      }
    }, this.config.sendGGAIntervalMs);
  }

  public disconnect(): void {
    if (this.socket) this.socket.destroy();
    if (this.ggaTimer) clearInterval(this.ggaTimer);
  }
}
```

> [!important] Предотвращение бана на платных NTRIP-кастерах
> Многие коммерческие сервисы поправок (SmartNet, HxGN, RTKNet) строго лимитируют количество одновременных подключений на одну учетную запись. Если ваш сервис аварийно рестартует контейнеры и не закрывает TCP-сокеты, Кастер может заблокировать IP-адрес на 15 минут с ошибкой `401 Unauthorized` или `403 Forbidden`. Всегда реализуйте graceful shutdown для NTRIP-сокетов.
