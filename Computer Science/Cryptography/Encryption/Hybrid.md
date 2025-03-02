# Кратко

Гибридное шифрование не является отдельным методом шифрования, как симметричное и асимметричное шифрование. Вместо этого это комбинация обоих методов. Эти системы шифрования сначала используют алгоритмы асимметричного ключа для аутентификации и передачи симметричного ключа. После этого симметричный ключ используется для быстрого шифрования большого объема данных. Этот тип системы шифрования особенно используется в сертификатах SSL/TLS.

## Разница между симметричным и асимметричным шифрованием

Основное различие между симметричным и асимметричным шифрованием заключается в использовании одного ключа вместо пары ключей. Остальные различия между этими методами являются лишь следствием этого основного различия.

## Сравнение криптографии с симметричным и асимметричным ключом

Сравнение криптографии с симметричным и асимметричным ключом

| **Симметричное шифрование** | **Асимметричное шифрование** |
| ---- | ---- |
| Один ключ используется для шифрования и расшифровки данных. | Для шифрования и дешифрования используется пара ключей: открытый и закрытый ключи. |
| Более простой метод шифрования, так как используется только один ключ. | Поскольку используется пара ключей, процесс усложняется. |
| Обеспечивает более высокую производительность и требует меньше вычислительной мощности. | Это медленнее и требует большей вычислительной мощности. |
| Более короткие ключи (128-256 бит) используются для шифрования данных. | Используются более длинные ключи шифрования (1024-4096 бит). |
| Высокая сложность управления ключами. | Низкая сложность управления ключами. |
| Используется для шифрования больших объемов данных. | Используется при шифровании небольших объемов данных и обеспечении аутентификации. |

---

# Подробно

## Гибридное шифрование

Алиса хочет зашифровать (длинный) открытый текст и отправить его Бобу
1. Она генерирует симметричный ключ K и открытым ключом Боба шифрует симметричный ключ K.
1. Алиса параллельно шифрует открытый текст, используя симметричный ключ K.
1. Затем Алиса отправляет оба этих зашифрованных послания Бобу.

Получив два зашифрованных текста

4. Боб восстанавливает симметричный ключ K, расшифровав первый зашифрованный текст с использованием своего закрытого ключа.
5. Боб восстанавливает исходный открытый текст, расшифровав второй зашифрованный текст с использованием симметричного ключа K.

![[./assets/hybrid.png]]

### Плюсы

- удобное управления ключами
- надёжное общение между недоверенными сторонами.

## Другие виды криптосистем с открытым ключом

### Шифрование на основе идентификаторов

отправитель может указать произвольную строку, например имя пользователя или адрес электронной почты, в качестве открытого ключа получателя

### Шифрование на основе атрибутов

- Пример: можно зашифровать медицинскую запись таким образом, чтобы любой квалифицированный специалист мог её расшифровать
- использует набор атрибутов и политик, чтобы определить, кто может расшифровать зашифрованный текст

### Гомоморфное шифрование

- возможность выполнять вычисления уже на зашифрованных данных, особенно когда данные представляют числовые значения.
- крайне неэффективны
- Частично гомоморфные схемы шифрования позволяют выполнять опредёленные специфические вычисления