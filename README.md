# Object Highlighter - Three.js

A 3D scene built using **Three.js** and **React** where users can interactively highlight objects with an outline effect. The application features multiple 3D objects (cubes, spheres, cones, torus, etc.) and allows users to select and outline them with a customizable color. Navigation is made easy with OrbitControls.

## 🚀 Features

- Multiple 3D objects placed in a 3D space.
- Click on objects to highlight them with an outline effect.
- Adjustable outline color via a color picker.
- Smooth scene navigation using OrbitControls.
- Responsive layout with React and Tailwind CSS.

## 🛠️ Technologies Used

- [React.js](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Three.js](https://threejs.org/)
- [OrbitControls](https://threejs.org/docs/#examples/en/controls/OrbitControls)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## ✅ Prerequisites

- Node.js (v16 or later)
- npm or yarn

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Nitesh-18/Object-Highlighter.git
   cd Object-Highlighter
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

## 🏃‍♂️ Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## 🖱️ Usage

- Use your mouse to orbit, zoom, and pan around the scene.
- Click on any object to highlight it with an outline.
- Change the outline color using the color picker in the top-left corner.

## 📁 Project Structure

- `app/components/three-scene.tsx` – Main 3D scene and interaction logic.
- `app/page.tsx` – Home page rendering the scene.
- `public/` – Static assets (icons, images).
- `types/` – TypeScript type definitions for Three.js controls.

<!-- ## 📝 License

This project is licensed under the MIT License. -->

---


Made with ❤️ using Three.js and React.
