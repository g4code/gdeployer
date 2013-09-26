MOCHA_PATH = ./node_modules/.bin/mocha

install:
	@npm install

pack:
	@npm pack

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

.PHONY: install pack
.PHONY: test test-spec test-w
