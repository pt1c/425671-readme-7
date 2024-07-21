# Личный проект «Readme»

* Студент: [Кирилл Савинов](https://up.htmlacademy.ru/nodejs-2/7/user/425671).
* Наставник: [Владислав Поклонский](https://htmlacademy.ru/profile/id2210683).

---

_Не удаляйте и не изменяйте папки и файлы:_
_`.editorconfig`, `.gitattributes`, `.gitignore`._

---

## Памятка

### 1. Зарегистрируйтесь на Гитхабе

Если у вас ещё нет аккаунта на [github.com](https://github.com/join), скорее зарегистрируйтесь.

### 2. Создайте форк

Откройте репозиторий и нажмите кнопку «Fork» в правом верхнем углу. Репозиторий из Академии будет скопирован в ваш аккаунт.

<img width="769" alt="Press 'Fork'" src="https://cloud.githubusercontent.com/assets/259739/20264045/a1ddbf40-aa7a-11e6-9a1a-724a1c0123c8.png">

Получится вот так:

<img width="769" alt="Forked" src="https://cloud.githubusercontent.com/assets/259739/20264122/f63219a6-aa7a-11e6-945a-89818fc7c014.png">

### 3. Клонируйте репозиторий на свой компьютер

Будьте внимательны: нужно клонировать свой репозиторий (форк), а не репозиторий Академии. Также обратите внимание, что клонировать репозиторий нужно через SSH, а не через HTTPS. Нажмите зелёную кнопку в правой части экрана, чтобы скопировать SSH-адрес вашего репозитория:

<img width="769" alt="SSH" src="https://cloud.githubusercontent.com/assets/259739/20264180/42704126-aa7b-11e6-9ab4-73372b812a53.png">

Клонировать репозиторий можно так:

```
git clone SSH-адрес_вашего_форка
```

Команда клонирует репозиторий на ваш компьютер и подготовит всё необходимое для старта работы.

### 4. Начинайте обучение!

---

<a href="https://htmlacademy.ru/profession/fullstack"><img align="left" width="50" height="50" title="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/nodejs/logo-for-github-2.png"></a>

Репозиторий создан для обучения на профессиональном онлайн‑курсе «[Node.js. Проектирование веб-сервисов](https://htmlacademy.ru/profession/fullstack)» от [HTML Academy](https://htmlacademy.ru).

npx nx generate @nx/nest:controller --directory libs/account/authentication/src/authentication-module
npx nx generate @nx/nest:service --directory libs/account/authentication/src/authentication-module
npx nx g @nx/node:library post --directory=libs/blog/post

# docker compose --file ./apps/account/docker-compose.dev.yml --env-file ./apps/account/.env --project-name "readme" up -d
docker compose --file ./apps/account/docker-compose.dev.yml up -d
docker compose --file ./apps/blog/docker-compose.dev.yml up -d

npx prisma init --datasource-provider postgresql
npx prisma format ./prisma/schema.prisma
npx prisma migrate dev --name "Added model for Post" --schema ./prisma/schema.prisma --skip-generate
 
npx nx run blog:db:lint
npx nx run blog:db:format
npx nx run blog:db:migrate -- --name="some text"
npx nx run blog:db:reset
npx nx run blog:db:generate
npx nx run blog:db:seed
