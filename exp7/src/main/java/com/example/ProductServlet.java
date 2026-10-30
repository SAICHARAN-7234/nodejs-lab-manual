package com.example;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.*;
import java.sql.*;

@WebServlet("/products")
public class ProductServlet extends HttpServlet {
 static final String URL="jdbc:mysql://localhost:3306/shopdb";
 static final String USER="root", PASS="root";

 protected void doGet(HttpServletRequest req,HttpServletResponse res)throws IOException{
  res.setContentType("text/html");
  try(PrintWriter out=res.getWriter();Connection c=DriverManager.getConnection(URL,USER,PASS);
      Statement s=c.createStatement();ResultSet r=s.executeQuery("SELECT * FROM product")){
    out.println("<h2>Product Catalog</h2><table border='1'>");
    out.println("<tr><th>ID</th><th>Name</th><th>Price</th></tr>");
    while(r.next()) out.printf("<tr><td>%d</td><td>%s</td><td>%.2f</td></tr>",
      r.getInt("id"),r.getString("name"),r.getDouble("price"));
    out.println("</table>");
  }catch(Exception e){res.getWriter().println(e.getMessage());}
 }

 protected void doPost(HttpServletRequest req,HttpServletResponse res)throws IOException{
  String name=req.getParameter("name");
  double price=Double.parseDouble(req.getParameter("price"));
  try(Connection c=DriverManager.getConnection(URL,USER,PASS);
      PreparedStatement p=c.prepareStatement("INSERT INTO product(name,price) VALUES(?,?)")){
    p.setString(1,name);p.setDouble(2,price);p.executeUpdate();
    res.sendRedirect("products");
  }catch(Exception e){res.getWriter().println(e.getMessage());}
 }
}
