import kaboom from "kaboom"
import "kaboom/global"


// initialize context
kaboom({
  font: "sink",
  background: [210, 210, 155],

})

// load assets
loadSprite("bean", "sprites/bean.png");
loadSprite("bomb", "sprites/bomb.png");
//Load sounds

loadSound("gameover", "sounds/over.mp3");
loadSound("blast", "sounds/blast.mp3");
//variables
let SPEED = 620
let BSPEED = 1

const player = add([
  sprite("bean"),  // renders as a sprite
  pos(20, 80),    // position in world
  area(),   // has a collider
  scale(0.5),

])

onKeyDown("left", () => {
  player.move(-SPEED, 0)
})

onKeyDown("right", () => {
  player.move(SPEED, 0)
})
onKeyDown("up", () => {
  player.move(0, -SPEED)
})
onKeyDown("down", () => {
  player.move(0, SPEED)
})

let bombSpawn = setInterval(() => {
  for (let i = 0; i < 4; i++) {
    let x = rand(0, width())
    let y = 0
    let c = add([
      sprite("bomb"),  // renders as a sprite
      pos(x, y),    // position in world
      area(),   // has a collider
      scale(0.05),
      "bomb"])
    c.onUpdate(() => {
      c.moveTo(c.pos.x, c.pos.y + BSPEED)
    })
    if (BSPEED < 13)
      BSPEED += 1
  }
}, 4000)


const obj = add([
  timer(),])
let score
player.onCollide("bomb", () => {
  play("blast")
  destroy(player)
  clearInterval(bombSpawn)
  destroyAll
  addKaboom(player.pos)
  obj.wait(1, () => {
    play("gameover")
  })
  let score = add([
    text("GaMeOvEr"),
    pos(200, 80),
    scale(3),
    color(10, 10, 255)
  ])

})

