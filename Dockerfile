FROM nginx

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY pet-connect-frontend/build/ /usr/share/nginx/html