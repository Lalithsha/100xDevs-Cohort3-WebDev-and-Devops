FROM node:22-alpine

WORKDIR /user

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["node","index.js"]