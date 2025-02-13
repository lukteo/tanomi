package config

import (
	"database/sql"

	"tanomi/config/provider"
)

type Config struct {
	env *provider.EnvProvider
	db  *sql.DB
}

func (c *Config) Env() *provider.EnvProvider {
	return c.env
}

func (c *Config) DB() *sql.DB {
	if c.db == nil {
		c.db = provider.NewDBProvider(c.env)
	}

	return c.db
}

func NewConfig() *Config {
	config := Config{}

	config.env = provider.NewEnvProvider()

	return &config
}
