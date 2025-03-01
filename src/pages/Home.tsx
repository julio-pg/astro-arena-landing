import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ScrollControls, useGLTF, useScroll } from "@react-three/drei";
import { Suspense, useEffect } from "react";
import { CubeTextureLoader } from "three";
import EggAndDragon from "@/components/EggAndDragon";

// Load the GLB model
function MainModel({ url }: { url: string }) {
	const { scene } = useGLTF(url);
	return <primitive object={scene} position={[0, -3, -0.7]} scale={2} />;
}

// Set up the skybox
function Skybox() {
	const { scene } = useThree();
	useEffect(() => {
		const loader = new CubeTextureLoader();
		const texture = loader.load([
			"/images/space-bg.jpg", // Right
			"/images/space-bg.jpg", // Left
			"/images/space-bg.jpg", // Top
			"/images/space-bg.jpg", // Bottom
			"/images/space-bg.jpg", // Front
			"/images/space-bg.jpg", // Back
		]);
		scene.background = texture;
	}, [scene]);

	return null;
}
function ScrollRotation() {
	const { camera } = useThree();
	const scroll = useScroll();

	useFrame(() => {
		// Define the orbit radius and height
		const radius = 5; // Distance from the egg
		const height = 2; // Height of the camera

		// Calculate the camera's position in polar coordinates
		const angle = -scroll?.offset * Math.PI * 2 + Math.PI / 2; // Full rotation (0 to 2π)
		camera.position.x = radius * Math.cos(angle); // X position
		camera.position.z = radius * Math.sin(angle); // Z position
		camera.position.y = height; // Y position (height)

		// Make the camera look at the egg (centered at [0, 0, 0])
		camera.lookAt(-0.3, 0.5, -1);
	});

	return null;
}
const Home = () => {
	return (
		<>
			<title>Astro Arena</title>
			<Canvas style={{ width: "100%", height: "100vh" }}>
				<ScrollControls pages={2}>
					<Skybox />
					<ambientLight intensity={3} />
					<pointLight position={[0, 0.5, 1]} intensity={20} color="#fff" />
					<pointLight position={[0, 0.5, -3]} intensity={20} color="#fff" />
					<pointLight position={[2, 0.5, 0]} intensity={20} color="#fff" />
					<pointLight position={[-2, 0.5, 0]} intensity={20} color="#fff" />
					<Suspense fallback={null}>
						<MainModel url="/assets/FutureStage.glb" />

						<EggAndDragon />
					</Suspense>
					<ScrollRotation />
				</ScrollControls>
			</Canvas>
		</>
	);
};

export default Home;
