import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActions } from '@material-ui/core';
import Questions from './api/Fetch';

const useStyles ={
    root: {
      width: '200px',
      marginTop: '200px',
      height: 'auto',
      margin: '0 auto',
      textAlign: 'left'
    },
    
    title: {
      fontSize: 24,
    },

    radioContainer:{
        width: '200px',
        textAlign: 'left'
    },

    radio:{
        cursor: 'pointer',
        marginTop: '10px'

        
    }
};

class QuizCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userAnswer: '',
            currentIndex: 0,
            options: [],
            quizEnd: false,
            score: 0,
            question: '',
            answer: '',
            selectedOption: ''
        }
        
        this.handleClick = this.handleClick.bind(this);
        this.restart = this.restart.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }   

    loadQuiz = () => {
        const {currentIndex} = this.state;
        this.setState(() => {
            return{
                question: Questions[currentIndex].question,
                options:  Questions[currentIndex].options,
                answer:   Questions[currentIndex].answer
            }
        })
    }

    restart(){
        this.setState({
            currentIndex: 0,
            options: [],
            quizEnd: false,
            score: 0,
            question: '',
            answer: '',
            selectedOption: ''
        })
    }

    handleChange(event){
        this.setState({
            userAnswer: event.target.value,
            selectedOption: event.target.value
        })
    }

    handleClick (event) {
        event.preventDefault();
        const { currentIndex, score, userAnswer } = this.state;
        if(Questions[currentIndex].answer === userAnswer){
            this.setState({
                score: score + 1,
                currentIndex: this.state.currentIndex + 1,
                checked: false,
                selectedOption: ''
            })
        }else{
            this.setState({
                currentIndex: this.state.currentIndex + 1,
                checked: false
            });
        }

    }

    componentDidMount() {
        this.loadQuiz();
    }

    componentDidUpdate(prevProps, prevState){
        const { currentIndex, quizEnd } = this.state;
        if(currentIndex != prevState.currentIndex){
            if(currentIndex < Questions.length)
                this.setState(() => {
                    return {
                        question: Questions[currentIndex].question,
                        options:  Questions[currentIndex].options,
                        answer:   Questions[currentIndex].answer
                    }
                })
            else{
                this.setState({
                    quizEnd: true,
                    currentIndex: Questions.length - 1
                })
            }
        }
    }
    
    render(){
        const { classes } = this.props;
        const { question, options, currentIndex, userAnswer, quizEnd, score, checked, selectedOption } = this.state;
  
    
    return(
                <div>
                    <h1>{question}</h1>
                    <span>Question {currentIndex + 1} of {Questions.length}</span>
                    {!quizEnd? (
                    <div className={classes.root}>
                        <form className={classes.radioButtons}>
                            {
                                    
                                    options.map(option =>{
                                        
                                            return(
                                                <div className={classes.radio}>
                                                    <input type="radio" id={option} key={option} value={option} onClick={this.handleChange} className={classes.radio} checked={selectedOption === option}/>
                                                    <label for={option} key={option}>{option}</label>
                                                </div>
                                            )
                                        
                                    })

                            }
                            <br></br>
                            <button onClick={this.handleClick}>Submit</button>
                        </form>
                    </div>):
                    (
                        <div>
                        <h1>Your score is {score/Questions.length*100}%</h1>
                        <button onClick={this.restart}>Play Again?</button>
                        </div>
                    )

                    }   
                </div>
    )}
}

export default withStyles(useStyles)(QuizCard);