FROM nginx:stable-alpine

COPY react-docker/build/ /usr/share/nginx/html 
