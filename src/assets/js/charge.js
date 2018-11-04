"use strict";

function stripeObject() {
    let button = $('#buttonCheckout').click(async function(ev) {
        setTimeout(async function() {
            let total = $('#TotalTowing').val();
            let replace = total.toString().replace('.', '');
            checkoutHandler.open({
                name: "woowTow Team",
                description: "Recovery Dispatch Service",
                token: handleToken,
                amount: replace,
                image: "./assets/images/template/Logo.png"
            });
        }, 1000);
    });

    // California 1, Mill Valley, California, EE. UU.

    function handleToken(token, test) {
        let TokenCustomer = $('#tokenCli').val();
        let customer_id = $('#customer').val();
        let total = $('#TotalTowing').val();
        let replace = total.toString().replace('.', '');
        let carTok = $('#car_token').val();
        let fromLng = $('#fromLng').val();
        let fromLat = $('#fromLat').val();
        let toLng = $('#toLng').val();
        let toLat = $('#toLat').val();
        let url = `http://localhost:3000/client/payment/stripe/charge`;
        url += `?token=${TokenCustomer}&customer=${customer_id}&amount=${replace}`;
        url += `&carToken=${carTok}&fromLng=${fromLng}&fromLat=${fromLat}&toLng=${toLng}&toLat=${toLat}`;
        fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(token)
            })
            .then(output => {
                if (output.status === "succeeded")
                    alert(output);
            }).catch(reason => {
                console.error(reason);
            });
    }
}