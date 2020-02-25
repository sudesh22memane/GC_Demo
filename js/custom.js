


$(document).ready(function () {

    // Global variables
    var $loadG = $('#loadGallery'),
        $dots = $('#dots'),
        $more = $('#more'),
        $mybtn = $('#myBtn');

    $.ajax({
        url: "https://picsum.photos/v2/list?limit=10",
        success: function (data) {
            $.each(data, function (i, field) {
                $(".slider").append("<div class='slide'><img src=" + field.download_url + '.jpg' + " /> <p class='author-nm'>" + field.author + "</p></div> ");
            });

            // Allow gallery click only when data is ready.
            $loadG.prop("disabled", false);
            $loadG.text("Show gallery");

            // Load slick slider on button click 
            $(".primary").on('click', function () {

                $(".slider").not('.slick-initialized').slick({
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<div class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></div>',
                    nextArrow: '<div class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></div>',
                    dots: false,
                    infinite: true,
                });

                // Hide text when open image slider
                if ($dots.css("display") == "none") {
                    $dots.show();
                    $more.hide();
                    $mybtn.text("More");
                }
            });

        }, error: function () {

            // Show error message if image will not load
            $loadG.prop("disabled", false);
            $loadG.text("Show gallery");
            
            // Error in modal
            $(".slider").append('<h4 class="callout alert">Something went wrong</h4>')

        }

    });

    // code for show/hide text in paragraph
    $mybtn.on('click', function () {
        if ($dots.css("display") == "none") {
            $dots.show();
            $more.slideUp(150);
            $mybtn.text("More");
        } else {
            $mybtn.text("Read Less");
            $dots.hide();
            $more.slideDown(200);
        }

    });

});



