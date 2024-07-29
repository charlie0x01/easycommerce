# Dockerfile
# use an official Node.js runtime as a parent image
FROM node:alpine

# Setup a working directory
WORKDIR /app

# Set the package.json and yarn.lock files to the working directory
COPY package.json yarn.lock ./

# Install app dependencies
RUN npm install -g yarn --force
RUN yarn install

# copy the entire app directory to the working directory in the container
COPY . .

# Expose Port
EXPOSE 8000

# Start the app
CMD ["yarn", "run", "dev"]