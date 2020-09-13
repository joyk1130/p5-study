import React from 'react'
import Sketch from 'react-p5'
import gsap from 'gsap'

class VectorObj {
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
        this.rx = 0;
        this.ry = 0;
        this.rz = 0;
    }
}

class PlusX extends React.Component{
    canvas;
    cam;
    
    darkmode = true;
    is_play = false;

    arr = [];
    isFlex = 0;
    flexType = 0;
    srx = 0;
    sry = 0;

    setup = (p5, canvasParentRef) =>{
        this.canvas = p5.createCanvas(720, 400, p5.WEBGL).parent(canvasParentRef);
        p5.angleMode(p5.DEGREES);
        
        // this.set_perspective(p5)

        for(var i = 0; i < 25; i++){
            var vo = new VectorObj(0,0,0);
            this.arr.push(vo)
        }
        this.objRotate();
    }

    // set_perspective = (p5) => {
    //     if (window.innerWidth > 520) {
    //         var _perspective = 180
    //     } else {
    //         var _perspective = 380
    //     }
    //     p5.perspective(_perspective / 4.0, width / height, 0.1, 10000);
    // }

    objRotate = () => {
        for(var i = 0; i < 25; i++){
            var vo = this.arr[i];
            var trz = vo.rz + 135;
            var trx = vo.rx + 180;
            vo.tween1 = gsap.to(vo, {duration: 1.2, rz: trz, ease: gsap.easeInOut, yoyo: true, repeat: -1, repeatDelay: 0.2, delay: i * 0.2})
            vo.tween2 = gsap.to(vo, {duration: 1.8, rx: trx, ease: gsap.easeInOut, yoyo: true, repeat: -1, repeatDelay: 0.5, delay: i * 0.4})
        }
        this.isFlex = 0;
    }

    objFlex = () => {
        this.isFlex = 1;
        this.flexType++;
        var trz = 0;
        if(this.flexType%2 == 0){
            trz = 45;
        }
        for(var i = 0; i < 25; i++){
            var vo = this.arr[i];
            vo.tween1.pause();
            vo.tween2.pause();
            gsap.to(vo, {duration: 0.6, rz: trz, ease: gsap.easeInOut, delay: i * 0.005})
            gsap.to(vo, {duration: 0.8, rx: 180, ease: gsap.easeInOut, delay: i * 0.005})
        }
    
        // gsap.to("test", {duration: 0.8, x: 0, ease: gsap.easeInOut, onComplete: this.objRotate})
    }

    draw = (p5) =>{

    if (this.is_play) {
        
        if (!this.darkmode) {
            var val_rgb = 255
            var val_fill = 0
        } else 
        {
            var val_rgb = 0
            var val_fill = 255
        }

        console.log(this.darkmode);

        p5.background(val_rgb);
        p5.strokeWeight(3)
        p5.stroke(val_rgb);
        p5.noStroke();
        p5.fill(val_fill);
        

        let locX = (this.mouse_x - this.canvas.width / 2);
        let locY = (this.mouse_y - this.canvas.height / 2);
        var strx = -locX * 0.25;
        //var stry = locY * 0.2;
        this.srx += (strx - this.srx) * 0.03
        //sry += (stry - sry) * 0.08
        //rotateY(rx)
        //rotateX(ry)

        
        var size = 100;
        var gap = 20;
        var lineNum = 5;
        var sx = - (size + gap) * lineNum / 2 + size / 2 - gap + 35
        var sy = - (size + gap) * lineNum / 2 + size / 2 - gap + 20;

        for(var i = 0; i < lineNum * lineNum; i++){
            p5.push();
            var vo = this.arr[i];
            p5.translate(sx + i % lineNum * (size + gap), sy + p5.floor(i / lineNum) * (size + gap))
            p5.rotateY(this.srx);
            p5.rotateX(vo.rx);
            p5.rotateZ(vo.rz);
            p5.box(size, 15, 15);
            p5.rotateZ(90);
            p5.box(size, 15, 15);
            p5.pop();
        }
    }

}

    mouseClicked = (p5) =>{
        if(this.isFlex === 0){
            this.objFlex();
        }
    }

    mouseMoved = (p5) =>{
        if (window.innerWidth > 520) {

            this.mouse_x  = p5.mouseX; 
            this.mouse_y  = p5.mouseY;    
        } else {
            this.mouse_x  = p5.mouseX; 
            this.mouse_y  = p5.mouseY;   
        }
    }

    render(){
        return(
            <Sketch setup={this.setup} draw={this.draw} mouseClicked={this.mouseClicked} mouseMoved={this.mouseMoved}/>
        );
    }
}

export default PlusX;