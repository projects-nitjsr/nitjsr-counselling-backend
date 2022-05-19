Structure of SeatMatrix
 [
    { 
        clgId:"1",
        seatByCategory: [
            {
              studentIdList: ["1","2","3"]
            },
            {
              studentIdList: ["4","5","6"]
            },
            {
              studentIdList: ["7","8","9"]
            },
        ]


    },
    { 
        clgId:"2",
        seatByCategory: [
            {
              studentIdList: ["1","2","3"]
            },
            {
              studentIdList: ["4","5","6"]
            },
            {
              studentIdList: ["4","5","6"]
            },
        ]


    },  

    Note - In SeatByCategoryList the a list of studentIds are maintained where
    the index of the list specifies the Category
    for example the list present in the zeroth index of the List specifies the General Category list
    the list present in the first index - Obc
    second index - SC and so on
    
]  



  // Structure of Merit List
  // [
    // { studentId: "1", category: 0, rank: 1, seatFroze = true, chosenInstituteId="1",
     withDrawn =false }, 
    // { studentId: "2", category: 0, rank: 2, seatFroze = false, chosenInstituteId=NULL,withDrawn = true },
    // { studentId: "3", category: 1, rank: 4, seatFroze = false, chosenInstituteId="2", withDrawn =false},
    // { studentId: "4", category: 2, rank: 3, seatFroze = true, chosenInstituteId="1", withDrawn =false }
  //]  




// Index of the List is Student_Id
Structure of Preference List

[
   {
      clgIdList: ["1","2","3"]
   },

    {
      clgIdList: ["5","6","7"]
   },

]




Structure of College List
[
  {
    clgId: "2",
    categoryCount : [200, 100, 300]
  }

]

Note : In categoryCount list the index of the List stands for the Category 
for example, 0 - General
             1 - Obc
             2 - SC
             3 - St
             The 0th Position of the List will Contain the Number of General Seats
             The 1st Position of the List will Contain the Number of OBC Seats
             and so on...

