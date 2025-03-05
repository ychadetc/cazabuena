$(document).ready(function() {


    //on click in submission of villa
    
    $(document).on('submit', '#submitVilla', function(e){

        e.preventDefault();

        object={}

        var formData = new FormData(this);

        formData.forEach((value, key) => object[key] = value);

        var txt = JSON.stringify(object);

        console.log(txt);

        $.ajax({
            url:"http://localhost:7000/insert_villa",
            type:"POST",
            data:txt,
            contentType:'application/json',
            success: function(data){
                //alert("Villa has been registered");
                console.log(data);
                alert(data.message);
                $('#submitVilla')[0].reset();
                location.reload();
            },
            
            error: function(xhr, status, error){
                alert(error);
            }

        });

    });


    //onlclick in sumission of room


    $(document).on('submit', '#submitRoom', function(e){

       e.preventDefault();

        object={}

        var formData = new FormData(this);

        formData.forEach((value, key) => object[key] = value);

        var txt = JSON.stringify(object);

        //console.log(txt);
        alert(txt);

        $.ajax({
            url:"http://localhost:7000/insert_room",
            type:"POST",
            data:txt,
            contentType:'application/json',
            success: function(data){
                //alert("Room has been registered");
                console.log(data);
                alert(data.message);
                $('#submitRoom')[0].reset();
               // location.reload();
            },
            
            error: function(xhr, status, error){
                alert(error);
            }

        });

    });


    $(document).on('submit', '#submitPackage', function(e){


        e.preventDefault();

        object={}

        var formData = new FormData(this);

        formData.forEach((value, key) => object[key] = value);

        var txt = JSON.stringify(object);

        //console.log(txt);
        alert(txt);

        $.ajax({
            url:"http://localhost:7000/insert_package",
            type:"POST",
            data:txt,
            contentType:'application/json',
            success: function(data){
                //alert("Room has been registered");
                console.log(data);
                alert(data.message);
                $('#submitPackage')[0].reset();
               // location.reload();
            },
            
            error: function(xhr, status, error){
                alert(error);
            }

        });

    });



    $(document).on('submit', '#submitRoom2', function(e){


        e.preventDefault();

        object={}

        var formData = new FormData(this);

        formData.forEach((value, key) => object[key] = value);

        var txt = JSON.stringify(object);

        //console.log(txt);
        alert(txt);

        $.ajax({
            url:"http://localhost:7000/insert_room2",
            type:"POST",
            data:txt,
            contentType:'application/json',
            success: function(data){
                //alert("Room has been registered");
                console.log(data);
                alert(data.message);
                $('#submitRoom2')[0].reset();
               // location.reload();
            },
            
            error: function(xhr, status, error){
                alert(error);
            }

        });

    });





    $(document).on('submit', '#submitPackageTable', function(e){


        e.preventDefault();

        object={}

        var formData = new FormData(this);

        formData.forEach((value, key) => object[key] = value);

        var txt = JSON.stringify(object);

        //console.log(txt);
        alert(txt);

        $.ajax({
            url:"http://localhost:7000/insert_package_table",
            type:"POST",
            data:txt,
            contentType:'application/json',
            success: function(data){
                //alert("Room has been registered");
                console.log(data);
                alert(data.message);
                $('#submitRoom2')[0].reset();
               // location.reload();
            },
            
            error: function(xhr, status, error){
                alert(error);
            }

        });

    });


});