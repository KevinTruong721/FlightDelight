From node:19-alpine
WORKDIR /flightdelight
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm", "start"]