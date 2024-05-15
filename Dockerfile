FROM rust:latest as builder
WORKDIR /usr/src/app
COPY . .
RUN cargo build --release

FROM ubuntu
WORKDIR /app
COPY --from=builder /usr/src/app/target/release/rustfolio .
COPY --from=builder /usr/src/app/frontend frontend
EXPOSE 7878
CMD ["./rustfolio"]