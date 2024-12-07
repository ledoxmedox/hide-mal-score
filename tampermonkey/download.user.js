// ==UserScript==
// @name         Hide MyAnimeList Score
// @version      0.5
// @description  Hide the score on MyAnimeList
// @author       ledoxmedox
// @match        https://myanimelist.net/*
// @run-at       document-start
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_getValue
// @icon         https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://myanimelist.net&size=64
// @updateURL    https://github.com/ledoxmedox/hide-mal-score/raw/master/tampermonkey/download.user.js
// @downloadURL  https://github.com/ledoxmedox/hide-mal-score/raw/master/tampermonkey/download.user.js
// ==/UserScript==

(function() {
    'use strict';

    const selectors = [
    // https://myanimelist.net/anime/7791/K-On
    '.score.fl-l > .score-label',

    // https://myanimelist.net/anime/genre/4/Comedy
    'tr:nth-of-type(n+2):nth-of-type(-n+101) > td.bgColor0.ac.borderClass:nth-of-type(5)',
    'tr:nth-of-type(n+2):nth-of-type(-n+101) > td.bgColor1.ac.borderClass:nth-of-type(5)',

    // https://myanimelist.net/anime/producer/2/Kyoto_Animation
    'tr.js-anime-type-1.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-2.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-3.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-4.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-5.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-6.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-7.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-8.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-9.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-10.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',

    // Unused?
    // https://myanimelist.net/anime/producer/2/Kyoto_Animation
    'div.di-ib.js-statistics-info.po-r.spaceit_pad > .score-10.score-label',
    'div.di-ib.js-statistics-info.po-r.spaceit_pad > .score-9.score-label',
    'div.di-ib.js-statistics-info.po-r.spaceit_pad > .score-8.score-label',
    'div.di-ib.js-statistics-info.po-r.spaceit_pad > .score-7.score-label',
    'div.di-ib.js-statistics-info.po-r.spaceit_pad > .score-6.score-label',
    'div.di-ib.js-statistics-info.po-r.spaceit_pad > .score-5.score-label',
    'div.di-ib.js-statistics-info.po-r.spaceit_pad > .score-4.score-label',
    'div.di-ib.js-statistics-info.po-r.spaceit_pad > .score-3.score-label',
    'div.di-ib.js-statistics-info.po-r.spaceit_pad > .score-2.score-label',
    'div.di-ib.js-statistics-info.po-r.spaceit_pad > .score-1.score-label',

    // https://myanimelist.net/#:~:text=Latest%20Anime%20Reviews
    '.fl-r.di-ib.lightLink.fs10',

    // https://myanimelist.net/profile/ledoxmedox#:~:text=Last%20Anime%20Updates
    '.score-10.score-label.completed.anime.text',
    '.score-9.score-label.completed.anime.text',
    '.score-8.score-label.completed.anime.text',
    '.score-7.score-label.completed.anime.text',
    '.score-6.score-label.completed.anime.text',
    '.score-5.score-label.completed.anime.text',
    '.score-4.score-label.completed.anime.text',
    '.score-3.score-label.completed.anime.text',
    '.score-2.score-label.completed.anime.text',
    '.score-1.score-label.completed.anime.text',

    '.score-10.score-label.watching.anime.text',
    '.score-9.score-label.watching.anime.text',
    '.score-8.score-label.watching.anime.text',
    '.score-7.score-label.watching.anime.text',
    '.score-6.score-label.watching.anime.text',
    '.score-5.score-label.watching.anime.text',
    '.score-4.score-label.watching.anime.text',
    '.score-3.score-label.watching.anime.text',
    '.score-2.score-label.watching.anime.text',
    '.score-1.score-label.watching.anime.text',

    '.score-10.score-label.dropped.anime.text',
    '.score-9.score-label.dropped.anime.text',
    '.score-8.score-label.dropped.anime.text',
    '.score-7.score-label.dropped.anime.text',
    '.score-6.score-label.dropped.anime.text',
    '.score-5.score-label.dropped.anime.text',
    '.score-4.score-label.dropped.anime.text',
    '.score-3.score-label.dropped.anime.text',
    '.score-2.score-label.dropped.anime.text',
    '.score-1.score-label.dropped.anime.text',

    '.score-10.score-label.on_hold.anime.text',
    '.score-9.score-label.on_hold.anime.text',
    '.score-8.score-label.on_hold.anime.text',
    '.score-7.score-label.on_hold.anime.text',
    '.score-6.score-label.on_hold.anime.text',
    '.score-5.score-label.on_hold.anime.text',
    '.score-4.score-label.on_hold.anime.text',
    '.score-3.score-label.on_hold.anime.text',
    '.score-2.score-label.on_hold.anime.text',
    '.score-1.score-label.on_hold.anime.text',

    // https://myanimelist.net/profile/ledoxmedox#:~:text=Last%20Manga%20Updates
    '.score-1.score-label.completed.manga.text',
    '.score-2.score-label.completed.manga.text',
    '.score-3.score-label.completed.manga.text',
    '.score-4.score-label.completed.manga.text',
    '.score-5.score-label.completed.manga.text',
    '.score-6.score-label.completed.manga.text',
    '.score-7.score-label.completed.manga.text',
    '.score-8.score-label.completed.manga.text',
    '.score-9.score-label.completed.manga.text',
    '.score-10.score-label.completed.manga.text',

    '.score-1.score-label.reading.manga.text',
    '.score-2.score-label.reading.manga.text',
    '.score-3.score-label.reading.manga.text',
    '.score-4.score-label.reading.manga.text',
    '.score-5.score-label.reading.manga.text',
    '.score-6.score-label.reading.manga.text',
    '.score-7.score-label.reading.manga.text',
    '.score-8.score-label.reading.manga.text',
    '.score-9.score-label.reading.manga.text',
    '.score-10.score-label.reading.manga.text',

    '.score-1.score-label.hold.manga.text',
    '.score-2.score-label.hold.manga.text',
    '.score-3.score-label.hold.manga.text',
    '.score-4.score-label.hold.manga.text',
    '.score-5.score-label.hold.manga.text',
    '.score-6.score-label.hold.manga.text',
    '.score-7.score-label.hold.manga.text',
    '.score-8.score-label.hold.manga.text',
    '.score-9.score-label.hold.manga.text',
    '.score-10.score-label.hold.manga.text',

    '.score-1.score-label.on_hold.manga.text',
    '.score-2.score-label.on_hold.manga.text',
    '.score-3.score-label.on_hold.manga.text',
    '.score-4.score-label.on_hold.manga.text',
    '.score-5.score-label.on_hold.manga.text',
    '.score-6.score-label.on_hold.manga.text',
    '.score-7.score-label.on_hold.manga.text',
    '.score-8.score-label.on_hold.manga.text',
    '.score-9.score-label.on_hold.manga.text',
    '.score-10.score-label.on_hold.manga.text',

    '.score-1.score-label.dropped.manga.text',
    '.score-2.score-label.dropped.manga.text',
    '.score-3.score-label.dropped.manga.text',
    '.score-4.score-label.dropped.manga.text',
    '.score-5.score-label.dropped.manga.text',
    '.score-6.score-label.dropped.manga.text',
    '.score-7.score-label.dropped.manga.text',
    '.score-8.score-label.dropped.manga.text',
    '.score-9.score-label.dropped.manga.text',
    '.score-10.score-label.dropped.manga.text',

    // https://myanimelist.net/people/31707/Perfume#:~:text=Anime%20Staff%20Positions
    'tr.js-anime-watch-status-people-manga-notinmylist.js-people-manga > td.borderClass > div.spaceit_pad > .mr4.icon-people-score-star',
    'tr.js-anime-watch-status-people-staff-notinmylist.js-people-staff > td.borderClass > div.spaceit_pad > .mr4.icon-people-score-star',
    'tr.js-anime-watch-status-people-staff-inmylist.js-people-staff > td.borderClass > div.spaceit_pad > .mr4.icon-people-score-star',
    'tr.js-anime-watch-status-people-staff-notinmylist.js-people-staff > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-watch-status-people-staff-inmylist.js-people-staff > td.borderClass > div.spaceit_pad > span',
    '.js-anime-watch-status-people-staff-plantowatch.js-people-staff > td.borderClass > div.spaceit_pad > span',

    // Any view style
    // https://myanimelist.net/anime/producer/2/Kyoto_Animation
    // or
    // https://myanimelist.net/anime/season/2021/summer
    'div.js-anime-type-1.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > .widget > .stars',
    'div.js-anime-type-2.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > .widget > .stars',
    'div.js-anime-type-3.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > .widget > .stars',
    'div.js-anime-type-4.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > .widget > .stars',
    'div.js-anime-type-5.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > .widget > .stars',
    'div.js-anime-type-6.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > .widget > .stars',
    'div.js-anime-type-7.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > .widget > .stars',
    'div.js-anime-type-8.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > .widget > .stars',
    'div.js-anime-type-9.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > .widget > .stars',
    'div.js-anime-type-10.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > .widget > .stars',

    'tr.js-anime-type-1.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-2.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-3.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-4.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-5.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-6.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-7.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-8.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-9.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-10.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-studio > td.borderClass > div.spaceit_pad > span',

    '.js-anime-type-1.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > .widget > .stars',
    '.js-anime-type-2.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > .widget > .stars',
    '.js-anime-type-3.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > .widget > .stars',
    '.js-anime-type-4.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > .widget > .stars',
    '.js-anime-type-5.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > .widget > .stars',
    '.js-anime-type-6.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > .widget > .stars',
    '.js-anime-type-7.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > .widget > .stars',
    '.js-anime-type-8.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > .widget > .stars',
    '.js-anime-type-9.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > .widget > .stars',
    '.js-anime-type-10.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > .widget > .stars',

    '.score-10.score-label.score.scormem-item',
    '.score-9.score-label.score.scormem-item',
    '.score-8.score-label.score.scormem-item',
    '.score-7.score-label.score.scormem-item',
    '.score-6.score-label.score.scormem-item',
    '.score-5.score-label.score.scormem-item',
    '.score-4.score-label.score.scormem-item',
    '.score-3.score-label.score.scormem-item',
    '.score-2.score-label.score.scormem-item',
    '.score-1.score-label.score.scormem-item',

    // https://myanimelist.net/anime/44511/Chainsaw_Man#:~:text=Statistics,users)
    '.di-i.js-statistics-info.po-r.spaceit_pad .score-1.score-label',
    '.di-i.js-statistics-info.po-r.spaceit_pad .score-2.score-label',
    '.di-i.js-statistics-info.po-r.spaceit_pad .score-3.score-label',
    '.di-i.js-statistics-info.po-r.spaceit_pad .score-4.score-label',
    '.di-i.js-statistics-info.po-r.spaceit_pad .score-5.score-label',
    '.di-i.js-statistics-info.po-r.spaceit_pad .score-6.score-label',
    '.di-i.js-statistics-info.po-r.spaceit_pad .score-7.score-label',
    '.di-i.js-statistics-info.po-r.spaceit_pad .score-8.score-label',
    '.di-i.js-statistics-info.po-r.spaceit_pad .score-9.score-label',
    '.di-i.js-statistics-info.po-r.spaceit_pad .score-10.score-label',

    // Unused?
    // https://myanimelist.net/reviews.php?t=manga
    // https://myanimelist.net/reviews.php?t=anime
    // https://myanimelist.net/anime/12031/Kingdom/reviews
    // https://myanimelist.net/manga/2/Berserk/reviews
    '.js-hidden.mb20.mt20.rating',
    'div.borderDark:nth-of-type(1) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(2) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(3) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(4) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(5) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(6) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(7) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(8) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(9) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(10) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(11) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(12) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(13) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(14) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(15) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(16) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(17) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(18) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(19) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(20) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(21) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(22) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(23) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(24) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(25) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(26) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(27) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(28) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(29) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(30) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(31) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(32) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(33) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(34) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(35) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(36) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(37) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(38) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(39) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(40) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(41) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(42) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(43) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(44) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(45) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(46) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(47) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(48) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(49) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',
    'div.borderDark:nth-of-type(50) > div.spaceit:nth-of-type(1) > .mb8 > div:nth-of-type(3)',

    // Random ⭐ symbol logo studio thing movie only (not TV)
    '.js-anime-type-1.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass:nth-of-type(3) > div.spaceit_pad:nth-of-type(1) > span',
    'tr.js-anime-type-3.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer:nth-of-type(8) > td.borderClass:nth-of-type(3) > div.spaceit_pad:nth-of-type(1) > span',
    'tr.js-anime-type-3.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer:nth-of-type(11) > td.borderClass:nth-of-type(3) > div.spaceit_pad:nth-of-type(1) > span',
    '.js-anime-type-4.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass:nth-of-type(3) > div.spaceit_pad:nth-of-type(1) > span',
    '.js-anime-type-5.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass:nth-of-type(3) > div.spaceit_pad:nth-of-type(1) > span',

    // https://myanimelist.net/topanime.php#:~:text=Score
    // https://myanimelist.net/topmanga.php#:~:text=Score
    '.al.di-ib.js-top-ranking-score-col > .on.mr4.fa-star.fa-solid.icon-score-star',
    '.al.di-ib.js-top-ranking-score-col > .score-10.score-label.on.text',
    '.al.di-ib.js-top-ranking-score-col > .score-9.score-label.on.text',
    '.al.di-ib.js-top-ranking-score-col > .score-8.score-label.on.text',
    '.al.di-ib.js-top-ranking-score-col > .score-7.score-label.on.text',
    '.al.di-ib.js-top-ranking-score-col > .score-6.score-label.on.text',
    '.al.di-ib.js-top-ranking-score-col > .score-5.score-label.on.text',
    '.al.di-ib.js-top-ranking-score-col > .score-4.score-label.on.text',
    '.al.di-ib.js-top-ranking-score-col > .score-3.score-label.on.text',
    '.al.di-ib.js-top-ranking-score-col > .score-2.score-label.on.text',
    '.al.di-ib.js-top-ranking-score-col > .score-1.score-label.on.text',

    // https://myanimelist.net/stacks/4019?view_style=tile
    '.stars',
        
    // https://myanimelist.net/anime/producer/376/Sentai_Filmworks#:~:text=Licensor
    'tr.js-anime-type-1.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-licensor > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-2.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-licensor > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-3.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-licensor > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-4.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-licensor > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-5.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-licensor > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-6.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-licensor > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-7.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-licensor > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-8.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-licensor > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-9.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-licensor > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-10.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-licensor > td.borderClass > div.spaceit_pad > span',

    // https://myanimelist.net/anime/producer/143/Mainichi_Broadcasting_System#:~:text=Producer
    'tr.js-anime-type-1.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-2.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-3.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-4.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-5.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-6.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-7.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-8.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-9.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass > div.spaceit_pad > span',
    'tr.js-anime-type-10.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass > div.spaceit_pad > span',

    // https://myanimelist.net/stacks/21390?view_style=seasonal
    '.score.scormem-item',
        
    // ¯\_(ツ)_/¯
    'tr.js-anime-watch-status-people-manga-notinmylist.js-people-manga > td.borderClass > div.spaceit_pad > span',
    '.js-btn-not-recommended.not-recommended.tag',
    '.js-btn-recommended.recommended.tag',
    '.js-anime-type-6.js-anime-type-all.js-seasonal-anime.seasonal-anime.js-anime-category-producer > td.borderClass > div.spaceit_pad > span',
    '.show.mal-modal',
    '.show.mal-modal-backdrop',
    '.js-btn-mixed-feelings.mixed-feelings.tag',
    '.js-btn-label.btn-label.recommended.tag',
    '.js-btn-label.btn-label.not-recommended.tag',
    '.js-btn-label.btn-label.mixed-feelings.tag',
    '.show.mal-modal',
    '.show.mal-modal-backdrop',
    '.fn-grey4.lh14.fs10.pt8',
    '.pt4.fs10.lh14.fn-grey4',
    '.extra-info',
    'span.work-status-num:nth-of-type(2)',
    '.notes > .edit',
    '.on.mr4.icon-people-score-star',
    '.pt8.info',

    ];

    // Construct the final selector
    const selector = selectors.map(s => s.replace('myanimelist.net##', '')).join(',');

    var elementsHidden = GM_getValue('elementsHidden', false);

    // Apply the initial style based on the state of elementsHidden opacity: 0
    GM_addStyle(selector + '{ opacity: ' + (elementsHidden ? '0' : '1') + ' !important; }');

    // Toggle the hiding of elements on
    function toggleElementsOn() {
        elementsHidden = true;
        GM_setValue('elementsHidden', elementsHidden);
        GM_addStyle(selector + '{ opacity: 0 !important; }');
    }

    // Toggle the hiding of elements off
    function toggleElementsOff() {
        elementsHidden = false;
        GM_setValue('elementsHidden', elementsHidden);
        GM_addStyle(selector + '{ opacity: 1 !important; }');
    }

    //
    function toggleElementsOnOff() {
        if (elementsHidden) {
            toggleElementsOff();
        } else {
            toggleElementsOn();
        }
    }

    // Add menu commands to toggle the hiding of elements on and off
    // GM_registerMenuCommand('ON', toggleElementsOn);
    // GM_registerMenuCommand('OFF', toggleElementsOff);
    GM_registerMenuCommand('Toggle', toggleElementsOnOff);
})();
