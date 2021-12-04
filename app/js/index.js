var imgUrl = '../imgs/';
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
}
var mySwiper = new Swiper ('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    //   bulletClass : 'my-bullet'
    }
})
/**
 * 监听网页滚动事件
 */
 $('td .left,td .right,#cooperate table').hide();
 $(window).scroll(function() {
    // 获取的是浏览器可见区域高度（网页的可视区域的高度）（不滚动的情况下）
    var documentClientHeight = document.documentElement.clientHeight || window.innerHeight;
    // 元素顶端到可见区域（网页）顶端的距离
    var htmlElementClientTop = document.getElementById('goods').getBoundingClientRect().top;
    // 网页指定元素进入可视区域
    if (documentClientHeight >= htmlElementClientTop) {
        // TODO 执行你要做的操作
        for (let i = 1; i < 7; i++) {
            setTimeout(function(){
                if(i%2 == 0){
                    $('.good'+i).show().addClass('animated fadeInRightBig')
                }else{
                    $('.good'+i).show().addClass('animated fadeInLeftBig')
                }
            },500*i) 
        }
    }

    var table = document.getElementsByClassName('tablebg')[0].getBoundingClientRect().top;
    if (documentClientHeight >= table) {
        // TODO 执行你要做的操作
        $('td .left').show().addClass('animated fadeInLeftBig')
        $('td .right').show().addClass('animated fadeInRightBig')
    }

    var cooperate = document.getElementById('cooperate').getBoundingClientRect().top;
    if (documentClientHeight >= cooperate) {
        // TODO 执行你要做的操作
        $('#cooperate .fl table').show().addClass('animated fadeInLeftBig')
        $('#cooperate .fr table').show().addClass('animated fadeInRightBig')
    }
});

$('.featuresBox').hover(function(){
    $(this).addClass('animated bounce')
},function(){
    $(this).removeClass('animated bounce')
})
addAnimate('videoArea');
addAnimate('goodArea');
addAnimate('features');
addAnimate('advantage');
addAnimate('scenes');
addAnimate('cooperate');
addAnimate('support');

function addAnimate(id){
        $('#'+id + ' .textArea h1,#'+id + ' .textArea p').hide();
        $(window).scroll(function() {
            var documentClientHeight = document.documentElement.clientHeight || window.innerHeight;
        var tmp = document.getElementById(id).getBoundingClientRect().top;
        if (documentClientHeight >= tmp) {
        // TODO 执行你要做的操作
        $('#'+id + ' .textArea h1,#'+id + ' .textArea p').show().addClass('bounceInDown animated');
    }

        })

}

$('#mask .close,#mask .submit').click(function(){
    $("#mask").hide();
    return false;
})
$('#more').click(function(){
    $("#mask").show();
})

