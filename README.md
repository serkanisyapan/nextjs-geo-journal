# Full Stack Travel Log with Next.js 13

# Tech Stack

## Backend

- [Next.js 13](https://nextjs.org/docs/getting-started)
- [MongoDB](https://www.mongodb.com/)
  - [mongodb](https://www.npmjs.com/package/mongodb)

## Shared

- [ReactJS](https://beta.reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [NextAuth](https://next-auth.js.org/)

## Frontend

- [react-map-gl](https://visgl.github.io/react-map-gl/)
- [react-hook-form](https://react-hook-form.com/)
- [Tailwind](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)

## Dev Tools

- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)
- [prettier + eslint](https://github.com/prettier/eslint-plugin-prettier)
- [zustand](https://zustand-demo.pmnd.rs/)
- [uuid](https://github.com/uuidjs/uuid)

## Utilities

- [Mapbox Free Tier](https://www.mapbox.com/)

## Running locally

Install dependencies

```sh
npm install
```

Copy `.env.sample` to `.env.local`

Add your own Map Box Token (You can get from https://www.mapbox.com/)

Get MongoDB running, either locally or can create a Project and Cluster using any online provider.

Update `DB_URL` and `DB_NAME` accordingly. (DB_NAME could stay with the default value)

Finally run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
