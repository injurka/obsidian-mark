Wandering the internet in search of knowledge

![image](https://github.com/injurka/obsidian-mark/assets/102309602/cec0bfd8-ea58-4ec3-969c-5fa41d8467eb)

![image](https://github.com/user-attachments/assets/400dcb60-2a3d-44c1-b2de-438791d91064)

<!-- 
> ssh root@62.60.236.182
> cd sources/chinisik-back/static
> rm -rf wander-mark
> bun run ./.obsidian/scripts/auto.ts
> scp -r ./.output root@62.60.236.182:/root/sources/chinisik-back/static/wander-mark
-->

<!-- 
# Архивируем директорию локально
tar -czf wander-mark.tar.gz ./.output

# Передаем архив на сервер
scp wander-mark.tar.gz root@62.60.236.182:/root/sources/chinisik-back/static/

# Подключаемся к серверу и распаковываем
ssh root@62.60.236.182 "cd /root/sources/chinisik-back/static/ && tar -xzf wander-mark.tar.gz && mv .output wander-mark && rm wander-mark.tar.gz" 
-->
