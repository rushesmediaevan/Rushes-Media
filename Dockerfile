FROM node:22.23.1-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm test

FROM node:22.23.1-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY package.json server.js ./
COPY lib ./lib
COPY scripts/site-facts.json ./scripts/site-facts.json
EXPOSE 3000
CMD ["node", "server.js"]
