import DancingLines from "./DancingLines";

const KeyGradient = (ctx:CanvasRenderingContext2D,pos_x:number,block_width:number,height:number) =>{
    const radialGradient = ctx.createRadialGradient(pos_x + block_width/2, height, 0, pos_x + block_width/2, height, 50);
    radialGradient.addColorStop(0.0, 'rgba(200,150,100,1)');
    radialGradient.addColorStop(0.4, 'rgba(200,150,100,0.2)');
    radialGradient.addColorStop(0.90, 'rgba(200,150,100,0.02)');
    radialGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(pos_x + block_width/2, height, 50, 0, 2 * Math.PI);
    ctx.fill();
}


export {DancingLines, KeyGradient};