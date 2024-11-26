import express from "express";
import router from "./routes/root.js"; 
import { connectdb } from "./config/connectdb.js";
import tripRouter from "./routes/trip.js";
import bodyParser from 'body-parser'; 
import methodOverride from 'method-override'; // Nhập khẩu method-override
import session from 'express-session';


const app = express();
const port = 3000; 

// Ket noi mongodb
connectdb();

 app.set('view engine', "ejs");
 app.set("views", "./views");
 app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());  // Nếu gửi dữ liệu dưới dạng JSON
app.use(
    methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body){
        var method = req.body._method;
        delete req.body._method;
        return method;
      }
    })
  );
  // Login

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// Hardcoded credentials (admin username and password)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'baochung123';  // You can change this or retrieve from a database

// Route to show the login page
app.get('/login', (req, res) => {
  res.render('login', { title: 'Login Page' });   // Ensure 'login.ejs' is in the views folder
});

// Route to handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the credentials are correct
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Store the username in the session to track the login state
    req.session.loggedIn = true;
    req.session.username = username;

    // Redirect to the trips page
    res.redirect('/trips');
  } else {
    // If credentials are incorrect, send back an error message
    res.send('Invalid credentials, please try again.');
  }
});





 // Định tuyến cho trang chủ
 app.use("/", router);
 
 app.use("/trips", tripRouter);

 // Cong chay
app.listen(port, () =>{
    console.log("server started!!");
 });
