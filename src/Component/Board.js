import React, { Component } from 'react';
import Square from './Square';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


import fakeData from './utils/data';


const styles = theme => ({
  gridList: {
    width: 900,
    heigh: 900,
  },
  board: {
    justifyContent: 'center',
  }
})



class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true
    }
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true })
    this.setState({
      data: fakeData(),
      loading: false
    })
  }

  onChoosen = (col, row) => {
    console.log(col, row);
    let newData = this.state.data.slice();
    newData[col][row].choosen = !newData[col][row].choosen;
    //console.log(newData);
    this.setState({
      ...this.state,
      data: newData,
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <Grid container style={{ marginTop: '50px' }}>
          <Grid item xs={2} />
          <Grid container item xs={8} className={classes.board}>
            {this.state.loading ? <div> loading </div>
              : this.state.data.map((data, index) =>
                <div key={`${index}data`}>
                  <Grid item xs={1} />
                  {data.map(square => (
                    <Square
                      key={square.num}
                      square={square}
                      onChoosen={this.onChoosen}
                    />
                  ))}
                  <Grid item xs={2} />
                </div>
              )}
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    )
  }
}


export default withStyles(styles)(Board);