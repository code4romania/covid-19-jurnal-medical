# Build environment
FROM node:12.16.1-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm install

COPY . /app
RUN npm run build

# Production environment
FROM node:12.16.1-alpine
COPY --from=build /app/build /app/build

RUN npm install -g serve

HEALTHCHECK --interval=60s --timeout=3s --retries=3 \
    CMD wget -q http://localhost || exit 1

EXPOSE 80

# Add bash
RUN apk add --no-cache bash

WORKDIR /app/build
COPY ./env.sh .
COPY ./serve.json .

# Convert dos line endings to unix file endings - problem with build on docker for windows
RUN sed -i 's/\r$//' env.sh

# Make our shell script executable
RUN chmod +x env.sh

# Start server
CMD ["/bin/bash", "-c", "/app/build/env.sh && PORT=5002 serve", "-s", "/app/build", "-l", "5002"]