# scheduled-image-grab

## Description
Grab webcam footage of UB Dortmund building site and save it to a file. Only files with different MD5 hashes are saved. Thus only new images are saved, e.g. the 4 different images per hour.

## Run
Run `docker compose up -d` for the provided `docker-compose.yml`. Make sure to persist the data at `/app/images` to local storage.

There is also an ARM64 image available at `ghcr.io/lukaslerche/scheduled-image-grab:latest-arm64` if you run on Apple Silicon.

## Development
- `pnpm i` to install dependencies
- `pnpm dev` to start the program with hot-reloading
- `pnpm build` and `pnpm start` to build and start the project

## Build and release Docker image
- `docker login ghcr.io -u USER -p TOKEN`
- `docker build --platform linux/amd64 -t ghcr.io/lukaslerche/scheduled-image-grab:latest .`
- `docker build --platform linux/arm64 -t ghcr.io/lukaslerche/scheduled-image-grab:latest-arm64 .`
- `docker push ghcr.io/lukaslerche/scheduled-image-grab:latest`
- `docker push ghcr.io/lukaslerche/scheduled-image-grab:latest-arm64`
