const hack = "ZcvBRt";
const punctuation = /[~`!@#$%^&*(){}\[\];:"'<,.>?\/\\|_+=-]/g;
function translate() {
    var mate = document.getElementById('mate').checked;
    var foreignText = document.getElementById('foreign-text');
    var aussieText = document.getElementById('aussie-text');
    var explanations = document.getElementById('aussie-words');
    var input = foreignText.value.toLowerCase();
    var translated = '';
    var explantionText = '';
    input = convertPhrases(input);
    input.phrases.forEach((x) => {
        explantionText += `<p><strong>` + x.foreign + `</strong> <i class="fas fa-arrow-right"></i> <strong>` + x.aussie + `</strong>: ` + x.why + `</p>`;
    });
    var wordArray = input.words.split(' ');
    var foundHack = false;
    wordArray.forEach((word) => {
        var noPunctWord = removePunctuation(word);
        var aussieWord = '';
        var why = 'you\'re a faggot harry lel';
        if(noPunctWord.startsWith(hack)) {
            foundHack = true;
            aussieWord = noPunctWord;
        }
        else if(noPunctWord.includes(hack)) {
        //else if(RegExp(hack+"$").test(aussieWord)) { this matches the last character. Depreciated as last char could be punctuation.
            foundHack = false;
            if(mate && noPunctWord !== word) {
                aussieWord = noPunctWord + ' mate' + getPunct(word);
            }
            else {
                aussieWord = word;
            }
        }
        else if(foundHack) {
            aussieWord = noPunctWord;
        }
        else {
            let result = convertWord(word);
            if(mate && noPunctWord !== word)
                aussieWord = result.word + ' ' + 'mate' + result.punct;
            else
                aussieWord = result.word + result.punct;
            if(result.why) why = result.why;
            if(aussieWord !== word)
                explantionText += `<p><strong>` + noPunctWord + `</strong> <i class="fas fa-arrow-right"></i> <strong>` + result.word + `</strong>: ` + why + `</p>`;
        }
        translated += aussieWord + ' ';
    });
    translated = translated.replace(new RegExp(hack, 'g'), '');
    if(explantionText) 
        explanations.innerHTML = '<h2>Explanations</h2>' + explantionText;
    else if(translated.length > 0 && translated !== ' ') {
        explanations.innerHTML = '<h2>Explanations</h2>' + '<p>well what\'d you expect? We\'re really not so different, you and I...</p>';
    }
    else {
        explanations.innerHTML = '';
    }
    aussieText.value = translated;
}

function getPunct(word = '') {
    return new RegExp(punctuation).test(word.substr(word.length-1, 1)) ? word[word.length-1] : '';
}

function convertWord(word = '') {
    var noPunctWord = removePunctuation(word);
    //TODO: HANDLE PLURALS
    var match = dictionary.findIndex((x) => x.foreign === noPunctWord /*|| x.foreign + 's' === noPunctWord || x.foreign + '\'s' === noPunctWord*/);
    var punct = new RegExp(punctuation).test(word.substr(word.length-1, 1)) ? word[word.length-1] : '';
    var result = {};
    result.word = match >= 0 ? dictionary[match].aussie : noPunctWord;
    result.punct = punct;
    result.why = match >= 0 ? dictionary[match].why : '';
    return result;
}

function removePunctuation(word = '') {
    return word.replace(punctuation, '');
}

function convertPhrases(words = '') {
    var foundPhrases = [];
    phrases.forEach((phrase) => {
        words = words.replace(new RegExp(phrase.foreign, 'gi'), (match, offset, string) => {
            foundPhrases.push(phrase);
            return hack+phrase.aussie+hack;
        });
        // words = words.replace(new RegExp(phrase.foreign, 'gi'), hack+phrase.aussie+hack);
    });
    return {words: words, phrases: foundPhrases};
}