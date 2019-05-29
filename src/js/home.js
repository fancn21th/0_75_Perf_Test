$(function() {
  // <!-- 是否激活邮件  true 已启用   false 未启用     是否是买家-->
  /* chembnb倒计时计算 */
  $(".js-cal-time").each(function() {
    var target_time = $(this).data("time");
    var now_time = new Date();
    var now_sec = now_time.getTime();
    var _this = $(this);
    function cal_time() {
      var rest_sec = target_time - now_sec;
      var day_ = parseInt(rest_sec / (24 * 3600 * 1000));
      var day_rest = rest_sec % (24 * 3600 * 1000);
      var hour_ = parseInt(day_rest / (3600 * 1000));
      var hour_rest = day_rest % (3600 * 1000);
      var min_ = parseInt(hour_rest / (60 * 1000));
      var min_rest = hour_rest % (60 * 1000);
      var sec_ = parseInt(min_rest / 1000);
      _this.find(".js-days").html(day_);
      _this.find(".js-hours").html(hour_);
      _this.find(".js-minites").html(min_);
      _this.find(".js-seconds").html(sec_);
    }
    var timer = setInterval(function() {
      cal_time();
      now_sec = now_sec + 1000;
      if (now_time >= target_time) {
        clearInterval(timer);
      }
    }, 1000);
  });

  /* chembnb 产品轮播 */
  var chembnb_swiper = new Swiper(".home-chembnb-swiper", {
    autoplay: 5000,
    speed: 1000,
    effect: "slide",
    pagination: ".chembnb-pagination",
    paginationClickable: true,
    // autoplayDisableOnInteraction : false,
    onSlideChangeStart: function(swiper) {
      $(".js-home-chembnb-nav li:eq(" + swiper.activeIndex + ")")
        .addClass("active")
        .siblings(".active")
        .removeClass("active");
    },
    lazyLoading: true
  });

  /* chembnb 产品分类点击 */
  $(".js-home-chembnb-nav li").on("click", function() {
    if (!$(this).hasClass("active")) {
      var _ind = $(this).index();
      $(
        ".home-chembnb-swiper .chembnb-pagination span:eq(" + _ind + ")"
      ).click();
    }
  });

  /* mall 产品轮播 */
  var mall_swiper = new Swiper(".home-mall-swiper", {
    speed: 800,
    effect: "slide",
    pagination: ".mall-pagination",
    effect: "fade",
    paginationClickable: true,
    noSwipingClass: "stop-swiping",
    lazyLoading: true
  });

  /* mall 产品分类点击 */
  $(".js-home-mall-nav li").on("click", function() {
    if (!$(this).hasClass("active") && !$(this).hasClass("more")) {
      $(this)
        .addClass("active")
        .siblings(".active")
        .removeClass("active");
      var _ind = $(this).index();
      $(".home-mall-swiper .mall-pagination span:eq(" + _ind + ")").click();
    }
  });

  /* you may like 滚动 */
  var like_swiper = new Swiper(".homeLike-swiper", {
    pagination: ".mayLike",
    paginationClickable: true,
    lazyLoading: true
  });

  /* E-Market-RFQ 无缝滚动 */
  var move_length = 0;
  var scroll_length = $(".js-scroll-list").height() / 2;
  var scroll_timer = setInterval(function() {
    move_length = move_length + 39;
    $(".market-scroll").animate(
      { scrollTop: move_length },
      300,
      "linear",
      function() {
        if (move_length >= scroll_length) {
          move_length = 0;
          $(".market-scroll").scrollTop(move_length);
        }
      }
    );
  }, 4000);

  /* 展会轮播 */
  var home_expo = new Swiper(".home-expo-swiper", {
    pagination: ".expo-pagination",
    paginationClickable: true,
    autoplay: 4000,
    speed: 800,
    lazyLoading: true
  });

  $(".home-expo-swiper").on("mouseenter", function() {
    home_expo.stopAutoplay();
  });

  $(".home-expo-swiper").on("mouseleave", function() {
    home_expo.startAutoplay();
  });

  /* latest buying requests 轮播 */
  var lastest_req = new Swiper(".lastest-req", {
    direction: "vertical",
    slidesPerView: 2,
    loop: true,
    speed: 1000,
    autoplay: 5000,
    autoplayDisableOnInteraction: false
  });

  $(".lastest-req").on("mouseenter", function() {
    lastest_req.stopAutoplay();
  });

  $(".lastest-req").on("mouseleave", function() {
    lastest_req.startAutoplay();
  });

  // 重新发激活邮件
  $(".active-user").on("click", function() {
    var email = $("#sendEmail").val();
    if (email) {
      $.ajax({
        url: "//www.okchem.com/member/active_member?email=" + email,
        type: "GET",
        success: function(data) {
          var msgCode = data.message_code;
          if (msgCode) {
            if (msgCode === "member.login.active.already") {
              location.href = "/member/index";
            } else if (msgCode === "member.login.active.register") {
              location.href = "/register";
            } else if (msgCode === "member.login.active.enabled") {
              location.href = "/login";
            } else if (msgCode === "member.login.active.fail.interval") {
              $.bootstrapGrowl(
                "You can activate this email again 1 minutes later.",
                {
                  type: "warning"
                }
              );
            } else {
              location.href = "/member/active_member/success?email=" + email;
            }
          } else {
            location.href = "/member/active_member/success?email=" + email;
          }
        }
      });
    }
  });
});
