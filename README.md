# Click & Match

<img width="1114" alt="Screen Shot 2022-11-28 at 13 26 59" src="https://user-images.githubusercontent.com/111317260/204289275-3dd0a848-9455-4b74-9e09-6a0b8ce608ec.png">



# About 
This is a memory game website , Its aim is to test ur speed on how quick you can match each card , The cards have colors on the facing down side which you can click to see what color it is , The aim is to get the lowest number of attempts and lowest timescore. you can play with ur friends to test who has the best memory.

# Design 
 * Color Scheme done in order of importanace across the site.
   
 
![Screen Shot 2022-11-28 at 02 31 22](https://user-images.githubusercontent.com/111317260/204178932-cf5e9c19-897c-4bd8-b340-98e47262a9c2.png)
 
 * HTML 
   * HTML5 was used to create the structure of the site.

 * CSS3 
   * CSS3 was used to add styling to the site.
 
 * JavaScript (js) 
   * was used to create functionality , responsive across the Game. Backend progamming that allows you to implement complex features on web pages   
 * Typograhpy 
   * The main font used was sans-serif


 * Imagery 
   * Images i used for the cards colors are screenshotted from a colour pallet and edited to fit correctly into the cards
   
 * Wireframes 
   * The Wireframes were created using justinmind however, the layout and design was fallowed very loosely and changed during the mockup stage.

  * Responsive 
   * The overall site is responsive across all of the pages which was held by usinf media queries.
   
   * Home-page


![Screen Shot 2022-11-22 at 16 13 05](https://user-images.githubusercontent.com/111317260/203364936-273b7205-c2dc-4096-893c-6cd960b0664b.png)

   * Main-Game-Area


![Screen Shot 2022-11-22 at 16 13 15](https://user-images.githubusercontent.com/111317260/203364950-319550f5-b3fd-44f2-93a7-dfe6caee7f62.png)

   * High-Score-Leaderboard

![Screen Shot 2022-11-28 at 02 33 31](https://user-images.githubusercontent.com/111317260/204179170-f12e5940-8bad-464f-883c-3a615ed825a2.png)





   * Instructions Page / Username
     * This is where the user first gets a look of the instructions of how to play the game and where to create there username.
   
<img width="604" alt="Screen Shot 2022-11-28 at 01 35 56" src="https://user-images.githubusercontent.com/111317260/204174262-7bac916f-963f-4df8-9613-5913713a72d6.png">
   * Mobile Deisgn 

<img width="204" alt="Screen Shot 2022-11-28 at 01 36 34" src="https://user-images.githubusercontent.com/111317260/204174328-fab705d8-62b7-4132-9f05-39382060220c.png">

   * Main-Game-Area
      * This is were the user will enter after submitting there Username and will start game were they will test there memory skills.
    
 <img width="1073" alt="Screen Shot 2022-11-28 at 01 36 59" src="https://user-images.githubusercontent.com/111317260/204174414-86af1afd-2124-446b-93e4-b73b5ce0d351.png">
   * Mobile Design
    
 <img width="240" alt="Screen Shot 2022-11-28 at 01 39 41" src="https://user-images.githubusercontent.com/111317260/204174458-d4cc64cb-ef08-40cb-8cd4-f695516e3625.png">

   * High-Score Leaderboard page 
      * This is were the user can view there score they recieved from playing the Click & match card game , They can also compare there scores if they retry the game where they have the option to create there username again if its New user or keep the same username and keep the scoreboard going to see who can ge the best results.
 <img width="1393" alt="Screen Shot 2022-11-28 at 01 34 07" src="https://user-images.githubusercontent.com/111317260/204174561-4265fcd8-779a-47c7-8a91-d55bf2b7ef7c.png">
 
   * Mobile Design
    
<img width="189" alt="Screen Shot 2022-11-28 at 01 34 51" src="https://user-images.githubusercontent.com/111317260/204174624-4a7329c3-a57d-4b18-aa6f-407dc03b6d8e.png">

# Features Guidance 
* Instruction page the user first sees is very basic its telling the user about how to play the game and how to begin by entering there username.

* The user must fill in the Usernamer correctly befor entering the game if the user puts in not enough letters/ or adds numbers the computer lets them know this by displaying feeback colored in red guiding the user to correctly make a valid Username

* when the User enters a valid username they enter the Game-Area where they are shown 16 cards, 8 pairs , where there objective is to match them by clicking the cards to see what color is shown underneat the first card will only match with the second card that is chosen.
 
* There goal is to get the lowest number of Attempts & timer.

* Once the user is completed the results are pushed to the Highscore leaderboard 
 
* when the User submits there most recent score it'll be hightlighted in yellow , if the user1 0r user2 had a score before this it will be non-highted scores will be set graded by least number of attemps and time., 
 
* Image of Highscore Leaderboard
<img width="1335" alt="Screen Shot 2022-11-28 at 15 15 58" src="https://user-images.githubusercontent.com/111317260/204313850-5a7f523d-b60e-4319-bea6-cdc29a09511e.png">



<img width="309" alt="Screen Shot 2022-11-28 at 15 12 31" src="https://user-images.githubusercontent.com/111317260/204313308-f308326e-4c6a-4a1c-8094-2952d0bd1c60.png">


 # Github
 * Github was used to store the project's code after being pushed from Git.
 * Gitpod terminal was used to commit my code using Git and push it to Github.
 * Git was used for version control through the Gitpod terminal.
 
 # Functionality Testing
 # HTML5 Validator
 * [Results-Pass
](https://validator.w3.org/nu/#textarea) 
 
 
 # CSS3 Validator
 *  [Results
](https://jigsaw.w3.org/css-validator/validator)
 * Value Error : width Too many values or values are not recognized : fill-available Without this i cannot cain the card Img in its container would like to get feedback on this. 
 * Warning , Imported style sheets are not checked in direct input and file upload modes

 # JSHINT Validator 
 * [Results
](https://jshint.com/) 
* The following info messages being returned in the javascript validator are simply saying that our syntax (=>) is used for ES6 Javscript.
* I am using vanilla javscript in this project so its outputting the info messages above.
The same can be said about the spread operator info message.
This is not an error, its simply a message about our javascript version/syntax. It can be ignored.# Lighthouse Test on Inspect

* Deskstop Devices
<img width="767" alt="Screen Shot 2022-11-28 at 01 56 42" src="https://user-images.githubusercontent.com/111317260/204175835-4108b90b-1a0f-486c-9e3f-265698b58512.png">
* Mobile Devices 
<img width="801" alt="Screen Shot 2022-11-28 at 01 58 14" src="https://user-images.githubusercontent.com/111317260/204175844-87278fb0-54dc-4413-b1ed-a42ff6a5472e.png">

# Webpagetest.com

* [results
](https://www.webpagetest.org/result/221128_AiDcF9_1DE/)

# Test.js Unit testing 

* This was used to test the code using the inspect element where you can see in the console if it has passed or not. 
 * Refresh brower , Click inspect , click Console , You can view results of the test.js file 
* Screenshot of test.js
* ![Screen Shot 2022-11-28 at 14 19 16](https://user-images.githubusercontent.com/111317260/204300721-f2d9f900-1d6a-40a1-94ef-0ee779a01f00.png)


# User Testing 
 * My family and friends tested it across there laptop and mobile devices which they enjoyed and didnt have and issues. 

# Deployment 
 
 * This section should describe the process you went through to deploy the project to a hosting platform (e.g. GitHub)

 * The site was deployed to GitHub pages. The steps to deploy are as follows: In the GitHub repository, navigate to the Settings tab From the source section drop-down menu, select the Master Branch Once the master branch has been selected, the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment. 
 * Link to deployed site - [GAME LINK
](https://mattyol.github.io/Memory-game-Click-Match-Project-2/) 
 # Local Deployment 
 * In order to make a local copy of this project, you can clone it. In your IDE Terminal, type the following command to clone my repository:
  git clone Alternatively, if using Gitpod, you can click below to create your own workspace using this repository.
  Open in Gitpod
 # Known Bugs 
 * Currently no bugs as i am aware, Open to feedback if found.
 
 # Features Left to Implement
  * The cards when displayed on mobile devices shows a white box around the hand icon which i would like to come back and change this or implement a new icon.
            <img width="63" alt="Screen Shot 2022-11-28 at 14 06 17" src="https://user-images.githubusercontent.com/111317260/204297478-1f0e79a1-f10b-430a-b46e-d231c5fa8464.png">

 
 # Credits 
 
  # Code 
  * I used[ Flexbox.tricks ](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)to make the website more easier and to make it more responsive i used a guide from csstrick.com and flexbox to make this possible 
  * I learned the code from [Memory Game Tutorial](https://www.youtube.com/watch?v=dqqxkrKhfS4) and used this in my project to undestand how the javascript process took place.
  * I used hover effect[ w3schools ](https://www.w3schools.com/cssref/sel_hover.php)to make the hover effect on the buttons on the game.
  * The Font faimly was inspired by the Love running walk through Project.
  *[Stackoverflow.com ](https://stackoverflow.com/)was used as guidance trough out the project to help with some Javascript. 
  *[ Css.tricks ](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)was also used as guidance through the project
  * love-Running Read-me template was used to help with developing of this Read-me file. 
