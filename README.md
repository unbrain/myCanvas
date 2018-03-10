# 在线画板的制作

并不需要过多的 JS 基础就可以实现，尽管代码看起来很不尽人意但是能够完成需要的功能使用者并不关心你的实现方式。[预览](https://unbrain.github.io/myCanvas/)

- [Google](www.google.com)
- [Canvas MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
- [iconfont](http://www.iconfont.cn/) (获取需要的图标)

### 模拟方式

我们最开始的是检测用户的行为，是否按下鼠标左键，当用户按着左键开始移动的时候就开始划线，当用户松开左键那么就不划线，所以需要一个变量来表示是否按下鼠标。并且监听点的点的位置。

```javascript
var canvas = document.getElementById('canvas')//获取画板位置
var ctx = canvas.getContext('2d')
var using = false
canvas.onmouseclick = function (e){
  var x = e.clientX
  var y = e.clientY
  //oldpoint
  using = true
  //draw circle()
}
canvas.onmousemove = function (e){
  var x = e.clientX
  var y = e.clientY
  //newpoint
  if(using){
    //draw circle()
    //draw line()
    //oldpoint = newpoint
  }else{
    
  }
}
canvas.onmouseup = function (){
  using = false
}
```

### 划线

划线是画板最基本的功能，我们可以通过 [Canvas MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API) 很快的找到我们需要的 `API` 。但是我们会发现光画点的时候若快速移动就会有地方断开这是 js 并不会高速检测用户行为对于高速的我可以将其两点连线。这就需要我们记录旧的点和新的点，并且要及时更新点。封装一下，可以方便以后改变其颜色与粗细。

- 划线

```javascript
function drawLine(x1, y1, x2, y2, color, radius) {
    ctx.beginPath();
    ctx.strokeStyle = color
    ctx.moveTo(x1, y1) // 起点
    ctx.lineWidth = 2 * radius
    ctx.lineTo(x2, y2) // 终点
    ctx.stroke()
    ctx.closePath()
}
```

- 画圆

```
function drawCircle(x, y, r, color) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x, y, r, 0, 360)
    ctx.fill()
}
```

### 橡皮擦

对于橡皮擦这个功能我用的[`clearRect(x, y, width, height)`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect)来实现的，但是使用的效果只能在慢速下，快速依然会断断续续，个人的另一个思路就是用画与背景色相同颜色的线来解决该问题。同时我们需要一个值来记录是用橡皮还是画笔。判断在鼠标移动时是应该画画还是擦除。给出两个图标来给用户选择是 paint 还是  clear。

### 颜色与粗细

个人就做的比较粗略，用了两组 list，并且使用 `fixed` 定位。点击加入 active，代码就比较恶心了。要是这个变得比较好看就需要花更多的功夫来调试我们的 css 了。我只是完成了小部分功能还有很多可以改进的地方。

### 清屏

加入一个图标，其实清屏就是把整个屏幕都覆盖掉。

```javascript
    clear.onclick = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
```

 

### 保存

用 Google 搜索 [js canvas save image as image](https://www.google.com/search?q=js+canvas+save+as+image)

可以在 [stackoverflow](https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl) 看到

```javascript
    download.onclick = function () {
        var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  
        // here is the most important part because if you dont replace you will get a DOM 18 exception.
        window.location.href = image;
    }
```

### 移动端兼容

为了防止页面缩放

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

鼠标兼容，检测是否 `onmousetouch` 是否为 `undefined`

```javascript
if(ontouch !== undefined){
  //canvas.ontouchstart()
}else{
  //canvs.onmouseve()
}
```

触点兼容，手机由于是多点触控，触点就单独封装为一个数组，我们只需要`console.log(e)` 就可以发现在 touchs 数组下就有 `clientX` 与 `clientY`

### 总结

画板的制作可以说是对 canvas 的使用的一种熟悉，同时可应用一些简单的 js。是很不错的上手简单项目，但是想要更好的使用体验还是需要自己不断的学习。