@echo off
color 0A
echo ========================================
echo    COLLEGE MANAGEMENT PORTAL STARTUP
echo ========================================
echo.

echo [1/4] Checking MongoDB Service...
net start MongoDB >nul 2>&1
if %errorlevel% equ 0 (
    echo MongoDB service started successfully
) else (
    echo MongoDB service not found, trying manual start...
    if exist "C:\Program Files\MongoDB\Server\*\bin\mongod.exe" (
        start "MongoDB" "C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"
        echo MongoDB started manually
        timeout /t 5 /nobreak >nul
    ) else (
        echo MongoDB not installed. Please run SETUP_DATABASE.bat first
        pause
        exit /b 1
    )
)

echo.
echo [2/4] Installing Dependencies...
cd backend
if not exist "node_modules" (
    echo Installing backend dependencies...
    npm install
)
cd ..
if not exist "node_modules" (
    echo Installing frontend dependencies...
    npm install
)

echo.
echo [3/4] Starting Backend Server...
cd backend
start "Backend Server" cmd /k "echo Starting Backend Server... && node server.js"
echo Backend server starting...

echo.
echo [4/4] Starting Frontend...
cd ..
timeout /t 5 /nobreak >nul
start "Frontend" cmd /k "echo Starting Frontend... && npm start"
echo Frontend server starting...

echo.
echo ========================================
echo           SERVERS STARTING
echo ========================================
echo.
echo Frontend:  http://localhost:3000
echo Backend:   http://localhost:3001
echo Database:  mongodb://localhost:27017
echo DB Name:   school_portal
echo.
echo ========================================
echo           QUICK SETUP GUIDE
echo ========================================
echo.
echo 1. Wait for both servers to start (30-60 seconds)
echo 2. Open http://localhost:3000 in your browser
echo 3. Register as Admin to manage students
echo 4. Use the Students Management page to add students
echo.
echo If you see connection errors:
echo    - Run SETUP_DATABASE.bat first
echo    - Install MongoDB Compass for database management
echo    - Restart this script
echo.
echo Press any key to open the application...
pause >nul
start http://localhost:3000