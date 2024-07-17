#!/usr/bin/env just --justfile
# 'justfile'
# just-repo: https://github.com/casey/just
# just-docs: https://just.systems/man/en/

@_default:
    just --list --unsorted

all: ci

build:
    pnpm build

# ci -- often default or 'all' target
ci: build test lint

lint:
    pnpm lint

test:
    pnpm test

clean:
    echo "unimplemented"

NUKE:
    npx rimraf ./**/node_modules

# FORMATTING

fmt-prettier:
    npx prettier@latest --write .

ruffmt:
    ruff format .

fmt:
    pnpm fmt
    just --fmt --unstable

change *ARGS:
    pnpm run change {{ARGS}}
