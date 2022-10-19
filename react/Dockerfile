FROM node:16.20.2-alpine AS react-build
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts --no-audit --no-fund
COPY react/package.json react/package-lock.json ./react/
RUN npm ci --prefix react --no-audit --no-fund
COPY shared ./shared
COPY scripts ./scripts
COPY react ./react
RUN CI=true npm --prefix react run build

FROM nginx:1.23.0-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=react-build /workspace/react/build /var/www/html
EXPOSE 8080
