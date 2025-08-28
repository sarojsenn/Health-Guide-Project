@echo off
echo Removing comments from all files...

echo Removing HTML comments from auth.html...
powershell -Command "(Get-Content 'auth.html') -replace '<!--.*?-->', '' | Set-Content 'auth.html'"

echo Removing HTML comments from main.html...
powershell -Command "(Get-Content 'main.html') -replace '<!--.*?-->', '' | Set-Content 'main.html'"

echo Removing JavaScript comments from auth.js...
powershell -Command "(Get-Content 'auth.js') -replace '\/\/.*$', '' | Set-Content 'auth.js'"

echo Removing JavaScript comments from script.js...
powershell -Command "(Get-Content 'script.js') -replace '\/\/.*$', '' | Set-Content 'script.js'"

echo Removing JavaScript comments from server files...
cd ..\server
powershell -Command "(Get-Content 'index.js') -replace '\/\/.*$', '' | Set-Content 'index.js'"

cd routes
powershell -Command "(Get-Content 'auth.js') -replace '\/\/.*$', '' | Set-Content 'auth.js'"
powershell -Command "(Get-Content 'chatbot.js') -replace '\/\/.*$', '' | Set-Content 'chatbot.js'"

cd ..\middleware
powershell -Command "(Get-Content 'auth.js') -replace '\/\/.*$', '' | Set-Content 'auth.js'"

cd ..\models
powershell -Command "(Get-Content 'User.js') -replace '\/\/.*$', '' | Set-Content 'User.js'"

cd ..\utils
powershell -Command "(Get-Content 'sendOTPEmail.js') -replace '\/\/.*$', '' | Set-Content 'sendOTPEmail.js'"

echo Comments removed from all files!
pause
