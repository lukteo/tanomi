default: help

.PHONY: help
help: ## Show a list of commands
	@clear
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n"} /^[.a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""


##@ Initialization - Helpers for project setup

.PHONY: init
init: ## Runs all initialization commands, recommended for setting up from scratch
	@$(MAKE) --no-print-directory init-server-tools
	@$(MAKE) --no-print-directory init-docker
	@$(MAKE) --no-print-directory init-server

.PHONY: init-server-tools
init-server-tools: ## Installs server tools
	@printf "Installing server tools..."
	@cd ./server && \
		mkdir -p bin && \
		export GOBIN="${PWD}/server/bin" &&\
		go install github.com/oapi-codegen/oapi-codegen/v2/cmd/oapi-codegen@latest && \
		go install github.com/pressly/goose/v3/cmd/goose@latest && \
		go install github.com/go-jet/jet/v2/cmd/jet@latest
	@printf "\033[0;32mDone.\033[0m"
	@printf "\n"

.PHONY: init-docker
init-docker: ## Initializes docker through docker-compose.yml
	@printf "Running docker peripherals..."
	@docker-compose up -d >/dev/null 2>&1
	@printf "\033[0;32mDone.\033[0m"
	@printf "\n"

.PHONY: init-server
init-server: ## Initializes server with necessary files
	@printf "Setting up server..."
	@cp ./server/.env.example ./server/.env
	@printf "\033[0;32mDone.\033[0m"
	@printf "\n"

##@ Generator - Commands used for code generation
gen-oapi: ## Generates code based on OpenAPI specification
	@echo "Generating server from OpenAPI specification..."
	@cd ./server && ./bin/oapi-codegen -config ./generated/oapi/config.yaml ../openapi.yaml
	@printf "\033[0;32mDone.\033[0m\n"

##@ Runners - Commands used for running scripts
run-server: ## Starts the server
	@echo "Starting server"
	@cd ./server && go run ./cmd/server/main.go
