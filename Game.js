'use client'
// clear
ctx.fillStyle = '#081018'
ctx.fillRect(0, 0, width, height)


// simple parallax background
ctx.fillStyle = '#2b3b4a'
ctx.fillRect(0, height - 120, width, 120)


// player (placeholder rectangle or sprite if loaded)
const p = player.current
if (sprites.current && sprites.current.complete) {
// draw sprite placeholder: in your final project map frames from spritesheet
ctx.drawImage(sprites.current, 0, 0, 48, 48, p.pos.x, p.pos.y, 48, 48)
} else {
ctx.fillStyle = '#b6c7d9'
ctx.fillRect(p.pos.x, p.pos.y, p.size.w, p.size.h)
}


// enemies
enemies.current.forEach((e) => {
if (sprites.current && sprites.current.complete) {
ctx.drawImage(sprites.current, 48, 0, 48, 48, e.pos.x, e.pos.y, 48, 48)
} else {
ctx.fillStyle = '#d48'
ctx.fillRect(e.pos.x, e.pos.y, e.size.w, e.size.h)
}
})


// bullets
bullets.current.forEach((b) => {
ctx.beginPath()
ctx.arc(b.pos.x, b.pos.y, b.size, 0, Math.PI * 2)
ctx.fillStyle = b.friendly ? '#ffd' : '#f88'
ctx.fill()
})


// particles
particles.current.forEach((pt) => {
ctx.fillStyle = 'rgba(255,200,120,' + (pt.life * 2) + ')'
ctx.fillRect(pt.x, pt.y, 4, 4)
})


// HUD
ctx.fillStyle = '#fff'
ctx.font = '18px monospace'
ctx.fillText('HP: ' + player.current.health, 12, 24)
ctx.fillText('Enemies: ' + enemies.current.length, 12, 46)



return (
<div className="relative">
<canvas ref={canvasRef} width={width} height={height} className="block" />
<div className="absolute top-2 right-2 flex gap-2">
<button className="px-3 py-1 bg-gray-800 text-white rounded" onClick={() => setRunning((r) => !r)}>{running ? 'Pause' : 'Resume'}</button>
<button className="px-3 py-1 bg-gray-800 text-white rounded" onClick={() => {
const c = canvasRef.current
if (!c) return
if (document.fullscreenElement) document.exitFullscreen()
else c.requestFullscreen()
}}>Fullscreen</button>
</div>
</div>
)
