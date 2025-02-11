package provider

type EnvProvider struct {
	appEnv     string
	serverPort string
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

	envProvider := EnvProvider{
		appEnv:     appEnv,
		serverPort: serverPort,
	}

	return &envProvider
}
