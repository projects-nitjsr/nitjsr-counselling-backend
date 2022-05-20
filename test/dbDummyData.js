const db = require("../helpers/dbconnect");

const FILL_DUMMY_DATA_TO_DATABASE = async () => {
  const dummyDataQuery = `
USE ${process.env.DB_USER};

INSERT INTO student (name,regno,email,generalRank,category,categoryRank,profile_image_url)
VALUES
  ("Ross Hamilton","CCQ59RJX1001","rosshamilton4394@nitbhu.in",1,"obc",1,"https://picsum.photos/200"),
  ("Sybil Barron","CCQ59RJX1002","sybilbarron@nitjsr.in",2,"pwd",1,"https://picsum.photos/200"),
  ("Laura Albert","CCQ59RJX1003","lauraalbert7221@nitbhu.in",3,"sc",1,"https://picsum.photos/200"),
  ("Astra Deleon","CCQ59RJX1004","astradeleon@nitbhu.in",4,"obc",2,"https://picsum.photos/200"),
  ("Stone Salazar","CCQ59RJX1005","stonesalazar3164@nitjsr.in",5,"st",1,"https://picsum.photos/200"),
  ("Steel Montoya","CCQ59RJX1006","steelmontoya3274@nitbhu.in",6,"obc",3,"https://picsum.photos/200"),
  ("Jena Carr","CCQ59RJX1007","jenacarr@nitbhu.in",7,"obc",4,"https://picsum.photos/200"),
  ("Elijah Lester","CCQ59RJX1008","elijahlester@nitbhu.in",8,"pwd",2,"https://picsum.photos/200"),
  ("Daphne Finley","CCQ59RJX1009","daphnefinley@nitbhu.in",9,"sc",2,"https://picsum.photos/200"),
  ("Brielle Burt","CCQ59RJX1010","brielleburt1551@nitbhu.in",10,"pwd",3,"https://picsum.photos/200");

  INSERT INTO student_credentials (regno,password,token)
VALUES
  ("CCQ59RJX1001","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),
  ("CCQ59RJX1002","OEU43MLM8XH","WOG32SEF4TR4WO4UKB56CYL6PF2NN"),
  ("CCQ59RJX1003","KCO87FLL9QF","VHR08GKD0RW2PY9KWX20RBN5VU3NZ"),
  ("CCQ59RJX1004","AUT93RDL1NW","FGE96YLB5UX2PT2DRC77CYE1BX1OW"),
  ("CCQ59RJX1005","SWP83UUJ3EL","DJD20SLS2TB6FG7JGW21YQQ4FR3ME"),
  ("CCQ59RJX1006","QXR58PXO4XN","TYC73NHZ8IE5VE2REC09IKN2IY2QV"),
  ("CCQ59RJX1007","PNH11DJA4SC","IFM78GJJ5DX4OR8CJJ44XMM5LZ2LY"),
  ("CCQ59RJX1008","EPX64BCU7SI","EXN13WMQ4JF2VU7KEG32TMM8IW4XY"),
  ("CCQ59RJX1009","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("CCQ59RJX1010","YNV48GCP8QQ","NPR38PWD7FW8XB6KPD38SQK0UX6BX");

  INSERT INTO colleges (id,name,general_seats,obc_seats,sc_seats,st_seats,pwd_seats,ews_seats,profile_image_url)
VALUES
  ("1000001","National Institute of Technology, Jamshedpur",84,6,6,8,14,11,"https://picsum.photos/200"),
  ("1000002","National Institute of Technology, Allahabad",71,9,5,10,11,9,"https://picsum.photos/200"),
  ("1000003","National Institute of Technology, Bhopal",80,6,6,10,11,10,"https://picsum.photos/200"),
  ("1000004","National Institute of Technology, Agartala",81,8,8,5,6,11,"https://picsum.photos/200"),
  ("1000005","National Institute of Technology, Kurukshetra",82,8,6,7,6,9,"https://picsum.photos/200"),
  ("1000006","National Institute of Technology, Warangal",90,8,6,8,10,8,"https://picsum.photos/200"),
  ("1000007","National Institute of Technology, Raipur",95,7,8,8,13,11,"https://picsum.photos/200"),
  ("1000008","National Institute of Technology, Surathkal",73,6,7,7,11,6,"https://picsum.photos/200"),
  ("1000009","National Institute of Technology, Tiruchirappalli",99,10,10,10,10,6,"https://picsum.photos/200");


  INSERT INTO admin (email,designation,profile_image_url)
VALUES

("chairman@nimcet.in","c","https://picsum.photos/200"),
("secretary@nimcet.in","s","https://picsum.photos/200"),

("centerincharge.nitjsr@nimcet.in","ci","https://picsum.photos/200"),
("centerincharge.nitalah@nimcet.in","ci","https://picsum.photos/200"),
("centerincharge.nitbho@nimcet.in","ci","https://picsum.photos/200"),
("centerincharge.nitagar@nimcet.in","ci","https://picsum.photos/200"),
("centerincharge.nitkuru@nimcet.in","ci","https://picsum.photos/200"),
("centerincharge.nitwara@nimcet.in","ci","https://picsum.photos/200"),
("centerincharge.nitrai@nimcet.in","ci","https://picsum.photos/200"),
("centerincharge.nitsura@nimcet.in","ci","https://picsum.photos/200"),
("centerincharge.nittiru@nimcet.in","ci","https://picsum.photos/200"),

  ("rjhhvfhjg@nitjsr.in","vo","https://picsum.photos/200"),
  ("sychgdmgb@nitjsr.in","vo","https://picsum.photos/200"),
  ("rjsdhhvfhjg@nitjsr.in","vo","https://picsum.photos/200"),
  ("sysdchgdmgb@nitjsr.in","vo","https://picsum.photos/200"),

  ("bhkdxvbvjj@nitalah.in","vo","https://picsum.photos/200"),
  ("nkgvradeleon@nitalah.in","vo","https://picsum.photos/200"),
  ("cvbkjhgfcalazar3164@nitalah.in","vo","https://picsum.photos/200"),
  ("cvbcxvbboya3274@nitalah.in","vo","https://picsum.photos/200"),

  ("nkhfcacarr@nitbho.in","vo","https://picsum.photos/200"),
  ("jdjjahlester@nitbho.in","vo","https://picsum.photos/200"),
  ("vbnmnefinley@nitbho.in","vo","https://picsum.photos/200"),
  ("ioooleburt1551@nitbho.in","vo","https://picsum.photos/200"),

  ("nkhfcacarr@nitagar.in","vo","https://picsum.photos/200"),
  ("jdjjahlester@nitagar.in","vo","https://picsum.photos/200"),
  ("vbnmnefinley@nitagar.in","vo","https://picsum.photos/200"),
  ("ioooleburt1551@nitagar.in","vo","https://picsum.photos/200"),

  ("nkhfcacarr@nitkuru.in","vo","https://picsum.photos/200"),
  ("jdjjahlester@nitkuru.in","vo","https://picsum.photos/200"),
  ("vbnmnefinley@nitkuru.in","vo","https://picsum.photos/200"),
  ("ioooleburt1551@nitkuru.in","vo","https://picsum.photos/200"),

  ("nkhfcacarr@nitwara.in","vo","https://picsum.photos/200"),
  ("jdjjahlester@nitwara.in","vo","https://picsum.photos/200"),
  ("vbnmnefinley@nitwara.in","vo","https://picsum.photos/200"),
  ("ioooleburt1551@nitwara.in","vo","https://picsum.photos/200"),

  ("nkhfcacarr@nitrai.in","vo","https://picsum.photos/200"),
  ("jdjjahlester@nitrai.in","vo","https://picsum.photos/200"),
  ("vbnmnefinley@nitrai.in","vo","https://picsum.photos/200"),
  ("ioooleburt1551@nitrai.in","vo","https://picsum.photos/200"),

  ("nkhfcacarr@nitsura.in","vo","https://picsum.photos/200"),
  ("jdjjahlester@nitsura.in","vo","https://picsum.photos/200"),
  ("vbnmnefinley@nitsura.in","vo","https://picsum.photos/200"),
  ("ioooleburt1551@nitsura.in","vo","https://picsum.photos/200"),

  ("nkhfcacarr@nittiru.in","vo","https://picsum.photos/200"),
  ("jdjjahlester@nittiru.in","vo","https://picsum.photos/200"),
  ("vbnmnefinley@nittiru.in","vo","https://picsum.photos/200"),
  ("ioooleburt1551@nittiru.in","vo","https://picsum.photos/200")
  
  ;

  INSERT INTO admin_credentials (email,password,token)
VALUES

("chairman@nimcet.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),
("secretary@nimcet.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),

("centerincharge.nitjsr@nimcet.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),
("centerincharge.nitalah@nimcet.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),
("centerincharge.nitbho@nimcet.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),
("centerincharge.nitagar@nimcet.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),
("centerincharge.nitkuru@nimcet.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),
("centerincharge.nitwara@nimcet.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),
("centerincharge.nitrai@nimcet.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),
("centerincharge.nitsura@nimcet.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),
("centerincharge.nittiru@nimcet.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),

  ("rjhhvfhjg@nitjsr.in","OYC84IWS6BZ","UGN24SDV6KF0NO3GUQ20IWF6LB3LK"),
  ("sychgdmgb@nitjsr.in","OEU43MLM8XH","WOG32SEF4TR4WO4UKB56CYL6PF2NN"),
  ("rjsdhhvfhjg@nitjsr.in","KCO87FLL9QF","VHR08GKD0RW2PY9KWX20RBN5VU3NZ"),
  ("sysdchgdmgb@nitjsr.in","AUT93RDL1NW","FGE96YLB5UX2PT2DRC77CYE1BX1OW"),

  ("bhkdxvbvjj@nitalah.in","SWP83UUJ3EL","DJD20SLS2TB6FG7JGW21YQQ4FR3ME"),
  ("nkgvradeleon@nitalah.in","QXR58PXO4XN","TYC73NHZ8IE5VE2REC09IKN2IY2QV"),
  ("cvbkjhgfcalazar3164@nitalah.in","PNH11DJA4SC","IFM78GJJ5DX4OR8CJJ44XMM5LZ2LY"),
  ("cvbcxvbboya3274@nitalah.in","EPX64BCU7SI","EXN13WMQ4JF2VU7KEG32TMM8IW4XY"),

  ("nkhfcacarr@nitbho.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("jdjjahlester@nitbho.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("vbnmnefinley@nitbho.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("ioooleburt1551@nitbho.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),

  ("nkhfcacarr@nitagar.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("jdjjahlester@nitagar.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("vbnmnefinley@nitagar.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("ioooleburt1551@nitagar.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  
  ("nkhfcacarr@nitkuru.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("jdjjahlester@nitkuru.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("vbnmnefinley@nitkuru.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("ioooleburt1551@nitkuru.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  
  ("nkhfcacarr@nitwara.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("jdjjahlester@nitwara.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("vbnmnefinley@nitwara.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("ioooleburt1551@nitwara.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),

  ("nkhfcacarr@nitrai.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("jdjjahlester@nitrai.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("vbnmnefinley@nitrai.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("ioooleburt1551@nitrai.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),

  ("nkhfcacarr@nitsura.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("jdjjahlester@nitsura.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("vbnmnefinley@nitsura.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("ioooleburt1551@nitsura.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  
  ("nkhfcacarr@nittiru.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("jdjjahlester@nittiru.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("vbnmnefinley@nittiru.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH"),
  ("ioooleburt1551@nittiru.in","QFW31EVE7AW","KTS70EPU5RS6UT4EPL34CUU1EJ4DH");


  INSERT INTO verifying_officers (email,name,college)
VALUES
  ("rjhhvfhjg@nitjsr.in","aaaaaa bbbbb","1000001"),
  ("sychgdmgb@nitjsr.in","bbbbb ccccc","1000001"),
  ("rjsdhhvfhjg@nitjsr.in","zzzzz yyyyy","1000001"),
  ("sysdchgdmgb@nitjsr.in","yyyyyy xxxxxx","1000001"),

  ("bhkdxvbvjj@nitalah.in","cccccc ddddd","1000002"),
  ("nkgvradeleon@nitalah.in","eeeee ffffff","1000002"),
  ("cvbkjhgfcalazar3164@nitalah.in","ggggg hhhhh","1000002"),
  ("cvbcxvbboya3274@nitalah.in","iiiiii jjjjjj","1000002"),

  ("nkhfcacarr@nitbho.in","jjjjjj kkkkkk","1000003"),
  ("jdjjahlester@nitbho.in","kkkkkk jjjjjj","1000003"),
  ("vbnmnefinley@nitbho.in","mmmmmmm nnnnnn","1000003"),
  ("ioooleburt1551@nitbho.in","oooooo pppppp","1000003"),
  
  ("nkhfcacarr@nitagar.in","jjjjjj kkkkkk","1000004"),
  ("jdjjahlester@nitagar.in","kkkkkk jjjjjj","1000004"),
  ("vbnmnefinley@nitagar.in","mmmmmmm nnnnnn","1000004"),
  ("ioooleburt1551@nitagar.in","oooooo pppppp","1000004"),

  ("nkhfcacarr@nitkuru.in","jjjjjj kkkkkk","1000005"),
  ("jdjjahlester@nitkuru.in","kkkkkk jjjjjj","1000005"),
  ("vbnmnefinley@nitkuru.in","mmmmmmm nnnnnn","1000005"),
  ("ioooleburt1551@nitkuru.in","oooooo pppppp","1000005"),
  
  ("nkhfcacarr@nitwara.in","jjjjjj kkkkkk","1000006"),
  ("jdjjahlester@nitwara.in","kkkkkk jjjjjj","1000006"),
  ("vbnmnefinley@nitwara.in","mmmmmmm nnnnnn","1000006"),
  ("ioooleburt1551@nitwara.in","oooooo pppppp","1000006"),

  ("nkhfcacarr@nitrai.in","jjjjjj kkkkkk","1000007"),
  ("jdjjahlester@nitrai.in","kkkkkk jjjjjj","1000007"),
  ("vbnmnefinley@nitrai.in","mmmmmmm nnnnnn","1000007"),
  ("ioooleburt1551@nitrai.in","oooooo pppppp","1000007"),
  
  ("nkhfcacarr@nitsura.in","jjjjjj kkkkkk","1000008"),
  ("jdjjahlester@nitsura.in","kkkkkk jjjjjj","1000008"),
  ("vbnmnefinley@nitsura.in","mmmmmmm nnnnnn","1000008"),
  ("ioooleburt1551@nitsura.in","oooooo pppppp","1000008"),

  ("nkhfcacarr@nittiru.in","jjjjjj kkkkkk","1000009"),
  ("jdjjahlester@nittiru.in","kkkkkk jjjjjj","1000009"),
  ("vbnmnefinley@nittiru.in","mmmmmmm nnnnnn","1000009"),
  ("ioooleburt1551@nittiru.in","oooooo pppppp","1000009")
  ;

  INSERT INTO center_incharge (email,name,college,phone,college_email)
VALUES
  ("centerincharge.nitjsr@nimcet.in","aaaaaa bbbbb","1000001","987654321","abc@nitjsr.in"),
  ("centerincharge.nitalah@nimcet.in","aaaaaa bbbbb","1000002","987654321","abc@nitalah.in"),
  ("centerincharge.nitbho@nimcet.in","aaaaaa bbbbb","1000003","987654321","abc@nitbho.in"),
  ("centerincharge.nitagar@nimcet.in","aaaaaa bbbbb","1000004","987654321","abc@nitagar.in"),
  ("centerincharge.nitkuru@nimcet.in","aaaaaa bbbbb","1000005","987654321","abc@nitkuru.in"),
  ("centerincharge.nitwara@nimcet.in","aaaaaa bbbbb","1000006","987654321","abc@nitwara.in"),
  ("centerincharge.nitrai@nimcet.in","aaaaaa bbbbb","1000007","987654321","abc@nitrai.in"),
  ("centerincharge.nitsura@nimcet.in","aaaaaa bbbbb","1000008","987654321","abc@nitsura.in"),
  ("centerincharge.nittiru@nimcet.in","aaaaaa bbbbb","1000009","987654321","abc@nittiru.in");

  INSERT INTO chairman (email,name,phone)
  VALUES
    ("chairman@nimcet.in","chairman name","987654321");

  INSERT INTO secretary (email,name,phone)
  VALUES
    ("secretary@nimcet.in","secretary name","987654321");

    INSERT INTO student_status (regno,applicationStatus,confirmationPending,verifying_officer,verifying_college)
    VALUES
      ("CCQ59RJX1001","pending",false,"rjhhvfhjg@nitjsr.in","1000001"),
      ("CCQ59RJX1002","pending",false,"sysdchgdmgb@nitjsr.in","1000001"),
      ("CCQ59RJX1003","pending",false,"nkhfcacarr@nitbho.in","1000003"),
      ("CCQ59RJX1004","pending",false,"nkhfcacarr@nitagar.in","1000004"),
      ("CCQ59RJX1005","pending",false,"nkhfcacarr@nitkuru.in","1000005"),
      ("CCQ59RJX1006","pending",false,"nkhfcacarr@nitwara.in","1000006"),
      ("CCQ59RJX1007","pending",false,"nkhfcacarr@nitrai.in","1000007"),
      ("CCQ59RJX1008","pending",false,"nkhfcacarr@nitsura.in","1000008"),
      ("CCQ59RJX1009","pending",false,"nkhfcacarr@nittiru.in","1000009"),
      ("CCQ59RJX1010","pending",false,"bhkdxvbvjj@nitalah.in","1000002");

      INSERT INTO logger(timestamp,ip,log,user) 
      VALUES
      (current_timestamp(),"1111:2222:3333:4444","this is test log","abc@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is a test log","abc@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is b test log","abc@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is c test log","abc@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is d test log","abc@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is f test log","abc@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is  ftest log","abc@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is sdctest log","abc@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is sdftest log","abc@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","thsfsfest log","abc@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","thsfdgt log","abc@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this isfsdt log","abc@test.com");

      INSERT INTO admin_session(timestamp,ip,log,email) 
      VALUES
      (current_timestamp(),"1111:2222:3333:4444","this is test log","admin@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is a test log","admin@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is b test log","admin@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is c test log","admin@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is d test log","admin@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is f test log","admin@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is  ftest log","admin@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is sdctest log","admin@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this is sdftest log","admin@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","thsfsfest log","admin@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","thsfdgt log","admin@test.com"),
      (current_timestamp(),"1111:2222:3333:4444","this isfsdt log","admin@test.com");

      INSERT INTO notices(timestamp,notice,user) 
      VALUES
      (current_timestamp(),"this is notice ","admin@test.com"),
      (current_timestamp(),"this isw notice og","admin@test.com"),
      (current_timestamp(),"this is notice og","admin@test.com"),
      (current_timestamp(),"this is dwnotice og","admin@test.com"),
      (current_timestamp(),"this is notice og","admin@test.com"),
      (current_timestamp(),"this is notice og","admin@test.com"),
      (current_timestamp(),"this is notice og","admin@test.com"),
      (current_timestamp(),"this is notice log","admin@test.com"),
      (current_timestamp(),"this is notice log","admin@test.com"),
      (current_timestamp(),"thsfsfedst log","admin@test.com"),
      (current_timestamp(),"thsfdgt log","admin@test.com"),
      (current_timestamp(),"this isfnodtice" ,"admin@test.com");
`;

  // const jsonData = [

  // ]

  let result = { success: false, message: "" };
  try {
    console.log("Adding Dummy data to Database...");
    await db.queryAsync(dummyDataQuery);
    console.log("Dummy Data Added Successfully!!");
    result.success = true;
  } catch (err) {
    console.log("Failed to Add Dummy Data to database!!");
    result = { success: false, message: err.message };
  }
  return result;
};
module.exports = FILL_DUMMY_DATA_TO_DATABASE;

//driver code

// const INITIALIZE_DATABASE = require("./helpers/dbinit");
// const FILL_DUMMY_DATA_TO_DATABASE = require("./test/dbDummyData");
// module.exports = async (req, res) => {
//   try {
//     const result = await INITIALIZE_DATABASE();
//     const result2 = await FILL_DUMMY_DATA_TO_DATABASE();
//     if (result.success && result2.success) res.send("success");
//     else res.send(`${result.message}   ${result2.message}`);
//   } catch (err) {
//     res.status(500).send({
//       status: false,
//       message: "Something went wrong",
//     });
//   }
// };
