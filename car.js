class Car{
    constructor(x,y,width,height) {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;  

        this.speed = 0;
        this.maxForwardSpeed = 3;
        this.maxReverseSpeed = 1;
        this.aceleration = 0.2;
        this.friction = 0.1;
        this.angle = 0;

        this.controls = new Controls()
    }

    update(){
        this.#move();
    }

    draw(ctx){

        ctx.save();
        ctx.translate(this.x, this.y)
        ctx.rotate(-this.angle)

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore()
    }

    //----------------------------------------

    #move(){
        // Incorporating friction
        if(this.speed > 0){
            this.speed -= this.friction;
        }
        
        if(this.speed < 0){
            this.speed += this.friction;
        }

        if (Math.abs(this.speed)<this.friction){
            this.speed = 0;
        }

        // Speed control
        if(this.speed > this.maxSpeed){
            this.speed = this.maxSpeed;
        }
        
        if(this.speed < -this.maxReverseSpeed){
            this.speed = -this.maxReverseSpeed;
        }

        // Move instructions
        
        if (this.speed != 0){
            const flip = this.speed > 0 ? 1:-1;
     
            //Left Instruccion
            if(this.controls.left){
                this.angle += 0.03*flip
            }
    
            //Right Instruccion
            if(this.controls.right){
                this.angle -= 0.03*flip
            }
        }

        //Forward Instruccion
        if(this.controls.forward){
            this.speed += this.aceleration;
        }

        //Reverse Instruccion
        if(this.controls.reverse){
            this.speed -= this.aceleration;
        }
            
        // Total movements

        this.y -= Math.cos(this.angle)*this.speed
        this.x -= Math.sin(this.angle)*this.speed
    }

    
}