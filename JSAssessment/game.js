const prompt = require('prompt-sync')({sigint: true});
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const rowNum = 10, colNum = 10;

//Create a Field Class with constructor for the game
class Field{
    constructor() {
        this._field = Array(rowNum).fill().map(() => Array(colNum));
        this._locationX = 0;
        this._locationY = 0;
    }


//Create generateField Method in the Field Class to generate the rows and columns with fields, character and hat.
    generateField(percentage)
    {
        for (let y = 0; y < rowNum; y++) {
            for (let x =0; x < colNum; x++){
                const prob =Math.random();
                this._field[y][x] = (prob > percentage) ? fieldCharacter : hole;
            }
        }

        // Set the "hat" location : Object
        const hatLocation = {
            x: Math.floor(Math.random() * colNum),
            y: Math.floor(Math.random() * rowNum)
        };

        //Make sure the "hat" is not at the starting point
        while (hatLocation.x == 0 && hatLocation.y == 0) {
            hatLocation.x = Math.floor(Math.random() * colNum);
            hatLocation.y = Math.floor(Math.random() * rowNum);
        }

        this._field[hatLocation.y][hatLocation.x] = hat;

        //Set the "home" position before the game starts
        this._field[0][0] = pathCharacter;

    }

    runGame() {
        let playing = true;
        console.log("Start Game");
        //print the field
        this.print();
        this.askQuestion();
    }

    print() {
        const displayString = this._field.map(row => {
            return row.join('');
        }).join('\n');

        console.log(displayString);
    }

    askQuestion(){
        const direction = prompt('Which way? ').toUpperCase();
        switch (direction){
            //Implement your codes here
            //check if direction is U, D, L, R
            //check for boundaries
            //check if character falls into a hole - game over
            //check if character gets the hat - game win
            case "U":
                if (this._locationX==0){
                    console.log("Error, Out of Bounds!");
                }
                else if((this._field[this._locationX-1][this._locationY]) == hole){
                    console.log("Game Over!");
                    process.exit();
                }
                else if ((this._field[this._locationX-1][this._locationY]) == hat){
                    console.log("You Won!");
                    process.exit();
                }
                else{
                this._locationX -=1;
                this._field[this._locationX][this._locationY] = pathCharacter;
                }
                
            break;

            case "D":
                if (this._locationX == (rowNum-1)){
                    console.log("Error, Out of Bounds!");
                }
                else if((this._field[this._locationX+1][this._locationY]) == hole){
                    console.log("Game Over!");
                    process.exit();
                
                }
                else if ((this._field[this._locationX+1][this._locationY]) == hat){
                    console.log("You Won!");
                    process.exit();
                }
                else{
                this._locationX +=1;
                this._field[this._locationX][this._locationY] = pathCharacter;
                }

            break;

            case "L":
                if (this._locationY==0){
                    console.log("Error, Out of Bounds!");
                }
                else if((this._field[this._locationX][this._locationY-1]) == hole){
                    console.log("Game Over!");
                    process.exit();
                
                }
                else if ((this._field[this._locationX][this._locationY-1]) == hat){
                    console.log("You Won!");
                    process.exit();
                }

                else{
                this._locationY -=1;
                this._field[this._locationX][this._locationY] = pathCharacter;
                }

            break;

            case "R":
                if (this._locationY== (colNum -1)){
                    console.log("Error, Out of Bounds!");
                }
                else if((this._field[this._locationX][this._locationY+1]) == hole){
                    console.log("Game Over!");
                    process.exit();
                
                }
                else if ((this._field[this._locationX][this._locationY+1]) == hat){
                    console.log("You Won!");
                    process.exit();
                }
                else{
                this._locationY +=1;
                this._field[this._locationX][this._locationY] = pathCharacter;
                }
            break;

            default:
                console.log("Controls:   UP = U, DOWN = D, LEFT = L, Right = R");
           
            

            
        }
        this.print();
        this.askQuestion();
        
    }

}

//Create an instance of Field Class Object
const myfield =  new Field();
myfield.generateField(0.3);
myfield.runGame();