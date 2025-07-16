// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
// import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
// import { PNG } from "pngjs";
// import { JSDOM } from "jsdom";
// import gl from "gl";

// // Setup JSDOM
// const { window } = new JSDOM();
// (globalThis as any).window = window;
// (globalThis as any).document = window.document;
// (globalThis as any).navigator = { userAgent: "node.js" };

// export async function createThumbnailFromGLB(buffer: Buffer): Promise<Buffer> {
//   const width = 300, height = 300;
//   const context = gl(width, height, { preserveDrawingBuffer: true });
//   if (!context) throw new Error("Failed to create WebGL context");

//   const renderer = new THREE.WebGLRenderer({ context });
//   renderer.setSize(width, height);
//   renderer.outputColorSpace = THREE.SRGBColorSpace;

//   const renderTarget = new THREE.WebGLRenderTarget(width, height);
//   const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
//   camera.position.set(2, 2, 5);

//   const scene = new THREE.Scene();
//   scene.background = new THREE.Color(0xffffff);

//   const env = new RoomEnvironment();
//   const pmrem = new THREE.PMREMGenerator(renderer);
//   scene.environment = pmrem.fromScene(env).texture;
//   pmrem.dispose();

//   const loader = new GLTFLoader();
//   loader.setMeshoptDecoder(MeshoptDecoder);

//   return new Promise((resolve, reject) => {
//     const arrayBuffer = Uint8Array.from(buffer).buffer;

//     loader.parse(arrayBuffer, "", (gltf) => {
//       const mesh = gltf.scene;
//       const box = new THREE.Box3().setFromObject(mesh);
//       const size = new THREE.Vector3();
//       box.getSize(size);

//       const scale = 2 / Math.max(size.x, size.y, size.z);
//       mesh.scale.setScalar(scale);

//       const center = box.getCenter(new THREE.Vector3());
//       mesh.position.sub(center);
//       box.setFromObject(mesh);
//       mesh.position.y -= box.min.y;

//       scene.add(mesh);
//       renderer.setRenderTarget(renderTarget);
//       renderer.render(scene, camera);
//       renderer.setRenderTarget(null);

//       const pixels = new Uint8Array(width * height * 4);
//       renderer.readRenderTargetPixels(renderTarget, 0, 0, width, height, pixels);

//       const png = new PNG({ width, height });
//       Uint8Array.prototype.set.call(png.data, pixels);

//       const chunks: Buffer[] = [];
//       png.pack()
//         .on("data", chunk => chunks.push(chunk))
//         .on("end", () => resolve(Buffer.concat(chunks)))
//         .on("error", reject);
//     }, reject);
//   });
// }
