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
            console.log('tmdb-err', err)
            return null;
        });

    return result;
}

export const getSubtitles = async (folder) => {
    let pt = await utilService.convertFile(config.test ? config.obj.subtitles?.ptSrt : config.serverUrl + 'movies/' + folder + '/portugues.srt', "pt");

    let en = await utilService.convertFile(config.test ? config.obj.subtitles?.enSrt : config.serverUrl + 'movies/' + folder + '/english.srt', "en")

    let fr = await utilService.convertFile(config.test ? config.obj.subtitles?.frSrt : config.serverUrl + 'movies/' + folder + '/francais.srt', "fr")

    let es = await utilService.convertFile(config.test ? config.obj.subtitles?.esSrt : config.serverUrl + 'movies/' + folder + '/espanol.srt', "es")

    let fp = await utilService.convertFile(config.test ? config.obj.subtitles?.fpSrt : config.serverUrl + 'movies/' + folder + '/fp.srt', "fp")

    return { pt, en, fr, es, fp }

}

export const getVideo = async (folder) => {
    if (config.test)
        return config.obj.movie;
    else
        return config.baseUrl + "movie/" + folder + "/movie.mp4";
}

export const getSubtitleURL = (movie, lang) => {
    const sub = movie?.subtitles[lang]

    if (!sub) return;

    const blob = new Blob(["\ufeff", sub.join('\n')], { encoding: "UTF-8", type: 'text/plain;charset=utf-8' })

    let url = window.URL.createObjectURL(blob);
    return url;
}



