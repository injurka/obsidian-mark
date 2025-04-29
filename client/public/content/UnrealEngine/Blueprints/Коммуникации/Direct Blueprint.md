Ниже у нас есть два **Blueprints** на нашем уровне, которые мы хотим, чтобы они общались друг с другом. Предположим, мы хотим, чтобы Blueprint куба передал команду Blueprint искр, чтобы отключить себя, когда игровой персонаж входит в куб. Это легко можно сделать с помощью **Direct Blueprint Communications**.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e0725c2-4c55-4293-9c20-db98250244fb/2_1.png)

- Куб выше — это Blueprint, созданный с использованием меша **Shape_Cube**, и его коллизия установлена на **OverlapOnlyPawn**, чтобы он действовал как триггер. Также включите **Generate Overlap Events**.
- Искры выше — это актив **Blueprint_Effect_Sparks** (включен в стартовый контент).

Используя Direct Blueprint Communication, мы сделаем следующее:

1. В Blueprint **Shape_Cube**, под **My Blueprint** нажмите кнопку ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cacdaab-9a4e-4f46-b13b-641e3a1dfcc7/plus_button.png) в категории Variables: ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16e1d161-04b2-42d5-bdd3-15acd31e21fe/myblueprint_variable.png)
    
2. В панели **Details**, под **Variable Type** выберите тип Blueprint, к которому вы хотите получить доступ.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a54a1c6-7e4a-4793-8c91-f7deaab5b664/2_3.png)
    
    Наведите курсор на **Blueprint_Effects_Sparks** Variable Type и выберите **Reference** из списка.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9e1578b-c2eb-4cb6-bf19-7639e750adb2/2_3_1.png)
    
    Здесь мы указываем, что хотим получить доступ к Blueprint **Blueprint_Effect_Sparks**.
    
3. В панели **Details** обновите разделы, выделенные ниже.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a491c261-8dfe-4b5a-b18c-4c69af17c158/2_4.png)
    1. **Variable Name** — дайте переменной описательное имя, например **TargetBlueprint**.
    2. **Variable Type** — это должен быть тип Blueprint, к которому вы хотите получить доступ.
    3. **Editable** — убедитесь, что это отмечено, чтобы переменная была видна и публичной, что позволит вам получить к ней доступ в редакторе уровней.
    4. **Tool Tip** — добавьте краткое описание того, что делает переменная или на что она ссылается.
4. С выбранным Blueprint **Shape_Cube** на уровне, в редакторе уровней под **Details** вы должны увидеть переменную, созданную на предыдущем шаге.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2aa2a47-4d36-4834-b764-6a11f0e1e43f/2_6.png)
    
    1. Нажмите на выпадающий список **None**, чтобы назначить Target Blueprint.
    2. Здесь отображаются все экземпляры Blueprint, размещенные на уровне, что позволяет вам указать, какой экземпляр является **Target Blueprint**.
    
    Здесь мы указываем, какой экземпляр Blueprint **Blueprint_Effect_Sparks** мы хотим затронуть, который размещен на нашем уровне; это считается экземпляром актера. Если у нас было несколько искр на уровне, и мы хотели бы отключить только одну из них, мы могли бы выбрать, какой экземпляр Blueprint мы хотим затронуть, установив его как **Target Blueprint**.
    
5. Вместо использования выпадающего списка, вы можете нажать на значок ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de287f40-ae68-41cc-9307-b5739a6bf3c3/2_7.png), а затем нажать на объект, который вы хотите ссылаться, размещенный на вашем уровне.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/806dd9af-daa5-43f9-bb68-f0adfde2e9c4/2_8.png)
    
    Вы можете установить **Target Blueprint** только на указанный тип переменной (в нашем случае **Blueprint_Effect_Sparks**).
    
6. В Blueprint **Shape_Cube**, удерживая нажатой клавишу **Ctrl**, перетащите переменную в граф.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c248bab1-af2d-4022-aac1-0999446ccb9a/2_9.png)
    
    1. Это создает узел Getter, который позволяет вам получить доступ к событиям, переменным, функциям и т.д. из **Target Blueprint**.
    2. Перетащитесь с выходного пина, чтобы просмотреть контекстное меню.
    
    Здесь мы ищем компоненты эффекта искр и звука искр из нашего **Target Blueprint**, так как мы хотим получить доступ к этим компонентам.
    
7. Пример скрипта ниже указывает, что когда игрок входит в куб, деактивируйте эффект искр и звук искр.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfa4c438-effd-4dff-a3e7-c450116c5333/2_10.png)

## Источники
- #### [dev.epicgames](https://dev.epicgames.com/documentation/en-us/unreal-engine/blueprint-communications-in-unreal-engine)
