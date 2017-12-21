
function calculate (){
    canvas = document.getElementById('output-canvas');
    ctx = canvas.getContext('2d');
    let sides = parseFloat(document.getElementById('sides-number').value);
    let length = parseFloat(document.getElementById('side-length').value);
    let angle = parseFloat(document.getElementById('start-degree').value);

    let vector = {x: length, y: 0.0};
    let vertices = [];
    let totalAngle = (sides-2)*180;
    let innerAngle = totalAngle/sides;
    console.log('sides: ' + sides + ' total angle: ' + totalAngle + ' inner angle: ' + innerAngle);
    vertices.push({x: 0.0, y: 0.0});
    console.log(vertices);
    for(let i=0;i<sides-1;i++){
        // add next vector
        vertices.push({x: vertices[i].x+vector.x, y: vertices[i].y+vector.y});
        // rotate for next iteration
        let tmpX = vector.x*Math.cos(toRadians(180-innerAngle)) - vector.y*Math.sin(toRadians(180-innerAngle));
        tmpX = Math.round(tmpX * 1000)/1000;
        //console.log(vector.x*Math.cos(toRadians(innerAngle)) - vector.y*Math.sin(toRadians(innerAngle)));
        let tmpY = vector.x*Math.sin(toRadians(180-innerAngle)) + vector.y*Math.cos(toRadians(180-innerAngle));
        tmpY = Math.round(tmpY * 1000)/1000;
        vector.y = tmpY;
        vector.x = tmpX;
    }
    draw(vertices, ctx, canvas);
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

function draw(vertices, ctx, canvas){
    ctx.fillStyle = 'white';
    let h = canvas.height;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    let scale;// = Math.round(canvas.width/Math.abs(vertices[0].x - vertices[Math.round(vertices.length/2)].x))*0.5;
    console.log('scale: ' + scale);
    let padding = 200;
    scale = 10;
    ctx.fillStyle = 'black';
    for(let i=0; i<vertices.length; i++){
        let startX = vertices[i].x*scale+padding;
        let startY = h-vertices[i].y*scale-padding;
        let endX;
        let endY;
        if(i<vertices.length-1){
          endX = vertices[i+1].x*scale+padding;
          endY = h-vertices[i+1].y*scale-padding;
        } else {
          endX = vertices[0].x*scale+padding;
          endY = h-vertices[0].y*scale-padding;
        }
        console.log(startX + ', ' + startY + ' | ' + endX + ', ' + endY);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();

    }
}