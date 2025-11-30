/*Add {opacity:0; overflow: hidden;} style to body element.*/
var max_delay_time = 2000,
    loading_bg_color = "transparent",
    loading_style = "position: fixed; top: 0; left: 0; width: 100%; overflow: hidden; height: 100%; background: "+loading_bg_color+"; z-index: 9999;",

    progress_bar_container_bg_color = "transparent",
    progress_bar_container_width = "350px",
    progress_bar_container_height = "20px",
    progress_bar_container_style = "position: absolute; top: 50%; left: 50%; margin: -150px 0 0 20px; width: "+progress_bar_container_width+"; height: "+progress_bar_container_height+"; background: "+progress_bar_container_bg_color+"; transform: translate(-50%, -50%); overflow: hidden; clip-path: polygon(0 50%, 8px 0%, calc(100% - 8px) 0%, 100% 50%, calc(100% - 8px) 100%, 8px 100%); display: none;",

    progress_bar_color = "#fff",
    progress_bar_style = "position: absolute; top: 0; left: 0; width: 0%; height: 100%; background: "+progress_bar_color+";",

    progress_font = "Edwardian Script ITC",
    progress_font_size = "11em",
    progress_font_color = "#fff",
    progress_font_style = "position: absolute; top: 50%; left: 50%; margin: 7px 0 0 -4px; width: 100vw; transform: translate(-50%, -50%); font-family: \""+progress_font+"\"; font-size: "+progress_font_size+"; color: "+progress_font_color+"; text-align: center;",
    
    progress_update,
    is_stop = false;
function counter(a, b, c){
    a.each(function () {
        $(this).prop('Counter', b).stop().animate({
            Counter: c
        }, {
            duration: 500,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now)+"%");
            }
        });
    });
}
var tile_count = 400;
var not_same_count = new Array();
for(i=0; i<tile_count; i++){
    not_same_count.push(i);
}
function sortShuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}
sortShuffle(not_same_count);
$(function(){
    $("body").append("<div class='loading_cover' style='"+loading_style+"'><div class='tiles' style='position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(45deg); width: 150%; aspect-ratio: 1/1;'></div><div class='progress_bar_container' style='"+progress_bar_container_style+"'><div class='progress_bar' style='"+progress_bar_style+"'></div></div><div class='progress_text' style='"+progress_font_style+"'>Kilian</div></div>").animate({opacity:1}, 250);
    var tiles = "";
    for(i=0;i<tile_count;i++){
        tiles += "<div style='position:relative; display: inline-block; width: 5%; aspect-ratio: 1/1; background: rgba(0, 0, 0, .65); opacity: 1; transition: all 750ms ease-out; -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px);'><div style='position: absolute; top: 50%; left: 50%; width: 50%; transform: translate(-50%, -50%); aspect-ratio: 1/1; box-shadow: -6px -6px 24px 0 rgba(0, 0, 0, .5), 6px 6px 24px 0 rgba(255, 255, 255, .15); -webkit-mix-blend-mode: overlay; mix-blend-mode: overlay;'></div></div>";//타일 형태
    }
    $(".loading_cover .tiles").append(tiles);
    var progress_percent = 0;
    setTimeout(function(){
        progress_update = setInterval(function(){
            if(is_stop){
                $(".loading_cover .tiles > div").each(function(i){
                    setTimeout(function(){
                        $(".loading_cover .tiles > div").eq(not_same_count[i]).css({background: "rgba(255, 255, 255, 0)", transform: "scale(0)", opacity: "0"});
                        if(i == tile_count - 1){
                            $(".loading_cover").fadeOut(1500, function(){
                                $(this).remove();
                            });
                        }
                    }, 2 * i);
                    setTimeout(function(){
                        $("body").css({overflow: "visible"});
                        $("html").removeClass("loading");
                        setTimeout(function(){
                            $("body").removeClass("not_yet");
                        }, 2400);
                    }, 500);
                });
            }else{
                const random_number = Math.floor(Math.random() * 3);
                $(".progress_bar").stop().animate({width: progress_percent + "%"}, 50);
                progress_percent += random_number;
            }
        }, 100);
    }, 250);
});
$(window).load(function(){
    setTimeout(function(){
        is_stop = true; 
    }, max_delay_time);
});