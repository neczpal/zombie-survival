function GameMap (w, h) {
    this.tiles = [];
    this.width = w;
    this.height = h;

    //Fill 0-s
    for (let i = 0; i < this.width; i++) {
        this.tiles[i] = [];
        for (let j = 0; j < this.height; j++) {
            this.tiles[i][j] = 0;
        }
    }

    //Random map:
    for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
            //If no wall near
            if (Math.floor (Math.random () * 100) < wall_rate
                // Bounds check
                && i + 1 < this.width
                && i - 1 >= 0
                && j + 1 < this.height
                && j - 1 >= 0
                // Current check
                && this.tiles[i][j] === 0
                // Orthogonal check
                && this.tiles[i + 1][j] === 0
                && this.tiles[i - 1][j] === 0
                && this.tiles[i][j + 1] === 0
                && this.tiles[i][j - 1] === 0
                // Diagonal check
                && this.tiles[i + 1][j + 1] === 0
                && this.tiles[i + 1][j - 1] === 0
                && this.tiles[i - 1][j + 1] === 0
                && this.tiles[i - 1][j - 1] === 0) {

                let length = Math.floor (Math.random () * wall_max) + wall_min;

                //Horizontal
                if (Math.floor (Math.random () * 2) === 0) {
                    let k = i;
                    let maxWallXIndex = length + i;
                    while (k < maxWallXIndex
                    && k + 1 < this.width
                    && this.tiles[k + 1][j] !== 1
                    && this.tiles[k + 1][j + 1] !== 1
                    && this.tiles[k + 1][j - 1] !== 1) {

                        this.tiles[k][j] = 1;
                        k++;
                    }
                }
                //Vertical
                else {
                    let k = j;
                    let maxWallYIndex = length + j;
                    while (k < maxWallYIndex
                    && k + 1 < this.height
                    && this.tiles[i][k + 1] !== 1
                    && this.tiles[i + 1][k + 1] !== 1
                    && this.tiles[i - 1][k + 1] !== 1) {
                        this.tiles[i][k] = 1;
                        k++;
                    }
                }
            }
        }
    }

    this.set = function (i, j, z) {
        this.tiles[i][j] = z;
    };
    this.empty = function (x, y) {
        return x >= 0 && y >= 0 && x < this.width && y < this.height && this.tiles[x][y] === 0;
    };
    this.draw = function (x, y) {
        ctx.fillStyle = "#42240c";
        ctx.fillRect (0, 0, view_width, view_height);

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.tiles[i][j] === 1) {
                    ctx.drawImage (crateImage, tiles_pos_x[i] - x, tiles_pos_y[j] - y, tile_size, tile_size);
                } else {
                    ctx.drawImage (floorImage, tiles_pos_x[i] - x, tiles_pos_y[j] - y, tile_size, tile_size);
                }
            }
        }
    };
    this.getWidth = function () {
        return this.width;
    };
    this.getHeight = function () {
        return this.height;
    };
}