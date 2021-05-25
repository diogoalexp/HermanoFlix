export const convertFile = async (fileObject) => {
    let list = `WEBVTT

0
00:00:01.000 --> 00:00:05.000
Hermano Flix orgulhosamente apresenta...

`;
    let result = new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        try {
            request.overrideMimeType('text/xml; charset=iso-8859-1');

            request.onload = () => {
                if (request.status === 200) {
                    resolve(Buffer.from(request.response), 'utf-8');
                } else {
                    resolve(Buffer.from(""), 'utf-8');
                }
            };

            request.open('GET', fileObject);
            request.setRequestHeader('Content-type', 'text/xml; charset=utf-8');
            request.send();
        } catch (err) {
            return null
        }

    });
    let sub = await result;
    let srt = new TextDecoder().decode(sub);

    let regex = /([0-9][0-9]:[0-9][0-9]:[0-9][0-9],[0-9][0-9][0-9])+/g;

    if (regex.test(srt)) {
        srt = srt.replace(regex, function (x) {
            return x.replace(',', '.');
        });
    } else {
        return null;
    }
    list = list + srt;

    return list;
}

export const sortByText = (a, b, ordem, sort) => {
    let first = a.folder;
    let second = b.folder;

    if (ordem === "2") {
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
    if (form.pesquisa.value === "" || filme.folder.toUpperCase().includes(form.pesquisa.value.toUpperCase()))
        return true;
    return false;
}

