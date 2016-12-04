$("#update-rating-btn").on("click", function (ev) {
    return new Promise((resolve, reject) => {
        let selectTagval = $(".rating").val();
        let id = $(".rating").attr("id");

        let body = {
            id: id,
            rating: selectTagval
        }
        return resolve(body);
    }).then((body)=> {
        reqForRating(body);
    })


})

function reqForRating(body) {
    $("#rating-container").removeClass('row').html($('<span class="text-success">You rated this user ' + body.rating + '</span>'));


    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'POST',
            url: '/users/rating',
            contentType: 'application/json',
            data: JSON.stringify(body),
        }).done((data) => resolve(data))
            .fail((err) => reject(err));
    })
}