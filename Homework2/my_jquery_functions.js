$(document).ready(function () {
    $.get("https://reqres.in/api/users?page=1",
        function (data, textStatus, jqXHR) {
           let info = JSON.stringify(data.data);
            console.log(info);
        }
    );
    
    for (let index = 0; index < info.length; index++) {
        let content = "<div class='card' style='width: 18rem'><img src='https://reqres.in/img/faces/1-image.jpg' class='card-img-top'><div class='card-body'><h5 class='card-title'>Card title</h5><p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p><a href='#' class='btn btn-primary'>Go somewhere</a></div></div>";
        $('#content').append(content);
    }

    

});