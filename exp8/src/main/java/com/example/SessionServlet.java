package com.example;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.*;

@WebServlet("/session")
public class SessionServlet extends HttpServlet {
 protected void doGet(HttpServletRequest req,HttpServletResponse res)throws IOException{
  res.setContentType("text/html");
  HttpSession session=req.getSession();
  Integer count=(Integer)session.getAttribute("count");
  count=(count==null)?1:count+1;
  session.setAttribute("count",count);

  Cookie cookie=new Cookie("student","Ravi");
  cookie.setMaxAge(3600);
  res.addCookie(cookie);

  try(PrintWriter out=res.getWriter()){
   out.println("<h2>Session Tracking Demo</h2>");
   out.println("<p>HTTP Session visit count: "+count+"</p>");
   out.println("<p>Cookie 'student' has been sent with value: Ravi</p>");
   out.println("<p>Session ID: "+session.getId()+"</p>");
  }
 }
}
