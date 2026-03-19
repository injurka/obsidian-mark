Wandering the internet in search of knowledge

![image](https://github.com/injurka/obsidian-mark/assets/102309602/cec0bfd8-ea58-4ec3-969c-5fa41d8467eb)

![image](https://github.com/user-attachments/assets/400dcb60-2a3d-44c1-b2de-438791d91064)

<!-- 
bun run ./.obsidian/scripts/auto.ts

cd .output

tar -czf payload.tar.gz content images meta

scp payload.tar.gz root@83.136.232.29:/root/sources/md-client/data

cd ..

ssh root@83.136.232.29 "cd /root/sources/md-client/data && tar -xzf payload.tar.gz && rm payload.tar.gz"
-->

<!-- 
bun run ./.obsidian/scripts/auto.ts && cd .output && tar -czf payload.tar.gz content images meta && scp payload.tar.gz root@83.136.232.29:/root/sources/md-client/data && ssh root@83.136.232.29 'cd /root/sources/md-client/data && tar -xzf payload.tar.gz && rm payload.tar.gz' && echo '✅ Деплой успешно завершен!'
-->

<!-- 
ssh root@92.63.97.81 'mkdir -p /root/sources/wander-mark/docker/vault'

bun run ./.obsidian/scripts/auto.ts \
  && cd .output \
  && tar -czf payload.tar.gz content images meta \
  && scp payload.tar.gz root@92.63.97.81:/root/sources/wander-mark/docker/vault/ \
  && ssh root@92.63.97.81 'cd /root/sources/wander-mark/docker/vault && tar -xzf payload.tar.gz && rm payload.tar.gz' \
  && echo '✅ Деплой успешно завершен!'
-->