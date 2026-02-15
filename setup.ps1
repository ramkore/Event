# Event Management System - Quick Setup Script for Windows
# Run this script in PowerShell: .\setup.ps1

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Event Management System - Quick Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
$nodeVersion = $null
try {
    $nodeVersion = node --version 2>$null
} catch {}

if (-not $nodeVersion) {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "For detailed instructions, see WINDOWS_SETUP.md" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if npm is installed
$npmVersion = $null
try {
    $npmVersion = npm --version 2>$null
} catch {}

if (-not $npmVersion) {
    Write-Host "❌ npm is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js (which includes npm) from: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
Write-Host "✅ npm version: $npmVersion" -ForegroundColor Green
Write-Host ""

# Navigate to server directory
Write-Host "📦 Installing server dependencies..." -ForegroundColor Cyan
Set-Location -Path "server"

if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found in server directory!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Install dependencies
Write-Host "Running npm install..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "✅ Dependencies installed successfully!" -ForegroundColor Green
Write-Host ""

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Cyan
    Copy-Item ".env.example" -Destination ".env"
    Write-Host "✅ .env file created. Please update it with your configuration." -ForegroundColor Green
}

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the development server, run:" -ForegroundColor Yellow
Write-Host "  cd server" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "To deploy to Vercel, run:" -ForegroundColor Yellow
Write-Host "  npx vercel" -ForegroundColor White
Write-Host ""
Write-Host "Note: Run vercel commands from the repository root directory." -ForegroundColor Yellow
Write-Host ""

Read-Host "Press Enter to exit"
