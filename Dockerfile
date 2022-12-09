FROM ubuntu:22.10
WORKDIR /user/src/app
COPY package*.json ./
RUN apt-get update -y
RUN apt-get install nodejs npm -y
CMD ["lsb_release","-a"]
RUN npm install
CMD ["node", "--version"]
COPY . .
RUN pwd
RUN ls -lh
EXPOSE 3000
RUN node server.js
