package handler

import "tanomi/config"

type Handler struct {
	config *config.Config
}

func NewHandler(config *config.Config) *Handler {
	handler := Handler{
		config: config,
	}

	return &handler
}
