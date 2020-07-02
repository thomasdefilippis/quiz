import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Count from './api/Count';
import Question from './api/Question';

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
            selectedOption: '',
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
                answer: array[2]
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
        const { score, userAnswer, answer } = this.state;
        if(answer === userAnswer){
                this.setState({
                    score: score + 1,
                    currentIndex: this.state.currentIndex + 1,
                    checked: false,
                    selectedOption: '',
                    userAnswer: ''
                })
            }
        else{
            if(userAnswer !== ''){
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
        const { question, options, currentIndex, quizEnd, score, checked, selectedOption, numberOfQuestions } = this.state;
  
    
    return(
                <div>
                    <h1>{question}</h1>
                    {numberOfQuestions? <span>Question {currentIndex + 1} of {numberOfQuestions}</span>:<div></div>}
                    {!quizEnd? (
                    <div className={classes.root}>
                        <form className={classes.radioButtons}>
                            {
                                    
                                    options.map(option =>{
                                        
                                            return(
                                                <div className={classes.radio} key={option}>
                                                    <input type="radio" id={option} value={option} onChange={this.handleChange} className={classes.radio} checked={selectedOption === option}/>
                                                    <label>{option}</label>
                                                </div>
                                            )
                                        
                                    })

                            }
                            <br></br>
                            {numberOfQuestions?<button onClick={this.handleClick}>Submit</button>: <div></div>}
                        </form>
                    </div>):
                    (
                        <div>
                        <h1>Your score is {score/numberOfQuestions*100}%</h1>
                        <button onClick={this.restart}>Restart</button>
                        </div>
                    )

                    }   
                </div>
    )}
}

export default withStyles(useStyles)(QuizCard);