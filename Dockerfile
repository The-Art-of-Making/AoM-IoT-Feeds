FROM node:latest
RUN apt update && apt upgrade -y && apt autoremove -y
RUN mkdir /aom-iot-feeds
WORKDIR /aom-iot-feeds
COPY backend backend
COPY frontend frontend
WORKDIR /aom-iot-feeds/backend
RUN npm run build
ENTRYPOINT [ "npm", "run", "start" ]
