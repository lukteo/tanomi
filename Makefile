# Targets that do not correspond to actual files
.PHONY: gen-oapi init-tools run-server

# Initialize necessary tools for the project
init-tools:
	@echo "Installing necessary packages for initialization..."
	cd ./server && \
		mkdir -p bin && \
		export GOBIN="${PWD}/server/bin" &&\
		go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest && \
		go install github.com/pressly/goose/v3/cmd/goose@latest && \
		go install github.com/go-jet/jet/v2/cmd/jet@latest
	@echo "Tools initialization complete."


# Generate server code from OpenAPI specification
gen-oapi:
	@echo "Generating server from OpenAPI specification..."
	cd ./server && ./bin/oapi-codegen -config ./generated/oapi/config.yaml ../openapi.yaml
	@echo "Server generation complete."


# Runs the server's main.go
run-server:
	@echo "Starting server"
	cd ./server && go run ./cmd/server/main.go
