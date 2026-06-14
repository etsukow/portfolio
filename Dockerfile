# syntax=docker/dockerfile:1

# ---- Build the static site ----
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Now-playing — injected at build time (NEXT_PUBLIC_* is inlined by Next).
# ListenBrainz is primary (no key); Last.fm kept as fallback during the switch.
ARG LISTENBRAINZ_USER=""
ARG LASTFM_API_KEY=""
ARG LASTFM_USER=""
ENV NEXT_PUBLIC_LISTENBRAINZ_USER=$LISTENBRAINZ_USER
ENV NEXT_PUBLIC_LASTFM_API_KEY=$LASTFM_API_KEY
ENV NEXT_PUBLIC_LASTFM_USER=$LASTFM_USER

RUN node node_modules/next/dist/bin/next build

# ---- Serve with nginx ----
FROM nginx:1.27-alpine AS runtime

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/portfolio.conf

COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
	CMD wget -q --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
