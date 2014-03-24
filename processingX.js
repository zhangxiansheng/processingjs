//设定全局变量
//用符号$开头，代表全局变量
var  $canvas;
var  $context;
var  $stroke_style;
var  $fill_style;
var  $line_width=1;
var  $line_cap="butt";
var  $line_join="miter";
var  $rect_mode=6;
var  $ellipse_mode=9;
var  $cur_tightness=0;

const  CLOSE=0;
const  ROUND=1;
const  SQUARE=2;
const  PROJECT=3;
const  MITER=4;
const  BEVEL=5;
const  CORNER=6;
const  CORNERS=7;
const  RADIUS=8;
const  CENTER=9;
const  PI=Math.PI;
const  QUARTER_PI=PI/4;
const  HALF_PI=PI/2;
const  TWO_PI=PI*2;
const  OPEN=10;
const  CHORD=11;
const  PIE=12;



//初始化
//接入canvas的ID名字name
function setup(name)
{
    $canvas=document.getElementById(name);
    $context=$canvas.getContext("2d");
}

//draw fill
function draw_fill()
{
    if ($fill_style)
    {
        $context.fillStyle=$fill_style;
        $context.fill();
    }
}

//draw stroke
function draw_stroke()
{
    if ($stroke_style)
    {
        $context.strokeStyle=$stroke_style;
        $context.lineWidth=$line_width;
        $context.lineJoin=$line_join;
        $context.lineCap=$line_cap;
        $context.stroke();
    }
}

//描边
//stroke(rgb)--
//stroke(rgb, alpha)--
//stroke(stringColor)
//stroke(stringColor,alpha)--
//stroke(gray)
//stroke(gray, alpha)
//stroke(v1, v2, v3)
//stroke(v1, v2, v3, alpha)
function stroke()
{
    if (typeof(arguments[0])=="string")
    {
        $stroke_style=arguments[0];
    }
    else if (arguments.length==1)
    {
        $stroke_style="rgb("+arguments[0]+","+arguments[0]+","+arguments[0]+")";
    }
    else if (arguments.length==2)
    {
        $stroke_style="rgba("+arguments[0]+","+arguments[0]+","+arguments[0]+","+arguments[1]+")";
    }
    else if (arguments.length==3)
    {
        $stroke_style="rgb("+arguments[0]+","+arguments[1]+","+arguments[2]+")";
    }
    else if (arguments.length==4)
    {
        $stroke_style="rgba("+arguments[0]+","+arguments[1]+","+arguments[2]+","+arguments[3]+")";
    }
}

//没有描边
function noStroke()
{
    $stroke_style=null;
}

//线的粗度
function strokeWeight(line_width)
{
    $line_width=line_width;
}

function lineWidth(line_width)
{
    $line_width=line_width;
}

//lineCap("round"|"square"|"butt")
function lineCap(name)
{
	$line_cap=name;
}

function strokeCap(name)
{
	if (typeof(name)=="string")
	{
		name=name.toLowerCase();
	    if (name=="square") {name="butt";}
	    else if (name=="project") {name="square";}
	    $line_cap=name;
	}
	else
	{
		if (name==1) {$line_cap="round";}
		else if (name==2) {$line_cap="butt";}
		else if (name==3) {$line_cap="square";}
	}
}

//lineJoin("bevel"|"round"|"miter")
function lineJoin(name)
{
	$line_join=name;
}

function strokeJoin(name)
{
    if  (name==4) {$line_join="miter";}
	else if (name==5) {$line_join="bevel";}
	else if (name==1) {$line_join="round";}
}

//填充
//fill(rgb)--
//fill(rgb, alpha)--
//fill(stringColor)
//fill(stringColor,alpha)--
//fill(gray)
//fill(gray, alpha)
//fill(v1, v2, v3)
//fill(v1, v2, v3, alpha)
function fill()
{
    if (typeof(arguments[0])=="string")
    {
        $fill_style=arguments[0];
    }
    else if (arguments.length==1)
    {
        $fill_style="rgb("+arguments[0]+","+arguments[0]+","+arguments[0]+")";
    }
    else if (arguments.length==2)
    {
        $fill_style="rgba("+arguments[0]+","+arguments[0]+","+arguments[0]+","+arguments[1]+")";
    }
    else if (arguments.length==3)
    {
        $fill_style="rgb("+arguments[0]+","+arguments[1]+","+arguments[2]+")";
    }
    else if (arguments.length==4)
    {
        $fill_style="rgba("+arguments[0]+","+arguments[1]+","+arguments[2]+","+arguments[3]+")";
    }
}

//没有填充
function noFill()
{
    $fill_style=null;
}

//rectMode
function rectMode(name)
{
    $rect_mode=name;
}

//画正方形
//rect(a, b, c, d)
//rect(a, b, c, d, r)--顺时针逆时针问题
//rect(a, b, c, d, tl, tr, br, bl)--顺势者逆时针问题
function rect(x,y,width,height)
{
     //rectMode
	 if ($rect_mode==CORNERS)
	 {
	     width=width-x;
		 height=height-y;
	 }else if ($rect_mode==RADIUS)
	 {
	     x=x-width;
		 y=y-height;
		 width=width*2;
		 height=height*2;
	 }else if ($rect_mode==CENTER)
	 {
	     x=x-width/2;
		 y=y-width/2;
	 }
	 
	 //draw the rect
	if (arguments.length==4)
	{
		if ($fill_style)
        {
            $context.fillStyle=$fill_style;
            $context.fillRect(x,y,width,height);
        }

        if ($stroke_style)
        {
            $context.strokeStyle=$stroke_style;
            $context.lineWidth=$line_width;
			$context.lineJoin=$line_join;
			$context.lineCap=$line_cap;
            $context.strokeRect(x,y,width,height);
        }
	}
	else if  (arguments.length==5)
	{   
		var radius=arguments[4];
        $context.beginPath();
        $context.moveTo(x,y+radius);
        $context.lineTo(x,y+height-radius);
        $context.arcTo(x,y+height,x+radius,y+height,radius);
        $context.lineTo(x+width-radius,y+height);
        $context.arcTo(x+width,y+height,x+width,y+height-radius,radius);
        $context.lineTo(x+width,y+radius);
        $context.arcTo(x+width,y,x+width-radius,y,radius);
        $context.lineTo(x+radius,y);
        $context.arcTo(x,y,x,y+radius,radius);
        $context.closePath();
		draw_fill();
        draw_stroke();
	}
	else
	{
		var radius1=arguments[4];
		var radius4=arguments[5];
		var radius2=arguments[6];
		var radius3=arguments[7];
        $context.beginPath();
        $context.moveTo(x,y+radius1);
        $context.lineTo(x,y+height-radius2);
        $context.arcTo(x,y+height,x+radius2,y+height,radius2);
        $context.lineTo(x+width-radius3,y+height);
        $context.arcTo(x+width,y+height,x+width,y+height-radius3,radius3);
        $context.lineTo(x+width,y+radius4);
        $context.arcTo(x+width,y,x+width-radius4,y,radius4);
        $context.lineTo(x+radius1,y);
        $context.arcTo(x,y,x,y+radius1,radius1);
        $context.closePath();
		draw_fill();
        draw_stroke();
	}
    
}


//draw a line from (x1,y1) to (x2,y2)
function line(x1,y1,x2,y2)
{
     if ($stroke_style)
        {
            $context.beginPath();
            $context.moveTo(x1,y1);
			$context.lineTo(x2,y2);
			draw_stroke();
        } 
}

//draw ellipse
function ellipse(x, y, a, b)
{
    //ellipse mode
    if ($ellipse_mode==CENTER){
        a=a/2;
        b=b/2;
    }else if ($ellipse_mode==CORNER){
        a=a/2;
        b=b/2;
        x=x+a;
        y=y+b;
    }else if ($ellipse_mode==CORNERS){
        a=(a-x)/2;
        b=(b-y)/2;
        x=x+a;
        y=y+b;
    }
    
    //draw the ellipse
    var step = (a > b) ? 1 / a : 1 / b;
    $context.beginPath();
    $context.moveTo(x + a, y);
    for (var i = 0; i < 2 * Math.PI; i += step)
    {
        $context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    $context.lineTo(x + a, y);
    $context.closePath();
    draw_fill();
    draw_stroke();
};


//arc
//arc(a, b, c, d, start, stop)
//arc(a, b, c, d, start, stop, mode)
function arc(x, y, width, height, start, stop){
    a=width/2;
    b=height/2;
    
    var step = (a > b) ? 1 / a : 1 / b;
    $context.beginPath();
    $context.moveTo(x + a * Math.cos(start), y + b * Math.sin(start))
    for (var i = start; i < stop; i += step)
    {
        $context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    $context.lineTo(x + a * Math.cos(stop), y + b * Math.sin(stop));
    
    if (arguments.length==6)
    {
        $context.lineTo(x,y);
        $context.closePath();
        draw_fill();
        if ($stroke_style){
            arc(x,y,width,height,start,stop,0);
        }
    }else if (arguments[6]==OPEN){
        draw_fill();
        draw_stroke();
        $context.closePath();
    }else if (arguments[6]==CHORD){
        $context.closePath();
        draw_fill();
        draw_stroke();
    }else if (arguments[6]==PIE){
        $context.lineTo(x,y);
        $context.lineTo(x + a * Math.cos(start), y + b * Math.sin(start));
        $context.closePath();
        draw_fill();
        draw_stroke();
    }else if (arguments[6]==0){
        draw_stroke();
    }
}


//point(x,y)
//point(x,y,z)--
function point(x,y)
{
    if ($fill_style)
    {
        $context.fillStyle=$fill_style;
        $context.fillRect(x,y,1,1);
    }
}

//quad(x1, y1, x2, y2, x3, y3, x4, y4)
function quad(x1, y1, x2, y2, x3, y3, x4, y4)
{
    $context.beginPath();
    $context.moveTo(x1,y1);
    $context.lineTo(x2,y2);
    $context.lineTo(x3,y3);
    $context.lineTo(x4,y4);
    $context.closePath();
    draw_fill();
    draw_stroke();
}

//triangle(x1, y1, x2, y2, x3, y3)
function triangle(x1, y1, x2, y2, x3, y3)
{
    $context.beginPath();
    $context.moveTo(x1,y1);
    $context.lineTo(x2,y2);
    $context.lineTo(x3,y3);
    $context.closePath();
    draw_fill();
    draw_stroke();
}

//多段线or多边形
//vertex(x1,y1,x2,y2...xn,yn,CLOSE)
function vertex()
{
    if (arguments.length % 2 == 0)
    {
        $context.beginPath();
        $context.moveTo(arguments[0],arguments[1]);
        for (var i=1;i<arguments.length/2;i++)
            $context.lineTo(arguments[i*2],arguments[i*2+1]);
        draw_fill();
        draw_stroke();
        $context.closePath();
    }else{
        $context.beginPath();
        $context.moveTo(arguments[0],arguments[1]);
        for (var i=1;i<(arguments.length-1)/2;i++)
            $context.lineTo(arguments[i*2],arguments[i*2+1]);
        $context.closePath();
        draw_fill();
        draw_stroke();
    }
}

//三次贝塞尔曲线
//bezier(x1, y1, x2, y2, x3, y3, x4, y4)
//bezier(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)--
function bezier(x1, y1, x2, y2, x3, y3, x4, y4)
{
    $context.beginPath();
    $context.moveTo(x1,y1);
    $context.bezierCurveTo(x2,y2,x3,y3,x4,y4);
    draw_fill();
    draw_stroke();
    $context.closePath();
}

//For this function I will thanks the Processing.js
//curve(x1, y1, x2, y2, x3, y3, x4, y4)
//curve(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)--
function curve()
{
    var b = [];
    if (arguments.length==8)
    {
        var vertArray=[[arguments[0],arguments[1]],[arguments[2],arguments[3]],[arguments[4],arguments[5]],[arguments[6],arguments[7]]];
    }else{
        var vertArray=new Array(arguments[0].length/2);
        for (var i=0; i<arguments[0].length/2;i++)
        {
            vertArray[i]=[arguments[0][i*2],arguments[0][i*2+1]];
        }
    }
    
    var s = 1 - $cur_tightness;
    var cachedVertArray;
    $context.beginPath();
    $context.moveTo(vertArray[1][0], vertArray[1][1]);
    for (var i = 1; i + 2 < vertArray.length; i++) {
        cachedVertArray = vertArray[i];
        b[0] = [cachedVertArray[0], cachedVertArray[1]];
        b[1] = [cachedVertArray[0] + (s * vertArray[i + 1][0] - s * vertArray[i - 1][0]) / 6, cachedVertArray[1] + (s * vertArray[i + 1][1] - s * vertArray[i - 1][1]) / 6];
        b[2] = [vertArray[i + 1][0] + (s * vertArray[i][0] - s * vertArray[i + 2][0]) / 6, vertArray[i + 1][1] + (s * vertArray[i][1] - s * vertArray[i + 2][1]) / 6];
        b[3] = [vertArray[i + 1][0], vertArray[i + 1][1]];
        $context.bezierCurveTo(b[1][0], b[1][1], b[2][0], b[2][1], b[3][0], b[3][1])
    }
    draw_fill();
    draw_stroke();
    $context.closePath();
}

//curveTightness
function curveTightness(t)
{
    $cur_tightness=t;
}

//beginPath()
function beginPath()
{
    $context.beginPath();
    $begin_path=1;
}

//moveTo(x,y)
function moveTo(x,y)
{
    $context.moveTo(x,y);
}

//closePath()
function closePath()
{
    $context.closePath();
}

//drawPath()
function drawPath()
{
    draw_fill();
    draw_stroke();
}

function vertexPath()
{
    if (arguments.length % 2 == 0)
    {
        $context.moveTo(arguments[0],arguments[1]);
        for (var i=1;i<arguments.length/2;i++)
            $context.lineTo(arguments[i*2],arguments[i*2+1]);
    }else{
        $context.moveTo(arguments[0],arguments[1]);
        for (var i=1;i<(arguments.length-1)/2;i++)
            $context.lineTo(arguments[i*2],arguments[i*2+1]);
        $context.lineTo(arguments[0],arguments[1]);
    }
}

function linePath(x1,y1,x2,y2)
{
    $context.moveTo(x1,y1);
    $context.lineTo(x2,y2);
}

//direction
function ellipsePath(x, y, a, b)
{
    //ellipse mode
    if ($ellipse_mode==CENTER){
        a=a/2;
        b=b/2;
    }else if ($ellipse_mode==CORNER){
        a=a/2;
        b=b/2;
        x=x+a;
        y=y+b;
    }else if ($ellipse_mode==CORNERS){
        a=(a-x)/2;
        b=(b-y)/2;
        x=x+a;
        y=y+b;
    }
    
    //draw the ellipse
    //direction
    if (arguments.length==4)
    {
        var step = (a > b) ? 1 / a : 1 / b;
        $context.moveTo(x + a, y);
        for (var i = 0; i < 2 * Math.PI; i += step)
        {
            $context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
        }
        $context.lineTo(x + a, y);
    }
    else
    {
        var step = (a > b) ? 1 / a : 1 / b;
        $context.moveTo(x + a, y);
        for (var i = 0; i < 2 * Math.PI; i += step)
        {
            $context.lineTo(x + a * Math.cos(i), y - b * Math.sin(i));
        }
        $context.lineTo(x + a, y);
    }
}

function arcPath(x, y, width, height, start, stop){
    a=width/2;
    b=height/2;
    
    var step = (a > b) ? 1 / a : 1 / b;
    $context.moveTo(x + a * Math.cos(start), y + b * Math.sin(start))
    for (var i = start; i < stop; i += step)
    {
        $context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    $context.lineTo(x + a * Math.cos(stop), y + b * Math.sin(stop));
    
    if (arguments.length==6)
    {
        $context.lineTo(x,y);
        $context.lineTo(x + a * Math.cos(start), y + b * Math.sin(start))
    }else if (arguments[6]==CHORD){
        $context.lineTo(x + a * Math.cos(start), y + b * Math.sin(start))
    }else if (arguments[6]==PIE){
        $context.lineTo(x,y);
        $context.lineTo(x + a * Math.cos(start), y + b * Math.sin(start));
        $context.lineTo(x + a * Math.cos(start), y + b * Math.sin(start))
    }
}

function quadPath(x1, y1, x2, y2, x3, y3, x4, y4)
{
    $context.moveTo(x1,y1);
    $context.lineTo(x2,y2);
    $context.lineTo(x3,y3);
    $context.lineTo(x4,y4);
}

function trianglePath(x1, y1, x2, y2, x3, y3)
{
    $context.moveTo(x1,y1);
    $context.lineTo(x2,y2);
    $context.lineTo(x3,y3);
}

function bezierPath(x1, y1, x2, y2, x3, y3, x4, y4)
{
    $context.moveTo(x1,y1);
    $context.bezierCurveTo(x2,y2,x3,y3,x4,y4);
}

function rectPath(x,y,width,height)
{
    //rectMode
    if ($rect_mode==CORNERS)
    {
        width=width-x;
        height=height-y;
    }else if ($rect_mode==RADIUS)
    {
        x=x-width;
        y=y-height;
        width=width*2;
        height=height*2;
    }else if ($rect_mode==CENTER)
    {
        x=x-width/2;
        y=y-width/2;
    }
    
    //draw the Rect with Direction
	if (arguments.length==4)
	{
		vertexPath(x,y,x+width,y,x+width,y+height,x,y+height);
	}
	else if  (arguments.length==5)
	{
		vertexPath(x,y,x,y+height,x+width,y+height,x+width,y);
	}
}

function curvePath()
{
    var b = [];
    if (arguments.length==8)
    {
        var vertArray=[[arguments[0],arguments[1]],[arguments[2],arguments[3]],[arguments[4],arguments[5]],[arguments[6],arguments[7]]];
    }else{
        var vertArray=new Array(arguments[0].length/2);
        for (var i=0; i<arguments[0].length/2;i++)
        {
            vertArray[i]=[arguments[0][i*2],arguments[0][i*2+1]];
        }
    }
    
    var s = 1 - $cur_tightness;
    var cachedVertArray;
    $context.moveTo(vertArray[1][0], vertArray[1][1]);
    for (var i = 1; i + 2 < vertArray.length; i++) {
        cachedVertArray = vertArray[i];
        b[0] = [cachedVertArray[0], cachedVertArray[1]];
        b[1] = [cachedVertArray[0] + (s * vertArray[i + 1][0] - s * vertArray[i - 1][0]) / 6, cachedVertArray[1] + (s * vertArray[i + 1][1] - s * vertArray[i - 1][1]) / 6];
        b[2] = [vertArray[i + 1][0] + (s * vertArray[i][0] - s * vertArray[i + 2][0]) / 6, vertArray[i + 1][1] + (s * vertArray[i][1] - s * vertArray[i + 2][1]) / 6];
        b[3] = [vertArray[i + 1][0], vertArray[i + 1][1]];
        $context.bezierCurveTo(b[1][0], b[1][1], b[2][0], b[2][1], b[3][0], b[3][1])
    }
}

