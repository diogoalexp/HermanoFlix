import testMovie from "./movies/(2021) Test/movie.mp4";
import testPoster from "./movies/(2021) Test/poster.jpg";

import testSubTitlePtSrt from "./movies/(2021) Test/portugues.srt";
import testSubTitleENSrt from "./movies/(2021) Test/english.srt";
import testSubTitleFrSrt from "./movies/(2021) Test/francais.srt";
import testSubTitleEsSrt from "./movies/(2021) Test/espanol.srt";
import testSubTitleFpSrt from "./movies/(2021) Test/fp.srt";

const config = {
    test: process.env.NODE_ENV === 'development',
    baseUrl: "./",
    serverUrl: "http://localhost:8080/",
    obj:{
        movie: testMovie,
        poster: testPoster,
        subtitles:{
            ptSrt: testSubTitlePtSrt,
            enSrt: testSubTitleENSrt,
            frSrt: testSubTitleFrSrt,
            esSrt: testSubTitleEsSrt,
            fpSrt: testSubTitleFpSrt
        }
    }
}

export default config;