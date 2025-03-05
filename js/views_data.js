  
  $(document).ready(function() {
  
  
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
                                            
                            
                                                var data_of_guests = `
                                                                    <tr>
                                                                    <td>${guest_id}</td>
                                                                    <td>${full_name}</td>
                                                                    <td>${contact_number}</td>
                                                                    <td>${email}</td>
                                                                    <td><button id='update_guest' name="${guest_id}" value="${guest_id}">Book</button></td>
                                                                    <td><button id='view_guest' name="${guest_id}" value="${guest_id}">View guest</button></td>
                                                                    </tr>
                                                                    `;
                                                
                                                $("#guest_table2").append(data_of_guests);
                            
                                                
                            
                                            }
                            
                                            var table = new DataTable('#guest_table');
                            
                                        },
                            
                                            error: function(xhr, status, error){
                            
                                            console.error('Error retrieving data:', error);
                                            alert(error);
                            
                                            }
                            
                                        
                            
                                        
                                    });
                            
                                    $(document).on('click', '#update_guest', function(e){
                            
                                        var update_guest = $(this).val();
                                        var json_data = {"guest_id":update_guest};
                                        var final_data = JSON.stringify(json_data);
                            
                                        $.ajax({
                            
                                            url: "http://localhost:7000/guestView",
                                            method: "POST",
                                            data:final_data,
                                            contentType:"application/json",
                                            success:function(data){
                                                var full_name = data.full_name;
                                                var page = 'update_guest';
                                                            
                                                            $.ajax({
                                                                        url: page+'.html',
                                                                        method: 'GET',
                                                                        success: function(data){
                                                                                
                                                                            $.ajax({
                                                                                    url:'http://localhost:7000/roomView',
                                                                                    method:"GET",
                                                                                    success:function(response){
                            
                                                                                        console.log(response.rooms);
                                                                                        console.log(response.villas);
                                                                                        var options = [];
                                                                                        
                            
                                                                                        for(var villa_len = 0; villa_len < response.villas.length; villa_len++){
                            
                                                                                            var data_of_villa = `<option value="${response.villas[villa_len].villa_code}">${response.villas[villa_len].villa_description}</option>`;
                                                                                            //$("#villa_description").append(data_of_villa);
                                                                                            options.push(data_of_villa)
                            
                                                                                        }
                            
                                                                                        $("#villa_description").html(options);
                            
                                                                                        //gg
                            
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
                                                                                    },
                                                                                    
                                                                                    error:function(){
                            
                                                                                    }
                            
                                                                    });
                            
                                                                $("#content").html(data);
                                                                //history.pushState({page:page}, '', page);
                                                                $("#guest_id").val(update_guest);
                                                                $("#full_name").val(full_name);
                                                            },
                                                            error: function(){
                                                                $('#content').html('<p>Error loading content.</p>');
                                                            }
                                            
                                                        });
                            
                                            },
                                            
                                            error:function(){
                            
                                            }
                            
                                        });
                            
                                    });


                                    
                                    $.ajax({

                                        url:"http://localhost:7000/booked",
                                        type:"GET",
                                        success: function(response){
                                            //console.log(response.booked);
                                            var events = [];
                                            for(var book_len = 0; book_len < response.booked.length; book_len++){
                                    
                                                var guest_id = response.booked[book_len].guest_id;
                                                var check_in_datetime = response.booked[book_len].check_in_datetime;
                                                var check_out_datetime = response.booked[book_len].check_out_datetime;
                                                var full_name = response.booked[book_len].full_name;
                                                var villa_selected = response.booked[book_len].villa_selected;
                                                var room_selected = response.booked[book_len].room_selected;
                                                
                                            
                                    
                                                //var start = new Date(check_in_datetime.split(" ")[0].replaceAll("/", "-")).toLocaleDateString('fr-CA');
                                                //var end = new Date(check_out_datetime.split(" ")[0].replaceAll("/", "-")).toLocaleDateString('fr-CA');
                                                var start = new Date(check_in_datetime);
                                                var end = new Date(check_out_datetime);
                                                console.log(full_name);
                                                events.push({title:full_name+"@"+"Room: "+room_selected+" "+"Villa: "+villa_selected, start:start, end:end});
                                    
                                            }
                                    
                                            console.log(events);
                                    
                                    
                                            $('#calendar').fullCalendar({
                                                    // put your options and callbacks here
                                                    selectable: true,
                                                    selecHelpre: true,
                                    
                                                    /*events:[
                                                        {
                                                            title: "hdb ychad",
                                                            start: '2024-11-24',
                                                            end: '2024-11-26'
                                                        }
                                                    ],*/
                                    
                                                    events:events,
                                                    
                                                    header:{
                                                        right:'prev, today, next'
                                                    },
                                    
                                                    buttonText:{
                                                        today: 'TODAY',
                                                        month: 'MONTH',
                                                        week: 'WEEK',
                                                        day: 'DAY',
                                                        list: 'LIST'
                                                    }
                                    
                                                })
                                    
                                        },
                                    
                                        error: function(xhr, status, error){
                                            console.error('error retrieving data', error);
                                            alert(error);
                                    
                                        }
                                    
                                    });

                                    $(document).on('click', '#view_guest', function(e){

                                        var guest_id = $(this).val();
                                        var json_data = {"guest_id":guest_id};
                                        var final_data = JSON.stringify(json_data);

                                        $.ajax({
                            
                                            url: "http://localhost:7000/view_guest",
                                            method: "POST",
                                            data:final_data,
                                            contentType:"application/json",
                                            success:function(data){
                                                //alert(data.full_name);
                                                var full_name = data.full_name;
                                                var length_stay = data.length_stay;
                                                var villa_selected = data.villa_selected;
                                                var room_selected = data.room_code;
                                                var guest_id = data.guest_id;
                                                var check_in_datetime = data.check_in_datetime;
                                                var check_out_datetime = data.check_out_datetime;
                                                var page = 'view_guest';

                                                $.ajax({

                                                    url: page+'.html',
                                                    method: 'GET',
                                                    success: function(data){
                                                        $("#content").html(data);
                                                        $("#guest_name").html(full_name);
                                                        $("#length_stay").html(length_stay+" "+"Day/s");
                                                        $("#villa_selected").html(villa_selected);
                                                        $("#room_selected").html(room_selected);
                                                        $("#guest_id").html(guest_id);
                                                        $("#check_in").html(check_in_datetime);
                                                        $("#check_out").html(check_out_datetime);

                                                    },
                                                    error: function(){

                                                    }

                                                });

                                            },
                                            error:function(){

                                            }

                                        });

                                    });



                    

                    //script for guest status
                
                
                const date_now_over_stay = new Date().toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
                const java_date_now = new Date().toLocaleDateString('en-US', { day: 'numeric', year: 'numeric', month: 'numeric',});

                console.log(new Date(date_now_over_stay).getTime());

                console.log(java_date_now);
                console.log(date_now_over_stay);
                    
                $.ajax({
                        url: "http://localhost:7000/status_guest",
                        type: "GET",
                        success: function(response){

                            console.log(response.guest);

                            var td_list = [];

                            for(var guest_len = 0; guest_len < response.guest.length; guest_len++){

                                var guest_id = response.guest[guest_len].guest_id;
                                var full_name = response.guest[guest_len].full_name;
                                var guest_status = response.guest[guest_len].guest_status;
                                var check_out_datetime = response.guest[guest_len].check_out_datetime;
                                var check_in_datetime = response.guest[guest_len].check_in_datetime;
                                var transaction_id = response.guest[guest_len].transaction_id2;
                                var guest_status = response.guest[guest_len].guest_status;
                                var java_date_out = new Date(check_out_datetime).toLocaleDateString('en-US', { day: 'numeric', year: 'numeric', month: 'numeric',});
                                var java_date_in = new Date(check_in_datetime).toLocaleDateString('en-US', { day: 'numeric', year: 'numeric', month: 'numeric',});
                                var over_stay = response.guest[guest_len].over_stay+" "+"min/s";
                                var java_date_out2 = new Date(check_out_datetime).toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
                                var java_date_out3 = new Date(java_date_out2).getTime();
                                console.log(java_date_out2);
                                console.log(new Date(date_now_over_stay).getTime() - new Date(java_date_out2).getTime())

                                var ms = new Date(date_now_over_stay).getTime() - new Date(java_date_out2).getTime();

                                var over_stay_hours = new Date(1000*Math.round(ms/1000)).getUTCHours()+":"+new Date(1000*Math.round(ms/1000)).getUTCMinutes();

                                //console.log(over_stay_hours);

                                /*var d = new Date(1000*Math.round(ms/1000)); // round to nearest second
                                function pad(i) { return ('0'+i).slice(-2); }
                                var str = d.getUTCHours() + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds());
                                console.log(str); // 0:04:59*/
                                
                                console.log(java_date_out);
                            
                                    var guest_status = response.guest[guest_len].guest_status;
                                    
                                    if(java_date_in == java_date_now && guest_status != "Checked-in"){

                                        guest_status = "For-check-in";
                                        guest_status2 = "For check in";

                                    }

                                    else if(java_date_out == java_date_now && guest_status != "Checked-out"){
                                        guest_status = "For-check-out";
                                        guest_status2 = "For check out";
                                    }

                                    else if(guest_status == "Checked-in"){

                                        guest_status2 = "Checked-in";
                                        //document.getElementById("guest_status").disabled = true;

                                    }

                                    else if(guest_status == "Checked-out"){

                                        guest_status2 = "Checked-out";
                                        //document.getElementById("guest_status").disabled = true;

                                        }

                                    else{

                                        guest_status = response.guest[guest_len].guest_status;
                                        guest_status2 = response.guest[guest_len].guest_status;
                                        
                                    }

                                    var json_data = JSON.stringify({guest_status:guest_status,
                                                                guest_id:guest_id, 
                                                                transaction_id:transaction_id, 
                                                                java_date_out2:java_date_out3});

                                    
                                    if(guest_status == "Checked-in"){

                                        var data_of_guests = `
                                                        <tr>
                                                        <td>${guest_id}<input id="guest_id" value=${guest_id} type="hidden"></td>
                                                        <td>${full_name}</td>
                                                        <td>${over_stay}</td>
                                                        <td><button type="button" disabled value=${json_data} id="guest_status">${guest_status2}</button></td>
                                                        </tr>
                                                        `;

                                                        $("#guest_booked2").append(data_of_guests);

                                    }

                                    else if(guest_status == "Checked-out"){

                                        var data_of_guests = `
                                                        <tr>
                                                        <td>${guest_id}<input id="guest_id" value=${guest_id} type="hidden"></td>
                                                        <td>${full_name}</td>
                                                        <td>${over_stay}</td>
                                                        <td><button type="button" disabled value=${json_data} id="guest_status">${guest_status2}</button></td>
                                                        </tr>
                                                        `;

                                                        $("#guest_booked2").append(data_of_guests);

                                    }

                                    else{

                                        var data_of_guests = `
                                                        <tr>
                                                        <td>${guest_id}<input id="guest_id" value=${guest_id} type="hidden"></td>
                                                        <td>${full_name}</td>
                                                        <td>${over_stay}</td>
                                                        <td><button type="button" value=${json_data} id="guest_status">${guest_status2}</button></td>
                                                        </tr>
                                                        `;

                                    //td_list.push(data_of_guests);
                                    $("#guest_booked2").append(data_of_guests);

                                    }


                                    
                            }

                            var tableStatus = new DataTable('#guest_booked');

                            

                        },

                        error: function(xhr, status, error){
                            console.error('Error retrieving data:', error);
                            alert(error);
                        }

                    });

                    //click event in updating status
                    
                    
                    $(document).on('click', '#guest_status', function(e){

                        var guest_status = $(this).val();
                        var data = JSON.parse(guest_status);

                        var date_now_over_stay2 = new Date().toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});

                        var DateNow = new Date(date_now_over_stay2).getTime();

                        //var java_date_out2 = new Date(data.java_date_out2).getTime();

                        //var ms2 = DateNow - data.java_date_out2;

                        //var over_stay_hours2 = new Date(new Date(1000*Math.round(ms2/1000))).getUTCMinutes();
                    
                        //console.log(over_stay_hours2);
                        

                        alert(data.guest_status);
                        alert(data.transaction_id);

                        var guest_status2 = "";


                        if(data.guest_status == "For-check-in"){

                            guest_status2 = "Checked-in"

                        }

                        else if(data.guest_status == "For-check-out"){

                            guest_status2 = "Checked-out"

                            }

                        var json_data = {"guest_status":guest_status2, "transaction_id":data.transaction_id, "over_stay_hours2":DateNow};
                        var final_data = JSON.stringify(json_data);

                        $.ajax({

                            url: "http://localhost:7000/update_guest_status",
                            method: "POST",
                            data:final_data,
                            contentType:"application/json",
                            success:function(response){

                                alert(response.message);
                                location.reload(true)

                            },
                            error:function(){

                            }

                        });
                

                    });


    });
     
            