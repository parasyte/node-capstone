// Source view toggles
$("a.toggle-code").click(function (event) {
    event.preventDefault();
    toggle($(this));
});

function toggle($el) {
    $el.nextAll(".toggle-code").toggle(250);
}


// Smooth-scroll anchor links
$('a[href*="#"]:not([href="#"])').click(function () {
    if (location.hostname === this.hostname &&
        location.pathname === this.pathname) {
        var $target = $(this.hash);
        if ($target.length) {
            $("body").animate({
                "scrollTop" : $target.offset().top,
                "easing" : "easeOutQuint",
            }, 250);
        }
    }
});
