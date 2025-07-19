@echo off
:loop
set /p profile="Enter name or Chrome profile ID: "
if "%profile%"=="" goto end
node open-profile.js %profile%
goto loop
:end