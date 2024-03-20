FROM node:lts AS develop

WORKDIR /app

RUN npm install -g sass

COPY . /app/
RUN npm ci

RUN npm run sass-build
RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "start"]