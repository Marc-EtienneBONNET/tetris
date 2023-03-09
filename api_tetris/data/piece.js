class Bar {
    x = 0;
    y = 0;
    index = -1;
    sens = 1;
    piece = [];
    constructor(x, y, index, sens){
        this.x = x;
        this.y = y;
        this.index = index
        this.sens = sens;
        this.mouvSense(this.sens);
        
    }
    mouvSense(sens){
        this.sens = sens;
        switch(sens){
            case 1:
                this.piece[0] = {x:this.x, y:this.y + 1};
                this.piece[1] = {x:this.x + 1, y:this.y + 1};
                this.piece[2] = {x:this.x + 2, y:this.y + 1};
                this.piece[3] = {x:this.x + 3, y:this.y + 1};
                return ;
            case 2:
                this.piece[0] = {x:this.x + 2, y:this.y};
                this.piece[1] = {x:this.x + 2, y:this.y + 1};
                this.piece[2] = {x:this.x + 2, y:this.y + 2};
                this.piece[3] = {x:this.x + 2, y:this.y + 3};
                return ;
            case 3:
                this.piece[0] = {x:this.x, y:this.y + 2};
                this.piece[1] = {x:this.x + 1, y:this.y + 2};
                this.piece[2] = {x:this.x + 2, y:this.y + 2};
                this.piece[3] = {x:this.x + 3, y:this.y + 2};
                return ;
            case 4:
                this.piece[0] = {x:this.x + 1, y:this.y};
                this.piece[1] = {x:this.x + 1, y:this.y + 1};
                this.piece[2] = {x:this.x + 1, y:this.y + 2};
                this.piece[3] = {x:this.x + 1, y:this.y + 3};
                return ;
        }
    }
    mouvPosition(x, y){
        this.x = x;
        this.y = y;
    }
}

class AngleGauche {
    piece = [];
    constructor(x, y, sens){
        
    }
    mouvSense(){

    }
    mouvPosition(x, y){

    }
}

class AngleDroite {
    piece = [];
    constructor(x, y, sens){
        
    }
    mouvSense(){

    }
    mouvPosition(x, y){

    }
    
}

class Carrer {
    piece = [];
    constructor(x, y, sens){
        
    }
    mouvSense(){

    }
    mouvPosition(x, y){

    }
}

class EclaireDroite{
    piece = [];
    constructor(x, y, sens){
        
    }
    mouvSense(){

    }
    mouvPosition(x, y){

    }
}

class EclaireGauche{
    piece = [];
    constructor(x, y, sens){
        
    }
    mouvSense(){

    }
    mouvPosition(x, y){

    }
}

class T{
    piece = [];
    constructor(x, y, sens){
        
    }
    mouvSense(){

    }
    mouvPosition(x, y){

    }
}

module.exports = {T, EclaireGauche, EclaireDroite, Carrer, AngleDroite, AngleGauche, Bar}

