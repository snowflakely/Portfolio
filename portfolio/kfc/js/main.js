history.scrollRestoration = "manual";
var menu = new Array("chees_zinger_super_box@b","kfc_best_pack@b","kfc_family_pack@b","kfc_together_pack@b","weekend_limited_bucket@b","tender@b","burger_tender@b","hot_wings_4pieces@b","twister@b","twister_tender_3pieces@b","burger_twister@b","korean_chicken_legs_set@b","chicken_legs_set@b","butter_biscuit@b","black_label_fall_in_cheese@g","chili_mozzarella_zinger@g","chili_zinger@g","classic_zinger@g","zinger@g","zinger_blt@g","zinger_double_down@g","zinger_tower@g","kentercky_spicy@g","original_chicken@c","hot_crispy_chicken@c","hot_crispy_chicken_legs@c","korean_chicken@c","original_chicken_5pieces@c","hot_crispy_chicken_5pieces@c","hot_crispy_legs_5pieces@c","korean_chicken_5pieces@c","original_chicken_3pieces@c","hot_crispy_chicken_3pieces@c","hot_crispy_legs_3pieces@c","korean_chicken_3pieces@c","original_chicken_1pieces@c","hot_crispy_chicken_1pieces@c","hot_crispy_chicken_legs_1pieces@c","korean_chicken_1pieces@c");
$(function(){
    var menus = "", m_info, m_name;
    for(i=0; i<menu.length; i++){
        m_info = menu[i].split("@");
        m_name = m_info[0].replace(/_/g," ");
        menus += "<li class='cells bg_box cate_"+m_info[1]+"'><a href='javascript:;'><img src='img/menu/"+m_info[0]+".webp'><div class='text_con center'><h5>"+m_name+"</h5></div></a></li>";
    }
    $("#menu ul.tab_content").html(menus);
});
var countrie = new Array("angola@af@-57@-23","botswana@af@-62@-28","ghana@af@-44@-7","ivory_coast@af@-40@-7","kenya@af@-71@-13","lesotho@af@-64@-35","malawi@af@-69@-23","mauritius@af@-88@-27","morocco@af@-41@10","mozambique@af@-71@-28","nigeria@af@-51@-8","south_africa@af@-62@-36","swaziland@af@-67@-32","tanzania@af@-71@-20","tunisia@af@-53@12","uganda@af@-68@-10","zambia@af@-66@-22","gabon@af@-53@-14","madagascar@af@-79@-26","senegal@af@-36@-3","sudan@af@-66@0","rwanda@af@-66@-15","namibia@af@-59@-31","zimbabwe@af@-66@-23","azerbaijan@as@-76@14","bangladesh@as@-107@3","brunei@as@-125@-13","mainland_china_yum_china@as@-109@10","cambodia@as@-118@-7","hong_kong@as@-121@3","india@as@-98@-2","indonesia@as@-127@-20","japan@as@-135@17","kazakhstan@as@-88@21","kyrgyzstan@as@-99@15","laos@as@-118@-1","macau@as@-122@2","malaysia@as@-120@-12","maldives@as@-96@-10","mongolia@as@-110@21","nepal@as@-102@2","pakistan@as@-92@7","philippines@as@-130@3","singapore@as@-118@-14","south_korea@as@-129@14","sri_lanka@as@-101@-7","taiwan@as@-127@2","thailand@as@-115@-5","uzbekistan@as@-88@13","vietnam@as@-121@-6","australia@as@-136@-34","guam@as@-147@-3","new_zealand@as@42@-45","northern_mariana_islands@as@-144@-2","myanmar@as@-111@0","antigua_and_barbuba@sa@1@-2","argentina@sa@-7@-39","aruba@sa@3@-3","bahamas@sa@6@3","barbados@sa@-3@-3","bolivia@sa@-2@-25","bonaire@sa@1@-2","brazil@sa@-9@-19","cayman_islands@sa@8@0","chile@sa@1@-33","colombia@sa@5@-7","costa_rica@sa@13@-5","curaçao@sa@1@-4","dominica@sa@-1@-1","dominican_republic@sa@3@0","ecuador@sa@9@-14","el_salvador@sa@14@-2","grenada@sa@-2@-3","guadeloupe@sa@-1@-2","guatemala@sa@16@-1","guyana@sa@-5@-8","jamaica@sa@8@-2","honduras@sa@13@-3","martinique@sa@-1@-2","panama@sa@10@-5","paraguay@sa@-7@-29","peru@sa@7@-18","puerto_rico@sa@0@-1","saint_kitts_and_nevis@sa@-1@0","saint_lucia@sa@-1@-1","sint_maarten@sa@0@0","saint_vincent_and_the_grenadines@sa@-1@-2","suriname@sa@-8@-11","trinidad_and_tobago@sa@-4@-5","us_virgin_islands@sa@0@-1","venezuela@sa@2@-6","french_guiana@sa@-9@-9","albania@eu@-60@15","armenia@eu@-75@13","austria@eu@-53@19","belarus@eu@-63@23","bulgaria@eu@-63@16","croatia@eu@-58@17","cyprus@eu@-67@9","czech_republic@eu@-54@23","denmark@eu@-53@28","france@eu@-47@20","georgia@eu@-74@17","germany@eu@-52@23","greece@eu@-60@15","hungary@eu@-58@20","iceland@eu@-38@36","ireland@eu@-42@26","italy@eu@-56@16","kosovo@eu@-60@17","latvia@eu@-60@28","lithuania@eu@-59@28","macedonia@eu@-61@16","malta@eu@-55@11","moldova@eu@-65@19","netherlands@eu@-49@24","poland@eu@-58@24","portugal@eu@-42@15","romania@eu@-62@19","serbia@eu@-60@18","slovakia@eu@-59@20","slovenia@eu@-57@20","spain@eu@-46@16","sweden@eu@-56@32","switzerland@eu@-51@20","ukraine@eu@-67@22","united_kingdom@eu@-45@26","estonia@eu@-61@28","belgium@eu@-48@23","bahrain@me@-79@5","egypt@me@-68@6","iraq@me@-74@9","jordan@me@-70@8","kuwait@me@-79@6","lebanon@me@-68@11","oman@me@-86@2","palestine@me@-68@11","qatar@me@-81@5","saudi_arabia@me@-72@5","turkey@me@-67@15","united_arab_emirates@me@-81@3","israel@me@-68@7","bermuda@na@1@7","canada@na@14@28","mexico@na@22@1","united_states@na@20@12")
$(function(){
    var countries = "", c_info, c_name;
    for(j=0; j<countrie.length; j++){
        c_info = countrie[j].split("@");
        c_name = c_info[0].replace(/_/g," ");
        countries += "<li class='cells btn_select_world cate_"+c_info[1]+"' data-world-no='"+j+"'><div class='c_box' style='background: url(img/countries/"+c_info[0]+".svg) no-repeat 50% 50% / cover;'></div><h5>"+c_name+"</h5></li>";
    }
    $("#location ul.v_con li.cells ul.tab_content").html(countries);
});
$(window).load(function(){
    $(".btn_select_world").each(function(){
        $(this).click(function(){
            var location = countrie[$(this).attr("data-world-no")];
            location = location.split("@");
            var location_country = location[0],
                location_land = location[1],
                location_x = location[2],
                location_y = location[3];
            $(".all_country").css({left: location_x+"%", top: location_y+"%"});
            $(".land").attr("src","img/map/world_map_"+location_land+".webp");
            $(".all_country .select").attr("src","img/map/world_map_"+location_land+"_"+location_country+".webp");
        });
    });
});