FROM node:14.18.0-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginxinc/nginx-unprivileged
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/authApp /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]
