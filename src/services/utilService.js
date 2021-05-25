export const convertFile = async (fileObject) => {
    let list = [];
    list.push("WEBVTT");
    list.push("");
    list.push("0");
    list.push("00:00:01.000 --> 00:00:05.000");
    list.push("Hermano Flix orgulhosamente apresenta...");
    list.push("");

    list = await fetch(fileObject)
        .then((r) => r.text())
        .then(text => {
            console.log();
            let regex = /([0-9][0-9]:[0-9][0-9]:[0-9][0-9],[0-9][0-9][0-9])+/g;

            if (regex.test(text)) {
                text = text.replace(regex, function (x) {
                    return x.replace(',', '.');
                });
            } else {
                return null;
            }

            list.push(text);
            return list;
        })
        .catch(err => {
            return null;
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

