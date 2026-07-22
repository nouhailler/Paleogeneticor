import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { SkullProfile } from '../types/domain';

interface SkullViewer3DProps {
  skull: SkullProfile;
  comparison?: SkullProfile;
  showComparison: boolean;
  autoRotate: boolean;
  selectedAnnotationId: string;
  onSelectAnnotation: (id: string) => void;
}

function makeMaterial(color: string, opacity = 1) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: 0.72,
    metalness: 0.04,
    transparent: opacity < 1,
    opacity
  });
}

function makeEyeSocket(x: number) {
  const socket = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 24, 16),
    new THREE.MeshStandardMaterial({ color: '#17211f', roughness: 0.9 })
  );
  socket.position.set(x, 0.1, 0.74);
  socket.scale.set(1.05, 0.7, 0.32);
  return socket;
}

function createSkullGroup(skull: SkullProfile, sideOffset: number, opacity = 1) {
  const group = new THREE.Group();
  group.name = skull.id;
  group.position.x = sideOffset;

  const bone = makeMaterial('#ead7b6', opacity);
  const accent = makeMaterial(skull.model.color, opacity);
  const dark = makeMaterial('#17211f', opacity);

  const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.82, 48, 32), bone);
  cranium.scale.set(skull.model.cranialScale[0], skull.model.cranialScale[1], skull.model.cranialScale[2]);
  cranium.position.set(0, 0.38 + skull.model.cranialHeight, -0.04);
  group.add(cranium);

  const face = new THREE.Mesh(new THREE.SphereGeometry(0.52, 36, 24), bone);
  face.scale.set(0.86, 0.82, 0.58 + skull.model.faceProjection);
  face.position.set(0, -0.18, 0.56 + skull.model.faceProjection * 0.45);
  group.add(face);

  const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.34, 0.42 + skull.model.jawProjection), bone);
  jaw.position.set(0, -0.78, 0.42 + skull.model.jawProjection * 0.5);
  jaw.rotation.x = -0.08;
  group.add(jaw);

  const brow = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.1 + skull.model.browRidge, 0.16), accent);
  brow.position.set(0, 0.28, 0.76);
  brow.rotation.x = -0.1;
  group.add(brow);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.36 + skull.model.faceProjection * 0.25, 4), dark);
  nose.position.set(0, -0.18, 0.9 + skull.model.faceProjection * 0.55);
  nose.rotation.x = Math.PI / 2;
  group.add(nose);

  group.add(makeEyeSocket(-0.24));
  group.add(makeEyeSocket(0.24));

  const teeth = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.08), new THREE.MeshStandardMaterial({ color: '#fff8e9' }));
  teeth.position.set(0, -0.58, 0.78 + skull.model.jawProjection * 0.35);
  group.add(teeth);

  skull.annotations.forEach((annotation) => {
    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.045, 18, 12), accent);
    marker.position.set(annotation.position[0], annotation.position[1], annotation.position[2]);
    marker.name = `annotation:${annotation.id}`;
    group.add(marker);
  });

  return group;
}

export function SkullViewer3D({
  skull,
  comparison,
  showComparison,
  autoRotate,
  selectedAnnotationId,
  onSelectAnnotation
}: SkullViewer3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onSelectRef = useRef(onSelectAnnotation);
  const selectedRef = useRef(selectedAnnotationId);

  useEffect(() => {
    onSelectRef.current = onSelectAnnotation;
  }, [onSelectAnnotation]);

  useEffect(() => {
    selectedRef.current = selectedAnnotationId;
  }, [selectedAnnotationId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return undefined;
    }
    const target = container;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f7f4ed');

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.25, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    target.appendChild(renderer.domElement);

    const keyLight = new THREE.DirectionalLight('#ffffff', 2.1);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    scene.add(new THREE.AmbientLight('#fff7e8', 1.15));

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 4),
      new THREE.MeshStandardMaterial({ color: '#e8dfcb', roughness: 0.95 })
    );
    floor.position.y = -1.18;
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const root = new THREE.Group();
    scene.add(root);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function renderSkulls() {
      root.clear();
      const primaryOffset = showComparison && comparison ? -0.78 : 0;
      root.add(createSkullGroup(skull, primaryOffset, 1));

      if (showComparison && comparison) {
        root.add(createSkullGroup(comparison, 0.88, 0.62));
      }
    }

    function resize() {
      const width = Math.max(target.clientWidth, 1);
      const height = Math.max(target.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    function handlePointerDown(event: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(root.children, true);
      const marker = hits.find((hit) => hit.object.name.startsWith('annotation:'));
      if (marker) {
        onSelectRef.current(marker.object.name.replace('annotation:', ''));
      }
    }

    let frame = 0;
    function animate() {
      frame = window.requestAnimationFrame(animate);
      if (autoRotate) {
        root.rotation.y += 0.006;
      }
      root.traverse((object) => {
        if (object.name.startsWith('annotation:')) {
          const marker = object as THREE.Mesh;
          const markerId = marker.name.replace('annotation:', '');
          const scale = markerId === selectedRef.current ? 1.85 : 1;
          marker.scale.setScalar(scale);
        }
      });
      renderer.render(scene, camera);
    }

    renderSkulls();
    resize();
    animate();
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    const observer = new ResizeObserver(resize);
    observer.observe(target);

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.dispose();
      target.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else {
            material.dispose();
          }
        }
      });
    };
  }, [autoRotate, comparison, showComparison, skull]);

  return <div ref={containerRef} className="h-full min-h-[420px] w-full" aria-label={`Visualisation 3D de ${skull.name}`} />;
}
