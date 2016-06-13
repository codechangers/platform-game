function move() {
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

function jump() {
    if (check_key(KEYCODE_UP) && !grant.jumping) {
        grant.jumping = true;
        grant.ySpeed = -7;
    }

    grant.y += grant.ySpeed;
    if (grant.in_air()) {
        grant.ySpeed += gravity;
        grant.gotoAndPlay("jump");
    } else {
        grant.ySpeed = 0;
        grant.jumping = false;
    }
    if (grant.head_collided()) {
      grant.ySpeed = gravity;
    }
}

function hit_flag() {
  grant.ySpeed = 0;
  setTimeout(function () {
    current_level += 1;
    load_level(current_level);
  }, 500);
}

function shoot() {
  bullet = add_bullet();
  bullet.xSpeed = 7 * grant.scaleX;
}
