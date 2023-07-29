import Phaser from "phaser";
import FallingObject from "../ui/FallingObject";
import ScoreLabel from "../ui/ScoreLabel";

export default class GhostBusterScene extends Phaser.Scene {
  constructor() {
    super("ghost-buster-scene");
  }
  init() {
    this.listBomb = undefined;
    this.ground = undefined;
    this.player = undefined;
    this.playerSpeed = 150;
    this.cursors = undefined;
    this.listGhost = undefined;
    this.ghostSpeed = 60;
    this.lastFired = 0;
    this.scoreLabel = undefined;
  }

  preload() {
    this.load.image("background", "images/background.png");
    this.load.image("bomb", "images/bomb.png");
    this.load.image("gameover", "images/gameover.png");
    this.load.image("ghost", "images/ghost.png");
    this.load.image("ground", "images/ground.png");
    this.load.image("replay", "images/replay.png");
    this.load.spritesheet("player", "images/player.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.add.image(500, 500, "background").setScale(2);

    this.ground = this.physics.add.staticGroup();
    this.ground.create(500, 980, "ground").setScale(2);

    this.player = this.physics.add.sprite(500, 900, "player").setScale(2);
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.2);
    this.physics.add.collider(this.ground, this.player);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.scoreLabel = this.createScoreLabel(16, 16, 0);

    this.listGhost = this.physics.add.group({
      classType: FallingObject,
      maxSize: 20,
      runChildUpdate: true,
    })
    this.time.addEvent({
      delay: 2000,
      callback: this.spawnGhost,
      callbackScope: this,
      loop: true,
    });
  }

  update(time) {
    this.movePlayer(this.player, time);
  }

  createPlayer() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNames("player", 
      {start: 3, end: 5}),
      frameRate: 10,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNames("player", 
      {start: 6, end: 8}),
      frameRate: 10,
    });
    this.anims.create({
      key: "turn",
      frames: this.anims.generateFrameNames("player",
      {start: 0, end: 2}),
      frameRate: 10,
    });
  }

  movePlayer(player, time) {
    if (this.cursors.left.isDown || this.nav_left) {
      this.player.setVelocityX(this.playerSpeed * -1);
      this.player.setFlipX(false);
    } else if (this.cursors.right.isDown || this.nav_right) {
      this.player.setVelocityX(this.playerSpeed);
      this.player.setFlipX(true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(this.playerSpeed * -1);
      this.player.setFlipY(false);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.playerSpeed);
      this.player.setFlipY(true);
    } else {
      this.player.setVelocityY(0);
      this.player.setVelocityX(0);
    }
  }

  spawnGhost() {
    const config = {
      speed: this.ghostSpeed,
      rotation: 0,
    };
    const listGhost = this.listGhost.get(0, 0, "enemy", config);
    const ghostWidth = ghost.displayWidth;
    const positionX = Phaser.Math.Between(
      ghostWidth,
      this.scale.width - listGhostWidth
    );
    if (ghost) {
      ghost.spawn(positionX);
    }
  }
  
  hitGhost(bomb, ghost) {
  }

  createScoreLabel(x, y, score) {
    const style = { fontSize: "32px", fill: "#FFFF" };
    const label = new ScoreLabel(this, x, y, score, style);
    this.add.existing(label);
    return label;
  }

  hitPlayer(player, ghost) {
  }
}