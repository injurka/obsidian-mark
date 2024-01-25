
Разделение на stages

```dockerfile
# ---- Node modules ----- #
FROM node:20.9.0-bullseye-slim AS node_modules

RUN npm i bun -g
COPY ./source/package*.json ./source/bun.lockb ./
RUN bun install

# ---- Build ------------ #
FROM node:20.9.0-bullseye-slim AS dist

COPY --from=node_modules node_modules ./node_modules
COPY ./source .

RUN npm run lint
RUN npm run test:coverage
RUN npm run build

# ---- Release ---------- #
FROM gcr.io/distroless/nodejs20-debian12

COPY --from=dist dist                       dist
COPY --from=dist ./dist-server/server.cjs   server.cjs
COPY --from=dist ./helm-chart/Chart.yaml    Chart.yaml

ENV HOST 0.0.0.0
CMD [ "server.cjs" ]
```


https://itsecforu.ru/2023/01/24/obzor-luchshih-praktik-bezopasnosti-dockerfile/