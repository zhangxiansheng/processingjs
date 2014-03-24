var  $canvas;
var  $context;
var  $stroke_style;
var  $fill_style;
var  $line_width=1;
var  $line_cap="butt";
var  $line_join="miter";
var  $rect_mode=6;
var  $ellipse_mode=9;
var  $curTightness=0;

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

function setup(name)
function draw_fill()
function draw_stroke()
function stroke()
function noStroke()
function strokeWeight(line_width)
function lineWidth(line_width)
function lineCap(name)
function strokeCap(name)
function lineJoin(name)
function strokeJoin(name)
function fill()
function noFill()
function rectMode(name)
function rect(x,y,width,height)
function line(x1,y1,x2,y2)
function ellipse(x, y, a, b)
function arc(x, y, width, height, start, stop)
function point(x,y)
function quad(x1, y1, x2, y2, x3, y3, x4, y4)
function triangle(x1, y1, x2, y2, x3, y3)
function vertex()
function bezier(x1, y1, x2, y2, x3, y3, x4, y4)
function curve(x1, y1, x2, y2, x3, y3, x4, y4)

function beginPath()
function moveTo()
function closePath()
function rectPath(x,y,width,height)
function linePath(x1,y1,x2,y2)
function ellipsePath(x, y, a, b)
function arcPath(x, y, width, height, start, stop)
function quadPath(x1, y1, x2, y2, x3, y3, x4, y4)
function trianglePath(x1, y1, x2, y2, x3, y3)
function vertexPath()
function bezierPath(x1, y1, x2, y2, x3, y3, x4, y4)
function curvePath(x1, y1, x2, y2, x3, y3, x4, y4)



