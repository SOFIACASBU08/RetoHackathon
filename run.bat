@echo off
REM Detener procesos de dotnet anteriores
taskkill /F /IM dotnet.exe 2>nul
timeout /t 2 /nobreak

REM Navegar a Backend y ejecutar
cd Backend
dotnet run
