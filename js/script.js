document.addEventListener('DOMContentLoaded', () => {
    // On Page Load
    // When the page first loads, the first text field should have the 
    // focus state by default to prompt the user.
    const nameField = document.querySelector("label[for=name] input")
    nameField.focus()

    // Job Role Section
    // If the user selects "Other" in the "Job Role" drop-down menu,
    // they can enter info into the "Other job role" text field. This field 
    // should be hidden by default and only be displayed if "Other" is selected 
    // in the drop-down menu.
    const jobDropdown = document.querySelector("select[name=user-title]")
    jobDropdown.nextElementSibling.hidden = true
    jobDropdown.addEventListener("change", (e) => {
        if (e.target.value === 'other') {
            jobDropdown.nextElementSibling.hidden = false
        } else {
            jobDropdown.nextElementSibling.hidden = true
        }
    })

    // T-Shirt Section
    // The options in the "Color" drop-down menu are not available 
    // for each t-shirt design, so the user shouldn’t be able to see or 
    // choose a color option until they have chosen a design.
    const colorDropdown = document.querySelector("select[id=color]")
    colorDropdown.disabled = true

    const designDropdown = document.querySelector("select[id=design]")
    designDropdown.addEventListener("change", (e) => {
        colorDropdown.disabled = false
        let userOption = e.target.value
        let optionList = colorDropdown.querySelectorAll("option")
        let firstMatch
        for (let i = 0; i < optionList.length; i++) {
            style = optionList[i].dataset.theme
            if (style === userOption) {
                optionList[i].hidden = false
                optionList[i].disabled = false
                if (!firstMatch) {
                    firstMatch = optionList[i]
                    optionList[i].selected = true
                }
            } else {
                optionList[i].hidden = true
                optionList[i].disabled = true
            }
        }
    })

    // Activities Section
    // The "Total: $" paragraph below the "Register for Activities" section
    // should update to reflect the total cost of all the selected activities.
    const activitiesFields = document.querySelector("#activities")
    let totalField = document.querySelector("#total-amount")
    let total = parseFloat(totalField.textContent)

    activitiesFields.addEventListener("change", (e) => {
        let checkedElement = e.target
        let amount = parseFloat(checkedElement.dataset.cost)
        checkedElement.checked ? total += amount : total -= amount
        totalField.textContent = `${total}`
    })

    // Payment Info Section
    // The credit card payment option should be selected for the user by default. 
    // So upon page load "Credit Card" should be the selected option of the 
    // select element, and the credit card payment section should be the only payment 
    // section displayed on the page. When the user selects a different payment option 
    // from the drop-down menu, the form should update to display only the chosen 
    // payment method section.
    const paymentDropdown = document.querySelector("#payment")
    const ccDiv = document.querySelector("#credit-card")
    const paypalDiv = document.querySelector("#paypal")
    const bitcoinDiv = document.querySelector("#bitcoin")

    // Initial state of payment section
    let paymentOptions = paymentDropdown.querySelectorAll("option")
    paymentOptions[1].selected = true
    ccDiv.hidden = false
    paypalDiv.hidden = true
    bitcoinDiv.hidden = true

    // Update display based on user selection
    paymentDropdown.addEventListener("change", (e) => {
        selectedPayment = e.target.value
        switch (selectedPayment) {
            case 'paypal':
                ccDiv.hidden = true
                paypalDiv.hidden = false
                bitcoinDiv.hidden = true
                break
            case 'bitcoin':
                ccDiv.hidden = true
                paypalDiv.hidden = true
                bitcoinDiv.hidden = false
                break
            default:
                ccDiv.hidden = false
                paypalDiv.hidden = true
                bitcoinDiv.hidden = true
        }
            
    })

    // Form Validation
    const form = document.querySelector("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        // The "Name" field cannot be blank or empty.
        const nonBlankCheck = /\S+/
        if (!nonBlankCheck.test(nameField.value)) {
            console.log("this is blank!")
            e.preventDefault()
        } else {
            console.log("valid name")
        }

        // The "Email Address" field must contain a correctly formatted email address
        let emailField = document.querySelector("#email")
        const emailCheck = /^\w+@\w+\.[a-z]{3,4}$/
        console.log(emailCheck.test(emailField.value))
        if (!emailCheck.test(emailField.value)) {
            console.log("this is not formatted correctly - try again!")
            e.preventDefault()
        } else {
            console.log("valid email")
        }

        // The "Register for Activities" section must have at least one activity selected.
        const selectedActivities = activitiesFields.querySelectorAll("input")
        let oneSelected = false

        for (let i = 0; i < selectedActivities.length; i++) {
            if (selectedActivities[i].checked === true) {
                oneSelected = true
                break
            }
        }

        if (!oneSelected) {
            console.log("There are no activities selected. Please select at least one")
            e.preventDefault()
        } else {
            console.log("valid activities section")
        }
        
    })
})
