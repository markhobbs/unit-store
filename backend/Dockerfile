FROM node:13.12.0-alpine
# set a health check
#HEALTHCHECK --interval=5s \
#            --timeout=5s \
#            CMD curl -f http://127.0.0.1:8080 || exit 1

WORKDIR /app
COPY ./package*.json ./
COPY config.js ./
# RUN npm ci
RUN npm install --quiet
COPY . .
RUN chown -R node:node /app
USER node
EXPOSE 3001
#CMD npm start CMD 

# CMD npm start
CMD [ "node", "server.js" ]
