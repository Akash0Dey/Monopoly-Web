# Monopoly Web

A modern web application for Monopoly, built with React, TypeScript, Vite, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (comes with Node.js)

### Install dependencies

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Tailwind CSS

Tailwind is configured in `tailwind.config.js`:

```js
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
```

Tailwind directives are included in `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## Linting & Formatting

- **ESLint**: For code linting.
- **Prettier**: For code formatting.

### Run Lint

```bash
npm run lint
```

### Run Format

```bash
npm run format
```

---

## Building for Production

```bash
npm run build
```

The output will be in the `dist/` directory.

---

## Docker

A multi-stage Dockerfile is provided for production builds.

### Build Docker Image

```bash
docker build -t monopoly-web .
```

### Run Docker Container

```bash
docker run -p 80:80 monopoly-web
```

---

## Deploying as a Static Site (e.g., Render)

1. **Build the project**:  
   `npm run build`
2. **Deploy the `dist/` folder** as your static site root.
3. **For Render**:  
   - Set the build command: `npm run build`
   - Set the publish directory: `dist`

---
