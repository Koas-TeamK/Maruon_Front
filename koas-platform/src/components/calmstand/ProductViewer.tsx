"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

interface ProductModelProps {
    url: string;
    isInteracting: boolean;
    onLoaded?: () => void;
}

function ProductModel({ url, isInteracting, onLoaded }: ProductModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const { scene } = useGLTF(url);

    // GLB가 로드되어 컴포넌트가 처음 나타났을 때 호출
    useEffect(() => {
        onLoaded?.();
    }, [onLoaded]);

    useFrame((_, delta) => {
        if (!groupRef.current) return;
        if (isInteracting) return;
        groupRef.current.rotation.y += delta * 0.25;
    });

    return (
        <group ref={groupRef}>
            <primitive object={scene} scale={1.5} />
        </group>
    );
}

export default function ProductViewer() {
    const modelUrl =
        "https://j6wajg0oe8xjlsj8.public.blob.vercel-storage.com/CES.glb";

    const [modelLoaded, setModelLoaded] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);
    const interactionTimeoutRef = useRef<number | null>(null);

    const handleStartInteraction = () => {
        setIsInteracting(true);
        if (interactionTimeoutRef.current) {
            clearTimeout(interactionTimeoutRef.current);
            interactionTimeoutRef.current = null;
        }
    };

    const handleEndInteraction = () => {
        interactionTimeoutRef.current = window.setTimeout(() => {
            setIsInteracting(false);
        }, 4000);
    };

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* 🔥 배경 애니메이션: 로딩 중에만 보이고, 로딩 끝나면 페이드아웃 */}
            <div
                className={`
                    pointer-events-none absolute inset-0 flex items-center justify-center
                    transition-opacity duration-700
                    ${modelLoaded ? "opacity-0" : "opacity-100"}
                `}
            >
                <div className="h-72 w-72 rounded-full bg-gradient-to-tr from-cyan-400/60 via-sky-500/30 to-violet-500/60 blur-3xl animate-pulse" />
            </div>

            {/* 🌌 3D 모델 */}
            <div className="relative z-10 w-full h-full">
                <Canvas
                    camera={{ position: [5, -5, 8], fov: 10 }}
                    style={{ width: "100%", height: "100%", background: "transparent" }}
                    gl={{ alpha: true }}
                >
                    {/* GLB 로딩 전에는 ProductModel 자체가 아직 안 렌더됨 → 배경만 보임 */}
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.5} />
                        <spotLight
                            position={[5, 10, 5]}
                            intensity={1}
                            angle={0.3}
                            penumbra={1}
                            castShadow
                        />

                        <Environment preset="city" />

                        <ProductModel
                            url={modelUrl}
                            isInteracting={isInteracting}
                            onLoaded={() => setModelLoaded(true)}
                        />

                        <OrbitControls
                            enableZoom={true}
                            onStart={handleStartInteraction}
                            onEnd={handleEndInteraction}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    );
}
