Ниже представлены четыре **Blueprints** нашего уровня: куб, который действует как триггер, эффект огня, эффект искры и подвесной светильник. Мы хотим, чтобы огонь, свет и искры проявляли себя по-разному, когда игрок входит в куб. Мы также хотим увеличить скорость передвижения персонажа каждый раз, когда он входит в куб.

![[interface1.png]]

- Куб выше — это **Blueprint**, созданный с использованием сетки **Shape_Cube**, а его столкновение установлено на **OverlapOnlyPawn**, поэтому он действует как триггер.
- Искры, изображенные выше, являются активом **Blueprint_Effect_Sparks** (входит в стартовый контент).
- Огонь, изображенный выше, является активом **Blueprint_Effect_Fire** (входит в стартовый контент).
- Индикатор выше - это актив **Blueprint_CeilingLight** (входит в состав начального контента).

Использование **Blueprint Interface** позволит нам общаться с тремя различными Blueprint'ами, а также с Blueprint'ом игрового персонажа.

Для общения с каждым из них, мы сделаем следующее:

1. В **Content Browser**, в пустом месте, **кликните правой кнопкой мыши** и выберите **Blueprints**, затем **Blueprint Interface**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e39efb85-e418-4897-8a7a-858bf26272f9/interface2.png)
2. Назовите интерфейс, **CubeInterface** (или любое другое имя), затем **дважды кликните** на него, чтобы открыть, и нажмите кнопку **Add Function**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0626bd23-40a3-4e7a-95ea-e2c5b09fffe9/interface3.png)
3. Назовите новую функцию **MagicCube** или любое другое имя, затем **Compile**, **Save** и закройте интерфейс.
    
4. Откройте Blueprint куба, затем **кликните правой кнопкой мыши** на **StaticMesh** и добавьте событие **OnComponentBeginOverlap**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc1caecd-9508-432e-8fcb-3d1cf1616266/interface4.png)
5. Создайте новую переменную **Actor** с именем **Targets** и кликните на квадрат рядом с типом переменной, чтобы сделать её **Array**, затем отметьте галочку **Editable**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf5157bb-6b2c-4e49-bf34-69b78c694316/interface5.png)
    
    Это будет хранить актеров, которые подвержены влиянию **Blueprint Interface**.
    
6. **Кликните правой кнопкой мыши** в графе и под **Interface Messages**, выберите функцию **MagicCube** (или как вы её назвали).
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ab8b9ca-7ce6-4eca-aefb-5c590eb09308/interface6.png)
7. Настройте ваш граф как показано ниже, **Compile** и **Save**, затем закройте Blueprint.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f92664b-b50f-4aa4-8d7b-658bceec140e/interface7.png)
    
    Перетащите переменную **Targets**, затем перетащите от неё, чтобы получить узел **Add**.
    
    Подключите **Targets** к узлу **MagicCube** и подключите узел **Get Player Character** к узлу **Add**.
    
8. Выберите куб на уровне, затем в панели **Details** нажмите знак + под targets и добавьте огонь, свет и искры с уровня.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45f5e06e-8495-4ac1-bab1-2f8a96241a57/interface8.png)
9. Откройте Blueprint **Blueprint_Effect_Fire**, затем нажмите кнопку **Blueprint Props** на панели инструментов.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce4c548b-c68a-4872-b7ff-e7338e57d696/interface9.png)
10. В панели **Details** под **Interfaces**, нажмите кнопку **Add**, затем выберите ваш интерфейс (**CubeInterface_C** в нашем примере).
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59d40e75-7b24-41b2-ab84-defc709a08b6/interface10.png)
11. **Кликните правой кнопкой мыши** в графе и под **Add Event**, выберите событие **Event Magic Cube**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27457bc2-87b6-468e-8772-933bb9f25356/interface11.png)
12. Всё, что следует за событием **Event Magic Cube**, будет выполнено, когда игрок войдет в куб.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd29d919-f83c-4b40-aaaf-ceab79cda08f/interface12.png)
    
    Здесь мы увеличиваем размер огня, когда игрок входит в куб, а затем сбрасываем его, когда они входят во второй раз.
    
13. Откройте Blueprint **Blueprint_CeilingLight**, нажмите **Blueprint Props**, затем добавьте интерфейс из панели **Details**, как и раньше.
    
14. **Кликните правой кнопкой мыши** в графе и добавьте событие **Event Magic Cube**, чтобы всё, что следует за событием, выполнялось, когда игрок входит в куб.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04b32719-62c1-4c2b-a7ae-b8dab8e385a7/interface15.png)
    
    Здесь мы выключаем свет, устанавливая его яркость на 0, а затем включаем, устанавливая яркость на 1500.
    
15. Повторите процесс добавления **Blueprint Props** в Blueprint **Blueprint_Effect_Sparks**, затем добавьте **CubeInterface_C**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b976a254-b7f0-4a8f-99cd-1ccecd01f0fd/interface13.png)
    
    Здесь мы перемещаем эффект искр вверх при входе в куб, а затем вниз при повторном входе в куб.
    
16. Повторите процесс добавления **Blueprint Props** в Blueprint **MyCharacter**, затем добавьте **CubeInterface_C**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8574f01c-41ee-437a-a057-7382c62feca4/interface14.png)
    
    Здесь мы увеличиваем скорость движения персонажа на 100 каждый раз, когда он входит в куб.
    

Как видно из примеров выше, используя **Blueprint Interface**, вы можете общаться с несколькими различными типами **Blueprints** одновременно, где каждый может выполнять разные функции, все исходящие из одного источника (в данном случае триггера).

Этот пример хорош для выполнения события, которое выполняет функциональность в нескольких Blueprints, однако это не единственный способ использования **Blueprint Interfaces**. В следующем разделе обсуждается, как передавать переменные между Blueprints с использованием **Blueprint Interfaces**.

## Источники
- #### [dev.epicgames](https://dev.epicgames.com/documentation/en-us/unreal-engine/blueprint-communications-in-unreal-engine)
