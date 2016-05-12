#!/usr/bin/env bash

# kills remote web driver using pid in cd.pid file.

kill $(cat cd.pid)

rm cd.pid
rm cd.sid

