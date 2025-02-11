package handler

import (
	"tanomi/config"
	"tanomi/generated/oapi"
)

type Handler struct {
	oapi.StrictServerInterface
	config *config.Config
}

func NewHandler(config *config.Config) *Handler {
	handler := Handler{
		config: config,
	}

	return &handler
}
