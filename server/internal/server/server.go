package server

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"

	"tanomi/config"
	"tanomi/internal/server/handler"
)

type Server struct {
	router   *chi.Mux
	portAddr string
}

func (s *Server) Start() {
	log.Print("Server listening on " + s.portAddr)

	httpServer := &http.Server{
		Handler:           s.router,
		Addr:              s.portAddr,
		ReadHeaderTimeout: 1000 * time.Second,
	}

	log.Fatal(httpServer.ListenAndServe())
}

func (s *Server) Router() *chi.Mux {
	return s.router
}

func NewServer(config *config.Config) *Server {
	h := handler.NewHandler(config)
	portAddr := fmt.Sprintf(":%s", config.Env().ServerPort())

	r := chi.NewRouter()
	r.Use(chimiddleware.Recoverer)

	/* -- Health -- */
	r.Get("/health", h.GetHealth)

	return &Server{
		router:   r,
		portAddr: portAddr,
	}
}
