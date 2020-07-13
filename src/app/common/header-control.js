export const headerControl = ($container) => {
    let lastScrollTop = 0;
    let startScrollTopPos = null;
    const func = function() {
        let st = $(this).scrollTop();

        if (st == 0) {
            $container.removeClass("fixed");
            $container.removeClass("show-header");
            startScrollTopPos = null;
        }

        if (st > 80) {
            $container.addClass("transition");
        } else {
            $container.removeClass("transition");
        }

        if (st >= 65) {

            $container.addClass("fixed");
            if (startScrollTopPos && startScrollTopPos < 65) startScrollTopPos = 65;

            if (startScrollTopPos && startScrollTopPos - st >= 10) {
                startScrollTopPos = st;
                $container.addClass("show-header");
                return;
            }

            if (startScrollTopPos && st - startScrollTopPos > 10) {
                $container.removeClass("show-header");
                startScrollTopPos = null;
                return;
            }


            if (st <= lastScrollTop && !startScrollTopPos) {
                startScrollTopPos = st;
                return;
            }
        }


        lastScrollTop = st;
    };

    return {
        startControl: () => {
            $(window).on("scroll", func);
        },
        stopControl: () => {
            $(window).off("scroll", func)
        }
    }


};
