import React, { useEffect, useState } from 'react';

import classes from './Home.module.css';

import Card from '../../components/Card/Card';
import Modal from '../../components/UI/Modal/Modal';
import Player from '../../components/Player/Player';
import Search from '../../components/Search/Search';

import config from '../../config';
import source from '../../Source/catalog';

import * as movieService from '../../services/movieService';
import * as utilService from '../../services/utilService';

const Home = (props) => {
    const [catalog, setCatalog] = useState([]);
    const [movie, setMovie] = useState(null);
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
        const tmdb = await movieService.getTmdb(key);
        const video = await movieService.getVideo(folder);
        const tracks = await movieService.getTracks(folder)

        setMovie({ tmdb, video, tracks, folder, key })
    }

    const formHandler = (event, field) => {
        let prevForm = { ...form };

        if (field === "pesquisa")
            prevForm.pesquisa.value = event.target.value;
        if (field === "ordem")
            prevForm.ordem.value = event.target.value;
        if (field === "sort")
            prevForm.ascending = !prevForm.ascending;

        setForm(prevForm);
    }

    const modalClosed = () => {
        setMovie(null);
    }

    let movieList = []
    console.log('form.ordem.value', form.ordem.value);
    if (form.ordem.value === "0" || form.ordem.value === 0) {
        movieList = catalog.sort((a, b) => utilService.sortByNum(a, b, form.ascending));
    }
    else {
        movieList = catalog.sort((a, b) => utilService.sortByText(a, b, form.ordem.value, form.ascending));
    }

    movieList = movieList.map(filme => (
        utilService.checkVisibility(filme, form) ?
            <Card
                key={filme.id}
                img={config.test ? config.obj.poster : config.baseUrl + "movies/" + filme.folder + "/poster.jpg"}
                nome={filme.folder}
                descr={filme.folder}
                footer={null}
                clicked={() => changeHandler(filme.folder, filme.tmdb)}
                owner={filme.folder}
            /> : null
    ))

    return (
        <div className={classes.movieList}>
            <Search form={form} formHandler={formHandler} movieList={movieList} catalog={catalog}/>
            {movieList}
            <Modal show={!!movie} modalClosed={() => modalClosed()}>
                <Player movie={movie}/>
            </Modal>
        </div>
    );
}


export default Home;