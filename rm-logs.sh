#!/usr/bin/env bash

# Removes *.log, and *.dif files.

find . -name *.log -exec rm -f {} \;
find . -name *.dif -exec rm -f {} \;
