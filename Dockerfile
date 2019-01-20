FROM golang:1.11 AS build
    ENV WORKDIR=/build
    ENV GOOS=linux
    ENV CGO_ENABLED=0
    ENV GOARCH=amd64
    WORKDIR ${WORKDIR}
    COPY . /build
    RUN mkdir dist && \
        go build -o dist/hands-up  && \
        chmod +x dist/*


FROM drone/ca-certs
    ENV GIN_MODE=release
    
    EXPOSE 8080

    WORKDIR /app

    COPY --from=build /build/dist/hands-up .
    COPY static /app/static

    ENTRYPOINT [ "/app/hands-up" ]