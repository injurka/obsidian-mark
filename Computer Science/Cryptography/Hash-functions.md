# Кратко

Хэш-функция - это функция, которая принимает входные данные (или "сообщение") и возвращает хэш-значение фиксированной длины. Эти функции используются для создания уникальных идентификаторов для данных, которые могут быть слишком длинными или сложными для хранения или передачи.

Основные свойства хэш-функций:

1. Односторонность: Хэш-функция должна быть односторонней, то есть не должна быть возможностью восстановить исходные данные из хэша.
    
2. Единообразие: Для одних и тех же входных данных хэш-функция всегда должна возвращать одно и то же хэш-значение.
    
3. Уникальность: Хэш-функция должна создавать уникальные хэши для разных входных данных.
    
4. Коллизии: Хотя это необходимо для безопасности, в хэш-функциях невозможно избежать коллизий, то есть случая, когда разные входные данные дают одинаковый хэш-значение.
    
5. Фиксированная длина: Хэш-функция должна всегда возвращать хэш-значение одной и той же длины, независимо от размера входных данных.
    

Примеры хэш-функций: MD5, SHA-1, SHA-256, SHA-512, RIPEMD, Whirlpool, и т.д. 
Хеш-функции широко используются в различных областях, включая криптографию, контроль целостности данных, аутентификацию и хранения паролей.

- **SHA-256**: SHA-256 (Secure Hash Algorithm 256) - это одна из наиболее популярных хеш-функций, которая создает 256-битный (32-байтный) хеш. Она используется в различных криптографических приложениях, включая TLS/SSL для защиты данных в Интернете, PGP для цифровых подписей и блокчейн-системы.
    
- **MD5**: MD5 (Message Digest Algorithm 5) - это хеш-функция, которая создает 128-битный (16-байтный) хеш. Хотя MD5 является относительно небезопасным, он по-прежнему используется в некоторых криптографических приложениях и в качестве контрольной суммы для проверки целостности файлов. Однако из-за уязвимостей, связанных с коллизиями, MD5 не рекомендуется для использования в криптографических приложениях, где требуется безопасность.
    
- **SHA-1**: SHA-1 (Secure Hash Algorithm 1) - это хеш-функция, которая создает 160-битный (20-байтный) хеш. Хотя SHA-1 более старая функция, она все еще используется в некоторых криптографических приложениях, особенно в соответствии с стандартами, которые требуют более длинные хеши. Однако из-за известных уязвимостей, таких как коллизии, SHA-1 считается устаревшей и не рекомендуется для использования в новых криптографических приложениях.
      
-  **Whirlpool** - это семейство криптографических хеш-функций, разработанное в 2000 году. Он предназначен для предоставления высокой стоимости вычислений и длинных хешей, что делает его подходящим для криптографических целей, таких как криптовалюты и защита данных. Whirlpool-0 создает 512-битный (64-байтный) хеш.
      
- **RIPEMD** (RACE Integrity Primitives Evaluation Message Digest) - это семейство криптографических хеш-функций, которые были разработаны в 1996 году. Они основаны на идее MD4 и предназначены для предоставления функциональности, аналогичной MD5, но с дополнительными улучшениями безопасности. RIPEMD-160 является частью семейства RIPEMD и создает 160-битный (20-байтный) хеш.

**Когда использовать каждый из них**:

- **SHA-256**: Используйте SHA-256, когда вам нужно создать надежный хеш для защиты данных. Он широко используется в криптовалютах, блокчейн-системах и для контроля целостности данных в различных приложениях.
    
- **MD5**: Используйте MD5, если вам нужно быстро создать хеш для контроля целостности файлов или если вам не нужна очень высокая степень безопасности. Однако, учитывайте, что MD5 уязвим к атакам коллизий и используется в качестве контрольной суммы для проверки целостности файлов.
    
- **SHA-1**: Используйте SHA-1, если вам нужно совместимость с старыми системами или стандартами, которые требуют SHA-1. Однако, учитывайте, что SHA-1 уязвим к атакам коллизий и считается устаревшей.
      
- **RIPEMD-160**: Используйте RIPEMD-160, когда вам нужно создать надежный хеш с похожим уровнем безопасности, что и SHA-1, но с меньшей стоимостью вычислений. Он часто используется в криптовалютах и блокчейн-системах, где требуется совместимость с SHA-1.
    
- **Whirlpool**: Используйте Whirlpool, когда вам нужно создать надежный хеш с высокой стоимостью вычислений. Он широко используется в криптовалютах, где требуется высокая стоимость вычислений для предотвращения атак методом подбора.
  

Их использование рекомендуется для защиты данных в криптографических приложениях.

---

# Подробно

> **Хэш-функция** - функция, осуществляющую преобразование массива входных данных произвольной длины в выходную битовую строку фиксированной длины

## Различные уровни целостности данных

### 1. Случайная ошибка

- Защита только от случайных ошибок, например что возникают из-за шума в канале связи
- Механизмы защиты
    - исправления ошибок
    - простые контрольные суммы
    - вычисление хэш-значений
- эти механизмы не защитят от активного злоумышленника
- если данные изменяются определённым образом, то новое хэш-значение можно спрогнозировать без необходимости его формального пересчёта
    - Пример: хэш-значение для «исключающего ИЛИ» двух сообщений может быть «исключающее ИЛИ» от двух хэш-значений аргументов

### 2. Простые манипуляции

- активный злоумышленник не может сократить вычисление нового хэш-значения, манипулируя старыми

### 3. Активные атаки

- механизмы защиты должны предотвратить создание злоумышленником достоверного хэш-значения для некоторых данных
- используют аутентификацию источника данных
- Механизмы защиты:
    - коды аутентификации сообщений

### 4. Атака отречения

- Защита от *злоумышленного участника информационного обмена*, который <ins>пытается доказать, что не создавал хэш-значение в то время, когда сгенерировал его</ins>
- необходим в приложениях, где требуется доказательство целостности данных
- при определённых обстоятельствах коды аутентификации сообщений могут обеспечить такой уровень целостности данных

## Хэш-функции

### Типы хэш-функций

#### Стойкие однонаправленные функции

Используются для <ins>шифрования строго конфиденциальных данных</ins>, которые не требуют расшифрования, например паролей.

#### Функции, обеспечивающие слабое представление целостности данных

Использоватся для
- проверки данных на случайное их изменение
- для выявления преднамеренного манипулирования данными

По существу, они иногда <ins>называются кодами обнаружения модификации или кодами обнаружения манипуляции</ins>.

#### Функции-компоненты для создания других криптографических примитивов

Использоватся для построения различных криптографических примитивов, таких как коды аутентификации сообщений и схемы электронной подписи.

#### Функции, использующиеся в качестве привязки данных

Использоватся в криптографических протоколах <ins>для связывания данных в одном криптографическом обязательстве</ins>.

> **Криптографическое обязательство** — это схема, позволяющая зафиксировать выбранное значение (например утверждение или бит информации), сохраняя его скрытым для других, с возможностью позже раскрыть его значение.

#### Функции-источники псевдослучайности

Используются для <ins>псевдослучайной генерации чисел</ins>, причём важным примером является генерация криптографических ключей.

### Особенности хэш-функций

#### Хэш-функции не имеют ключа

Свойства безопасности, обеспеченные хэш-функцией, предоставляются без ключа. В этом отношении это необычные криптографические примитивы, так как обычно свойства криптографических схем базируются на знании секретного параметра — ключа.

#### Функции хэширования являются общедоступными

Всегда предполагается, что злоумышленник знает устройство хэш-функции. Поскольку хэш-функции не используют секретный ключ, это означает, <ins>что любой злоумышленник, может вычислить действительное хэш-значение для любого аргумента</ins>.

### Cвойствам хэш-функций

#### 1. Хэш-функция сжимает входные данные произвольной длины в выходные данные фиксированной длины

Это означает, что независимо от того, какой длины вводятся данные, хэш-функция генерирует вывод или хэш-значение фиксированной длины.

> **Хэширование данных** - Процесс применения хэш-функции к входным данным

В общем случае хэш-значение намного короче исходных данных.

В криптографии:
- преобразуют двоичные входные значения в двоичные на выходе
- Если двоичный выход определённой хэш-функции имеет длину ```n``` бит — будем ссылаться на хэш-функцию как на ```n-битовую хэш-функцию```

#### 2. Простота вычисления

- Вычисление хэш-функции должно быть «лёгким» с точки зрения эффективности и скорости
- хэш-функция должна быть вычислима за полиномиальное время

> **Полиномиальное время** - время работы ограничено сверху многочленом от размера входа алгоритма, то есть $T(n) = O(n^{k}), k=const$

- практическая хэш-функция будет намного быстрее вычисляться, чем операция симметричного шифрования

### Cвойства хэш-функций, имеющих отношение к безопасности схем


#### 1. Стойкость к поиску первого прообраза

- Хэш-функция должна быть устойчивой к поиску первого прообраза
- должно быть вычислительно сложно обратить хэш-функцию
- хэш-функция была вычислима за экспоненциальное время
- защищает от атакующего, который имеет *только хэш-значение и пытается обратить хэш-функцию*

> **Экспоненциальное время** - время решения задачи, ограниченное экспонентой от размерности задачи.

#### 2. Стойкость к поиску второго прообраза

- должна быть стойкой к поиску второго прообраза: для входных данных и их хэш-значения должно быть сложно найти другие входные данные с тем же хэш-значением.
- защищает от атакующего, *знает входные данные и их хэш-значение* -> хочет найти другое входное значение, имеющее такое же хэш-значение.

#### 3. Стойкость к коллизиям

- Трудно найти <ins>два разных входа</ins> (любой длины), которые при подаче в хэш-функцию <ins>дают одинаковые хэш-значения</ins>
- хэш-функция должна быть без коллизий. Заметим, что хэш-функция не может не иметь коллизий
- злоумышленнику очень <ins>трудно найти два входных значения с одинаковым хэш-значением</ins>

#### Схема свойств

![[./_/hash-functions.png]]

> Между свойствами безопасности существует только одна чёткая связь: **если функция устойчива к коллизиям, то она устойчива к поиску второго прообраза**. То есть если функция ```h``` устойчива к коллизиям, то трудно найти любую пару аргументов, для которых значения хэш-функции совпадают.

## Примеры применения хэш-функций

### 1. Применение, требующее <ins>стойкости к поиску первого прообраза</ins>

Хэш-функции предлагают простой и широко распространённый способ защиты паролей

- хранить пароли в файле паролей в замаскированной форме
- любой, кто получает доступ к файлу паролей, не может восстановить сами пароли

Перед попыткой входа в систему идентификатор пользователя ```I``` сохраняется в файле пароля, рядом с результатом передачи пароля ```P``` пользователя ```I``` через хэш-функцию ```h```.

- файл паролей состоит из таблицы пар вида $(I, h (P))$
- сами пароли не хранятся в базе

#### Процесс входа в систему на основе пароля

![[./_/hash-functions_1.png]]

1. Пользователь вводит свою идентификационную информацию на экране входа в систему
1. Пользователь вводит свой пароль ```P```
1. Приложение аутентификации вводит пароль ```P``` в хэш-функцию и вычисляет ```h(P)```
1. Приложение проверки подлинности:
    1. Находит запись в файле паролей, соответствующую идентификатору ```I```
    1. сравнивает сохранённое значение хэшированного пароля со значением ```h(P)```
    1. Если записи совпадают, то пользователь проходит аутентификацию. В противном случае приложение отклоняет вход в систему

#### Проверка выполнения других свойств хэш-функции

##### Стойкость к поиску второго прообраза

- Если злоумышленник не знает действительного пароля для системы, то стойкость к поиску второго прообраза не выполняется
- Если злоумышленник знает действительный пароль ```P``` для системы, то вторые прообразы хэш-значения этого пароля безполезны

##### Стойкость к коллизиям

- не приносит пользу злоумышленнику
- целесообразно искать коллизии в случае, если он обладает одним из паролей

для защиты файлов паролей в первую очередь нужна защита от поиска прообразов

- Решается скрытием хранилища паролей

### 2. Применение, требующее <ins>стойкости второго прообраза</ins>

создание контрольных сумм, которые обеспечивают упрощённую проверку целостности данных

обеспечить определённую степень уверенности пользователя в том, что он правильно загрузил файл

**Ход работы**
- На сайте загрузки файлов отображается хэш-значение MD5, которое идентифицирует имя хэш-функции (MD5) и предоставляет хэш-значение исполняемого кода
- Пользователь, который загружает исполняемый код, может повторно вычислить хэш-значение, пропустив код через хэш-функцию MD5.
- сравнивает полученное хэш-значение с тем, которое отображается на 
- Есл они совпадают, пользователь уверен, что загруженный им код соответствует коду, который предназначался для загрузки

злоумышленник всегда может изменить файл, а затем повторно вычислить новое хэш-значение, которое соответствует модифицированному файлу

злоумышленнику потребуется убедить сайт загрузки файла отобразить этот модифицированный код с его новым хэш-значением

Хэш-функция может использоваться для обеспечения целостности данных в сочетании с другими механизмами безопасности

#### Проверка других свойств

**Стойкость первого прообраза**. Поскольку исполняемый код не является секретом, то нет смысла заботиться о стойкости к поиску первого прообраза. На самом деле прообраз хэш-значения должен быть известен, поскольку применение требует этого.

**Стойкость к коллизиям**. Коллизии не имеют смысла в этом применении, если нельзя найти два фрагмента кода с одним и тем же хэш-значением. Причём один из них потенциально полезный, а другой вредоносный, что достаточно маловероятно. Эта ситуация кажется сомнительной.

### 3. Применения, требующие <ins>устойчивости к коллизиям</ins>

использованием хэш-функций для генерации криптографических обязательств

#### Пример сценария с использованием хэш-функций для генерации криптографических обязательств

![[./_/hash-functions_2.png]]

Дано:

- Два участника обмена сообщениями: Алиса и Боб
- Обмен без посредников
- Каждая сторона обменивается обязательством
- После открываются сообщения

Описание процесса:

1. Алиса
    1. составляет сообщение и хэширует - хэш является обязательством
    1. Отправляет хэш бобу, который его сохраняет
1. Боб повторяет те же действия со своим сообщением, Алиса сохраняет у себя хэш Боба
1. Подтверждение сообщения Алисы
    1. Алиса отправляет исходное сообщение Бобу
    2. Боб хэширует его и сравнивает с ранее полученным хэшем, если совпадает - ОК
1. Подтверждение сообщения Боба
    1. Боб отпарвялет исходное сообщения Алисе
    2. Алиса хэширует его и сравнивает хэш

Проблема безопасности

- Может ли какая-либо из сторон «отказаться» от своих обязательств каким-либо образом. Способ отказаться от обязательства — найти альтернативное сообщение, имеющее такое же хэш-значение.
- высокая чувствительность к колизиям

**Требуются все три свойства безопасности**

## Алгоритм Стрибог

Стандарт [ГОСТ Р 34.11. Информационная технология. Криптографическая защита информации. Функция хэширования](https://docs.cntd.ru/document/1200095035)

Подробнее
- [https://habr.com/ru/articles/188152/](https://habr.com/ru/articles/188152/)
- С кодом (С): [https://xakep.ru/2016/07/20/hash-gost-34-11-2012/](https://xakep.ru/2016/07/20/hash-gost-34-11-2012/)

Пример реализации (C): [https://github.com/okazymyrov/stribog](https://github.com/okazymyrov/stribog)

Включающее две функции
- Функцию с длиной выходного значения в 256 бит
- функцию с длиной выходного значения в 512 бит.

### Преобразования

#### 1. X-преобразование

На вход функции ```X``` подаются две последовательности длиной 512 бит каждая, выходом функции является XOR этих последовательностей

$$
X[k]: V_{512} \to V_{512}\\
X[k](a) = k \oplus a, k,a \in V_512
$$

#### 2. S-преобразование

Функция ```S``` является обычной функцией подстановки. Каждый байт из 512-битной входной последовательности заменяется соответствующим байтом из таблицы подстановок $\pi$

$$
S: V_{512} \to V_{512}\\
S(a) = S(a_{63}||...||a_{0}) = \pi(a_{63})||...||\pi(a_{0})
$$

Таблица $\pi$ является константой

#### 3. P-преобразование

Функция перестановки. Для каждой пары байт из входной последовательности происходит замена одного байта другим.

$$
P: V_{512} \to V_{512}\\
P(a) = P(a_{63}||...||a_{0}) = a_{\tau(63)}||...||a_{\tau(0)}
$$

Таблица перестановок $\tau$ также является константой

#### 4. L-преобразование

Представляет собой умножение 64-битного входного вектора на бинарную матрицу **A** размерами 64x64.

$$
L: V_{512} \to V_{512}\\
L(a) = L(a_{7}||...||a_{0}) = l(a_{7})||...||l(a_{0})
$$

Матрицу **A** можно представить как массив 64-битных слов


### Функция сжатия

![[./_/hash-zip.png]]

**m** — очередной блок исходного сообщения, **h** — значение предыдущей функции сжатия

#### Функция $g_n$

Пусть h, N и m — 512-битные последовательности

Алгоритм вычисления $g(N,h,m):

1. Вычислить значение $K = h \oplus N$
1. Присвоить значение $K = S(K)$
1. Присвоить значение $K = P(K)$
1. Присвоить значение $K = L(K)$
1. Вычислить $t = E(K, m)$
1. Присвоить значение $t = h ⊕ t$
1. Вычислить значение $G = t ⊕ m$
1. $g(N, m, h) = G$

#### Функция $E(h,m)$

1. Вычислить значение **state** = $h \oplus m$
1. Для ```i= 0 по 11``` выполнить:
    - Присвоить значение $state = S(state)$
    - Присвоить значение $state = P(state)$
    - Присвоить значение $state = L(state)$
    - Вычислить $K=KeySchedule(h, i)$
    - Присвоить значение $state = state \oplus h$
1. Вернуть **state** в качестве результата.

#### KeySchedule(K, i)

Отвечает за формирование временного ключа ```K``` на каждом раунде функции $E(K, m)$

1. Присвоить значение $K = K \oplus C[i]$
1. Присвоить значение $K = S(K)$
1. Присвоить значение $K = P(K)$
1. Присвоить значение $K = L(K)$
1. Вернуть **K** в качестве результата функции.

С — это набор 512-битных значений

### Хэш-функция

![[./_/striborg_hash_func.png]]

1. **Первый этап**<br>инициализация всех нужных параметров
1. **Второй этап**<br> представляет собой так называемую итерационную конструкцию Меркла — Дамгорда с процедурой МД-усиления
1. **Третий этап**<br>завершающее преобразование: функция сжатия применяется к сумме всех блоков сообщения и дополнительно хешируется длина сообщения и его контрольная сумма

Общий алгоритм хэширования (любого сообщения ```M```):

1. Присвоить начальные значения внутренних переменных
    - Для хеш-функции с длиной выхода 512 бит: $h=iv=0x0064$. Для хеш-функции с длиной выхода 256 бит: $h=iv=0x0164$
    - $N = 0512$
    - $\Sigma = 0512$
1. Пока $\text{length}(M) \geq 512$
    - ```m``` — последние 512 бит сообщения ```M```
    - $h = g(N, m, h)$
    - $N = (N + 512) \text{mod} 2512$
    - $\Sigma = (\Sigma + m) \text{mod} 2512$
    - Обрезать M, убрав последние 512 бит
1. Произвести дополнение сообщения ```M``` до длины в 512 бит по следующему правилу: $m = 0511-|M|||1||M$, где |M| — длина сообщения M в битах
1. Вычислить $h = g(N, m, h)$
1. Вычислить $N = (N + |M|) \text{mod} 2512$
1. Вычислить $\Sigma = (\Sigma + m) \text{mod} 2512$
1. Вычислить $h = g(0, h, N)$
1. Вычислить $h = g(0, h, \Sigma)$
1. Возвращаем результат
    - Для хеш-функции с длиной выхода в 512 бит: ```h```
    - Для функции с длиной выхода 256 бит: ```MSB256(h)```