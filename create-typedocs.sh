#!/usr/bin/env bash

rm -rf docs
mkdir docs

#mv readme.md readme.md.bak
typedoc ./types --out docs --includeDeclarations --excludeExternals --excludeNotExported --readme typedoc-readme.md
#mv readme.md.bak readme.md
touch docs/.nojekyll

google-chrome-stable docs/index.html
