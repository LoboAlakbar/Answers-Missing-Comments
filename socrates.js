/*
The Lost Library of Socrates
Written by: Matthew Hill
Date of last edit: 16 November 2017
Contact: matthillprogramdeveloper@gmail.com

Quick search function. You can search this code for all of the following project requirements using the # and it will
take you to the part of the code that utilizes that feature. Try searching #Variables first.

[x] #ECMA6 JS
[x] #Variables
[x] #Expressions / Use of Math Object (random)
[x] #Conditional Statements
[x] #Ternary Statement (at least one)
[x] #UserInput (using prompt)
[x] #Console .log output
[x] #Validation of Prompts
[x] #Array
[x] #ArrayMethod
[x] #WhileLoop
[x] #ForLoop
[x] #Function ([x]arguments, [x]parameters, [x]return values)
[x] #JSON / Object Literal (Must include nested objects)
[x] #Class ECMA 6 - Class Definition / OOP Principles (50 POINTS!)
[#] #OOP ECMA 6 - Class Definition / OOP Principles (50 POINTS!)
[x] #Adequate Comments / Pseudocode all over the place

 */

//#Variables boom that was easy.
var user;

var library = ["television","cat","banana","computer","ocean","couch","refrigerator","forest","printer","shampoo","table","vehicle","controller","shelf","fence","ottoman","cabinet","coaster","fence","bushes","picture","frame","weight"];


/*
#Class the Puzzle class holds values for the correct word, the answer in the form of an #Array, the current board
 in the form of an #Array and a list of letters already guessed during this puzzle
 it also contains functions for guessing letters and guessing the answer
 */
class Puzzle{

    constructor(word){
        this.word = word;
        this.answer = this.wordToArray(word);
        this.currentBoard = this.buildBoard(word);
        this.lettersGuessed = [];
    }
    //#ForLoop this is used to turn the puzzle word that is a string into an array for testing against the board array
    wordToArray(word){
        let board = [];
        for(let letter of word){
            board.push(letter);
        }
        return board;
    }
    //#ForLoop this is used to build the displayed board array by making an array with the same number of blanks as the
    //answer has letters
    buildBoard(word){
        let board = [];
        for(let letter of word){
            board.push("_");
        }
        return board;
    }
    //#Functions the guess letter function has a parameter for letter and returns 3 options
    //true, false, or "you already guessed this letter". I gotta say I love how loose JavaScript is with return values
    guessLetter(letter){
        if(this.lettersGuessed.indexOf(letter) === -1){//Checks if the letter has been guessed before
            this.lettersGuessed.push(letter);//If it has not been guessed it adds it to the lettersGuessed array
            if(this.answer.indexOf(letter) !== -1){//Next it checks if the letter is in the answer #Array
                for(let i = 0; i < this.answer.length; i++) {//By use of the indexOf #ArrayMethod
                    if (this.answer[i] === letter) {
                        this.currentBoard[i] = letter;//And adds that letter to the currentBoard #Array
                    }
                }
                return true;//and returns true

            }else{//or alerts you that it is an incorrect letter
                return false;//and returns false
            }
        }else{//This informs you of a previously guessed letter
            return "You already guessed this letter!";
        }
    }

    guessWord(word){
        let winner = false;
        let guess = this.wordToArray(word);

        if (guess.length === this.answer.length) {
            for (let i = 0; i < guess.length; i++) {
                if (guess[i] !== this.answer[i]) {
                    winner = false;
                    break;
                } else {
                    winner = true;
                }
            }
        }else{
            winner = false;
        }
        //#TernaryStatement
        return winner ? true:false;
    }


}

/*
#Class the player class holds Name, Level, Score, Remaining Guesses, the puzzle and a #JSON inventory of specials.
it also has methods for calling the puzzle methods, this is done so that score and guess values are affected at the
user level as the specials classes also call on those puzzle methods and should not affect the users values
 */
class User{

    constructor(name){
        this.name = name;
        this.level = 1;
        this.score = 0;
        this.guesses = 10;
        this.puzzle = null;
        this.specials = {inventory:{Streln: 1,Vowels: 1,PickALetter: 1,FreeLetter: 1 }};

    }

    useSpecial(type){
        //This is going use buttons to start the function
        let special = this.specials.inventory;
        console.log("Made it inside the use special function."); //Console used for debugging
        switch(type){//#Conditional lots of these all over the place but here is a switch case I used.

            case "Streln":
                if(special.Streln < 1){
                    alert("You do not have any Streln special abilities to use.")
                }else{
                    let streln = new Streln();
                    this.puzzle = streln.use(this.puzzle);
                    special.Streln--;
                }
                break;

            case "Vowels":
                if(special.Vowels < 1){
                    alert("You do not have any Vowels special abilities to use.")
                }else{
                    let vowels = new Vowels();
                    this.puzzle = vowels.use(this.puzzle);
                    special.Vowels--;
                }
                break;

            case "PickALetter":
                if(special.PickALetter < 1){
                    alert("You do not have any Pick A Letter special abilities to use.")
                }else{
                    let pickALetter = new PickALetter();
                    this.puzzle = pickALetter.use(this.puzzle);
                    special.PickALetter--;
                }
                break;

            case "FreeLetter":
                if(special.FreeLetter < 1){
                    alert("You do not have any Free Letter special abilities to use.")
                }else{
                    let freeLetter = new FreeLetter();
                    this.puzzle = freeLetter.use(this.puzzle);
                    special.FreeLetter--;
                }
                break;


        }

    }

    guessLetter(letter){
        let res = this.puzzle.guessLetter(letter);

        switch(res){
            case true:
                this.score +=13;
                return true;
                break;

            case false:
                this.guesses --;
                return false;
                break;

            case "You already guessed this letter!":
                alert(res);
                return true;
                break;

        }

    }

    guessWord(word){
        let res = this.puzzle.guessWord(word);
        if(res){
            YouWin();
        }else{
            alert("Incorrect Guess");
            this.guesses --;
        }

    }


}




/*
#OOP
I used the specials class to show the use of Parent and Child class inheritance as well as polymorphism
the parent class .use() function does little more than return the puzzle handed to it. It's effectively an abstract
class.

 */
class Special{

    use(currentPuzzle){
        let puzzle = currentPuzzle;
        //do some stuff
        return puzzle;
    }
}

/*
#OOP
Each of the child classes that extend special override the .use() function and do affect the puzzle differently.
Streln and Vowels are about the same
 */

class Streln extends Special{
    use(currentPuzzle){
        let puzzle = currentPuzzle;
        puzzle.guessLetter("s");
        puzzle.guessLetter("t");
        puzzle.guessLetter("r");
        puzzle.guessLetter("e");
        puzzle.guessLetter("l");
        puzzle.guessLetter("n");

        return puzzle;
    }
}

class Vowels extends Special{
    use(currentPuzzle){
        let puzzle = currentPuzzle;
        puzzle.guessLetter("a");
        puzzle.guessLetter("e");
        puzzle.guessLetter("i");
        puzzle.guessLetter("o");
        puzzle.guessLetter("u");
        return puzzle;
    }
}
/*
#UserInput #Validation
Pick a letter creates a menu that allows the user to choose an open blank from a prompt popup.
To see this code we will have to jump over to my keeper.js library. And search for #displayReturnInt
 */
class PickALetter extends Special{
    use(currentPuzzle){
        let puzzle = currentPuzzle;
        let menu = new Menu("Pick a space to reveal the letter",puzzle.currentBoard);
        let choice = "1";
        let chosenIndex = -1;
        while (choice !== "_"){//#WhileLoop this loop only stops if the user picks an unrevealed letter aka "_"
            chosenIndex = menu.displayReturnInt();
            choice = puzzle.currentBoard[chosenIndex];
            //use a validator to create a menu for the remaining letters
            //prompt user to pick field on the word
            //use guessLetter with that letter
            //if user presses cancel return false
        }
        let letter = puzzle.answer[chosenIndex];
        puzzle.guessLetter(letter);
        return puzzle;
    }
}


//#Expressions free letter uses Math.rand to pick a random letter that is unrevealed and then reveals it
class FreeLetter extends Special{
    use(currentPuzzle){
        let puzzle = currentPuzzle;
        let remaining = [];
        for(let i = 0; i < puzzle.answer.length; i++){
            if(puzzle.currentBoard[i] === "_") {
                remaining.push(puzzle.answer[i]);
            }
        }
        console.log("remaining",remaining);
        let randIndex = Math.round((Math.random()*(remaining.length-1)));
        console.log("random letter chosen",remaining[randIndex]);
        puzzle.guessLetter(remaining[randIndex]);
        return puzzle;
    }
}




//functions for guessing letters and words

function letterGuess(key){//lets you press enter to start the main function instead of clicking with a mouse
    if(key.keyCode === 13){
        key.preventDefault();//not sure about this line, the how to suggested it be here to not cause errors, i'll learn more later
        let letter = document.getElementById("letterGuess").value.toLowerCase();
        let alphabet =/[a-zA-z]*/g;
        let testLetter = letter.replace(alphabet,"");
        if(letter.length === 1 && testLetter.length === 0){
            let guess = user.guessLetter(letter);//#Function passes the chosen "letter" as the argument to the
                                                 // .guessLetter() function of the user class
                console.log("the guess here is "+guess);
                if (!guess){
                    alert(letter+ " is not a piece of the current puzzle.")
                }
        }else{
            alert("Your guess was not a valid letter!");

        }
        document.getElementById("letterGuess").value = "";
        let win = user.puzzle.guessWord(user.puzzle.currentBoard);
        if (win){
            YouWin();
        }

        UpdateBoard();
        UpdateHeader();
        if(user.guesses < 1){
            YouLose();
        }
    }

}

function wordGuess(key){//lets you press enter to start the main function instead of clicking with a mouse
    if(key.keyCode === 13){
        key.preventDefault();//not sure about this line, the how to suggested it be here to not cause errors, i'll learn more later
        let word = document.getElementById("wordGuess").value.toLowerCase().trim();
        let alphabet =/[a-zA-z]*/g;
        let testWord = word.replace(alphabet,"");

        if(word.length > 0 && testWord.length === 0){
            user.guessWord(word);

        }else{
            alert("Your guess contained invalid or no characters!")
        }
        document.getElementById("wordGuess").value = "";
        let win = user.puzzle.guessWord(user.puzzle.currentBoard);
        if (win){
            YouWin();
        }

        UpdateBoard();
        UpdateHeader();
        if(user.guesses < 1){
            YouLose();
        }
    }

}

//This allows for the specials buttons to function
function Specials(type){
    user.useSpecial(type);

    let win = user.puzzle.guessWord(user.puzzle.currentBoard);
    if (win){
        YouWin();
    }
    UpdateInventory();
    UpdateBoard();
    UpdateHeader();
}

//functions for updating the GUI
function UpdateHeader(){
    document.getElementById("header").innerHTML = "";
    let header = document.createTextNode(user.name + "_______"+user.guesses+" guesses remain_______Level: "+user.level+"_______"+user.score+" points");
    document.getElementById("header").appendChild(header);
}

function UpdateBoard(){//Updates main board with the puzzle
    document.getElementById("board").innerHTML = "";
    let boardString = " ";
    user.puzzle.currentBoard.forEach(function(v){
        boardString += v;
        boardString +=" ";
    });
    let board = document.createTextNode(boardString);
    document.getElementById("board").appendChild(board);
}

function UpdateInventory(){//This updates the numbers under the specials buttons
    document.getElementById("streln").innerHTML = "";
    let streln = document.createTextNode(user.specials.inventory.Streln);
    document.getElementById("streln").appendChild(streln);

    document.getElementById("vowels").innerHTML = "";
    let vowels = document.createTextNode(user.specials.inventory.Vowels);
    document.getElementById("vowels").appendChild(vowels);

    document.getElementById("pickALetter").innerHTML = "";
    let pickALetter = document.createTextNode(user.specials.inventory.PickALetter);
    document.getElementById("pickALetter").appendChild(pickALetter);

    document.getElementById("freeLetter").innerHTML = "";
    let freeLetter = document.createTextNode(user.specials.inventory.FreeLetter);
    document.getElementById("freeLetter").appendChild(freeLetter);
}



function Main(){
    //Get user's name
    let validator = new Validator();
    let userName = validator.getString("Please enter your name.");
    if (userName === null){
        document.getElementById("header").innerHTML = "";
        document.getElementById("board").innerHTML = "User quit the game!";
        document.getElementById("guess").innerHTML = "";
        document.getElementById("specials").innerHTML = "";

    }else{
        user = new User(userName);
        let randIndex = Math.round((Math.random()*(library.length-1)));
        user.puzzle = new Puzzle(library[randIndex]);

        UpdateHeader();
        UpdateInventory();
        UpdateBoard();
    }

}

function YouWin(){
    let types = ["Streln","Vowels","PickALetter","FreeLetter"];
    let randIndex1 = Math.round((Math.random()*(types.length-1)));
    let lettersLeft = 0;
    for(let letter of user.puzzle.currentBoard){
        if(letter = "_"){
            lettersLeft +=13;
        }
    }
    let score = ((user.puzzle.answer.length)*11)+lettersLeft;
    user.score += score;
    user.specials.inventory[types[randIndex1]]++;
    user.guesses++;
    user.level++;
    alert("The answer is "+user.puzzle.word.toUpperCase()+"!\nPoints awarded for completion: "+ score+"\nYou got a new special: "+types[randIndex1]+"\nYou got an extra guess!");

    let randIndex2 = Math.round((Math.random()*(library.length-1)));
    user.puzzle = new Puzzle(library[randIndex2]);

    UpdateHeader();
    UpdateBoard;
    UpdateInventory();

}

function YouLose(){
    document.getElementById("board").innerHTML = "Above is your final score.";
    document.getElementById("guess").innerHTML = "You have run out of guesses.";
    document.getElementById("specials").innerHTML = "Refresh the page to play again.";

}



Main();
