import React from 'react'
import Grid from '@material-ui/core/Grid';
import Board from './Board';
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  board: {
    justifyContent: 'center',
  }
})

const Layout = (props) => {
  //console.log(props);

  const { socket, classes } = props;
  return (
    <div style={{ height: '100vh' }}>
      <Grid container>
        <Grid container item xs className={classes.board} direction='column'>
          <Board socket={socket} />
        </Grid>
       
      </Grid>
    </div>
  )
}

export default withStyles(styles)(Layout);
