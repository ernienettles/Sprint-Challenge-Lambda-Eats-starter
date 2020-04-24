import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
import {Link} from 'react-router-dom';
import Nav from "./Nav";

    const formSchema = yup.object().shape({
        name: yup.string().min( 2, `Must be more than 2 characters`).required("Name is a required field"),
        pizzaSize: yup.string().required("Choose your pizza size!"),
        pepperoni: yup.string(),
        ham: yup.string(),
        sausage: yup.string(),
        mushrooms: yup.string(),
        specialInstructions: yup.string()
    })


    export default function Form(){

        const [formState, setFormState] = useState({
            name: "",
            pizzaSize: "",
            pepperoni: "",
            ham: "",
            sausage: "",
            mushrooms: "",
            specialInstructions: ""
        });

        const [errors, setErrors] = useState({
            name: "",
            pizzaSize: "",
            pepperoni: "",
            ham: "",
            sausage: "",
            mushrooms: "",
            specialInstructions: ""
        });

        const [buttonDisabled, setButtonDisabled] = useState(true);

        const [users, setUsers] = useState([]);


        const formSubmit = e => {
            e.preventDefault();
            axios.post("https://reqres.in/api/users", formState)
            .then(response => {
                setUsers([...users, response.data]);
                console.log("Success!", users);
                setFormState({
                    name: "",
                    pizzaSize: "",
                    pepperoni: "",
                    ham: "",
                    sausage: "",
                    mushrooms: "",
                    specialInstructions: ""
                })
            })
            .catch(error => {
                console.log(error.response);
            })
        }

        useEffect(() => {
            formSchema.isValid(formState).then(valid => {
                setButtonDisabled(!valid);
            })
        }, [formState]);

        const validateChange = e => {
            yup.reach(formSchema, e.target.name).validate(e.target.value)
            .then(valid => {
                setErrors({ ...errors, [e.target.name]: ""})
            })
            .catch(error => {
                setErrors({
                    ...errors, [e.target.name]: error.errors[0]
                })
            });
        };

        const inputChange = e => {
            e.persist();
            const newFormData = {
                ...formState, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
            };
            validateChange(e);
            setFormState(newFormData);
        };

        return (
            <div>
            <Nav />
            <form onSubmit={formSubmit}>
                <h2>Build Your Own Pizza</h2>
                <label htmlFor="name">
                    Name
                    <br/>
                    <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formState.name}
                    onChange={inputChange}
                    />
                    {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
                </label>
                <br/>
                <label htmlFor="pizzaSize">
                    Choose Pizza Size
                    <br/>
                    <select name='pizzaSize' onChange={inputChange}>
                        <option value='None'></option>
                        <option value='Small'>Small</option>
                        <option value='Medium'>Medium</option>
                        <option value='Large'>Large</option>
                        <option value='X Large'>X Large</option>
                    </select>
                    {errors.pizzaSize.length > 0 ? <p className="error">{errors.pizzaSize}</p> : null}
                </label>
                <br/>
                <label htmlFor="pepperoni">
                    Pepperoni
                    <input
                    type="checkbox"
                    name="pepperoni"
                    checked={formState.pepperoni}
                    onChange={inputChange}
                    />
                </label>
                <br/>
                <label htmlFor="ham"></label>
                    Ham
                    <input
                    type="checkbox"
                    name="ham"
                    checked={formState.ham}
                    onChange={inputChange}
                    />
                <br/>
                <label htmlFor="sausage"></label>
                    Sausage
                    <input
                    type="checkbox"
                    name="sausage"
                    checked={formState.sausage}
                    onChange={inputChange}
                    />
                <br/>
                <label htmlFor="mushrooms"></label>
                    Mushrooms
                    <input
                    type="checkbox"
                    name="mushrooms"
                    checked={formState.mushrooms}
                    onChange={inputChange}
                    />
                <br/>
                <label htmlFor="specialInstructions">
                    Any special instructions?
                    <br/>
                    <textarea 
                    type="text"
                    name="specialInstructions"
                    placeholder="Instructions"
                    value={formState.specialInstructions}
                    onChange={inputChange}
                    />
                </label>
                <br/>
                <button disabled={buttonDisabled}>Add to Order</button>
                <pre>{users.map( user => JSON.stringify(user, null, 2))}</pre>
            </form>    
            </div>
        )
    }