import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Modal from '@material-ui/core/Modal';
import TextField from "@material-ui/core/TextField";
import API from "../../Util/API/API";


function refresh() {
  document.location.reload();
}

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '85%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)

  },
}));

export default function SimpleModal(props) {
  let sessionData = {};
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  useEffect(() => {
    API.verifyLogin().then(res => {
      if (res.data.email) {
        sessionData = res.data;
        API.getUserById(sessionData.CompanyProfileId).then(data => {
          setLocationState(data.data.Locations[0])

        })

      } else {
        window.location.href = "/login";
      }
    }).catch(err => {
      console.log(err);
      window.location.href = "/login";
    })
  }, [])
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [locationState, setLocationState] = React.useState([])
  const [itemToSave, SetItemToSave] = React.useState({
    title: "",
    quantity: "",
    unit: "",
    value_unit: "",
    exp_date: ""
  })
  const handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    SetItemToSave({
      ...itemToSave,
      [name]: value
    });

  };
  const handleSubmitForm = (event) => {
    event.preventDefault()
    const dataToUpload = {
      title: itemToSave.title,
      quantity: itemToSave.quantity,
      unit: itemToSave.unit,
      value_unit: itemToSave.value_unit,
      exp_date: itemToSave.exp_date,
      LocationId: locationState.id
    }
    API.createInventory(dataToUpload).then(res => {
      refresh();

    }).catch(err => console.log(err))
  }

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      {/* <div className="modaloverlay"> */}
        <Modal
          className="modal"
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={props.modalOpen}
          onClose={props.toggleModal}
        >
          {props.itemToUpdate ? (
            <div style={modalStyle} className={classes.paper}>
              {/* <a href="#close" class="close">&times;</a> */}
              <h2 id="simple-modal-title">Edit Item</h2>
              <TextField onChange={props.handleInputChange} label="Food" name={"title"} value={props.itemToUpdate.title} />
              <TextField onChange={props.handleInputChange} label="Quantity" name={"quantity"} value={props.itemToUpdate.quantity} />
              <TextField onChange={props.handleInputChange} label="Unit" name={"unit"} value={props.itemToUpdate.unit} />
              <TextField onChange={props.handleInputChange} label="Value" name={"value_unit"} value={props.itemToUpdate.value_unit} />
              <TextField onChange={props.handleInputChange} label="Expiration Date" name={"exp_date"} value={props.itemToUpdate.exp_date} />
              <SimpleModal />
              <button className="btn-main" onClick={props.editRow}>Submit</button>
            </div>
          ) :
            <form style={modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">Add</h2>
              <TextField onChange={handleInputChange} label="Food" name="title" />
              <TextField onChange={handleInputChange} label="Quantity" name="quantity" />
              <TextField onChange={handleInputChange} label="Unit" name="unit" />
              <TextField onChange={handleInputChange} label="Value" name="value_unit" />
              <TextField onChange={handleInputChange} label="Expiration Date" name="exp_date" placeholder="MM/DD/YY" />
              <SimpleModal />
              <button className="btn-main" onClick={handleSubmitForm}>Submit</button>
            </form>
          }
        </Modal>
      {/* </div> */}
    </div>
  );
}