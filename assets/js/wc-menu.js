!(function (e) {
  function t(e, a) {
    var t = e.find(
      ".pa-txt-sc__effect-min-mask .pa-txt-sc__main-item.pa-txt-sc__item-text"
    );
    if (e.hasClass("premium-mask-yes") || t.length) {
      if ("premium-addon-title.default" === e.data("widget_type")) {
        var i = ".premium-title-header";
        e.find(i)
          .find(".premium-title-icon, .premium-title-img")
          .addClass("premium-mask-span");
      } else if ("premium-textual-showcase.default" === e.data("widget_type"))
        i = ".pa-txt-sc__effect-min-mask";
      else i = ".premium-dual-header-first-header";
      e
        .find(i)
        .find(
          "span:not(.premium-title-style7-stripe-wrap):not(.premium-title-img):not(.pa-txt-sc__hov-item)"
        )
        .each(function (e, t) {
          var i = "";
          a(this)
            .text()
            .split(" ")
            .forEach(function (e) {
              "" !== e &&
                (i += ' <span class="premium-mask-span">' + e + "</span>");
            }),
            a(this).text("").append(i);
        }),
        elementorFrontend.waypoint(e, function () {
          t.length
            ? a(t).addClass("premium-mask-active")
            : a(e).addClass("premium-mask-active");
        });
    }
  }
  e(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-dual-header.default",
      t
    );
  });
})(jQuery);
!(function (e) {
  function t(e, u) {
    var i = e.find(".premium-button-style6-bg");
    0 !== i.length &&
      e.hasClass("premium-mouse-detect-yes") &&
      e.on("mouseenter mouseleave", ".premium-button-style6", function (e) {
        var t = u(this).offset(),
          n = e.pageX - t.left,
          o = e.pageY - t.top;
        i.css({ top: o, left: n });
      });
  }
  e(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/premium-addon-button.default",
      t
    );
  });
})(jQuery);
