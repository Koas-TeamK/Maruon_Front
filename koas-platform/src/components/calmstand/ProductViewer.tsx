import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';

interface ProductModelProps {
    url: string;
}

function ProductModel({ url }: ProductModelProps) {
    const { scene } = useGLTF(url);
    return <primitive object={scene} scale={0.7} />;
}

export default function ProductViewer() {
    return (
        <Canvas
            camera={{ position: [1, 0, 8], fov: 10 }}
            style={{ width: '100%', height: '100%', background: 'transparent' }}
            gl={{ alpha: true }}
        >
            <Suspense fallback={
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color="gray" />
                </mesh>
            }>
                <ambientLight intensity={0.5} />
                <spotLight position={[5, 10, 5]} intensity={1} angle={0.3} penumbra={1} castShadow />

                <Environment preset="city" />

                <ProductModel url="/calmStand/CES.glb" />

                <OrbitControls enableZoom={true} />
            </Suspense>
        </Canvas>
    );
}
