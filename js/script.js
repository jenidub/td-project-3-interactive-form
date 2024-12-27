document.addEventListener('DOMContentLoaded', () => {
    // ON PAGE LOAD
    // - When the page first loads, the first text field should have the 
    // focus state by default to prompt the user.
    const nameField = document.querySelector("label[for=name] input")
    nameField.focus()

    // JOB ROLE SELECTION
    // - The Other text box hidden at page load
    // - If 'Other' is selected, the text box will appear
    const jobDropdown = document.querySelector("select[name=user-title]")
    jobDropdown.nextElementSibling.hidden = true
    jobDropdown.addEventListener("change", (e) => {
        if (e.target.value === 'other') {
            jobDropdown.nextElementSibling.hidden = false
        } else {
            jobDropdown.nextElementSibling.hidden = true
        }
    })

    // T-SHIRT INFO SECTION
    // - On page load, the option 'Select Theme' is showing
    // - Toggle between the shirt list based on the user selection in the Design dropdown
    // - Hide the other shirt options once the design is selected
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

    // REGISTER FOR ACTIVITIES SECTION
    // As the user selects activities, the total in the <span id="total-amount"> will update (+/-)
    const activityFieldset = document.querySelector("#activities")
    const activityInputs = document.querySelectorAll("input[type=checkbox")
    let totalField = document.querySelector("#total-amount")
    let total = parseFloat(totalField.textContent)

    activityFieldset.addEventListener("change", (e) => {
        let currentElement = e.target
        let amount = parseFloat(currentElement.dataset.cost)
        currentElement.checked ? total += amount : total -= amount
        totalField.textContent = `${total}`
    })

    // Add/remove "focus" class styling to the respective activity
    // are in focus to improve accessibility for the website
    for (let i = 0; i < activityInputs.length; i++) {
        currentElement = activityInputs[i]
        currentElement.addEventListener("focus", (e) => {
            e.target.parentNode.classList.add("focus")
        })
        currentElement.addEventListener("blur", (e) => {
            e.target.parentNode.classList.remove("focus")
        })
    }

    // PAYMENT INFO SECTION
    // - On page load, show the CC option as the default / preferred option
    // with associated text boxes
    // - Update the displayed <div> based on the user selection in the 
    // "I'm going to pay with:" dropdown menu
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

    // FORM VALIDATION ON SUBMIT
    // Set up form validation for the required sections and fields
    // that have specific format requirements when the submit button is clicked
    const form = document.querySelector("form")
    form.addEventListener("submit", (e) => {
        // Helper function to handle the form field validation styling
        const formFieldValidator = (valid, field, hint) => {
            if (!valid) {
                field.parentNode.classList.add("not-valid")
                field.parentNode.classList.remove("valid")
                hint.style.display = "block"
                e.preventDefault()
            } else {
                field.parentNode.classList.add("valid")
                field.parentNode.classList.remove("not-valid")
                hint.style.display = "none"
            }
        }

        // NAME FIELD
        // The "Name" field cannot be blank or empty
        const nameCheck = /\S+/
        const nameHint = document.querySelector("#name-hint")
        let nameValue = nameField.value
        let nameValid = nameCheck.test(nameValue)
        formFieldValidator(nameValid, nameField, nameHint)

        // EMAIL ADDRESS FIELD
        // The "Email Address" field must contain a correctly formatted email address
        const emailCheck = /^\w+@\w+\.[a-z]{3,4}$/
        const emailHint = document.querySelector("#email-hint")
        const emailField = document.querySelector("#email")
        let emailValue = emailField.value
        let emailValid = emailCheck.test(emailValue)
        formFieldValidator(emailValid, emailField, emailHint)

        // CC PAYMENT OPTION FIELDS
        // Validate the info in the credit card number, zip code, and CVV number fields
        if (ccDiv.hidden === false) {
            // [1] CC Number Validation
            // The CC number must be between 13-16 digits between 0-9
            const ccnValidate = /^\d{13,16}$/
            const ccnField = document.querySelector("#cc-num")
            const ccnHint = document.querySelector("#cc-hint")
            let ccnEntry = ccnField.value
            let ccnValid = ccnValidate.test(ccnEntry)
            formFieldValidator(ccnValid, ccnField, ccnHint)
            
            // [2] CC Zip Code Validation
            // The zip code must be 5 digits between 0-9
            const zipValidate = /^\d{5}$/
            const zipField = document.querySelector("#zip")
            const zipHint = document.querySelector("#zip-hint")
            let zipEntry = zipField.value
            let zipValid = zipValidate.test(zipEntry)
            formFieldValidator(zipValid, zipField, zipHint)

            // [3] CC CVV Validation
            // The CC CVV number must be 3 digits between 0-9
            const cvvValidate = /^\d{3}$/
            const cvvField = document.querySelector("#cvv")
            const cvvHint = document.querySelector("#cvv-hint")
            let cvvEntry = cvvField.value
            let cvvValid = cvvValidate.test(cvvEntry)
            formFieldValidator(cvvValid, cvvField, cvvHint)
        }

        // REGISTER FOR ACTIVITIES FIELDSET
        // The "Register for Activities" section must have at least one activity selected.
        const activityField = document.querySelector("#activities-box")
        const activityHint = document.querySelector("#activities-hint")
        let activityValid = false
        for (let i = 0; i < activityInputs.length; i++) {
            if (activityInputs[i].checked === true) {
                activityValid = true
                break
            }
        }
        
        formFieldValidator(activityValid, activityField, activityHint)
    })
})
