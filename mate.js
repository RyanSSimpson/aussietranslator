function readDictionary() {
    var list = document.getElementById('dictionarylist');
    var frag = document.createDocumentFragment();

    phrases.forEach((phrase) => {
        var e = document.createElement("li");
        e.innerHTML = `<strong>` + phrase.foreign + `</strong> <i class="fas fa-arrow-right"></i> <strong>` + phrase.aussie + `</strong>: ` + phrase.why;
        e.className = "dictionary-item";
        frag.appendChild(e);
    });

    dictionary.forEach((phrase) => {
        var e = document.createElement("li");
        e.innerHTML = `<strong>` + phrase.foreign + `</strong> <i class="fas fa-arrow-right"></i> <strong>` + phrase.aussie + `</strong>: ` + phrase.why;
        e.className = "dictionary-item";
        frag.appendChild(e);
    });
    list.appendChild(frag);
}
