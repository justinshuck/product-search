FROM node:10

# Define working dir
WORKDIR /opt/product-service

# Define directory structure
RUN mkdir config

# Copy files over
COPY dist  *.json ./
COPY config config

# npm install
RUN npm install --production

# Expose port and run app
EXPOSE 3000
CMD ["node", "index.js"]

