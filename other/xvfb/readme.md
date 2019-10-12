Xvfb it is virtual frame buffer, which allows you to run `[selenium]` GUI tests,
which do not prevent you from work on the computer.

Correct the xvfb file if needed and copy it to /etc/init.d/.
Make sure that it is executable.

====

And now you can start xvfb by:

> /etc/init.d/xvfb start

and stop xvfb by:

> /etc/init.d/xvfb stop

====

To start Xvfb automaticaly at boot time you can use:

> update-rc.d xvfb defaults 92

====

After this you can use --xvfb tia option.

This option enables using
DISPLAY option from `config/default-dir-config.js`

Default value is
DISPLAY=":1.5"
to be consistent with the xvfb script.

Probably some core context is here:
http://stackoverflow.com/questions/28601587/how-to-run-gui-test-via-squish-without-x-server/32857819#32857819
