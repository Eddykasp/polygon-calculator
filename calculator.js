
function calculate (){
  let canvas = document.getElementById('output-canvas');
  let ctx = canvas.getContext('2d');
  let sides = parseFloat(document.getElementById('sides-number').value);
  let length = parseFloat(document.getElementById('side-length').value);
  let angle = parseFloat(document.getElementById('start-degree').value);

  let vector = {x: length, y: 0.0};
  let vertices = [];
  let totalAngle = (sides-2)*180;
  let innerAngle = totalAngle/sides;
  //console.log('sides: ' + sides + ' total angle: ' + totalAngle + ' inner angle: ' + innerAngle);
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
  let padding = 50+vertices.length/10;
  let scale = 250/vertices.length;
  ctx.fillStyle = 'black';
  for(let i=0; i<vertices.length; i++){
    let startX = vertices[i].x/length*scale+padding;
    let startY = h-vertices[i].y/length*scale-padding;
    let endX;
    let endY;
    if(i<vertices.length-1){
      endX = vertices[i+1].x/length*scale+padding;
      endY = h-vertices[i+1].y/length*scale-padding;
    } else {
      endX = vertices[0].x/length*scale+padding;
      endY = h-vertices[0].y/length*scale-padding;
    }
    //console.log(startX + ', ' + startY + ' | ' + endX + ', ' + endY);
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
