import React, { useState,useEffect } from 'react'
import './Menu.css'
import cake from '../assets/cake.jpg'
import { firestore } from '../firebase'
import { collection,addDoc,getDocs ,deleteDoc,doc } from 'firebase/firestore'
function Menu({user}) {
    const [menu_items, setMenuItems] = useState([])
    const [imageFile,setImageFile]=useState(null);
    const [showModal, setShowModal] = useState(false)
    const [selectedItems, setSelectedItems] = useState(new Set())
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        
    })

    useEffect(()=>{
        const fetchItems=async()=>{
            try {
                const items=await getDocs(collection(firestore,"items"));
                const AllItems=[]
                items.forEach((doc)=>{
                    AllItems.push(
                        {
                            id:doc.id,
                            ...doc.data()
                        }
                    )})
                setMenuItems(AllItems);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        }

        fetchItems();
    },[])

    const handleAddClick = () => {
        setShowModal(true)
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const uploadImage=async()=>{
            const data=new FormData();
            data.append("file",imageFile)
            data.append("upload_preset","menu_items")
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dznaecl78/image/upload",
                {
                    method: "POST",
                    body: data
                }
            );

            if (!response.ok) {
                throw new Error("Failed to upload image to Cloudinary");
            }

            const result = await response.json();

        return result.secure_url;
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault();
            if (!imageFile) {
                alert("Please select an image");
                return;
            }
       
            try{
                 const imageUrl = await uploadImage();
                if (formData.name && formData.price) {
                    const newItem = {
                        ...formData,
                        imageUrl,
                        
                        
                    }
                const docRef = await addDoc(
                    collection(firestore,"items"),
                    newItem
                );
                setMenuItems(prev => [...prev,{
                        id: docRef.id,
                        ...newItem
                    }
                ]);
                alert("successfully added");
                setFormData({
                    name: "",
                    price: ""
                });

                setImageFile(null);
                }
            }
            catch(error){
                console.error("Error adding item:", error);
                alert("Failed to add the item. Please check your connection.");
            }
            setShowModal(false);
        }
    

    const handleSelectItem = (id) => {
        const newSelected = new Set(selectedItems)
        if (newSelected.has(id)) {
            newSelected.delete(id)
        } else {
            newSelected.add(id)
        }
        setSelectedItems(newSelected)
    }

   
    const handleDeleteClick = async () => {

        if (selectedItems.size === 0) {
            alert("Please select items to delete");
            return;
        }

        try {

            for (const itemId of selectedItems) {

                await deleteDoc(
                    doc(firestore, "items", itemId)
                );
            }

            setMenuItems(
                menu_items.filter(
                    item => !selectedItems.has(item.id)
                )
            );

            setSelectedItems(new Set());
            alert("deleted successfully");

        } catch(error) {
            console.error("Error deleting items:", error);
            alert("Failed to delete some items. Please check your permissions.");
        }
    };
    console.log(menu_items)

    return (
        <div className="menu">
            <div className="menu-header">
                <h1>Our menu</h1>

                {user?.email==="admin923@gmail.com" && (<div className="menu-actions">
                    <button className="menu-action-btn" onClick={handleAddClick}>Add Item</button>
                    <button className="menu-action-btn delete" onClick={handleDeleteClick}>Delete Item</button>
                </div>)}
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Add New Item</h2>
                            <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="form-group">
                                <label>Item Name</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    placeholder="Enter item name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input 
                                    type="number" 
                                    name="price" 
                                    value={formData.price}
                                    onChange={handleFormChange}
                                    placeholder="Enter price"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                              <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-submit">Add Item</button>
                                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="menu-grid">
                {menu_items.map((item) => {
                    return (
                        <div className="menu-card" key={item.id}>
                            <input 
                                type="checkbox" 
                                className="card-checkbox"
                                checked={selectedItems.has(item.id)}
                                onChange={() => handleSelectItem(item.id)}
                            />
                            <img src={item.imageUrl} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>${item.price}</p>
                           
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Menu
