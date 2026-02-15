# Windows Setup Guide

This guide will help you set up the Event Management System on Windows.

## Step 1: Install Node.js

### Option 1: Official Installer (Recommended)

1. Open your web browser and go to https://nodejs.org/
2. Click on the **LTS** (Long Term Support) version download button
3. Run the downloaded installer (`.msi` file)
4. Follow the installation wizard:
   - Click "Next" on the welcome screen
   - Accept the license agreement
   - Choose the installation location (default is fine)
   - **Important:** Keep all the default settings, especially "Add to PATH"
   - Click "Next" and then "Install"
5. Wait for the installation to complete
6. Click "Finish"

### Option 2: Using Winget (Windows 10/11)

1. Open PowerShell as Administrator
2. Run:
   ```powershell
   winget install OpenJS.NodeJS.LTS
   ```

### Option 3: Using Chocolatey

1. If you have Chocolatey installed, open PowerShell as Administrator
2. Run:
   ```powershell
   choco install nodejs-lts
   ```

## Step 2: Verify Installation

1. **Close any open PowerShell or Command Prompt windows**
2. Open a **new** PowerShell window
3. Verify Node.js installation:
   ```powershell
   node --version
   ```
   You should see something like `v18.17.0` or `v20.x.x`

4. Verify npm installation:
   ```powershell
   npm --version
   ```
   You should see something like `9.6.7` or `10.x.x`

5. Verify npx is available:
   ```powershell
   npx --version
   ```
   You should see a version number

**If you still get "npx is not recognized":**
- Make sure you opened a **NEW** PowerShell window after installation
- Restart your computer
- Check if Node.js is in your PATH:
  ```powershell
  $env:Path -split ';' | Select-String nodejs
  ```

## Step 3: Clone the Repository

```powershell
# Navigate to your projects directory
cd D:\Work\1.Development

# Clone the repository
git clone https://github.com/ramkore/Event.git

# Navigate into the project
cd Event
```

## Step 4: Install Dependencies

```powershell
# Navigate to the server directory
cd server

# Install dependencies
npm install
```

This will download and install all required packages. It may take a few minutes.

## Step 5: Configure Environment Variables

```powershell
# Copy the example environment file
copy .env.example .env

# Edit the .env file with your preferred text editor
notepad .env
```

## Step 6: Start the Development Server

```powershell
# Start the server
npm run dev
```

You should see a message like:
```
Server is running on port 3000
Environment: development
```

## Step 7: Deploy to Vercel (Optional)

Once Node.js is installed and working:

```powershell
# Navigate to the server directory if not already there
cd D:\Work\1.Development\Event\server

# Login to Vercel (opens browser for authentication)
npx vercel login

# Deploy to Vercel
npx vercel
```

Follow the prompts in the terminal to complete the deployment.

## Common Issues and Solutions

### Issue: "npx is not recognized" after installation

**Solution:**
1. Close ALL PowerShell and Command Prompt windows
2. Open a **NEW** PowerShell window
3. Try the command again
4. If still not working, restart your computer

### Issue: "Execution of scripts is disabled on this system"

**Solution:**
1. Open PowerShell as Administrator
2. Run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. Type `Y` and press Enter
4. Close and reopen PowerShell

### Issue: npm install fails with permission errors

**Solution:**
1. Run PowerShell as Administrator
2. Try the installation again
3. Or, clear npm cache:
   ```powershell
   npm cache clean --force
   ```

### Issue: Port 3000 is already in use

**Solution:**
1. Change the port in `.env` file:
   ```
   PORT=3001
   ```
2. Or, stop the process using port 3000:
   ```powershell
   # Find the process
   netstat -ano | findstr :3000
   # Kill the process (replace PID with the actual process ID)
   taskkill /PID <PID> /F
   ```

## Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [npm Documentation](https://docs.npmjs.com/)
- [Vercel Documentation](https://vercel.com/docs)
- [Express.js Documentation](https://expressjs.com/)

## Need Help?

If you're still having issues, please:
1. Check that you've followed all steps exactly
2. Make sure you're using a NEW PowerShell window after installing Node.js
3. Try restarting your computer
4. Open an issue on GitHub with:
   - The exact error message
   - Your Node.js version (`node --version`)
   - Your npm version (`npm --version`)
   - Your Windows version
