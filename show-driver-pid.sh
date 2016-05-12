#!/usr/bin/env bash

# Shows remote web driver pid.

ps -aux | grep chromedriver | grep -o -P  "\\d+" | head -1
