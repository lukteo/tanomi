package provider

import (
	"log"
	"os"
)

func fallbackEnvLookup(key string, fallback string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		return fallback
	}

	return value
}

func requiredEnvLookup(key string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		log.Fatalf("Missing env value for key: %s", key)
	}

	return value
}
