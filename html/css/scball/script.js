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