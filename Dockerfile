# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.7

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Copy all local files into the image.
COPY . .

# Build for production.
RUN \
npm install && \
npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# move_serve_file:
RUN cp serve.json build

# Set the command to start the node server.
CMD serve -s build -l 5000

# Tell Docker about the port we'll run on.
EXPOSE 5000
