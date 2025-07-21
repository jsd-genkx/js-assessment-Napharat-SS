"use strict";
// JS Assessment: Find Your Hat //
import promptSync from "prompt-sync"
import clear from "clear-screen"

const prompt = promptSync({ sigint: true})

const hat = "^"
const hole = "O"
const fieldCharacter = "░"
const pathCharacter = "*"

class Field {
	constructor(field = [[]]){
		this.field = field
		this.start = {x: 0, y: 0}
		this.hatPos = {x: 0, y: 0}
		this.locationX = 0
		this.locationY =0
	}
	setPos(offLimit = {x: 0, y: 0}){
		let pos = {x: 0, y: 0}
		do {
			pos.x = Math.floor(Math.random() * this.field[0].length);
			pos.y = Math.floor(Math.random() * this.field.length);
		} while(pos.x === offLimit.x && pos.y === offLimit.y)
		return pos
	}
	setStart(){
  this.start = this.setPos()  
  this.locationX = this.start.x
  this.locationY = this.start.y
  this.field[this.start.y][this.start.x] = pathCharacter
	}
	setHat() {
		this.hatPos = this.setPos(this.start)
		this.field[this.hatPos.y][this.hatPos.x] = hat
	}
	getInput(){
    const input = prompt("เดิน (u = ขึ้น, d = ลง, l = ซ้าย, r = ขวา): ").toLowerCase();
    switch (input){
      case "u":
        this.moveUp();
        break;
      case "d":
        this.moveDown();
        break;
      case "l":
        this.moveLeft();
        break;
      case "r":
        this.moveRight();
        break;
      default:
        console.log("ป้อนเฉพาะ u d l r เท่านั้น!");
        this.getInput();
        break;
    }
  }
	moveUp(){
    this.updatePos(this.locationX, this.locationY - 1);
  }

  moveDown(){
    this.updatePos(this.locationX, this.locationY + 1);
  }

  moveLeft(){
    this.updatePos(this.locationX - 1, this.locationY);
  }

  moveRight(){
    this.updatePos(this.locationX + 1, this.locationY);
  }

	updatePos(x, y){
    if (!this.isInAreas(x, y)){
      console.log("ออกนอกสนาม! คุณแพ้แล้ว");
      process.exit();
    }
    const tile = this.field[y][x];
    if (tile === hole) {
      console.log("คุณตกหลุม(รัก)! แพ้แล้ว ออกจากเกมส์ไปซะ!");
      process.exit();
    } else if (tile === hat) {
      console.log("คุณเจอหมวกแล้ว! ชนะ!!");
      process.exit();
    }
		this.locationX = x;
    this.locationY = y;
    this.field[y][x] = pathCharacter;
  }
	isInAreas(x, y) {
    return (
      y >= 0 &&
      x >= 0 &&
      y < this.field.length &&
      x < this.field[0].length
    );
  }
	print() {
    clear();
    this.field.forEach(row => console.log(row.join("")));
  }
	 runGame() {
    this.setStart();
    this.setHat();

    while (true) {
      this.print();
      this.getInput(); 
    }
  }

  static generateField(height, weight, percen = 0.2) {
    return new Array(height).fill(null).map(() =>
      new Array(weight).fill(null).map(() =>
        Math.random() > percen ? fieldCharacter : hole
      )
    );
  }
}
const myField = new Field(Field.generateField(10, 10, 0.2));
myField.runGame();
