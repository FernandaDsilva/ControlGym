module.exports = {
    age: function (timeStamp) {
        const today = new Date()
        const birthDate = new Date(timeStamp)
    
        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
    
        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()){
          age = age - 1
        }
        return age
},
    date: function(timeStamp){
        const date = new Date(timeStamp)

        const year = date.getUTCFullYear()

        const month = `0${date.getUTCMonth() + 1}`.slice(-2)

        const day = `0${date.getUTCDate()}`.slice(-2)
        
        return `${year}-${day}-${month}`
  }
}