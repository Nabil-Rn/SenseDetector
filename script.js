document.addEventListener("DOMContentLoaded", () => {
    // Sidebar Navigation
    const links = document.querySelectorAll(".nav-link");

    function setActiveLink() {
        let fromTop = window.scrollY;

        links.forEach(link => {
            let section = document.querySelector(link.getAttribute("href"));
            if (section.offsetTop <= fromTop + 50 && section.offsetTop + section.offsetHeight > fromTop + 50) {
                links.forEach(l => l.classList.remove("active"));
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", setActiveLink);

    // STL Viewer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    camera.position.set(0, -90, 100); // Start position

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(400, 400);
    document.getElementById("stl-viewer").appendChild(renderer.domElement);

    // Better Controls for Rotation
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.screenSpacePanning = false;
    controls.rotateSpeed = 1.2;
    controls.zoomSpeed = 1.5;
    controls.maxDistance = 400;
    controls.minDistance = 200;
    controls.target.set(0, 0, 0);  // Set target to the center

    // Lighting for Better Visibility
    const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1.5);
    scene.add(light);

    // Function to load STL models into the scene
    function loadSTL(fileName, xPos) {
        const loader = new THREE.STLLoader();
        loader.load(fileName, function (geometry) {
            const material = new THREE.MeshNormalMaterial();
            const mesh = new THREE.Mesh(geometry, material);
            mesh.geometry.center();  // Center the model geometry
            mesh.position.x = xPos;  // Offset models along X-axis
            scene.add(mesh);
        });
    }

    // Load multiple STL models
    loadSTL("body1.stl", -150);  // Positioning body1.stl to the left
    loadSTL("body2.stl", 30);   // Positioning body2.stl to the right

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    animate();
});
