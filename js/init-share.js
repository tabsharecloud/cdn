document.body.innerHTML+=
"<div id=container class=autowidth>"+
"<div id='iMeta'><input autofocus=true type=text id=search class=search placeholder='Search'>"+
"<dl class=list></dl></div><div id='xMeta'>"+
"<div class=backfloat style='float:left'><h1>"+
"<a class='text-arrow' href=#index target=_self ><<</a><h1></div>"+
"<dl class=list></dl></div><div id='xMarks'><ol class=list></ol></div>"+
"</div>";

hide="{opacity:0;animation-name:fadeOutOpacity;"+
"animation-iteration-count:1;animation-timing-function:ease-out;animation-duration:.6s;display:none}";

show="{display:'';opacity:1; animation-name:fadeInOpacity;"+
"animation-iteration-count:1;animation-timing-function:ease-in; animation-duration:.5s;}";

indexView="::-moz-placeholder {color: inherit} #saber{display:none}#xMeta,#xMarks"+hide+"#iMeta"+show;
recordView="#iMeta,#saber"+hide+"#xMeta,#xMarks"+show;

initView="#saber{display:''}#iMeta,#xMeta,#xMarks{display:none}";
var xView=document.createElement('style');
document.body.appendChild(xView);
xView.innerHTML=initView;

var yView=document.createElement('style');
document.body.appendChild(yView);
yView.innerHTML=".stamp{width:80px}"+
"#iMeta .time{display:none}";

function showTime(){yView.innerHTML=
	"#iMeta .time{display:inline-block} .stamp{width:130px}"}

function loadScript(url){
  var script=document.createElement("script");
  document.body.appendChild(script);  script.src=url;
};

var iMetaOptions = {
  valueNames: ['title', 'keywords', 'date', 'time', 'tags',
  { attr: 'href', name: 'record' }, ],
  item: "<dt class=row><a target=_self class='col card record'>"+
"<span class='col stamp'><span class=date></span><span class=time>"+
"</span></span><span class='col title'></span>"+
"<span class='col taggle'><span class=tags></span></span>"+
"<span class='col keys'><span class=keywords></span></span></a></dt>",
};var iMeta = new List('iMeta', iMetaOptions);

var xMetaOptions = {
  valueNames: ['keywords', 'date', 'time', 'tags',],
  item: "<dt><h2 class=keywords></h2><span class=tags></span>"+
  "<span class=date></span><span class=time></span></dt>"
};var xMeta = new List('xMeta', xMetaOptions);

var xMarkOptions = {
  valueNames: ['title', {attr:'href', name:'link'},],
  item: "<li><a class='link record'><span class='title'></span></a></li>"
};var xMarks = new List('xMarks', xMarkOptions);

function $id(id){return document.getElementById(id)};
function wait(){ xView.innerHTML=initView}
function showRecord(){xView.innerHTML=recordView};

function showIndex(){
  xView.innerHTML=indexView;
  xMeta.clear();xMarks.clear();
};

function loadContent(hash=location.hash){
  if(hash.indexOf('tabshare')>0){loadRecord();}
  else{showIndex()}
}

function renderView(){
  a=location.href; hash=a.slice(a.indexOf('#'));
  if(hash.indexOf('index')>0){showIndex()};
  if(hash.indexOf('tabshare')>0){showRecord();window.scrollTo(0, 0);}
  else{showIndex();iMeta.search('2018');$id('search').focus();}
}

function passContent(items,list){
  if(list=='imeta'){iMeta.add(items,renderView)}
  if(list=='xmeta'){xMeta.add(items)}
  if(list=='xmarks'){xMarks.add(items,renderView)}
}

//  https://www.willpeavy.com/minifier/
