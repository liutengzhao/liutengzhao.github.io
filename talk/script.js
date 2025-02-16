window.addEventListener('load', function() {
    const container = document.getElementById('container');
    const items = container.getElementsByClassName('item');
    let currentRow = [];
    let maxHeight = 0;
  
    for (let i = 0; i < items.length; i++) {
      currentRow.push(items[i]);
      maxHeight = Math.max(maxHeight, items[i].offsetHeight);
  
      if (i === items.length - 1 || items[i].offsetTop !== items[i + 1].offsetTop) {
        for (let j = 0; j < currentRow.length; j++) {
          currentRow[j].style.height = `${maxHeight}px`;
        }
        currentRow = [];
        maxHeight = 0;
      }
    }
  });