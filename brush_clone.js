import gsap from "gsap";

const target = document.querySelector("#brush-target");
const template = document.querySelector("#template");
const totalStrokes = 12;


const mm = gsap.matchMedia();

mm.add({
  isDesktop: "(min-width: 1024px)",
  isTablet: "(min-width: 768px) and (max-width: 1023px)",
  isMobile: "(max-width: 767px)",
}, (context) => {
    let {isDesktop, isTablet, isMobile} = context.conditions;
    gsap.set("mask rect", {
        attr: {
            x: (isMobile||isTablet) ? -10 : -500,
            y: (isMobile||isTablet) ? -10 : -500,
            width: (isMobile||isTablet) ? 150 : 1000,
            height: (isMobile||isTablet) ? 50 : 1000
        }});
    gsap.set(".maskCircle", {
        attr: { r: (isMobile||isTablet) ? 15 : 50 } 
    });


if(isDesktop){
for (let i = 0; i < totalStrokes; i++) {
  const clone = template.cloneNode(true);
  clone.style.display = "block";
  clone.removeAttribute("id"); 
  
  const angle = i * (360 / totalStrokes);
  const strokeColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
  
  gsap.set(clone, {
    fill: strokeColor,
    rotation: angle,
    transformOrigin: "0% 0%",
    opacity: 0.5,
  });

  target.appendChild(clone);
}

window.addEventListener("mousemove", (e) => {
    const svg = document.querySelector(".brush_stroke");
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    gsap.to(["#maskGrad", ".maskCircle"], {
        attr: { cx: svgP.x, cy: svgP.y },
        duration: 0.2,
        overwrite: "auto"
    });
});
  return () => window.removeEventListener("mousemove", onMouseMove);
}else if(isMobile||isTablet){
  const defs = document.querySelector("defs");
  const maskTemplate = document.querySelector("#CursorMask"); 
  const svgContainer = document.querySelector(".brush_stroke");
    for (let i = 0; i < totalStrokes; i++) {
    
    const uniqueMaskId = `autoMask-${i}`;

    const maskClone = maskTemplate.cloneNode(true);
    maskClone.id = uniqueMaskId;
    defs.appendChild(maskClone);

    const clone = template.cloneNode(true);
    clone.style.display = "block";
    clone.removeAttribute("id");

    clone.setAttribute("mask", `url(#${uniqueMaskId})`);
    
    const angle = i * (360 / totalStrokes);
    const strokeColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
    
    gsap.set(clone, {
      fill: strokeColor,
      rotation: angle,
      transformOrigin: "0% 0%",
      opacity: 0.8,
    });

    svgContainer.appendChild(clone);
  }



  const allCircles = gsap.utils.toArray(".maskCircle");
  gsap.to(allCircles, {
      attr: { 
          cx: 50, 
          cy: 10   
      },
      duration: 2,
      stagger: {
          each: 0.15,
          repeat: -1,
          yoyo: true
      },
      ease: "power2.inOut"
  });
}
});