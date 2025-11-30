history.scrollRestoration = "manual";
// 순수 자바스크립트
// function circle(e){
//     var d=document.createElement("div");
//     // d = 문서에 div라는 요소 만들기
//     d.className="circle";
//     // div의 클래스 이름은 circle로
//     d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
//     // d.style.top = 요소의 상단 위치 설정 d.style.left = 요소의 왼쪽 위치 설정
//     // e.clientY = 영역내의 세로좌표 e.clientX = 영역내의 가로좌표 보이는 화면기준 클라이언트 영역 = 현재 마우스 위치 
//     // d.style.top=e.clientY+"px";d.style.left=e.clientX+"px"; =circle 클래스를 가진 div의 top과 left를 값을 지정하여 현재 마우스 위치에 생성
//     document.body.appendChild(d);
//     // 문서의 body 마지막에 div를 만들어라
//     d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
//     // addEventListener = div를 만들때마다 () 안에 함수를 실행하라
//     // 'animationend' = 애니메이션이 적용되는 요소를 애니메이션 시키고
//     // function(){d.parentElement.removeChild(d);} circle 클래스의 div를 만든 부모요소한테서 circle div를 없애라는 함수 생성
//     // .bind(this) = 방금 만든 함수 실행
// }
// document.addEventListener('click',circle);
// 클릭시 해당 위치에 클릭이펙트 발생

//  jquery로 변환중 
// $(document).click(function(){
//     x = event.clientX;
//     y = event.clientY;
//     $("body").append("<div class='circle' style='top: "+y+"px; left: "+x+"px;'><div>").one("animationend",function(){
//         $(".circle").remove();
//     });
// }); 

// $(document).click(function(){
//     x = event.clientX;
//     y = event.clientY;
//     var circle_count = 0;
//     $(".circle").css({top: y+"px", left: x+"px"}).addClass("running")
//     $(".circle").on('animationend', function(){
//         $(this).removeClass("running");
//     });
// });


var circle_rotation = 0,
    limit_circle = 4;
function circle(x,y){
    var $this_circle = $(".circle.circle_"+circle_rotation);
    $this_circle.css({top: y, left: x}).removeClass("on");
    setTimeout(function(){
        $this_circle.addClass("on");
    }, 10);
    circle_rotation++;
    if(circle_rotation >= limit_circle){
        circle_rotation = 0;
    }
}
$(window).load(function(){
    $("a, .btn_vdtb, .tab_btn > li, .ost_list > table > tbody > tr").hover(function(){
        $(".circle").removeClass("on");
        $("body").toggleClass("hover");
    });
});
$(document).click(function(e){
    var p_left = e.clientX;
    var p_top = e.clientY;
    circle(p_left,p_top);
});
$(function(){
    for(i=0; i<limit_circle; i++){
        $("body").append("<div class='circle circle_"+i+"'/>");
    }
});

var w, h;
function resize(){
    w = $(window).width();
    h = $(window).height();
}
window.onresize = resize;

var position_l_second_top,
    position_l_second_left,
    position_l_first_top,
    position_l_first_left,
    position_l_leaf_under_top,
    position_l_leaf_under_left,
    position_r_second_top,
    position_r_second_left,
    position_r_first_top,
    position_r_first_left,
    position_l_leaf_top_top,
    position_l_leaf_top_left,
    position_r_leaf_06_top,
    position_r_leaf_06_left;

$(function(){
    /*User agent check */
    var user_agent= navigator.userAgent;
    var info =  new Array("mobile","tablet","samsung","iphone os","ipad","watch os","android");
    for(i=0; i<info.length; i++){
        if(user_agent.indexOf(info[i]) > 0){
        //indexOf 해당 글자를 가지고 있으면
            $("html").removeClass("custom_cursor");
            //html에 클래스 제거
        }
    }
    resize();
    $("#visual").mousemove(function(event){
        var x = event.pageX,
            y = event.pageY;
        //마우스 좌표 추출
        //마우스 직접 따라다님
        Multiplication_value = 0.000015;
        //포지션 레이트 벨류
        position_l_second_top      = (h/2-y) * -15 * Multiplication_value;
        position_l_second_left     = (w/2-x) * -15 * Multiplication_value;

        position_l_first_top       = (h/2-y) * -25 * Multiplication_value;
        position_l_first_left      = (w/2-x) * -25 * Multiplication_value;

        position_l_leaf_under_top  = (h/2-y) * -30 * Multiplication_value;
        position_l_leaf_under_left = (w/2-x) * -35 * Multiplication_value;

        position_r_second_top      = (h/2-y) * -15 * Multiplication_value;
        position_r_second_left     = (w/2-x) * -15 * Multiplication_value;

        position_r_first_top       = (h/2-y) * -20 * Multiplication_value;
        position_r_first_left      = (w/2-x) * -20 * Multiplication_value;

        position_l_leaf_top_top    = (h/2-y) * -30 * Multiplication_value;
        position_l_leaf_top_left   = (w/2-x) * -40 * Multiplication_value;

        position_r_leaf_top        = (h/2-y) * -30 * Multiplication_value;
        position_r_leaf_left       = (w/2-x) * -40 * Multiplication_value;

        $(".l_second").css({top: position_l_second_top+"%", left: position_l_second_left+"%"});
        $(".l_first").css({top: position_l_first_top+"%", left: position_l_first_left+"%"});
        $(".l_leaf_under").css({top: position_l_leaf_under_top+"%", left: position_l_leaf_under_left+"%"});
        $(".r_second").css({top: position_r_second_top+"%", left: position_r_second_left+"%"});
        $(".r_first").css({top: position_r_first_top+"%", left: position_r_first_left+"%"});
        $(".l_leaf_top").css({top: position_l_leaf_top_top+"%", left: position_l_leaf_top_left+"%"});
        $(".r_leaf").css({top: position_r_leaf_top+"%", left: position_r_leaf_left+"%"});
    });
    var award_list = $(".awards_track").text().split(","),
    award_html = "";
    for(i=0;i<award_list.length;i++){
        award_info = award_list[i].split("@");
        award_html += "<li><b>"+award_info[0]+"</b><span>"+award_info[1]+"</span></li>";
    }
    $(".awards_track").html(award_html + award_html + award_html);
    var characters = [
    ["sun_wukong","孙悟空","Also known as the Monkey King, is a literary and religious figure<br>best known as one of the main characters in the 16th century<br>Chinese novel Journey to the West.","white"],
    ["zhu_bajie","猪八戒","Born with a clumsy heart, trapped in life's advance and retreat,<br>Breaking precepts repeatedly, following nature, not the Buddha's feat.<br>With rake and tusk, smashing fate, burrowing karma's weight,<br>Rolling in the muddy world, heedless of scorn or debate.","white"],
    ["shen_monkey","申猴","Bottom up the jade nectar, a celestial brew,<br>In the jar, the fresh wine sparkles anew.<br>In worldly clamor, he wishes to stay drunk,<br>Forgetting homeland, foreign lands amok.","white"],
    ["xu_dog","戌狗","No divine arts, no meditation's trance,<br>With a palm fan, he nurtures his pill's dance.<br>A sincere heart, the medicine he seeks,<br>Bored by human woes and worldly techniques.","white"],
    ["maitreya","弥勒","The board is earth, the pieces sky,<br>Colors of Yin and Yang comply.<br>In subtle moves, revolutions lend,<br>Laughing, praise the game that will never end.","white"],
    ["bull_king","牛魔王","Renowned as the mighty king, his life was far from plain,<br>His spirit spanned the three realms, his fame touched four domains.<br>Among the guais, a hero grand, wild and untamed,<br>The sudden arrival of dharma left his homeland forever changed.<br>With shadow as his companion, true enlightenment within him lay.","white"],
    ["black_bear_guai","黑熊精","In Guanyin's grove, his greed won't cease,<br>Southern tides bring no release.<br>Schemes cloud his sight,<br>On Bodhi Peak, he learnt life's worth is peace.","black"],
    ["yellow_wind_sage","黄风大圣","Endless yellow winds, sands stretch afar,<br>In the land once abundant, no homes there are.<br>Half-guai, half-immortal, who can decide?<br>Thief or sage, why would he mind?","black"],
    ["yellowbrow","黄眉","Indulging in desires, I am carefree,<br>No fears, no sorrows, just pure glee.<br>In land of bliss, at the Eight Precepts, I laugh with delight,<br>Inherent nature blooms, a tower of light.","black"],
    ["hundred_eyed_daoist_master","百眼魔君","Tending the furnace, stoking the flame,<br>Making pills, to immortality aspire.<br>Countless eyes and countless schemes,<br>One misstep, and shatter all dreams.","black"],
    ["yaksha_king","夜叉王","Fangs bared, eyes like twin lanterns bright,<br>In battle's clash, he finds delight.<br>Agile and brave, with skills so fine,<br>Yet lost and wandering, his fate's decline.","black"],
    ["erlang","二郎显圣真君","In skies high, his talents shine, like plum blooms pure and bright,<br>His form defies the winter's snow, a sacred being of light.<br>With lofty heart, he claims no kin to the emperor above,<br>His noble spirit dims the stars, unlocking the Great Pagoda.","black"]
    ];
    var characters_list = "",
        c_info,
        c_name;
    for(i=0; i<characters.length; i++){
        c_info = characters[i][0];
        chinese_name = characters[i][1];
        c_story = characters[i][2];
        cloud_color = characters[i][3];
        chinese_name_short = chinese_name.charAt(0)+chinese_name.charAt(1);
        c_name = c_info.replace(/_/g," ");
        characters_list += "<li class='cells box ratio_9x16 character_box "+cloud_color+"' style='background: url(img/characters/characters_"+c_info+"_bg.webp) no-repeat 50% 50% / contain;'><a href='javascript:;'><img src='img/characters/characters_"+c_info+".webp'><div class='text_con'><h2 class='chinese'>"+chinese_name_short+"</h2><div class='stroke'></div><h4>"+c_name+"</h4></div></a></li>";
    }
    $(".character_list").html(characters_list);
    var $characters_btn = $("#characters.sections.section_05 > .width_con ul.v_con > li.cells.character_box");
    $characters_btn.eq(0).addClass("selected");
    $characters_btn.each(function(){
        $(this).click(function(){
            var $this = $(this),
                $big_img = $(".big_img");
            $characters_btn.removeClass("selected");
            $this.addClass("selected");
            $("#characters.sections.section_05").addClass("hide");
            setTimeout(function(){
                $big_img.attr("src","img/characters/characters_"+characters[$this.index()][0]+"_big.webp");
                $(".c_info h3").text(characters[$this.index()][0].replace(/_/g," "));
                $(".brush_small span").text(characters[$this.index()][1]);
                $(".c_info h4").html(characters[$this.index()][2]);
                $("#characters.sections.section_05").removeClass("hide");
            }, 600);
        });
    });
});
$(function(){
    var maps = [
    ["Black Wind Mountain","The region is divided into three areas,<br>being Forest of Wolves,<br>Bamboo Grove, and Blackwind Cave.<br>The Black Wind Mountain is home to many Yaoguai,<br>but the most common enemies you will face here are Wolf Spirits."],
    ["Yellow Wind Ridge","The region is divided into four areas,<br>Sandgate Village, Crouching Tiger Temple,<br>Yellow Wind Formation and Fright Cliff.<br>Yellow Wind Ridge is where a mysterious Rat Sage has taken<br>control of the region with his Yaoguai army."],
    ["The New West","The region is divided into five areas,<br>Snowhill Path, Pagoda Realm ,Bitter Lake,<br>Valley of Ecstasy and New Thunderclap Temple.<br>The New West is where the devious Yellowbrow has taken<br>control of one of the Great Sage's six senses for his own ends."],
    ["The Webbed Hollow","The region is divided into two areas,<br>Village of Lanxi and Temple of Yellow Flowers.<br>The Webbed Hollow is where insect guai run rampant under the<br>control of a mysterious lady that holds one of the Great Sage's Senses that the Destined One seeks."],
    ["Flaming Mountains","The region is divided into three areas,<br>Woods of Ember, Furnace Valley and Field of Fire.<br>The Flaming Mountains, where lava flows and the paths are covered in ash.<br>With the help of familiar faces, the Destined One treads the<br>treacherous path to come face to face with the Bull King."],
    ["Mount Huaguo","The region is divided into two areas,<br>Foothills and Water Curtain Cave and Birthstone.<br>Mount Huaguo brings us to the conclusion of the story of the Destined One.<br>Battle numerous bosses to face your toughest battle yet."]
    ];
    var maps_list = "",
        m_name;
    for(i=0; i< maps.length; i++){
        m_name = maps[i][0];
        maps_list += "<div class='btn_con map_btns'><a class='btn btn_a medium' href='javascript:;'><span>"+m_name+"</span></a></div>";
    }
    $("#map_btn").html(maps_list);
    var $map_btns = $("#map_btn > .map_btns");
        $map_btns.eq(0).addClass("selected");
        $map_btns.each(function(){
        $(this).click(function(){
            var $this = $(this),
                $map_ex = $("#map_ex > h4");
                $maps_bg = $("#maps > .bg > .bg_img");
            $map_btns.removeClass("selected");
            $this.addClass("selected");
            $("#maps.sections.section_06").addClass("hide");
            setTimeout(function(){
                $maps_bg.css("background","#222222 url(img/bg_maps_"+$this.index()+".webp) no-repeat 50% 50% /cover");
            }, 200);
            setTimeout(function(){
                $map_ex.html(maps[$this.index()][1]);
                $("#maps.sections.section_06").removeClass("hide");
            }, 600);
        });
    });
    $player = $(".player");
    $player.find(".fa-play").parent("a").click(function(){
        var $this_i = $(this).find("i");
        if($this_i.hasClass("fa-play")){
            $this_i.attr("class","fa-solid fa-pause");
            accel = true;
            $player.addClass("play");
            rotate_start();
        }else if($this_i.hasClass("fa-pause")){
            $this_i.attr("class","fa-solid fa-play");
            accel = false;
            $player.removeClass("play");
            setTimeout(function(){
                rotate_stop();
            }, revolution_speed);
        }
    });
    function change_vol(r){
        document.querySelector('.range').style.background = 'linear-gradient(to right, var(--color-w-085) 0%, var(--color-w-085) '+ r +'%, var(--color-w-025) ' + r + '%, var(--color-w-025) 100%)';
        if(r == 100){
            $(".vol").attr("class","fa-solid fa-volume-high mini vol");
        }else if(r > 50){
            $(".vol").attr("class","fa-solid fa-volume mini vol");
        }else if(r > 0){
            $(".vol").attr("class","fa-solid fa-volume-low mini vol");
        }else{
            $(".vol").attr("class","fa-solid fa-volume-xmark mini vol");
        }
    }
    var s_gradient_value, s_rate = 50;
    document.querySelector('.range').addEventListener('input',function(event){
        s_gradient_value = 100 / event.target.attributes.max.value,
        s_rate = s_gradient_value * event.target.value;
        change_vol(s_rate);
    });
    var old_vol = 0;
    $(".vol").parent("a").click(function(){
        if($(".range").val() != 0){
            old_vol = $(".range").val();
            $(".range").val(0);
            change_vol(0);
        }else{
            $(".range").val(old_vol);
            change_vol(old_vol);
        }
    });
    var m_list = [
        ["1","Black Myth Wukong Main Title","305","00","Lin Zhe"],
        ["2","Celestial Symphony","265","01","Ashif N"],
        ["3","Unyielding Valor","319","02","Lennox Hex"],
        ["4","Transcendent Beauty","124","02","Chen Bi De"],
        ["5","A World Unseen","39","02","Zhai JinYan"],
        ["6","Mischievous As Ever","97","02","8082 Audio"],
        ["7","Seek Not Afar","48","02","Zhai JinYan"],
        ["8","Smoke Rises High","131","02","Lin Zhe"],
        ["9","The Backyard Beast","177","02","8082 Audio"],
        ["10","Face What I Truly Am!","198","02","Zhai JinYan"],
        ["11","Two Hundred and Seventy Years in Vain","296","02","Lin Zhe"],
        ["12","The Black Wind King's Pride","193","02","Ashif N"],
        ["13","Black Cloud, Red Fire","242","02","8082 Audio"],
        ["14","See These flames?","300","02","Lennox Hex"],
        ["15","I See","240","03","Chen Hong Yu"],
        ["16","Tranquil Retreat","99","02","Chen Bi De"],
        ["17","Rats in the village","182","02","Zhai JinYan"],
        ["18","Son, I Hear You Loud and Clear","235","02","Chen Hong Yu"],
        ["19","Monkey Brain Can Be a Proper Treat","142","02","8082 Audio"],
        ["20","Rock Guai","34","02","Zhai JinYan"],
        ["21","Stone Vanguard","141","02","Lin Zhe"],
        ["22","Resonant Waves Profound","172","02","Zhai JinYan"],
        ["23","Such Wind! Powerful Indeed!","310","02","Zhai JinYan"],
        ["24","Macaque Chief","172","02","Ashif N"],
        ["25","Merits in Vain","240","02","Lennox Hex"],
        ["26","Long Trails They Did Go","44","02","8082 Audio"],
        ["27","Wise Voice","210","02","Chen Bi De"],
        ["28","In Revel, We Find Pain","232","02","Chen Hong Yu"],
        ["29","Evening Light on Snow","132","02","Zhai JinYan"],
        ["30","Zodiac Deities","93","02","Zhai JinYan"],
        ["31","Endeavors Wasted","125","02","Lin Zhe"],
        ["32","It Will Fit Me Just As Well","188","02","8082 Audio"],
        ["33","Mahavira Hall","180","02","Chen Bi De"],
        ["34","Gentleness Endears","39","02","Lin Zhe"],
        ["35","Idol, Obstacle","318","02","Ashif N"],
        ["36","Nonsense!","279","04","Zhelainv","Chen Hong Yu"],
        ["37","Cleave to Soar","124","02","Zhai JinYan"],
        ["38","Village of Lanxi","101","02","Chen Bi De"],
        ["39","Even Pests Plague Our Path","141","02","8082 Audio"],
        ["40","Yaoguai or Bodhisattva","153","02","Ashif N"],
        ["41","For What Deed, Must Mercy's Hand Sow Woe Upon Thee","171","02","Zhai JinYan"],
        ["42","If Good And Evil Gain No Due","82","02","Chen Hong Yu"],
        ["43","Rank, Dank , Much-Impelled","289","02","Chen Hong Yu"],
        ["44","Who Said Women Are Soft-Hearted?","260","02","Zhai JinYan"],
        ["45","Amidst the Furnace's Blaze, Purple Clouds Emerge","111","02","Ashif N"],
        ["46","Self-Torment","111","02","Zhai JinYan"],
        ["47","My Chance to Ascend","237","02","Chen Bi De"],
        ["48","The Last Crow","278","02","Ashif N"],
        ["49","Entanglement, Evil","389","02","8082 Audio"],
        ["50","Listen Not","260","05","Zhang Zi Ning","Ashif N"],
        ["51","Perilous Path","204","02","Zhai JinYan"],
        ["52","Five Elements Disturbed","127","02","8082 Audio"],
        ["53","Sear the Fur For a Batter Bite","163","02","Lennox Hex"],
        ["54","Keep the Fun Going","132","02","Lennox Hex"],
        ["55","Yin-Yang Adrift","270","02","Lennox Hex"],
        ["56","Karma Is a Hero","41","02","Lennox Hex"],
        ["57","Monkey in Haste, Sure to Go Waste","181","02","Lin Zhe"],
        ["58","Loyalty Amid Fire and Frost","133","02","Lin Zhe"],
        ["59","Samadhi Fire","330","02","Zhai JinYan"],
        ["60","Flames Have Paved My Way","310","02","Ashif N"],
        ["61","Destiny","293","06","Chen Bi De"],
        ["62","Mount Huaguo","125","06","Chen Bi De"],
        ["63","Sky-Shrouding Stone","126","02"],
        ["64","It Was You","332","02","Ashif N"],
        ["65","Monkey Mind","233","02","Lin Zhe"],
        ["66","The Greatest Yaoguai","295","02"],
        ["67","Detached from Rise and Fall","283","02","Zhai JinYan"],
        ["68","Mighty Descent","174","02","Zhai JinYan"],
        ["69","Cosmo Resonance","194","02","8082 Audio"],
        ["70","There Is a Way","67","02","Ashif N"]
    ];
    var ost_list = "";
    for(i=0; i<m_list.length; i++){
        m_num = m_list[i][0],
        m_title = m_list[i][1],
        m_time_m = parseInt(m_list[i][2] / 60),
        m_time_s = m_list[i][2] % 60,
        m_img = m_list[i][3],
        m_maker = m_list[i][4];
        if(m_num.length < 2){
            add_zero = "&nbsp;";
        }else{
            add_zero = "";
        }
        if(m_time_m < 10){
            m_time_m = "0" + m_time_m;
        }
        if(m_time_s < 10){
            m_time_s = "0" + m_time_s;
        }
        m_time = m_time_m + ":" + m_time_s;
        ost_list += "<tr><td class='ost_num'><span>"+add_zero+m_num+"</span></td><td class='ost_title'><span>"+m_title+"</span></td><td class='ost_maker'><span>"+m_maker+"</span></td><td class='ost_time'><span>"+m_time+"</span></td></tr>";
    }
    ost_list = "<table><tbody><tr><td></td></tr>"+ost_list+"</tbody></table>";
    $(".ost_list").html(ost_list);
    $(".ost_list > table > tbody > tr:nth-child(2)").addClass("selected");
    $("#soundtrack").find(".ost_list").each(function(){
        var $this_s = $(this);
        $this_s.find("tr").click(function(){
            var $this_tr = $(this);
            $this_s.find("tr").removeClass("selected");
            $this_tr.addClass("selected");
            var title = $this_tr.find(".ost_title").text(),
                maker = $this_tr.find(".ost_maker").text(),
                time = $this_tr.find(".ost_time").text();
                disk_img_src = "img/soundtrack_disk_"+m_list[$this_tr.index()-1][3]+".webp";
                cover_img = "url(img/soundtrack_disk_"+m_list[$this_tr.index()-1][3]+"_cover.webp) no-repeat 50% 50% / cover";
            if($(".player").find("i").hasClass("fa-pause")){
                $(".fa-pause").attr("class","fa-solid fa-play");
                accel = false;
                $(".player").removeClass("play");
                setTimeout(function(){
                    rotate_stop();
                }, 200);
            }
            $("#soundtrack").addClass("changing");
            setTimeout(function(){
                $(".song_title").text(title);
                $(".song_maker").text(maker);
                $(".left_time").text(time);
                $(".rotate_disk").attr({src:disk_img_src});
                $(".album_cover").css({background:cover_img});
                $(".music_box > li.cells.box:before").css({background:cover_img});
                setTimeout(function(){
                    $("#soundtrack").removeClass("changing");
                }, 150);
            }, 400);
        });
    });
    news = [
        ["Announcements","09/19/2024","Black Myth: Wukong 1.0.9.15179 Patch notes","Major Updates: Fixed an issue where the game would crash on launch if the system language was set to Turkish on PS5. (PS5) Fixed an issue where the game could occasionally crash during certain boss fights if the Windows system language was set to Turkish on the PC version. Fixed various crashes and errors occurring under specific conditions."],
        ["Announcements","08/20/2024","A Few More Tips Before You Hit the Road","Dear Destined Ones, Big day! Big day! Black Myth: Wukong has now been officially released. Your epic journey westward starts today! To make this journey smoother, here are some gentle reminders for all the Destined Ones: Plan your gaming time wisely and set up a quiet space to ensure uninterrupted gameplay."],
        ["Updates","08/15/2024","Black Myth: Wukong Global Launch Schedule","At the summit of thine quest, strive higher still, ne'er find rest, The world's a stage of grand design, where greatness doth in deeds align, When noblest form thou do embrace, through honor's boon and valor's grace, Beyond that lofty threshold waits, enlightenment, ordained by fate. Black Myth: Wukong will be ready to play globally on PS5 and PC at 10 AM (UTC +8) on August 20, 2024.Take a look at the image to find out when you can start playing the game in your local"],
        ["News","08/13/2024","Benchmark Tool is Now Available on Steam","The Black Myth: Wukong Benchmark Tool is now available for free download on Steam.This tool allows you to preliminarily check your PC's hardware performance and system compatibility for running the game. You can customize benchmark settings to preview game visuals and performance for different graphics options."],
        ["Updates","08/08/2024","Black Myth: Wukong 1.0.6.13951 Patch notes",">Major Updates: Fixed an issue where the game would crash on launch if the system language was set to Turkish on PS5. (PS5) Fixed an issue where the game could occasionally crash during certain boss fights if the Windows system language was set to Turkish on the PC version. Fixed various crashes and errors occurring under specific conditions."],
        ["News","06/08/2024","Black Myth: Wukong - Pre-Orders Now Available","Major Updates:Fixed an issue where enabling FSR could cause crashes for some players during startup or the prologue.Fixed a crash issue in certain areas of the Webbed Hollow when NVIDIA Full Ray Tracing is enabled.Fixed an issue where hair would stretch abnormally.Optimized the hair effects for Yaoguai King Lingxuzi."],
    ];
    var news_list = "";
    for(i=0; i<news.length; i++){
        news_c = news[i][0],
        news_d = news[i][1],
        news_t = news[i][2],
        news_s = news[i][3];
        news_list += "<li class='cells news_box box'><a href='javascript:;'><ul class='v_con ub_two_con'><li class='cells'><img src='img/news_"+i+".webp'></li><li class='cells notice'><h5>"+news_c+"</h5><h5 class='date'>"+news_d+"&nbsp;&nbsp;</h5><h4>"+news_t+"</h4><h5>"+news_s+"</h5></li></ul></a></li>";
    }
    $("ul.news").html(news_list);
    
    var rising_duration = 20000,
        min_bubble_size = 2,
        max_bubble_size = "var(mrgn-half)";
    function rising(each_bubble){
        $("."+each_bubble).animate({marginTop: "-100%"}, rising_duration, function(){
            $(this).remove();
        }).find(".bubble").css({width: min_bubble_size}).animate({width: max_bubble_size}, rising_duration);
    }
    var bubbles,
        index_bubbles = 0,
        position_x_random,
        new_bubble_make_start_position = 2,
        new_bubble_make_end_position = 96,
        new_bubble_make_duration = 250;
    setInterval(function(){
        position_x_random = Math.floor(Math.random() * new_bubble_make_end_position) + new_bubble_make_start_position;
        // x 2%~98(2+96)% 사이만 생성
        bubbles = '<div class="air_bubbles ab_'+index_bubbles+'" style="left:'+position_x_random+'%;"><div class="bubble"></div></div>';
        $(".air_bubbles_con").append(bubbles);
        rising('ab_'+index_bubbles);
        index_bubbles++;
    }, new_bubble_make_duration);
});
var rotate_deg = 0;
var accel, this_deg, 
    revolution_speed = 200;
function rotate_control(){
    this_deg = $(".rotate_disk").attr("style");
    this_deg = this_deg.replace("transform: rotate(", "");
    this_deg = this_deg.replace("deg);","");
    this_deg = Number(this_deg) + rotate_deg;
    $(".rotate_disk").removeClass("no_t").removeClass("reset").attr("style", "transform: rotate(" + this_deg + "deg);");
}
function rotate_start(){
    if(accel){
        if(rotate_deg <= 49){
            rotate_deg += 5;
        }else{
            rotate_deg = 50;
        }
        setTimeout(function(){
            rotate_control();
            rotate_start();
        }, revolution_speed);
    }
}
function rotate_stop(){
    if(!accel){
        if(rotate_deg >= 1){
            rotate_deg -= 6.5;
        }else{
            rotate_deg = 0;
        }
        if(rotate_deg > 0){
            setTimeout(function(){
                rotate_control();
                rotate_stop();
            }, revolution_speed);
        }else{
            setTimeout(function(){
                this_deg = $(".rotate_disk").attr("style");
                this_deg = this_deg.replace("transform: rotate(","");
                this_deg = this_deg.replace("deg);","");
                this_deg = this_deg % 360;
                $(".rotate_disk").addClass("no_t").attr("style","transform: rotate("+this_deg+"deg);");
                setTimeout(function(){ 
                    if(this_deg > 180){
                        this_deg = 360;
                    }else{
                        this_deg = 0;
                    }
                    $(".rotate_disk").removeClass("no_t").addClass("reset").attr("style", "transform: rotate(" + this_deg+ "deg);");
                }, 10);
            }, revolution_speed);
        }
    }
}
$(window).scroll(function(){
    $bg_01 = $(".bg_01"),
    $bg_02 = $(".bg_02"),
    $bg_03 = $(".bg_03"),
    $bg_04 = $(".bg_04"),
    $bg_05 = $(".bg_05"),
    $bg_06 = $(".bg_06"),
    $bg_07 = $(".w_con"),
    $bg_08 = $(".fire"),
    SH = $bg_01.height(),
    SE = $(document).scrollTop();
    scroll_per = SE/SH;
    if(scroll_per <= 1 && SE >= 0){
        $bg_01.css({marginTop: SE * 0.9, filter:"blur("+scroll_per*14+"px)"});
        $bg_02.css({marginTop: SE * 0.4, filter:"blur("+scroll_per*12+"px)"});
        $bg_03.css({marginTop: SE * 0.5, filter:"blur("+scroll_per*10+"px)"});
        $bg_04.css({marginTop: SE * 0.3, filter:"blur("+scroll_per*8+"px)"});
        $bg_05.css({marginTop: SE * 0.1, filter:"blur("+scroll_per*6+"px)"});
        $bg_06.css({marginTop: SE * 0.1, filter:"blur("+scroll_per*4+"px)"});
        $bg_07.css({marginTop: SE * 0.1, filter:"blur("+scroll_per*2+"px)"});
        $bg_08.css({marginTop: SE * 0.1, filter:"blur("+scroll_per*2+"px)"});
    }else if( SE < 0){
        $("#visual .bg_visual").animate({marginTop: 0},100).css({filter:"blur(0px)"});
    }
});