var mercadopago = require('mercadopago');

    mercadopago.configure({
      access_token: 'TEST-2407374069045658-112114-d0a018fae58454e2267bb9a5d813f2d8__LB_LC__-220000424'
    });

    // Create a preference structure
    var preference = {
      items: [
         {
          // id: '1234',
          // title: 'Lightweight Rubber Car',
          // quantity: 4,
          // currency_id: 'ARS',
          // unit_price: 26.39
        }
      ],
      payer : {
        email: 'callie.roob@hotmail.com'
      }
    };
   
    mercadopago.preferences.create(preference)
      .then(function (preference) {
        console.log(preference);
        console.log("ADA")
        // Do something if preference has been created successfully
      }).catch(function (error) {
        console.log(error);
        console.log("PUTO");
        // If an error has occurred
      });
    