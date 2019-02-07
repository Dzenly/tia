#!/usr/bin/env bash

rm -rf typedoc
mkdir typedoc

typedoc ./types --out typedoc --includeDeclarations --excludeExternals
