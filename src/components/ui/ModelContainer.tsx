import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html, useProgress } from '@react-three/drei';
import * as THREE from 'three';

// A simple loading spinner to show while the model is loading
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center text-white bg-slate-950/80 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-2"></div>
        <p className="text-xs font-semibold tracking-wider text-emerald-400">{progress.toFixed(0)}% LOADED</p>
      </div>
    </Html>
  );
}

// 1. Air Temperature 3D Model
const AirTemperature3D: React.FC<{ value: number }> = ({ value }) => {
  const normalizedVal = Math.min(Math.max((value - 0) / 50, 0), 1); // scale 0-50
  const columnHeight = normalizedVal * 1.8 + 0.1;
  const mercuryColor = value > 30 ? "#ef4444" : value < 15 ? "#3b82f6" : "#f59e0b";
  const glowRef = React.useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.05);
    }
  });

  return (
    <group position={[0, -0.7, 0]}>
      {/* Base Bulb */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color={mercuryColor} roughness={0.1} metalness={0.2} />
      </mesh>
      {/* Outer Glass Tube */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 2.0, 24]} />
        <meshStandardMaterial color="#ffffff" opacity={0.25} transparent roughness={0.05} metalness={0.1} />
      </mesh>
      {/* Inner Mercury Column */}
      <mesh position={[0, 0.3 + columnHeight / 2, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, columnHeight, 16]} />
        <meshStandardMaterial color={mercuryColor} roughness={0.1} />
      </mesh>
      {/* Outer Glass Top Cap */}
      <mesh position={[0, 2.3, 0]} castShadow>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#ffffff" opacity={0.25} transparent roughness={0.05} />
      </mesh>
      {/* Temperature Aura glow sphere */}
      <mesh ref={glowRef} position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color={mercuryColor} transparent opacity={0.06} depthWrite={false} />
      </mesh>
    </group>
  );
};

// 2. Relative Humidity 3D Model
const RelativeHumidity3D: React.FC<{ value: number }> = ({ value: _value }) => {
  const dropRef = React.useRef<THREE.Mesh>(null);
  const secondaryGroupRef = React.useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (dropRef.current) {
      dropRef.current.position.y = 0.8 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      dropRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
    if (secondaryGroupRef.current) {
      secondaryGroupRef.current.rotation.y = -state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* Main Droplet */}
      <mesh ref={dropRef} position={[0, 0.8, 0]} castShadow>
        <octahedronGeometry args={[0.55, 3]} />
        <meshStandardMaterial color="#0ea5e9" roughness={0.05} metalness={0.2} transparent opacity={0.8} />
      </mesh>
      {/* Orbiting Droplets */}
      <group ref={secondaryGroupRef} position={[0, 0.8, 0]}>
        {[0, 120, 240].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <mesh key={i} position={[Math.cos(rad) * 1.1, Math.sin(rad * 2) * 0.25, Math.sin(rad) * 1.1]} castShadow>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#38bdf8" roughness={0.1} metalness={0.1} transparent opacity={0.9} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// 3. Solar Radiation 3D Model
const SolarRadiation3D: React.FC<{ value: number }> = ({ value: _value }) => {
  const sunRef = React.useRef<THREE.Mesh>(null);
  const raysRef = React.useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
    if (raysRef.current) {
      raysRef.current.rotation.z = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Floating Glowing Sun */}
      <group position={[0, 1.4, 0]}>
        <mesh ref={sunRef} castShadow>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshBasicMaterial color="#eab308" />
        </mesh>
        <group ref={raysRef}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <group key={deg} rotation={[0, 0, (deg * Math.PI) / 180]}>
              <mesh position={[0, 0.65, 0]}>
                <coneGeometry args={[0.05, 0.25, 4]} />
                <meshBasicMaterial color="#facc15" />
              </mesh>
            </group>
          ))}
        </group>
      </group>
      
      {/* Solar Panel below */}
      <group position={[0, -0.4, 0.2]} rotation={[Math.PI / 6, 0, 0]}>
        {/* Support Stand */}
        <mesh position={[0, -0.3, -0.2]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.6]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        {/* Panel blue silicon face */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1.4, 0.08, 0.9]} />
          <meshStandardMaterial color="#1e40af" roughness={0.1} metalness={0.8} />
        </mesh>
        {/* Frame borders */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.42, 0.09, 0.92]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.4} wireframe />
        </mesh>
      </group>
    </group>
  );
};

// 4. Atmospheric Pressure 3D Model
const AtmosphericPressure3D: React.FC<{ value: number }> = ({ value }) => {
  const minP = 95;
  const maxP = 105;
  const normalized = Math.min(Math.max((value - minP) / (maxP - minP), 0), 1);
  const angle = (1.2 * Math.PI) - (normalized * 2.4 * Math.PI);
  
  return (
    <group position={[0, 0.5, 0]} rotation={[0, -Math.PI / 6, 0]}>
      {/* Outer Metal Case */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 0.22, 32]} />
        <meshStandardMaterial color="#475569" roughness={0.1} metalness={0.8} />
      </mesh>
      {/* Outer Rim Ring */}
      <mesh position={[0, 0, 0.12]}>
        <ringGeometry args={[0.92, 1.0, 32]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Dial Face */}
      <mesh position={[0, 0, 0.09]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.02, 32]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.9} />
      </mesh>
      {/* Indicator Needle */}
      <group position={[0, 0, 0.11]} rotation={[0, 0, angle]}>
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.03, 0.7, 0.01]} />
          <meshStandardMaterial color="#ef4444" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.7, 0]}>
          <coneGeometry args={[0.07, 0.12, 4]} />
          <meshStandardMaterial color="#ef4444" />
        </mesh>
        <mesh position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
      </group>
      {/* Decorative Dial Markings */}
      {[-2, -1, 0, 1, 2].map((i) => {
        const markAngle = (i * Math.PI) / 4;
        return (
          <group key={i} rotation={[0, 0, markAngle]} position={[0, 0, 0.1]}>
            <mesh position={[0, 0.72, 0]}>
              <boxGeometry args={[0.02, 0.1, 0.005]} />
              <meshBasicMaterial color="#334155" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

// 5. Air Quality (PM2.5) 3D Model
const AirQuality3D: React.FC<{ value: number }> = ({ value }) => {
  const groupRef = React.useRef<THREE.Group>(null);
  const particleCount = Math.min(Math.max(Math.floor(value * 0.65), 8), 90);
  const color = value < 35 ? "#10b981" : value < 75 ? "#f59e0b" : "#ef4444";
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.08) * 0.12;
    }
  });

  const particles = Array.from({ length: particleCount }).map((_, idx) => {
    const theta = idx * 0.4;
    const phi = Math.acos(-1 + (2 * idx) / particleCount);
    const radius = 0.3 + Math.sin(idx * 7.3) * 0.55;
    return {
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.sin(phi) * Math.sin(theta) + 0.6,
      z: radius * Math.cos(phi),
      size: 0.025 + Math.abs(Math.sin(idx)) * 0.045,
    };
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Bounding Sphere */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[1.0, 24, 24]} />
        <meshStandardMaterial color={color} transparent opacity={0.06} roughness={0.1} />
      </mesh>
      {/* Floating Particles */}
      <group ref={groupRef}>
        {particles.map((p, i) => (
          <mesh key={i} position={[p.x, p.y, p.z]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshBasicMaterial color={color} opacity={0.75} transparent />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// 6. Wind Speed 3D Model
const WindSpeed3D: React.FC<{ value: number }> = ({ value }) => {
  const bladeRef = React.useRef<THREE.Group>(null);
  const rotSpeed = Math.max(0.4, value * 0.08);
  
  useFrame((_state, delta) => {
    if (bladeRef.current) {
      bladeRef.current.rotation.z += delta * rotSpeed;
    }
  });

  return (
    <group position={[0, -0.9, 0]}>
      {/* Tower */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.13, 2.4, 16]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Nacelle */}
      <mesh position={[0, 2.4, 0.08]} castShadow>
        <boxGeometry args={[0.25, 0.25, 0.5]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.4} />
      </mesh>
      {/* Blade Hub */}
      <group ref={bladeRef} position={[0, 2.4, 0.35]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.15, 16]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
        {/* Three Blades */}
        {[0, 120, 240].map((deg) => (
          <group key={deg} rotation={[0, 0, (deg * Math.PI) / 180]}>
            <mesh position={[0, 0.7, 0]} castShadow>
              <boxGeometry args={[0.06, 1.4, 0.015]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

// 7. Wind Direction 3D Model
const WindDirection3D: React.FC<{ value: number | string }> = ({ value }) => {
  const getAngle = (): number => {
    if (typeof value === 'number') return (value * Math.PI) / 180;
    const lookup: Record<string, number> = {
      N: 0, NNE: 22.5, NE: 45, ENE: 67.5,
      E: 90, ESE: 112.5, SE: 135, SSE: 157.5,
      S: 180, SSW: 202.5, SW: 225, WSW: 247.5,
      W: 270, WNW: 292.5, NW: 315, NNW: 337.5
    };
    return ((lookup[value.toUpperCase()] || 0) * Math.PI) / 180;
  };

  const angle = getAngle();
  const arrowGroup = React.useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (arrowGroup.current) {
      arrowGroup.current.position.y = 0.5 + Math.sin(state.clock.getElapsedTime() * 2) * 0.04;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Compass Base Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
        <cylinderGeometry args={[1.1, 1.12, 0.08, 32]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
      </mesh>
      {/* Compass Dial Face */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.25, 0]} receiveShadow>
        <cylinderGeometry args={[1.05, 1.05, 0.02, 32]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.9} />
      </mesh>
      
      {/* Wind Arrow Vane */}
      <group ref={arrowGroup} position={[0, 0.5, 0]} rotation={[0, -angle, 0]}>
        {/* Tail */}
        <mesh position={[0, 0, 0.45]} castShadow>
          <boxGeometry args={[0.35, 0.08, 0.08]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        {/* Arrow Shaft */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.9, 8]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        {/* Arrow Head pointing forward (-Z direction) */}
        <mesh position={[0, 0, -0.5]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <coneGeometry args={[0.13, 0.35, 4]} />
          <meshStandardMaterial color="#6366f1" roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
};

// 8. Rainfall 3D Model
const Rainfall3D: React.FC<{ value: number }> = ({ value }) => {
  const cloudRef = React.useRef<THREE.Group>(null);
  const rainCount = Math.min(Math.max(Math.floor(value * 3.5), 10), 100);
  
  const [drops] = React.useState(() => {
    return Array.from({ length: 100 }).map(() => ({
      x: (Math.random() - 0.5) * 1.6,
      y: Math.random() * 1.8,
      z: (Math.random() - 0.5) * 1.6,
      speed: 1.2 + Math.random() * 1.8
    }));
  });

  useFrame((state, delta) => {
    if (cloudRef.current) {
      cloudRef.current.position.y = 1.6 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.04;
    }
    drops.forEach((d) => {
      d.y -= delta * d.speed;
      if (d.y < -0.4) {
        d.y = 1.6; // Reset at cloud height
      }
    });
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Clouds */}
      <group ref={cloudRef} position={[0, 1.6, 0]}>
        <mesh position={[-0.35, 0, 0]} castShadow>
          <sphereGeometry args={[0.38, 16, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.12, 0]} castShadow>
          <sphereGeometry args={[0.48, 16, 16]} />
          <meshStandardMaterial color="#334155" roughness={0.9} />
        </mesh>
        <mesh position={[0.35, 0, 0]} castShadow>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.9} />
        </mesh>
      </group>
      {/* Rainfall particles */}
      {drops.slice(0, rainCount).map((d, i) => (
        <mesh key={i} position={[d.x, d.y, d.z]}>
          <cylinderGeometry args={[0.004, 0.004, 0.15, 4]} />
          <meshBasicMaterial color="#3b82f6" opacity={0.65} transparent />
        </mesh>
      ))}
    </group>
  );
};

// 9. UV Index 3D Model
const UVIndex3D: React.FC<{ value: number }> = ({ value }) => {
  const sunRef = React.useRef<THREE.Mesh>(null);
  const raysRef = React.useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
    if (raysRef.current) {
      raysRef.current.rotation.z = -state.clock.getElapsedTime() * 0.3;
    }
  });

  const getUVColor = () => {
    if (value <= 2) return "#10b981";
    if (value <= 5) return "#eab308";
    if (value <= 7) return "#f97316";
    if (value <= 10) return "#ef4444";
    return "#a855f7";
  };

  const uvColor = getUVColor();

  return (
    <group position={[0, -0.1, 0]}>
      {/* Core Solar Orb */}
      <group position={[0, 1.4, 0]}>
        <mesh ref={sunRef} castShadow>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshBasicMaterial color={uvColor} />
        </mesh>
        <group ref={raysRef}>
          {Array.from({ length: 12 }).map((_, i) => {
            const rad = (i * 30 * Math.PI) / 180;
            return (
              <mesh key={i} position={[Math.cos(rad) * 0.55, Math.sin(rad) * 0.55, 0]} rotation={[0, 0, rad - Math.PI / 2]}>
                <coneGeometry args={[0.04, 0.22, 4]} />
                <meshBasicMaterial color={uvColor} transparent opacity={0.8} />
              </mesh>
            );
          })}
        </group>
      </group>
      
      {/* Protection glass dome */}
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 6, 0, 0]}>
        <sphereGeometry args={[0.85, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#818cf8" transparent opacity={0.2} roughness={0.1} metalness={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// 10. Battery Level 3D Model
const Battery3D: React.FC<{ value: number }> = ({ value }) => {
  const normVal = Math.min(Math.max(value / 100, 0.05), 1.0);
  const coreHeight = normVal * 1.3;
  const batteryColor = value > 50 ? "#10b981" : value > 20 ? "#eab308" : "#ef4444";
  const particleGroup = React.useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (particleGroup.current) {
      particleGroup.current.rotation.y = state.clock.getElapsedTime() * 0.7;
    }
  });

  return (
    <group position={[0, 0.1, 0]} rotation={[0.15, -Math.PI / 4, 0]}>
      {/* Transparent casing */}
      <mesh castShadow>
        <boxGeometry args={[0.8, 1.5, 0.8]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} roughness={0.05} metalness={0.1} />
      </mesh>
      {/* Metal mesh border */}
      <mesh>
        <boxGeometry args={[0.82, 1.52, 0.82]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} metalness={0.8} wireframe />
      </mesh>
      {/* Battery anode terminal */}
      <mesh position={[0, 0.82, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.12, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Dynamic level fluid */}
      <mesh position={[0, -0.75 + coreHeight / 2, 0]} castShadow>
        <boxGeometry args={[0.68, coreHeight, 0.68]} />
        <meshStandardMaterial color={batteryColor} roughness={0.2} metalness={0.1} transparent opacity={0.7} />
      </mesh>
      
      {/* Orbiting Charge Nodes */}
      <group ref={particleGroup} position={[0, -0.75 + coreHeight, 0]}>
        {Array.from({ length: 8 }).map((_, i) => {
          const theta = (i * Math.PI) / 4;
          return (
            <mesh key={i} position={[Math.cos(theta) * 0.3, Math.sin(i * 1.5) * 0.12, Math.sin(theta) * 0.3]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          );
        })}
      </group>
    </group>
  );
};

// Dispatch component to render the correct 3D model
const RenderModel: React.FC<{ metric: string; value: string | number }> = ({ metric, value }) => {
  const m = metric.toLowerCase();
  const numValue = typeof value === 'number' ? value : parseFloat(String(value)) || 0;

  if (m.includes("temperature")) {
    return <AirTemperature3D value={numValue} />;
  }
  if (m.includes("humidity")) {
    return <RelativeHumidity3D value={numValue} />;
  }
  if (m.includes("solar")) {
    return <SolarRadiation3D value={numValue} />;
  }
  if (m.includes("pressure")) {
    return <AtmosphericPressure3D value={numValue} />;
  }
  if (m.includes("quality") || m.includes("pm2.5")) {
    return <AirQuality3D value={numValue} />;
  }
  if (m.includes("speed")) {
    return <WindSpeed3D value={numValue} />;
  }
  if (m.includes("direction")) {
    return <WindDirection3D value={value} />;
  }
  if (m.includes("rainfall")) {
    return <Rainfall3D value={numValue} />;
  }
  if (m.includes("uv")) {
    return <UVIndex3D value={numValue} />;
  }
  if (m.includes("battery")) {
    return <Battery3D value={numValue} />;
  }

  // Fallback box
  return (
    <mesh position={[0, 0.5, 0]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#3b82f6" wireframe />
    </mesh>
  );
};

interface ModelContainerProps {
  children?: React.ReactNode;
  className?: string;
  metric?: string;
  value?: string | number;
}

const ModelContainer: React.FC<ModelContainerProps> = ({ 
  children, 
  className = "w-full h-[400px] rounded-xl overflow-hidden bg-slate-900",
  metric,
  value
}) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 1.8, 4.2], fov: 42 }}
        dpr={[1, 2]}
        shadows
      >
        <ambientLight intensity={0.65} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.2} 
          castShadow 
          shadow-mapSize={1024}
        />
        <pointLight position={[-8, -5, -8]} intensity={0.4} />

        <Suspense fallback={<Loader />}>
          {children ? children : (
            metric && value !== undefined ? (
              <RenderModel metric={metric} value={value} />
            ) : (
              <mesh position={[0, 0.5, 0]} castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="#10b981" wireframe />
              </mesh>
            )
          )}

          <ContactShadows 
            position={[0, -0.4, 0]} 
            opacity={0.35} 
            scale={7} 
            blur={1.8} 
            far={3} 
          />

          <Environment preset="city" />
        </Suspense>

        <OrbitControls 
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.9}
          minDistance={2.5}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
};

export default ModelContainer;
