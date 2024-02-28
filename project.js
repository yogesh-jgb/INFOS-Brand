function init(){

    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },

        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
          },

          pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
        });

        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

        ScrollTrigger.refresh();
}

init();

gsap.to("#three", {
    scrollTrigger:{
        trigger: "#scnd",
        scroller: "#main",
        start: "top 0%",
        // end: "top bottom",
        markers: false,
        scrub: 2,
        pin: true,
    },
    top:"-60%",
    duration: 3,
    ease: Power2.easeInOut,
    onUpdate : ()=> {
        let img = document.querySelector("#three");
        let imgRect = document.querySelector("#three").getBoundingClientRect().top*.09;
        let scrollRange = gsap.utils.mapRange(-10,10,1,2,0);
        img.style.transform = `translate(-50%,0%) scale(${scrollRange}) rotate3d(1,1,0,${imgRect}deg)`;
    }
});

gsap.to(".sctext h1",{
    duration: 4,
    x: '-100%',
    ease: 'linear',
    repeat: -1
})

const elems = document.querySelectorAll(".elems");
elems.forEach(elem => {
    elem.addEventListener("mousemove", function(dets){
        // console.log(dets);
        this.children[0].style.opacity = 1;
        this.children[0].style.transform = `translate(-50%, -50%) translate(${dets.screenX*.4}px, ${dets.screenY*.05}px) rotate(${dets.screenX*.05}deg)`
    })
    elem.addEventListener("mouseout", function(dets){
        this.children[0].style.opacity = 0;
    })
})

const texta = document.querySelectorAll(".texta");
texta.forEach(t => {
    t.style.opacity = 0;
    gsap.to(t, {
        scrollTrigger:{
            trigger: t,
            scroller: "#main",
            start: "top 100%",
            markers: false,
            scrub: 1,
            stagger:1,
        },
        onStart: () =>{
            t.style.opacity = 1;
            $(t).textillate({ in: { effect: 'fadeInUp' } });
        }
    })
})

let val = document.querySelector(".screen").getBoundingClientRect().left;

document.querySelector("#home").addEventListener("scroll", function(){
    let newval = document.querySelector(".screen").getBoundingClientRect().left;
    // console.log(Math.floor((newval-val)*.006));
    let sk =  Math.floor((newval-val)*.6);
    let photu = document.querySelectorAll(".photu");
    // console.log(sk);
    photu.forEach(pic => {
        pic.style.transform = `translate(-50%, -50%) skew(${sk}deg)`;
    })
    val = newval;
})

var over = document.querySelector("#overlay");
var action = document.querySelector("#overlay i").addEventListener("click", function(){
    over.style.transform = "translateX(-100%)";
})
var menu = document.querySelector("#menu").addEventListener("click", function(){
    over.style.transform = "translateX(100%)";
})
