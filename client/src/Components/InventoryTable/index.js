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
    API.updateInventoryById(itemToUpdate).
      then(() => {
        API.getAllInventory(locationState.id)
          .then(res => {
            
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
    <div className="sweetcheeks">
      <h1 className="inventoryH1">Inventory</h1>
      <button className="btn-main add-btn" onClick={() => handleToggleModal()}>Add</button>
      <table className="inventoryTable">
        <thead className="inventoryTHead">
          <tr className="inventoryTR">
            <th className="inventoryTH span-2-of-12">Food Item</th>
            <th className="inventoryTH span-1-of-12">Quantity</th>
            <th className="inventoryTH span-1-of-12">Unit</th>
            <th className="inventoryTH span-4-of-12">Value Per Unit</th>
            <th className="inventoryTH span-4-of-12">Expiration Date</th>
          </tr>
        </thead>
        <tbody className="inventoryTBody">
          {
            inventoryState.result.map((inventory,index) => {
              return (

                <tr className="inventoryTR" key={index}>
                  <td className="inventoryTD span-2-of-12">{inventory.title}</td>
                  <td className="inventoryTD span-1-of-12">{inventory.quantity}</td>
                  <td className="inventoryTD span-1-of-12">{inventory.unit}</td>
                  <td className="inventoryTD span-4-of-12">${inventory.value_unit}</td>
                  <td className="inventoryTD span-4-of-12">{ moment(inventory.exp_date).format("MM/DD/YY")}</td>

                  {/* <button onClick={() => editRow(inventory.id)}>Edit</button> */}
                 <td><button className="btn-main" onClick={() => handleToggleModal(inventory)}>Edit</button></td>
                  <td><button className="btn-main" onClick={() => deleteRow(inventory.id)}>Delete</button></td>

                </tr>

              )
            })

          }

        </tbody>
      </table>
      <Modal accountOverview={props.accountOverview} editRow={editRow} addRow={addRow} handleInputChange={handleInputChange} modalOpen={modalOpen} toggleModal={handleToggleModal} itemToUpdate={itemToUpdate} />
    </div>
  );
}