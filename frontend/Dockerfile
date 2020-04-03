# Build environment
FROM node:12.16.1-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm install

# ARG REACT_APP_IDP_URL
# ENV REACT_APP_IDP_URL=$REACT_APP_IDP_URL

# ARG REACT_APP_URL
# ENV REACT_APP_URL=$REACT_APP_URL


COPY . /app
RUN npm run-script build

# Production environment
FROM node:12.16.1-alpine
COPY --from=build /app/build /app/build

RUN npm install -g serve

HEALTHCHECK --interval=60s --timeout=3s --retries=3 \
    CMD wget -q http://localhost || exit 1

EXPOSE 80

# # Add bash
# RUN apk add --no-cache bash

# WORKDIR /usr/share/nginx/html
# COPY ./env.sh .
# COPY .env .
# COPY nginx.conf /etc/nginx/conf.d/default.conf


# # Make our shell script executable
# RUN chmod +x env.sh

# Start Nginx server
CMD ["serve", "-s", "/app/build", "-l", "80"]
#CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
