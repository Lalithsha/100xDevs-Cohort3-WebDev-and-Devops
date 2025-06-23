FROM node:22-alpine

WORKDIR /app

COPY package* ./

RUN npm install 

COPY . . 

ENV DATABASE_URL="postgres://postgres:2002@localhost:5432/postgres?schema=public"

# Install Prisma CLI and generate the client
RUN npx prisma migrate dev
RUN npx prisma generate
RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]