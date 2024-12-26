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
    jobDropdown.nextElementSibling.style.display = "none"
    jobDropdown.addEventListener("change", (e) => {
        if (e.target.value === 'other') {
            jobDropdown.nextElementSibling.style.display = "block"
        } else {
            jobDropdown.nextElementSibling.style.display = "none"
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
    console.log("initial total: ", total)

    activitiesFields.addEventListener("change", (e) => {
        let checkedElement = e.target
        let amount = parseFloat(checkedElement.dataset.cost)
        checkedElement.checked ? total += amount : total -= amount
        totalField.textContent = `${total}`
    })
})
