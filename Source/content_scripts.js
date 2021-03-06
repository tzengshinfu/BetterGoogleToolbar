function betterGoogleToolbar() {
    let pageLanguage = getPageLanguage();
    let currentUrl = window.location.href;

    //Google Translate
    if (currentUrl.includes("translate.")) {
        let observer = new MutationObserver(function (mutations) {
            let shareButton = document.getElementById('gt-res-share');
            let inputTextArea = document.getElementById('source');

            if (shareButton && inputTextArea) {
                observer.disconnect();

                let searchButton = document.createElement('button');
                searchButton.type = 'button';
                searchButton.id = 'search-button';
                searchButton.className = 'search-button';
                searchButton.innerHTML = '<svg height="24px" viewBox="0 0 24 24" width="24px" style="opacity: .54;" xmlns="http://www.w3.org/2000/svg"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path><path d="M0 0h24v24H0z" fill="none"></path></svg>';
                searchButton.addEventListener('click', redirectSearchPage);
                shareButton.insertAfter(searchButton);
                toggleSearchButton();

                inputTextArea.addEventListener('keyup', toggleSearchButton);
            }
        });

        observer.observe(document, { childList: true, subtree: true });
    }

    //Google Search Result
    if (currentUrl.includes("www.") && currentUrl.includes("q=")) {
        let observer = new MutationObserver(function (mutations) {
            let searchform = document.getElementById('searchform');
            let inputText = document.getElementById('lst-ib');
            let googleToolbar = document.getElementById('hdtb-msb');
            let googleMore = document.getElementsByTagName('g-header-menu')[0];
            let googleLinks = document.getElementsByClassName('q qs');
            let topNav = document.getElementById('top_nav');
            let moreMenu = document.getElementById('hdtbMenus');

            if (inputText && googleToolbar && googleMore && searchform && googleLinks && topNav && moreMenu) {
                observer.disconnect();

                let googleToolbarContainer = googleToolbar.childNodes[0];

                let googleTranslater = document.createElement('div');
                googleTranslater.className = 'hdtb-mitem hdtb-imb';
                googleTranslater.innerHTML = '<a class="q qs" href="https://translate.google.com/#auto/en/' + inputText.value + '">' + getTranslateLinkName(pageLanguage) + '</a>';
                googleToolbarContainer.insertBefore(googleTranslater, googleMore);

                let googlePlay = document.createElement('div');
                googlePlay.className = 'hdtb-mitem hdtb-imb';
                googlePlay.innerHTML = '<a class="q qs" href="https://play.google.com/store/search?q=' + inputText.value + '">Play</a>';
                googleToolbarContainer.insertBefore(googlePlay, googleMore);

                for (let link of googleLinks) {
                    if (link.href.indexOf('tbm=vid') !== -1) {
                        link.href = 'https://www.youtube.com/results?search_query=' + inputText.value;
                    }
                }

                searchform.style.position = 'fixed';
                let customTopNav = topNav.cloneNode(true);
                customTopNav.id = 'custom_top_nav';
                customTopNav.style.position = 'fixed';
                customTopNav.style.zIndex = '100';
                customTopNav.style.top = '85px';
                customTopNav.style.height = topNav.offsetHeight + 'px';
                customTopNav.style.width = topNav.offsetWidth + 'px';
                let toolButton = customTopNav.getElementsByClassName('hdtb-tl')[0];
                let appBar = document.getElementById('appbar');
                toolButton.addEventListener('click', function () {
                    document.body.scrollTop = 0;
                    if (moreMenu.className === 'hdtb-td-c') {
                        moreMenu.className = 'hdtb-td-o';
                        moreMenu.attributes['aria-expanded'].value = 'true';
                        if (appBar !== null) {
                            appBar.classList.add('hdtb-ab-o');
                        }
                    }
                    else {
                        moreMenu.className = 'hdtb-td-c';
                        moreMenu.attributes['aria-expanded'].value = 'false';
                        if (appBar !== null) {
                            appBar.classList.remove('hdtb-ab-o');
                        }
                    }
                });
                document.body.appendChild(customTopNav);
            }
        });

        observer.observe(document, { childList: true, subtree: true });
    }
    //Google Search HomePage
    else {
        let observer = new MutationObserver(function (mutations) {
            let luckyButton = document.getElementsByName('btnI')[0];
            let inputText = document.getElementById('lst-ib');

            if (luckyButton) {
                observer.disconnect();

                let trendButton = document.createElement('input');
                trendButton.type = "button";
                trendButton.className = "trend-button";
                trendButton.value = getTrendsLinkName(pageLanguage);
                trendButton.addEventListener("click", function () {
                    if (inputText.value !== "") {
                        document.location.href = 'https://trends.google.com/trends/explore?q=' + inputText.value;
                    }
                    else {
                        document.location.href = 'https://trends.google.com/trends/hottrends';
                    }
                }
                );

                luckyButton.insertAfter(trendButton);
            }
        });

        observer.observe(document, { childList: true, subtree: true });
    }
}

Object.prototype.insertAfter = function (newNode) {
    this.parentNode.insertBefore(newNode, this.nextSibling);
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
        case "CN":
            translateName = "翻译";
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
        case "CN":
            trendsName = "趋势";
            break;
        case "ja":
            trendsName = "トレンド";
            break;
        default:
            trendsName = "Trends";
    }

    return trendsName;
}

function toggleSearchButton() {
    let textArea = document.getElementById('source');
    let button = document.getElementById('search-button');

    if (textArea.value == '') {
        button.style.display = 'none';
    }
    else {
        button.style.display = 'block';
    }
}

function getPageLanguage() {
    let result;
    let language = document.documentElement.lang.split('-')[0];
    let nation = document.documentElement.lang.split('-')[1];

    if (nation == "CN") {
        result = nation;
    }
    else {
        result = language;
    }

    return result;
}

function redirectSearchPage() {
    let searchLanguage;
    let options = document.getElementById('gt-tl-sugg').childNodes;

    for (let option of options) {
        if (option.getAttribute('aria-pressed') == 'true') {
            searchLanguage = option.getAttribute('value');
        }
    }

    let searchText = document.getElementById('result_box').innerText
    window.location.href = 'https://www.google.com/search?q=' + searchText + '&lr=lang_' + searchLanguage;
}


betterGoogleToolbar();