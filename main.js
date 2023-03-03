const NUM_BUSHES = 50
const NUM_BALLS = 5

const player = document.querySelector('.player')
const player_pos = {
    x: parseInt(window.innerWidth / 2),
    y: parseInt(window.innerHeight / 2)
}
//In this version, we use document.querySelector('.player') to select the .player element, and assign it to the player variable.

//We also use window.innerWidth and window.innerHeight to get the width and height of the browser window, respectively, and then divide by 2 and use parseInt() to round down to get the center coordinates for player_pos.
const player_vel = {
    x: 0,
    y: 0
}
const balls = []
const sound = new Audio('assets/coin.mp3')

//This function, createBushes(), creates a specified number of randomly positioned <div> elements with the class "bush" and appends them to the body of the HTML document.

//The function accomplishes this by using a for loop to iterate NUM_BUSHES number of times. On each iteration, it creates a new <div> element using document.createElement('div'), and adds the "bush" class to it using div.classList.add('bush').

//The function then sets the position of the <div> element using div.style.left and div.style.top, which are both set to a random number between 0 and 100 (inclusive) with the % symbol indicating that the position is a percentage of the width or height of the viewport.

//Finally, the function appends the newly created <div> element to the body of the HTML document using document.body.appendChild(div).



function createBushes(){
    for(let i = 0; i < NUM_BUSHES; i++){
        const div = document.createElement('div')
        div.classList.add('bush')
        div.style.left = Math.random() * 100 + '%'
        div.style.top = Math.random() * 100 + '%'
        document.body.appendChild(div)
    }
}

function generateBall(){
    const div = document.createElement('div')
    div.classList.add('pokeball')
    let x = Math.random() * 100 + '%'
    let y = Math.random() * 100 + '%'
    div.style.left = x
    div.style.top = y
    balls.push({
        ball: div,
        pos: {
            x,
            y
        }
    })
    document.body.appendChild(div).
}


//This function, generateBall(), creates a new <div> element with the class "pokeball" and a random position, and then adds it to the balls array and the HTML document.

//The function starts by creating a new <div> element using document.createElement('div'), and adds the "pokeball" class to it using div.classList.add('pokeball').

//It then generates random x and y values between 0 and 100 (inclusive) using Math.random() * 100 + '%' and sets the position of the <div> element using div.style.left and div.style.top.

//The function then adds the newly created <div> element to the balls array along with its position, which is stored as an object with x and y properties.

//Finally, the function appends the <div> element to the body of the HTML document using document.body.appendChild(div).




function createBalls(){
    for(let i = 0; i < NUM_BALLS; i++){
        generateBall()
    }
}

function collision($div1, $div2) {
    var x1 = $div1.getBoundingClientRect().left;
    var y1 = $div1.getBoundingClientRect().top;
    var h1 = $div1.clientHeight;
    var w1 = $div1.clientWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;

    var x2 = $div2.getBoundingClientRect().left;
    var y2 = $div2.getBoundingClientRect().top;
    var h2 = $div2.clientHeight;
    var w2 = $div2.clientWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}

// this is a javascript function that checks for  collisions between two HTML elements , $div1 and $div2 . The function returns true if the elements are colliding, and false otherwise.
 
//The function uses the getBoundingClientRect() method to get the position and dimensions of each element. It then calculates the position of the bottom (b1 and b2) and right (r1 and r2) edges of each element using their respective positions and dimensions.

//The function then checks if the elements are colliding by comparing the positions of their top, bottom, left, and right edges. If any of these positions are not overlapping,the function returns false. If all of the positions are overlapping, the function returns true.




function checkCollisions(){
    balls.forEach(ball => {
        if(collision(ball.ball, player)){
            sound.play()
            ball.ball.remove()
            generateBall()
        }
    })
}


//This is a JavaScript function checkCollisions() that checks for collisions between the elements in the balls array and the player element.If a collision is detected, the function plays a sound, removes the colliding ball from the DOM, and generates a new ball using the generateBall() function.
 
//The function uses the forEach() method to iterate over each element in the balls array. For each element, it checks if there is a collision between the element's ball (ball.ball) and the player element using the collision() function. If a collision is detected .

//the function plays a sound using the sound.play() method, removes the colliding ball from the DOM using the remove() method, and generates a new ball using the generateBall() function.



function run(){
    player_pos.x += player_vel.x
    player_pos.y += player_vel.y

    player.style.left = player_pos.x + 'px'
    player.style.bottom = player_pos.y + 'px'
    
    checkCollisions()

    requestAnimationFrame(run)
}

//This is a JavaScript function run() that updates the position of the player element on every frame of an animation loop. The function first updates the position of the player element based on its velocity, which is stored in the player_vel object. The player_pos object stores the current position of the player element.

//The function then sets the left and bottom CSS properties of the player element to its new position using the style property. The left property controls the horizontal position of the element, while the bottom property controls the vertical position. By updating these properties, the player element will appear to move on the screen.

//The function also calls the checkCollisions() function to check for collisions between the player element and the balls in the game.

//Finally, the function uses the requestAnimationFrame() method to call itself recursively on every frame of the animation loop. This is a common way to implement smooth animations in web applications and games






function init(){
    createBushes()
    createBalls()
    run()
}

init()

//This is a JavaScript function init() that initializes the game by calling several other functions: createBushes(), createBalls(), and run().
 
//The createBushes() function creates a random number of bushes on the screen, each positioned at a random location within the browser window. The createBalls() function generates a random number of pokeballs on the screen, each positioned at a random location within the browser window.

//The run() function is the main game loop that updates the position of the player element, checks for collisions with the balls, and renders the game on the screen.

//By calling these three functions in init(), the game is fully initialized and ready to be played. This function is typically called when the game page is loaded or when the player starts a new game.



window.addEventListener('keydown', function(e){
    if(e.key == "ArrowUp"){
        player_vel.y = 3
        player.style.backgroundImage = 'url("assets/player_front.png")'
    }
    if(e.key == "ArrowDown"){
        player_vel.y = -3
        player.style.backgroundImage = 'url("assets/player_back.png")'
    }
    if(e.key == "ArrowLeft"){
        player_vel.x = -3
        player.style.backgroundImage = 'url("assets/player_left.png")'
    }
    if(e.key == "ArrowRight"){
        player_vel.x = 3
        player.style.backgroundImage = 'url("assets/player_right.png")'
    }
    player.classList.add('active')
})

//This code adds an event listener to the window object for the 'keydown' event. When a key is pressed, the function specified in the second argument is called with an event object as its parameter.

//The function checks which key was pressed using the e.key property, and if it matches one of the arrow keys ('ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'), it updates the player_vel object accordingly to move the player in that direction. It also changes the background image of the player element to give the appearance of the player facing the direction of movement


//Finally, the function adds the 'active' class to the player element, which applies a CSS animation to make the player element appear to move smoothly across the screen.



window.addEventListener('keyup', function(){
    player_vel.x = 0
    player_vel.y = 0
    player.classList.remove('active')
})


//This code adds an event listener to the window object for the 'keyup' event. When a key is released, the function specified in the second argument is called without any parameters.



//The function resets the player_vel object to {x: 0, y: 0}, effectively stopping the player's movement. It also removes the 'active' class from the player element, which stops the CSS animation applied by the 'keydown' event listener.