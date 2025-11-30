function show_whatever(el, current_scroll, wh){
    var el_offset_t = el.offset().top;
    //el의 y축 위치(최상단으로 부터 몇px(y축) 떨어져 있는지)추출
    if(current_scroll > el_offset_t - (wh * .66)){
        //현재 스크롤 위치가 el의 위치보다 크면 하위 실행
        el.parent().removeClass("wait_scroll");
        el.remove();
    }
}
var wh, prev_scroll = 1, next_scroll = 0;
function scroll_effect(sc_y){
    next_scroll = sc_y;
    //scroll_effect라는 함수에 (sc_y=현재 스크롤 값)라는 값을 받아와서 실행
    wh =  $(window).height();
    //wh 변수에 창(브라우저) 높이 넣음
    $(".show_trigger").each(function(){
        //show_trigger클래스를 가진 태그들 각각 제어
        show_whatever($(this), sc_y, wh);
        //show_whatever함수에 (각각요소, 현재 스크롤 값, 창 높이)넣어서 실행
    });
    var vsh = $("#visual").height(),
        abh = $("#about").height(),
        skh = $("#skills").height(),
        wrh = $("#works").height(),
        cth = $("#contact").height(),
        $vss = $("#visual > .width_con"),
        fh = abh + skh + wrh + cth;
    if(sc_y > vsh && sc_y < fh + wh){
        var fh_rate = (sc_y - vsh) / fh * 100;
            fh_rate = fh_rate / 100;
        if(fh_rate > 0 && fh_rate < .5){
            $vss.css({ opacity: 1-fh_rate*1.5, filter: "blur("+(fh_rate*50)+"px)", transform: "scale("+(1-fh_rate)+")", transition:"none"});
        }else if(fh_rate >= .5 && fh_rate < .7){
            $vss.css({ opacity: fh_rate, filter: "blur("+(20-(fh_rate*10))+"px)", transform: "scale("+(.02+fh_rate)+")", transition:"none"});
        }else if(fh_rate >= .7){
            $vss.css({ opacity: fh_rate, filter: "blur("+(20-(fh_rate*10))+"px)", transform: "scale("+(.02+fh_rate)+")", transition:"filter 300ms ease-out"});
        }
    }else if(sc_y > vsh){
        $vss.css({ opacity: 1, filter: "blur(0px)", transform: "scale(1)", transition:"all 1000ms ease-in-out"});
    }
    /* infinity scroll-------------------------- */
    var bh = $("body").height();
    if(sc_y <= 0){
        if(prev_scroll > next_scroll){
            $("html,body").stop().animate({ scrollTop: bh - wh - 1}, 0);
        }
    }
    if(sc_y >= bh - wh){
        if(prev_scroll < next_scroll){
            $("html,body").stop().animate({ scrollTop: 1}, 0);
        }
    }
    prev_scroll = next_scroll;
    /* --------------------------infinity scroll */
}
let ticking = false;
//let 으로 선언된 변수는 업데이트는 가능, 재선언 불가
document.addEventListener('scroll', function(e){
    //페이지(문서)내에서 스크롤이되면 이 안쪽 실행
    if (!ticking) {
        window.requestAnimationFrame(function(){
            scroll_effect(window.scrollY);
            //scroll_effect함수에 (현재 스크롤 값)을 넣어서 실행
            ticking = false;
        });
        ticking = true;
    }
});