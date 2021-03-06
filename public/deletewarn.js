const formDelete = document.querySelector("#form-delete")
formDelete.addEventListener("submit", function(event){
    const confirmation = confirm("Do you really want to delete?")
    if(!confirmation) {
      
        event.preventDefault()
    }
})

module.exports = deletewarn.js