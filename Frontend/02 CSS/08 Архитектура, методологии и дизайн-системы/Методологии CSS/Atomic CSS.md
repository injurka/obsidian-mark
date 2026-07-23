Атомарный CSS — это подход к архитектуре CSS, при котором предпочтение отдается небольшим, одноцелевым классам с именами, основанными на визуальной функции.

![[./_/Atomic.png]]

Также можно называть его функциональным CSS, или CSS‑утилитами. В принципе, можно сказать, что фреймворк Atomic CSS — это набор таких CSS, как эти:

> css
```css
.m-0 {
  margin: 0;
}
.text-red {
  color: red;
}
/* ... */
```

> scss
```scss
@for $i from 1 through 10 {
  .m-#{$i} {
    margin: $i / 4 rem;
  }
}
```

Фреймворки с атомарным css подходом:

- [unocss](https://unocss.dev/) 
- [tailwindcss](https://tailwindcss.com/)
-  [windicss](https://windicss.org/) deprecated

## Источники
- #### [habr1](https://habr.com/ru/articles/432586/)
- #### [habr2](https://habr.com/ru/articles/777722/)