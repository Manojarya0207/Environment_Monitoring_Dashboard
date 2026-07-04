import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sparkles, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface MetricSceneProps {
  metric: string;
}

// Spinning elements for wind
function WindVisualization() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 2;
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 3]}>
          <boxGeometry args={[0.2, 3, 0.1]} />
          <meshStandardMaterial color="#88ccff" metalness={0.5} roughness={0.2} />
        </mesh>
      ))}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.5, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Pulsing sphere for temperature/radiation
function PulseVisualization({ color, scale = 1 }: { color: string, scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = scale + Math.sin(clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.set(s, s, s);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 32, 32]}>
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      <Sparkles count={50} scale={4} size={2} speed={0.4} opacity={0.5} color={color} />
    </Float>
  );
}

// Generic floating particles for other metrics (like humidity/pressure)
function ParticlesVisualization({ color }: { color: string }) {
  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
      <Sparkles count={100} scale={5} size={4} speed={0.2} opacity={0.8} color={color} />
      <mesh>
        <torusGeometry args={[1.5, 0.2, 16, 100]} />
        <meshStandardMaterial color={color} wireframe opacity={0.3} transparent />
      </mesh>
    </Float>
  );
}

function getVisualizationForMetric(metric: string) {
  const lowerMetric = metric.toLowerCase();
  
  if (lowerMetric.includes("wind")) {
    return <WindVisualization />;
  }
  if (lowerMetric.includes("temperature")) {
    return <PulseVisualization color="#ff5555" />;
  }
  if (lowerMetric.includes("radiation") || lowerMetric.includes("uv")) {
    return <PulseVisualization color="#ffcc00" scale={1.2} />;
  }
  if (lowerMetric.includes("humidity") || lowerMetric.includes("rain")) {
    return <ParticlesVisualization color="#4488ff" />;
  }
  if (lowerMetric.includes("air quality")) {
    return <ParticlesVisualization color="#55aa55" />;
  }
  
  // Default fallback
  return <ParticlesVisualization color="#aaaaaa" />;
}

export function MetricScene({ metric }: MetricSceneProps) {
  return (
    <div className="w-full h-full min-h-[300px] rounded-2xl overflow-hidden bg-black/20">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Environment preset="city" />
        
        {getVisualizationForMetric(metric)}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={1} 
        />
      </Canvas>
    </div>
  );
}
