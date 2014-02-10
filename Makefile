MOCHA_PATH = ./node_modules/.bin/mocha

install:
	@npm install

pack:
	@npm pack

release: version-check change-version git-version
	@echo "release $(version) completed"

version-check:
	@if test "$(version)" = ""; then \
		echo "Version variable is not set"; \
		exit 1; \
	fi

change-version:
	@echo "version in package" \
	&& sed -i "s/\"version\": *\".*\"/\"version\":\"$(version)\"/g" package.json \

git-version:
	@echo "git: commit, tag, push" \
	&& git add . \
	&& git commit -m "version $(version)" \
	&& git tag -a v$(version) -m "version $(version)" \
	&& git push origin master \
	&& git push --tags

test:
	@NODE_ENV=test $(MOCHA_PATH) \
		--recursive \
		--reporter dot
		
test-spec:
	@NODE_ENV=test $(MOCHA_PATH) \
		--recursive \
		--reporter spec

test-w:
	@NODE_ENV=test $(MOCHA_PATH) \
		--recursive \
		--reporter dot \
		--growl \
		--watch

.PHONY: install pack release
.PHONY: test test-spec test-w
