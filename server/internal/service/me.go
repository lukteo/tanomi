package service

import (
	"context"
	"tanomi/generated/oapi"

	"github.com/oapi-codegen/runtime/types"
)

func GetMeDetails(
	ctx context.Context,
	req oapi.GetMeDetailsRequestObject,
) (*oapi.User, error) {
	fakerId := "some-id"
	fakerName := "some-name"
	fakerEmail := "some@email.com"

	user := oapi.User{
		Id:    &fakerId,
		Name:  &fakerName,
		Email: (*types.Email)(&fakerEmail),
	}

	return &user, nil
}
