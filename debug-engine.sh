#!/bin/bash

# Ignore this script. This is for engine author. He uses it for debug the tia.

export TIA_ROOT_DIR=/home/alexey/projects/work/tia-tests/tests;
export TIA_REQUIRE_MODULES=/home/alexey/projects/work/tia-tests/tia-ex/rv-index.js

./bin/tia.js --debug-avg --pattern 01_non-bank-org --ignore-skip-flag --disable-email --diffs-to-slog --trace-level 3 --force-log-actions --log-to-console

