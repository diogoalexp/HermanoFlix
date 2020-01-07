import React, { Component } from 'react';
import { connect } from 'react-redux';

import ufpr from '../../assets/images/items/ufpr.png';
import celin from '../../assets/images/items/celin.png';
import influx from '../../assets/images/items/influx.png';
import ReactPlayer from 'react-player'

import classes from './Formation.module.css';

import Button from '../../components/UI/Button/Button';

import axios from '../../axios-local';


class Formation extends Component {
    state = {
        items: [
            {   
                key:1,
                title: 'Especialização em Engenharia de Software',
                subTitle: 'Universidade Federal do Paraná',
                text: 'Especialização com o foco em metogolodias de desenvolvimento, neste curso aprimorei conceitos de engenharia de requisitos, modelagem de software, gestão de projetos e desenvolvimento JAVA. Meu trabalho de conclusão de curso foi a construção de um sistema, contemplando todas as fases de um projeto, para realizar o cadatramento das feiras de rua na cidade de Curitiba.',
                img: ufpr,
                startDate: '2018', 
                endDate: '2019'
            },
            {   
                key:2,
                title: 'Bacharelado em Ciência da Computação',
                subTitle: 'Universidade Federal do Paraná',
                text: 'Curso com fundamentação em lógica computacional, curso com uma base muito forte para a compreensão de estruturas algoritmicas. Nessa graduação é explorado todos os níveis de codificação, sendo parte do conteúdo algoritmos, matemática, estatística, análise assintótica, indução, grafos, inteligência artificial, compiladores e etc.',
                img: ufpr,
                startDate: '2012', 
                endDate: '2015'
                
            },
            {   
                key:3,
                title: 'Escola Técnica da UFPR',
                subTitle: 'Universidade Federal do Paraná',
                text: 'Ensino médio realizado dentro da Universidade Federal do Paraná, considerado por anos como excelência em ensino médio e com processo seletivo concorrido, atualmente a instituição não oferta mais esse serviço. Neste local realizei as disciplinas elementares no nivel médio e módulos suplementares, como informática, matemática financeira e Espanhol(3 anos).',
                img: ufpr,
                startDate: '2004', 
                endDate: '2006'
            },
            {   
                key:4,
                title: 'Curso de Inglês',
                subTitle: 'Influx English School',
                text: 'Escola de inglês com programa de aprendizado e meta de fluência em 2 anos e meio. Realizei todos os niveis ofertados.',
                img: influx,
                startDate: '2010', 
                endDate: '2012'
            },
            {   
                key:5,
                title: 'Curso de Francês',
                subTitle: 'Centro de Línguas e Interculturalidade',
                text: 'Cursando atualmente o nível intermediário 2...',
                img: celin,
                startDate: '2017', 
                endDate: null
            }            
        ],
        movies: "",
        subs: "",
        flag: true
    }
    componentDidMount () {        
        axios.get('/')
            .then(res => {
                this.setState({subs: res.data, movies: "http://localhost:8080/movies/teste1/movie.mp4"});
            })
            .catch(err => {
                this.setState({loading: false});
            });        
    }

    changeHandler = () => {
        alert("change!");
        if (this.state.flag)
            this.setState( { movies: "http://localhost:8080/movies/teste1/movie.mp4", subs:  'teste1/english.vtt', flag : !this.state.flag} );
        else
            this.setState( { movies: "./movies/teste2/movie.mp4", subs:  'teste2/english.vtt', flag : !this.state.flag} );
    }

    render () {
        // let movies = this.state.movies;
        // let subs = this.state.subs;

        let movies = "http://localhost:8080/movies/teste1/movie.mp4";
        let subs = 'teste1/english.vtt';

        return (
            <div className='player-wrapper'>
            <ReactPlayer
              playing
              className='react-player'
              controls
              url = {movies}
              width='25%'
              height='25%'
              config={{ file: {
                tracks: [
                    {kind: 'subtitles', src: 'http://localhost:8080/movies/' + subs, srcLang: 'en', default: true }
                ],
                attributes: {
                    controlsList: 'nodownload'
                  }
            }}}
            />
            <Button btnType="Success" type="button" clicked={this.changeHandler} >Change</Button>
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

export default connect( mapStateToProps, mapDispatchToProps )( Formation );