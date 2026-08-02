# Stage 1: Base (Instala dependências)
FROM node:20-alpine as base
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Development (Para usar lolcalmente)
FROM base as dev
COPY . .
CMD ["npm", "run", "dev", "--", "--host"]

# Stage 3: Build (Para preparar para o servidor)
FROM base as build
COPY . .
RUN npm run build

# Stage 4: Production (Vai pro ar com Traefik)
FROM nginx:alpine as prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]