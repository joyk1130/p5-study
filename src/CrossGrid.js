import React from 'react'
import Sketch from 'react-p5'

class CrossGrid extends React.Component{
    canvas;
    cam;

    angleX = 90;
    angleY = 0.0;
    angleZ = 0.0;
    speed = 1;
    dist = 100;
    isClick = false;
    duration = 0;

    size = 180;
    length = 540;
    count = 25;

    prevX;
    prevY;
    setup = (p5, canvasParentRef) =>{
        this.canvas = p5.createCanvas(720, 400, p5.WEBGL).parent(canvasParentRef);
        this.cam = p5.createCamera();
        this.cam.setPosition(0, 0, 2500);
        p5.noFill();
        
        // p5.rectMode(p5.RADIUS);
        p5.angleMode(p5.DEGREES);
    }

    draw = (p5) =>{
        p5.background(255);
        
        this.angleZ = p5.lerp(this.angleZ, 90*this.duration, 0.1);
        
        if(this.angleZ+1 >= 90*this.duration){
            this.duration+=1;
            if(this.duration >=4) {
                this.duration = 0;
                this.angleZ = 0;
            }
        }

        p5.rotateX(this.angleX);
        p5.rotateY(this.angleY);
        p5.rotateZ(this.angleZ);
        p5.translate(0,0,-this.count*0.5*this.dist)
        for (let loop = 0; loop < this.count; loop++) {
            this.renderCross(p5);
            p5.translate(0, 0, this.dist);
        }
        

        // 
        // p5.rotateX(this.angleX);
        // p5.rotateY(this.angleY);
        // p5.rotateZ(this.angleZ);

        // p5.ellipse(100, 100, 100);
        // p5.translate(0,0,-this.count*0.5*this.dist)
        // for (let loop = 0; loop < this.count; loop++) {
        //     this.renderCross(p5, loop);
        //     p5.translate(0, 0, this.dist);
        // }
    }

    renderCross(p5) {
        p5.beginShape();
        p5.vertex(-this.size / 2, -this.size / 2);
        p5.vertex(-this.size / 2, -this.size / 2 - this.length);
        p5.vertex(this.size / 2, -this.size / 2 - this.length);
        p5.vertex(this.size / 2, -this.size / 2);
        p5.vertex(this.size / 2 + this.length, -this.size / 2);
        p5.vertex(this.size / 2 + this.length, this.size / 2);
        p5.vertex(this.size / 2, this.size / 2);
        p5.vertex(this.size / 2, this.size / 2 + this.length);
        p5.vertex(-this.size / 2, this.size / 2 + this.length);
        p5.vertex(-this.size / 2, this.size / 2);
        p5.vertex(-this.size / 2 - this.length, this.size / 2);
        p5.vertex(-this.size / 2 - this.length, -this.size / 2);
        p5.endShape(p5.CLOSE);
        p5.rotate(-2);
    
    }

    
    mousePressed = (p5) => {
        this.prevX = p5.mouseX;
        this.prevY = p5.mouseY;
        // console.log(clickX + ", " + clickY);
    }

    mouseDragged = (p5) => {
        let dx = this.prevX - p5.mouseX;
        let dy = this.prevY - p5.mouseY;

        // console.log((dx*0.01)+", "+(dy));
        this.angleX = this.angleX + (dy*0.5);
        this.angleY = this.angleY + (dx*0.5);
        
        this.prevX = p5.mouseX;
        this.prevY = p5.mouseY;
    }


    render(){
        return(
            <Sketch setup={this.setup} draw={this.draw} mousePressed={this.mousePressed} mouseDragged={this.mouseDragged}/>
        );
    }
}

export default CrossGrid;