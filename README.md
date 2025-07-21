# JavaScript Assessment: Find Your Hat

[Codecademy](https://www.codecademy.com/projects/practice/find-your-hat)

## Table of Contents

- [JavaScript Assessment: Find Your Hat](#javascript-assessment-find-your-hat)
  - [Table of Contents](#table-of-contents)
  - [Repo Instructions](#repo-instructions)
  - [Project Goals](#project-goals)
  - [Project Requirements](#project-requirements)
    - [Game Rules:](#game-rules)
  - [JavaScript Assessment Rubric](#javascript-assessment-rubric)
    - [Thinking Process](#thinking-process)

---

## Repo Instructions

1. Clone the assessment repository, open it in your working directory, commit your progress accordingly, and push the repository to share it with the instructors.
2. Read the instructions in the `README.md` file.
3. Start the project:

   ```terminal
   npm install
   npm run dev
   ```

4. Edit `package.json` file by updating the `"author"` field with your Zoom name.
5. Edit **Thinking Process** section at the end of the `README.md` file. 👉 [Go to Thinking Process](#thinking-process)

[🔝 Back to Table of Contents](#table-of-contents)

---

## Project Goals

- In this project, you’ll be building an interactive terminal game.
- The scenario is that the player has lost their hat in a field full of holes, and they must navigate back to it without falling down one of the holes or stepping outside of the field.

[🔝 Back to Table of Contents](#table-of-contents)

## Project Requirements

- Your project is centered on a `Field` class.
- Give your `Field` class a `.print()` method that prints the current state of the field.

  > The Field constructor should take a two-dimensional array representing the “field” itself.
  >
  > A field consists of a grid containing “holes” (O) and one “hat” (^).
  >
  > We use a neutral background character (░) to indicate the rest of the field itself.
  >
  > The player will begin in the upper-left of the field, and the player’s path is represented by \*.

  ```js
  const myField = new Field([
  	["*", "░", "O"],
  	["░", "O", "░"],
  	["░", "^", "░"],
  ]);

  // Output:
  *░O
  ░O░
  ░^░

  ```

- Your game should be playable by users. In order to facilitate this, build out the following behavior:

  - When a user runs `main.js`, they should be prompted for input and be able to indicate which direction they’d like to `move`.
  - After entering an instruction, the user should see a printed result of their current field map with the tiles they have visited marked with the player's path. They should be prompted for their next move.

[🔝 Back to Table of Contents](#table-of-contents)

### Game Rules:

**1. Wins by finding their hat.**

**2. Loses by landing on (and falling in) a hole.**

**3. Loses by attempting to move “outside” the field.**

**When any of the above occur, let the user know and end the game.**

[🔝 Back to Table of Contents](#table-of-contents)

---

## JavaScript Assessment Rubric

1. Class Method ที่ควรมีครบ: (2 pts ครบถ้วน | 1 pts มีไม่ครบ | 0 pts ไม่มีเลย)

- constructor
- moveRight
- moveLeft
- moveUp
- moveDown

2. Print Map (2 pts ครบถ้วน | 1 pts มีไม่ครบ | 0 pts ไม่มีเลย)

3. เดินได้ถูกต้อง & Update Map ได้ถูกต้อง (2 pts ครบถ้วน | 1 pts มีไม่ครบ | 0 pts ไม่มีเลย)

- เลี้ยวซ้าย
- เลี้ยวขวา
- ขึ้น
- ลง

4. Game Logic: (2 pts ครบถ้วน | 1 pts มีไม่ครบ | 0 pts ไม่มีเลย)

- Wins by finding their hat
- Loses by landing on (and falling in) a hole.
- Attempts to move "outside" the field. (Warning message when actor attempts to move outside)

5. มี Random ตำแหน่ง: (2 pts ครบถ้วน | 1 pts มีไม่ครบ | 0 pts ไม่มีเลย)

- holes
- hat
- actor

6. Thinking process & Breakdown the steps of a thinking process (5 pts ครบถ้วน | 3 pts มีไม่ครบ | 0 pts ไม่มีเลย)

[🔝 Back to Table of Contents](#table-of-contents)

---

**Please Write Down Your Thinking Process Below:**

---

### Thinking Process

1. ใช้ promptSync รับ input จากผู้เล่นใน terminal
```
import promptSync from "prompt-sync"
import clear from "clear-screen"
```
- ทำให้ prompt ทำงานได้
```
const prompt = promptSync({ sigint: true})
```
2. มากำหนดให้ว่าเราจะให้ hat, hole, field, character เป็นสัญลักษณ์แบบไหนเพื่อให้ง่ายต่อการเล่นหรือจะใส่อิโมจิก็ได้
```
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";
```
3.สร้าง field ของตัวเกม 
```
class Field {
  constructor()
}
```
> ใน class นี้จะกำหนดรูปแบบต่างใน field ของเรา 
- ไม่ให้ hat และ player อยู่ตำแหน่งเดียวกัน
```
setPos(offLimit = { x: 0, y: 0 }) {
  let pos = { x: 0, y: 0 };
  do {
    pos.x = Math.floor(Math.random() * this.field[0].length);
    pos.y = Math.floor(Math.random() * this.field.length);
  } while (pos.x === offLimit.x && pos.y === offLimit.y);  // ถ้าซ้ำกับ offLimit ให้สุ่มใหม่

  return pos;
}
```
- ตั้งตำแหน่งเริ่มให้ผู้เล่น ในที่นี่ตั้งใน `setStart()` 
- ตั้งตำแหน่งหมวกด้วย แล้วต้องตั้งไม่ให้ซ้ำกับผู้เล่น ใช้ `setHat()`
- กำหนดการเคลื่องไหวต่าๆ 
```
moveUp()    { this.moveTo(this.locationX, this.locationY - 1); }
moveDown()  { this.moveTo(this.locationX, this.locationY + 1); }
moveLeft()  { this.moveTo(this.locationX - 1, this.locationY); }
moveRight() { this.moveTo(this.locationX + 1, this.locationY); }
```
>moveUp(), moveDown(), moveLeft(), moveRight()
>เราจะอิิงจากแกน X และ Y

- กำหนด `updatePos()` เพื่อตรวจดูว่าผู้เล่นจะแพ้, ชนะ, ตกขอบ

4.รับ input ผู้เล่น
```
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
```
5. สร้าง `runGame()` แล้วเรียกทุกอย่างมา
```
runGame() {
    this.setStart();
    this.setHat();

    while (true) {
      this.print();
      this.getInput(); 
    }
  }
```
- สร้างพื้นที่แบบrandom และใช้ `fill()` และ `map()` เพื่อจะได้สร้างArray
>แต่ละช่องจะมีโอกาสเป็นhole กำหนดให้เป็น 0.2 = 20%
```
static generateField(height, weight, percen = 0.2) {
    return new Array(height).fill(null).map(() =>
      new Array(weight).fill(null).map(() =>
        Math.random() > percen ? fieldCharacter : hole
      )
    );
  }
```
6.เริ่มเกม สร้างสนามอันนี้เราสร้าง 10 * 10 มีหลุดrandomพื้นที่ 20%
```
const myField = new Field(Field.generateField(10, 10, 0.2));
myField.runGame();
```
>จากนั้นลูปตลอดเวลา → แสดง field → รอ input → ทำงานวนไปเรื่อย ๆ จนจบเกม




[🔝 Back to Table of Contents](#table-of-contents)
