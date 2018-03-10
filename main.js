var canvas = document.getElementById('page')
var ctx = canvas.getContext('2d')

var using = false
var isRubber = false
var lastPoint, newPoint
var radius = 3
var color = 'black'
var lineWidth = 2 * radius

autoCanvasSize()
listenToButton()
listenToUser()

function listenToUser() {
    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart = function (e){
            using = true
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            lastPoint = {
                x: x,
                y: y,
            }
            if (isRubber) {
                ctx.clearRect(x - radius, y - radius, 3 * radius, 3 * radius)
            } else {
                drawCircle(x, y, radius, color)
            }
        }
        canvas.ontouchmove = function (e) {
            var x = e.touches[0].clientX
            var y = e.touches[0].clientY
            newPoint = {
                x: x,
                y: y,
            }
            if (using) {
                if (isRubber) {
                    ctx.clearRect(x - radius, y - radius, lineWidth, lineWidth)
                } else {
                    drawCircle(x, y, radius, color)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, color, lineWidth)
                    lastPoint = newPoint
                }

            }
        }
        canvas.ontouchend = function () {
            using = false
        }
    }else{
        canvas.onmousedown = function (e) {
            using = true
            var x = e.clientX
            var y = e.clientY
            lastPoint = {
                x: x,
                y: y,
            }
            if (isRubber) {
                ctx.clearRect(x - radius, y - radius, 3 * radius, 3 * radius)
            } else {
                drawCircle(x, y, radius, color)
            }
        }

        canvas.onmousemove = function (e) {
            var x = e.clientX
            var y = e.clientY
            newPoint = {
                x: x,
                y: y,
            }
            if (using) {
                if (isRubber) {
                    ctx.clearRect(x - radius, y - radius, lineWidth, lineWidth)
                } else {
                    drawCircle(x, y, radius, color)
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, color, lineWidth)
                    lastPoint = newPoint
                }

            }
        }

        canvas.onmouseup = function (e) {
            using = false
        }
    }
    
}

function drawLine(x1, y1, x2, y2, color, lineWidth) {
    ctx.beginPath();
    ctx.strokeStyle = color
    ctx.moveTo(x1, y1) // 起点
    ctx.lineWidth = lineWidth
    ctx.lineTo(x2, y2) // 终点
    ctx.stroke()
    ctx.closePath()
}

function drawCircle(x, y, r, color) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x, y, r, 0, 360)
    ctx.fill()
}

function autoCanvasSize() {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        page.width = pageWidth
        page.height = pageHeight
    }
}

function listenToButton() {
    rubber.onclick = function () {
        isRubber = true
        rubber.classList.add('active')
        pen.classList.remove('active')
    }

    pen.onclick = function () {
        isRubber = false
        pen.classList.add('active')
        rubber.classList.remove('active')
    }

    red.onclick = function () {
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.remove('active')
        black.classList.remove('active')
        color = 'red'
        red.classList.add('active')    
    }

    green.onclick = function () {
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.remove('active')
        black.classList.remove('active')
        color = 'green'
        green.classList.add('active')
    }
    blue.onclick = function () {
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.remove('active')
        black.classList.remove('active')
        color = 'blue'
        blue.classList.add('active')
    }
    black.onclick = function () {
        red.classList.remove('active')
        green.classList.remove('active')
        blue.classList.remove('active')
        black.classList.remove('active')
        color = 'black'
        black.classList.add('active')
    }
}