import java.sql.*;
import java.util.*;

public class StudentCRUD {
 static final String URL="jdbc:mysql://localhost:3306/college";
 static final String USER="root";
 static final String PASS="root";
 static Scanner sc=new Scanner(System.in);

 static Connection connect() throws SQLException{
   return DriverManager.getConnection(URL,USER,PASS);
 }

 static void create() throws Exception{
   System.out.print("Name: "); String n=sc.nextLine();
   System.out.print("Email: "); String e=sc.nextLine();
   System.out.print("Branch: "); String b=sc.nextLine();
   String sql="INSERT INTO student(name,email,branch) VALUES(?,?,?)";
   try(Connection c=connect(); PreparedStatement p=c.prepareStatement(sql)){
     p.setString(1,n);p.setString(2,e);p.setString(3,b);p.executeUpdate();
     System.out.println("Student inserted.");
   }
 }

 static void read() throws Exception{
   try(Connection c=connect(); Statement s=c.createStatement();
       ResultSet r=s.executeQuery("SELECT * FROM student")){
     while(r.next()) System.out.printf("%d | %s | %s | %s%n",
       r.getInt("id"),r.getString("name"),r.getString("email"),r.getString("branch"));
   }
 }

 static void update() throws Exception{
   System.out.print("ID: "); int id=Integer.parseInt(sc.nextLine());
   System.out.print("New branch: "); String b=sc.nextLine();
   try(Connection c=connect();PreparedStatement p=
       c.prepareStatement("UPDATE student SET branch=? WHERE id=?")){
     p.setString(1,b);p.setInt(2,id);
     System.out.println(p.executeUpdate()>0?"Updated.":"ID not found.");
   }
 }

 static void delete() throws Exception{
   System.out.print("ID: "); int id=Integer.parseInt(sc.nextLine());
   try(Connection c=connect();PreparedStatement p=
       c.prepareStatement("DELETE FROM student WHERE id=?")){
     p.setInt(1,id);
     System.out.println(p.executeUpdate()>0?"Deleted.":"ID not found.");
   }
 }

 public static void main(String[] args) throws Exception{
   while(true){
     System.out.println("\n1.Create 2.Read 3.Update 4.Delete 5.Exit");
     System.out.print("Choice: "); String ch=sc.nextLine();
     switch(ch){case "1"->create();case "2"->read();case "3"->update();case "4"->delete();case "5"->System.exit(0);default->System.out.println("Invalid choice");}
   }
 }
}
