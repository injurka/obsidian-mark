```yml
pageInfo:
  title: Prosebya
  description: Я мы ты вы!
  navLinks:
    - title: /
      path: https://gitlab.infrastructure.prosebya.tech/
appConfig:
  theme: glass
  layout: vertical
  iconSize: large
  customCss: |-
    :root {
      --config-settings-background: rgba(32,38,57,1) !important;
    }
    footer {
      display: none;
    }
    .nav-outer {
      display: none;
    }
    .item-group-container {
      margin-top: 50px !important;
    }
    #filter-tiles {
      width: 250px;
    }
    body {
      background-image: linear-gradient( 112.1deg,  rgba(32,38,57,1) 11.4%, rgba(63,76,119,1) 70.2% ) !important;
    }
  customColors:
    glass:
      primary: '#fff'
      background: '#263256'
      background-darker: '#1c2645'
sections:
  - name: Useful
    icon: /shared/prosebya.png
    displayData:
      sortBy: default
      rows: 1
      cols: 1
      collapsed: false
      hideForGuests: false
    items:
      - &ref_100
        title: GitLab
        description: Исходники
        icon: /shared/gitlab.png
        url: https://gitlab.infrastructure.prosebya.tech/
        target: newtab
        id: gitlab
      - &ref_101
        title: RocketChat
        description: Место слушания
        icon: /shared/rocketchat.png
        url: https://chat.prosebya.ru/home
        target: newtab
        id: rocketchat
      - &ref_102
        title: Jira
        description: Тасочки
        icon: /shared/jira.png
        url: https://jira.prosebya.ru
        target: newtab
        id: jira
      - &ref_103
        title: Confluence
        description: Песочница аналитиков
        icon: /shared/confluence.png
        url: https://confluence.prosebya.ru/pages/viewpage.action?pageId=2314855
        target: newtab
        id: confluence
      - &ref_104
        title: Figma
        description: Айти малярство
        icon: /shared/figma.png
        url: https://www.figma.com/file/Gr1ERrSAzB6n2xWAV5ECiu/%D0%9C%D0%B0%D0%BA%D0%B5%D1%82%D1%8B-%D0%B4%D0%BB%D1%8F-%D1%80%D0%B0%D0%B7%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B8-(mobile)?type=design&node-id=0-1&mode=design
        target: newtab
        id: figma
      - &ref_105
        title: Outlook
        description: Уведомляшки
        icon: /shared/outlook.png
        url: https://mail.prosebya.ru
        target: newtab
        id: outlook
      - &ref_106
        title: ServiceDesk
        description: Тут ищут спасение
        icon: /shared/servicedesk.png
        url: https://jira.prosebya.ru/servicedesk/customer/portal/1
        target: newtab
        id: outlook
      - &ref_107
        title: Дейли
        description: с 11:30 каждый день!
        icon: /shared/zoom.png
        url: https://us06web.zoom.us/j/81613045262?pwd=FwOrk4rXzzN3jnHoHf94rbRxE4arcQ.1&from=addon
        target: newtab
        id: zoom
    filteredItems:
      - *ref_100
      - *ref_101
      - *ref_102
      - *ref_103
      - *ref_104
      - *ref_105
      - *ref_106
      - *ref_107
  - name: Frontend client dev
    icon: /shared/typescript.png
    displayData:
      sortBy: default
      rows: 1
      cols: 1
      collapsed: false
      hideForGuests: false
    items:
      - &ref_201
        title: b2b-lp
        description: Лендинг
        icon: /shared/nuxt2.png
        url: https://dev.prosebya.ru/
        target: newtab
        id: lp
      - &ref_202
        title: cms-webview
        description: Контент из cms
        icon: /shared/vue.png
        url: dev.prosebya.ru/content-webview/
        target: newtab
        id: cmswebview
      - &ref_203
        title: cms-webview-nuxt
        description: SSR контент из cms
        icon: /shared/nuxt.png
        url: https://master.mentalhealth-cms-webview-nuxt.dev.prosebya.ru/content-webview
        target: newtab
        id: cmswebviewnuxt
      - &ref_204
        title: cms-webview-demo
        description: Демочный вариант мобилки
        icon: /shared/nuxt.png
        url: https://master.mentalhealth-cms-webview-demo.dev.prosebya.ru/
        target: newtab
        id: cmswebviewdemo
      - &ref_205
        title: lk
        description: Кабинет клиента
        icon: /shared/vue.png
        url: https://lk.dev.prosebya.ru/
        target: newtab
        id: lk
      - &ref_206
        title: op
        description: Панель оператора
        icon: /shared/vue.png
        url: https://op.dev.prosebya.ru/
        target: newtab
        id: op
      - &ref_207
        title: doc
        description: Кабинет доктора
        icon: /shared/vue.png
        url: https://doc.dev.prosebya.ru/
        target: newtab
        id: doc
      - &ref_208
        title: buduweb
        description: Пейволы
        icon: /shared/vue.png
        url: https://dev.prosebya.ru/sales/showcase
        target: newtab
        id: buduweb
      - &ref_209
        title: buduwebview
        description: Опросник
        icon: /shared/nuxt2.png
        url: https://dev.prosebya.ru/webview/feedback/consultation/end/pos
        target: newtab
        id: buduwebview
      - &ref_210
        title: ui-kit
        description: Компонентики
        icon: /shared/storybook.png
        url: https://master.mentalhealth-ui-kit.dev.prosebya.ru/
        target: newtab
        id: uikit
      - &ref_211
        title: zcity
        description: Метрики prometheus
        icon: /shared/nodejs.png
        url: https://master.mentalhealth-zcity.dev.prosebya.ru/metrics
        target: newtab
        id: zcity
    filteredItems:
      - *ref_201
      - *ref_202
      - *ref_203
      - *ref_204
      - *ref_205
      - *ref_206
      - *ref_207
      - *ref_208
      - *ref_209
      - *ref_210
      - *ref_211
  - name: Backend dev swagger
    icon: /shared/csharp.png
    displayData:
      sortBy: default
      rows: 1
      cols: 1
      collapsed: false
      hideForGuests: false
    items:
      - &ref_301
        title: LkApiGateway
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-lkbuduapigateway.dev.prosebya.ru/swagger/index.html
        target: newtab
        id: lkapigateway
      - &ref_302
        title: RenCMS
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-rencms.dev.prosebya.ru/swagger/
        target: newtab
        id: rencms
      - &ref_303
        title: Auth
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-auth.dev.prosebya.ru/swagger/
        target: newtab
        id: auth
      - &ref_304
        title: PsychotestInterpretation
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-psychotestinterpretation.dev.prosebya.ru/swagger
        target: newtab
        id: psychotestinterpretation
      - &ref_305
        title: Psychotest
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-psychotest.dev.prosebya.ru/swagger
        target: newtab
        id: psychotest
      - &ref_306
        title: Doctor
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-doctor.dev.prosebya.ru/swagger
        target: newtab
        id: doctor
      - &ref_307
        title: Personalization
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-personalization.dev.prosebya.ru/swagger
        target: newtab
        id: personalization
      - &ref_308
        title: Account
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-account.dev.prosebya.ru/swagger
        target: newtab
        id: account
      - &ref_309
        title: Doctor
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-doctor.dev.prosebya.ru/swagger
        target: newtab
        id: doctor
      - &ref_310
        title: SupportTask
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-supporttask.dev.prosebya.ru/swagger
        target: newtab
        id: supporttask
      - &ref_311
        title: Telemed
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-telemed.dev.prosebya.ru/swagger
        target: newtab
        id: telemed
      - &ref_312
        title: Timetable
        description: 
        icon: /shared/swagger.png
        url: https://master.mentalhealth-timetable.dev.prosebya.ru/swagger
        target: newtab
        id: timetable
    filteredItems:
      - *ref_301
      - *ref_302
      - *ref_303
      - *ref_304
      - *ref_305
      - *ref_306
      - *ref_307
      - *ref_308
      - *ref_309
      - *ref_310
      - *ref_311
      - *ref_312
  - name: DevOps
    icon: /shared/csharp.png
    displayData:
      sortBy: default
      rows: 1
      cols: 1
      collapsed: false
      hideForGuests: false
    items:
      - &ref_401
        title: Nexus
        description: Пакетики 
        icon: /shared/nexus.png
        url: https://nexus.infrastructure.prosebya.tech
        target: newtab
        id: nexus
      - &ref_402
        title: Grafana
        description: Метрики
        icon: /shared/grafana.png
        url: https://grafana.dev.prosebya.ru/
        target: newtab
        id: grafana
    filteredItems:
      - *ref_401
      - *ref_402
```