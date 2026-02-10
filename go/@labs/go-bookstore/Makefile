BINARY_NAME := bookstore
BIN_DIR := bin
MAIN_PATH := ./cmd
DB_IMAGE := go-bookstore-db
DB_CONTAINER := bookstore-db

.PHONY: build run test clean tidy help db db-stop

help:
	@echo "Usage:"
	@echo "  make build    - Build the binary to bin/"
	@echo "  make run      - Build and run the application"
	@echo "  make test     - Run tests"
	@echo "  make clean    - Remove the binary from bin/"
	@echo "  make tidy     - Tidy Go module dependencies"
	@echo "  make db       - Build and run PostgreSQL in Docker"
	@echo "  make db-stop  - Stop and remove the PostgreSQL container"

build:
	@mkdir -p $(BIN_DIR)
	go build -o $(BIN_DIR)/$(BINARY_NAME) $(MAIN_PATH)

run: build
	./$(BIN_DIR)/$(BINARY_NAME)

test:
	go test -v ./...

clean:
	rm -f $(BIN_DIR)/$(BINARY_NAME)

tidy:
	go mod tidy

db:
	docker rm -f $(DB_CONTAINER) 2>/dev/null || true
	docker build -t $(DB_IMAGE) -f Dockerfile .
	docker run -d --name $(DB_CONTAINER) -p 5432:5432 $(DB_IMAGE)

db-stop:
	docker stop $(DB_CONTAINER) 2>/dev/null || true
	docker rm $(DB_CONTAINER) 2>/dev/null || true
