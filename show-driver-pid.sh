#!/usr/bin/env bash

ps -aux | grep chromedriver | grep -o -P  "\\d+" | head -1
