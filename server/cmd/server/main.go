package main

import (
	"tanomi/config"
	"tanomi/internal/exec/server"
)

func main() {
	c := config.NewConfig()
	s := server.NewServer(c)

	s.Start()
}
