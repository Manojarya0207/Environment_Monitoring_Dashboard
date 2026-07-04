import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Sky, Stars, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function WindTurbine() {
  const rotorRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (rotorRef.current) {
      // Rotate the blades based on wind speed (mocked here as constant)
      rotorRef.current.rotation.z -= delta * 2;
    }
  });

  return (
    <group position={[0, -2, 0]}>
      {/* Tower */}
      <mesh position={[0, 4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.5, 8, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>

      {/* Nacelle */}
      <mesh position={[0, 8, 0.5]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 2]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.3} />
      </mesh>

      {/* Rotor & Blades */}
      <group ref={rotorRef} position={[0, 8, 1.6]}>
        {/* Hub */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        
        {/* Blade 1 */}
        <mesh position={[0, 2, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 4, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Blade 2 */}
        <mesh position={[1.732, -1, 0]} rotation={[0, 0, (Math.PI * 2) / 3]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 4, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Blade 3 */}
        <mesh position={[-1.732, -1, 0]} rotation={[0, 0, (Math.PI * 4) / 3]} castShadow receiveShadow>
          <boxGeometry args={[0.2, 4, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
}

export function ThreeScene() {
  return (
    <div className="w-full h-full cursor-move">
      <Canvas shadows camera={{ position: [10, 5, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={1024}
        />
        
        <Sky sunPosition={[10, 10, 10]} />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <WindTurbine />
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>

        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
        <Environment preset="city" />
        
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2 - 0.05} 
          minDistance={5}
          maxDistance={30}
        />
      </Canvas>
    </div>
  );
}
