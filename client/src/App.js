import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import Title from './components/Title';
import QuizCard from './components/QuizCard';



function App() {
  return (
    <div className="App">
      <Grid container direction="column">
        <Grid item>
          <Title />
        </Grid>
        <Grid item>
        </Grid>
        <Grid item>
          <QuizCard />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
