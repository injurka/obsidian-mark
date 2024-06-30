## Реализация

```ts
function lazyLoadDirective(el: HTMLElement, binding: { value: string }) {
  const options: IntersectionObserverInit = {
    rootMargin: '0px 0px 200px 0px'
  };

  const callback: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = new Image();
        img.src = binding.value;
        
        img.addEventListener('load', () => {
          el.setAttribute('src', binding.value);
          el.classList.add('loaded');
        });
        
        img.addEventListener('error', () => {
          el.setAttribute('src', '/img/not-found.gif');
          el.classList.add('error');
        });

        observer.disconnect();
      }
    });
  }

  const observer = new IntersectionObserver(callback, options);

  observer.observe(el);

  return observer
}
```

## Пример использования

```ts
// Пример использования директивы
const imgElement = document.querySelector('img')!;

lazyLoadDirective(imgElement, { value: 'path/to/image.jpg' });
```