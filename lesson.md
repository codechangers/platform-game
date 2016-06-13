# Camp Project: Platform Game

## WHAT is the platform game?
-----------------------------
This project is a game that will expose students to practical uses of JavaScript.


## WHY are we doing this project?
---------------------------------
This project is an interactive lesson about programming. It will help children
understand that program code controls what a computer does.

## LEARN how to build the project.
----------------------------------

### Goal 1: Make a movement function.
On the left side of the page (the code side), add a new function called "move".
This function will be called about 60 times per second, and will allow us to
make our character, Grant, move.

```js
function move() {

}
```

Now that we have our movement function, we need to do four steps to make Grant start
running.

These are the four steps to make Grant move:
1. check if an arrow key is pressed.
2. if it is, add Grant's speed to his x position.
3. Play the "run" animation.
4. if no key is pressed, play the "stand" animation.

For step 1, we will use the `check_key` function. We can tell the computer
"if the left arrow is pressed, move left. if the right arrow key is pressed, move right.
if no arrow keys are pressed, make Grant stand."

We will add four more lines to our move function.
```js
function move() {
    if (check_key(KEYCODE_LEFT)) {

    } else if (check_key(KEYCODE_RIGHT)) {

    } else {

    }
}
```

The next step after checking if a key is pressed is to make Grant look in the right
direction. It would look pretty strange if grant was looking left but moving right.

We can use Grant's built-in "look" function to change his direction.

```js
function move() {
    if (check_key(KEYCODE_LEFT)) {
        grant.look("left");
    } else if (check_key(KEYCODE_RIGHT)) {
        grant.look("right");
    }
    else {
    }
}
```

Now, whenever you press the arrow keys, Grant will look left or right. Pretty cool, huh?

Make sure you save your code every time you finish something. You don't want to lose all
your hard work.

We have two more steps to complete before our `move` function is done. Let's look at each
step again.

These are the four steps to make Grant move:
1. Check if an arrow key is pressed.
2. If it is, tell Grant to look and move in that direction.
3. Play the "run" animation.
4. If no key is pressed, play the "stand" animation.

We can use the `move_left` and `move_right` functions to make Grant move left and
right. You can see how to use it in the example below:

```js
function move () {
    if (check_key(KEYCODE_LEFT)) {
        grant.look("left");
        grant.move_left(5);
    } else if (check_key(KEYCODE_RIGHT)) {
        grant.look("right");
        grant.move_right(5);
    } else {

    }
}
```

Now that Grant is moving, we can use the `play_run_animation` function to play
the animation that makes him look like he's running.

```js
function move () {
    if (check_key(KEYCODE_LEFT)) {
        grant.look("left");
        grant.move_left(5);
        grant.play_run_animation();
    } else if (check_key(KEYCODE_RIGHT)) {
        grant.look("right");
        grant.move_right(5);
        grant.play_run_animation();
    } else {
        grant.play_stand_animation();
    }
}
```

Great job! You finished the move function!

### Step 2: Develop a jump function.
Now that our character can move, we need to figure out how to get over the level's
obstacles. We can do this by programming a function to make Grant jump.

We will want to add a new function to the code area named "jump", and write all of the following code inside it.

Step 1: Check if the "up" arrow key is pressed. If it is, and Grant isn't already jumping, go to step 2.
```js
if (check_key(KEYCODE_UP) && !grant.jumping) {

}
```

Step 2: Set `grant.jumping` to `true`. This will prevent jumping in the air. If you want to make Grant double-jump, you can remove this part.

We can also do step 3 here. Set Grant's `ySpeed` to a negative number. We will be adding Grant's `ySpeed` to his `y` position every frame. A value of -7 means he'll start to move up 7 pixels at a time.

```js
if (check_key(KEYCODE_UP) && !grant.jumping) {
    grant.jumping = true;
    grant.ySpeed = -7;
}
```

Step 4: Outside the if statement, add `grant.ySpeed` to `grant.y`. This will start to move Grant towards the top of the screen.

`grant.y += grant.ySpeed;`

Step 5: If Grant is in the air, add `gravity` to his `ySpeed` and play the "jump" animation.

```js
if (grant.in_air()) {
    grant.ySpeed += gravity;
    grant.gotoAndPlay("jump");
}
```

Step 6: If Grant isn't in the air, set his `ySpeed` to 0 and `grant.jumping` to false.

```js
else {
   grant.ySpeed = 0;
   grant.jumping = false;
}
```

Step 7: Last, outside the if statement, check if Grant's head has collided with a block. If it has, set his `ySpeed` to `gravity`. This will make him fall back down instead of jumping through the block.


```js
if (grant.head_collided()) {
  grant.ySpeed = gravity;
}
```

Great work! We have one more step to help us complete the game. We need to collect each flag at the end of the level so we can move on to the next level.

### Step 3: Write a function to collect the flag at the end of the level.
This function is pretty simple, but it will help us beat the game.

Here are the steps you'll need to code to collect the flag.

Step 1: Remove the flag object. This will prevent us from accidentally touching the flag twice. To do this, we can use the `remove_object` function and give it the `flag` variable.

```js
remove_object(flag);
```

Step 2: Create a timer that will send us to the next level after a short delay.

We want to wait before going to the next level so our players can see that they've collected the flag.

```js
setTimeout(function () {

}, 500);
```

Step 3: Inside the timer, increase the `current_level` variable by 1 and use the `load_level` function to load the next level.

```js
current_level += 1;
load_level(current_level);
```


```js
function hit_flag() {
  remove_object(flag);
  setTimeout(function () {
    current_level += 1;
    load_level(current_level);
  }, 500);
}
```

## Extras!
----------

There are a couple more things you can do with this game.

1. Use the `switch_character()` function to change characters. There are four options. "grant", "jill", "ada", and "mario".
2. Create a `shoot` function. You can shoot by using the spacebar.
3. Try changing the values of Grant's movement speed and jump speed. You can see it in real-time by editing the code and clicking on the canvas.

```js
function shoot() {
  bullet = add_bullet();
  bullet.xSpeed = 7 * grant.scaleX;
}
```
