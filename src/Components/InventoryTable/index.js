import React, { useState, useEffect } from "react";
import moment from "moment"


import API from "../../Util/API/API";
import Modal from "../../Components/Modal";

export default function InventoryTable(props) {
  let locationId = 0
  useEffect(() => {
    API.verifyLogin().then(res => {
        API.getUserById(res.data.CompanyProfileId).then(data => {
          setLocationState(data.data.Locations[0])
          // locationId =data.data.Locations[0].id
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
      <h1 className="inventoryH1">Inventory</h1>
      <button className="btn-main" onClick={() => handleToggleModal()}>Add</button>
      <table className="inventoryTable">
        <thead className="inventoryTHead">
          <tr className="inventoryTR">
            <th className="inventoryTH">Food Item</th>
            <th className="inventoryTH">Quantity</th>
            <th className="inventoryTH">Unit</th>
            <th className="inventoryTH">Value Per Unit</th>
            <th className="inventoryTH">Expiration Date</th>
          </tr>
        </thead>
        <tbody className="inventoryTBody">
          {
            inventoryState.result.map((inventory) => {
              return (

                <tr className="inventoryTR" key={inventory.id}>
                  <td className="inventoryTD">{inventory.title}</td>
                  <td className="inventoryTD">{inventory.quantity}</td>
                  <td className="inventoryTD">{inventory.unit}</td>
                  <td className="inventoryTD">${inventory.value_unit}</td>
                  <td className="inventoryTD">{ moment(inventory.exp_date).format("MM/DD/YY")}</td>

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