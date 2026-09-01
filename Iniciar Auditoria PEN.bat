@echo off
title Auditoria de Cifras PEN
cd /d "%~dp0"
echo Iniciando el servidor del complemento...
start "Servidor Auditoria PEN" cmd /k "npm start"
timeout /t 4 >nul
echo Abriendo Word...
start "" winword
exit
