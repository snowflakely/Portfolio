history.scrollRestoration = "manual";
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
                $("#loading_cover").find(".loading_icon").addClass("stop");
                setTimeout(function(){
                    $("#loading_cover").fadeOut(1000, function(){
                        $(this).remove();
                    });
                    $("body").css({overflow: "visible"});
                    $("html").removeClass("loading");
                    $("body").removeClass("not_yet");
                    $("html,body").stop().animate({ scrollTop: 1}, 0);
                }, 1500);
            }, 300);
        }
    });
});

var resize_timer;
var now_w = $(window).width();
var after_w = $(window).width();
var w_val = true;
var section_count = 5;
function resize(){
    after_w = $(window).width();
    if(now_w != after_w || w_val){
        w_val = false;
        clearTimeout(resize_timer);
        resize_timer = setTimeout(function(){
            var total_arr = 0;
            for (i = 0; i < section_count; i++){
                total_arr += $(".wrap > .sections").eq(i).height()-50;
                arr[i] = total_arr;
            }
        }, 750);
    }
    now_w = after_w;
}
var arr = new Array();
var reset_moving;
var before_position = 0;
function nav_slider(){
    var this_position = $("ul.nav_lnb li.selected").position().left + ($("ul.nav_lnb li.selected").outerWidth() / 2) - 3;
    if(before_position != this_position){
        $("ul.nav_lnb li.nav_slider").addClass("moving").stop().animate({left:this_position}, 1000, "easeOutQuart");
        clearTimeout(reset_moving);
        reset_moving = setTimeout(function(){
            $("ul.nav_lnb li.nav_slider").removeClass("moving");
        }, 250);
        before_position = this_position;
    }
}
$(function(){
    resize();
    $(window).scroll(function(){
        SE = $(document).scrollTop();
        for(i = arr.length; i > 0; i--){
            if(SE < arr[0]){
                if(!$("ul.nav_lnb li").eq(0).hasClass("selected")){
                    $("ul.nav_lnb li").removeClass("selected");
                    $("ul.nav_lnb li").eq(0).addClass("selected");
                    nav_slider();
                }
                break;
            }else if(SE > arr[i]){
                if(!$("ul.nav_lnb li").eq(i).hasClass("selected")){
                    $("ul.nav_lnb li").removeClass("selected");
                    $("ul.nav_lnb li").eq(i).addClass("selected");
                    nav_slider();
                }
                break;
            }
        }
    });
    var website_list = [
        ["kfc","web design","KFC","-","2024","Adobe Photoshop","Web Design, Graphic Design,<br>Front-End Development","","1"],
        ["wukong","web design","Black Myth: Wukong","-","2024","Adobe Photoshop","Web Design, Graphic Design,<br>Front-End Development","","1"],
        ["kilian","web design","Kilian","-","2024","Adobe Photoshop","Web Design, Graphic Design,<br>Front-End Development","","13"],
    ]
    var portfolio_list = [
        ["순서번호","구분","제목","고객","완료시기","도구","범위","링크","이미지갯수"],
        //["1","charcter design","saesik","-","2024","Adobe Photoshop","Graphic Design, Artwork,<br>Emoticon","","1"],
        ["2","logo design","tenz","Tenz","2023","Adobe Photoshop,<br>Adobe Illustrator","Graphic Design, Artwork,<br>Logo Design","","3"],
        ["3","logo design","hoinz","Hoinz","2024","Adobe Photoshop,<br>Adobe Illustrator","Graphic Design, Artwork,<br>Logo Design","","2"],
        ["4","logo design","jina_edu","Jina Edu","2024","Adobe Photoshop,<br>Adobe Illustrator","Graphic Design, Artwork,<br>Logo Design","","2"],
        ["5","logo design","yuki","Yuki","2024","Adobe Photoshop,<br>Adobe Illustrator","Graphic Design, Artwork,<br>Logo Design","","2"],
        ["6","logo design","youthming","Youthming","2024","Adobe Photoshop,<br>Adobe Illustrator","Graphic Design, Artwork,<br>Logo Design","","2"],
        ["7","logo design","rave","Rave Hair","2024","Adobe Photoshop,<br>Adobe Illustrator","Graphic Design, Artwork,<br>Logo Design","","3"],
        ["8","logo design","naeun","Naeun Beauty","2024","Adobe Photoshop,<br>Adobe Illustrator","Graphic Design, Artwork,<br>Logo Design","","2"],
        ["9","banner design","krush","-","2024","Adobe Photoshop","Graphic Design, Artwork,<br>Poster Design","","1"],
        ["10","banner design","cherry_blossom","-","2024","Adobe Photoshop","Graphic Design, Artwork,<br>Poster Design","","1"],
        ["11","banner design","vigilante","-","2024","Adobe Photoshop","Graphic Design, Artwork,<br>Poster Design","","1"],
        ["12","art work","montblanc","-","2024","Adobe Photoshop","Graphic Design, Artwork","","1"],
        ["13","card news design","kurzgesagt","-","2024","Adobe Photoshop,<br>Adobe Illustrator","Graphic Design, Artwork","","6"],
        ["14","poster design","wonka","-","2024","Adobe Photoshop","Graphic Design, Artwork,<br>Poster Design","","5"],
        ["15","web design","saintlaurent","-","2024","Adobe Photoshop","Graphic Design, Artwork","","1"],
        ["16","web design","hmall","-","2024","Adobe Photoshop","Graphic Design, Artwork","","3"],
        ["17","web design","granhand","-","2024","Adobe Photoshop","Graphic Design, Artwork","","1"],
        ["18","web design","29cm","-","2024","Adobe Photoshop","Graphic Design, Artwork","","1"],
        ["19","web design","jinderberg","-","2024","Adobe Photoshop","Graphic Design, Artwork","","1"]
    ];
    var gallery_list = "";
    for(i=portfolio_list.length-1; i>0; i--){
        gallery_name = portfolio_list[i][2].replace(/_/g," ");
        gallery_img = portfolio_list[i][2];
        gallery_cactegory = portfolio_list[i][1];
        gallery_num = portfolio_list[i][0];
        gallery_list += "<li class='cells open_popup hover_event'data-p-no="+gallery_num+"><a href='javascript:;'><div class='box_img'><img src='img/gallery_"+gallery_img+".webp'><div class='text_con'><h4 class='little'>"+gallery_name+"<span>"+gallery_cactegory+"</span></h4></div><div class='loading_snow little'></div></div></a></li>";
    }
    $("#gallery_list").html(gallery_list);
    
    $(".open_popup").each(function(){
        $(this).click(function(){
            $(this).addClass("loading");
            var p_no = $(this).attr("data-p-no");
            var $p_con = $(".popup_con");
            $p_con.find(".category").html(portfolio_list[p_no][1]);
            $p_con.find(".title").html(portfolio_list[p_no][2].replace(/_/g," "));
            $p_con.find(".client").html(portfolio_list[p_no][3]);
            $p_con.find(".completed").html(portfolio_list[p_no][4]);
            $p_con.find(".tools").html(portfolio_list[p_no][5]);
            $p_con.find(".scope").html(portfolio_list[p_no][6]);
            var p_image_list = "";
            for(i=1; i<=portfolio_list[p_no][8]; i++){
                p_image_list += "<img class='glass' src='portfolio/gallery/"+p_no+"/"+i+".jpg'>";
            }
            $p_con.find(".image_con").html(p_image_list);
            setTimeout(function(){
                $("html").addClass("show_popup");
                $(".popup_con").scrollTop(0);
                $(".open_popup").removeClass("loading");
            }, 500);
        });
    });
    $(".open_popup_web").each(function(){
        $(this).click(function(){
            $(this).addClass("loading");
            var web_no = $(this).parents(".web_list > li").index()-1,
                $p_con = $(".popup_con");
            $p_con.find(".category").html(website_list[web_no][1]);
            $p_con.find(".title").html(website_list[web_no][2]);
            $p_con.find(".client").html(website_list[web_no][3]);
            $p_con.find(".completed").html(website_list[web_no][4]);
            $p_con.find(".tools").html(website_list[web_no][5]);
            $p_con.find(".scope").html(website_list[web_no][6]);
            var w_image_list = "";
            for(i=1; i<=website_list[web_no][8]; i++){
                w_image_list += "<img class='glass' src='img/works_"+website_list[web_no][0]+"_"+i+"_web_img.jpg'>";
            }
            $p_con.find(".image_con").html(w_image_list);
            $p_con.find("ul.v_con.ub_two_con > li:first-child").append("<a href='portfolio/"+website_list[web_no][0]+"' target='_blank'><i class='fa-light fa-arrow-up-right-from-square'></i><h4>Website</h4></a>")
            setTimeout(function(){
                $("html").addClass("show_popup");
                $(".popup_con").scrollTop(0);
                $(".open_popup_web").removeClass("loading");
            }, 500);
        });
    });
    $(document).keydown(function(e){
        if(e.keyCode == 27){//27 => ESC 키코드값
            $("html").removeClass("show_popup");
        }
    });
    $(".popup_con , a.btn.btn_popup_close").click(function(e){
        if(!$(e.target).hasClass("cells") && $(e.target).parents(".cells").length < 1){
            $("html").removeClass("show_popup");
            $(".popup_con").find("ul.v_con.ub_two_con > li:first-child").find("a").remove();
        }
    });
    var x_rate = 100;
    var y_rate = 100;
    $(".hover_event").each(function(){
        var $this = $(this);
        $this.hover(function(){
            $this.mousemove(function(event){
                var x = event.pageX - $this.offset().left - $this.width()/2,
                    y = event.pageY - $this.offset().top - $this.height()/2;
                    $this.css({transform:"perspective(2000px) rotateX("+(y/y_rate)+"deg) rotateY("+(x/-x_rate)+"deg) translate("+(x/x_rate)+"px, "+(y/y_rate)+"px)", transition:"none"});
                    $this.find(".little").css({transform:"perspective(2000px) translate("+(x/x_rate*-1)+"px, "+(y/y_rate*-1)+"px)", transition:"none"});
            });
        },function(){
            $(".hover_event").css({transform:"perspective(2000px) rotateX(0deg) rotateY(0deg) translate(0px, 0px)", transition:"all 500ms ease-in-out"});
            $(".little").css({transform:"perspective(3000px) translate(0px, 0px)", transition:"all 500ms ease-in-out"});
        });
    });
    $(document).on('click', 'a[href^="#"]', function (event){
        event.preventDefault();
        $("html,body").stop().animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000,'easeInOutCubic');
    });
});
$(window).load(function(){
    var vsh = $("#visual").height();
    $(".wrap").css({paddingBottom:vsh});
});
