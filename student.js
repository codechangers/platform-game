function move() {
    if (check_key(KEYCODE_LEFT)) {
        grant.look("left");
        grant.move_left(10);
        grant.play_run_animation();
    } else if (check_key(KEYCODE_RIGHT)) {
        grant.look("right");
        grant.move_right(10);
        grant.play_run_animation();
    } else {
        grant.play_stand_animation();
    }
}

function jump() {
    if (check_key(KEYCODE_UP) && !grant.jumping) {
        grant.jumping = true;
        grant.ySpeed = -6;
    }

    grant.y += grant.ySpeed;
    if (grant.in_air()) {
        grant.ySpeed += gravity;
        grant.gotoAndPlay("jump");
    } else {
        grant.ySpeed = 0;
        grant.jumping = false;
    }
}
