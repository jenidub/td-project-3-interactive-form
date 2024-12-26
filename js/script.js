document.addEventListener('DOMContentLoaded', () => {
    //Step 1: When the page first loads, the first text field should have the 
    // focus state by default to prompt the user.
    const nameField = document.querySelector("label[for=name] input")
    nameField.focus()

    //Step 2: If the user selects "Other" in the "Job Role" drop-down menu,
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
})