import React from 'react'
import { render, fireEvent, waitForDomChange, waitFor } from "@testing-library/react";
import ContactForm from "./components/ContactForm";
import { act } from 'react-dom/test-utils';


const typeAndExpect = (element, text) =>{
    fireEvent.change(element, { target: {name: element.name, value: text}})
    
    expect(element.value).toBe(text)
}

const fillForm = (component) =>{
    const rendered = render(component)
    const firstNameField = rendered.getByTestId('firstName')
    const lastNameField = rendered.getByTestId('lastName')
    const emailField = rendered.getByTestId('email')
    const messageField = rendered.getByTestId('message')
    typeAndExpect(firstNameField, 'Allison')
    typeAndExpect(lastNameField, 'Usher')
    typeAndExpect(emailField, 'test@email.com')
    typeAndExpect(messageField, 'This is a test message')
    return rendered
}

// test('intentional failing', () =>{
//     const rendered = render(<ContactForm />)
//     const messageField = rendered.getByTestId('message')
//     fireEvent.change(messageField, { target: {name: messageField.name, value: 'text'}})
//     expect(messageField.value).toBe('Allison')
// })

test('has all the correct fields, and typing in them works', () =>{
    fillForm(<ContactForm />)
  })

test('can submit form', async () =>{
    
    const contactForm = fillForm(<ContactForm />)
    const submitButton = contactForm.getByTestId('submitButton')
    act(() => {fireEvent.click(submitButton)})
    await waitFor(() =>{
        return contactForm.getByTestId('results')
        
    })
    .then((results) =>{
        expect(results).toHaveTextContent(JSON.stringify({
            firstName: 'Allison',
            lastName: 'Usher',
            email: 'test@email.com',
            message: 'This is a test message',
            reason: 'technical'
        }))
    })
})