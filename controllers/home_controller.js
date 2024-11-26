class Home{
    static home(req, res){
        console.log(req.query);
        res.render("index",{title:"Home Page"});
    }
    static about(req, res){
        console.log(req.query);
        res.render("about",{title:"About Page"}); // Tra ve trang giao dien views/about.ejs
    }
}
export default Home;
