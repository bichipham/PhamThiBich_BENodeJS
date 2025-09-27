# ============================
# Base image
# ============================
FROM node:24.1.0-alpine AS base

# Thư mục làm việc trong container
WORKDIR /app

# Copy package.json & package-lock.json và cài dependencies
COPY package.json ./
RUN npm install

# Copy toàn bộ source code vào container
COPY . .

RUN npx prisma generate

FROM node:24.1.0-alpine

WORKDIR /app
# Chỉ copy các file cần thiết từ base image
COPY --from=base ./app/server.js ./server.js
COPY --from=base ./app/.env ./.env
COPY --from=base ./app/src ./src
COPY --from=base ./app/package.json ./package.json
COPY --from=base ./app/node_modules ./node_modules
COPY --from=base ./app/prisma ./prisma
COPY --from=base ./app/generated ./generated

EXPOSE 3000
CMD ["npm", "run", "dev"]
