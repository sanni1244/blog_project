import mysql from "mysql"

export const db = mysql.createConnection({
    host: 'localhost',  
    user: 'root',    
    password: '',
    database: 'blog'
});



// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database: ' + err.stack);
//         return;
//     }
//     console.log('Connected to database');
// });

// // Close the connection when done 
// db.end();
 