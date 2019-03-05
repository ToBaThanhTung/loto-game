import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import waterMelon from '../assets/watermelon.svg';
import Icon from '@material-ui/core/Icon';
const styles = theme => ({
  square: {
    width: '35px',
    height: '45px',
    minWidth: 'auto',
  }
  
});

class Square extends Component {

  state = {
    open: false,
    chosen: false,
  }

  render() {
    const { num, open, choosen, col, row } = this.props.square;
    const { classes, onChoosen } = this.props;
    let marginFlag;
    if(row === 2 || row === 5) {
      marginFlag = '16px';
    }

    //console.log(this.props);
    

    return (
      <div style={{margin: '2px', marginBottom: marginFlag}}>
        {open ?
          <div className={classes.square}>
            {choosen ?
              <img src={`${waterMelon}`} /> :
              <Button
                variant='contained'
                color='inherit'
                className={classes.square}
                onClick={() => onChoosen(col, row)}
               
              >
                {num}
              </Button>}
          </div>
          : <Button variant='contained' disabled className={classes.square}>-</Button>
        }
      </div>
    )
  }

}



export default withStyles(styles)(Square);