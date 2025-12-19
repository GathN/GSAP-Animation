import gsap from "gsap";

const target = document.querySelector("#brush-target");
const template = document.querySelector("#template");
const totalStrokes = 12;

for (let i = 0; i < totalStrokes; i++) {
  // 1. Create the clone
  const clone = template.cloneNode(true);
  clone.style.display = "block";
  clone.removeAttribute("id"); // Remove ID to prevent duplicates
  
  // 2. Calculate the angle (360 / 12 = 30 degrees each)
  const angle = i * (360 / totalStrokes);
  const strokeColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
  
  // 3. Set the rotation around the center (0,0)
  // We use GSAP 'set' because it handles SVG transform strings reliably
  gsap.set(clone, {
    fill: strokeColor,
    rotation: angle,
    transformOrigin: "0% 0%",
    opacity: 0.5,
  });

  // 4. Add to the SVG
  target.appendChild(clone);
}

window.addEventListener("mousemove", (e) => {
    const svg = document.querySelector(".brush_stroke");
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    
    // Transform screen mouse X/Y to SVG 0-100 coordinates
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    // Move the gradient and the circle inside the mask
    gsap.to(["#maskGrad", "#maskCircle"], {
        attr: { cx: svgP.x, cy: svgP.y },
        duration: 0.2,
        overwrite: "auto"
    });
});