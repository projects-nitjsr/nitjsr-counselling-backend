Structure of SeatMatrix
 [
    { 
        clgId:"1",
        seatByCategory: [
            {
              studentIdQueue: {"1","2","3"}
            },
            {
              studentIdQueue: {"4","5","6"}
            },
            {
              studentIdQueue: {"7","8","9"}
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

    Note - In SeatByCategoryList the a queue of studentIds are maintained where
    the index of the list specifies the Category
    for example the queue present in the zeroth index of the List specifies the General Category queue
    the queue present in the first index - Obc
    second index - SC and so on
    
]  



  // Structure of Merit List
   // { studentId: "1", category: 0, rank: 1, seatFroze = true, chosenInstituteId="1" }, 
    // { studentId: "2", category: 0, rank: 2, seatFroze = false, chosenInstituteId=NULL },
    // { studentId: "3", category: 1, rank: 4, seatFroze = false, chosenInstituteId="2"},
    // { studentId: "4", category: 2, rank: 3, seatFroze = true, chosenInstituteId="1" } 




// Index of the List is Student_Id
Structure of Preference List

[
   {
      clgIdQueue: {"1","2","3"}
   },

    {
      clgIdQueue: {"5","6","7"}
   },

]



