@echo off
REM ============================================================
REM  Install-Bridge.bat  --  one-time setup, just double-click.
REM
REM  If Windows shows a blue "Windows protected your PC" box,
REM  click "More info" then "Run anyway". Takes about a minute.
REM ============================================================
title Claude Code Bridge - one-time setup
echo.
echo   Setting up the Claude Code Bridge (one-time, about a minute).
echo   This lets your AI assistant run git and GitHub on this PC for you,
echo   so you never have to copy-paste commands again.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "[Net.ServicePointManager]::SecurityProtocol='Tls12'; iex (iwr -useb 'https://raw.githubusercontent.com/johncliechty/claude-code-bridge/main/bootstrap.ps1').Content"
echo.
echo   All done. You can close this window and go back to your chat.
echo.
pause
