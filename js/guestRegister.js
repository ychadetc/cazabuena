
        $(document).on('submit', '#submit_reservation', function(e){

                //alert("it works");

                e.preventDefault();

                object={}

                var formData = new FormData(this);

                formData.forEach((value, key) => object[key] = value);

                var txt = JSON.stringify(object);

                console.log(txt);

                $.ajax({
                    url:"http://localhost:7000/insert_personal_details",
                    type:"POST",
                    data:txt,
                    contentType:'application/json',
                    success: function(data){
                        alert(data.message);
                        console.log(data);
                        $('#submit_reservation')[0].reset();
                        location.reload();
                    },
                    
                    error: function(xhr, status, error){
                        alert(error);
                    }

                })

        });

        
        $(document).on('submit', '#submit_room_reservation', function(e){

            //alert("it works");

            e.preventDefault();

            object={}

            var formData = new FormData(this);

            formData.forEach((value, key) => object[key] = value);

            var txt = JSON.stringify(object);

            console.log(txt);

            $.ajax({
                url:"http://localhost:7000/insert_reservation",
                type:"POST",
                data:txt,
                contentType:'application/json',
                success: function(data){
                    alert(data.message);
                    console.log(data);
                    $('#submit_room_reservation')[0].reset();
                    //location.reload();
                },
                
                error: function(xhr, status, error){
                    alert(error);
                }

            })

    });

        $(document).ready(function() {

            //var enabledDates = new Array('08-26-2024','08-27-2024');

                /*$('#check_in_date').datepicker({

                    todayHighlight: true,
                    format: 'mm-dd-yyyy',
                    multidate: true,
                    startDate: new Date(),
                    beforeShowDay: function(date) {
                    var sdate = moment(date).format('MM-DD-YYYY');
                    if ($.inArray(sdate, enabledDates) !== -1) {
                        return {
                        enabled: true
                        }
                    } else {
                        return {
                        enabled: false
                        }
                    }
                    }

                });*/

                //$('#check_in_date').datepicker();

                //$('#check_out_date').datepicker();

                //$("#guest_table").dataTable();

                

                $.ajax({
                    url: "http://localhost:7000/dataView",
                    type: "GET",
                    success: function(response){

                        console.log(response.guests);

                        for(var guest_len = 0; guest_len < response.guests.length; guest_len++){

                            /*console.log(response.guests[guest_len].guest_id);
                            console.log(response.guests[guest_len].full_name);
                            console.log(response.guests[guest_len].contact_number);
                            console.log(response.guests[guest_len].email);*/
                            var guest_id = response.guests[guest_len].guest_id;
                            var full_name = response.guests[guest_len].full_name;
                            var contact_number = response.guests[guest_len].contact_number;
                            var email = response.guests[guest_len].email;
                            

                        }

                        //var table = new DataTable('#guest_table');

                    },

                        error: function(xhr, status, error){

                        console.error('Error retrieving data:', error);
                        alert(error);

                        }

                       

                    
                });

               $.ajax({

                url: "http://localhost:7000/roomView",
                type: "GET",
                success: function(response){
                    console.log(response.rooms);
                    console.log(response.villas);

                    for(var villa_len = 0; villa_len < response.villas.length; villa_len++){

                        var data_of_villa = `<option value="${response.villas[villa_len].villa_code}">${response.villas[villa_len].villa_description}</option>`;
                        $("#villa_description").append(data_of_villa);

                    }

                },
                error: function(xhr, status, error){
                    
                    console.error('Error retrieving data:', error);
                    alert(error);
                }

               });

                        $("#villa_description").on('change', function(){

                            var villa_code_option = this.value;

                            var data = {"villa_code_option":villa_code_option};

                            $.ajax({

                                    url: "http://localhost:7000/villaView/"+villa_code_option,
                                    type: "GET",
                                    success: function(response){
                                        console.log(response.rooms);

                                        var options = [];


                                        for(var room_len = 0; room_len < response.rooms.length; room_len++){

                                            var data_of_room = `<option value="${response.rooms[room_len].room_no}">${response.rooms[room_len].room_description}</option>`;
                                            options.push(data_of_room);
                                        
                                        }
                                        $("#room_description").html(options);
                                      //$("#rooms_id").load(location.href + " #rooms_id>*", ""); 
                                    },
                                    error: function(xhr, status, error){
                                        
                                        console.error('Error retrieving data:', error);
                                        alert(error);
                                    }

                                    });

                            

                        });







        });





        //js views
        //$(document).ready(function() {


          
                //});