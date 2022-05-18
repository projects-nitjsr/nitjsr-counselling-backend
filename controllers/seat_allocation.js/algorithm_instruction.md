Allocate

Step 1 - Sort the meritList by Rank
Step 2 - Loop through the meritList 
Step 3 - We will check the preference list of the student in two conditions 
         a. if the withdrawn value for the student in the meritList table is false
         b. if the seatFroze value for the student in the meritList table is false
Step 4 - We Insert the student directly in seatMatrix only if
         a. prefered seat is available
         b. no seat has been chosen yet by the student
         On Inserting, we change the chosenClgId for the student in the meritList table
         We then fetch the new mertList table
Step 5 - Else if the seat is available but another seat has already been allocated to the Student
         We first withdraw the previous seat using withdrawn_seat_algo
         Then we insert the student in the new seat
         On Inserting, we change the chosenClgId for the student in the meritList table
         We then fetch the new mertList table





Freeze

Step 1 - Call the API to update the seatFroze value for the student in the meritList table to true




Withdrawn

Step 1 - Call the API to update the withdrawn value for the student in the meritList table to true
Step 2 - Call the API to update the seatMatrix 




After Each Round Allocate the Seats Again (Float)

Step 1 - Allocate the seats again, seats would change due to changes in the seatFroze, withDrawn   and chosenClgId value of the Student data in the MeritList table