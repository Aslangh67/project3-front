import React, { useState, useEffect } from "react";
import moment from "moment"


import API from "../../Util/API/API";
import Modal from "../../Components/Modal";

export default function InventoryTable(props) {
  useEffect(() => {
    API.verifyLogin().then(res => {
        API.getUserById(res.data.CompanyProfileId).then(data => {
          setLocationState(data.data.Locations[0])
          API.getAllInventory(data.data.Locations[0].id)
            .then(res2 => {
              console.log(locationState);
              setInventoryState({
                result: res2.data
              })
            })
            .catch(err => setInventoryState({
              ...inventoryState,
              error: err.message
            }))
        })
    }).catch(err => {
      console.log(err);
    })
  }, [])
  const [locationState, setLocationState] = useState([])


  const [inventoryState, setInventoryState] = useState({
    result: [{

    }]
  });

  const [modalOpen, setModalOpen] = useState(false)

  function refresh() {
    document.location.reload();
  }

  const [itemToUpdate, setItemToUpdate] = useState({
    id: "",
    title: "",
    quantity: "",
    unit: "",
    value_unit: "",
    exp_date: ""
  })


  function deleteRow(id) {
    API.deleteInventoryById(id)
      .then(() => {
        API.getAllInventory(locationState.id)
          .then(res => {
            console.log(res.data);

            setInventoryState({
              result: res.data
            })
          })
          .catch(err => setInventoryState({
            ...inventoryState,
            error: err.message
          }))
      })
      .catch(err => setInventoryState({
        ...inventoryState,
        error: err.message
      }))
  }

  function editRow() {
    console.log("submit button clicked", itemToUpdate)
    API.updateInventoryById(itemToUpdate).
      then(() => {
        API.getAllInventory(locationState.id)
          .then(res => {
            console.log("get all inventory response", res.data);
            setInventoryState({
              result: res.data
            })
          })
          .catch(err => setInventoryState({
            ...inventoryState,
            error: err.message
          }))
        })
        .catch(err => setInventoryState({
          ...inventoryState,
          error: err.message
        }))
        refresh();
  }

  function addRow() {
    API.createInventory(itemToUpdate).
      then(() => {
        API.getAllInventory(locationState.id)
          .then(res => {
            console.log("get all inventory response", res.data);

            setInventoryState({
              result: res.data
            })
          })
          .catch(err => setInventoryState({
            ...inventoryState,
            error: err.message
          }))
      })
      .catch(err => setInventoryState({
        ...inventoryState,
        error: err.message
      }))
  }

  const handleToggleModal = (itemToDisplay) => {
    setItemToUpdate(itemToDisplay);
    setModalOpen(!modalOpen)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setItemToUpdate({
      ...itemToUpdate,
      [name]: value
    })
  }

  return (
    <>
      <button className="btn-main" onClick={() => handleToggleModal()}>Add</button>
      <table className="table">
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Value Per Unit</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {
            inventoryState.result.map((inventory) => {
              return (

                <tr key={inventory.id}>
                  <td>{inventory.title}</td>
                  <td>{inventory.quantity}</td>
                  <td>{inventory.unit}</td>
                  <td>${inventory.value_unit}</td>
                  <td>{ moment(inventory.exp_date).format("MM/DD/YY")}</td>

                  {/* <button onClick={() => editRow(inventory.id)}>Edit</button> */}
                  <button className="btn-main" onClick={() => handleToggleModal(inventory)}>Edit</button>
                  <button className="btn-main" onClick={() => deleteRow(inventory.id)}>Delete</button>

                </tr>

              )
            })

          }

        </tbody>
      </table>
      <Modal accountOverview={props.accountOverview} editRow={editRow} addRow={addRow} handleInputChange={handleInputChange} modalOpen={modalOpen} toggleModal={handleToggleModal} itemToUpdate={itemToUpdate} />
    </>
  );
}