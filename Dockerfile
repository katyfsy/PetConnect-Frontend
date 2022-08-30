FROM nginx

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY app/build/ /usr/share/nginx/html