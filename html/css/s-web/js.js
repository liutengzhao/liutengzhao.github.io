maxDistance = 100;
maxDist2 = maxDistance*maxDistance;

canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

onload = function(){
  particles = [];
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  cellsX = Math.ceil(canvas.width/maxDistance);
  cellsY = Math.ceil(canvas.height/maxDistance);
  gridCells = cellsX*cellsY;
  for(var i=0;i<50;i++){
    particles.push([0.5*canvas.width+(Math.random()*100)-50,
                    0.5*canvas.height+(Math.random()*100)-50,
                    Math.random()*2-1,
                    Math.random()*2-1]);
  }
  requestAnimationFrame(loop)
}

drawStack = [];
switchover=false;
switchcount=0;
switchcolors = ['#f77','#f97','#fb7','#fe7','#df7','#f77','#7f7','#7ff','#7bf','#97f','#f77','#f7f','#f79'];
switchcolor = 0;

loop = function(){
  
  switchcount+=1;
  if(switchcount%600==0){
    if( !switchover ) {
      switchcolor+=1;
      if(switchcolor >= (switchcolors.length)){
        switchcolor=0;
      }
    }
  }
  
  if(switchcount%3200==0) {
    switchover = !switchover;
  }
  if(switchcount%5000==0) {
    switchover = !switchover;
  }
  
  
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.025;
  ctx.strokeStyle = switchcolors[switchcolor];
  ctx.globalCompositeOperation = 'lighter';
  
  if( switchover ) {
    ctx.strokeStyle = '#000'
    ctx.globalCompositeOperation = 'darker';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.035;
    
  }

  var line;

  for(var i=0;i<drawStack.length;i++){
    
    line = drawStack[i]
    ctx.beginPath();
    ctx.moveTo(line[0],line[1]);
    ctx.lineTo(line[2],line[3]);
    ctx.stroke();
  }
  drawStack = []

  grid = [];
  for(var i=0,len=gridCells;i<len;i++){
    grid[i] = [];
  }
  for(var i=0;i<particles.length;i++){
    p = particles[i];
    p[0] += p[2];
    p[1] += p[3];
    if(p[0]<0){
      p[0] = 0
      p[2] = Math.abs(p[2])
    }
    if(p[1]<0){
      p[1] = 0
      p[3] = Math.abs(p[3])
    }
    if(p[0]>canvas.width){
      p[0] = canvas.width
      p[2] = -Math.abs(p[2])
    }
    if(p[1]>canvas.height){
      p[1] = canvas.height
      p[3] = -Math.abs(p[3])
    }
    grid[Math.floor(p[0]/maxDistance)+cellsX*Math.floor(p[1]/maxDistance)].push(p);
  }
  
  for(var i=0;i<grid.length;i++){
    var cells = [i-cellsX-1,i-cellsX,i-cellsX+1,i-1,i,i+1,i+cellsX-1,i+cellsX,i+cellsX+1],
        cellParticles = grid[i];
    for(var j=0;j<cellParticles.length;j++){
      var p1 = cellParticles[j],
          pClosest = false,
          pClosestDist = maxDist2;
      for(var k=0;k<9;k++){
        if(cells[k]>=0 && cells[k]<gridCells){
          var testCellParticles = grid[cells[k]];
          for(var l=0;l<testCellParticles.length;l++){
            var p2 = testCellParticles[l],
                dx = p2[0]-p1[0],
                dy = p2[1]-p1[1],
                d2 = dx*dx+dy*dy;
            if(d2<pClosestDist&&d2!==0){
              pClosestDist = d2;
              pClosest = p2;
            }
          }
        }
      }
      if(p2!==false){
        drawStack.push([p1[0],p1[1],pClosest[0],pClosest[1]]);
      }
    }
  }
  requestAnimationFrame(loop)
}