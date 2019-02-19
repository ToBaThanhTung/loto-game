import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    width: 75,
    height: 75,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

// const Square = (props) => {
//   const { classes, num, open, chosen } = props;

//   return (
//     <Grid item xs={1}>
//       {open ?
//         <Button
//           variant='raised'
//           className={classes.card}
//         >
//           {num}
//         </Button>
//         : <Button variant='raised' disabled className={classes.card}></Button>
//       }
//     </Grid>
//   );
// }

class Square extends Component {

  state = {
    open: false,
    chosen: false,
  }

  render() {
    const { num, open, choosen, col, row } = this.props.square;
    const { classes, onChoosen } = this.props;
    
    return (
      <Grid item xs={1}>
        {open ?
          <Button
            variant='contained'
            color={choosen ? 'secondary' : 'inherit'}
            className={classes.card}
            onClick={() => onChoosen(col, row)}
          >
            {num}
          </Button>
          : <Button variant='contained' disabled className={classes.card}></Button>
        }
      </Grid>
    )
  }

}



export default withStyles(styles)(Square);