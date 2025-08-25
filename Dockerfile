#import the base operating system image 
FROM node:18-alpine

 #setup the working directory
WORKDIR /app

 #copy the package.json and the project dependencies
COPY package*.json ./


#copy all the app files
COPY . .


#exposing the application port
EXPOSE 3000

#start the application
CMD ["node", "app.js"]