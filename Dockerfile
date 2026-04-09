# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine
# Configuration Nginx optimisée
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copie des fichiers buildés depuis le stage précédent
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
