const express = require("express")

const Insta = require('instamojo-nodejs')

const bodyParser = require('body-parser')

const API_KEY = "test_dd65aadce81fc37b76293fee900"

const AUTH_KEY = "test_3123f109d2f64c9fec25a8a9cc7"

Insta.setKeys(API_KEY,AUTH_KEY)

Insta.isSandboxMode(true)

const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000

app.use('/assets',express.static('assets'))


app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
})

app.post('/pay',(req,res)=>{

    var name = req.body.name
    var email = req.body.email
    var amount = req.body.amount
    console.log(name)
    console.log(email)
    console.log(amount)

    var data = new Insta.PaymentData();

    const REDIRECT_URL = "http://localhost:3000/success";

    data.setRedirectUrl(REDIRECT_URL);
    data.send_email = "True";
    data.purpose = "donation for Smile Foundation";
    data.amount = amount;
    data.name = name;
    data.email = email;

    Insta.createPayment(data, function (error, response) {
        if (error) {
          // some error
        } else {
          // Payment redirection link at response.payment_request.longurl
          console.log(response)
          res.send("Please check your email to make payment")
        }
      });
});

app.get('/success',(req,res)=>{
    res.send("Payment was successfull please check your pdf for invoice pfd")
});




app.listen(PORT,()=>{
    console.log(`App is listning at port ${PORT}`)
})

