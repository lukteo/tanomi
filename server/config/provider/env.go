package provider

import (
	"log"
	"strconv"
)

type EnvProvider struct {
	appEnv           string
	serverPort       string
	databaseURL      string
	databaseMaxConns int
}

func (e *EnvProvider) AppEnv() string {
	return e.appEnv
}

func (e *EnvProvider) ServerPort() string {
	return e.serverPort
}

func NewEnvProvider() *EnvProvider {
	appEnv := fallbackEnvLookup("APP_ENV", "local")
	serverPort := fallbackEnvLookup("SERVER_PORT", "8080")

	databaseURL := requiredEnvLookup("DATABASE_URL")
	databaseMaxConns := fallbackEnvLookup("DATABASE_MAX_CONNS", "5")
	parsedDatabaseMaxConns, err := strconv.Atoi(databaseMaxConns)
	if err != nil {
		log.Fatalf("Failed to parse env value 'DATABASE_MAX_CONNS' as an int: %v", err)
	}

	envProvider := EnvProvider{
		appEnv:           appEnv,
		serverPort:       serverPort,
		databaseURL:      databaseURL,
		databaseMaxConns: parsedDatabaseMaxConns,
	}

	return &envProvider
}
