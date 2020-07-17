import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from 'axios'

const ContactForm = () => {
  const [data, setData] = useState();
  const [post, setPost] = useState();
  const { register, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const onSubmit = (data) => {
    setData(data);
  };

  useEffect(() =>{
    if(data){
    Axios.post('https://reqres.in/api/users', data)
      .then(data =>{
        setPost(data.data)
      })
    }
  }, [data])

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            data-testid='firstName'
            name="firstName"
            placeholder="Edd"
            ref={register({ required: true, minLength: 3 })}
          />
          {errors.firstName && (
            <p>Looks like there was an error: {errors.firstName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            data-testid='lastName'
            name="lastName"
            placeholder="Burke"
            ref={register({ required: true })}
          />
          {errors.lastName && (
            <p>Looks like there was an error: {errors.lastName.type}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" placeholder="bluebill1049@hotmail.com">
            Email*
          </label>
          <input data-testid='email' name="email" ref={register({ required: true })} />
          {errors.email && (
            <p>Looks like there was an error: {errors.email.type}</p>
          )}
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea data-testid='message' name="message" ref={register({ required: false })} />
        </div>
        <div>
          <label htmlFor='reason'>Question Type</label>
          <select data-testid='reason' name='reason' ref={register({required: true})}>
            <option value='general'>General</option>
            <option value='technical'>Technical</option>
          </select>
        </div>
        {post && (
          <pre data-testid='results' style={{ textAlign: "left", color: "white" }}>
            {JSON.stringify(post, null, 2)}
          </pre>
        )}
        <input type="submit" data-testid='submitButton' />
      </form>
    </div>
  );
};

export default ContactForm;
