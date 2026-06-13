import React from 'react'
import {useState,useEffect} from 'react';
import "./OrderviewbyAdmin.css"
import { firestore } from '../firebase';
import { collection, getDocs, doc, updateDoc, where, query } from 'firebase/firestore';

function OrderviewbyAdmin() {
    const [Allorders,setAllorders]=useState([]);

    useEffect(()=>{
        const fetchAllorders = async () => {
            try {
                const q = query(collection(firestore, "orders"), where("status", "==", "pending"));
                const orders=await getDocs(q);
                const ordersArray=[];
                orders.forEach((doc)=>{
                    ordersArray.push({
                        ...doc.data(),
                        id: doc.id
                    });
                });
                setAllorders(ordersArray);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchAllorders();
    },[]);

    const completeOrder=async(id)=>{
        try {
            const orderRef = doc(firestore, "orders", String(id));
            await updateDoc(orderRef, { status: "completed" });
            setAllorders(prev => prev.filter(item => item.id !== id));
            alert("Order marked as completed");
        } catch (error) {
            console.error("Error updating order status:", error);
            alert("Failed to update order status. Please check your permissions.");
        }
    }


  return (
    <div>
        <h1 className="vo-head">orders</h1>
     <div className='orderslist'>
        {Allorders && Allorders.map((item)=>{
            return(
                <div key={item.id} className='orderlist-card'>
                   
                    <p><strong>name:</strong> {item.FullName}</p>
                    <p><strong>Email:</strong> {item.email}</p>
                    <p><strong>phone Number :</strong> {item.phoneNumber}</p>
                    <p><strong>ordered item :</strong> {item.selectedItem}</p>
                    <p><strong>quantity:</strong>{item.quantity}</p>
                    <p><strong>delivery address :</strong> {item.deliveryAddress}</p>
                    <p><strong>deliveryDate :</strong> {item.deliveryDate}</p>
                    <p><strong>ordered Time :</strong>{ item.orderAt}</p>
                    <p><strong>order Notes :</strong>{item.orderNotes}</p>
                    <p><strong>Totalprice : </strong>{item.totalPrice}</p>
                  
                    <p><strong>status :</strong> {item.status}</p>
                    <p className='complete-btn'><button onClick={()=>{completeOrder(item.id)}}>completed</button></p>
                   
                   
                   
                   
                    
                   
                </div>
            )
        })}
     </div>
    </div>
  )
}

export default OrderviewbyAdmin
