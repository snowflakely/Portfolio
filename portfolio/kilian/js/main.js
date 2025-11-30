function remove_hide(i){
    $(".fullsection.full"+i).removeClass("hide");
}
var change_speed = 750;
var release_times, times;
// 사이드 퀵버튼 클릭 이동
function moving_sections(gnbindex,length){ //화면전환 중에 다른 화면 전환 불가
    $(".quick").animate({marginTop: $(".quick").height()/2 - ($(".quick > ul > li").outerHeight(true) * gnbindex)}, change_speed);
    $(".quick > ul > li").removeClass("on").eq(gnbindex).addClass("on");
    $("ul.nav li").removeClass("on").eq(gnbindex).addClass("on");

    $("#fullpage").stop().animate({"top": -length + "px"}, change_speed, "easeInOutQuint");
    $(".pagination b").text(gnbindex+1);
    remove_hide(gnbindex+1);
}
function quickClick(){
    $(".quick > ul > li, ul.nav li").click(function(){
        var gnbindex = $(this).index();
        var length = 0;
        for(var i=1; i<(gnbindex+1); i++){
            length+=$(".full"+i).height();
        }
        //if($("body").find("#fullpage:animated").length >= 1) return false;
        if(gnbindex != 0){
            // $("#header").removeClass("on_top");
        }else{
            // $("#header").addClass("on_top");
        }
        moving_sections(gnbindex,length);
        return false;
    });
}
function fullset(){
    var pageindex = $("#fullpage > .fullsection").length; //fullpage 안에 섹션이(.fullsection) 몇개인지 확인하기
    $(".pagination span:last-child").text(pageindex);
    for(var i=1;i<=pageindex;i++){
        $("#fullpage > .quick > ul").append("<li></li>"); //오른쪽 도트 생성
    }
    for(var i = 0; i < pageindex; i ++){
        var innerpage = $("#fullpage > .fullsection").eq(i).find(".full_sub").length;
        if(innerpage > 0){
            var innerdot_html = "<ul class='inner_dot'>";
            for(var j = 0; j < innerpage; j ++){
                innerdot_html += "<li></li>"
            }
            innerdot_html += "</ul>"
            $("#fullpage > .quick > ul > li").eq(i).html(innerdot_html);
        }
        
    }
    $(".quick").css({marginTop: $(".quick").height()/2});
    $("#fullpage .quick > ul > li:first-child, #header > ul.nav > li:first-child").addClass("on"); //일단 화면이 로드 되었을때 퀵버튼에 1번째, 네비에 1번째에 불이 들어오게
    
    function moving_page(){
        clearTimeout(times);
        times = setTimeout(function(){
            $("body").removeClass("locked");
        }, change_speed);
        //event.preventDefault();
        if(!$("body").hasClass("locked")){
            $("body").addClass("locked");
            var page = $(".quick > ul > li.on");
            //console.log(page.index()+1);  // 현재 on 되어있는 페이지 번호
            if($("body").find("#fullpage:animated").length >= 1){
                return false;
            }
            if(!$("html").hasClass("ready") && !$("html").hasClass("show_popup")){
                if (event.wheelDelta > 0 || event.detail < 0) {//마우스 휠을 위로
                    var before = page.index();
                    var pagelength=0;
                    for(var i=1; i<(before); i++){
                        pagelength += $(".full"+i).height();
                    }
                    if(page.index() > 0){ //첫번째 페이지가 아닐때 (index는 0부터 시작임)
                        page = page.index()-1;
                        moving_sections(page, pagelength);
                        if(page == 0){
                            // $("#header").addClass("on_top");
                        }
                    }else{
                        // alert("첫번째 섹션 입니다.");
                    }	
                }else{ // 마우스 휠을 아래로	
                    var nextPage = parseInt(page.index()+1); //다음페이지번호
                    var lastPageNum = parseInt($(".quick > ul > li").length); //마지막 페이지번호
                    //현재페이지번호 <= (마지막 페이지 번호 - 1)
                    // $("#header").removeClass("on_top");
                    if(nextPage < lastPageNum){ //마지막 페이지가 아닐때만 animate !
                        var pagelength=0;
                        for(var i = 1; i<(nextPage+1); i++){ 
                            //총 페이지 길이 구하기
                            //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
                            pagelength += $(".full"+i).height();
                        }
                        moving_sections(nextPage, pagelength);
                    }else{ // 현재 마지막 페이지 일때는
                        // alert("마지막 섹션 입니다!");
                    }
                }
            }
        }else{
            return false;
        }
        clearTimeout(release_times);
        release_times = setTimeout(function(){
            $("body").removeClass("locked");
        }, change_speed);
    }
    
    window.addEventListener("mousewheel", moving_page, {passive: false});
    window.addEventListener("DOMMouseScroll", moving_page, {passive: false});    
    
    $(window).resize(function(){ 
        //페이지가 100%이기때문에 브라우저가 resize 될때마다 스크롤 위치가 그대로 남아있는것을 방지하기 위해
        var resizeindex = $(".quick > ul > li.on").index()+1;
        var pagelength = 0;
        for(var i = 1; i<resizeindex; i++){ 
            //총 페이지 길이 구하기
            //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
            pagelength += $(".full"+i).height();
        }
        $("#fullpage").stop().animate({"top": -pagelength + "px"},0);
        full_sub_resize();
    });
}
var prnts_w, prnts_h;
function full_sub_resize(){
    $(".full_sub").each(function(){
        prnts_w = $(this).parents(".fullsection").width();
        prnts_h = $(this).parents(".fullsection").height();
        $(this).css({width: prnts_w, height:prnts_h});
    });
    $(".full_sub_con").each(function(){
        $(this).width(prnts_w * $(this).find(".full_sub").length);
    });
}
function full_sub_sizing(){
    full_sub_resize();
    $(".btn_left, .btn_right").each(function(){
        // var $inner_dot = $(".quick ul.inner_dot");
        var sub_counter = parseInt($(this).parents(".fullsection").find(".full_sub_con").attr("data-index"));
        // $inner_dot.find("li").eq(sub_counter-1).addClass("selected");
        $(".quick ul.inner_dot").each(function(){
            $(this).find("li").eq(0).addClass("selected");
        });
        if(sub_counter == 1){
            $(this).parent(".fullsection").find(".btn_left").addClass("disable");
        }
        $(this).click(function(){
            sub_counter = parseInt($(this).parents(".fullsection").find(".full_sub_con").attr("data-index"));
            var move_w = prnts_w;
            if($(this).hasClass("btn_left")){
                if(sub_counter > 1){
                    sub_counter -=1;
                }else{
                    // alert("첫 페이지 입니다");
                }
            }else{
                if(sub_counter < $(this).parents(".fullsection").find(".full_sub").length){
                    sub_counter +=1;
                }else{
                    // alert("막 페이지 입니다");
                }
            }
            if(sub_counter == 1){
                $(this).parent(".fullsection").find(".btn_left").addClass("disable");
                $(this).parent(".fullsection").find(".btn_right").removeClass("disable");
            }else if(sub_counter == $(this).parents(".fullsection").find(".full_sub").length){
                $(this).parent(".fullsection").find(".btn_left").removeClass("disable");
                $(this).parent(".fullsection").find(".btn_right").addClass("disable");
            }else{
                $(this).parent(".fullsection").find(".btn_right, .btn_left").removeClass("disable");
            }
            $(".quick li.on ul.inner_dot").find("li").removeClass("selected");
            $(".quick li.on ul.inner_dot").find("li").eq(sub_counter-1).addClass("selected");
            $(".quick li.on ul.inner_dot").css({transform:"translateX(-"+((sub_counter - 1)*19)+"px)"});
            move_w = move_w * (sub_counter-1) * -1;
            $(this).parent(".fullsection").find(".full_sub_con").stop().animate({left: move_w}, change_speed).attr("data-index", sub_counter).find(".full_sub").eq(sub_counter-1).removeClass("hide");
            
            // clearTimeout(times);
            // times = setTimeout(function(){
            //     $("body").removeClass("locked");
            // }, change_speed);
            // //event.preventDefault();
            // if(!$("body").hasClass("locked")){
            //     $("body").addClass("locked");
            // }
            // clearTimeout(release_times);
            // release_times = setTimeout(function(){
            //     $("body").removeClass("locked");
            // }, change_speed);
        });
    });
    $(".quick ul.inner_dot").each(function(){
        // alert($(this).parent().index());/*subpage 있는 섹션번호 확인*/
        $(this).find("li").each(function(){
            $(this).click(function(){
                var section_num = $(this).parent("ul.inner_dot").parent().index();
                var sub_page = $(this).index();
                $(this).parent().find("li").removeClass("selected");
                $(this).addClass("selected");
                $(this).parent("ul.inner_dot").css({transform:"translateX(-"+((sub_page)*19)+"px)"});
                sub_counter = sub_page + 1;
                var move_w = prnts_w;
                move_w = move_w * sub_page * -1;
                // alert($(".fullsection.full" + section_num).index());
                $(".fullsection").eq(section_num).find(".full_sub_con").stop().animate({left: move_w}, change_speed).attr("data-index", sub_counter).find(".full_sub").eq(sub_counter-1).removeClass("hide");
                if(sub_counter == 1){
                    $(".fullsection").eq(section_num).find(".btn_left").addClass("disable");
                    $(".fullsection").eq(section_num).find(".btn_right").removeClass("disable");
                }else if(sub_counter == $(".fullsection").eq(section_num).find(".full_sub").length){
                    $(".fullsection").eq(section_num).find(".btn_left").removeClass("disable");
                    $(".fullsection").eq(section_num).find(".btn_right").addClass("disable");
                }else{
                    $(".fullsection").eq(section_num).find(".btn_right, .btn_left").removeClass("disable");
                }
            });
            // clearTimeout(times);
            // times = setTimeout(function(){
            //     $("body").removeClass("locked");
            // }, change_speed);
            // //event.preventDefault();
            // if(!$("body").hasClass("locked")){
            //     $("body").addClass("locked");
            // }
            // clearTimeout(release_times);
            // release_times = setTimeout(function(){
            //     $("body").removeClass("locked");
            // }, change_speed);
        });
    });
}

var perfumes = [
    ["Fresh",
        [
            ["Vodka on the Rocks","<b>Inspiration</b><br>The refreshing feeling of a Vodka cooled by ice."," Ice cracks beneath a stream of silky clear liquid, awakening deep curiosity for a taste of cool spices like cardamom and coriander plus aldehydes at the opening, Vodka on the Rocks evokes the frozen steam rising from ice cubes in a clear crystal tumbler."],
            ["Moonlight in Heaven","<b>Inspiration</b><br>A dazzling beam of pearlized light dances on the ocean's belly.","witnessed by two lovers who watch from a balcony draped in floating white opaque gauze that seems alive, responding to a warm wind that blows. The lovers, high above the world to almost touch the stars, with full hearts and bodies light as air."],
            ["Bamboo Harmony","<b>Inspiration</b><br>A sip of pure white tea in a bamboo forest.","A spiritual cleanse for the senses, Bamboo Harmony is pure and delicate. The aroma of white tea spiked with citrus and green mimosa lift the opening of bergamot, bigarade and neroli essences. Fig leaves in the dry down invite you to a calm meditative state, lying on a bed of soft green moss."],
            ["Flower of Immortality","<b>Inspiration</b><br>A peach blossom floating on a crystal-clear stream.","The delicate nature of newness and rebirth witnessed in springtime is where the Flower of Immortality thrives in a floral paradise forever, blooming with dewy white peach blossoms and a pastel bouquet of fresh freesia, rose and sweet vanilla. A fruity splash of fresh nectarine flows like the soft undercurrent of a clear stream to the fountain of youth from which the flower drinks."]
        ]
    ],
    ["Narcotics",
        [
            ["Good girl gone Bad by Kilian - Extreme","<b>Inspiration</b><br>Take the uninhibited whirlwind of flowers in Good girl gone Bad by KILIAN and envelop it in a luscious, milky facet.","It opens with a pink and white bouquet of roses of May, and the most beautiful orange blossoms carried by the song of three sirens, calling from its core: tuberose, Egyptian jasmine sambac, and narcissus. These exquisite flowers are wrapped in a milky toffee elixir, making them half-innocent, half-voluptuous, and now—a delicious temptress altogether."],
            ["Love, don't be shy","<b>Inspiration</b><br>Exhilarating, unforgettable, Love, don't be shy implores you at the opening with tender orange blossom absolute."," First love's innocence makes itself known with juicy honeysuckle and plush rose softly caressed by the sweetness of luscious marshmallow sugar accord, satisfying the craving pang of new love. A warm amber base lends a pulsing touch of sensuality, hinting the possibility of soon knowing another soul, inside and out."],
            ["Rolling in Love' Share","<b>Inspiration</b><br>An addictive intimate cocoon.","Rolling in Love is a musc de peau, capturing the sensation of feeling so high on love that it seems to almost get under the skin. Working with perfumer Pascal Gaurin, Kilian Hennessy took an entirely new direction. Rolling in Love is more direct and less faceted than his previous fragrances—almost monochromatic in its focused representation of a single emotion. Rolling in Love is a white scent, layering different textures along the scent's trail with notes of ambrette seeds, almond milk, iris, and musk."],
            ["Rose Oud","<b>Inspiration</b><br> Rose Oud depicts a burning blend of Roses. Rose Oil from Bulgaria opens with a spark of Saffron and Cinnamon.","while Rose Absolute spreads luxuriously throughout, blending into a sweet Lychee accord. The fragrance unfolds a long-lasting dry-down based on Cedarwood Atlas Oil, that resonates with an Oud Accord built around woody and spicy Cypriol Oil from India, enriched by deep smoky notes of leather."]
        ]
    ],
    ["Liquors",
        [
            ["Black Phantom Memento Mori","<b>Kilian Hennessy's Inspiration</b><br>KILIAN Paris drops the quintessential summer cocktail in scent.","Blue Moon Ginger Dash is a limited fresh addition to The Liquors, inspired by Kilian Hennessy's summer cocktail, the cult beachside party drink from the 90's, Blue Lagoon, a mix of lemon, vodka and blue caraçao liquor."],
            ["Roses on Ice","<b>Kilian Hennessy's Inspiration</b><br>Introducing a brand new collection.","Kilian Hennessy felt it was time to pay tribute to his heritage, as heir to the renowned French cognac making family, and to his choice olfactory intoxicants for driving the night towards dawn. As a first-time collaboration with perfumer Franck Voelkl, Kilian Hennessy wanted to recreate the tasting of gin on the rocks with a splash of lime."],
            ["Angels' Share","<b>Kilian Hennessy's Inspiration</b><br> Introducing a new olfactive family.","Kilian Hennessy pays tribute to his heritage, as heir to the renowned French cognac-making family, and to his choice olfactory intoxicants for driving the night towards dawn. A first-time collaboration with French perfumer Benoit Lapouza, the perfume Angel's Share is Kilian Hennessy's most personal fragrance creation yet, inspired by his eighth-generation inheritance of Hennessy savoir-faire in cognac making."],
            ["Old Fashioned","<b>Kilian Hennessy's Inspiration</b><br>Only better with age.","Old Fashioned is our new scent with whiskey accords inspired by the complex taste structure of an 18-year-aged single malt. This perfume transports direct to the Scottish Highlands, fireside inside a family estate, layered with generations, evoking the purest excellent whiskey: a single malt."]
        ]
    ],
    ["Cellars",
        [
            ["Blue Moon Ginger Dash","<b>Inspiration</b><br>On turbulent seas, an inescapably transient pirate ship braves black waters, leagues deep in mystery.","Rum accord from Martinique, akin to ‘pirates water', spikes the scent of strong coffee at its heart, balanced by vetiver essence. A deadly bite of cyanide accord hides menacingly, like the smile from death itself. Smile back as sugar cane and dark, creamy sandalwood assures a trying journey holds a sweet reward."],
            ["Sacred Wood","<b>Inspiration</b><br>Sacred Wood by KILIAN PARIS conjures the mythical side of a fragrant wood leading East.","honoring both nature's sensory pleasures through the art of perfumes as well as one of the most coveted—and forbidden—perfume ingredients in the world: sandalwood from Mysore, India."],
            ["Straight to Heaven, white cristal","<b>Inspiration</b><br>Moments of ecstasy envelop the senses with Straight to Heaven, white crista.","Smoldering with addictive sensuality, a burning splash of rich dark rum defines the opening, its sweet gourmand chord is softened by creamy vanilla and dried fruit. Spicy patchouli pairs with the fresh, woodsy scent of cedarwood to finish, finding animalic harmony at long last."],
            ["Playing with the Devil","<b>Inspiration</b><br>Fiery, flirtatiously fierce, Playing with the Devil is unforgettable.","Tart blood orange essence and rose-tinged lychee fruit is set ablaze with peppery pimento berries essence. Creamy sandalwood on the drydown gives a smoldering quality, for a playful twist on a scandalizing encounter."]
        ]
    ],
    ["Smokes",
        [
            ["Smoking Hot","<b>Kilian Hennessy's Inspiration</b><br>At night, there are no rules but one: just be Smoking Hot!","KILIAN PARIS newest smoky fragrance is a truly caramelized delight. It features Kentucky Tobacco absolute, infused with a hookah drag of Apple-flavoured shisha tobacco and intense Bourbon Vanilla. Evoking everything from European clubs to Eastern hookah lounges, Smoking Hot redefines what a smokey scent is today, going almost where it's too hot to handle."],
            ["Back to Black, aphrodisiac","<b>Inspiration</b><br>Rekindle small fires in the darkest of nights, under blackest skies that hold the brightest of stars.","Languid honey laced with sweet spices mingles with mysterious smoky incense essence and vanilla absolute, making Back to Black, aphrodisiac a nourishingly yet addictive substance. Blue camomile and cedarwood are veiled in smoke. A sandalwood note creates a gourmand tobacco harmony–a true titillation for the senses."],
            ["Musk Oud","<b>Inspiration</b><br>A silken explosion of petals and musk.","A contemporary, Western twist on classic Rose Oud, Musk Oud is a quiet expression of syrupy rose and geranium petals, silken musk and spices. A heady drydown of oud accord, patchouli and musk anchors an intoxicating rum-filled opening. Going down smooth, as sweet as it is seductive, a new page for ancient oud is written."],
            ["Pearl Oud","<b>Inspiration</b><br>The pearl, a precious gemstone central to Doha's culture, is given a modern interpretation.","Like the ideal pearl, Pearl Oud is round and smooth–a cocktail of spicy saffron and black pepper glow with iridescent powdery iris at the opening. The pearls' opulent nature is realized at the heart, with a lush bouquet of jasmine, Turkish rose and ylang ylang. Pearl Oud reveals a rare drydown, with an intense animalic blend of Indian oud, precious patchouli and castoreum."]
        ]
    ]
];
var finder = [
    ["Fall&nbsp;&#47;&nbsp;Winter"],
    ["Spring&nbsp;&#47;&nbsp;Summer"],
    ["Fresh"],
    ["Narcotics"],
    ["Cellars"],
    ["Smokes"],
    ["Liquors"]
];
    var perfumes_list = "",
        finder_list = "";
$(function(){
    for(var i=0;i<perfumes.length;i++){
        var perfumes_cate = perfumes[i][0],
            perfumes_name = perfumes[i][1][0][0],
            perfumes_info_1 = perfumes[i][1][0][1],
            perfumes_info_2 = perfumes[i][1][0][2];

        perfumes_list += "<li><div class='panel'><div class='bg_panel'><h3 class='itc dt_ptn'>"+perfumes_cate+"</h3></div><div class='panel_cover'><img src='img/img_panel_"+i+".webp'><h3 class='itc'>"+perfumes_cate+"</h3></div><div class='inner_con'><div class='full_con'><ul class='v_con two_con viewer'><li class='cells'><img class='viewer_img' src='img/img_panel_"+i+"_0.jpg'></li><li class='cells'><div class='title_con'><h3 class='viewer_h3'>Perfumes</h3><h2 class='viewer_h2'>"+perfumes_name+"</h2><h4 class='viewer_h4'>"+perfumes_info_1+"</h4><h5 class='viewer_h5'>"+perfumes_info_2+"</h5><div class='btn_con btn_a'><a href='javascript:;'><span>View more</span></a></div></div><ul class='v_con three_con small_view'><li class='cells'><a href='javascript:;'><img class='small_view_img' src='img/img_panel_"+i+"_1_small.webp'></a></li><li class='cells'><a href='javascript:;'><img class='small_view_img' src='img/img_panel_"+i+"_2_small.webp'></a></li><li class='cells'><a href='javascript:;'><img class='small_view_img' src='img/img_panel_"+i+"_3_small.webp'></a></li></ul></li></ul></div></div><div class='btn_close rhombus btn'><i class='fa-sharp-duotone fa-regular fa-xmark-large'></i></div></div></li>";
    }
    $("#perfumes ul.panels").html(perfumes_list);
    $("#perfumes ul.panels > li").each(function(index){
        var $this = $(this);
        var background_url = "background: url(img/bg_perfumes_"+index+".webp) no-repeat 50% 50% /cover;";
        $this.find(".bg_panel").attr("style", background_url);
    });
    for(f=0; f<finder.length; f++){
        finder_list += "<a href='javascript:;' class='rhombus'><img src='img/img_finder_"+f+".webp'><div class='text_con'><h4>"+finder[f]+"</h4></div></a>";
    }
    $(".finder_list").html(finder_list);

    fullset();
    quickClick();
    full_sub_sizing();
    $("body #album").on("mousemove", function(e){
        var mX = e.clientX;
        var mY = e.clientY;
        var pY = $(".center_point").offset().top;
        var pX = $(".center_point").offset().left;
        // alert(pX);
        var distance = Math.sqrt((mX-pX)**2 + (mY-pY)**2);
        // alert(distance);
        $(".light").css("opacity", ((1920 - distance)/1920) * .5);
    });
    var one_p_six, wait_resize;
    function resize(){
        clearTimeout(wait_resize);
        wait_resize = setTimeout(function(){
            one_p_six = $(".panels li").eq(0).width();
            open_panel($(".panels li.on"));
        }, 350);
    }
    window.onresize = resize;
    $(window).load(function(){
        resize();
    });
    function open_panel(element){
        element.addClass("on").find("div.panel").css({width: $(window).width(), marginLeft: element.index() * one_p_six * -1});
    }
    $(function(){
        $(".panels > li").each(function(){
            var $this = $(this);
            $this.hover(function(){
                $this.addClass("hover");
            },function(){
                setTimeout(function(){
                    $this.removeClass("hover");
                }, 250);
            });
            $this.click(function(){
                open_panel($this);
            });
        });
        $(document).on("click",".panels li div.panel .btn_close, .panels li div.panel .bg_panel", function(){
            $(".panels li").removeClass("on").find("div.panel").attr("style","");
        });
    });
    $("#gift_bar").find(".gift_tab > li").each(function(){
        var $this = $(this),
            $this_index = $this.index();
        $this.click(function(){
            $this.parent(".gift_tab").find("li").removeClass("selected");
            $this.parent(".gift_tab").find("li").eq($this_index).addClass("selected");
        });
    });
    $(".rhombus_con > a").each(function(){
        var $this = $(this),
            $this_index = $this.index(),
            $selected_con = $(".selected_con");
        $this.click(function(){
            $this.parent(".rhombus_con").find("a").removeClass("selected");
            $this.parent(".rhombus_con").find("a").eq($this_index).addClass("selected");
            if($this.parents(".rhombus_con").hasClass("tab_btn")){
                setTimeout(function(){
                    $selected_con.find(".full_con").removeClass("selected on");
                    $selected_con.find(".full_con").eq($this_index).addClass("selected on");
                    $this.parents(".full_con:first-child").addClass("hide");
                }, 600);
                setTimeout(function(){
                    $selected_con.find(".full_con").removeClass("on");
                }, 1700);
            }
        });
    });
    $("#online_service .btn_close").click(function(){
        $(".selected_con").find(".full_con").removeClass("selected");
        $("#online_service > .full_con:first-child").removeClass("hide");
        $(".rhombus_con > a").removeClass("selected");
    });
    
    $(".small_view > li").each(function(){
        var $this = $(this),
            $panel_index = $this.parents(".panels > li").index();
        $this.click(function(){
            var $img_num = $this.parents(".inner_con").find(".viewer > li > img").attr("src").charAt(16),
                $small_img_num = $this.find("img").attr("src").charAt(16);
            $this.parents(".full_con").addClass("hide");
            $this.addClass("hide");
            $this.parents(".full_con").addClass("ptn");
            setTimeout(function(){
                $this.parents(".viewer").find(".viewer_img").attr("src","img/img_panel_"+$panel_index+"_"+$small_img_num+".jpg");
                $this.parents(".viewer").find(".viewer_h2").html(perfumes[$panel_index][1][$small_img_num][0]);
                $this.parents(".viewer").find(".viewer_h4").html(perfumes[$panel_index][1][$small_img_num][1]);
                $this.parents(".viewer").find(".viewer_h5").html(perfumes[$panel_index][1][$small_img_num][2]);
                $this.parents(".full_con").removeClass("hide");
            },1000);
            setTimeout(function(){
                $this.find(".small_view_img").attr("src","img/img_panel_"+$panel_index+"_"+$img_num+"_small.webp");
                $this.removeClass("hide");
            },500);
            setTimeout(function(){
                $this.parents(".full_con").removeClass("ptn");
            },1900);
        });
    });
    var inner_index = $("li.on ul.inner_dot li").index();
    if(inner_index == 0){
        var quick_index = $(this).parents("quick").find("ul > li").hasClass(".on").index();
        $("#fullpage fullsection").eq(quick_index).find(".btn_left .btn_right").removeClass("disable");
        $("#fullpage fullsection").eq(quick_index).find(".btn_left").addClass("disable");
    }else if(inner_index == $("li.on ul.inner_dot li").lenght-1){
        $("#fullpage fullsection").eq(quick_index).find(".btn_left .btn_right").removeClass("disable");
        $("#fullpage fullsection").eq(quick_index).find(".btn_right").addClass("disable");
    }
});
$(window).load(function(){
    $("body").removeClass("locked");
});

$(document).keydown(function(event){
    var key = event.keyCode;
    if(key == 71){
        $(".guide_line").toggleClass("on");
    }
});