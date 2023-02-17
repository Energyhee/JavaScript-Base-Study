// # textarea 높이값 유동(최대 4줄까지 이후 스크롤)
$('.write-box > textarea').on('input', function(){
    $(this).css('height', '60px');
    if ( $(this).outerHeight() <= 130 ){
        $(this).css('height', '60px');
        $(this).css('height', $(this).prop('scrollHeight') + 2 + 'px');
    }else{
        $(this).css('height', '132px');
    }
});

// # 퍼블 화면을 위한 함수
function makeYoutube(id, pip){
    var videoId = id;
    
    var wrapper = $('.yt-wrapper') // wrapper
    ,   videoEl = $('.yt-video') // 영상 붙여 넣을 곳
    ,   chatEl = $('.yt-chat') // 채팅 붙여 넣을 곳
    ,   infoEl = $('.yt-infomation'); // 정보 붙여 넣을 곳
    
    // # 영상 생성 
    if ( videoEl.length > 0 ){
        var videoSrc = 'https://www.youtube.com/embed/' + videoId
        ,	muteState = 1
        ,	autoPlay = 1
        ,	mVideo;

        mVideo = '<iframe src="' + videoSrc + '?autoplay=' + autoPlay + '&mute=' + muteState + '" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
        videoEl.append(mVideo);	
    }
    
    // # 채팅 생성
    if ( chatEl.length > 0 ){
        var cSrc = 'https://www.youtube.com/live_chat?v=' + videoId
        ,	cDomain = window.location.hostname
        ,	cTheme = 'light'
        ,	cFrame;	

        cFrame = '<iframe frameborder="0" referrerpolicy="origin" src=' + cSrc + '&embed_domain=' + cDomain + '&theme=' + cTheme +'></iframe>';
        chatEl.append(cFrame);
    }
     
     // # 정보 생성
     if( infoEl.length > 0 ){
         $.get(
            "https://www.googleapis.com/youtube/v3/videos", {
                part: 'snippet',
                maxResults: 1,
                id: videoId,
                key: 'AIzaSyDJ4qoqSETsQRn7uNPcSw4Ug1faQBLIxVI' // 테스트 키
            },
            function (data) {
                var dFrame;
                if( data.items.length ){
                    $.each(data.items, function (i, item) {
                        dFrame = '<div class="yt-info">';
                            dFrame += '<strong class="yt-title">' + item.snippet.title + '</strong>';
                            dFrame += '<div class="yt-desc"><pre>' + item.snippet.description + '</pre></div>';
                        dFrame += '</div>';
                        
                        infoEl.append(dFrame);
                    });	   						
                }
            }
        );	
     }
     
    // pip 및 dummy 영역 추가
    if (pip){
        $(window).on('scroll', function(){
            var winScr = $(window).scrollTop();
            var vTop = wrapper.offset().top;
            
            if (winScr > vTop){
                videoEl.addClass('pip');
                if (wrapper.find('.left .dummy').length < 1) wrapper.find('.left').prepend('<div class="dummy"></div>');
            }else{
                videoEl.removeClass('pip');
                wrapper.find('.left .dummy').remove();
            }
        });
    }

    // # 설명 더보기
    $('.dec-more').on('click', function(){
        infoEl.toggleClass('more');
        ( infoEl.hasClass('more') ) ? $(this).text('간략히') : $(this).text('더보기');
    });

    // # 채팅창 열기, 닫기 버튼
    $('.chat-act').on('click', function(){
        $(this).toggleClass('active');
        ( $(this).hasClass('active') ) ? $(this).find('span').text('닫기') : $(this).find('span').text('열기');
        wrapper.find('.yt-inner').toggleClass('chat-active');
    });
}