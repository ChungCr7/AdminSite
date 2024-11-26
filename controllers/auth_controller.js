

// Hiển thị trang login với title
export const showLoginPage = (req, res) => {
    res.render("login", { title: "Login Page" });  // Truyền title cho trang login
  };
  
  // Xử lý đăng nhập
  export const login = (req, res) => {
    const { username, password } = req.body;
  
    if (username === "admin" && password === "baochung123") {
      // Nếu đăng nhập thành công
      req.session.loggedIn = true;
      req.session.username = username;
      res.redirect("/users");  // Chuyển hướng đến trang quản lý người dùng
    } else {
      // Nếu sai thông tin đăng nhập
      res.send("Invalid credentials, please try again.");
    }
  };
  
  // Xử lý đăng xuất
  export const logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.send("Failed to log out");
      }
      res.redirect("/login");  // Sau khi đăng xuất xong, chuyển hướng về trang login
    });
  };
  