FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY prisma ./prisma/ 

COPY . . 

# ENV DATABASE_URL="postgres://postgres:2002@localhost:5432/postgres"

# Install Prisma CLI and generate the client
#RUN npm install @prisma/client
RUN npx prisma generate
RUN npm run build
EXPOSE 3000

# CMD ["npm", "start"]
# Use a startup script to handle migrations
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node dist/index.js"]