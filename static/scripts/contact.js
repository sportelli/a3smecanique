function initMap() {
    console.log("init map");
    let uluru = {lat: 49.80554, lng: 3.331094};
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: uluru
    });
    let marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
    }

$(function () {
    $("#submitButton").click(function () {
        console.log("touché");
        //return false;
    });
});

$("#contact-form").submit(function () {
    console.log("formulaire valide");
    const contact = {
        "name": $("#InputName").val(),
        "tel": $("#InputTel").val(),
        "email": $("#InputEmail1").val(),
        "message": $("#message").val(),
        "g-recaptcha-response": $("#g-recaptcha-response").val()
    };

    $.post("contact_sent", contact, function () {
        console.log("success");
    })
        .done(function (data) {
            if (data.responseCode === 0) {
                $("#contact-form").hide();
                $("#successMessage").removeClass("d-none");
                $("#successMessage").addClass("d-block");
            } else {
                $("#contact-form").hide();
                $("#errorMessage").removeClass("d-none");
                $("#errorMessage").addClass("d-block");
            }
        })
        .fail(function () {
            console.log("error");
        })
        .always(function () {
            console.log("finished");
        });
    return false;
});
