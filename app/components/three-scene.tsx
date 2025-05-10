import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const outlineMeshRef = useRef<THREE.Mesh | null>(null);
  const [outlineColor, setOutlineColor] = useState("#00ff00");
  const [selectedObject, setSelectedObject] = useState<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.8 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const objects: THREE.Mesh[] = [];

    const createObject = (geometry: THREE.BufferGeometry, color: number, position: [number, number, number]) => {
      const material = new THREE.MeshStandardMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.castShadow = true;
      scene.add(mesh);
      objects.push(mesh);
    };

    createObject(new THREE.BoxGeometry(2, 2, 2), 0x4285f4, [-6, 1, 0]);
    createObject(new THREE.SphereGeometry(1.2, 32, 32), 0xea4335, [-3, 1.2, 0]);
    createObject(new THREE.ConeGeometry(1, 2.5, 32), 0xfbbc05, [0, 1.25, 0]);
    createObject(new THREE.CylinderGeometry(0.8, 0.8, 2, 32), 0x34a853, [3, 1, 0]);
    createObject(new THREE.TorusGeometry(1, 0.4, 16, 100), 0x9c27b0, [6, 1, 0]);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const createOutlineMesh = (object: THREE.Mesh) => {
      if (outlineMeshRef.current) {
        scene.remove(outlineMeshRef.current);
      }

      const outlineMaterial = new THREE.MeshBasicMaterial({
        color: outlineColor,
        side: THREE.BackSide,
      });

      const outlineMesh = object.clone();
      outlineMesh.material = outlineMaterial;
      outlineMesh.scale.multiplyScalar(1.05);
      outlineMeshRef.current = outlineMesh;
      scene.add(outlineMesh);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(objects);
      document.body.style.cursor = intersects.length > 0 ? "pointer" : "default";
    };

    const handleClick = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(objects);

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object as THREE.Mesh;

        if (selectedObject !== intersectedObject) {
          setSelectedObject(intersectedObject);
          createOutlineMesh(intersectedObject);
        }
      } else {
        setSelectedObject(null);
        if (outlineMeshRef.current) {
          scene.remove(outlineMeshRef.current);
          outlineMeshRef.current = null;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("click", handleClick);

  if (containerRef.current) {
    containerRef.current.removeChild(renderer.domElement);
  }

  // Dispose of objects, materials, and renderer
  scene.traverse((object) => {
    if ((object as THREE.Mesh).geometry) {
      (object as THREE.Mesh).geometry.dispose();
    }
    if ((object as THREE.Mesh).material) {
      const material = (object as THREE.Mesh).material as THREE.Material;
      material.dispose();
    }
  });

  renderer.dispose();
  controls.dispose();
};
  }, [outlineColor]);

  return (
    <div className="w-full h-full relative">
      <input
        type="color"
        value={outlineColor}
        onChange={(e) => setOutlineColor(e.target.value)}
        className="absolute top-4 left-4 z-10 p-2 bg-white"
      />
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default ThreeScene;
