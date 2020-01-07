import React, { Component } from 'react';
import { connect } from 'react-redux';

import fotoProfile from '../../assets/images/foto_profile_nb.png';
import matrix from '../../assets/images/matrix.gif';

import ReactPlayer from 'react-player'

import classes from './Home.module.css';

import Button from '../../components/UI/Button/Button';
import Card from '../../components/Card/Card/Card';
import Modal from '../../components/UI/Modal/Modal';


import axios from '../../axios-local';

import catalog from '../../Source/catalog';

class Home extends Component {
    state = {
        item: [
            {   
                movies: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
                folder: 'teste2'
            }          
        ],
        modal: false

    }

    changeHandler = (f) => {
        // alert("changed..");
        // this.setState( {item: { folder: 'teste1', movies: "http://localhost:8080/movies/teste1/movie.mp4"}} );
        this.setState( {item: { folder: f}, modal: true} );
        setTimeout(() => {
            console.log('Hello, World!');
            this.setState( {item: { movies: "./movies/" + f + "/movie.mp4"}} );
          }, 3000);
    }

    modalClosed = () => {
        // alert("modalClosed..");
        this.setState( {modal: false} );
    }

    componentDidMount() {
        this.setState( {item: { folder: 'teste', movies: "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"}} );
    }

    render () {
        let folder = this.state.item.folder;
        let movies = this.state.item.movies;
        let date = Date.now();
        
        let db = catalog;
        console.log({catalog});
        const divStyle = {
            display: 'table',
            margin: '0 auto',
            border: '1px solid black'            
          };

        return (
            <div className={classes.movieList}>
                {db.catalog.map(filme => (                
                    <Card 
                        key={filme.tmdb}
                        img={"./movies/" + filme.folder + "/poster.jpg"}
                        nome={filme.folder} 
                        descr={filme.folder}
                        footer={null}
                        clicked={() => this.changeHandler(filme.folder)}
                        owner={filme.folder}
                    />
                ))}     
                <Modal show={this.state.modal} modalClosed={() => this.modalClosed()}>
                    <div className={classes.playerWrapper}>
                        <ReactPlayer              
                        playing
                        className={classes.reactPlayer}
                        controls              
                          width='100%'
                          height='100%'                        
                        style={divStyle}
                        config={{ file: {
                                tracks: [
                                    {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/portugues.vtt', srcLang: 'pt-br', default: true },
                                    {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/english.vtt', srcLang: 'en'},
                                    {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/espanol.vtt', srcLang: 'es'},
                                    {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/francais.vtt', srcLang: 'fr'},
                                    {kind: 'subtitles', src: 'http://localhost:8080/movies/' + folder + '/fp.vtt', srcLang: 'fp'}
                                ],
                                attributes: {
                                    controlsList: 'nodownload'
                                }
                            }}}
                        url = {movies}
                        />          
                    </div>      
                </Modal>         
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // loading: state.auth.loading,
        // error: state.auth.error,
        // isAuthenticated: state.auth.token !== null,
        // buildingBurger: state.burgerBuilder.building,
        // authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        // onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Home );