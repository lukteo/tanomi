package handler

import (
	"context"

	"tanomi/generated/oapi"
)

func (h *Handler) GetPing(
	ctx context.Context, req oapi.GetPingRequestObject,
) (oapi.GetPingResponseObject, error) {
	return oapi.GetPing200JSONResponse{Ping: "pong"}, nil
}
