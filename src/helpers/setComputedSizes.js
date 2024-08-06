export function setComputedSizes() {
    if(window.innerWidth <= 375) {
        const y = window.innerHeight / 730;
        const x = window.innerWidth / 430;

        // header
        document.querySelectorAll('header.header').forEach(el => {
            el.style.padding = `0 ${27 * x}px`;
            el.style.flex = `1 0 ${85 * y}px`;
        });

        // header__logo
        document.querySelectorAll('.header__logo *').forEach(el => {
            el.style.width = `${125 * x}px`;
        });

        // header__nav
        document.querySelectorAll('.header__nav').forEach(el => {
            el.style.height = `calc(100% - ${(80 * y) + (85 * y) - 2}px)`;
            el.style.top = `${85 * y}px`;
        });

        // header__link
        document.querySelectorAll('.header__link a').forEach(el => {
            el.style.fontSize = `${24 * y}px`;
        });

        document.querySelectorAll('.header__link.header__link-terms a').forEach(el => {
            el.style.fontSize = `${16 * y}px`;
        });

        document.querySelectorAll('.header__link.header__link-terms span').forEach(el => {
            el.style.fontSize = `${16 * y}px`;
        });

        // footer
        document.querySelectorAll('.footer').forEach(el => {
            el.style.padding = `${24 * y}px ${30 * x}px`;
            el.style.flex = `1 0 ${80 * y}px`;
        });

        // footer copyright
        document.querySelectorAll('.footer__copyright--mobile').forEach(el => {
            el.style.fontSize = `${10 * y}px`;
        });

        // footer links
        document.querySelectorAll('.footer__instagram img').forEach(el => {
            el.style.width = `${20.44 * x}px`;
        });

        document.querySelectorAll('.footer__appstore.mobile').forEach(el => {
            el.style.fontSize = `${10 * y}px`;
            el.querySelector('img').style.width = `${15.64 * x}px`;
        });

        document.querySelectorAll('.footer__googleplay.mobile').forEach(el => {
            el.style.fontSize = `${10 * y}px`;
            el.querySelector('img').style.width = `${15.67 * x}px`;
        });

        // .show
        document.querySelectorAll('.show__details').forEach(el => {
            el.style.padding = `${34 * y}px ${30 * x}px`;
        });

        // .show__image img
        document.querySelectorAll('.show__image img').forEach(el => {
            el.style.height = `${371 * y}px`;
        });

        // #show .stream-date-wrapper
        document.querySelectorAll('.show__date').forEach(el => {
            el.style.fontSize = `${15.4 * y}px`;
        });

        // tracklist button
        document.querySelectorAll('.show-tracklist-button img').forEach(el => {
            el.style.width = `${87 * x}px`;
        });

        // .show__title
        document.querySelectorAll('.show__title').forEach(el => {
            el.style.fontSize = `${33 * y}px`;
            el.style.margin = `${12 * y}px 0 ${8 * y}px 0`;
        });

        // .show__author
        document.querySelectorAll('.show__author').forEach(el => {
            el.style.fontSize = `${19 * y}px`;
            el.style.marginBottom = `${20 * y}px`;
        });

        // .show__author em
        document.querySelectorAll('.show__author em').forEach(el => {
            el.style.fontSize = `${31 * y}px`;
            el.style.marginLeft = `${4 * x}px`;
        });

        // .show__description
        document.querySelectorAll('.show__description').forEach(el => {
            el.style.fontSize = `${15.4 * y}px`;
        });

        // .radio__timer
        document.querySelectorAll('.radio__timer span').forEach(el => {
            el.style.fontSize = `${68 * y}px`;
        });

        // .show__player
        document.querySelectorAll('.show__player').forEach(el => {
            el.style.padding = `0 ${30 * x}px`;
            el.style.margin = `${31 * y}px -${30 * x}px 0 -${30 * x}px`;
        });

        // .show__player icon
        document.querySelectorAll('.archive-player__icon').forEach(el => {
            el.style.width = `${48 * x}px`;
            el.style.top = `-${48 * y}px`;
        });

        // .current-track
        document.querySelectorAll('.current-track').forEach(el => {
            el.style.padding = `${24 * y}px ${30 * x}px`;
            el.style.height = `${120 * y}px`;
        });

        // .current-track > p
        document.querySelectorAll('.current-track > p').forEach(el => {
            el.style.fontSize = `${15.4 * y}px`;
            el.style.marginRight = `${32 * x}px`;
        });

        // .current-track__title
        document.querySelectorAll('.current-track__title').forEach(el => {
            el.style.fontSize = `${15.4 * y}px`;
        });

        // .current-track__artist
        document.querySelectorAll('.current-track__artist').forEach(el => {
            el.style.fontSize = `${15.4 * y}px`;
        });

        // .current-track__label
        document.querySelectorAll('.current-track__label').forEach(el => {
            el.style.fontSize = `${14 * y}px`;
        });

        // .current-track__info .marquee-container
        document.querySelectorAll('.current-track__info .marquee-container').forEach(el => {
            el.style.marginBottom = `${11 * y}px`;
        });

        // .player-button
        document.querySelectorAll('.player-button').forEach(el => {
            el.style.width = `${77 * x}px`;
            el.style.height = `${77 * x}px`;
        });

        // .curator__name
        document.querySelectorAll('section.curator .curator__name').forEach(el => {
            el.style.fontSize = `${36 * y}px`;
            el.style.paddingInline = `${30 * x}px`;
        });

        // .curator__about
        document.querySelectorAll('section.curator .curator__about').forEach(el => {
            el.style.fontSize = `${15.4 * y}px`;
            el.style.paddingInline = `${30 * x}px`;
        });

        // .close-button
        document.querySelectorAll('.close-button').forEach(el => {
            el.style.width = `${36 * x}px`;
            el.style.left = `${30 * x}px`;
            el.querySelector('img').style.width = `${19 * x}px`;
        });

        document.querySelectorAll('section.curator > .close-button').forEach(el => {
            el.style.top = `${85 * y + 24}px`;
        });

        // .faux-crop
        document.querySelectorAll('.faux-crop, section.curator .curator__photo').forEach(el => {
            el.style.inset = `${85 * y}px 0 auto`;
        });

        // .curator__links
        document.querySelectorAll('.curator__links').forEach(el => {
            el.style.padding = `${12 * y}px ${30 * x}px`;
        });

        document.querySelectorAll('.curator__link').forEach(el => {
            el.style.width = `${36 * x}px`;
            el.querySelector('img').style.width = `${18 * x}px`;
        });

        // .archive
        document.querySelectorAll('.archive').forEach(el => {
            el.style.padding = `${24 * y}px ${24 * x}px`;
        });

        document.querySelectorAll('.archive-preview').forEach(el => {
            el.style.padding = `${18 * y}px ${22 * x}px`;
        });

        document.querySelectorAll('.archive-preview__date').forEach(el => {
            el.style.fontSize = `${12 * y}px`;
        });

        document.querySelectorAll('.archive-preview__title').forEach(el => {
            el.style.fontSize = `${32 * y}px`;
        });

        document.querySelectorAll('.archive-preview__author').forEach(el => {
            el.style.fontSize = `${16 * y}px`;
            el.querySelector('em').style.fontSize = `${22 * y}px`;
        });

        document.querySelectorAll('.archive-preview__description').forEach(el => {
            el.style.fontSize = `${15.4 * y}px`;
        });

        document.querySelectorAll('.archive-preview__button').forEach(el => {
            el.style.width = `${48 * x}px`;
            el.style.height = `${48 * x}px`;
            if( el.classList.contains('share-button') ) {
                el.querySelector('img').style.width = `${22 * x}px`;
            } else if( el.classList.contains('archive-preview__button--visit') ) {
                el.querySelector('img').style.width = `${32 * x}px`;
            }
            
        });

        // tracklist
        document.querySelectorAll('.archive__tracklist-mobile').forEach(el => {
            el.style.padding = `${18 * y}px ${30 * x}px`;
        });

        document.querySelectorAll('.archive__tracklist-mobile-info span').forEach(el => {
            el.style.fontSize = `${12 * y}px`;
        });

        document.querySelectorAll('.archive__tracklist-mobile-info h3').forEach(el => {
            el.style.fontSize = `${19 * y}px`;
        });

        document.querySelectorAll('.archive__tracklist-mobile-info h4').forEach(el => {
            el.style.fontSize = `${14 * y}px`;
            el.querySelector('em').style.fontSize = `${22 * y}px`;
        });

        document.querySelectorAll('.archive__tracklist-mobile-controls button').forEach(el => {
            el.style.width = `${36 * x}px`;
            el.style.height = `${36 * x}px`;
            el.style.minWidth = 'unset';
            el.querySelector('img').style.width = `${15.4 * y}px`;
        });

        document.querySelectorAll('.archive__tracklist-mobile-close').forEach(el => {
            el.style.marginBottom = `${19 * y}px`;
        });


        document.querySelectorAll('.archive__tracks').forEach(el => {
            el.style.padding = `${16 * y}px ${30 * x}px`;
        });

        document.querySelectorAll('.archive__track-number').forEach(el => {
            el.style.width = `${36 * x}px`;
            el.style.height = `${36 * x}px`;
            el.style.fontSize = `${14 * y}px`;
            el.style.minWidth = 'unset';
            el.style.marginRight = `${26 * x}px`;
        });

        document.querySelectorAll('.archive__track-title').forEach(el => {
            el.style.fontSize = `${15 * y}px`;
        });

        document.querySelectorAll('.archive__track-author').forEach(el => {
            el.style.fontSize = `${13 * y}px`;
            el.querySelector('em').style.fontSize = `${17 * y}px`;
        });

        document.querySelectorAll('.archive__track-label').forEach(el => {
            el.style.fontSize = `${12 * y}px`;
        });

        // about
        document.querySelectorAll('.about__text p').forEach(el => {
            el.style.fontSize = `${30 * y}px`;
            el.style.marginBottom = `${20 * y}px`;
        });

        document.querySelectorAll('.about__logo').forEach(el => {
            el.style.width = `${152 * x}px`;
        });

        // curators page
        document.querySelectorAll('section.curators .curator__photo').forEach(el => {
            el.style.minWidth = `${90 * x}px`;
            el.style.maxWidth = `${90 * x}px`;
        });

        document.querySelectorAll('section.curators .curator__name').forEach(el => {
            el.style.fontSize = `${26 * y}px`;
        });

        document.querySelectorAll('section.curators .curator__country').forEach(el => {
            el.style.fontSize = `${12 * y}px`;
        });


        // schedule
        document.querySelectorAll('.schedule__week').forEach(el => {
            el.style.padding = `${24 * y}px ${16 * x}px`;
        });

        document.querySelectorAll('.schedule__day').forEach(el => {
            el.querySelector('.schedule__day-name').style.fontSize = `${11.7 * y}px`;

            el.querySelector('.schedule__day-date').style.width = `${40 * x}px`;
            el.querySelector('.schedule__day-date').style.height = `${40 * x}px`;
            el.querySelector('.schedule__day-date').style.fontSize = `${18 * y}px`;
        });

        document.querySelectorAll('.schedule__current').forEach(el => {
            el.style.height = `${235 * y}px`;
        });

        document.querySelectorAll('.schedule__current .schedule-program').forEach(el => {
            el.style.padding = `${27 * y}px ${27 * x}px`;

            el.querySelector('.schedule-program__nowplaying').style.fontSize = `${12.5 * y}px`;
            el.querySelector('.schedule-program__time').style.fontSize = `${17 * y}px`;
            el.querySelector('.schedule-program__time strong').style.fontSize = `${58 * y}px`;
            el.querySelector('.schedule-program__title').style.fontSize = `${26 * y}px`;
            el.querySelector('.schedule-program__author').style.fontSize = `${17 * y}px`;
            // el.querySelector('.schedule-program__author').style.top = `-${48 * y}px`;
            el.querySelector('.schedule-program__author em').style.fontSize = `${25 * y}px`;
            el.querySelector('.schedule-program__description').style.fontSize = `${15.4 * y}px`;
            // el.querySelector('.schedule-program__description').style.top = `-${28 * y}px`;
            el.querySelector('.player-button').style.width = `${58 * x}px`;
            el.querySelector('.player-button').style.height = `${58 * x}px`;
        });

        document.querySelectorAll('.schedule__programs').forEach(el => {
            el.style.padding = `${16 * y}px ${16 * x}px 10px ${16 * x}px`;
        });

        document.querySelectorAll('.schedule__programs .schedule-program').forEach(el => {
            el.querySelector('.schedule-program__time').style.fontSize = `${16 * y}px`;
            el.querySelector('.schedule-program__time strong').style.fontSize = `${52 * y}px`;
            el.querySelector('.schedule-program__title').style.fontSize = `${19 * y}px`;
            el.querySelector('.schedule-program__author').style.fontSize = `${14 * y}px`;
            el.querySelector('.schedule-program__author em').style.fontSize = `${20 * y}px`;
            el.querySelector('.schedule-program__description').style.fontSize = `${12 * y}px`;
        });

        document.querySelectorAll('.schedule-program__preview').forEach(el => {
            el.style.minWidth = `${160 * x}px`;
            el.style.maxWidth = `${160 * x}px`;
        });

        // archive__calendar
        document.querySelectorAll('.archive__calendar--mobile').forEach(el => {
            el.style.padding = `0 ${24 * x}px`;
        });

        document.querySelectorAll('.archive__calendar--mobile .vc-header .vc-arrow').forEach(el => {
            el.style.width = `${36 * x}px`;
            el.style.height = `${36 * x}px`;
        });

        document.querySelectorAll('.archive__calendar--mobile .vc-title-wrapper span').forEach(el => {
            el.style.fontSize = `${15.4 * y}px`;
        });

        document.querySelectorAll('.archive__calendar--mobile .vc-weekday').forEach(el => {
            el.style.fontSize = `${14 * y}px`;
        });

        document.querySelectorAll('.archive__calendar--mobile .vc-weeks').forEach(el => {
            el.style.padding = '0';
        });

        document.querySelectorAll('.vc-weeks > *:not(:last-child)').forEach(el => {
            el.style.marginBottom = `${14 * y}px`;
        });

        document.querySelectorAll('.archive__calendar--mobile .vc-day-content').forEach(el => {
            el.style.width = `${36 * x}px`;
            el.style.height = `${36 * x}px`;
            el.style.fontSize = `${16 * y}px`;
        });

        document.querySelectorAll('.archive__calendar--mobile-controls').forEach(el => {
            el.style.marginTop = `${16 * y}px`;
            el.querySelector('button').style.padding = `${12 * y}px`;
            el.querySelector('button').style.fontSize = `${14 * y}px`;
        });

        document.querySelectorAll('.archive__calendar--mobile-controls button').forEach(el => {
            el.style.padding = `${12 * y}px`;
            el.style.fontSize = `${14 * y}px`;
        });

        // download popup
        document.querySelectorAll('.download-popup__info').forEach(el => {
            el.style.padding = `${32 * y}px ${16 * x}`;
        });

        document.querySelectorAll('.download-popup__logo').forEach(el => {
            el.style.width = `${103 * x}px`;
            el.style.marginBottom = `${48 * y}px`;
        });

        document.querySelectorAll('.download-popup__info > h1').forEach(el => {
            el.style.fontSize = `${40 * y}px`;
            el.style.marginBottom = `${32 * y}px`;
        });

        document.querySelectorAll('.download-popup__info > p').forEach(el => {
            el.style.fontSize = `${20 * y}px`;
            el.style.marginBottom = `${36 * y}px`;
        });

        document.querySelectorAll('.download-popup__info > h2').forEach(el => {
            el.style.fontSize = `${20 * y}px`;
            el.style.marginBottom = `${42 * y}px`;
        });    

        document.querySelectorAll('.download-popup__link').forEach(el => {
            el.style.fontSize = `${18 * y}px`;
        }); 
    }
}
