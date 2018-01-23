-- MySQL dump 10.13  Distrib 5.6.23, for Win32 (x86)
--
-- Host: localhost    Database: rtracker
-- ------------------------------------------------------
-- Server version	5.5.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `aa_user`
--

DROP TABLE IF EXISTS `aa_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aa_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) DEFAULT NULL,
  `password` text,
  `role` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` text,
  `updated_at` text,
  `last_password_changed_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aa_user`
--

LOCK TABLES `aa_user` WRITE;
/*!40000 ALTER TABLE `aa_user` DISABLE KEYS */;
INSERT INTO `aa_user` VALUES (8,'Reimbursements','$2a$10$ORIiWxXwqR0EPZorBtLwnOiMOUqbqA2KSE6JZuCAQOkTygKyT7yJq',1,1,'2017-09-19 14:34:08','2017-09-19 14:34:08','2018-01-22 15:56:37');
/*!40000 ALTER TABLE `aa_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_details`
--

DROP TABLE IF EXISTS `employee_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `employee_details` (
  `Employee_Id` varchar(15) NOT NULL,
  `Employee_Name` varchar(50) NOT NULL,
  `Email_Id` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`Employee_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_details`
--

LOCK TABLES `employee_details` WRITE;
/*!40000 ALTER TABLE `employee_details` DISABLE KEYS */;
INSERT INTO `employee_details` VALUES ('aain0025','test','test@gmail.com'),('AAIN0026','Ashish Maheshwari','ashish.maheshwari@affineanalytics.com'),('AAIN0027','Altaf Uddin Ahmed','altaf.u@affineanalytics.com'),('AAIN0064','G. Sowjanya','g.sowjanya@affineanalytics.com'),('AAIN0068','Sushant Kashyap','sushant.kashyap@affineanalytics.com'),('AAIN0081','Shweta Vandal','shweta.vandal@affineanalytics.com'),('AAIN0088','Mahesh Chandra Bhat','mahesh.bhat@affineanalytics.com'),('AAIN0092','Manasa B K','manasa.raghu@affineanalytics.com'),('AAIN0096','Amrendra Kumar','amrendra.kumar@affineanalytics.com'),('AAIN0102','Kanchan Bhalotia','kanchan.bhalotia@affineanalytics.com'),('AAIN0111','Subhransu Mohan Sathpathy','subhransu.sathpathy@affineanalytics.com'),('AAIN0114','Akshay Singh Narwaria','akshay.narwaria@affineanalytics.com'),('AAIN0122','Sahil Gupta','sahil.gupta@affineanalytics.com'),('AAIN0125','Priyankar Sengupta','priyankar.sengupta@affineanalytics.com'),('AAIN0136','Yathish Narasimhan','yathish.narasimhan@affineanalytics.com'),('AAIN0140','Shaalini T','shaalini.thanapalan@affineanalytics.com'),('AAIN0147','Suvajit Sen','suvajit.sen@affineanalytics.com'),('AAIN0148','Ananya Chandraker','ananya.chandraker@affineanalytics.com'),('AAIN0156','Bhramar Chandrakar','bhramar.chandrakar@affineanalytics.com'),('AAIN0162','Saivisveswar Karnam','saivisveswar.karnam@affineanalytics.com'),('AAIN0163','Sourav Mazumdar','sourav.mazumdar@affineanalytics.com'),('AAIN0166','Saloni Singh','saloni.singh@affineanalytics.com'),('AAIN0167','Mallikarjun D','mallikarjun1772@gmail.com'),('AAIN0174','Rohan Goyal','rohan.goyal@affineanalytics.com'),('AAIN0180','Nikita Kodnani','nikita.kodnani@affineanalytics.com'),('AAIN0181','Abhishek Sinha','sinha.abhishek@affineanalytics.com'),('AAIN0182','Vaishnavi Byreddy','vaishnavi.byreddy@affineanalytics.com'),('AAIN0188','Mohammad Jilani','mohammad.jilani@affineanalytics.com'),('AAIN0189','Vaibhav Temani','vaibhav.temani@affineanalytics.com'),('AAIN0190','Saidev Bhaskar','saidev.bhaskar@affineanalytics.com'),('AAIN0204','Shuddhashil Mullick','shuddhashil.mullick@affineanalytics.com'),('AAIN0206','Chahat Kalia','chahat.kalia@affineanalytics.com'),('AAIN0209','Sachin Thomas','sachin.thomas@affineanalytics.com'),('AAIN0212','Abhinav Gupta','abhinav.gupta@affineanalytics.com'),('AAIN0214','Nivedita Kumari','nivedita.kumari@affineanalytics.com'),('AAIN0216','Uday Kiran','uday.kiran@affineanalytics.com'),('AAIN0217','Manjushree Hegde','manjushree.hegde@affineanalytics.com'),('AAIN0220','Sayantan Chakraborty','sayantan.chakraborty@affineanalytics.com'),('AAIN0224','Apoorva Kumar G','apoorva.kumar@affineanalytics.com'),('AAIN0226','Abhishek Kumar','abhishek.kumar@affineanalytics.com'),('AAIN0231','Varsha Singhania','varsha.singhania@affineanalytics.com'),('AAIN0236','Abhilash Mishra','abhilash.mishra@affineanalytics.com'),('AAIN0239','Aysha Muhammad Machingara','aysha.muhammad@affineanalytics.com'),('AAIN0241','Arpita Das','arpita.das@affineanalytics.com'),('AAIN0242','Vivek Sharma','vivek.sharma@affineanalytics.com'),('AAIN0245','Prerna','prerna.verma@affineanalytics.com'),('AAIN0247','Hamza Saleem','hamza.saleem@affineanalytics.com'),('AAIN0254','Ankita Singh','ankita.singh@affineanalytics.com'),('AAIN0256','Ayush Agarwal','ayush.agarwal1@affineanalytics.com'),('AAIN0257','Badrinarayanan R ','rajasekaran.badrinarayanan@affineanalytics.com'),('AAIN0262','Vishnu Kumar Reddy M.','vishnu.reddy@affineanalytics.com'),('AAIN0263','Apurv Mittal','apurv.mittal@affineanalytics.com'),('AAIN0264','Sahana Ramanand','sahana.ramanand@affineanalytics.com'),('AAIN0266','Swaminathan K S ','swaminathan.ks@affineanalytics.com'),('AAIN0267','Amber Awasthi','ambar.awasthi@affineanalytics.com'),('AAIN0269','Sharath Babu S N','sharath.babu@affineanalytics.com'),('AAIN0270','Samanth Kumar','samanth.kumar@affineanalytics.com'),('AAIN0271','Yogesh S','yogesh.shanmukhappa@affineanalytics.com'),('AAIN0272','Test','test12345@gmail.com'),('AAIN0282','Gagandeep Singh','gagandeep.singh@affineanalytics.com'),('AAIN0283','Sukrit Kurle','sukrit.kurle@affineanalytics.com'),('AAIN0284','P Selvakumar','selvakumar.periyasamy@affineanalytics.com'),('AAIN0289','Ijis Cheru C','ijis.cheru@affineanalytics.com'),('AAIN0292','Nikhil Chandran','nikhil.chandran@microsoftaffine.com'),('AAIN0293','Chetan Mehta','chetan.mehta@affineanalytics.com'),('AAIN0296','Rahul Rai','rahul.rai@affineanalytics.com'),('AAIN0298','Shailesh Kumar Singh','shailesh.singh@affineanalytics.com'),('AAIN0299','Kshitij Bansal','kshitij.bansal@affineanalytics.com'),('AAIN0301','Shravan Kumar Kantha','Shravan.kantha@affineanalytics.com'),('AAIN0302','Pammi Venkata Valli Sudha','valli.sudha@affineanalytics.com'),('AAIN0312','Tarunay Roy','tarunay.roy@affineanalytics.com'),('AAIN0318','Somya Sutar','somya.sutar@affineanalytics.com'),('AAIN0321','Murali R','murali.241985@gmail.com'),('AAIN0325','Anuja Kokrady','anuja.kokrady@affineanalytics.com'),('AAIN0326','Iranna Gadad','iranna.gadad@affineanalytics.com'),('AAIN0327','Lakshya Bhargava','lakshya.bhargava@affineanalytics.com'),('AAIN0329','Shivam Chopra','shivam.chopra@affineanalytics.com'),('AAIN0331','Vikash Chiriki','vikash.chiriki@affineanalytics.com'),('AAIN0332','Shivangi Shukla','shivangi.shukla@affineanalytics.com'),('AAIN0334','Gudla Mounika','gudla.mounika@affineanalytics.com'),('AAIN0338','Shraiys Joshi','shraiyas.joshi@affineanalytics.com'),('AAIN0343','Raksha Khanna','raksha.khanna@affineanalytics.com'),('AAIN0344','Torsha Chowdhury','torsha.chowdhury@affineanalytics.com'),('AAIN0349','Supradeep Das','supradeep.das@affineanalytics.com'),('AAIN0350','Chavi Bhaskar','chavi.bhaskar@affineanalytics.com'),('AAIN0351','Vishwash Kumar','vishwash.kumar@affineanalytics.com'),('AAIN0353','Vivek Kamalakshan','vivek.kamalakshan@affineanalytics.com'),('AAIN0354','Harshit Gupta','harshit.gupta@affineanalytics.com'),('AAIN0355','Anshul Chaurasia','anshul.chaurasia@affineanalytics.com'),('AAIN0356','Chakradhar Venkata Satya Dittakavi','chakradhar.dittakavi@affineanalytics.com'),('AAIN0359','Harini Akurathi','harini.akurathi@affineanalytics.com'),('AAIN0363','Shishir Sheshadri','shishir.sheshadri@affineanalytics.com'),('AAIN0375','Sayed Shahrukh Ashfaque','shahrukh.sayed@affineanalytics.com'),('AAIN0379','Sarthak Jagetiya','sarthak.jagetiya@affineanalytics.com'),('AAIN0384','Karthik Devaraj','karthik.devaraj@affineanalytics.com'),('AAIN0385','Sneh Kumar','sneh.kumar@affineanalytics.com'),('AAIN0391','Pratik Raj Singh','pratik.raj@affineanalytics.com'),('AAIN0392','Bharath Jaychandran','bharath.jayachandran@affineanalytics.com'),('AAIN0393','Mohammed Fazil','mohammed.fazil@affineanalytics.com'),('AAIN0394','Suraj Kumar Mishra','suraj.mishra@affineanalytics.com'),('AAIN0396','Samarth Bali','samarth.bali@affineanalytics.com'),('AAIN0398','Kotresh Rakesh Roshan','rakesh.roshan@affineanalytics.com'),('AAIN0400','Alexander GK','alexander.gk@affineanalytics.com'),('AAIN0401','Modugula Veerareddy','veera.reddy@affineanalytics.com'),('AAIN0410','Pratik Agarwal','pratik.a@affineanalytics.com'),('AAIN0411','Sunit Kumar Sahu','sunit.sahu@affineanalytics.com'),('AAIN0413','Saurabh Sadani','saurabh.sadani@affineanalytics.com'),('AAIN0414','R. Keshavalakshmi','keshavalakshmi.r@affineanalytics.com'),('AAIN0421','Anshuman Neog','anshuman.neog@affineanalytics.com'),('AAIN0422','Dipayan Dey Sarkar','dipayan.sarkar@affineanalytics.com'),('AAIN0425','Chiranjeevi Panchakarla','chiranjeevi.panchakarla@affineanalytics.com'),('AAIN0428','Devesh Sharma','devesh.sharma@affineanalytics.com'),('AAIN0434','Dhvani Kothari','dhvani.kothari@affineanalytics.com'),('AAIN0435','G Gowrav','gowrav.g@affineanalytics.com'),('AAIN0443','Karan Vashisht','karan.vashisht@affineanalytics.com'),('AAIN0444','Mayank Chawla','mayank.chawla@affineanalytics.com'),('AAIN0445','Piyusha Tanwani','piyusha.tanwani@affineanalytics.com'),('AAIN0448','Gopinath Rajasekar','gopinath.rajasekar@affineanalytics.com'),('AAIN0449','Subhashis Sahu','subhashis.sahu@affineanalytics.com'),('AAIN0450','Taniya Ghosh','taniya.ghosh@affineanalytics.com'),('AAIN0455','Diana D’souza','diana.dsouza@affineanalytics.com'),('AAIN0458','Tanvi Mandloi','tanvi.mandloi@affineanalytics.com'),('AAIN0461','Kuleesha ','Kuleesha@affineanalytics.com'),('AAIN0463','Ravikanti Sai Nikhil','ravikanti.nikhil@affineanalytics.com'),('AAIN0465','Gudipati Madan','madan.gudipati@affineanalytics.com'),('AAIN0466','Chikkanna K','chikkanna.k@affineanalytics.com'),('AAIN0467','Prabhanjan Sahu','prabhanjan.sahu@affineanalytics.com'),('AAIN0470','Ashutosh Panda','ashutosh.panda@affineanalytics.com'),('AAIN0471','Dristi Chatterjee','dristi.chatterjee@affineanalytics.com'),('AAIN0472','Anendra Gupta','anendra.gupta@affineanalytics.com'),('AAIN0473','Shifu Jain','shifu.jain@affineanalytics.com'),('AAIN0474','Aruna M','aruna.m@affineanalytics.com'),('AAIN0475','Priyanka Kulshrestha','priyanka.kulshrestha@affineanalytics.com'),('AAIN0476','Ankit Sharma','ankit.sharma@affineanalytics.com'),('AAIN0477','Nilesh Agarwalla','nilesh.agarwalla@affineanalytics.com'),('AAIN0479','Vaibhav Bajaj','vaibhav.bajaj@affineanalytics.com'),('AAIN0480','Gautham V Bhat','gautham.bhat@affineanalytics.com'),('AAIN0481','Divya Batra','divya.batra@affineanalytics.com'),('AAIN0482','Pulkit Khandelwal','pulkit.khandelwal@affineanalytics.com'),('AAIN0483','Nancy Jain','nancy.jain@affineanalytics.com'),('AAIN0484','Eshaan Kulshreshtha','eshaan.kulshreshtha@affineanalytics.com'),('AAIN0485','Ankit Kumar','ankit.kumar@affineanalytics.com'),('AAIN0487','John Jacob Attasseril','john.attasseril@affineanalytics.com'),('AAIN0488','Parth Gera','parth.gera@affineanalytics.com'),('AAIN0490','Kurapati Sowmya','kurapati.sowmya@affineanalytics.com'),('AAIN0491','Deepti Chawla','deepti.chawla@affineanalytics.com'),('AAIN0492','Suvankar Roy','suvankar.roy@affineanalytics.com'),('AAIN0493','Kuldeep Shukla','kuldeep.shukla@affineanalytics.com'),('AAIN0494','Devi Prasad Khatua','devi.prasad@affineanalytics.com'),('AAIN0495','Kush Kothari','kush.kothari@affineanalytics.com'),('AAIN0496','Prasoon Puri','prasoon.puri@affineanalytics.com'),('AAIN0497','Ansuman Chand','Ansuman.Chand@affineanalytics.com'),('AAIN0498','Arunav Saikia ','arunav.saikia@affineanalytics.com'),('AAIN0499','Mandovi Borthakur','mandovi.borthakur@affineanalytics.com'),('AAIN0500','Nimish Agarwal','nimish.agarwal@affineanalytics.com'),('AAIN0501','Shibayan Saha','shibayan.saha@affineanalytics.com'),('AAIN0502','Guncha Garg','guncha.garg@affineanalytics.com'),('AAIN0504','Ankur Garg','ankur.garg@affineanalytics.com'),('AAIN0505','R Dilip Reddy','dilip.reddy@affineanalytics.com'),('AAIN0506','M. Phanidhar','phanidhar.m@affineanalytics.com'),('AAIN0507','Hitesh Kumar Kanwar','hitesh.kumar@affineanalytics.com'),('AAIN0508','Mounika Gajavilli ','mounika.gajavilli@affineanalytics.com'),('AAIN0509','Rayudu Pujitha ','rayudu.pujitha@affineanalytics.com'),('AAIN0510','Gaurav Sharma','gaurav.sharma@affineanalytics.com'),('AAIN0511','Akhtar Kamran','akhtar.kamran@affineanalytics.com'),('AAIN0512','Tapobrata Behera','Tapobrata.Behera@affineanalytics.com'),('AAIN0513','Racharla Karthikeya','karthikeya.racharla@affineanalytics.com'),('AAIN0516','Nitin Khandelwal','nitin.khandelwal@affineanalytics.com'),('AAIN0517','Soumanta Das','soumanta.das@affineanalytics.com'),('AAIN0518','Mohd Azad','mohd.azad@affineanalytics.com'),('AAIN0519','Shanoob PP','shanoob.pp@affineanalytics.com'),('AAIN0520','Ankit Khandelwal','ankit.khandelwal@affineanalytics.com'),('AAIN0521','Chitvan Gupta','chitvan.gupta@affineanalytics.com'),('AAIN0523','Mohit Menon','mohit.menon@affineanalytics.com'),('AAIN0524','Sourav Kumar Mishra','sourav.mishra@affineanalytics.com'),('AAIN0525','Tuhina Basu','tuhina.basu@affineanalytics.com'),('AAIN0526','Sreeparna Chatterjee','sreeparna.chatterjee@affineanalytics.com'),('AAIN0527','Poulami Roy','poulami.roy@affineanalytics.com'),('AAIN0528','Tiasha Dhar','tiasha.dhar@affineanalytics.com'),('AAIN0529','Sreeja Mondal','sreeja.mondal@affineanalytics.com'),('AAIN0531','Ritesh Kumar','ritesh.kumar@affineanalytics.com'),('AAIN0532','Ramanan Balan','ramanan.balan@affineanalytics.com'),('AAIN0533','Harsh Vardhan','harsh.vardhan@affineanalytics.com'),('AAIN0534','Vishnu Chaithanya','vishnu.chaithanya@affineanalytics.com'),('AAIN0535','Shuchi Sureka','shuchi.sureka@affineanalytics.com'),('AAIN0536','Rajesh Narayan','rajesh.narayan@affineanalytics.com'),('AAIN0537','Nidhi Agarwal','nidhi.agrawal@affineanalytics.com'),('AAIN0538','Gururajan Srinivasan','gururajan.srinivasan@affineanalytics.com'),('AAIN0540','Pavan Patil','pavan.patil@affineanalytics.com'),('AAIN0541','Archit Agrawal','archit.agrawal@affineanalytics.com'),('AAIN0542','Siva Teja','siva.teja@affineanalytics.com'),('AAIN0543','Prayashi Bohra','prayashi.bohra@affineanalytics.com'),('AAIN0544','Deepshikha Mahapatra','deepshikha.mahapatra@affineanalytics.com'),('AAIN0545','Rahul AP','rahul.ap@affineanalytics.com'),('AAIN0546','Abhishek Singha','abhishek.singha@affineanalytics.com'),('AAIN0547','Sandeep Sanyal','sandeep.sanyal@affineanalytics.com'),('AAIN0548','Utkarsh Chaturvedi','utkarsh.chaturvedi@affineanalytics.com'),('AAIN0549','Akshay Singhania','akshay.singhania@affineanalytics.com'),('AAIN0550','Shubhi Saini','shubhi.saini@affineanalytics.com'),('AAIN0552','abc','ABC@GMAIL.COM'),('AAINC0271','yogesh','yogesh.shanmukhappa@affineanalytics.com'),('Reimbursements','Finance Team',NULL);
/*!40000 ALTER TABLE `employee_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reimbursement_details`
--

DROP TABLE IF EXISTS `reimbursement_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reimbursement_details` (
  `Claim_Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Employee_Id` varchar(50) NOT NULL,
  `Claim_Amount` double NOT NULL,
  `Expense_Details` varchar(500) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `Comment` varchar(500) DEFAULT NULL,
  `Date_Of_Receipt` datetime DEFAULT NULL,
  `Approved_Amount` double DEFAULT NULL,
  `Approved_Date` datetime DEFAULT NULL,
  `Expense_Type` varchar(45) NOT NULL,
  `Project_Name` varchar(45) NOT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Modified_At` datetime DEFAULT NULL,
  `Paid_Date` datetime DEFAULT NULL,
  `Amount_Type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`Claim_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reimbursement_details`
--

LOCK TABLES `reimbursement_details` WRITE;
/*!40000 ALTER TABLE `reimbursement_details` DISABLE KEYS */;
INSERT INTO `reimbursement_details` VALUES (1,'AAIN0271',1900,'Team Outing','Paid','All Clear','2017-12-31 18:30:00',NULL,'2017-12-31 18:30:00','direct','Expedia','2018-01-12 11:45:40','2018-01-12 12:09:45','2018-01-12 00:00:00',NULL),(2,'AAIN0398',2247,'cab','Paid','All Clear','2018-01-02 18:30:00',2247,'2018-01-02 18:30:00','direct','HRIS','2018-01-12 11:55:26','2018-01-12 12:09:45','2018-01-12 00:00:00',NULL),(3,'AAIN0271',2247,'cAB','Paid','All Clear','2017-12-31 18:30:00',2200,'2017-12-31 18:30:00','indirect','Expedia','2018-01-12 12:02:12','2018-01-12 12:09:45','2018-01-12 00:00:00',NULL),(4,'aain0552',66637,'yufyu','Submitted',NULL,'2018-01-02 00:00:00',NULL,NULL,'direct','ffhfh','2018-01-12 12:32:01',NULL,NULL,NULL),(5,'AAIN0271',2247,'cab','Paid','Already paid','2017-12-31 18:30:00',2000,'2017-12-31 18:30:00','direct','HRIS','2018-01-12 12:32:23','2018-01-12 12:44:08','2018-01-12 00:00:00',NULL),(6,'AAIN0467',2000,'cab','Paid','Already paid','2018-01-02 18:30:00',1990,'2018-01-02 18:30:00','direct','account','2018-01-12 12:33:27','2018-01-12 12:44:08','2018-01-12 00:00:00',NULL),(7,'AAIN0398',2247,'cab','Paid','Already paid','2018-01-01 18:30:00',2000,'2018-01-01 18:30:00','direct','Expedia','2018-01-12 12:42:30','2018-01-12 12:44:08','2018-01-12 00:00:00',NULL),(8,'AAIN0271',2247,'team','Paid','paid','2018-01-04 18:30:00',2200,'2018-01-04 18:30:00','direct','HRIS','2018-01-16 13:50:39','2018-01-16 17:19:50','2018-01-16 00:00:00',NULL),(12,'AAIN0272',234,'te','Submitted',NULL,'2018-01-02 00:00:00',NULL,NULL,'direct','HRIS','2018-01-16 15:33:48',NULL,NULL,NULL),(13,'AAIN0272',2247,'asd','Submitted',NULL,'2018-01-15 00:00:00',NULL,NULL,'direct','Expedia','2018-01-16 15:35:47',NULL,NULL,NULL),(14,'AAIN0271',2222,'2345','Paid','paid','2018-01-01 18:30:00',2000,'2018-01-01 18:30:00','direct','HRIS','2018-01-16 17:17:32','2018-01-16 17:19:50','2018-01-16 00:00:00',NULL),(15,'AAIN0552',2000,'TEST','Submitted',NULL,'2017-12-12 00:00:00',NULL,NULL,'direct','ffhfh','2018-01-16 17:37:05',NULL,NULL,NULL),(16,'AAIN0271',2247,'tea','Submitted',NULL,'2018-01-01 00:00:00',NULL,NULL,'direct','Expedia','2018-01-17 16:45:57',NULL,NULL,NULL),(17,'AAIN0271',2247,'11','Submitted',NULL,'2018-01-01 00:00:00',NULL,NULL,'direct','2','2018-01-17 16:58:40',NULL,NULL,NULL),(18,'AAIN0271',2247,'11','Hold','tes','2018-01-01 00:00:00',NULL,'2018-01-01 00:00:00','direct','2','2018-01-17 16:58:40','2018-01-17 16:59:20',NULL,NULL),(19,'AAIN0271',2247,'hv','Submitted',NULL,'2018-01-03 00:00:00',NULL,NULL,'direct','hjvh','2018-01-17 17:05:22',NULL,NULL,NULL),(20,'AAIN0271',2247,'aa','Submitted',NULL,'2018-01-03 00:00:00',NULL,NULL,'direct','a','2018-01-17 17:09:42',NULL,NULL,NULL),(21,'AAIN0271',2247,'hg','Paid','gcg','2018-01-09 18:30:00',788,'2018-01-09 18:30:00','direct','nvh','2018-01-17 17:11:25','2018-01-17 17:46:28','2018-01-17 00:00:00',NULL),(22,'AAIN0271',2247,'gfh','Submitted',NULL,'2018-01-03 00:00:00',NULL,NULL,'direct','v','2018-01-17 17:20:05',NULL,NULL,NULL),(23,'AAIN0271',2247,'qwq','Paid','gcg','2018-01-01 18:30:00',555,'2018-01-01 18:30:00','direct','w','2018-01-17 17:23:18','2018-01-17 17:46:28','2018-01-17 00:00:00',NULL),(24,'aain0025',2000,'shs','Submitted',NULL,'2018-01-04 00:00:00',NULL,NULL,'direct','s','2018-01-17 17:43:36',NULL,NULL,NULL),(25,'AAIN0271',2247,'as','Paid','paid','2017-12-31 18:30:00',55,'2017-12-31 18:30:00','direct','q','2018-01-17 19:18:52','2018-01-22 21:00:58','2018-01-22 00:00:00',NULL),(26,'AAIN0271',2247,'tese','Submitted',NULL,'2018-01-16 00:00:00',NULL,NULL,'direct','HRIS','2018-01-22 17:27:46',NULL,NULL,NULL),(27,'AAIN0271',11111,'test','Submitted',NULL,'2018-01-10 00:00:00',NULL,NULL,'indirect','HRIS','2018-01-22 17:30:14',NULL,NULL,NULL),(28,'AAIN0552',22222,'test','Submitted',NULL,'2018-01-01 00:00:00',NULL,NULL,'indirect','account','2018-01-22 17:33:57',NULL,NULL,NULL),(29,'AAIN0271',2000,'as','Hold','Aaa','2018-01-09 00:00:00',NULL,'2018-01-09 00:00:00','indirect','as','2018-01-22 17:39:01','2018-01-22 19:03:23',NULL,NULL),(30,'AAIN0271',1234,'sd','Paid','paid','2018-01-15 18:30:00',2344,'2018-01-15 18:30:00','direct','s','2018-01-22 17:53:00','2018-01-22 21:00:58','2018-01-22 00:00:00',NULL),(31,'AAINC0271',222,'as','Submitted',NULL,'2018-01-22 00:00:00',NULL,NULL,'direct','asd','2018-01-22 19:07:57',NULL,NULL,NULL),(32,'AAINC0271',23,'34ccv','Submitted',NULL,'2018-01-11 00:00:00',NULL,NULL,'indirect','gh','2018-01-22 19:15:23',NULL,NULL,NULL),(33,'AAINC0271',344,'asd','Submitted',NULL,'2018-01-10 00:00:00',NULL,NULL,'indirect','zc','2018-01-22 19:16:12',NULL,NULL,NULL),(34,'AAINC0271',3445,'sdsd','Submitted',NULL,'2018-01-10 00:00:00',NULL,NULL,'indirect','ssd','2018-01-22 19:16:58',NULL,NULL,NULL),(35,'AAIN0271',233,'23','Submitted',NULL,'2018-01-16 00:00:00',NULL,NULL,'indirect','Sas','2018-01-22 19:17:39',NULL,NULL,NULL),(36,'AAINC0271',233,'aa','Submitted',NULL,'2018-01-16 00:00:00',NULL,NULL,'indirect','zx','2018-01-22 19:21:11',NULL,NULL,NULL),(37,'AAINC0271',233,'aa','Submitted',NULL,'2018-01-16 00:00:00',NULL,NULL,'indirect','zx','2018-01-22 19:21:12',NULL,NULL,NULL),(38,'aain0271',2247,'zzfg','Submitted',NULL,'2018-01-11 00:00:00',NULL,NULL,'direct','fg','2018-01-22 19:23:16',NULL,NULL,NULL),(39,'aain0271',23,'xd','Submitted',NULL,'2018-01-04 00:00:00',NULL,NULL,'indirect','d','2018-01-22 19:24:26',NULL,NULL,NULL),(40,'aain0271',234,'34556','Submitted',NULL,'2018-01-10 00:00:00',NULL,NULL,'indirect','asas','2018-01-22 19:32:38',NULL,NULL,NULL),(41,'aain0271',344,'a','Submitted',NULL,'2018-01-03 00:00:00',NULL,NULL,'direct','34','2018-01-22 19:33:26',NULL,NULL,NULL),(42,'aainC0271',2247,'aA','Submitted',NULL,'2018-01-11 00:00:00',NULL,NULL,'indirect','a','2018-01-22 19:33:58',NULL,NULL,NULL),(43,'aain0271',222222,'a','Paid','paid','2018-01-16 18:30:00',344,'2018-01-16 18:30:00','direct','sss','2018-01-22 19:44:20','2018-01-22 21:00:58','2018-01-22 00:00:00',NULL),(44,'AAINC0271',3455,'zzz','Submitted',NULL,'2018-01-05 00:00:00',NULL,NULL,'indirect','zz','2018-01-22 19:47:13',NULL,NULL,NULL),(45,'AAINC0271',3455,'zzz','Submitted',NULL,'2018-01-05 00:00:00',NULL,NULL,'indirect','zz','2018-01-22 19:47:13',NULL,NULL,NULL),(46,'AAIN0271',23455,'az','Submitted',NULL,'2018-01-03 00:00:00',NULL,NULL,'indirect','z','2018-01-22 20:40:05',NULL,NULL,NULL),(47,'AAINC0271',2000,'hvhv','Submitted','vcgc','2018-01-18 00:00:00',NULL,'2018-01-18 00:00:00','direct','gcgc','2018-01-22 20:41:03','2018-01-22 20:41:51',NULL,NULL),(48,'AAIN0271',2247,'testt','Submitted',NULL,'2018-01-03 00:00:00',NULL,NULL,'direct','testt','2018-01-22 20:50:12',NULL,NULL,NULL),(49,'AAIN0271',5432,'test','Paid','paid','2018-01-10 18:30:00',666,'2018-01-10 18:30:00','indirect','gjf','2018-01-22 20:51:56','2018-01-22 21:00:58','2018-01-22 00:00:00','dollar'),(50,'AAIN0271',5555,'cab','Submitted',NULL,'2018-01-10 00:00:00',NULL,NULL,'indirect','cab','2018-01-22 20:55:52',NULL,NULL,'indian'),(51,'AAINC0271',6666,'bvhb','Submitted',NULL,'2018-01-11 00:00:00',NULL,NULL,'direct','hvjv','2018-01-22 20:57:27',NULL,NULL,'dollar'),(52,'AAIN0271',345,'a','Accept','s','2018-01-11 00:00:00',3456,'2018-01-11 00:00:00','direct','q','2018-01-22 22:15:05','2018-01-22 22:16:23',NULL,'indian'),(53,'AAINC0271',42.4,'vhv','Submitted',NULL,'2018-01-17 00:00:00',NULL,NULL,'direct','v','2018-01-23 11:50:04',NULL,NULL,'dollar');
/*!40000 ALTER TABLE `reimbursement_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reimbursement_details_history`
--

DROP TABLE IF EXISTS `reimbursement_details_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reimbursement_details_history` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Claim_Id` bigint(20) NOT NULL,
  `Employee_Id` varchar(50) NOT NULL,
  `Claim_Amount` double NOT NULL,
  `Expense_Details` varchar(500) DEFAULT NULL,
  `Status` varchar(45) DEFAULT NULL,
  `Comment` varchar(500) DEFAULT NULL,
  `Date_Of_Receipt` datetime NOT NULL,
  `Approved_Amount` double DEFAULT NULL,
  `Approved_Date` datetime DEFAULT NULL,
  `Created_Date` datetime DEFAULT NULL,
  `Modified_Date` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reimbursement_details_history`
--

LOCK TABLES `reimbursement_details_history` WRITE;
/*!40000 ALTER TABLE `reimbursement_details_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `reimbursement_details_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-23 15:31:05
