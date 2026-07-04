import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';

// A simple loading spinner to show while the model (when added) is loading
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-sm font-medium">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}

interface ModelContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const ModelContainer: React.FC<ModelContainerProps> = ({ 
  children, 
  className = "w-full h-[400px] rounded-xl overflow-hidden bg-slate-900" 
}) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 45 }}
        dpr={[1, 2]} // Optimize pixel ratio for different screens
        shadows
      >
        {/* Basic lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={1024}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={<Loader />}>
          {/* Group to center and contain your model */}
          <group position={[0, -1, 0]}>
            
            {/* 
              ADD YOUR MODEL HERE
              Example: <Your3DModel scale={1} /> 
            */}
            {children ? children : (
              // Placeholder mesh if no children are provided
              <mesh position={[0, 1, 0]} castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#3b82f6" wireframe />
              </mesh>
            )}

            {/* Realistic drop shadow below the model */}
            <ContactShadows 
              position={[0, 0, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2} 
              far={4} 
            />
          </group>

          {/* Environment map for realistic reflections and lighting */}
          <Environment preset="city" />
        </Suspense>

        {/* Camera controls */}
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 4} // Restrict camera from going too low
          maxPolarAngle={Math.PI / 2} // Restrict camera from going under the floor
          minDistance={2}
          maxDistance={15}
        />
      </Canvas>
    </div>
  );
};

export default ModelContainer;
