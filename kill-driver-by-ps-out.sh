#!/usr/bin/env bash

# kills remote web driver using pid from ps output.
# It is better to don't use this script. It is too stupid and can incidentaly kill some process.

kill $(./show-driver-ps-out.sh)

rm cd.pid
rm cd.sid
