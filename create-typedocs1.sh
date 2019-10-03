#!/usr/bin/env bash

rm -rf docs1
mkdir docs1

#mv readme.md readme.md.bak
typedoc ./gen-types --out docs1 --includeDeclarations --excludeExternals --excludeNotExported --exclude ./readme.md --readme none
#mv readme.md.bak readme.md
touch docs1/.nojekyll

google-chrome-stable docs1/index.html
