const speed = 7;
const r = gsap.timeline({ repeat: -1 });
const o = gsap.timeline({ repeat: -1 });
const h = gsap.timeline({ repeat: -1 });

const $ticket = document.querySelector(".ticket");
$ticket.addEventListener('mouseenter', () => {
    r.pause();
    o.pause();
    h.pause();
})
$ticket.addEventListener('mouseleave', () => {
    r.play();
    o.play();
    h.play();
})

r.to("#app", {
    "--r": "180deg",
    "--p": "0%",
    duration: speed,
    ease: "sine.in"
});
r.to("#app", {
    "--r": "360deg",
    "--p": "100%",
    duration: speed,
    ease: "sine.out"
});
o.to("#app", {
    "--o": 1,
    duration: speed/2,
    ease: "power1.in"
});
o.to("#app", {
    "--o": 0,
    duration: speed/2,
    ease: "power1.out"
});

h.to("#app", {
    "--h": "100%",
    duration: speed/2,
    ease: "sine.in"
});
h.to("#app", {
    "--h": "50%",
    duration: speed/2,
    ease: "sine.out"
});
h.to("#app", {
    "--h": "0%",
    duration: speed/2,
    ease: "sine.in"
});
h.to("#app", {
    "--h": "50%",
    duration: speed/2,
    ease: "sine.out"
});


// 动态照片卡片的JS
const element = document.getElementById("element");
const img = document.getElementById("g-img");

window.addEventListener("mousemove", event => {
  const target = event.target;

  if (target.classList.contains("g-animation")) {
    img.style.visibility = 'visible';
    const rect = target.getBoundingClientRect();

    var offsetX = event.clientX - rect.left;
    var offsetY = event.clientY - rect.top;

    var percentX = (Math.min(Math.max(offsetX / rect.width, 0), 1) * 100).toFixed(2);
    var percentY = (Math.min(Math.max(offsetY / rect.height, 0), 1) * 100).toFixed(2);;

    console.log('X: ' + percentX + '%');
    console.log('Y: ' + percentY + '%');

    element.setAttribute('style', `--x: ${percentX}%;--y: ${percentY}%;`);
  }
});

window.addEventListener("mouseout", event => {
  const target = event.target;
  if (target.classList.contains("g-animation")) {
    img.style.visibility = 'hidden';
  }
});