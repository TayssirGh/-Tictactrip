FROM node:21-alpine3.18
WORKDIR /api
COPY *.json ./
RUN npm install
COPY . /api/
EXPOSE 3000
CMD ["npm","start"]
