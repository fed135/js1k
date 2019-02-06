/**
 * Space Fighter
 */

const pi = Math.PI;
let cubeSize = 36;
let ySpeed = 0.03;
let yMax = 0.5;
let xSpeed = 0.05;
const input = {};
const sin = Math.sin;
const cos = Math.cos;
const pointer = "keyCode";
const round = Math.round;
const rand = Math.random;
const starbound = 360;
const centerX = (a.width >> 1) - (cubeSize >> 1);
const centerY = (a.height >> 1) - (cubeSize >> 1);
let xRotation = 0;
let yRotation = 0;
let zRotation = -0.36;
const bullets = [];
const stars = Array(starbound).fill(0);
let cX = sX = cY = sY = 0;
const cZ = cos(zRotation);
const sZ = sin(zRotation);

setInterval(() => {
    let coverAlpha = '1';
    if (input[37] || input[39]) {
        let dir = input[37] ? -1 : 1;
        coverAlpha = '3';
        if (yRotation < yMax && yRotation > -yMax) yRotation -= (ySpeed * dir);
        xRotation += (xSpeed * dir);
    }
    else {
        yRotation = yRotation * 0.95;
    }
    c.fillStyle= '#011' + coverAlpha;
    c.fillRect(0,0,a.width,a.height);

    sX = sin(xRotation);
    cX = cos(xRotation);
    sY = sin(yRotation);
    cY = cos(yRotation);

    c.fillStyle='#fff';
    for (let i = 0; i < stars.length; i++) {
        if (!stars[i]) {
            stars[i] = {
                x: -starbound + rand() * (a.width +starbound*2),
                y: -starbound + rand() * (a.height +starbound*2),
                speed: rand() * 0.25
            }
        }
        stars[i].x -= (sX * stars[i].speed);
        stars[i].y += (cX * stars[i].speed);
        c.fillRect(stars[i].x, stars[i].y, 2, 2);
    }

    const points = [0,-1,0,-0.9,1,0,0.9,1,0,0,0.4,-0.25,0,0.4,-0.75];

    let faces = [
        [0, 1, 4, '#fff'],
        [0, 2, 4, '#aaa'],
        [2, 4, 3, '#f82'],
        [1, 4, 3, '#fa2'],
    ];

    for (let u = 0; u < faces.length; u++) {
        c.beginPath();

        for (let i = 0; i < 3; i++) { 
            let px = points[faces[u][i] * 3];
            let py = points[faces[u][i] * 3 + 1];
            let pz = points[faces[u][i] * 3 + 2]
            c.lineTo(
                ((cX*cY) * px + (cX*sY*sZ - sX*cZ) * py + (cX*sY*cZ + sX*sZ) * pz) * cubeSize + centerX,
                ((sX*cY) * px + (sX*sY*sZ + cX*cZ) * py + (sX*sY*cZ - cX*sZ) * pz) * cubeSize + centerY
            );
        }
        c.fillStyle = faces[u][3];
        c.fill();
    }

    bullets.forEach((bullet) => {
        // Spatial adjustment
        bullet.x -= sX;
        bullet.y += cX;
        // Travel distance
        bullet.dist += 4;
        // Ray angle
        const dirX = sin(bullet.orient);
        const dirY = cos(bullet.orient);
        c.beginPath();
        c.strokeStyle = 'pink';
        c.lineWidth = 4;
        c.moveTo(bullet.x + (dirX * bullet.dist), bullet.y + (dirY * bullet.dist));
        c.lineTo(bullet.x + (dirX * bullet.dist) + (dirX * cubeSize), bullet.y + (dirY * bullet.dist) + (dirY * cubeSize));
        c.stroke();
    });
}, 16);

onkeydown = (evt) => input[evt[pointer]] = 1;
onkeyup = (evt) => {
    input[evt[pointer]] = 0;
    if(evt[pointer] === 32) {
        bullets.push({
            orient: -(xRotation) + pi,
            dist: cubeSize -5,
            x: centerX,
            y: centerY
        });
    }
};
