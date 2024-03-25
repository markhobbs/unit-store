FROM node:alpine
WORKDIR /app
COPY ./package*.json ./
# COPY config.js ./
RUN npm install --quiet
COPY . .
RUN chown -R node:node /app
USER node
EXPOSE 3001
CMD [ "node", "server.js" ]