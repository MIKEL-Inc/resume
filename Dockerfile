FROM node:10.14.0

# Create app directory
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci
# RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# EXPOSE 8080
# CMD [ "node", "server.js" ]
EXPOSE 4200
# CMD [ "npm", "start" ]

# Bypass package.json ‘s start command and bake it directly into the image itself. So instead of
# $ CMD ["npm","start"]
# you would use something like
# $ CMD ["node","server.js"]
# in your Dockerfile CMD.
# This reduces the number of processes running inside the container and it also
# causes exit signals such as SIGTERM and SIGINT to be received by the Node.js process
# instead of npm swallowing them.

ENV NODE_ENV production

CMD [ "node", "./node_modules/.bin/ng", "serve", "--host", "0.0.0.0" ]

