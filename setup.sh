#!/bin/bash

# Quick Setup Script for Event Management System

echo "=========================================="
echo "Event Management System - Quick Setup"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "Please install Node.js from: https://nodejs.org/"
    echo ""
    echo "For Windows users, see WINDOWS_SETUP.md for detailed instructions"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    echo "Please install Node.js (which includes npm) from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to server directory
echo "📦 Installing server dependencies..."
cd server

if [ ! -f "package.json" ]; then
    echo "❌ package.json not found in server directory!"
    exit 1
fi

# Install dependencies
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies!"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
fi

echo ""
echo "=========================================="
echo "✅ Setup Complete!"
echo "=========================================="
echo ""
echo "To start the development server, run:"
echo "  cd server"
echo "  npm run dev"
echo ""
echo "To deploy to Vercel, run:"
echo "  npx vercel"
echo ""
echo "Note: Run vercel commands from the repository root directory."
echo ""
