# Quick Start Guide - Noodpakket Expert

## Prerequisites

Make sure you have Node.js installed (version 18 or higher). Check by running:
```bash
node --version
```

If you don't have Node.js, download it from: https://nodejs.org/

## Installation Steps

### 1. Install Dependencies

First, install all the project dependencies:

```bash
npm install
```

This will install:
- Astro framework
- React for interactive tools
- Tailwind CSS for styling
- TypeScript
- All other required packages

**Note:** This may take a few minutes the first time.

### 2. Start Development Server

Once dependencies are installed, start the development server:

```bash
npm run dev
```

The server will start and you'll see output like:
```
  ➜  Local:   http://localhost:4321/
  ➜  Network: use --host to expose
```

### 3. Open in Browser

Open your browser and navigate to:
```
http://localhost:4321
```

You should now see the Noodpakket Expert homepage!

## Available Commands

- `npm run dev` - Start development server (with hot reload)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## Troubleshooting

### If `npm install` fails:
- Make sure you have Node.js 18+ installed
- Try deleting `node_modules` folder and `package-lock.json` (if exists) and run `npm install` again
- Check your internet connection

### If `npm run dev` doesn't work:
- Make sure dependencies are installed (`npm install`)
- Check that you're in the project directory
- Try `npm run astro dev` directly

### TypeScript Errors:
- These will resolve after running `npm install`
- The project uses TypeScript, but it's configured correctly

## Next Steps

Once the server is running:
1. Visit `http://localhost:4321` to see the homepage
2. Navigate through the different sections
3. Test the interactive tools
4. Explore the content pages

Happy coding! 🚀


