import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Question from './api/Question';
import Count from './api/Count';
import { Card } from '@material-ui/core';

const useStyles ={
    root: {
      maxWidth: '400px',
      marginTop: '150px',
      height: 'auto',
      margin: '0 auto',
      textAlign: 'center',
      border: '#cccccc 8px solid',
    },
    
    title: {
      fontSize: '40px',
      color: '#009ACD'
    },

    header:{
        background: '#cccccc',
        marginTop: '-30px',
        paddingBottom: '20px',
        color: 'black'
    },

    radioContainer:{
        marginTop: '60px'
    },

    radio:{
        cursor: 'pointer',
        marginTop: '10px',
        fontSize: '20px'

        
    },

    questionNumber:{
        fontSize: '25px',
    },

    buttons:{
        background: '#cccccc',
        boxShadow: 'none',
        border: 'none',
        cursor: 'pointer',
        height: '50px',
        fontSize: '20px',
        color: '#009ACD',
        fontWeight: 'bold',
        borderRadius: '4%',
        marginTop: '20px',
        '&:hover':{
            opacity: '0.8'
        }
    },

    answers:{
        width: '100%',
        marginTop: '10px',
        
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
            selectedOption: '',
            answersList: []
        }
        
        this.handleClick = this.handleClick.bind(this);
        this.restart = this.restart.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }   

    loadQuiz = (count, array) => {
        this.setState(() => {
            return{
                numberOfQuestions: count,
                options: array[1],
                question: array[0],
                answer: array[2],
            }
        })
    }

    restart(){
        Question(1)
        .then(array =>{
            this.setState({
                currentIndex: 0,
                options: array[1],
                quizEnd: false,
                score: 0,
                question: array[0],
                answer: array[2],
                selectedOption: '',
                answersList: []
            })
        })
        .catch(err => console.log(err));
    }

    handleChange(event){
        this.setState({
            userAnswer: event.target.value,
            selectedOption: event.target.value
        })
    }

    handleClick (event) {
        event.preventDefault();
        const { score, userAnswer, answer, answersList } = this.state;
        if(answer === userAnswer){
                answersList.push(answer);
                this.setState({
                    score: score + 1,
                    currentIndex: this.state.currentIndex + 1,
                    checked: false,
                    selectedOption: '',
                    userAnswer: '',

                })
        }
        else{
            if(userAnswer !== ''){
                answersList.push(answer);
                this.setState({
                    currentIndex: this.state.currentIndex + 1,
                    checked: false,
                    userAnswer: ''
                });
             }
        }

    }

    componentDidMount(){
        Question(1)
        .then(array =>{
            
            Count()
            .then(count =>{
            this.loadQuiz(count, array)
            })

        })
        .catch(err => console.log(err));
    }


    

    componentDidUpdate(prevProps, prevState){
        const { currentIndex, quizEnd, numberOfQuestions } = this.state;
        if(currentIndex !== prevState.currentIndex){
            if(currentIndex < numberOfQuestions){
                Question(currentIndex + 1).then(array => {
                    this.setState({
                       question: array[0],
                       options: array[1],
                       answer: array[2] 
                    })
                }).catch(err => console.log(err));
            }else{
                this.setState({
                    quizEnd: true,
                    currentIndex: numberOfQuestions -1
                })
            }
        }
    }
    
    render(){
        const { classes } = this.props;
        const { question, options, currentIndex, quizEnd, score, checked, selectedOption, numberOfQuestions, answersList } = this.state;
  
    
    return(
                <Card className={classes.root}>
                    {!quizEnd? (
                        <div>
                            <header className={classes.header}>
                                <h1 className={classes.title} data-testid='question'>{question}</h1>
                                {
                                    numberOfQuestions? 
                                    <span className={classes.questionNumber}>
                                        Question {currentIndex + 1} of {numberOfQuestions}
                                    </span>:<span className = 'spinner'></span>
                                }
                            </header>
                            
                            <div className={classes.radioContainer}>
                                <form className={classes.radioButtons}>
                                    {
                                            
                                            options.map(option =>{
                                                
                                                    return(
                                                        <div className={classes.radio} key={option}>
                                                            <input 
                                                                type="radio" 
                                                                id={option} 
                                                                value={option} 
                                                                onChange={this.handleChange} 
                                                                className={classes.radio} 
                                                                checked={selectedOption === option}
                                                            />
                                                            <label>{option}</label>
                                                        </div>
                                                    )
                                                
                                            })

                                    }
                                    <br></br>
                                    {numberOfQuestions?
                                        <button 
                                            onClick={this.handleClick} 
                                            className={classes.buttons}>
                                                Submit
                                        </button>: <div></div>
                                    }
                                </form>
                            </div>
                        </div>):
                    (
                        <div>
                            <h1>Your score is {Math.round(score/numberOfQuestions*100)}%</h1>
                            <div style={{margin: '10px'}}>
                                You got {score} out of {numberOfQuestions} questions correct! Look below for the answers
                            </div>
                            {
                                answersList.map((answer,index) =>{
                                    return(
                                        <div 
                                            className={classes.answers} 
                                            key={answer}>Question {index + 1}: {answer}
                                        </div>
                                    )
                                })
                            }
                            
                        </div>
                    )

                    }  
                    <br></br> 
                    <button 
                        onClick={this.restart} 
                        style={{marginBottom: '20px'}} 
                        className={classes.buttons}
                    >
                            Restart
                    </button>
                </Card>
    )}
}

export default withStyles(useStyles)(QuizCard);