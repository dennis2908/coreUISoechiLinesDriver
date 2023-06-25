import React, { useState, useEffect } from 'react'
import { primaryBadge,arrayRemove } from '../../genFunctions/genFunctions'
import { store } from '../../redux/store'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  CBadge,
  CAlert,
  CCard,
  CSpinner,
  CModal,
  CForm,
  CFormGroup,
  CModalTitle,
  //CFormText,
  //CValidFeedback,
  //CInvalidFeedback,
  //CTextarea,
  CInput,
  CSelect,
  //CInputFile,
  //CInputCheckbox,
  //CInputRadio,
  //CInputGroup,
  //CInputGroupAppend,
  //CInputGroupPrepend,
  //CDropdown,
  //CInputGroupText,
  CLabel,
  //CSelect,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CPagination
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import usersData from './UsersData'

//import CIcon from '@coreui/icons-react'

const Delivery = ({match}) => {
  //const history = useHistory()
  const [modalDelConf, setModalDelConf] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [FormData, setFormData] = useState({});
 
//  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const myData = localStorage.getItem("myData")
  const idData = localStorage.getItem("id")
  const [userlist, setuserlist] = useState(usersData.usersData)
  
    
  const toggleData = ()=>{
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner: " " } })  
    setModalData(!modalData);
	//console.log(store.getState())
  }	
  
 
  
  async function EditDataJSON() {
	  let id = FormData.id
	  setFormData(arrayRemove(FormData, "id")); 
	  await fetch("http://localhost:9333/Driver/UpdateShipment/"+id+"/"+idData, {
		  method: "put",
			headers: {
			  "Authorization" : "Bearer "+myData
			},
			body: JSON.stringify(FormData)
				}).then(res => res.json())
			  .then(
				(result) => {
					
					store.dispatch({ type: 'CHANGE_STATE', payload: { ShowHideAl:"d-block",Spinner:" ",AlertMsg:"Succeed Update Data"} })
					MyfetchData();
					
			});	
	}
	
	
 const SubmitForm = (e)=>{
	e.preventDefault();	 
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner:<CSpinner size="sm"/> } })
	e.preventDefault();	 
	store.dispatch({ type: 'CHANGE_STATE', payload: { Spinner:<CSpinner size="sm"/> } })
	EditDataJSON()
	
	e.preventDefault();		
 }
 
  
  
 const onFieldChange = (fieldName)=>{
	  //console.log(fieldName);
        return function (event) {
            setFormData({
				id:FormData.id,
				shipment_id:FormData.shipment_id,
			    assign:FormData.assign,
				[fieldName]: event.target.value
		  });
        }
 }
  const GetPage = (index,thePage)=>{
    if(parseInt(thePage) > 1){
		index -= 5*(thePage-1) 
	}
	return index
  } 
const getButton = (data) => {
	  if(!data.Driver_id)
		return <CButton 
					  onClick={() => changeEditPage(data)}
					  className="mr-2 ml-2"
					  type="submit" size="sm" color="success"><CIcon name="cil-pencil" /> Assign</CButton>  
	}	  
 
	
const changeEditPage = (data)=>{
	console.log(data)
	store.dispatch({ type: 'CHANGE_STATE', payload: { modulState:"Assign",HeadModal:"Assign Form Delivery",ShowHideAl:"d-none"} })
	//setSubmitBtn("Edit Data")
    setFormData({
		shipment_id : data.Shipment_id,
		id : data.Shipment_id,
	});
	//setShowHideAl('d-none')
	toggleData()
  }	
	
async function MyfetchData() {
	await fetch("http://localhost:9333/Driver/GetShipmentWithLimitOffset/5/0",{
	headers: {"Authorization" : "Bearer "+myData}})
      .then(res => res.json())
      .then(
        (result) => {
		  let Datalist = []
		  let j=0
		  for(var i = 0;i<5;i++){ 
		     if(result[j])
				Datalist[i] = result[j]
			 j++
		  }
		  setuserlist(Datalist)
		  setPage(1)
		  setLoading(false)
		  //return
		}).catch((error) => {
		  history.push('/logout')
	});	
		
	
}

const toggleDelConf = ()=>{
	
    setModalDelConf(!modalDelConf);
  }
  
  
useEffect(() => {
  async function MyfetchData() {
	await fetch("http://localhost:9333/Driver/GetShipmentWithLimitOffset/5/0",{
	headers: {"Authorization" : "Bearer "+myData}})
      .then(res => res.json())
      .then(
        (result) => {
		  let Datalist = []
		  let j=0
		  for(var i = 0;i<5;i++){ 
		     if(result[j])
				Datalist[i] = result[j]
			 j++
		  }
		  setuserlist(Datalist)
		  setPage(1)
		  setLoading(false)
		  //return
		}).catch((error) => {
		  history.push('/logout')
	});	
		
	
}
		
MyfetchData()
  

}, [myData,history]);		
  async function pageChange(newPage) {
    setLoading(true)
	await fetch("http://localhost:9333/Driver/GetShipmentWithLimitOffset/5/"+(5*(parseInt(newPage)-1)),{
	headers: {"Authorization" : "Bearer "+myData}})
      .then(res => res.json())
      .then(
        (result) => {
		  let numb = 10*(parseInt(newPage)-1)
		  let Datalist = []
		  let j=0
		  for(var i = numb;i<(numb+5);i++){ 
		     if(result[j])
				Datalist[i] = result[j]
			 j++
		  }
		  setuserlist(Datalist)
		  setPage(newPage)
		  setLoading(false)
		});	
  }
  
  return (
  
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            Delivery
            <small className="text-muted"> List Delivery</small>
          </CCardHeader>
          <CCardBody >
		  <CModal
        show={modalDelConf}
        onClose={toggleDelConf}
      >
        <CModalHeader>
          <CModalTitle>Confirmation</CModalTitle>
        </CModalHeader>
        <CModalBody>
          You are about to delete this item
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary"  onClick={toggleDelConf}>
            <CIcon name="cil-x" />
			Cancel
          </CButton>
          <CButton color="danger" 
		  ><CIcon name="cil-check" /> Proceed</CButton>
        </CModalFooter>
      </CModal>
		  <CModal
        show={modalData}
        onClose={toggleData}
      >
        <CModalHeader closeButton>{store.getState().HeadModal}</CModalHeader>
        <CModalBody>
		<CAlert color="success" className={store.getState().ShowHideAl}>{store.getState().AlertMsg}</CAlert>
         <CForm 
				 onSubmit={(e) => {
                      SubmitForm(e);
				}}
			  className="was-validated">
                <CFormGroup>
                  <CLabel htmlFor="customer_id">Shipment id</CLabel>
				     <CInput type="text" name="shipment_id"  value={FormData.shipment_id || ""} disabled/>
                </CFormGroup>
				<CFormGroup>
                  <CLabel htmlFor="customer_id">Assign</CLabel>
				   <CInput type="hidden" name="id"  value={FormData.id || ""} disabled/>
				   <CSelect name="assign"  value={FormData.assign || ""} onChange={onFieldChange('assign').bind(this)} required>
				     <option value="">== Pilih Status ==</option>
					 <option value="1">Assign Ke Saya</option>
				    </CSelect>
                </CFormGroup>

				<CFormGroup>
				
                  <CButton 
			 
			  type="submit" size="sm" color="primary">
			  <CIcon name="cil-check" /> {store.getState().modulState}</CButton> {store.getState().Spinner}
			 
			  
                </CFormGroup>
              </CForm>
        </CModalBody>
        <CModalFooter>
          {' '}
          <CButton
            color="secondary"
            onClick={toggleData}
          ><CIcon name="cil-x" /> Cancel</CButton>
        </CModalFooter>
      </CModal>
          <CDataTable
            items={userlist}	
            fields={usersData.fields}
            hover
            striped
			activePage = {page}
            itemsperpage={5}
            //clickableRows
			loading={loading}
            //onRowClick={(item) => history.push(`/usermanagement/listusers/${item.id}/`+page)}
            scopedSlots = {{
				'button_td':
                (item)=>(
                  <td>
				       {getButton(item)}
                  </td>
                ),
				'index':
                (item,index)=>(
				  <td>
				   <CBadge color="info">
                      {GetPage(index+1,page)}
                   </CBadge>
				  </td>
                ),
				'customer_name':
                (item)=>(
				  <td>
				  {primaryBadge(item.customer_name)}
				  </td>
                ),
				'item_name':
                (item)=>(
				  <td>
				  {primaryBadge(item.item_name)}
				  </td>
                ),
				'name':
                (item)=>(
				  <td>
				  {primaryBadge(item.name)}
				  </td>
                ),
				'qty':
                (item)=>(
				  <td>
				  {primaryBadge(item.qty)}
				  </td>
                )
            }}
          />
          <CPagination
            activePage = {page} 
            onActivePageChange={pageChange}
            itemsPerPage={5}
            doubleArrows={true} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

const mapStateToProps = (state, action) => {
  return { state: action.history.location.pathname };
};

export default connect(mapStateToProps,{ store: store })(Delivery)
