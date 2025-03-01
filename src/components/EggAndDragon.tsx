import { useGLTF, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { ThreeElements } from "@react-three/fiber/dist/declarations/src";
import { useRef } from "react";

export default function EggAndDragon() {
	const egg = useGLTF("/assets/Flaming_Egg.glb");
	const dragon = useGLTF("/assets/dragon-model.glb");

	const eggRef = useRef<ThreeElements["primitive"]>(null);
	const dragonRef = useRef<ThreeElements["primitive"]>(null);

	const scroll = useScroll();
	useFrame((state) => {
		if (eggRef.current && dragonRef.current) {
			const eggOpacity = Math.max(0, 1 - scroll.offset * 2); // Fade out EggModel
			const dragonOpacity = Math.max(0, scroll.offset * 2 - 1); // Fade in DragonModel

			// Set opacity for both models
			eggRef.current.traverse(
				(child: { material: { transparent: boolean; opacity: number } }) => {
					if (child.material) {
						child.material.transparent = true;
						child.material.opacity = eggOpacity;
					}
				},
			);

			dragonRef.current.traverse(
				(child: { material: { transparent: boolean; opacity: number } }) => {
					if (child.material) {
						child.material.transparent = true;
						child.material.opacity = dragonOpacity;
					}
				},
			);
			// Heartbeat animation for the egg
			const scale = 1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1; // Adjust speed and intensity
			if (eggOpacity !== 0) {
				eggRef.current.scale.set(scale, scale, scale);
			}
		}
	});
	return (
		<>
			<primitive
				ref={eggRef}
				object={egg.scene}
				position={[-0.3, 0.5, -1]}
				scale={1.5}
			/>
			<primitive
				ref={dragonRef}
				object={dragon.scene}
				position={[-0.3, 0.5, -1]}
				scale={2.5}
			/>
		</>
	);
}
