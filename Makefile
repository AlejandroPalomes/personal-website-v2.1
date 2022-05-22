.DEFAULT_GOAL := check

start-backend:
	@echo "🏃 Starting Back-End project"
	@npm run dev-server

start-frontend:
	@echo "🏃 Starting Front-End project"
	@cd client && npm run dev
