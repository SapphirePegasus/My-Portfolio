import * as THREE from "three";
import React, { useRef, Suspense, useEffect, useMemo } from "react";
import {
  Canvas,
  extend,
  useThree,
  useLoader,
  useFrame,
} from "@react-three/fiber";
import { useGLTF, Stars, Environment, Text } from "@react-three/drei";
import { Water } from "three-stdlib";
import useIsMobile from "../../utils/useIsMobile";

extend({ Water });

function Ocean() {
  const ref = useRef();
  const { gl } = useThree();
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "/assets/hero/waternormals.jpeg"
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const geom = useMemo(() => new THREE.PlaneGeometry(200, 200), []);
  const config = useMemo(
    () => ({
      textureWidth: 256,
      textureHeight: 256,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0x88ccff,
      waterColor: 0x003366,
      distortionScale: 2,
      fog: true,
      format: gl.encoding,
    }),
    [waterNormals]
  );

  useFrame((state, delta) => {
    ref.current.material.uniforms.time.value += delta * 0.5;
  });

  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />;
}

const material = new THREE.MeshPhysicalMaterial({
  thickness: 2,
  transmission: 0.5,
  opacity: 0.9,
  transparent: true,
  roughness: 0.1,
  metalness: 0.2,
  clearcoat: 1,
  clearcoatRoughness: 0.05,
  ior: 1.45,
  color: "#0e6ba8",
});

const PegasusModel = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/assets/hero/pegasus.glb");

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material = material;
        }
      });
    }
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.set(-1, -0.5, -12);
      modelRef.current.rotation.set(0, -0.7, 0);
      modelRef.current.scale.set(1.1, 1.1, 1.1);
    }
  });

  return <primitive ref={modelRef} object={scene} />;
};

function SceneText() {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return (
    <>
      <Text
        position={[0, isMobile ? 13 : 8, -15]}
        fontSize={isMobile ? 2.5 : 5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.5}
        font="/fonts/alegreya.regular.ttf"
      >
        Creative
      </Text>
      <Text
        position={[0, isMobile ? 10.5 : 3, -15]}
        fontSize={isMobile ? 2.5 : 5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.5}
        font="/fonts/alegreya.regular.ttf"
      >
        Engineer
      </Text>
    </>
  );
}

const fixedPositions = [
  { position: [-13, 0, -15], size: 0.3 },
  { position: [-4, 0, -9], size: 0.3 },
  { position: [-12, 0, -25], size: 0.3 },
  { position: [5, 0, -16], size: 0.4 },
  { position: [13, 0, -22], size: 0.3 },
  { position: [10, 0, -10], size: 0.4 },
];

function GlowingOrbs() {
  const orbsRef = useRef([]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    orbsRef.current.forEach((orb, index) => {
      if (orb) {
        const speed = 1 + index * 0.2;
        orb.position.y =
          fixedPositions[index].position[1] + Math.sin(time * speed) * 0.15; // Small sway motion
      }
    });
  });

  return (
    <>
      {fixedPositions.map(({ position, size }, index) => (
        <mesh
          key={index}
          ref={(el) => (orbsRef.current[index] = el)}
          position={position}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            emissive={"#ffab00"}
            emissiveIntensity={2}
            toneMapped={false}
          />
          <pointLight
            position={position}
            color={"#ffab00"}
            intensity={3 * size}
            distance={10 * size}
          />
        </mesh>
      ))}
    </>
  );
}

function CameraSway() {
  const { camera } = useThree();
  const targetRotation = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    const normalizedX = (event.clientX / window.innerWidth - 0.5) * 2;
    const normalizedY = (event.clientY / window.innerHeight - 0.5) * 2;

    targetRotation.current.x = normalizedY * 0.05; // Adjust vertical sensitivity
    targetRotation.current.y = -normalizedX * 0.1; // Adjust horizontal sensitivity
  };

  useFrame(() => {
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      targetRotation.current.x,
      0.05
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      targetRotation.current.y,
      0.05
    );
  });

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}

function ResponsiveCamera() {
  const { size, camera } = useThree();
  const isMobile = size.width < 768;

  useEffect(() => {
    camera.position.set(isMobile ? 0 : 0, 4, isMobile ? 3 : 1);
    camera.fov = isMobile ? 70 : 50;
    camera.updateProjectionMatrix();
  }, [isMobile, camera]);

  return null;
}

// Custom Shader Material for Sky
class SkyShaderMaterial extends THREE.ShaderMaterial {
  constructor(cloudTexture) {
    super({
      uniforms: {
        topColor: { value: new THREE.Color("#560bad") }, // Deep purple
        bottomColor: { value: new THREE.Color("#151667") }, // Dark blue-violet
        alphaIntensity: { value: 0.9 }, // Transparency control
        cloudTexture: { value: cloudTexture }, // Cloud texture
        cloudOpacity: { value: 0.12 }, // Opacity of the clouds
        cloudScale: { value: 1.0 }, // Adjusts how many cloud patches appear
      },
      vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        void main() {
          vPosition = position;
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float alphaIntensity;
        uniform sampler2D cloudTexture;
        uniform float cloudOpacity;
        uniform float cloudScale;
        
        varying vec3 vPosition;
        varying vec2 vUv;

        void main() {
          float intensity = smoothstep(-1.0, 1.0, normalize(vPosition).y);
          vec3 skyColor = mix(bottomColor, topColor, intensity);
          
          // Sample the cloud texture (scaled for variation)
          vec2 uv = vUv * cloudScale; // Adjust tiling
          vec4 cloudColor = texture2D(cloudTexture, uv);

          // Ensure clouds are visible (increase brightness if needed)
          cloudColor.rgb *= 1.5; // Boost brightness
          
          // Blend clouds with gradient based on cloud alpha
          vec3 finalColor = mix(skyColor, cloudColor.rgb, cloudOpacity * cloudColor.a);

          // Final transparency control
          float alpha = smoothstep(0.3, 1.0, intensity) * alphaIntensity;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      side: THREE.BackSide, // Ensures the shader is visible from inside
      transparent: true, // Allows blending with stars
      depthWrite: false, // Ensures stars remain visible
    });
  }
}

// Extend Three.js to recognize the new material
extend({ SkyShaderMaterial });

function ProceduralSky() {
  const cloudTexture = useLoader(
    THREE.TextureLoader,
    "/assets/hero/clouds.webp"
  );
  const skyRef = useRef();

  useFrame(({ clock }) => {
    if (skyRef.current) {
      skyRef.current.rotation.y = clock.getElapsedTime() * 0.009; // Slow rotation
      skyRef.current.material.uniforms.topColor.value.set("#560bad");
      skyRef.current.material.uniforms.bottomColor.value.set("#151667");
      skyRef.current.material.uniforms.alphaIntensity.value = 0.9;
      skyRef.current.material.uniforms.cloudOpacity.value = 0.12;
      skyRef.current.material.uniforms.cloudScale.value = 1;
    }
  });

  return (
    <mesh ref={skyRef} scale={[1, 1, 1]}>
      <sphereGeometry args={[100, 32, 32]} />
      <skyShaderMaterial args={[cloudTexture]} />
    </mesh>
  );
}

export default function Scene() {
  const isMobile = useIsMobile(768);

  return (
    <Canvas
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
      }}
      camera={{
        position: [0, 4, 1],
        rotation: [0.1, 0, 0],
        fov: 50,
        near: 1,
        far: 20000,
      }}
    >
      <color attach="background" args={["#000814"]} />
      <fog attach="fog" args={["#000814", 50, 100]} />

      <directionalLight position={[10, 10, 10]} intensity={0.8} />
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 10, 5]} angle={0.3} intensity={1} />
      <Suspense fallback={null}>
        <Environment preset="night" />
        <ProceduralSky />
        <ResponsiveCamera />
        {!isMobile && <CameraSway />}
        <PegasusModel />
        <SceneText />
        <Ocean />
        <GlowingOrbs />
        <Stars
          radius={150}
          depth={50}
          count={400}
          factor={8}
          saturation={1}
          fade
        />
      </Suspense>
    </Canvas>
  );
}
