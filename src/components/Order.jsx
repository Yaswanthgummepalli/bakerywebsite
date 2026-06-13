import React from 'react'
import './Order.css'
import {useState,useEffect} from 'react';
import { firestore } from '../firebase';
import { collection, addDoc, getDocs,query,where } from "firebase/firestore";
function Order({user}) {
  const [orderData,setOrderData]=useState({
    FullName:"",
    phoneNumber:"",
    selectedItem: "",
    quantity:"",
    deliveryDate:"",
    deliveryAddress:"",
    orderNotes:""
   })
    const [allorders,setAllorders]=useState([]);

    const [allItems,setAllItems]=useState([]);

    useEffect(()=>{
        const fetchItemsForOrders=async()=>{
          try {
            const items=await getDocs(collection(firestore,"items"));
            const array=[];
            items.forEach((doc)=>{
              array.push({
                id:doc.id,
                 ...doc.data()
              })
            })
            setAllItems(array);
          } catch (error) {
            console.error("Error fetching menu items:", error);
          }

            
        }

        fetchItemsForOrders();
    },[])

  
 
     useEffect(() => {
    
            if (!user) return;
            const fetchOrders = async () => {
                try {
                    const q = query(
                      collection(firestore, "orders"),
                      where("email", "==", user.email),
                      where("status","==","pending")
                    );
                    const order = await getDocs(q);
                    const ordersArray = [];
                    order.forEach((doc) => {
                      ordersArray.push({
                          id: doc.id,
                          ...doc.data()
                      });
                    });
                    setAllorders(ordersArray);
                } catch (error) {
                    console.error("Error fetching user orders:", error);
                }
                
            };

            fetchOrders();
          

}, [user]);
  

   

   const [errors,setErrors]=useState({})


   const FormValidation=()=>{
        const formErrors={}

        if(!orderData.FullName.trim()) formErrors.FullName="this field is required";
        if (!orderData.selectedItem.trim()) formErrors.selectedItem="this field is required";
        if(!orderData.quantity.trim()) {formErrors.quantity="this field is required";}
        else if(Number(orderData.quantity) <= 0) {
          formErrors.quantity = "quantity must be greater than 0";
        }

        if(!orderData.deliveryDate.trim())  formErrors.deliveryDate="this field is required";
        if(!orderData.deliveryAddress.trim())  formErrors.deliveryAddress='this field is required'

        if(!orderData.phoneNumber.trim()) {
          formErrors.phoneNumber="this field is required";
        }
        else if(!/^\d{10}$/.test(orderData.phoneNumber)){
          formErrors.phoneNumber="phone number should be 10 digits";
        }

      return formErrors;
   }
   const handleChange=(e)=>{
      const {name,value}=e.target;
      setOrderData((prev)=>({
        ...prev,
        [name]:value
      }))
      if(errors[name])
      {
        setErrors(prev=>({
          ...prev,
          [name]:""
        }))
      }
    
   };

   const handleForm=async(e)=>{
      e.preventDefault();
      const validationerrors=FormValidation();
     
      if(Object.keys(validationerrors).length===0)
      {
        const selectedMenuItem = allItems.find(
          (item) => item.name === orderData.selectedItem
        );

        const price = selectedMenuItem?.price || 0;

        const totalPrice = price * Number(orderData.quantity);
        
        const newOrder={
          ...orderData,
          email: user.email,
          orderAt: new Date().toLocaleString(),
          totalPrice:totalPrice,
          status:"pending"
        }
        try{
          const docRef = await addDoc(collection(firestore,"orders"),newOrder);
          setAllorders((prev)=>[...prev, { ...newOrder, id: docRef.id }]);
          alert("Successfully ordered");
        }
        catch(error){
          console.error("Error placing order:", error);
          alert("Failed to place order. Please check your connection.");
        }
        setOrderData({
        FullName:"",
        phoneNumber:"",
        selectedItem: "",
        quantity:"",
        deliveryDate:"",
        deliveryAddress:"",
        orderNotes:""
            
        })
      } 
      else{
         setErrors(validationerrors);
      }
      

   }

   const GrandTotal=Array.isArray(allorders)?allorders.reduce((total,item)=>{
        return total+item.totalPrice
   },0):0;
   


  return (
    <div>
      <h1 className='o-head'>Place Your Order</h1>
      <div className='order-details'>
        <div className='form-div'>
          <h2>order details</h2>
          <form action="" className='order-form' onSubmit={handleForm}>
            <div className='input-1'>
                  <input type="text" placeholder='Enter Full name' name="FullName" value={orderData.FullName}  className={errors.FullName ? 'input-error' : ''} onChange={handleChange}/>
                  {errors.FullName && <p className='error-message'>{errors.FullName}</p>}
            </div>
             <div className="input-2">
              <input type="number" placeholder="Enter Phone Number:" name="phoneNumber" value={orderData.phoneNumber} className={errors.phoneNumber ? 'input-error' : ''} onChange={handleChange}/>
               {errors.phoneNumber && <p className='error-message'>{errors.phoneNumber}</p>}
             </div>
           
             <div  className="input-4">
                <select name="selectedItem"  value={orderData.selectedItem} className={errors.selectedItem ? 'input-error' : ''} id="select-tag" onChange={handleChange}>
                <option value="">Select item</option>
                  {(allItems ?? []).map((items)=>(
                   <option key={items.id} value={items.name}>
                      {items.name}
                   </option>
                  
                  ))}
              </select>
               {errors.selectedItem && <p className='error-message'>{errors.selectedItem}</p>}
             </div>
             <div className="input-5">
              <input type="number" placeholder='Quantity' name="quantity" value={orderData.quantity} className={errors.quantity ? 'input-error' : ''} onChange={handleChange}/>
               {errors.quantity && <p className='error-message'>{errors.quantity}</p>}
             </div>
             <div className="input-6">
               <input type="date" placeholder='Delivery Date:' name="deliveryDate" value={orderData.deliveryDate} className={errors.deliveryDate ? 'input-error' : ''}  onChange={handleChange}/>
                {errors.deliveryDate && <p className='error-message'>{errors.deliveryDate}</p>}
             </div>
             <div className="input-7"> 
               <input type="text" placeholder='Delivery Address:' name="deliveryAddress"value={orderData.deliveryAddress} className={errors.deliveryAddress ? 'input-error' : ''} onChange={handleChange}/>
                {errors.deliveryAddress && <p className='error-message'>{errors.deliveryAddress}</p>}
             </div>
             <input type="text" placeholder='Order Notes(Optional):' name="orderNotes" value={orderData.orderNotes} className="input-8" onChange={handleChange}/>
            <button className='form-btn' type='submit' >Place Order</button>


          </form>

        </div>
        <div className='view-orders'>
          <h1>Your orders</h1>
          <hr />
          <div >
            {(allorders ?? []).map((item)=>{
              return (
               
                <div className='order-card' key={item.id}>
                  
                    <h2>{item.selectedItem}</h2>
                    <h2>{item.totalPrice}</h2>
                    
                 

                </div>
              )
            })}
            <hr />
           

                {allorders?.length > 0 && (
                  <h1>GrandTotal: ₹{GrandTotal}</h1>
                )}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Order
