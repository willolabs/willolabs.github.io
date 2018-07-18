/* WilloLabs JS */

/* Set the height of the current slide to browser viewport */
/* Plus a little for breathing room */
/* Thanks Stack Overflow */

    var windowHeight = $(window).height();
    var offsetHeight = 10;
    var windowHeight = windowHeight + offsetHeight;

    var headerHeight = $('#header').height();
    var sectionOffset = 40;
    var sectionPadding = headerHeight + sectionOffset;


    $('.section.cover').css('min-height', windowHeight );
    $('.section.first').css('padding-top',sectionPadding);

    $(window).resize(function() {
        
        windowHeight = $(window).height();
        $('.section.cover').css('min-height',windowHeight);
        
        var headerHeight = $('#header').height();
        var offsetHeight = 10;
        var windowHeight = windowHeight + offsetHeight;
        var sectionOffset = 40;
        var sectionPadding = headerHeight + sectionOffset;        
        
        $('.section.cover.first').css('padding-top',sectionPadding);
        
        // if (jQuery('#header').hasClass('expanded')) {
        //    $('.section').css('padding-top',sectionPadding);
        // }
        
        
    });


    $(window).on("resize", function() {
        windowWidth = $(window).width();
        if (windowWidth <= 520) {
            $('#navigation').addClass('collapsed');
        }

        if (windowWidth >= 520) {
            $('#navigation').removeClass('collapsed');
        }
    }).resize();

    // Handle the navigation behavior
    $(document).ready(function() {

        $('.js-hamburger-link').click(function() {

            if ($('#navigation ul').hasClass('sidebar')) {
                $('#navigation.collapsed ul').removeClass('sidebar');
                $('#header, #main').removeClass('slide transition');
                $('body').css('overflow-x','visible');
            } else {
                $('#navigation.collapsed ul.main-menu').addClass('sidebar');
                $('#header, #main').addClass('slide transition');
                $('body').css('overflow-x','hidden');
            }

        });

        $('.js-toggle-menu').click(function() {

            if ($('#navigation ul').hasClass('sidebar')) {
                $('#navigation.collapsed ul').removeClass('sidebar');
                $('#header, #main').removeClass('slide transition');
                $('body').css('overflow-x','visible');
            } 

        });

    });



    /* -- jquery smooth scroll to id's */
    /* http://sikwati.com/blog/jquery-smooth-scroll/ */
    $(document).ready(function() {

        $('.js-to-section').click(function() {
           $('html,body').animate({ 
            scrollTop: $('#value-diagram').offset().top
           }, 'slow'); 
        });

        /* If I were smarter, this would be a named function */
        /* It's hard to think when a cat is sitting on your arm */
        $('#navigation .institutions').click(function() {
            $('html,body').animate({
                scrollTop: $('#institutions').offset().top 
            }, 'slow');
        });
        $('#navigation .providers').click(function() {
            $('html,body').animate({
                scrollTop: $('#providers').offset().top 
            }, 'slow');
        });
        $('#navigation .collegeRetailers').click(function() {
            $('html,body').animate({
                scrollTop: $('#collegeRetailers').offset().top
            }, 'slow');
        });
        $('#navigation .accessibilityStatement').click(function() {
            $('html,body').animate({
                scrollTop: $('#accessibilityStatement').offset().top
            }, 'slow');
        });
        $('#navigation .contact').click(function() {
            $('html,body').animate({
                scrollTop: $('#contact').offset().top 
            }, 'slow');
        });
        $('.solutionsLink').click(function() {
            $('html,body').animate({
                scrollTop: $('#solutions').offset().top 
            }, 'slow');
        });

    });

    /* Copyright Date */
    $(document).ready(function() {
        var date = new Date();
        var currentYear = date.getFullYear();
        $('.js-copyright').append(currentYear);
    });

    /* Toggle Willo Works List - Not Used */
    $(document).ready(function() { 
        /* Listen for click, swap classes */
        $('.js-toggle-bullet').each(function() {
           $(this).click(function() {
              $(this).addClass('expanded');
               $('.js-toggle-bullet').not(this).removeClass('expanded');    

           });
        });
    });
    /* yeah, I could use .toggle() but I don't like it some times */