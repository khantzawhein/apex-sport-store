FROM node:lts AS develop

WORKDIR /app

COPY package*.json /app/
COPY package-lock.json /app/
COPY prisma/schema.prisma /app/prisma/
RUN npm install -g sass

COPY . /app/

RUN npm ci

RUN npm run sass-build
RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start"]