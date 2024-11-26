#Build Stage
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm install --production

#Run stage
FROM node:20-alpine AS run
ENV NODE_ENV=production

RUN addgroup -g 1001 -S user_group
RUN adduser -S user -u 1001

WORKDIR /app

COPY --chown=user:user_group . .
COPY --from=build --chown=user:user_group /app/node_modules ./node_modules
COPY --from=build --chown=user:user_group /app/package-lock.json ./package-lock.json

EXPOSE 8080

CMD [ "npm", "start" ]