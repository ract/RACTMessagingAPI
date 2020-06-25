# Get node container image on alpine linux distro
FROM node:10-alpine

# Make the work directories
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# Set the working directory
WORKDIR /home/node/app

# Copy the package defs and everything in source, dist etc (but see the .dockerignore file for exclusions)
COPY package*.json ./

# Set the user as node
USER node

# Install npm
RUN npm install

# Set user node as the owner
COPY --chown=node:node . .

# Set port 8080 as the listener port for the app
EXPOSE 8080

# Run the app on deployment
CMD [ "node", "app.js" ]