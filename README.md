Polling System API
"API where anyone can create questions with options and also add votes to it"

Features
- Create a question (you can add as many questions as you want)
- Add options to a question
- Add a vote to an option of question
- Delete a question
- Delete an option 
- View a question with it’s options and all the votes given to it




Routes
- /questions/create (To create a question)
- /questions/:id/options/create (To add options to a specific question)
- /questions/:id/delete (To delete a question)
- /questions/:id/options/:ido/delete (To delete an option)
- /questions/:id/options/:ido/add_vote (To increment the count of votes)
- /questions/:id (To view a question and it’s options)