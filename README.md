# Condo_back

## service api

### /auth

| path                    | method | authen?      | validate?              | params | req.body                                                                   | status code | res                                                            | remark                         |
| ----------------------- | ------ | ------------ | ---------------------- | ------ | -------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------- | ------------------------------ |
| /register               | POST   | ---          | validate (joi)         | ---    | {username, password, confirmPassword, firstName, lastName, email, mobile?} | 200         | {token}                                                        | token = {user}                 |
|                         |        |              |                        |        |                                                                            | 403         | {message: "EMAIL_IN_USE", ref: "403_FORBIDDEN"}                |                                |
|                         |        |              |                        |        |                                                                            | 403         | {message: "MOBILE_IN_USE", ref: "403_FORBIDDEN"}               |                                |
|                         |        |              |                        |        |                                                                            | 403         | {message: "USERNAME_IN_USE", ref: "403_FORBIDDEN"}             |                                |
| /register/agent         | POST   | ---          | validate (joi)         | ---    | {username, password, confirmPassword, firstName, lastName, email, mobile}  | 200         | {token}                                                        | token = {user}                 |
|                         |        |              |                        |        |                                                                            | 403         | {message: "EMAIL_IN_USE", ref: "403_FORBIDDEN"}                |                                |
|                         |        |              |                        |        |                                                                            | 403         | {message: "MOBILE_IN_USE", ref: "403_FORBIDDEN"}               |                                |
|                         |        |              |                        |        |                                                                            | 403         | {message: "USERNAME_IN_USE", ref: "403_FORBIDDEN"}             |                                |
| /login                  | POST   | ---          | validate with database | ---    | { username, password }                                                     | 200         | {token}                                                        | token = {user}                 |
|                         |        |              |                        |        |                                                                            | 400         | {message: "username or password is wrong", ref: "WRONG_INPUT"} | not found username in database |
|                         |        |              |                        |        |                                                                            | 400         | {message: "username or password is wrong", ref: "WRONG_INPUT"} | password not match in database |
| / (not complete yet)    | GET    | authenticate | ---                    | ---    | ---                                                                        | 200         | {users}                                                        | get all users data             |
| /:id (not complete yet) | GET    | authenticate | ---                    | id     | ---                                                                        | 200         | {user}                                                         | get user data by id            |
| /:id (not complete yet) | PATCH  | authenticate | ---                    | id     | {email, firstName, lastName, mobile }                                      | 200         | {user}                                                         |                                |
| /:id (not complete yet) | DELETE | authenticate | ---                    | id     | ---                                                                        | 200         | ---                                                            |                                |

### /user

| path             | method | authen? | validate? | params | req.body | status code | res    | remark |
| ---------------- | ------ | ------- | --------- | ------ | -------- | ----------- | ------ | ------ |
| /profile/:userId | GET    |         | userId    | userId |          | 200         | {user} |        |

### /post

| path             | method | authen?                                    | validate?       | params  | req.body                                                                                                                                                                                                                                                           | status code | res                                                                            | remark |
| ---------------- | ------ | ------------------------------------------ | --------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------ | ------ |
| /                | POST   | agent                                      | validate (joi)  | ---     | {nameTh, nameEn, location (address), district, province, lat, long, roomNumber, roomSize, Floor, Building, isAvailable, price, description, condoImage: [imageFiles], roomImages: [imageFiles], roomImageList: [{id, url, file?}], roomFacilityList: [facilityId]} | 201         | {id: postId, req.body}                                                         |        |
| /:condoId        | PUT    | agent,condo existed?, agent ต้องมี condoId | validate (joi)  | condoId | ""                                                                                                                                                                                                                                                                 | 200         | {req.body}                                                                     |        |
| /:condoId        | DELETE | agent,condo existed?, agent ต้องมี condoId | ---             | condoId | ---                                                                                                                                                                                                                                                                | 204         |                                                                                |        |
| /                | GET    |                                            | ---             |         | ---                                                                                                                                                                                                                                                                | 204         | {posts:[ post {user, room: {condo, roomImages, roomFacilities: {facility}}}] } |        |
| /:postId         | GET    |                                            | validate postId | postId  | ---                                                                                                                                                                                                                                                                | 204         | post {user, room: {condo, roomImages, roomFacilities: {facility}}}             |        |
| /profile/:userId | GET    |                                            | validate userId | userId  | ---                                                                                                                                                                                                                                                                | 204         | posts: [ {room: {condo, roomImages, roomFacilities: {facility}}}]              |        |

### /select

| path        | method | authen? | validate? | params | req.body | status code | res                                                           | remark |
| ----------- | ------ | ------- | --------- | ------ | -------- | ----------- | ------------------------------------------------------------- | ------ |
| /districts  | GET    | ---     | ---       | ---    | ---      | ---         | {districts: [ {id: 1 , district: "คลองสาน"}, { }, { }, { } ]} |        |
| /provinces  | GET    | ---     | ---       | ---    | ---      | ---         | {provinces: [ {id: 1 , province: "กรุงเทพมหานคร"} ]}          |        |
| /facilities | GET    | ---     | ---       | ---    | ---      | ---         | {facilities: [ {id: 1 , name: "Kitchen"}, { }, { }, { } ]}    |        |

# From template

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Create Database

```bash
# change directory to db
$ cd db
# run commande sequence to build database postgres on docker at port 5555
$ docker-compose up --build
```

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

-   Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
-   Website - [https://nestjs.com](https://nestjs.com/)
-   Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Prisma

```bash
# Generate prisma
$ pnpx prisma generate

# Migrate table and create new migration version + seed
$ pnpx prisma migrate dev

# To sync database depend on schema.prisma file without creating migration version
$ pnpx prisma db push
```
