FROM node:10.14.0-alpine

# Create app directory
WORKDIR /home/node

# Install app dependencies
RUN npm -g install serve
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# COPY package*.json ./

# RUN npm install

# # Bundle app source
# COPY src /app
# #Build react/vue/angular bundle static files
# RUN npm run build

USER node

EXPOSE 4280

# serve dist folder on port 8080
CMD ["serve", "-s", "static-web", "-p", "4280"]
