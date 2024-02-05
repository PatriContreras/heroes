# Establecer la imagen base para la construcción
FROM node:16-alpine as build

# Establecer el directorio de trabajo
WORKDIR /src/app

# Copiar los archivos de configuración
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Compilar la aplicación Angular
RUN npm run build

# Configurar una nueva imagen para producción basada en Nginx
FROM nginx:1.17.1-alpine

# Copiar los archivos estáticos compilados de Angular al directorio de Nginx
COPY --from=build /src/app/dist/heroes /usr/share/nginx/html

# Copiar la configuración de Nginx
COPY --from=build /src/app/nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto para la aplicación Angular
EXPOSE 80

# El comando por defecto ejecuta Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]