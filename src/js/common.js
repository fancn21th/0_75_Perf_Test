// // livechat begins
// window.__lc = window.__lc || {}
// window.__lc.license = 6326021;
// (function () {
// 	var lc = document.createElement('script')
// 	lc.type = 'text/javascript'
// 	lc.async = true
// 	lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js'
// 	var s = document.getElementsByTagName('script')[0]
// 	s.parentNode.insertBefore(lc, s)
// })()
// // livechat ends
$(function() {
  // 返回顶部
  $(".back-top").on("click", function() {
    var _top = $(window).scrollTop();
    var backTop = setInterval(function() {
      if (_top - 22 > 0) {
        _top = _top - 22;
      } else {
        $(window).scrollTop(0);
        clearInterval(backTop);
      }

      $(window).scrollTop(_top);
    }, 10);
  });

  $(window).scroll(function() {
    if ($(window).scrollTop() >= $(window).height()) {
      $(".back-top").hasClass("display")
        ? $(".back-top").removeClass("display")
        : "";
    } else {
      $(".back-top").hasClass("display")
        ? ""
        : $(".back-top").addClass("display");
    }
  });

  /* 头部公共部分 语言切换按钮 */
  $(".js-head-lang div").on("click", function() {
    $(this)
      .siblings("ul")
      .slideToggle(200);
  });

  /* 首页轮播图 */
  if ($(".home-swiper").length) {
    var homeSwiper = new Swiper(".home-swiper", {
      pagination: ".banner-pagination",
      autoplay: 4000,
      speed: 1000,
      loop: true,
      autoplayDisableOnInteraction: false,
      paginationClickable: true,
      prevButton: ".banner-prev",
      nextButton: ".banner-next"
    });

    /* 鼠标移入 停止轮播 */
    $(".home-swiper").on("mouseenter", function() {
      homeSwiper.stopAutoplay();
    });

    /* 鼠标移出 开始轮播 */
    $(".home-swiper").on("mouseleave", function() {
      homeSwiper.startAutoplay();
    });
  }

  /* buyer center头部个人中心列表 */
  $(".buyer-menu").hover(
    function() {
      $(this)
        .find("ul")
        .slideDown(100);
    },
    function() {
      $(this)
        .find("ul")
        .slideUp(100);
    }
  );

  /* footer定位 */
  if ($(document.body).height() < $(window).height()) {
    $(".footer").css({ position: "fixed", bottom: "0", left: "0" });
  }

  var $pageNumberItem = $("[data-page-number]");
  // 页码
  $pageNumberItem.click(function() {
    var $element = $(this);
    var $form = $element.closest("form");
    var $pageNumber = $form.find("input[name='pageNumber']");
    var pageNumber = $element.data("page-number");
    var currentPageNumber = parseInt($("#currentPageNumberId").val());

    if ($form.length > 0 && pageNumber && pageNumber != currentPageNumber) {
      if ($pageNumber.length > 0) {
        $pageNumber.val(pageNumber);
      } else {
        $form.append(
          '<input name="pageNumber" type="hidden" value="' + pageNumber + '">'
        );
      }

      $("#goToPageNumber").attr("disabled", "disabled");
      $("#totalPagesId").attr("disabled", "disabled");
      $("#currentPageNumberId").attr("disabled", "disabled");

      $form.submit();
      return false;
    }
    return false;
  });

  $("#goToPageNumber").keyup(function() {
    var $goToPageNumberEle = $("#goToPageElement");
    var pageNumber = $(this).val();
    if (/^-?\d+$/.test(pageNumber)) {
      var iTotalPages = parseInt($("#totalPagesId").val());
      var iPageNumber = parseInt(pageNumber);
      if (iPageNumber < 1) {
        iPageNumber = 1;
      } else if (iPageNumber > iTotalPages) {
        iPageNumber = iTotalPages;
      }
      $goToPageNumberEle.data("page-number", iPageNumber);
    }
  });
});
