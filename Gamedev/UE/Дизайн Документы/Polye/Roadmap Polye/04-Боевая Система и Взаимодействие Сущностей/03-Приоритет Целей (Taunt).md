**Цель:** Реализовать специфические правила Polye, определяющие, какую именно цель выберет атакующий Юнит из списка всех доступных вражеских сущностей в пределах своей дальности атаки. Эти правила включают Приоритет (базовый и модифицированный эффектами, такими как Taunt) и правило предпочтения Юнитов перед Строениями.

**Зачем Нужна Эта Система:**

*   **Стратегическая Глубина:** Правила выбора цели влияют на тактику размещения Юнитов и Строений. Игроки могут использовать Юниты с высоким Приоритетом (Taunt) для защиты более слабых или важных целей (например, Строений Базы).
*   **Предсказуемость Боя:** В системе автоматического боя предсказуемость выбора цели критически важна. Игроки должны понимать, кто кого будет атаковать, чтобы планировать свои действия.
*   **Реализация Правил Polye:** Эти правила являются уникальными для игры Polye и определяют ее боевой геймплей.
*   **Серверный Авторитет:** Логика выбора цели должна выполняться исключительно на сервере, чтобы предотвратить читерство и гарантировать, что результат боя одинаков для всех игроков.

**Предпосылки:**

*   **Базовая Сетевая Архитектура (Фаза 1):** Реализованы ключевые C++ классы и сетевая настройка. Сервер является авторитетом.
*   **Система Данных (Фаза 1):** Определены структуры данных и `UDataAsset`ы, содержащие базовые характеристики сущностей (Priority) и параметры эффектов. Определен `EPolyeAttributeType::Priority` для модификации Приоритета эффектами (напр., Taunt). Создан Менеджер Данных.
*   **Система Сущностей и Эффектов (Фаза 1, 2, 5, 6):** Определены базовые сущности (`ABoardEntityBase` с `Priority`, компонентом `UPolyeEffectManagerComponent`). `UPolyeEffectManagerComponent` может получать эффективные атрибуты (`GetEffectiveAttributeValue`) и управлять эффектами. `UPolyeGameplayEffectBase` и его наследники могут модифицировать атрибут `EPolyeAttributeType::Priority` (например, эффект Taunt). `AUnit` и `AStructure` наследуют от `ABoardEntityBase`.
*   **Игровое Поле (Фаза 2):** Реализовано логическое состояние поля (`FPolyeFieldState::BoardState` в `AGameStateBase`), система идентификации полей. Сущности привязаны к полю.
*   **Фаза 4.1: Боевой Цикл:** Принято решение об Автоматическом Бое. Создан центральный серверный менеджер боя (`UPolyeCombatManager`), принадлежащий `AGameStateBase` (рекомендовано).
*   **Фаза 4.2: Система Атак (Логика Индивидуальной Атаки):** В `UPolyeCombatManager` намечена функция `FindPotentialTargets` (находит всех врагов в радиусе атаки) и реализована функция `SelectTarget` (выбирает одну цель из потенциальных), которая содержит скелет логики Приоритета и правила "за Юнитом". Реализована функция `ResolveAttack` для нанесения урона.

**Ключевые Компоненты и Их Роли в Этом Пункте:**

*   **`UPolyeCombatManager` (Сервер):** Является исполнителем логики выбора цели. В нем находится функция `SelectTarget`, которая реализует все правила Приоритета и фильтрации целей.
*   **`ABoardEntityBase` (Сервер):** Каждая сущность на поле имеет базовый Приоритет (`Priority`) и компонент `UPolyeEffectManagerComponent` для получения *эффективного* Приоритета (с учетом Taunt).
*   **`UPolyeEffectManagerComponent` (Сервер):** Предоставляет функцию `GetEffectiveAttributeValue(EPolyeAttributeType::Priority, BasePriority)` для расчета Приоритета с учетом активных эффектов (напр., эффект Taunt, который увеличивает Приоритет).
*   **`AGameStateBase` (Сервер):** Предоставляет актуальное состояние доски (`BoardState`), необходимое для `UPolyeCombatManager::SelectTarget` при проверке правила "нельзя атаковать Строение за Юнитом" (нужно получить список сущностей на поле цели).
*   **`UPolyeGameplayEffectBase` & Наследники (Сервер):** Реализуют эффекты (напр., Taunt), которые модифицируют атрибут `EPolyeAttributeType::Priority`, влияя на выбор цели.

**Шаги Реализации:**

Как уже было отмечено, основная логика Приоритета и правила "Юнит > Строение" и "Нельзя атаковать Строение за Юнитом" реализуется **внутри функции `UPolyeCombatManager::SelectTarget`**, которая была намечена и частично описана в Пункте 4.2, Шаг 1.

Здесь мы подробно опишем шаги этой логики внутри `SelectTarget`, дополняя то, что было сказано ранее.

1.  **Инициализация и Получение Потенциальных Целей:**
    *   **Роль:** Подготовить функцию `SelectTarget` к работе, получив список всех вражеских сущностей в радиусе атаки.
    *   **Действие:** Функция `SelectTarget` принимает `const AUnit* Attacker` и `const TArray<ABoardEntityBase*>& PotentialTargets`. `PotentialTargets` - это результат вызова `FindPotentialTargets`, который находит всех живых вражеских сущностей в пределах `Attacker->AttackRange`.
    *   **Обоснование:** Это входные данные для логики выбора.
    *   **Outcome:** Функция `SelectTarget` получает список всех потенциальных целей.

2.  **Определение Эффективного Приоритета и Поиск Целей с Наивысшим Приоритетом (Реализация Taunt):**
    *   **Роль:** Найти среди всех потенциальных целей те, которые имеют самый высокий Приоритет. Это реализует механику Taunt: цели с Taunt атакуются в первую очередь.
    *   **Действие:**
        *   Инициализировать переменную `HighestPriority` (напр., в -1) и пустой список `TargetsWithHighestPriority`.
        *   Итерировать по всем сущностям в `PotentialTargets`.
        *   Для каждой `TargetEntity`:
            *   Получить ее Приоритет, учитывая эффекты: `int32 EffectivePriority = TargetEntity->GetEffectManagerComponent()->GetEffectiveAttributeValue(EPolyeAttributeType::Priority, TargetEntity->Priority);` (Это предполагает, что эффект Taunt модифицирует `EPolyeAttributeType::Priority` до очень высокого значения).
            *   Если `EffectivePriority > HighestPriority`: Очистить `TargetsWithHighestPriority`, установить `HighestPriority = EffectivePriority`, добавить `TargetEntity` в `TargetsWithHighestPriority`.
            *   Если `EffectivePriority == HighestPriority`: Добавить `TargetEntity` в `TargetsWithHighestPriority`.
    *   **Обоснование Реализации:** Использование `GetEffectiveAttributeValue` позволяет эффектам (таким как Taunt, реализованный как эффект, модифицирующий Приоритет) напрямую влиять на выбор цели. Нахождение всех целей с одинаковым наивысшим Приоритетом необходимо, потому что таких целей может быть несколько.
    *   **Outcome:** Список `TargetsWithHighestPriority` содержит все сущности из `PotentialTargets`, которые имеют наивысший эффективный Приоритет.

3.  **Реализация Правила Юнит > Строение:**
    *   **Роль:** Среди целей с одинаковым наивысшим Приоритетом (найденных на предыдущем шаге), отдать предпочтение Юнитам перед Строениями.
    *   **Действие:**
        *   Создать два временных списка: `HighestPriorityUnits` и `HighestPriorityStructures`.
        *   Итерировать по `TargetsWithHighestPriority`.
        *   Если сущность является `AUnit`, добавить ее в `HighestPriorityUnits`.
        *   Если сущность является `AStructure`, добавить ее в `HighestPriorityStructures`.
        *   **Если `HighestPriorityUnits` не пуст:** Использовать этот список для следующего шага фильтрации (правило "за Юнитом").
        *   **Иначе (если `HighestPriorityUnits` пуст, но `HighestPriorityStructures` не пуст):** Использовать список `HighestPriorityStructures` для следующего шага.
    *   **Обоснование Реализации:** Это специфическое правило Polye. Проверка, какой из списков (Юниты или Строения с наивысшим приоритетом) не пуст, позволяет отдать предпочтение Юнитам.
    *   **Outcome:** Определен список целей (только Юниты с наивысшим Приоритетом, или только Строения с наивысшим Приоритетом, если Юнитов нет), который будет использоваться для следующего этапа фильтрации (правило "за Юнитом").

4.  **Реализация Правила "Нельзя атаковать Строение, если на его поле есть вражеский Юнит":**
    *   **Роль:** Добавить фильтр, который исключает Строения, находящиеся на поле, где есть вражеский Юнит (если только это Строение не имеет Taunt).
    *   **Что Хранить Здесь:** Ничего. Логика читает состояние поля из `GameState`.
    *   **Действие:**
        *   Этот шаг применяется только если список целей, прошедших предыдущие фильтры (Приоритет и Юнит > Строение), состоит ИЗ СТРОЕНИЙ (т.е. мы работаем со списком `HighestPriorityStructures`).
        *   Создать финальный список допустимых целей `ViableTargets`.
        *   Итерировать по списку Строений с наивысшим Приоритетом (`HighestPriorityStructures`).
        *   Для каждого `StructureTarget`:
            *   Проверить, имеет ли это Строение Taunt (т.е. его `EffectivePriority` выше стандартного максимального Приоритета Юнитов). **Важно:** Нужно определить пороговое значение для Taunt Приоритета.
            *   Если Строение **не** имеет Taunt: Проверить `AGameStateBase::BoardState[StructureTarget->FieldIndex].EntitiesOnField`. Итерировать по сущностям на этом поле и искать живых вражеских Юнитов (`Cast<AUnit>`, `Entity->OwningPlayerState != Attacker->OwningPlayerState`, `Entity->IsAlive()`). Если найден хотя бы один такой Юнит, это `StructureTarget` **не** добавляется в `ViableTargets`.
            *   Если Строение **имеет Taunt** ИЛИ на его поле **нет** вражеских Юнитов: Добавить `StructureTarget` в `ViableTargets`.
        *   Если список, прошедший фильтры Приоритета и Юнит > Строение, состоял ИЗ ЮНИТОВ (т.е. мы работали со списком `HighestPriorityUnits`), то правило "за Юнитом" к ним не применяется. Все Юниты из этого списка добавляются в `ViableTargets`.
    *   **Обоснование Реализации:** Это еще одно специфическое правило Polye. Проверка сущностей на поле цели требует доступа к `GameState::BoardState`. Определение, имеет ли Строение Taunt, важно, т.к. Taunt переопределяет это правило.
    *   **Outcome:** Список `ViableTargets` содержит все сущности, которые прошли фильтры Приоритета, Юнит > Строение, и правило "нельзя атаковать Строение за Юнитом".

5.  **Финальный Выбор из Оставшихся Целей:**
    *   **Роль:** Выбрать одну финальную цель из списка `ViableTargets`, если в нем оказалось несколько сущностей.
    *   **Действие:** Если `ViableTargets.Num() > 0`, выбрать одну сущность из этого списка по дополнительному правилу Polye (напр., ближайшая к атакующему, случайная, с наименьшим HP). Вернуть выбранную сущность.
    *   **Обоснование:** Если после всех правил фильтрации остается несколько равноправных целей, нужно детерминировано или случайно выбрать одну.
    *   **Outcome:** Функция `SelectTarget` возвращает одну финальную цель для атаки или `nullptr`.

**Связь с Кодом (UPolyeCombatManager::SelectTarget):**

Вся описанная логика реализуется в функции `UPolyeCombatManager::SelectTarget`, которая уже была намечена и частично заполнена в пункте 4.2, шаг 1.

```cpp
// Board/PolyeCombatManager.cpp (Полная реализация SelectTarget, объединяя логику Приоритета и правила)

ABoardEntityBase* UPolyeCombatManager::SelectTarget(const AUnit* Attacker, const TArray<ABoardEntityBase*>& PotentialTargets) const
{
    if (!IsValid(Attacker) || PotentialTargets.Num() == 0) return nullptr;

    if (bDebugCombat) UE_LOG(LogTemp, Log, TEXT("SelectTarget для %s. Потенциальных целей: %d"), *Attacker->GetName(), PotentialTargets.Num());

    APolyeGameStateBase* GS = GetGameState();
    if (!GS) return nullptr;

    TArray<ABoardEntityBase*> HighestPriorityTargets; // Цели с наивысшим эффективным приоритетом

    // 1. Найти цели с наивысшим Приоритетом (включая Taunt)
    int32 HighestPriority = -1; // Приоритет не может быть отрицательным

    for (ABoardEntityBase* Target : PotentialTargets)
    {
        if (!IsValid(Target) || !Target->IsAlive()) continue; // Пропускаем невалидные или мертвые цели

        // Получить эффективный Приоритет с учетом эффектов (напр., Taunt).
        // EPolyeAttributeType::Priority должен быть определен.
        // Эффект Taunt должен модифицировать этот атрибут до очень высокого значения.
        int32 EffectivePriority = Target->GetEffectManagerComponent()->GetEffectiveAttributeValue(EPolyeAttributeType::Priority, Target->Priority);

        if (EffectivePriority > HighestPriority)
        {
            HighestPriority = EffectivePriority;
            HighestPriorityTargets.Empty(); // Очищаем список и начинаем заново с новым наивысшим
            HighestPriorityTargets.Add(Target);
        }
        else if (EffectivePriority == HighestPriority)
        {
            HighestPriorityTargets.Add(Target); // Добавляем цели с таким же наивысшим приоритетом
        }
    }

    if (HighestPriorityTargets.Num() == 0) return nullptr; // Нет валидных целей даже после Приоритета


    // 2. Реализовать правило Юнит > Строение среди целей с наивысшим приоритетом
    TArray<ABoardEntityBase*> TopPriorityUnits;
    TArray<ABoardEntityBase*> TopPriorityStructures;

    for (ABoardEntityBase* Target : HighestPriorityTargets)
    {
         if (Cast<AUnit>(Target))
         {
              TopPriorityUnits.Add(Target);
         }
         else if (Cast<AStructure>(Target))
         {
              TopPriorityStructures.Add(Target);
         }
    }

    // Выбираем список целей для дальнейшей фильтрации (сначала Юниты, если есть)
    TArray<ABoardEntityBase*>* TargetsAfterUnitPreference = &TopPriorityUnits; // По умолчанию выбираем Юнитов
    if (TopPriorityUnits.Num() == 0)
    {
        TargetsAfterUnitPreference = &TopPriorityStructures; // Если Юнитов нет, выбираем Строения
    }

    if (TargetsAfterUnitPreference->Num() == 0) return nullptr; // Нет целей после фильтрации по типу


    TArray<ABoardEntityBase*> ViableTargets; // Финальный список допустимых целей

    // 3. **РЕАЛИЗАЦИЯ ПРАВИЛА "НЕЛЬЗЯ АТАКОВАТЬ СТРОЕНИЕ, ЕСЛИ НА ЕГО ПОЛЕ ЕСТЬ ВРАЖЕСКИЙ ЮНИТ"**
    //    Это правило применяется только к целям, которые являются Строениями.
    //    Оно может быть переопределено, если у Строения есть Taunt (наивысший приоритет).

    if (TargetsAfterUnitPreference == &TopPriorityStructures) // Если мы работаем со списком Строений
    {
         // TODO: Определить пороговое значение Приоритета для Taunt.
         //       Например, если эффект Taunt устанавливает Приоритет в 1000, то Taunt > 500.
         const int32 TAUNT_PRIORITY_THRESHOLD = 500; // Пример порогового значения

         for (ABoardEntityBase* StructureTarget : *TargetsAfterUnitPreference) // Итерируем по Строениям, прошедшим предыдущие фильтры
         {
              if (!IsValid(StructureTarget) || !StructureTarget->IsAlive()) continue;

              // Проверяем, имеет ли Строение Taunt.
              int32 StructureEffectivePriority = StructureTarget->GetEffectManagerComponent()->GetEffectiveAttributeValue(EPolyeAttributeType::Priority, StructureTarget->Priority);
              bool bStructureHasTaunt = (StructureEffectivePriority > TAUNT_PRIORITY_THRESHOLD); // Пример проверки Taunt

              // Проверяем, есть ли на поле этого Строения вражеские Юниты.
              bool bEnemyUnitOnField = false;
              if (GS->BoardState.IsValidIndex(StructureTarget->FieldIndex))
              {
                   const FPolyeFieldState& FieldState = GS->BoardState[StructureTarget->FieldIndex];
                   for (ABoardEntityBase* EntityOnField : FieldState.EntitiesOnField)
                   {
                        // Если на поле есть Юнит, который является вражеским (не принадлежит атакующему)
                        if (IsValid(EntityOnField) && EntityOnField->IsAlive() && Cast<AUnit>(EntityOnField) && EntityOnField->OwningPlayerState != Attacker->OwningPlayerState)
                        {
                             // И этот вражеский Юнит не имеет меньший приоритет ИЗ-ЗА Taunt на Строении.
                             // Если Строение имеет Taunt, оно все равно может быть целью, игнорируя Юнитов.
                             // Если Строение НЕ имеет Taunt, наличие ЛЮБОГО вражеского Юнита на его поле блокирует атаку на Строение.
                             // Упрощение MVP: Если Строение НЕ имеет Taunt, и на его поле есть ЛЮБОЙ вражеский Юнит, Строение нельзя атаковать.
                             if (!bStructureHasTaunt)
                             {
                                  bEnemyUnitOnField = true;
                                  if (bDebugCombat) UE_LOG(LogTemp, Log, TEXT("Строение %s на поле %d защищено вражеским юнитом на том же поле."), *StructureTarget->GetName(), StructureTarget->FieldIndex);
                                  break; // Нашли защищающего Юнита, это Строение нельзя атаковать (если нет Taunt)
                             }
                        }
                   }
              }

              // Если Строение имеет Taunt ИЛИ на его поле нет вражеских Юнитов, оно может быть целью.
              if (!bEnemyUnitOnField || bStructureHasTaunt)
              {
                   ViableTargets.Add(StructureTarget); // Добавляем в список допустимых целей
              }
         }
    }
    else // Если мы работаем со списком Юнитов (TargetsAfterUnitPreference == &TopPriorityUnits)
    {
         // Юнитов можно атаковать, даже если на их поле есть другие сущности.
         // Просто копируем Юнитов, прошедших предыдущие фильтры, в ViableTargets.
         ViableTargets.Append(*TargetsAfterUnitPreference);
    }


    if (ViableTargets.Num() == 0)
    {
        if (bDebugCombat) UE_LOG(LogTemp, Log, TEXT("Нет допустимых целей после всех правил фильтрации."));
        return nullptr; // Нет целей после всех правил
    }


    // 4. Выбрать одну цель из оставшегося списка ViableTargets (с одинаковым наивысшим приоритетом и прошедших правила)
    ABoardEntityBase* FinalTarget = nullptr;
    // TODO: Реализовать дополнительное правило выбора (ближайший, случайный, наименьшее HP)
    //       - Ближайший: Требует расчета расстояния до каждого TargetEntity->FieldIndex с помощью UPolyeBoardStatics.
    //       - Наименьшее HP: Требует сравнения TargetEntity->CurrentHP.
    //       - Случайный: Использует FMath::RandRange.

    // MVP (Просто случайный выбор среди ViableTargets)
    int32 RandomIndex = FMath::RandRange(0, ViableTargets.Num() - 1);
    FinalTarget = ViableTargets[RandomIndex];

    if (bDebugCombat) UE_LOG(LogTemp, Log, TEXT("Выбрана финальная цель: %s"), FinalTarget ? *FinalTarget->GetName() : TEXT("NULL"));

    return FinalTarget;
}
```

**Тестирование:**

*   **Базовый Приоритет:** Разместить Юнитов и Строения с разным базовым Приоритетом (без эффектов). Убедиться, что атакующий всегда выбирает цель с более высоким Приоритетом.
*   **Юнит vs Строение:** Разместить Юнита и Строение с одинаковым базовым Приоритетом в радиусе атаки. Убедиться, что атакующий выберет Юнита.
*   **Taunt:** Создать эффект Taunt (который сильно увеличивает Приоритет). Применить его к Юниту и/или Строению. Убедиться, что сущность с Taunt выбирается в первую очередь, даже если ее базовый Приоритет ниже.
*   **Правило "За Юнитом":**
    *   Разместить вражеское Строение в радиусе атаки. Атакующий должен выбрать его.
    *   Разместить вражеский Юнит на *том же поле*, что и вражеское Строение, в радиусе атаки. Убедиться, что атакующий выберет Юнита, а не Строение (если у Строения нет Taunt).
    *   Разместить вражеское Строение с Taunt на поле, где есть вражеский Юнит. Убедиться, что атакующий выберет Строение с Taunt.
*   **Несколько Целей:** Разместить несколько целей с одинаковым наивысшим Приоритетом, которые прошли все фильтры. Убедиться, что выбор происходит согласно дополнительному правилу (напр., случайный выбор в MVP).
*   **Граничные Случаи:** Проверить выбор цели на краях доски. Проверить, что мертвые или невалидные сущности игнорируются.

**Ключевые Соображения:**

*   **Определение Taunt:** Как именно эффект Taunt увеличивает Приоритет (фиксированное значение, множитель)? Это должно быть четко определено в дизайне и реализовано в наследнике `UPolyeGameplayEffectBase` для Taunt и в `GetEffectiveAttributeValue`.
*   **Сложные Взаимодействия Приоритета и Правил:** Взаимодействие Приоритета, правила Юнит > Строение и правила "за Юнитом" может быть сложным. Убедитесь, что порядок фильтрации в `SelectTarget` соответствует дизайну игры. Текущий порядок: Наивысший Приоритет -> Юнит > Строение (среди наивысших) -> Правило "за Юнитом" (для Строений, прошедших до этого).
*   **Дополнительные Правила Выбора:** Если финальное правило не случайное (например, ближайший), необходимо реализовать эту логику в конце `SelectTarget` и убедиться, что она детерминирована (например, при одинаковом расстоянии выбрать по FieldIndex).
