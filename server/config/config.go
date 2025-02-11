package config

import "tanomi/config/provider"

type Config struct {
	env *provider.EnvProvider
}

func (c *Config) Env() *provider.EnvProvider {
	return c.env
}

func NewConfig() *Config {
	config := Config{}

	config.env = provider.NewEnvProvider()

	return &config
}
