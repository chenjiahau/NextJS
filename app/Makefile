create_db:
	docker exec -it blog-db createdb --username=blog --owner=blog blog

drop_db:
	docker exec -it blog-db dropdb blog -U blog

init_prisma:
	npx prisma init

generate:
	npx prisma generate

generate_migration:
	npx prisma migrate dev --name ${message}

downgrade_to_revision:
	npx prisma migrate down --to ${revision}

apply_migration:
	npx prisma migrate deploy

.PHONY: drop_db init_prisma generate_migration apply_migration start_server