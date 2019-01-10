#!/bin/bash

# Purpose
#   Start a screen session with multiple windows
# all running parts of the Resume application.

# Can use
#   ^A^A
# to cycle windows in the current pane and then
#   ^C
# as usual to quit the task.
#
# When all windows are closed, `screen` will exit.
#
#   ^A^C
# will open a command prompt in the current pane.
# Useful for restarting Angular CLI.

cd "${BASH_SOURCE%/*}" || exit

screen -c screenrc
