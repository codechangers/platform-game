# Camp Project: Platform Game

## WHAT is the platform game?
-----------------------------
This project is a game that will introduce students to programming by having them
write code to add features.

## WHY are we doing this project?
---------------------------------
This project is an interactive lesson about programming. It will help children
understand that program code controls what a computer does.

## LEARN how to build the project.
----------------------------------

### Goal 1: Make a movement function.
On the left side of the page (the code side), add two lines of code. They should
look like this.

```js
function move() {

}
```

This is the function we will use to make our character, Grant, move. Functions are
a name for a group of code that goes together. Think about a recipe: all of the instructions
are grouped together on the page, and the recipe has a name. The recipe for "Cheese Pizza"
tells you how to make a cheese pizza. This is kind of like that.

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

We use the curly braces ("{}") to group code together. In our `move` function,
we have three groups:
1. The first group will run if the left arrow key is pressed.
2. The second group will run if the right arrow key is pressed.
3. The third group will run if no arrow keys are pressed.

Let's fill in our groups. Add two more lines to your function.

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
2. If it is, tell Grant to move left.
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

For the last step, we will play the animations to make Grant run or stand. Here's
how to do that.

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
