import React, { useEffect, useState } from 'react';

import ReactPlayer from 'react-player'

import classes from './Home.module.css';

import Button from '../../components/UI/Button/Button';
import Card from '../../components/Card/Card/Card';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';
import search from '../../assets/images/search-icon.png';
import asc from '../../assets/images/asc.png';
import desc from '../../assets/images/desc.png';


import config from '../../config';

import source from '../../Source/catalog';

import * as movieService from '../../services/movieService';
import * as utilService from '../../services/utilService';

const Home = (props) => {
    const [catalog, setCatalog] = useState([]);
    const [movie, setMovie] = useState(null);
    let counter = { value: 0 };
    const [form, setForm] = useState(
        {
            pesquisa: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Pesquisar'
                },
                value: "",
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            },
            ordem: {
                elementType: 'select',
                elementLabel: 'Ordem',
                elementConfig: {
                    options: [
                        { value: 0, displayValue: 'Novidades' },
                        { value: 1, displayValue: 'Ano' },
                        { value: 2, displayValue: 'Título' }
                    ]
                },
                value: 0,
                validation: {
                    required: false
                },
                valid: true
            },
            ascending: true

        }
    );

    useEffect(() => {
        let id = 0;
        let list = source.catalog?.map(filme => (
            { ...filme, id: id++ }
        ))
        setCatalog(list);
    }, [])


    const changeHandler = async (folder, key) => {
        const subtitles = await movieService.getSubtitles(folder);
        const tmdb = await movieService.getTmdb(key);
        const video = await movieService.getVideo(folder);

        setMovie({ subtitles, tmdb, video })
    }

    const formHandler = (event, field) => {
        let prevForm = { ...form };

        if (field == "pesquisa")
            prevForm.pesquisa.value = event.target.value;
        if (field == "ordem")
            prevForm.ordem.value = event.target.value;
        if (field == "sort")
            prevForm.ascending = !prevForm.ascending;

        setForm(prevForm);
    }

    const modalClosed = () => {
        setMovie(null);
    }



    let pesquisa = <div>
        <Input
            value={form.pesquisa.value}
            elementType={form.pesquisa.elementType}
            elementConfig={form.pesquisa.elementConfig}
            changed={(event) => formHandler(event, "pesquisa")}
        ></Input>
        <div className={classes.Search}>
            <img src={search} alt="Sem Foto" />
        </div>
    </div>

    let ordenar = <div>
        <Input
            value={form.ordem.value}
            elementType={form.ordem.elementType}
            elementConfig={form.ordem.elementConfig}
            changed={(event) => formHandler(event, "ordem")}
        ></Input>
    </div>

    let ordering = <div className={classes.Sort}>
        <Button btnType="Success" clicked={() => formHandler(null, "sort")}><img className={classes.Sort} alt="Sem Foto" src={form.ascending ? asc : desc} /></Button>
    </div>



    let movieList = []
    if (form.ordem.value == 0) {
        movieList = catalog.sort((a, b) => utilService.sortByNum(a, b, form.ascending));
    }
    else {
        movieList = catalog.sort((a, b) => utilService.sortByText(a, b, form.ordem.value, form.ascending));
    }

    movieList = movieList.map(filme => (
        utilService.checkVisibility(filme, form) ?
            <Card
                key={filme.id}
                img={config.test ? config.obj.poster : config.baseUrl + "movie/" + filme.folder + "/poster.jpg"}
                nome={filme.folder}
                descr={filme.folder}
                footer={null}
                clicked={() => changeHandler(filme.folder, filme.tmdb)}
                owner={filme.folder}
            /> : null
    ))

    return (
        <div className={classes.movieList}>
            <div className={classes.FilterBlock}>
                <div className={classes.FilterProcurar}>{pesquisa}</div>
                <div className={classes.FilterProcurar}>{ordenar}</div>
                <div className={classes.FilterProcurar}>{ordering}</div>
                <p className={classes.Counter}>{movieList.filter(x => x != null).length} of {catalog.length} Results</p>
            </div>
            {movieList}
            <Modal show={!!movie} modalClosed={() => modalClosed()}>
                <div className={classes.FilterBlock}>
                    <span className={classes.modalTitle}>Título: {movie?.tmdb?.title}</span>
                    {movie?.tmdb?.title != movie?.tmdb?.original_title ? <span className={classes.modalTitleOriginal}>Título Original: {movie?.tmdb?.original_title}</span> : null}
                </div>
                <br />
                <div className={classes.playerWrapper}>
                    {movie
                        ?
                        <ReactPlayer
                            // playing
                            className={classes.reactPlayer}
                            controls
                            width='680px'
                            height='360px'
                            style={divStyle}
                            config={{
                                file: {
                                    tracks: [
                                        { kind: 'subtitles', src: movieService.getSubtitleURL(movie,"pt"), srcLang: 'pt-br', default: true },
                                        { kind: 'subtitles', src: movieService.getSubtitleURL(movie,"en"), srcLang: 'en' },
                                        { kind: 'subtitles', src: movieService.getSubtitleURL(movie,"es"), srcLang: 'es' },
                                        { kind: 'subtitles', src: movieService.getSubtitleURL(movie,"fr"), srcLang: 'fr' },
                                        { kind: 'subtitles', src: movieService.getSubtitleURL(movie,"fp"), srcLang: 'fp' }
                                    ],
                                    attributes: {
                                        controlsList: 'nodownload'
                                    }
                                }
                            }}
                            url={movie?.video}
                        />
                        : null
                    }
                </div>
                <div>
                    <span className={classes.modalNote}>Nota: {movie?.tmdb?.vote_average}</span>
                    <span className={classes.modalRelease}>Lançamento: {(new Date(movie?.tmdb?.release_date)).toLocaleDateString()}</span>
                    <br /><br />
                    {
                        movie?.tmdb?.genres?.map((gen, i) => (
                            (movie?.tmdb?.genres.length === i + 1) ? <span key={gen.id} className={classes.modalGenre}>{gen.name}</span>
                                : <span key={gen.id} className={classes.modalGenre}>{gen.name}&nbsp;&nbsp;&nbsp;&nbsp;/</span>
                        ))
                    }
                    <br /><br />
                    <div className={classes.modalDivText}>
                        <p className={classes.modalText}>{movie?.tmdb?.overview}</p>
                    </div>
                    <br />
                </div>
            </Modal>
        </div>
    );
}

const divStyle = {
    display: 'table',
    margin: '0 auto',
    border: '1px solid black'
};

export default Home;