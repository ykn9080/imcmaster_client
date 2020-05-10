# FROM nginx:1.15.2-alpine
# COPY ./build /var/www
# COPY nginx.conf /etc/nginx/nginx.conf
# EXPOSE 8080
# ENTRYPOINT ["nginx","-g","daemon off;"]


#Build Stage Start

#Specify a base image
FROM node:alpine as builder 

#Specify a working directory
WORKDIR '/app'

#Copy the dependencies file
COPY package.json .

#Install dependencies
RUN npm install

#Copy remaining files
COPY . .

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080

#Build the project for production
#RUN npm run build 

#Run Stage Start
FROM nginx

#Copy production build files from builder phase to nginx
COPY --from=builder /app/build /usr/share/nginx/html