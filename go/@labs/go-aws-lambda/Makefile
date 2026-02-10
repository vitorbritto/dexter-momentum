BIN_DIR := bin
BINARY  := go-aws-lambda
ZIP     := lambda.zip

.PHONY: all build build-lambda zip clean

all: build

build:
	@mkdir -p $(BIN_DIR)
	go build -o $(BIN_DIR)/$(BINARY) .

build-lambda:
	@mkdir -p $(BIN_DIR)
	GOOS=linux GOARCH=amd64 go build -o $(BIN_DIR)/$(BINARY) .

zip: build-lambda
	cd $(BIN_DIR) && zip -q $(ZIP) $(BINARY)

clean:
	rm -rf $(BIN_DIR)
