//element
var cuId = 4;
var exId = 4;
var $item = document.getElementsByClassName('view-item');
var $itemImg = document.getElementsByClassName('imgs');
var max = $item.length;
var isAni = false;
var counter = 0;
var counterArray = [500,259,87,28,1,34,94,282,488];
var _sideMenu = document.getElementById('side-menu'); 
var _sideMenuR = document.getElementById('side-menu-right');
var $btnMenu = document.getElementById('btn-menu');
var $btnClose = document.getElementById('btn-close');
var $btnCloseR = document.getElementById('btn-closeR');
var $toggleBtn = document.getElementById('toggleBtn');
var $innerBtn = document.getElementsByClassName('innerBtn')[0];
var _toggle = true;
var galleryEl = document.getElementById('gallery');
var listEl = galleryEl.getElementsByClassName('list')[0];
var listItemEl = listEl.getElementsByTagName('li');
var listItemAEl = listEl.getElementsByTagName('a');
var circleEl = document.getElementsByClassName('circle');
var containerEl = document.getElementsByClassName('container');
//script : slider
function btnListClick(id){
    listItemAEl[id].addEventListener('click',function(event){
      event.preventDefault();
      //상단 메뉴 클릭시 인터벌 속도보다 빠르게 전환시 멈추는 버그가 있었음.
      if(isAni) 
      return;
      console.log('click',id);
      cuId = id;
      scrolling();

    });
  }
  
  for(var i = 0; i < listItemAEl.length; i++){
    // console.log(listItemAEl.length);
    btnListClick(i);
  }

//script : script
function onClickBtnClose(event){
    event.preventDefault();
    if(isAni) 
        return;

        _sideMenu.classList.remove('open');
        _sideMenuR.classList.remove('open');
}

function onToggle(){
    console.log('onToggle On');
    if(_toggle){
        $innerBtn.classList.remove('click');
        idMatch();
        console.log(cuId,exId);
        scrolling();
        _toggle = false;
        }else{
        $innerBtn.classList.add('click');
        idMatch();
        scrolling();
        _toggle = true;   
    }
}
$toggleBtn.addEventListener('click',onToggle);
$btnClose.addEventListener('click', onClickBtnClose);
$btnCloseR.addEventListener('click', onClickBtnClose);

function idMatch(){
    if(cuId == 8){
        exId = cuId;
        cuId = 0;
    }else if(cuId == 7){
        exId = cuId;
        cuId = 1;
    }else if(cuId == 6){
        exId = cuId;
        cuId = 2;
    }else if(cuId == 5){
        exId = cuId;
        cuId = 3;
    }else if(cuId == 3){
        exId = cuId;
        cuId = 5;
    }else if(cuId == 2){
        exId = cuId;
        cuId = 6;
    }else if(cuId == 1){
        exId = cuId;
        cuId = 7;
    }else if(cuId == 0){
        exId = cuId;
        cuId = 8;
    }
}

//script : wheel
function handle(delta) {
    if(isAni) return;
    if (delta < 0){
        cuId--;
        if(cuId < 0){
            cuId = 0;
        }
    }else{
        cuId++;
        if(cuId >= max){
            cuId = max - 1;
        }
    }
    scrolling();
}
//scrolling 함수 재사용.
function scrolling(){
    // 슬라이드 <<<
    if(cuId > exId){
        if(!isAni){
            isAni = true;
            var $cuItem = $item[cuId];
            var $exItem = $item[exId];

            $exItem.style.transform = 'translateX(-100%)'
            $exItem.style.transition = 'transform 400ms ease-in-out';
            $cuItem.style.transform = 'translateX(0)';
            $cuItem.style.transition = 'transform 400ms ease-in-out';
            circleEl[exId].classList.remove('selected');
            circleEl[cuId].classList.add('selected');
            $itemImg[exId].classList.remove('filterEffect');
            $itemImg[cuId].classList.add('filterEffect');
            containerEl[exId].classList.remove('filter');
            containerEl[cuId].classList.add('filter');

            // 4(main)를 기준으로 작거나 같다면 함수가 스위칭이 되도록 함
            if(cuId <= 4){
                getCount2(counterArray[cuId]);
            }else{
                getCount(counterArray[cuId]);
            }

            if(cuId == max -1){
                _sideMenuR.classList.add('open');
               
            }else if(cuId >= 1){
                _sideMenu.classList.remove('open');
            }

            setTimeout(function(){
                isAni = false;
            }, 1500);
        }


        console.log("cuId > exId : cuId :",cuId);
        console.log("cuId > exId : exId :",exId);
        exId = cuId;
        

    }
    //슬라이드 >>>
    if(cuId < exId){
        if(!isAni){
            isAni = true;
            var $cuItem = $item[cuId];
            var $exItem = $item[exId];
            $cuItem.style.transition = 'transform 400ms ease-in-out';
            $cuItem.style.transform = "translate(0)"
            $exItem.style.transition = 'transform 400ms ease-in-out';
            $exItem.style.transform = 'translateX(100%)';
            circleEl[exId].classList.remove('selected');
            circleEl[cuId].classList.add('selected');
            $itemImg[exId].classList.remove('filterEffect');
            $itemImg[cuId].classList.add('filterEffect');
            containerEl[exId].classList.remove('filter');
            containerEl[cuId].classList.add('filter');

            // 4(main)를 기준으로 작거나 같다면 함수가 스위칭이 되도록 함 
            if(cuId < 4){
                getCount(counterArray[cuId]);
            }else{
                getCount2(counterArray[cuId]);
            }


            if(cuId == 0){
                _sideMenu.classList.add('open');
            }else if(cuId <= max - 2){
                _sideMenuR.classList.remove('open');
            }

            setTimeout(function(){
                isAni = false;
            }, 1500);
        }

        console.log("cuId < exId : cuId :",cuId);
        console.log("cuId < exId : exId :",exId);
        exId = cuId;

    }
    
}
// wheel reference script
function wheel(event){
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
    delta = event.wheelDelta/120;
    if (window.opera) delta = -delta;
    } else if (event.detail) delta = -event.detail/3;
    if (delta) handle(delta);
    }

if (window.addEventListener)
window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

//count
var $count = document.getElementById('count');

function getCount(number){
    var i = setInterval(function() {
      if ( counter == number ) {
        clearInterval(i);
      } else {
        counter += 1;
       $count.innerHTML = "["+counter+"]"; 
      }
    }, 1 );
  };

  function getCount2(number){
    var i = setInterval(function() {
      if ( counter == number ) {
        clearInterval(i);
      } else{
        counter -= 1;
       $count.innerHTML = "["+counter+"]"; 
      }
    }, 1 );
  };
//(mainpage)에 등장할 기본 count값.
  getCount(1);

  