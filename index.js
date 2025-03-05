const express = require('express');
const app = express();
const port = 7000;
const cors = require('cors');
const mysql = require('mysql');
const session = require('express-session')

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
  })

  app.use(cors());

  var bodyParser = require("body-parser");

  //app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

app.listen(port, ()=> console.log("server is online"));


//insert villa

app.post("/InsertVilla",(req, res)=>{
    var villa_name = req.body.villa_name;
    var villa_status = req.body.villa_status;

    var sql_insert = `insert into villas (villa_name, villa_status) values(?,?)`;

    connection.query(sql_insert,[villa_name, villa_status],(err, rows, fields)=>{

        res.send({message:"Villa inserted successfully"});

    });

});

//insert villa

//insert room

app.post("/InsertRoom",(req,res)=>{

  var room_name = req.body.room_name;
  var room_status = req.body.room_status;
  var location = req.body.location;

  var sql_insert = `insert into rooms (room_name, room_status, location) values(?,?,?)`;

    connection.query(sql_insert,[room_name, room_status, location],(err, rows, fields)=>{
                if (err) {
                    console.error(err);
                    res.status(500).send({ message: 'Failed to create room' });
                } else {
                    console.log('Room inserted successfully!');
                    res.send({message:"Room inserted successfully"});
                }
    });

});

//insert room

//insert package

app.post("/InsertPackage", (req, res)=>{

//var stringed_combination_form = JSON.parse(combinedJson["parseForm"]);

var package_name = req.body.package_name;
var no_of_person = req.body.no_of_person;
var room_id = req.body.room_id;
var location = req.body.location;
var no_of_rooms = req.body.no_of_rooms;
var package_code = req.body.package_code;
var package_rate = req.body.package_rate;
var package_status = req.body.package_status;
var accom_type = req.body.accom_type;


console.log(room_id);

var sql_insert = `
  insert into packages (package_code2, package_name, no_of_person, room_id, location, no_of_rooms, package_rate, package_status, accom_type)
  values (?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

   connection.query(sql_insert,[package_code,package_name,no_of_person,room_id,location,no_of_rooms,package_rate, package_status, accom_type],(err, rows, fields)=>{
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Failed to create package' });
        } else {
            console.log('Package inserted successfully!');
            res.send({message:"Package inserted successfully"});
        }
   });

});

//insert package

//insert guest

app.post("/InsertGuest", (req, res)=>{

    var full_name = req.body.full_name;
    var contact_number = req.body.contact_number;
    var email = req.body.email;
    var age = req.body.age;
    var guest_id = Math.floor(Math.random()*90000) + 10000;

    var sql_insert = `
        insert into personal_details_table (full_name, contact_number, email, age, guest_id)
        values (?, ?, ?, ?, ?)
        `;

        connection.query(sql_insert, [full_name, contact_number, email, age, guest_id], (err, rows, fields) => {
        if (err) {
            console.error(err);
            res.status(500).send({ message: 'Failed to create personal details' });
        } else {
            console.log('Personal details inserted successfully!');
            res.send({ message: "Personal details inserted successfully" });
        }
        });

});

//insert guest

//insert booking


app.post("/InsertBooking", (req, res)=>{
    
    var check_in_date = req.body.check_in_date;
    var check_out_date = req.body.check_out_date;
    var check_in_time = req.body.check_in_time;
    var check_out_time = req.body.check_out_time;
    var no_pax = req.body.no_pax;
    var package= req.body.package;
    var guest_id = req.body.guest_id;
    var special_request = req.body.special_request;
    var guest_status = 'PENDING';

    var parsedDate_in = new Date(check_in_date);
    var parsedDate_out = new Date(check_out_date);

    var check_in_datetime = Date.parse(parsedDate_in.toDateString()+ ' ' + check_in_time);
    var check_out_datetime =Date.parse(parsedDate_out.toDateString()+ ' ' + check_out_time);

    var millisecondsPerDay = 24 * 60 * 60 * 1000;

    var check_in_datetime2 = parsedDate_in.toDateString()+ ' ' + check_in_time
    var check_out_datetime2 = parsedDate_out.toDateString()+ ' ' + check_out_time

    var length_stay = Math.round((new Date(check_out_datetime).getTime() - new Date(check_in_datetime).getTime()) / (1000*60*60*24));

    console.log(length_stay);

    //res.send({message:length_stay})

    //check package details if villa accom type or not

    var sql_check_package_accom = `select * from packages where package_code = ?`;

    connection.query(sql_check_package_accom, [package], (err, rows1)=>{

      var accom_type = rows1[0].accom_type;

       console.log(accom_type);

      if(accom_type == "villa"){
        var package_code = rows1[0].package_code2;
        console.log(package_code);

        var sql_select_package = `select room_id from packages where package_code2 = ?`;

        connection.query(sql_select_package, [package_code], (err, rows2)=>{

          for(var rows2_c=0; rows2_c<rows2.length; rows2_c++){
            var room_name = rows2[rows2_c].room_id;
            var update_rooms = 'update rooms set room_status = ? where room_name = ?';
            connection.query(update_rooms, ["inactive", room_name],(err, rows3)=>{

           
             

            });
          }

              //update package using room

              var sql_select_room_inactive = `select room_name from rooms where room_status = ?`;
              connection.query(sql_select_room_inactive, ["inactive"], (err, rows4)=>{

                for(var rows4_c = 0; rows4_c<rows4.length; rows4_c++){

                  var room_id_inactive = rows4[rows4_c].room_name;

                  console.log(room_id_inactive);

                  var update_package = 'update packages set package_status = ? where room_id = ?';

                  connection.query(update_package, ["inactive", room_id_inactive], (err, rows5)=>{

                    console.log("room updated");

                    console.log("package updated")

                    

                  });

                }

                var select_sql_reupdate = `select * from packages where package_status = ? and accom_type = ?`;

                    connection.query(select_sql_reupdate, ["inactive", "villa"], (err, rows6)=>{

                      for(var rows6_c = 0; rows6_c<rows6.length; rows6_c++){

                        var package_code = rows6[rows6_c].package_code2;

                        var sql_reupdate_package = `update packages set package_status = ? where package_code2 = ?`;

                        connection.query(sql_reupdate_package, ["inactive", package_code], (err, rows7)=>{

                        });

                      }

                      

                    });

              });

 
        });

       
      }



      else if(accom_type == "room"){

        var package_code = rows1[0].package_code;
        console.log(package_code);

        var sql_select_package = `select room_id from packages where package_code = ?`;

        connection.query(sql_select_package, [package_code], (err, rows2)=>{

          for(var rows2_c=0; rows2_c<rows2.length; rows2_c++){
            
            var room_name = rows2[rows2_c].room_id;
            var update_rooms = 'update rooms set room_status = ? where room_name = ?';
            connection.query(update_rooms, ["inactive", room_name],(err, rows3)=>{

           
            });
          }

          

            //update package using room

            var sql_select_room_inactive = `select room_name from rooms where room_status = ?`;

            connection.query(sql_select_room_inactive, ["inactive"], (err, rows4)=>{

              for(var rows4_c = 0; rows4_c<rows4.length; rows4_c++){

                var room_id_inactive = rows4[rows4_c].room_name;

                console.log(room_id_inactive);

                var update_package = 'update packages set package_status = ? where room_id = ?';

                connection.query(update_package, ["inactive", room_id_inactive], (err, rows5)=>{

                  console.log("room updated");

                  console.log("package updated")

                  

                });

              }

              var select_sql_reupdate = `select * from packages where package_status = ? and accom_type = ?`;

              connection.query(select_sql_reupdate, ["inactive", "villa"], (err, rows6)=>{

                for(var rows6_c = 0; rows6_c<rows6.length; rows6_c++){

                  var package_code = rows6[rows6_c].package_code2;

                  var sql_reupdate_package = `update packages set package_status = ? where package_code2 = ?`;

                  connection.query(sql_reupdate_package, ["inactive", package_code], (err, rows7)=>{

                  });

                }

              });

            });

          

        });

      }

    });

   //put select in guest here to retrieve tha name
   var sql_select_guest = `select full_name from personal_details_table where guest_id = ?`;

   connection.query(sql_select_guest, [guest_id], (err, result)=>{

         var full_name = result[0].full_name;


         var sql_insert_book = `INSERT INTO guest_table (guest_id, check_in_datetime, check_out_datetime,
         no_pax, package, special_request, length_stay, guest_status, full_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            connection.query(sql_insert_book, [guest_id, check_in_datetime2, check_out_datetime2,
              no_pax, package, special_request, length_stay, guest_status, full_name], (err, results) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Error inserting data');
                } else {
                    console.log('Data inserted successfully');
                    //res.send('Data inserted successfully');
                }
            });

   }); 
});

//insert booking

//views
app.get('/villas', (req, res) => {
    var query = 'SELECT * FROM villas';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('error running query:', err);
        return;
      }
      res.send({villa:results});
    });
  });

  app.get('/rooms', (req, res) => {
    var query = 'SELECT * FROM rooms';
    connection.query(query, (err, results) => {
      if (err) {
        console.error('error running query:', err);
        return;
      }
      res.send({rooms:results});
    });
  });

  app.get('/packages', (req, res) => {
    var query = 'SELECT * FROM packages where package_status = ?';
    connection.query(query, ["active"],(err, results) => {
      if (err) {
        console.error('error running query:', err);
        return;
      }
      res.send({package:results});
    });
  });

  app.get("/GuestOption", (req, res)=>{
    
    var query = 'SELECT * FROM personal_details_table';

    connection.query(query,(err, results)=>{

      if (err) {
        console.error('error running query:', err);
        return;
      }
      res.send({guest:results});

    });

  });


  app.get("/GuestTable", (req, res)=>{
    
    var query = `SELECT * FROM guest_table`;

    connection.query(query,(err, results)=>{

      if (err) {
        console.error('error running query:', err);
        return;
      }
      res.send({guest:results});

    });

  });

  app.get("/roomList", (req, res)=>{

    var query = `select * from rooms`;

    connection.query(query,(err, results)=>{

      if (err) {
        console.error('error running query:', err);
        return;
      }
      res.send({room:results});

    });



  });

  app.get("/roomListPlot", (req, res)=>{

    var sql_view_plot = `select villas.villa_name, rooms.room_name, rooms.villa_id, rooms.room_status
     from rooms inner join villas on villas.villa_name = rooms.villa_id`;

    connection.query(sql_view_plot, (err, rows_plot)=>{

      res.send({toplotRoom:rows_plot});

    });

  });


//views

//page generation
app.post('/ViewGuest', (req, res)=>{
  
  const transaction_id2 = req.body.transaction_id2;
  console.log(transaction_id2);
  
  var sql_guest_table = `select * from guest_table where transaction_id2 = ?`;

  connection.query(sql_guest_table,[transaction_id2],(err, results)=>{

    if (err) {
      console.error('error running query:', err);
      //return;
    }
    //res.send({room:results});
    console.log(results[0].package)
         
    res.send
          ({
            full_name:results[0].full_name,
            guest_id:results[0].guest_id,
            package:results[0].package,
            guest_status:results[0].guest_status,
            check_in_datetime:results[0].check_in_datetime,
            check_out_datetime:results[0].check_out_datetime,
            length_stay: results[0].length_stay,
            transaction_id2:results[0].transaction_id2,
            current_stay:results[0].current_stay,
            current_bill:results[0].current_bill
          });

  });

});
//page generation

//Updates

app.post("/UpdateGuestTable", (req, res)=>{

  var transaction_id2 = req.body.transaction_id2_2;
  var guest_status = req.body.guest_status2;

  console.log(guest_status);

  console.log(transaction_id2);


  //check the update status if CHECK_OUT

  if(guest_status == "CHECKED_OUT"){

            const sql = `update guest_table set guest_status = ? where transaction_id2 = ?`;

            connection.query(sql,[guest_status, transaction_id2], (err, results)=>{

              if (err) {
                console.error('error running query:', err);
                //return;
              }

              //get the accpmodation type

              

              var sql_select_package= `select * from guest_table where transaction_id2 = ?`;

              connection.query(sql_select_package, [transaction_id2], (err, rows9)=>{

                var package_code = rows9[0].package;

                var sql_get_accom = `select * from packages where package_code = ?`;

                connection.query(sql_get_accom, [package_code], (err, rows10)=>{

                  var accom_type = rows10[0].accom_type;

                  //if else of villa and room



                                    
                                  if(accom_type == "villa"){
                                    var package_code = rows10[0].package_code2;
                                    console.log(package_code);

                                    var sql_select_package = `select room_id from packages where package_code2 = ?`;

                                    connection.query(sql_select_package, [package_code], (err, rows2)=>{

                                      for(var rows2_c=0; rows2_c<rows2.length; rows2_c++){
                                        var room_name = rows2[rows2_c].room_id;
                                        var update_rooms = 'update rooms set room_status = ? where room_name = ?';
                                        connection.query(update_rooms, ["active", room_name],(err, rows3)=>{

                                      
                                        

                                        });
                                      }

                                          //update package using room

                                          var sql_select_room_inactive = `select room_name from rooms where room_status = ?`;
                                          connection.query(sql_select_room_inactive, ["active"], (err, rows4)=>{

                                            for(var rows4_c = 0; rows4_c<rows4.length; rows4_c++){

                                              var room_id_inactive = rows4[rows4_c].room_name;

                                              console.log(room_id_inactive);

                                              var update_package = 'update packages set package_status = ? where room_id = ?';

                                              connection.query(update_package, ["active", room_id_inactive], (err, rows5)=>{

                                                console.log("room updated");

                                                console.log("package updated")

                                                

                                              });

                                            }

                                            var select_sql_reupdate = `select * from packages where package_status = ? and accom_type = ?`;

                                                connection.query(select_sql_reupdate, ["active", "villa"], (err, rows6)=>{

                                                  for(var rows6_c = 0; rows6_c<rows6.length; rows6_c++){

                                                    var package_code = rows6[rows6_c].package_code2;

                                                    var sql_reupdate_package = `update packages set package_status = ? where package_code2 = ?`;

                                                    connection.query(sql_reupdate_package, ["active", package_code], (err, rows7)=>{

                                                    });

                                                  }

                                                  

                                                });

                                          });

                            
                                    });

                                  
                                  }




                                  else if(accom_type == "room"){

                                    var package_code = rows10[0].package_code;
                                    console.log(package_code);

                                    var sql_select_package = `select room_id from packages where package_code = ?`;

                                    connection.query(sql_select_package, [package_code], (err, rows2)=>{

                                      for(var rows2_c=0; rows2_c<rows2.length; rows2_c++){
                                        
                                        var room_name = rows2[rows2_c].room_id;
                                        var update_rooms = 'update rooms set room_status = ? where room_name = ?';
                                        connection.query(update_rooms, ["active", room_name],(err, rows3)=>{

                                      
                                        });
                                      }

                                      

                                        //update package using room

                                        var sql_select_room_inactive = `select room_name from rooms where room_status = ?`;

                                        connection.query(sql_select_room_inactive, ["active"], (err, rows4)=>{

                                          for(var rows4_c = 0; rows4_c<rows4.length; rows4_c++){

                                            var room_id_inactive = rows4[rows4_c].room_name;

                                            console.log(room_id_inactive);

                                            var update_package = 'update packages set package_status = ? where room_id = ?';

                                            connection.query(update_package, ["active", room_id_inactive], (err, rows5)=>{

                                              console.log("room updated");

                                              console.log("package updated")

                                              

                                            });

                                          }

                                          var select_sql_reupdate = `select * from packages where package_status = ? and accom_type = ?`;

                                          connection.query(select_sql_reupdate, ["active", "villa"], (err, rows6)=>{

                                            for(var rows6_c = 0; rows6_c<rows6.length; rows6_c++){

                                              var package_code = rows6[rows6_c].package_code2;

                                              var sql_reupdate_package = `update packages set package_status = ? where package_code2 = ?`;

                                              connection.query(sql_reupdate_package, ["active", package_code], (err, rows7)=>{

                                              });

                                            }

                                          });

                                        });

                                      

                                    });

                                  }

        //if else of villa and room

            });

          });

        });


      }

      //check the update status if CHECK_OUT

      else if(guest_status == "CHECKED_IN" || guest_status == "PENDING"){

        const sql = `update guest_table set guest_status = ? where transaction_id2 = ?`;

            connection.query(sql,[guest_status, transaction_id2], (err, results)=>{

            });

      }

});

app.post("/UpdateBill", (req, res)=>{

  var package = req.body.package;
  var transaction_id2 = req.body.transaction_id2;
  console.log(package);
  console.log(transaction_id2);
  
  var date_now_over_stay_time = new Date().toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
 
  var millis_now = new Date(date_now_over_stay_time).getTime()

  console.log("Millis of time now")
  console.log(millis_now);
  
  var sql = `select * from packages where package_code = ?`;

  connection.query(sql, [package], (err, results)=>{

    console.log(results[0].package_rate);

    var package_rate = results[0].package_rate;

    var sql_select_guest_table = `select * from guest_table where transaction_id2 = ?`;

      connection.query(sql_select_guest_table,[transaction_id2], (err2, results_transactionid)=>{

        var check_in_datetime = results_transactionid[0].check_in_datetime;
        var length_stay = results_transactionid[0].length_stay;

        var new_check_in_datetime = new Date(check_in_datetime).getTime();

        console.log("Millis of check in date")

        console.log(new_check_in_datetime);

        //var current_stay  = new_check_in_datetime - millis_now;
        var current_stay  = millis_now - new_check_in_datetime;

        var current_days = current_stay/(1000*60*60*24)

        console.log(current_days);
        
        //check if the current day is lessthan 0 or current day is equal to zero
        
        if(parseInt(current_days) <= 0){
          var current_bill = length_stay * package_rate;
        }

        else if(parseInt(current_days) > 0){

          var current_bill = parseInt(current_days) * package_rate;

        }

        var sql_update_guest = `update guest_table set current_stay = ?, current_bill = ? where transaction_id2 = ?`;

        connection.query(sql_update_guest, [parseInt(current_days), current_bill, transaction_id2], (err, results_update)=>{

          var sql_update_front = `select * from guest_table where transaction_id2 = ?`;

            connection.query(sql_update_front, [transaction_id2], (err3, results_update_front)=>{

              res.send({
                current_status:results_update_front
              });

            });

        });
      });
  });

});

//Updates

//input checking number of pax

app.post("/check_no_pax", (req, res)=>{

  var no_of_person = req.body.no_of_person;
  var package_code = req.body.package_code;

  //console.log(package_code);
  //console.log(no_of_person);

  var sql_check_no_pax = `select no_of_person from packages where package_code = ?`;

  connection.query(sql_check_no_pax, [package_code], (err, rows11)=>{

    var no_of_person = rows11[0].no_of_person;

    res.send({no_of_person:no_of_person});

  });

});

//input checking number of pax


//session handling and authentication

app.post("/login", (req, res)=>{

  var username = req.body.username;
  var user_password = req.body.user_password;

  console.log(username);
  console.log(user_password);

});

//session handling and authentication



