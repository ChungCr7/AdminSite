
import Trip from "../models/trips.js"; 
class TripController {
    static async index(req, res) {
        let my_trips; // Truy van du lieu tu cơ sở dữ liệu MongoDB.
        
        try {
          // Luôn lấy tất cả người dùng mà không cần tham số tìm kiếm
          my_trips = await Trip.find({}); // Tìm tất cả người dùng trong cơ sở dữ liệu
      
          // Render trang 'trip' với danh sách người dùng
          res.render("trip", { title: "My trip", my_trips });
        } catch (error) {
          console.error('Lỗi khi lấy người dùng:', error);
          res.status(500).send('Lỗi khi lấy dữ liệu người dùng');
        }
      }
      
      // Dat cho moi
      static async new(req, res) {
        res.render("tripnew", { title: "Trip New" });
      }
      
      static  async create(req, res) {
        let {customerName, date, time, placeCity,image}= req.body;
        let trips = await Trip.create({ customerName, date, time, placeCity, image});
        console.log(trips);
        
        // Sau khi lưu, chuyển hướng về trang danh sách người dùng
        if (trips) {
        res.redirect("/trips");
        } else {
        res.render("tripnew", { title: "Trip New" });
        }
    }
    // Xoa
    static async delete(req, res) {
      
      let id = req.params.id;
      let { deletedCount } = await Trip.deleteOne({ _id: id });
      if (deletedCount == 0) {
        console.log("Khong xoa duoc !!");
      } else {
        console.log("Da xoa duoc !!");
      }
      res.redirect("/trips");
    }
    
     // Sửa (Edit)
     static async edit(req, res) {
      let id = req.params.id;
      try {
          // Tìm trip cần sửa bằng ID
          let trip = await Trip.findById(id);  // Use 'trip' here (singular)

          if (!trip) {
              return res.status(404).send("Trip không tồn tại.");
          }

          // Render trang edit với thông tin trip
          res.render("tripedit", { title: "Edit Trips", trip });  // Pass 'trip' (singular) to the view
      } catch (error) {
          console.error('Lỗi khi tìm kiếm trip:', error);
          res.status(500).send('Lỗi khi tìm kiếm dữ liệu trip');
      }
  }

  // Cập nhật đặt chỗ
  static async update(req, res) {
    let id = req.params.id;
    let { customerName, date, time, placeCity,image } = req.body;
  
    try {
      // Cập nhật trip trong cơ sở dữ liệu
      let updatedTrip= await Trip.findByIdAndUpdate(
        id,
        { customerName, date, time, placeCity, image },
        { new: true } // Trả về document đã được cập nhật
      );
  
      if (!updatedTrip) {
        return res.status(404).send("Trips không tồn tại.");
      }
  
      // Sau khi cập nhật, chuyển hướng về trang danh sách trip
      res.redirect("/trips");
    } catch (error) {
      console.error('Lỗi khi cập nhật trip:', error);
      res.status(500).send('Lỗi khi cập nhật dữ liệu trip');
    }
  }
  
  }
  
  
      

export default TripController;