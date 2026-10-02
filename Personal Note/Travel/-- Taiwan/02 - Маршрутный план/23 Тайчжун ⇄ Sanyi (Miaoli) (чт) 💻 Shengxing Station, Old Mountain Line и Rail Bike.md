---
day: 23
cssclasses: activity-timeline
date: "2026-11-26"
weekday: "Четверг"
title: "🚂 Shengxing Station, Old Mountain Line и Rail Bike"
location: "Nagahiro Hotel ➔ MRT Wenhua Senior High School ➔ MRT/TRA Songzhu ➔ TRA Sanyi ➔ Shengxing Station ➔ Old Mountain Line Rail Bike ➔ Sanyi ➔ Songzhu ➔ Nagahiro Hotel"
phase: "💻 Фаза 2 — Городской воркейшн: железнодорожное утро в Sanyi и работа 16:00–22:00."
accommodation: "Nagahiro Hotel- Taichung Wenxin (5-я ночь в Тайчжуне)."
highlight: >-
  Старая горная линия у Shengxing: деревянный вокзал, тоннель и железнодорожный
  мост с видом на руины Longteng. Возвращение в отель через Songzhu с запасом перед работой.
is_ready: false
mode: workation
base_city: Тайчжун
transport_types:
  - metro
  - taxi
  - train
  - bicycle
  - walk
booking_status: pending

---

# 🗓️ День 23: Четверг (26 ноября) (💻 Воркейшн)

---

## Важная подготовка и городская логистика

> [!IMPORTANT] Билет Rail Bike и дорога к Shengxing
> * **Главная бронь:** Нужен маршрут **A от Shengxing Station (勝興站)**, цель — **A1 09:20–10:30**. По [расписанию оператора](https://www.oml-railbike.com/_pages/info/index.php) билет нужно получить **до 09:00**, стоимость — **NT$285 на человека**. Это опубликованный слот, а не подтверждённая бронь на 26 ноября; проверьте доступность и оплатите билет на [официальном сайте](https://www.oml-railbike.com/_pages/order/step2.php?u=common). Продажи открываются за 90 дней, в 10:00 по Тайваню; после оплаты сохраните QR-код.
> * **Последний участок:** TRA идёт до действующей станции **Sanyi (三義)**, а Shengxing — отдельная историческая станция вне действующей пассажирской линии. От Sanyi до места посадки и обратно нужен отдельный автомобильный трансфер; [оператор рекомендует такси](https://www.oml-railbike.com/_pages/traffic/index.php). Организуйте обратный вызов заранее, не рассчитывайте на пересадку пешком.
> * **Железнодорожная связка:** От отеля пешком к **MRT Wenhua Senior High School (108)**, четыре остановки зелёной линии в сторону Beitun Main Station до **Songzhu (104)**. [Выход 3 MRT Songzhu](https://www.tmrt.com.tw/eng/metro-life/station-information?id=8cbc2661-c30e-417e-bfe5-69c7fd559f77) ведёт к отдельной станции TRA Songzhu; на неё нужны новый вход и запас на переход.
> * **Время поездов:** Окна TRA ниже — план, **не бронирование на 26 ноября**. В августовском [примере TRA №2134](https://tip.railway.gov.tw/tra-tip-web/tip/tip001/tip112/querybytrainno?rideDate=2026%2F08%2F06&trainNo=2134) Songzhu → Sanyi было 07:42–08:17; в сентябрьском примере обратный [№2173](https://tip.railway.gov.tw/tra-tip-web/tip/tip001/tip112/querybytrainno?rideDate=2026%2F09%2F08&trainNo=2173) шёл 12:30–13:05. Проверьте оба направления в [официальном поиске TRA](https://tip.railway.gov.tw/tra-tip-web/tip/tip001/tip112/gobytime?lang=en_US) на нужную дату и ещё раз за неделю. Для A1 нужен поезд с прибытием в Sanyi **не позже 08:20**.
> * **Рабочая граница:** Цель — отель около **13:40**, работа с 16:00. Если ранний поезд, такси к Shengxing или слот A1 не подтверждаются, не считайте раннее возвращение гарантированным: пересчитайте A2 с отдельным запасом или оставьте выезд на другой день. Отдельный Longteng Bridge утром не добавляйте.

---

## Маршрут

### Утро: из Тайчжуна к старой горной линии

* **06:40 - 07:00** — Завтрак и сбор в отеле:
    * Возьмите воду, лёгкую ветровку и подтверждение Rail Bike; чемодан остаётся в Nagahiro Hotel.

* **07:00 - 07:10** — Пешком к MRT Wenhua Senior High School:
    * Станция находится рядом с Nagahiro Hotel. Заложите запас на вход, турникеты и платформу.

* **07:10 - 07:25** — MRT: Wenhua Senior High School ➔ Songzhu:
    * По зелёной линии в направлении **Beitun Main Station** четыре остановки. Это плановое окно с ожиданием поезда; на Songzhu переходите к выходу 3 на TRA.

```transport
type: metro
title: "Taichung MRT Green Line"

routes:
  - from: "Wenhua Senior High School (108)"
    to: "Songzhu (104)"
    line: "Green Line"
    code: "G"
    color: "#84BD00"
    direction: "Beitun Main Station"
    stops: 4
```

* **07:25 - 07:40** — Переход MRT Songzhu ➔ TRA Songzhu:
    * Используйте выход 3 и указатели TRA. Пройдите отдельные турникеты; если расписание на дату сдвинется, сохраните не менее 10–15 минут на пересадку.
    * _Ссылка на локацию_: [Google Maps: Songzhu Railway Station](https://maps.google.com/?q=Songzhu+Railway+Station,+Taichung)<iframe src="https://maps.google.com/maps?q=Songzhu+Railway+Station,+Taichung&output=embed" style="width: 100%; min-width: 100%; height: 350px; display: block; border: 0; border-radius: 8px; margin-top: 10px; margin-bottom: 15px;" loading="lazy"></iframe>

* **07:40 - 08:20** — TRA: Songzhu ➔ Sanyi:
    * Садитесь только на северный поезд с остановкой **Sanyi**. Сентябрьский пример №2134 — 07:42–08:17; конкретный рейс 26 ноября ещё не подтверждён. Если прибытие позже 08:20, A1 потребует новой оценки времени на такси и регистрацию.
    * _Ссылка на локацию_: [Google Maps: Sanyi Railway Station](https://maps.google.com/?q=Sanyi+Railway+Station,+Miaoli)<iframe src="https://maps.google.com/maps?q=Sanyi+Railway+Station,+Miaoli&output=embed" style="width: 100%; min-width: 100%; height: 350px; display: block; border: 0; border-radius: 8px; margin-top: 10px; margin-bottom: 15px;" loading="lazy"></iframe>

* **08:20 - 08:45** — Такси: Sanyi ➔ Shengxing Station:
    * Покажите водителю адрес посадки Rail Bike: **苗栗縣三義鄉勝興村14鄰勝興88號**. Машину к вокзалу или контакт для вызова согласуйте заранее; на месте договоритесь о возвращении после 11:20.

* **08:45 - 09:20** — Получение билета и посадка Rail Bike:
    * Предъявите QR-код и завершите выдачу билета **до 09:00**. Оставшееся время — на платформу Shengxing и инструктаж; прогулку по старой улице оставьте после поездки.

### День: Old Mountain Line и возвращение к работе

* **09:20 - 10:30** — Rail Bike A: тоннель и мост старой линии:
    * Маршрут от Shengxing проходит через **тоннель № 2** и **мост Yutengping**; с линии открывается вид на руины **Longteng Bridge**. По [описанию оператора](https://www.oml-railbike.com/_pages/info/index.php), поездка с остановками занимает 70–80 минут и возвращает к Shengxing. Для поездки по тоннелям № 3–6 нужен другой маршрут; в это рабочее утро он не запланирован.
    * _Ссылка на локацию_: [Google Maps: Old Mountain Line Rail Bike Shengxing](https://maps.google.com/?q=Old+Mountain+Line+Rail+Bike+Shengxing+Station)<iframe src="https://maps.google.com/maps?q=Old+Mountain+Line+Rail+Bike+Shengxing+Station&output=embed" style="width: 100%; min-width: 100%; height: 350px; display: block; border: 0; border-radius: 8px; margin-top: 10px; margin-bottom: 15px;" loading="lazy"></iframe>

> [!TIP] Longteng Bridge без гонки
> На маршруте A руины видны с железнодорожного моста и посещается южная сторона разрушенного моста. Отдельный подъезд к руинам не заложен: он отнимет запас перед работой.

* **10:30 - 11:20** — Shengxing Station, Old Street и ранний обед:
    * Теперь можно спокойно рассмотреть деревянный вокзал 1906 года и пройти по деревенской улице. Станция стоит на высоте около 402 м; движение по старой линии закончилось в 1998 году после перехода на новую трассу ([Туристическое управление Тайваня](https://eng.taiwan.net.tw/m1.aspx?id=5961&sNo=0002110)). Возьмите местную лапшу или перекус; если обслуживание затягивается, еду — с собой к станции Sanyi.
    * _Ссылка на локацию_: [Google Maps: Shengxing Station](https://maps.google.com/?q=Shengxing+Station,+Sanyi)<iframe src="https://maps.google.com/maps?q=Shengxing+Station,+Sanyi&output=embed" style="width: 100%; min-width: 100%; height: 350px; display: block; border: 0; border-radius: 8px; margin-top: 10px; margin-bottom: 15px;" loading="lazy"></iframe>

* **11:20 - 11:45** — Такси: Shengxing ➔ TRA Sanyi:
    * Используйте заранее согласованный обратный вызов. На станции проверьте платформу и фактическое время южного поезда.

* **11:45 - 12:30** — Ожидание поезда в Sanyi:
    * Это запас на местное такси, покупку воды и платформу. По сентябрьскому примеру обратный №2173 отправлялся в 12:30; на 26 ноября проверьте фактический рейс.

* **12:30 - 13:05** — TRA: Sanyi ➔ Songzhu:
    * Сентябрьский пример №2173 прибывал в Songzhu к 13:05. Если поезд на дату изменится, выберите другой рейс с большим запасом до работы.

* **13:05 - 13:30** — MRT: Songzhu ➔ Wenhua Senior High School:
    * Перейдите из TRA к MRT через переход у выхода 3. Зелёная линия в направлении **HSR Taichung Station**, четыре остановки до Wenhua Senior High School; окно включает переход и ожидание состава.

```transport
type: metro
title: "Taichung MRT Green Line"

routes:
  - from: "Songzhu (104)"
    to: "Wenhua Senior High School (108)"
    line: "Green Line"
    code: "G"
    color: "#84BD00"
    direction: "HSR Taichung Station"
    stops: 4
```

* **13:30 - 13:40** — Пешком от MRT до Nagahiro Hotel:
    * Вернитесь в номер и оставьте остаток дня свободным до рабочего блока.

* **13:40 - 16:00** — Отдых и подготовка к работе:
    * Душ, спокойный обед при необходимости, проверка связи и пауза после дороги.

* **16:00 - 22:00** — Удалённая работа в отеле:
    * Шестичасовой рабочий блок из Nagahiro Hotel.

* **22:00+** — Ужин и отдых:
    * Ужин рядом с отелем или доставка, затем сон перед пятничной поездкой в Чжанхуа.

---

## 💰 Финансовые затраты на день
* MRT Wenhua Senior High School ⇄ Songzhu: `~40 NTD` (`~110 ₽` на человека, ориентир по [тарифной схеме MRT](https://www.tmrt.com.tw/static/files/TMRT%20Green%20Line%20Fares.pdf)).
* TRA Songzhu ⇄ Sanyi: `~130 NTD` (`~365 ₽` на человека, бюджетный ориентир; тариф сверить при выборе поезда).
* Такси Sanyi ⇄ Shengxing: `~400–600 NTD` (`~1 120–1 680 ₽` за машину, предварительный резерв; согласовать с водителем).
* Rail Bike, маршрут A: `285 NTD` (`~800 ₽` на человека по опубликованному тарифу; наличие билета на 26 ноября не подтверждено).
* Ранний обед / перекус у Shengxing: `~150–200 NTD` (`~420–560 ₽`, оценка). Ужин после работы относится к обычному дневному питанию.
* **Поездка до возвращения в отель:** около `~1 005–1 255 NTD` (`~2 815–3 515 ₽` для одного человека; если такси разделить, меньше). Ужин и автомобильный Plan B от Shengxing до отеля сюда не включены.
