- Приобрести VPS / VDS на базе ядра linux (желательно Ubuntu / Debian, на них все заводится и меньше заморочек). Я в основном использовал vdsina.ru, но подойдет любой другой.

- Подключится по ssh к приобретенному серверу.

- Предустановить все необходимые пакеты которые понадобятся, как минимум это должен быть docker

- Поставить Portainer(веб-приложение для управления контейнерами) через docker
> https://docs.portainer.io/start/install/server/docker/linux

```bash
  docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ee:latest
```

- После запуска Portainer, у нас появится возможность подключится на него удаленно через браузер: 
> https://ip-выделенного-сервера:9443

- Однако, если хочется подключаться по доменному имени, а также иметь реверс прокси и доменны третьего уровня, то придется купить домен(подойдет совершенно любой). Я использовал для этого сайт reg.ru

- К домену привязываем ip нашего сервера и прописываем под-доменные имена которые желаем

- После того как приобрели стоит поставить реверс-прокси. Можно воспользоваться nginx, по крайней мере я его использовал.
  
```bash
  sudo apt install certbot python3-certbot-nginx

  sudo ufw allow 'Nginx Full'
  sudo ufw delete allow 'Nginx HTTP'

  sudo systemctl reload nginx
```

- Теперь его нужно настроить, а если точнее, то изменить два файла.


в  `/etc/nginx/nginx.conf` должно быть следующее:

```conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /var/log/nginx/error.log;
include /etc/nginx/modules-enabled/*.conf;

events {
    worker_connections 768;
}

http {
    sendfile on;
    tcp_nopush on;
    types_hash_max_size 2048;

    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; # Dropping SSLv3, ref: POODLE
    ssl_prefer_server_ciphers on;

    access_log /var/log/nginx/access.log;

    gzip on;

    client_max_body_size 50m;

    include /etc/nginx/conf.d/*.conf;
    include /etc/nginx/sites-enabled/*;
}
```

А в `/etc/nginx/sites-enabled/default`  должно быть следующее(вместо <домен> подставь свой, например, example.com):

# Обычный домен
```conf
server {
    listen 443 ssl;
    server_name <домен>;

    location / {
        proxy_pass http://localhost:9000;
        proxy_set_header Host $host;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}

# Домен третьего уровня
server {
    listen 443 ssl;
    server_name portainer.<домен>;

    location / {
        proxy_pass http://localhost:9443;
        proxy_set_header Host $host;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

}

# Редирект с 80(http) порта на 443(https)
server {
    if ($host = <домен>) {
        return 301 https://$host$request_uri;
    }

    if ($host = portainer.<домен>) {
        return 301 https://$host$request_uri;
    }

    listen 80;
    listen [::]:80;
    server_name <домен> portainer.<домен>;
    return 404;
}
```

После чего сохраняем изменения и проверяем на корректность конфиги командой:
`sudo nginx -t`

Если все успешно нужно перезапустить процесс nginx чтобы применить изменения
`sudo systemctl reload nginx`

Однако это не будет корректно работать без сертификатов, поэтому после перезапуска устанавливаем самоподписные сертификаты с помощью certbot
`sudo certbot --nginx -d <домен> -d prac.<домен>`

После успешной установки сертификатов нужно снова перезапустить nginx
`sudo systemctl reload nginx`
