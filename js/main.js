(function ($) {
    "use strict";

    // Audio handling setup
    $(document).ready(function () {
        var audio = document.getElementById('backgroundMusic');
        var isPlaying = false;

        // Function to toggle audio playback
        function toggleAudio() {
            if (isPlaying) {
                audio.pause();
                if (muteButton) muteButton.querySelector('img').src = 'img/music-stop-icon.png';
            } else {
                audio.play().catch(function (error) {
                    console.log("Audio play failed:", error);
                });
                if (muteButton) muteButton.querySelector('img').src = 'img/music-icon.png';
            }
            isPlaying = !isPlaying;
        }

        // Handle visibility change
        function handleVisibilityChange() {
            if (!audio) return;
            if (document.hidden) {
                // Store current playing state before pausing
                audio.dataset.wasPlaying = !audio.paused ? 'true' : 'false';
                audio.pause();
            } else if (audio.dataset.wasPlaying === 'true') {
                // Resume playing if it was playing before
                audio.play().catch(function (error) {
                    console.log("Audio play failed:", error);
                });
            }
        }

        // Add event listener for visibility change
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Add mobile-specific event listeners for handling app switching
        window.addEventListener('pagehide', function () {
            if (!audio.paused) {
                audio.dataset.wasPlaying = 'true';
                audio.pause();
            }
        });

        window.addEventListener('pageshow', function () {
            if (audio.dataset.wasPlaying === 'true') {
                audio.play().catch(function (error) {
                    console.log("Audio play failed:", error);
                });
            }
        });

        // Mute button functionality
        var muteButton = document.getElementById('muteButton');
        if (muteButton) {
            muteButton.addEventListener('click', function (event) {
                event.stopPropagation();
                toggleAudio();
            });
        }

        // Start playing on the first user interaction
        document.body.addEventListener('click', function () {
            if (!isPlaying) {
                toggleAudio();
            }
        }, { once: true });
    });

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });

    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });

    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });

    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });

    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });
    
})(jQuery);

// Timer function
function updateTimer() {
    var countDownDate = new Date("May 22, 2025  07:15:30").getTime();
    var now = new Date().getTime();
    var timeLeft = countDownDate - now;

    var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    var timerElement = document.querySelector(".timer");
    if (timerElement) {
        timerElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
        if (timeLeft < 0) {
            timerElement.innerHTML = "Timer Finished";
        }
    } else {
        console.error("Timer element not found");
    }
}

// Start the timer when the document is ready
$(document).ready(function() {
    updateTimer();
    setInterval(updateTimer, 1000);
});

// Add to Calendar function
function addToCalendar(e) {
    e.preventDefault();
    
    var startDate = new Date('2024-12-07T10:00:00');
    var endDate = new Date('2024-12-07T22:00:00');
    
    var calendarEvent = {
        title: "Kunal & Supriya Engagement",
        description: "We are excited to celebrate our special day with you!",
        location: "Cafe De Flora, Delhi",
        start: startDate.toISOString(),
        end: endDate.toISOString()
    };

    if (navigator.share) {
        navigator.share({
            title: calendarEvent.title,
            text: calendarEvent.description,
            url: window.location.href
        }).then(() => {
            console.log('Thanks for sharing!');
        })
        .catch(console.error);
    } else {
        // Fallback to downloading ICS file
        var icsFile = 
            'BEGIN:VCALENDAR\n' +
            'VERSION:2.0\n' +
            'BEGIN:VEVENT\n' +
            'URL:' + window.location.href + '\n' +
            'DTSTART:' + startDate.toISOString().replace(/-|:|\.\d\d\d/g, '') + '\n' +
            'DTEND:' + endDate.toISOString().replace(/-|:|\.\d\d\d/g, '') + '\n' +
            'SUMMARY:' + calendarEvent.title + '\n' +
            'DESCRIPTION:' + calendarEvent.description + '\n' +
            'LOCATION:' + calendarEvent.location + '\n' +
            'END:VEVENT\n' +
            'END:VCALENDAR';

        var blob = new Blob([icsFile], { type: 'text/calendar;charset=utf-8' });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Engagement_Invitation.ics";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

// Download Invitation function
function downloadInvitation(e) {
    e.preventDefault();
    
    var link = document.createElement('a');
    link.href = 'img/invite.mp4';
    link.download = 'Wedding_Invitation.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
