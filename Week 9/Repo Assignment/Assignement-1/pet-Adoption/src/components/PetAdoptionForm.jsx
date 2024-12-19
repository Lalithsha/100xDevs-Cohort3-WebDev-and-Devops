import { useState, useRef } from "react"



export default function  PetAdoptionForm(){

    const [values, setValues] = useState({
        petName:"",
        petType:"",
        breed:"",
        yourName:"",
        Email:"",
        Phone:""
    })

    const[formData, setFormData]= useState([]);
    
    const {petName,petType, breed, yourName, Email, Phone} = values;

    const showTable = useRef(false)

    const handleChange = (event) =>{
        
        const {name, value} = event.target
        
        console.log(name, value)
        setValues((prevValues)=>({
            ...prevValues,
            [name]:value,
        }))
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        console.log(petName);
        console.log(petType);
        console.log(breed);
        console.log(yourName);
        console.log(Email);
        console.log(Phone);
        
        
        if(petName.trim()==""){
            alert("petName is empty")
        }
        if(petType.trim()==""){
            alert("petType is empty")
        }
        if(breed.trim()==""){
            alert("breed is empty")
        }
        if(yourName.trim()==""){
            alert("Name is empty")
        }
        if(Email.trim()==""){
            alert("Email is empty")
        }
        if(Phone.trim()==""){
            alert("Phone number is empty")
        }
        
        console.log("The event target is", event.target)

       /*  return (
            
        ) */
       console.log(showTable.current)
       if(!showTable.current){
           showTable.current = true;
       }

       const values = {petName,petType, breed, yourName, Email, Phone }
       setFormData((prevData)=>[...prevData, values]);
       
    }
    
    
    return (
        <>
          <form method="post" onSubmit={handleSubmit}>
            <div className="flex flex-col  w-full justify-center items-center">
                <br />
                <label className="pb-2" htmlFor="petName" >Pet name</label>
                <input  className=
                    "tracking-wider placeholder:text-gray-500 pl-[14px] focus:outline-none border border-gray-500 rounded-xl h-12 w-160"
                    type="text" placeholder="Pet Name" value={petName} onChange={handleChange} name="petName"  />
            </div>

            <div className="flex flex-col  w-full justify-center items-center" >
                <br />
                <label className="pb-2" name="petType">Pet Type</label>
                    <input  className=
                    "tracking-wider placeholder:text-gray-500 pl-[14px] focus:outline-none border border-gray-500 rounded-xl h-12 w-160"
                    type="text" placeholder="Dog" value={petType} onChange={handleChange} name="petType"  />
            
            </div>

            <div className="flex flex-col  w-full justify-center items-center">
            <br />
            <label className="pb-2" name="breed" >Breed</label>
                <input  className=
                    "tracking-wider placeholder:text-gray-500 pl-[14px] focus:outline-none border border-gray-500 rounded-xl h-12 w-160"
                     type="text" placeholder="Breed" value={breed} onChange={handleChange} name="breed"  />
            <br />
            </div>

            <div className="flex flex-col  w-full justify-center items-center">
                
                <label className="pb-2" name="yourName" >Your Name</label>
                <input  className=
                    "tracking-wider placeholder:text-gray-500 pl-[14px] focus:outline-none border border-gray-500 rounded-xl h-12 w-160"
                     type="text" placeholder="Your Name" value={yourName} onChange={handleChange} name="yourName" />
            <br />
            </div>

            <div className="flex flex-col  w-full justify-center items-center" >

            <label className="pb-2" name="Email" >Email</label>
                <input className=
                "tracking-wider placeholder:text-gray-500 pl-[14px] focus:outline-none border border-gray-500 rounded-xl h-12 w-160"
                 type="text" placeholder="Email" value={Email} onChange={handleChange} name="Email" />
                <br />
            </div>

            <div className="flex flex-col  w-full justify-center items-center">
                <label className="pb-2" name="Phone" >Phone</label>
                <input  className=
                    "tracking-wider placeholder:text-gray-500 pl-[14px] focus:outline-none border border-gray-500 rounded-xl h-12 w-160"
                     type="text" placeholder="Phone" value={Phone} onChange={handleChange} name="Phone" />
            </div>

            <div className="text-lg flex flex-col items-center justify-center p-3 m-3 " >
                <button className="bg-red-400 border mt-4 " >Submit</button>
            </div>
            </form>



           {
            showTable && 
            <table>
                <tbody>
                <tr>
                    <th>Pet Name</th>
                    <th>Pet Type</th>
                    <th>Breed</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                </tr>
                {formData.map((data,index)=>{
                    <tr key={index} >
                        <td>{data.petName}</td>
                        <td>{data.petType}</td>
                        <td>{data.breed}</td>
                        <td>{data.yourName}</td>
                        <td>{data.Email}</td>
                        <td>{data.Phone}</td>
                    </tr>
                })}

                {formData.map((data, index) => (
                    <tr key={index}>
                        <td>{data.petName}</td>
                        <td>{data.petType}</td>
                        <td>{data.breed}</td>
                        <td>{data.yourName}</td>
                        <td>{data.Email}</td> 
                        <td>{data.Phone}</td> 
                    </tr>
                ))}
                
                </tbody>
                </table>

           }
            
            
            
            
        </>
        
    )
}