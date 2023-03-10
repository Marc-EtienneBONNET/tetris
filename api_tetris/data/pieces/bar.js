function checkMouv(newPiece, map){
    if (map[newPiece[0].x][newPiece[0].y] != 0 ||
        map[newPiece[1].x][newPiece[1].y] != 0 ||
        map[newPiece[2].x][newPiece[2].y] != 0 ||
        map[newPiece[3].x][newPiece[3].y] != 0 || 
        newPiece[0].y > 20 || 
        newPiece[1].y > 20 || 
        newPiece[2].y > 20 ||
        newPiece[3].y > 20)
        return (2);
    if (
        newPiece[0].x > 10 || newPiece[0].x < 0 || 
        newPiece[1].x > 10 || newPiece[1].x < 0 ||
        newPiece[2].x > 10 || newPiece[2].x < 0 ||
        newPiece[3].x > 10 || newPiece[3].x < 0 ||
        newPiece[0].y < 0 || newPiece[1].y < 0 ||
        newPiece[2].y < 0 || newPiece[3].y < 0)
        return (1);
    else 
        return (0);
}

function sens1(x, y){
    let piece = [{x:x, y:y + 1},
        {x:x + 1, y:y + 1},
        {x:x + 2, y:y + 1},
        {x:x + 3, y:y + 1}]
    return piece;
}

function sens2(x, y){
    let piece = [{x:x + 1, y:y},
        {x:x + 1, y:y + 1},
        {x:x + 1, y:y + 2},
        {x:x + 1, y:y + 3}]
    return piece;
}

function sens3(x, y){
    let piece = [{x:x, y:y + 2},
        {x:x + 1, y:y + 2},
        {x:x + 2, y:y + 2},
        {x:x + 3, y:y + 2}]
    return piece;
}

function sens4(x, y){
    let piece = [{x:x + 2, y:y},
        {x:x + 2, y:y + 1},
        {x:x + 2, y:y + 2},
        {x:x + 2, y:y + 3}]
    return piece;
}

class Bar {
    x = 0;
    y = 0;
    index = -1;
    sens = 1;
    piece = [];
    fin = false;
    constructor(x, y, index, sens, map){
        this.x = x;
        this.y = y;
        this.index = index
        this.sens = sens;
        this.mouvPiece(this.sens, this.x, this.y, map)
    }
    mouvPiece(sens, x, y, map){
        let pieceTmp;

        if (sens === 1)
                pieceTmp = sens1(x, y)
        else if (sens === 2)
                pieceTmp = sens2(x, y)
        else if (sens === 3)
                pieceTmp = sens3(x, y)
        else if (sens === 4)
                pieceTmp = sens4(x, y)
        let resMouvPice = checkMouv(pieceTmp, map);
        if (resMouvPice === 0){
            this.x = x;
            this.y = y; 
            this.sens = sens;            
            this.piece = pieceTmp;
        }
        else if (resMouvPice === 2){
            this.fin = true;
        }
    }
}

module.exports = { Bar }
