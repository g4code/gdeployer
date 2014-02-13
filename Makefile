MOCHA_PATH = ./node_modules/.bin/mocha

install:
	@npm install

change-version: check-version
	@echo "version in package" \
	&& sed -i "s/\"version\": *\".*\"/\"version\":\"$(version)\"/g" package.json \

check-version:
	@if test "$(version)" = ""; then \
		echo "Version variable is not set"; \
		exit 1; \
	fi

git-version:
	@echo "git: commit, tag, push" \
	&& git add . \
	&& git commit -m "version $(version)" \
	&& git tag -a $(version) -m "version $(version)" \
	&& git push origin master \
	&& git push --tags

pack:
	@npm pack

release: change-version git-version
	@echo "release $(version) completed"

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
.PHONY: check-version change-version git-version
.PHONY: test test-spec test-w
