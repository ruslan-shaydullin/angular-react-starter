FROM node:16.20.2-alpine AS angular-build
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY angular/package.json angular/package-lock.json ./angular/
RUN npm ci --prefix angular --no-audit --no-fund
COPY shared ./shared
COPY scripts ./scripts
COPY angular ./angular
RUN npm --prefix angular run build

FROM nginx:1.23.0-alpine AS angular
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=angular-build /workspace/angular/dist/angular-starter /var/www/html
EXPOSE 8080
