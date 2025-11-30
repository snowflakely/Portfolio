function show_whatever(el, current_scroll, wh){
    var el_offset_t = el.offset().top;
    if(current_scroll > el_offset_t - (wh * .66)){
        el.parent().removeClass("wait_scroll");
        el.remove();
    }
}
var wh;
function scroll_effect(sc_y){
    if(sc_y > 0){
        $("#header").addClass("scrolled");
    }else{
        $("#header").removeClass("scrolled");
    }

    wh =  $(window).height();
    var $menus_top = $("#menus").offset().top,
        $pannel_img = $(".pannel img");
    if($menus_top < sc_y && $menus_top + $("#menus").height() > sc_y){
        var menu_scroll_rate= parseInt(((sc_y - $menus_top) / $("#menus").height()) * 100),
            result_rate = parseInt(menu_scroll_rate / 1.65);
        $pannel_img.css({opacity: 0});
        if(result_rate > 36){
            $pannel_img.eq(36).css({opacity: 1});
        }else{
            $pannel_img.eq(result_rate).css({opacity: 1});
        }
    }
    $(".show_trigger").each(function(){
        show_whatever($(this), sc_y, wh);
    });
}
let ticking = false;
document.addEventListener('scroll', function(e){
    if (!ticking) {
        window.requestAnimationFrame(function(){
            scroll_effect(window.scrollY);
            ticking = false;
        });
        ticking = true;
    }
});