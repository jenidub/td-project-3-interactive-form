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
    const activityFields = document.querySelector("#activities")
    let totalField = document.querySelector("#total-amount")
    let total = parseFloat(totalField.textContent)

    activityFields.addEventListener("change", (e) => {
        let checkedElement = e.target
        let amount = parseFloat(checkedElement.dataset.cost)
        checkedElement.checked ? total += amount : total -= amount
        totalField.textContent = `${total}`
    })

    //Add Accessibility Features to Activities Section
    //When the checkboxes in the "Register for Activities" section are in focus, 
    // there’s little to no indication. So to improve accessibility, 
    // the checkboxes’ parent label elements should receive additional 
    // styles when their respective checkboxes are in focus.
    const activityInputs = document.querySelectorAll("input[type=checkbox")
    for (let i = 0; i < activityInputs.length; i++) {
        currentElement = activityInputs[i]
        currentElement.addEventListener("focus", (e) => {
            e.target.parentNode.classList.add("focus")
        })
        currentElement.addEventListener("blur", (e) => {
            console.log(e.target.parentNode.classList)
            e.target.parentNode.classList.remove("focus")
        })
    }

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
        // The "Name" field cannot be blank or empty.
        const nameCheck = /\S+/
        if (!nameCheck.test(nameField.value)) {
            console.log("this is blank!")
            e.preventDefault()
        } else {
            console.log("valid name")
        }

        // The "Email Address" field must contain a correctly formatted email address
        let emailField = document.querySelector("#email")
        const emailCheck = /^\w+@\w+\.[a-z]{3,4}$/
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

        !oneSelected ? e.preventDefault() : console.log("valid activities section")
        
        // CC SELECTION VALIDATIONS
        if (ccDiv.hidden === false) {
            //CC Section Validator Function
            const ccSectionValidator = (regex, entry) => {
                if (!regex.test(entry)) {
                    e.preventDefault()
                    console.log("Invalid entry - please check")
                } else {
                    console.log("Valid entry")
                }
            }

            // [1] CC Number Validation
            const ccnValidate = /^\d{13,16}$/
            let ccnEntry = document.querySelector("#cc-num").value
            ccSectionValidator(ccnValidate, ccnEntry)
            
            // [2] CC Zip Code Validation
            const zipValidate = /^\d{5}$/
            let zipEntry = document.querySelector("#zip").value
            ccSectionValidator(zipValidate, zipEntry)

            // [3] CC CVV Validation
            const cvvValidate = /^\d{3}$/
            let cvvEntry = document.querySelector("#cvv").value
            ccSectionValidator(cvvValidate, cvvEntry)
        }
    })


})
