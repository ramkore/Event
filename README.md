# Event Management System

A comprehensive event management application for organizing and managing events.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software

1. **Node.js** (v16 or higher) and **npm** (v8 or higher)
   - Download and install from: https://nodejs.org/
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. **Git**
   - Download from: https://git-scm.com/downloads
   - Verify installation:
     ```bash
     git --version
     ```

### For Windows Users

If you're getting the error `npx : The term 'npx' is not recognized`, it means Node.js is not installed or not in your system PATH.

**To install Node.js on Windows:**

1. Visit https://nodejs.org/
2. Download the LTS (Long Term Support) version installer for Windows
3. Run the installer and follow the installation wizard
4. **Important:** Make sure to check the box "Automatically install the necessary tools" during installation
5. Restart your PowerShell or Command Prompt after installation
6. Verify installation by running:
   ```powershell
   node --version
   npm --version
   npx --version
   ```

**Alternative: Using Package Manager (Chocolatey)**
```powershell
# If you have Chocolatey installed
choco install nodejs
```

**Alternative: Using Package Manager (Winget)**
```powershell
# If you have Winget (Windows 10/11)
winget install OpenJS.NodeJS
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ramkore/Event.git
   cd Event
   ```

2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```

3. Set up environment variables:
   ```bash
   # Copy the example environment file
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
Event/
├── server/           # Backend server code
│   ├── src/         # Source code
│   ├── package.json # Node.js dependencies
│   └── .env.example # Environment variables template
├── client/          # Frontend application (coming soon)
└── README.md        # This file
```

## Deployment

### Deploying to Vercel

1. Install Vercel CLI (after Node.js is installed):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   npx vercel login
   ```

3. Deploy:
   ```bash
   cd server
   npx vercel
   ```

## Troubleshooting

### Issue: `npx` command not found

**Cause:** Node.js is not installed or not in your system PATH.

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart your terminal/PowerShell
3. Verify with `node --version` and `npm --version`

### Issue: Permission errors on Windows

**Solution:** Run PowerShell as Administrator

### Issue: `npm install` fails

**Solution:**
1. Clear npm cache: `npm cache clean --force`
2. Delete `node_modules` folder and `package-lock.json`
3. Run `npm install` again

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
