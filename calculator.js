
function calculate (){
  let canvas = document.getElementById('output-canvas');
  let ctx = canvas.getContext('2d');
  let sides = parseFloat(document.getElementById('sides-number').value);
  let length = parseFloat(document.getElementById('side-length').value);
  let angle = parseFloat(document.getElementById('start-degree').value);

  let vector = {x: length, y: 0.0};
  if(typeof angle === 'number'){
    vector = rotate(vector, 180-angle);
  }
  if(typeof sides !== 'number'){
    sides = 3;
  }
  if(typeof length !== 'number'){
    length = 1;
  }
  let vertices = [];
  let totalAngle = (sides-2)*180;
  let innerAngle = totalAngle/sides;
  vertices.push({x: 0.0, y: 0.0});
  //console.log(vertices);
  for(let i=0;i<sides-1;i++){
    // add next vector
    vertices.push({x: vertices[i].x+vector.x, y: vertices[i].y+vector.y});
    // rotate for next iteration
    vector = rotate(vector, innerAngle);
    vector.x = Math.round(vector.x * 1000)/1000;
    vector.y = Math.round(vector.y * 1000)/1000;
  }
  draw(vertices, ctx, canvas, length);
  vertexTable(vertices);
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function rotate(vector, angle) {
  let newX = vector.x*Math.cos(toRadians(180-angle)) - vector.y*Math.sin(toRadians(180-angle));
  let newY = vector.x*Math.sin(toRadians(180-angle)) + vector.y*Math.cos(toRadians(180-angle));
  return {x: newX, y: newY};
}

function draw(vertices, ctx, canvas, length){
  ctx.fillStyle = 'white';
  let h = canvas.height;
  ctx.fillRect(0,0,canvas.width, canvas.height);
  let scale = 250/vertices.length;
  // find smallest x and y
  let minx = 1000;
  let miny = 1000;
  for(let v of vertices){
    if (minx > v.x){
      minx = v.x;
    }
    if (miny > v.y){
      miny = v.y;
    }
  }
  let xshift = -1*minx;
  let yshift = -1*miny;

  ctx.fillStyle = 'black';
  for(let i=0; i<vertices.length; i++){
    let startX = (vertices[i].x+xshift)/length*scale;
    let startY = h-(vertices[i].y+yshift)/length*scale;
    let endX;
    let endY;
    if(i<vertices.length-1){
      endX = (vertices[i+1].x+xshift)/length*scale;
      endY = h-(vertices[i+1].y+yshift)/length*scale;
    } else {
      endX = (vertices[0].x+xshift)/length*scale;
      endY = h-(vertices[0].y+yshift)/length*scale;
    }
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

  }
}

function vertexTable(vertices){
  let tbody = document.getElementById('vertex-table');
  let tcontent = '';
  for (let v of vertices){
    tcontent += '<tr><td>' + Math.round(v.x*100)/100 + '</td><td>' + Math.round(v.y*100)/100 + '</td></tr>';
  }
  tbody.innerHTML = tcontent;
}
