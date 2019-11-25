(function($) {
  // article-share
  $("body")
    .on("click", function() {
      $(".article-share-box.on").removeClass("on");
    })
    .on("click", ".article-share-link", function(e) {
      e.stopPropagation();

      var $this = $(this),
        url = $this.attr("data-url"),
        qrcode_img = $this.attr("data-qrcode"),
        encodedUrl = encodeURIComponent(url),
        id = "article-share-box-" + $this.attr("data-id"),
        title = document.title,
        offset = $this.offset();

      var weiboUrl = url;

      let contentFirstChild = $(".post-content").children()[0];
      let picUrl = "";
      if (
        contentFirstChild.tagName == "A" &&
        contentFirstChild.getAttribute("class").indexOf("fancybox") > -1
      ) {
        picUrl = contentFirstChild.href;
      }

      if ($("#" + id).length) {
        var box = $("#" + id);

        if (box.hasClass("on")) {
          box.removeClass("on");
          return;
        }
      } else {
        var html = [
          '<div id="' + id + '" class="article-share-box">',
          '<input class="article-share-input" value="' + url + '">',
          '<div class="article-share-links">',
          '<a href="//twitter.com/intent/tweet?text=' +
            encodeURI(title) +
            "&url=" +
            encodedUrl +
            '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
          '<a href="//www.facebook.com/sharer.php?u=' +
            encodedUrl +
            '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
          '<a href="//service.weibo.com/share/share.php?appkey=&searchPic=false&title=' +
            title +
            "&url=" +
            encodeURIComponent(weiboUrl) +
            (picUrl ? "&pic=" + picUrl : "") +
            '" class="article-share-weibo" target="_blank" title="Weibo"></a>',
          '<a href="' +
            qrcode_img +
            '" class="article-share-qrcode" target="_blank" title="QR code"></a>',
          '<div class="qrcode"><img src=' + qrcode_img + "></div>",
          "</div>",
          "</div>"
        ].join("");

        var box = $(html);

        $("body").append(box);
      }

      $(".article-share-box.on").hide();

      box
        .css({
          top: offset.top + 25,
          left: offset.left
        })
        .addClass("on");
    })
    .on("click", ".article-share-box", function(e) {
      e.stopPropagation();
    })
    .on("click", ".article-share-box-input", function() {
      $(this).select();
    })
    .on("click", ".article-share-box-link", function(e) {
      e.preventDefault();
      e.stopPropagation();

      window.open(
        this.href,
        "article-share-box-window-" + Date.now(),
        "width=500,height=450"
      );
    });

  var curLang = $(".article-other-lang").attr("data-current-lang"),
    pageLink = $(".article-other-lang").attr("data-url");

  var href = "";
  var temp = pageLink.split("/");

  switch (curLang) {
    case "en":
      var idx = temp.findIndex(function(char) {
        return char == "en";
      });
      if (idx > -1) {
        temp.splice(idx, 1);
        href = temp.join("/");
        $(".article-other-lang").attr("href", href);
      } else {
        $(".article-other-lang").hide();
      }
      break;
    case "zh":
      var idx = temp.findIndex(function(char) {
        return char == "blog.decay.fun";
      });
      if (idx > -1) {
        temp.splice(idx + 1, 0, "en");
        href = temp.join("/");
        $(".article-other-lang").attr("href", href);
      } else {
        $(".article-other-lang").hide();
      }
      break;
  }
})(jQuery);
