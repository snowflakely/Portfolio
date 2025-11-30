var max_delay_time = 2000,
    is_stop;
$(window).load(function(){
    setTimeout(function(){
        is_stop = true; 
    }, max_delay_time);
});
$(function(){
    loading = setInterval(function(){
        if(is_stop){
            clearInterval(loading);
            setTimeout(function(){
                setTimeout(function(){
                    $("#loading_cover").fadeOut(1000, function(){
                        $(this).remove();
                    });
                    $("html,body").stop().animate({ scrollTop: 0}, 0);
                    $("html").removeClass("loading");
                    setTimeout(function(){
                        $("body").removeClass("not_yet");
                    }, 2100);
                }, 500);
            }, 300);
            $("body > .wrap").css({overflow: "visible", opacity:1});
        }
    });
});
