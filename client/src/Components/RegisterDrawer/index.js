import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import "../../style/css/drawer.min.css";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function RegisterDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <div className="drawerBtn" onClick={() => { props.setActivePage("Home") }}>
          <p>Home</p>
        </div>
        <hr/>
        <div className="drawerBtn" onClick={() => { props.setActivePage("Login") }}>
          <p>Login</p>
        </div>
      </List>
    </div>
  );



  return (
    <div>
      <Button onClick={toggleDrawer('right', true)} style={{ position: "absolute", top: 0, right: 0, color: "white", marginTop: '15px', marginRight: '15px' }}><i className="fas fa-bars fa-2x"></i></Button>

      <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
        {sideList('right')}
      </Drawer>
    </div>
  );
}