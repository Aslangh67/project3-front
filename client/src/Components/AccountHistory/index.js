import React, { useState, useEffect } from "react";
import API from "../../Util/API/API"


export default function FindingSupplier() {
	// useState data
	const [sessionData, setSessionData] = useState({})
	const [supplierState, setSupplierState] = useState([])
	const [inventoryState, setInventoryState] = useState([])
	const [cityState, setCityState] = useState("")

		// Check login status and redirect if not logged in
		useEffect(() => {
			API.verifyLogin().then(res => {
				setSessionData(res.data);
				getAllInventory(res.data.CompanyProfileId);
			}).catch(err => {
				alert(err)
				console.log(err);
				window.location.href = "/login";
			})
		}, [])

		// State change handlers
	const handleInputChange = event => {
		const name = event.target.name;
		const value = event.target.value;
		setCityState({
			...cityState,
			[name]: value
		});
	};

	const submitSearch = (event) => {
		event.preventDefault();
		getAllInventory("search")
	}

	function getAllInventory (query) {
		API.getAllInventory(query).then(res => {
			console.log(res.data);
			
			setInventoryState(res.data)
		}).catch(err => {console.log(err);
		})	
	}




	return (
		<div>
			<form className="register-form">
				<div className='search-bar'>
					<h1 htmlFor="searchSupplier" className="sectionH1">Account History</h1>
					<p className="p-search-tag">Search Time Period</p>
					<input
						className='city-search'
						value={cityState.city}
						onChange={handleInputChange}
						type='text'
						name='city'
					/>
					<button className='btn-main btn-no-top-margin' type='submit' onClick={submitSearch}>Search</button>
				</div>
			</form>
			<div>
				{supplierState.length > 0 ? (
					
					<table className="table">
						<thead>
							<tr>
								<th>Pickup date</th>
								<th>Company</th>
								<th>Item</th>
								<th>Quantity</th>
								<th>Unit</th>
								<th>Total Value</th>
							</tr>
						</thead>
						<tbody>
							{
								supplierState.map((supplier) => {
									return (

										<tr key={supplier.Company_profile.id}>
											<td>{supplier.Company_profile.company_name}</td>
											<td>{supplier.address}</td>
											<td>{supplier.city}</td>
											<td>{supplier.zip}</td>


											{/* <td><button className='btn-main' onClick={() => handleShowInventory(supplier.id)}>Inventory</button></td> */}

										</tr>
									)
								})
							}

						</tbody>
					</table>
				) : (null)}
				{inventoryState.length > 0 ?
					(<div className="inventory">
						<table className="table">
							<thead>
								<tr>
									<th>Item</th>
									<th>Quantity</th>
									<th>Unit</th>
								</tr>
							</thead>
							<tbody>
								{
									inventoryState.map((inventory) => {
										return (

											<tr key={inventory.id}>
												<td>{inventory.title}</td>
												<td>{inventory.quantity}</td>
												<td>{inventory.unit}</td>



											</tr>
										)
									})
								}

							</tbody>
						</table>
						{/* <button className="btn-main" onClick={() => claimInventory()}>Claim</button> */}
					</div>) : null}
			</div>
		</div>

	)
};