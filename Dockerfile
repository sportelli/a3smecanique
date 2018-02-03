FROM node:stretch
COPY . /app/
RUN cd /app && npm install && ./node_modules/.bin/tsc 
WORKDIR /app
CMD ["npm", "start"]