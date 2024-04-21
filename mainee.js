import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
function main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
  

    const fov = 100;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();
    //cube
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const boxGeometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    //sphere
    const cylinderRadius = 0.5;
    const cylinderHeight = 1;
    const cylinderGeometry = new THREE.CylinderGeometry(cylinderRadius, cylinderRadius, cylinderHeight);
    //pyramid
    const pyramidRadius = 0.5;
    const pyramidHeight = 1;
    const pyramidGeometry = new THREE.ConeGeometry(pyramidRadius, pyramidHeight, 4);




    function makeInstance(geometry, color, x, texture) {
      const material = new THREE.MeshPhongMaterial({map: texture});

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      mesh.position.x = x;

      return mesh;
    }

    const loader = new THREE.TextureLoader();
    const texture = loader.load('coolCat.jpg');
    texture.colorSpace = THREE.SRGBColorSpace;

    

    const objects = [
        makeInstance(boxGeometry, 0x44aa88,  -1, texture),
        makeInstance(cylinderGeometry, 0x8844aa, -3, 0),
        makeInstance(pyramidGeometry, 0xaa8844,  1, 0),
    ];

    const objLoader = new OBJLoader();
    objLoader.load('Car.obj', (root) => {
        root.scale.set(0.05, 0.05, 0.05);
        root.position.x = 3; 
        scene.add(root);
        objects.push(root); 
    });


    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    function render(time) {
      time *= 0.001;  // convert time to seconds

      objects.forEach((obj, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        obj.rotation.x = rot;
        obj.rotation.y = rot;
      });

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    

    
  }

  main();