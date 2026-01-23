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

    // 처음 로드됐을 때만 onLoaded 한 번 호출
    useEffect(() => {
        onLoaded?.();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useFrame((_, delta) => {
        if (!groupRef.current) return;
        if (isInteracting) return; // ↔ 사용자 조작 중/4초 대기 중이면 회전 안 함
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
        }, 4000); // ← 4초 후 자동 회전 재개
    };

    // 컴포넌트 언마운트 시 타이머 정리
    useEffect(() => {
        return () => {
            if (interactionTimeoutRef.current) {
                clearTimeout(interactionTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="relative w-full h-full">
            {/* 로딩 이펙트 */}
            <div
                className={`
          pointer-events-none absolute inset-0 flex items-center justify-center
          transition-opacity duration-700
          ${modelLoaded ? "opacity-0" : "opacity-100"}
        `}
            >
                <div className="h-72 w-72 rounded-full bg-gradient-to-tr from-cyan-400/60 via-sky-500/30 to-violet-500/60 blur-3xl animate-pulse" />
            </div>

            <div className="relative z-10 w-full h-full">
                <Canvas
                    camera={{ position: [5, -5, 8], fov: 10 }}
                    style={{ background: "transparent" }}
                    gl={{ alpha: true }}
                >
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
