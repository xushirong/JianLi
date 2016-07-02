//->解决click的300ms延迟
FastClick.attach(document.body);

//->动态计算REM的值
~function () {
    var winW = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = winW / 340 * 100 + "px";
}();

//->初始化Swiper
var swiper=new Swiper(".swiper-container", {
    loop: true,
    //设置loop为true的时候，需要把第一张放在末尾一份，最后一张放在开头一份
    //刚开始显示的是索引为1的，初始化swiper的时候，会自动实现从索引0，切换到索引1这一张
    direction: "vertical",
    onSlidePrevEnd: changeEnd,
    //->向上切换结束:swiper->当前本次初始化new Swiper创建出来的实例
    onSlideNextEnd: changeEnd,
    //->向下切换结束:swiper.activeIndex当前活动块的索引  0是在上面  1是在下面
    //effect: "cube"
});
//运动思路：开始的时候，每一页是不存在id的，我们想要实现的是，只要给每一页加上对应的id,就让每一页里面的所有子元素开始运动
//让该id下的所有元素都开始运动

//swiper 当前本次初始化创建出来的实例，形参值就是实例，创建出来实例之后，可以使用官方文档里面的属性和方法
//->当切换结束的时候,我们需要做的事情:传递一个swiper实例进来，清除所有slide块的ID,在让当前活动块拥有对应的ID即可,拥有对应的ID才会有对应的动画
function changeEnd(swiper) {
    var n = swiper.activeIndex,
        slideAry = swiper.slides;//->获取当前所有的活动块(获取的结果是一个数组)
    [].forEach.call(slideAry, function (slide, index) {
        if (n === index) {
            if(n == 1 || n == 5){
                slide.id = "page1";
            }
            else if(n == 2){
                slide.id = "page2";
            }
            else if(n == 3){
                slide.id = "page3";
            }
            else if(n = 4||n == 6){
                slide.id = "page4";
            }
            return;
        }
        slide.id = null;
    });
}


//->音频的自动播放
var music = document.getElementById("music"),
    musicAudio = document.getElementById("musicAudio");
window.setTimeout(function () {
    musicAudio.play();//->让音频播放:浏览器开始下载资源文件,也就是让它播放到出声音还需要一段时间,只有发出声音后我们才会显示音乐的图标
    musicAudio.addEventListener("canplay", function () {
        //->canplay:音频文件已经可以播放了,但是不一定是所有资源都加载完成了,大部分是边播放边界
        music.style.display = "block";
        music.className = "music move";
    }, false);
}, 1000);
music.addEventListener("click", function () {
    //->当前是暂停状态我让其播放
    if (musicAudio.paused) {
        musicAudio.play();
        music.className = "music move";
        return;
    }
    //->当前是播放状态我让其暂停
    musicAudio.pause();
    music.className = "music";
}, false);





