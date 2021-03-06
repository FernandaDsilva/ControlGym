const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    all(callback) {

        // ORDER BY para ordernar os dados
        db.query(`
            SELECT instructors.*, count(members) AS total_students 
            FROM instructors
            LEFT JOIN members ON (instructors.id = members.instructor_id)
            GROUP BY instructors.id
            ORDER BY total_students DESC
            `, function (err, results){
                if(err) throw `Database error! ${err}`    
                callback(results.rows)
        })

    },
    create (data, callback) {
        // inserindo informações na tabela no banco de dados
        const query = `
            INSERT INTO instructors (
                name, 
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        // esse array sera responsavel por substituir os placeholder ($1, $2...)
        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso
        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database error! ${err}`            
            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE instructors SET
                avatar_url=($1),
                name=($2),
                birth=($3),
                gender=($4),
                services=($5)
            WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, function(err, results){
            if(err) `Database error! ${err}`              
            callback()
        })
    },
    delete(id, callback) {
        db.query(`
            DELETE 
            FROM instructors 
            WHERE id = $1`, [id], function(err, results) {
                if(err) throw `Database error! ${err}`             
                return callback()
        })
    },
  
}
