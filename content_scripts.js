function betterGoogleToolbar() {
    let inputText;
    let googleToolbar, googleMore, googleTranslater, googlePlay, googleTrends;
    let googleLinks;
    let pageLanguage = document.documentElement.lang.split('-')[0];

    let observer = new MutationObserver(function (mutations) {
        inputText = document.getElementById('lst-ib');
        googleToolbar = document.getElementById('hdtb-msb');
        googleMore = document.getElementById('hdtb-more');
        googleLinks = document.getElementsByClassName('q qs');

        googleTranslater = document.createElement('div');
        googlePlay = document.createElement('div');
        googleTrends = document.createElement('div');

        if (inputText && googleToolbar && googleMore) {
            observer.disconnect();

            googleTrends.className = 'hdtb-mitem hdtb-imb';
            googleTrends.innerHTML = '<a class="q qs" href="https://www.google.com/trends/explore?date=all&q=' + inputText.value + '">' + getTrendsLinkName(pageLanguage) + '</a>';
            googleToolbar.insertBefore(googleTrends, googleMore);

            googleTranslater.className = 'hdtb-mitem hdtb-imb';
            googleTranslater.innerHTML = '<a class="q qs" href="https://translate.google.com/#auto/en/' + inputText.value + '">' + getTranslateLinkName(pageLanguage) + '</a>';
            googleToolbar.insertBefore(googleTranslater, googleMore);

            googlePlay.className = 'hdtb-mitem hdtb-imb';
            googlePlay.innerHTML = '<a class="q qs" href="https://play.google.com/store/search?q=' + inputText.value + '">Play</a>';
            googleToolbar.insertBefore(googlePlay, googleMore);

            for (let link of googleLinks) {
                if (link.href.indexOf('tbm=vid') != -1) {
                    link.href = "https://www.youtube.com/results?search_query=" + inputText.value;
                }
            }
        }
    });

    observer.observe(document, { childList: true, subtree: true });
}

function getTranslateLinkName(languageName) {
    let translateName;
    switch (languageName) {
        case "de":
            translateName = "Übersetzer";
            break;
        case "en":
            translateName = "Translate";
            break;
        case "es":
            translateName = "Traductor";
            break;
        case "fr":
            translateName = "Traduction";
            break;
        case "hr":
            translateName = "Prevodilac";
            break;
        case "it":
            translateName = "Traduttore";
            break;
        case "pl":
            translateName = "Tłumacz";
            break;
        case "pt":
            translateName = "Tradutor";
            break;
        case "vi":
            translateName = "Dịch";
            break;
        case "tr":
            translateName = "Çeviri";
            break;
        case "ru":
            translateName = "Переводчик";
            break;
        case "ar":
            translateName = "ترجمة";
            break;
        case "th":
            translateName = "แปลภาษา";
            break;
        case "ko":
            translateName = "번역";
            break;
        case "zh":
            translateName = "翻譯";
            break;
        case "ja":
            translateName = "翻訳";
            break;
        default:
            translateName = "Translate";
    }

    return translateName;
}

function getTrendsLinkName(languageName) {
    let trendsName;
    switch (languageName) {
        case "de":
            trendsName = "Erkunden";
            break;
        case "en":
            trendsName = "Trends";
            break;
        case "es":
            trendsName = "Tendencias";
            break;
        case "fr":
            trendsName = "Découvrir";
            break;
        case "hr":
            trendsName = "Trendove";
            break;
        case "it":
            trendsName = "Tendenze";
            break;
        case "pl":
            trendsName = "Trends";
            break;
        case "pt":
            trendsName = "Trends";
            break;
        case "vi":
            trendsName = "Xu hướng";
            break;
        case "tr":
            trendsName = "Trendler";
            break;
        case "ru":
            trendsName = "Тенденции";
            break;
        case "ar":
            trendsName = "مؤشرات";
            break;
        case "th":
            trendsName = "เทรนด์";
            break;
        case "ko":
            trendsName = "트렌드";
            break;
        case "zh":
            trendsName = "搜尋趨勢";
            break;
        case "ja":
            trendsName = "トレンド";
            break;
        default:
            trendsName = "Trends";
    }

    return trendsName;
}

betterGoogleToolbar();