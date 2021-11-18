$(document).ready(function () {
    $('button').click(function () {
        let method = $('.form-select').val();
        let urlInput = $('#urlInput').val();
        if (method === 'get') {
            $.get(urlInput, function (data, textStatus,jqXHR) {
                let response = JSON.stringify(data.data);
                $('#responsebody').val(response);
            });
        }
        else {
            let request = $('#requestbody').val();
            if (isJson(request)) {
                $.post(urlInput,request,function (data, textStatus,jqXHR) {
                    debugger;
                     let response = JSON.stringify(data);
                     $('#responsebody').val(response);
                    });

            } else {
                alert('Request data is not json.');
            }
        }               
        });

    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }
});