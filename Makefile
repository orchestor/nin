.PHONY: all
all:
	yarn install
	cd nin/frontend && make

.PHONY: publish
publish: all
	npm publish
