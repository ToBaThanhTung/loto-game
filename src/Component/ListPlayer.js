import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AccountIcon from '@material-ui/icons/AccountCircle';
import CheckIcon from '@material-ui/icons/Check';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class ListPlayer extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    //console.log(this.props);
    const { players, playerIds } = this.props.gamePlay.gamePlay;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Player List
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="player-dialog-title"
          aria-describedby="player-dialog-description"
        >
          <DialogTitle id="player-dialog-title">{"List Player"}</DialogTitle>
          <DialogContent style={{padding: 0}}>
            {playerIds.map(id => (
              <List key={id}>
                <ListItem style={{padding: 0, margin: '8px'}}>
                  <AccountIcon style={{margin: '8px'}} />
                  {players[id].name}
                  {players[id].status === 'READY' ? <CheckIcon style={{margin: '8px'}} /> : null }
                </ListItem>
              </List>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ListPlayer;