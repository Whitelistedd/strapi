# Setup Project (Node V18)

## Setup Frontend

### Clone Project

```js
git clone https://github.com/Whitelistedd/strapi.git strapi-test
```

### install dependencies

```js
cd strapi-test && npm install
```

### change .env.example to .env

### Run project

```js
npm run dev
```

## Setup Backend (Strapi)

### create a seperate strapi project

```js
npx create-strapi-app@latest strapi-backend-test
```

### install strapi dependencies

```js
cd strapi-backend-test && npm install
```

### copy `./strapi/data.db` file to your backend project `./.tmp`

### copy `./strapi/api` folder (Copy the whole api folder) to your backend project `./src/api`

### run your backend and login

```js
npm run develop
```
