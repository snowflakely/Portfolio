function show_whatever(el, current_scroll, wh){ 
    var el_offset_t = el.offset().top;
    //el의 y축 위치(최상단으로 부터 몇px(y축) 떨어져 있는지)추출
    if(current_scroll > el_offset_t - (wh * .66)){
        //현재 스크롤 위치가 el의 위치보다 크면 하위 실행
        el.parent().removeClass("wait_scroll");
        el.remove();
    }
}
var wh,sc_y,
    $key_features,
    $key_features_t,
    $key_features_h,
    video_no = 0;
var v_list = [
    ['5pL3joRyeGY','71','12','Staff Stances','There are three Staff Stances in Black Myth: Wukong.<br>They are Smash Stance, Pillar Stance and Thrust Stance.<br>Each of the stances have their own skill tree that costs Sparks to upgrade and enhances the stance.<br>There is also a Talent tree that can enhance other aspects of the combat.'],
    ['mnZSEsUAX2g','1','290','Mysticism','Train and master a variety of Taoist arts<br>Unleashed magic and extreme knowledge will take your abilities to infinite levels.<br>Taoist arts have long been a fixture in Chinese mythological battles. Master these opposing yet complementary forces.'],
    ['bzyMLoSwYvk','159','18','Transformations','The Transformation spells are spells that transform the Destined One into a different guai, gaining their properties and abilities.']
];
var $video_info, video_fade_time = 500, video_interval;
function video_change(n){
    var yt_video_url = v_list[n][0];
    var yt_video_start = v_list[n][1];
    var yt_video_repeat_duration = v_list[n][2];
    $video_info.find("h3").html(v_list[n][3]);
    $video_info.find("h5").html(v_list[n][4]);
    var yt_video_src = "https://www.youtube.com/embed/"+yt_video_url+"?start="+yt_video_start+"&autoplay=1&mute=1";
    $("#iframe_box").html("<iframe src='"+yt_video_src+"'/>");
    setTimeout(function(){
        $("#iframe_box").fadeIn(video_fade_time);
    }, 50);
    clearInterval(video_interval);
    video_interval = setInterval(function(){
        $("#iframe_box").fadeOut(video_fade_time, function(){
            $("#iframe_box").html("<iframe src='"+yt_video_src+"'/>");
            setTimeout(function(){
                $("#iframe_box").fadeIn(video_fade_time);
            }, video_fade_time);
        });
    }, yt_video_repeat_duration*1000);
}
function video_remove(){
    clearInterval(video_interval);
    $("#iframe_box").fadeOut(video_fade_time, function(){
        $("#iframe_box").html("");
    });
}
function scroll_effect(sc_y){
    if(sc_y > 0){
        $("#header").addClass("scrolled");
    }else{
        $("#header").removeClass("scrolled");
    }
    //scroll_effect라는 함수에 (sc_y=현재 스크롤 값)라는 값을 받아와서 실행
    wh =  $(window).height();
    $(".show_trigger").each(function(){
        //show_trigger클래스를 가진 태그들 각각 제어
        show_whatever($(this), sc_y, wh);
        //show_whatever함수에 (각각요소, 현재 스크롤 값, 창 높이)넣어서 실행
    });
    if($key_features_t - ($key_features_h / 7.5) < sc_y && $key_features_t + $key_features_h > sc_y){
        if(!$key_features.hasClass("activated")){
            video_change(video_no);
        }
        $key_features.addClass("activated");
    }else{
        $key_features.removeClass("activated");
        video_remove();
    }
}
function footer_h(){
    var footer_h = $("#footer").height();
    $(".spacer").css({paddingBottom:footer_h});
}
var delay_time;
function key_resize(t){
    clearTimeout(delay_time);
    delay_time = setTimeout(function(){
        $key_features = $("#key_features");
        $key_features_t = $key_features.offset().top,
        $key_features_h = $key_features.height();
    }, t);
}
var resize_delay;
$(window).resize(function(){
    key_resize(500);
    footer_h();
    clearTimeout(resize_delay);
    resize_delay = setTimeout(function(){
        $("body").removeClass("open_nav");
        $(".tab_menu").each(function(){
            move_slider($(this).children("ul.tab_btn").children("li.selected"));
        });

    }, 500);
});
$(window).load(function(){
    key_resize(0);
    footer_h();
});
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
$(function(){
    resize(0);
    /*video_control*/
    var $video_tab_btn = $("#key_features.sections.section_03 > .width_con > .tab_con > ul.video_tab > li.btn_vdtb");
    $video_info = $("#key_features.sections.section_03 > .width_con > .video > .text_con");
    $video_tab_btn.each(function(){
        $(this).click(function(){
            $video_tab_btn.removeClass("selected");
            $(this).addClass("selected");
            var $this_index = $(this).index();
            video_no = $this_index;
            video_change(video_no);
        });
    });
    
});