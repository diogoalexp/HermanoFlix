import axios from '../axios-local';

import config from '../config';

import * as utilService from './utilService';

export const getTmdb = async (tmdb) => {
    let result = await axios.get(tmdb + '?api_key=fab315859353736a9ceb15038771d35e&language=pt-BR')
        .then(res => {
            var data = res.data;
            return data;
        })
        .catch(err => {
            return null;
        });

    return result;
}

export const getVideo = async (folder) => {
    if (config.test)
        return config.obj.movie;
    else
        return config.baseUrl + "movies/" + folder + "/movie.mp4";
}

const getSubtitles = async (folder) => {
    let pt = await utilService.convertFile(config.test ? config.obj.subtitles?.ptSrt : config.serverUrl + 'movies/' + folder + '/portugues.srt', "pt");

    let en = await utilService.convertFile(config.test ? config.obj.subtitles?.enSrt : config.serverUrl + 'movies/' + folder + '/english.srt', "en")

    let fr = await utilService.convertFile(config.test ? config.obj.subtitles?.frSrt : config.serverUrl + 'movies/' + folder + '/francais.srt', "fr")

    let es = await utilService.convertFile(config.test ? config.obj.subtitles?.esSrt : config.serverUrl + 'movies/' + folder + '/espanol.srt', "es")

    let fp = await utilService.convertFile(config.test ? config.obj.subtitles?.fpSrt : config.serverUrl + 'movies/' + folder + '/fp.srt', "fp")

    return { pt, en, fr, es, fp }

}

export const getTracks = async (folder) => {
    const subtitles = await getSubtitles(folder)
    let tracks = []
    for (const key in subtitles) {
        let sub = subtitles[key];
        if (sub && sub !== ""){
            const blob = new Blob(["\ufeff", sub], { encoding: "ISO-8859-1", type: "text/plain;charset=ISO-8859-1" })

            let url = URL.createObjectURL(blob);

            tracks.push({ kind: 'subtitles', src: url, srcLang: key === "pt" ? 'pt-br' : key, default: key === "pt" },)
        }
    }

    return tracks;
}

