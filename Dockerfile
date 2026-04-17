FROM node:20-alpine

ENV NODE_ENV production

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD curl --fail http://localhost:3000 || exit 1

USER node:node

CMD ["npm", "start"]