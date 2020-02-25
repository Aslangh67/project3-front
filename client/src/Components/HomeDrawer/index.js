import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import "../../style/css/drawer.min.css";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function HomeDrawer(props) {
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
        {/* display routes if logged out */}
        {props.authState.loggedIn === false ? <div className="drawerBtn" onClick={() => { props.setActivePage("register") }}><p> Register</p></div> : <div />}
        {props.authState.loggedIn === false ? <div className="drawerBtn" onClick={() => { props.setActivePage("login") }}><p>Login</p></div> : <div />}
        {/* display routes if logged in */}
        {props.authState.loggedIn === true && props.authState.userData.companyType === "charity" ? <div className="drawerBtn" onClick={() => { props.setActivePage("charity") }}><p>Charity Profile</p></div> : <></>}
        {props.authState.loggedIn === true && props.authState.userData.companyType === "supplier" ? <div className="drawerBtn" onClick={() => { props.setActivePage("supplier") }}><p>Supplier Profile</p></div> : <></>}
      </List>
      <Divider />
      <List>
        {props.authState.loggedIn === true ? <div className="drawerBtn" onClick={() => { props.setActivePage("logout") }} ><p>Logout</p></div> : <div />}
      </List>
    </div>
  );



  return (
    <div>
      {props.isMobile ? (
        <div>
          <Button onClick={toggleDrawer('right', true)} style={{ position: "absolute", top: 0, right: 0, color: "white", marginTop: '15px', marginRight: '15px' }}><i class="fas fa-bars fa-2x"></i></Button>

          <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
            {sideList('right')}
          </Drawer>
        </div>
      ) : (
          <div />
        )}

    </div>
  );
}