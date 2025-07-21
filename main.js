"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync";
import clear from "clear-screen";

const prompt = promptSync({ sigint: true });


const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
	constructor(height,width, holePercen = 0.2){
		this.height = height;
    this.width = width;
    this.field = Field.generateField(height, width, holePercen);
    this.positionRow = 0;
    this.positionCol = 0;
    this.playing = true;

    this.field[this.positionRow][this.positionCol] = pathCharacter;
	}
	static generateField(height, width, holePercen) {
    const field = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(fieldCharacter));

    const totalTiles = height * width;
    const numHoles = Math.floor(totalTiles * holePercen);
    let holesPlaced = 0;

    

}


