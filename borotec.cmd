@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul

title Borotec Oficial - Dev Tools

:MENU
cls
echo ================================================
echo         BOROTEC OFICIAL - Menu de Comandos
echo ================================================
echo.
echo  [1] Instalar dependencias (npm install)
echo  [2] Iniciar servidor de desenvolvimento
echo  [3] Build de producao
echo  [4] Build de desenvolvimento
echo  [5] Visualizar build (preview)
echo  [6] Executar lint
echo  [7] Abrir no VS Code
echo  [0] Sair
echo.
echo ================================================
set /p opcao="Escolha uma opcao: "

if "%opcao%"=="1" goto INSTALL
if "%opcao%"=="2" goto DEV
if "%opcao%"=="3" goto BUILD_PROD
if "%opcao%"=="4" goto BUILD_DEV
if "%opcao%"=="5" goto PREVIEW
if "%opcao%"=="6" goto LINT
if "%opcao%"=="7" goto VSCODE
if "%opcao%"=="0" goto FIM

echo Opcao invalida. Tente novamente.
pause
goto MENU

:INSTALL
echo.
echo [*] Instalando dependencias...
cd /d "E:\PROJETOS\Borotec_oficial"
npm install
echo.
echo [OK] Instalacao concluida.
pause
goto MENU

:DEV
echo.
echo [*] Iniciando servidor de desenvolvimento...
echo     Acesse: http://localhost:8080
echo     Pressione Ctrl+C para parar.
echo.
cd /d "E:\PROJETOS\Borotec_oficial"
npm run dev
pause
goto MENU

:BUILD_PROD
echo.
echo [*] Gerando build de producao...
cd /d "E:\PROJETOS\Borotec_oficial"
npm run build
echo.
echo [OK] Build gerado na pasta /dist
pause
goto MENU

:BUILD_DEV
echo.
echo [*] Gerando build de desenvolvimento...
cd /d "E:\PROJETOS\Borotec_oficial"
npm run build:dev
echo.
echo [OK] Build gerado na pasta /dist
pause
goto MENU

:PREVIEW
echo.
echo [*] Iniciando preview do build...
echo     Acesse: http://localhost:4173
echo     Pressione Ctrl+C para parar.
echo.
cd /d "E:\PROJETOS\Borotec_oficial"
npm run preview
pause
goto MENU

:LINT
echo.
echo [*] Executando ESLint...
cd /d "E:\PROJETOS\Borotec_oficial"
npm run lint
echo.
pause
goto MENU

:VSCODE
echo.
echo [*] Abrindo projeto no VS Code...
cd /d "E:\PROJETOS\Borotec_oficial"
code .
goto MENU

:FIM
echo.
echo Ate logo!
timeout /t 2 >nul
endlocal
exit /b 0
