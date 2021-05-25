export const convertFile = async (fileObject, lang) => {
    let list = [];
    list.push("WEBVTT");
    list.push("");
    list.push("0");
    list.push("00:00:01.000 --> 00:00:05.000");
    list.push("Hermano Flix orgulhosamente apresenta...");
    list.push("");

    await fetch(fileObject)
        .then((r) => r.text())
        .then(text => {
            let regex = /([0-9][0-9]:[0-9][0-9]:[0-9][0-9],[0-9][0-9][0-9])+/g;

            //WORKAROUND
            text = text.replace('à','a').replace('á','a').replace('ã','a').replace('â','a').replace('ä','a');
            text = text.replace('è','a').replace('é','a').replace('ê','a').replace('ë','a');
            text = text.replace('ì','a').replace('í','a').replace('î','a').replace('ï','a');
            text = text.replace('ò','a').replace('ó','a').replace('õ','a').replace('ô','a').replace('ö','a');
            text = text.replace('ù','a').replace('ú','a').replace('û','a').replace('ü','a');

            if (regex.test(text)) {
                text = text.replace(regex, function (x) {
                    return x.replace(',', '.');
                })
            }



            list.push(text);
        });
    
    return list;
}

export const sortByText = (a, b, ordem, sort) => {
    let first = a.folder;
    let second = b.folder;

    if (ordem == 2) {
        first = first.substring(7, first.length);
        second = second.substring(7, second.length);
    }

    const diff = first.toLowerCase().localeCompare(second.toLowerCase());

    if (sort) {
        return diff;
    }

    return -1 * diff;
}

export const sortByNum = (a, b, sort) => {
    let diff = 0;
    if (a.id < b.id)
        diff = -1;
    else if (a.id > b.id)
        diff = 1

    if (sort) {
        return diff;
    }

    return -1 * diff;
}

export const checkVisibility = (filme, form) => {
    if (form.pesquisa.value == "" || filme.folder.toUpperCase().includes(form.pesquisa.value.toUpperCase()))
        return true;
    return false;
}

