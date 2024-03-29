FROM nginx:alpine

# Set working directory
WORKDIR /var/www/html

# Copy Magidoc generated files from build context
COPY ./docs .

# Expose the default Nginx port (80)
EXPOSE 80

# Configure Nginx
COPY default.conf /etc/nginx/conf.d/default.conf

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]