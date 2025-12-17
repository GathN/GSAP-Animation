import gsap from "gsap";

const bl = gsap.timeline();
const element = document.querySelector(".ball");
const b1 = "linear-gradient(217deg, rgba(158, 66, 66, 0.9), rgba(255,0,0,0) 70.71%),  linear-gradient(127deg, rgba(82, 163, 82, 0.61), rgba(0,255,0,0) 70.71%), linear-gradient(336deg, rgba(105, 105, 153, 0.9), rgba(69, 69, 211, 0.34) 70.71%)";
const b2 = "linear-gradient(var(--base-deg, 17deg), rgba(255,0,0,.7), rgba(255,0,0,0) 70.71%), linear-gradient(calc(var(--base-deg, 17deg) + 183deg), rgba(226, 46, 91, 0.9), rgba(243, 197, 137, 0.86) 70.71%),  linear-gradient(calc(var(--base-deg, 17deg) + 319deg), rgba(223, 161, 110, 0.8), rgba(125, 125, 241, 0.1) 70.71%)";
const hover = gsap.timeline({ paused: true, overwrite: "auto" });


//hover enlarge

hover.to(element, {
  scale: 2.5,
  duration: 0.4,
  ease: "power2.out",
}).to(".shadow2", {
    yPercent: 20,
    autoAlpha: 1,
    ease: "power2.out"
}, "<");


bl.set(".ball", 
    {
        top: "20%",     
        left: "50%",
        color: "#ffffff00",
        background:b1,
    }
).to(".ball", 
    {
        duration: 2,
        y: "20vw",
        ease: "bounce.out",
    }, 0
).to(".ball", {
    scale:2,
    background:b2,
    //backgroundColor:"#BB2345",
    color: "#FFFFFF",

    onComplete: () => {
        element.addEventListener("mouseenter", () => hover.play());
        element.addEventListener("mouseleave", () => hover.reverse());
    }
});
bl.to(".ball",{
    duration: 2,
    x:"-30vw",
}, 0)
bl.to(".shadow2", {
    top: "20%",     
    left: "50%",
}, 0).to(".shadow2", {
    x:"-30vw", 
    duration: 2,
    y: "20vw",
    scale:2.5,
}, 0)

//premade function for setting rotation to mouse movement
element.addEventListener("mousemove", (e) => {
  const rect = element.getBoundingClientRect();
  const deg = Math.atan2(e.clientY - (rect.top + rect.height / 2), e.clientX - (rect.left + rect.width / 2)) * 180 / Math.PI + 90;

  gsap.set(element, { "--base-deg": `${deg}deg` });
});






bl.set(".shadow",
    {
        top: "70%",     
        left: "50%",
},0
).to(".shadow",
    {
        duration: 2,
        x:"-30vw",
}, 0).to(".shadow", { 
  scale: 1.4,       
  opacity: 0.2,    
  duration: 0.6, 
  ease: "bounce.out" 
}, "<")





//via @jack
//gsap.fromTo("#a", {width:300, height:200, background: b1}, {ease: "none", duration: 6, background: b2, repeat: -1, yoyo: true});