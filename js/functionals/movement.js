let player_velocity;
let player_velocity_x;
let player_velocity_y;
let mob_velocity;
//#TODO bullet is buggy
function tryToMoveBullet (b) {
    let new_coords = getCoordsInDirection (b.getKx (), b.getKy (), b.getX (), b.getY (), b.getDirection ());

    let index;
    if ((index = mobCollide (b.getOx (), b.getOy ())) !== -1) {
        mobs_trash.push (index);
        score += 50;
        return false;
    }
    if (map.empty (new_coords[0], new_coords[1])) {
        b.force_move ();
        return true;
    }
    return false;
}

//#TODO making player always on tile if stops or turns
function tryToMovePlayer (p, direction) {
    //Setting direction
    p.setDirection (direction);
    let new_coords = getCoordsInDirection (p.getKx (), p.getKy (), p.getX (), p.getY (), direction);
    let vx = directions[direction][0];
    let vy = directions[direction][1];

    if (p.getX () % tile_size === 0) {
        player_velocity_x = player_velocity;
    }
    if (p.getY () % tile_size === 0) {
        player_velocity_y = player_velocity;
    }

    if (mobCollide (p.getOx (), p.getOy ()) !== -1) {
        lose = true;
        return false;
    }

    if (map.empty (new_coords[0], new_coords[1])) {

        if (vy !== 0) {
            if (p.getX () % tile_size === 0) {
                p.move (vx * player_velocity_x, vy * player_velocity_y);
                return true;
            } else if (map.empty (new_coords[0] + 1, new_coords[1])) {
                p.move (vx * player_velocity_x, vy * player_velocity_y);
                return true;
            }
        } else { //if (vx !==0) {
            if (p.getY () % tile_size === 0) {
                p.move (vx * player_velocity_x, vy * player_velocity_y);
                return true;
            } else if (map.empty (new_coords[0], new_coords[1] + 1)) {
                p.move (vx * player_velocity_x, vy * player_velocity_y);
                return true;
            }
        }
    }
    return false;
}

function shot (p) {
    if (!unarmed_active) {
        bullets.push (new Bullet (p.getX (), p.getY (), p.getFx (), p.getFy (), p.getDirection ()));
    }
}

//Game tick functions
function tickPlayerMoving () {
    let move = false;
    if (reverse_active) {
        for (let i = 0; i < 4; i++) {
            if (pressedKey[i]) {
                tryToMovePlayer (player, turn (i));
                move = true;
            }
        }
    } else {
        for (let i = 0; i < 4; i++) {
            if (pressedKey[i]) {
                tryToMovePlayer (player, i);
                move = true;
            }
        }
    }
    if (!move) {
        player.stop ();
    }
}

function tickPlayerShooting () {
    //#TODO Shooting speed and/or mb more weapons
    if (pressedKey[KEY_SHOOT]) {
        shot (player);
    }
}

function tickBulletsMoving () {
    for (let i = 0; i < bullets.length; i++) {
        if (!tryToMoveBullet (bullets[i])) {
            bullets_trash.push (i);
        }
    }
}