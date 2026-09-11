# GPS, GNSS & Real-Time Tracking MOC

> [!info] Карта знаний (Map of Content)
> Всесторонняя база знаний по спутниковой навигации (GNSS), геодезическим основам, дифференциальным поправкам (RTK/PPP), аппаратному уровню, протоколам телеметрии, мобильным API, фильтрации траекторий (Kalman/Dead Reckoning), Map Matching, потоковой передаче геоданных, визуализации больших флотов и клиентскому рендерингу трекинга во Frontend.

---

## 00. Навигация и мета
- [[Глоссарий терминов GNSS (PRN, Ephemeris, Almanac, DOP, NMEA)]]
- [[Системы координат времени и пространства (GPS Time, UTC, ECEF, WGS-84, Geoid)]]

## 01. Геодезия и спутниковый фундамент (GNSS Science)
- [[Спутниковые группировки (GPS, GLONASS, Galileo, BeiDou, QZSS) — орбиты и частоты]]
- [[Принцип трилатерации и измерение псевдодальностей (Pseudoranges)]]
- [[Атомные часы спутников, рассинхронизация приемника и расчет 4-й неизвестной]]
- [[Источники погрешностей (ионосфера, тропосфера, мультипуть, релятивизм)]]
- [[Геометрия созвездия и разбор DOP (HDOP, VDOP, PDOP, GDOP)]]

## 02. Системы повышения точности (DGPS, RTK, PPP)
- [[DGPS и SBAS (WAAS, EGNOS, MSAS)]]
- [[A-GPS (Assisted GPS) — архитектура быстрого старта]]
- [[RTK (Real-Time Kinematic) и PPP (Precise Point Positioning)]]
- [[Протокол NTRIP и работа с базовыми станциями корректировок]]

## 03. Аппаратный уровень и сырые данные
- [[NMEA 0183 — структура и парсинг предложений ($GPGGA, $GPRMC, $GPVTG)]]
- [[Бинарные протоколы чипсетов (u-blox UBX, RTCM 3.x)]]
- [[Сенсорный фьюжн (Sensor Fusion) — GNSS + IMU + Dead Reckoning]]

## 04. Специфика мобильных устройств и Web API
- [[W3C Geolocation API (watchPosition, limitations, highAccuracy)]]
- [[Background Geolocation в iOS и Android (FusedLocationProvider, CoreLocation)]]
- [[Web Bluetooth и Web Serial API для подключения внешних GNSS-приемников]]

## 05. Математика очистки трека и фильтрация
- [[Фильтр Калмана (Kalman Filter, EKF) для сглаживания координат]]
- [[Борьба с выбросами (Outlier Detection) по скорости и ускорению]]
- [[Детекция остановок (Stop Detection) и сегментация поездок]]
- [[Упрощение треков (Ramer-Douglas-Peucker, Visvalingam-Whyatt)]]
- [[Map Matching (HMM алгоритмы, привязка трека к графу OSRM и Valhalla)]]

## 06. Форматы треков, сжатие и хранение
- [[Обменные форматы (GPX, KML, TCX, Garmin FIT)]]
- [[Сжатие полилиний (Google Encoded Polyline Algorithm)]]
- [[Хранение временных рядов треков (TimescaleDB, ClickHouse, PostGIS ST_MakeLine)]]

## 07. Real-Time транспорт и протоколы передачи
- [[Транспорт в веб — WebSockets vs SSE vs MQTT over WebSockets]]
- [[GTFS Realtime (GTFS-RT Vehicle Positions) и Protocol Buffers]]
- [[Телематические протоколы (Wialon IPS, Teltonika, Traccar)]]
- [[Backpressure и throttling потоков координат при тысячах объектов]]

## 08. Frontend — Анимация и интерполяция движения
- [[Dead Reckoning и интерполяция на клиенте (Linear, Spline, Lerp)]]
- [[Сглаживание курсора и угла поворота (Bearing) без переворотов через 360 градусов]]
- [[Пайплайн requestAnimationFrame для непрерывного движения маркеров]]
- [[Режимы слежения камеры (Follow mode, Heading-up vs North-up, Smooth lerping)]]

## 09. Frontend — Визуализация треков и больших флотов
- [[Стриминг и отрисовка растущего трека (GeoJSON updates vs WebGL)]]
- [[Градиентная окраска трека по скорости и высоте (MapLibre Expressions)]]
- [[Рендеринг флота (10k+ объектов) с Deck.gl IconLayer]]
- [[Воспроизведение трека (Playback Controller со слайдером и перемоткой)]]

## 10. Практические кейсы и Production-паттерны
- [[Такси и доставка (Uber и Яндекс стиль движения машинки)]]
- [[Спорт и фитнес (Strava стиль — темп, высотный профиль, аналитика)]]
- [[Телематический дашборд флота (Geofencing, превышение скорости, сливы топлива)]]
- [[Авиационный и морской радар (ADS-B и AIS на Frontend)]]
