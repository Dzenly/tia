#!/usr/bin/env bash

# kills remote web driver using pid from ps output.

kill $(./show-driver-ps-out.sh)

rm cd.pid
rm cd.sid
