package handler

import (
	"context"
	"fmt"
	"tanomi/generated/oapi"
	"tanomi/internal/service"
)

func (h *Handler) GetMeDetails(
	ctx context.Context,
	req oapi.GetMeDetailsRequestObject,
) (oapi.GetMeDetailsResponseObject, error) {
	me, err := service.GetMeDetails(ctx, req)
	if err != nil {
		return nil, fmt.Errorf("error retrieving me details: %w", err)
	}

	return oapi.GetMeDetails200JSONResponse{
		Id:    me.Id,
		Name:  me.Name,
		Email: me.Email,
	}, nil
}
