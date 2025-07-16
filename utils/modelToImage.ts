// // utils/modelToImage.ts
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
// import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

// export function modelToImage(modelUrl: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     let camera, scene, renderer;

//     const container = document.createElement("div");
//     container.style.position = "fixed";
//     container.style.top = "-9999px"; // hide off-screen
//     document.body.appendChild(container);

//     renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       preserveDrawingBuffer: true,
//     });
//     renderer.setSize(800, 600);
//     renderer.outputColorSpace = THREE.SRGBColorSpace; // ✅ New API
//     container.appendChild(renderer.domElement);

//     camera = new THREE.PerspectiveCamera(45, 800 / 600, 0.1, 1000);
//     camera.position.set(2, 2, 5);

//     scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xf0f0f0);
//     const env = new RoomEnvironment();
//     const pmrem = new THREE.PMREMGenerator(renderer);
//     scene.environment = pmrem.fromScene(env).texture;

//     const loader = new GLTFLoader();
//     loader.setMeshoptDecoder(MeshoptDecoder);

//     loader.load(
//       modelUrl,
//       (gltf) => {
//         const mesh = gltf.scene;
//         const box = new THREE.Box3().setFromObject(mesh);
//         const size = new THREE.Vector3();
//         box.getSize(size);

//         const maxDim = Math.max(size.x, size.y, size.z);
//         const scale = 200 / maxDim;
//         mesh.scale.setScalar(scale);

//         const center = box.getCenter(new THREE.Vector3());
//         mesh.position.sub(center);
//         box.setFromObject(mesh);
//         mesh.position.y -= box.min.y;

//         scene.add(mesh);
//         renderer.render(scene, camera);

//         const dataURL = renderer.domElement.toDataURL("image/png");
//         container.remove(); // clean up
//         resolve(dataURL);
//       },
//       undefined,
//       (err) => {
//         console.error("GLB load error:", err);
//         reject(err);
//       }
//     );
//   });
// }
