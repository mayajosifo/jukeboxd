# jukeboxd
## **Description**
Welcome to Jukeboxd! Jukeboxd is an album review site / social media hybrid where you can both write your own reviews on albums and interact with the reviews of your friends!

On Jukeboxd, you can:
1. Post your own reviews
2. View your reviews from newest to oldest
3. Search for albums by their title or artist
4. View the reviews and average rating of an album
5. Search for other users and their reviews
6. Follow other users
7. View your followers and following lists

## **How to Run Jukeboxd**

**Prerequisites:**
- Node.js and npm must be installed on your machine.

**Setting Up Firebase/Firestore Connection**
To setup the connection to Firebase/Firestore, follow these steps:

1. Install Firebase by running the following command in your terminal:

    ```
    npm install firebase
    ```

2. For security purposes, the `.env` file with the API credentials was not included in the Git repo. However, we have provided a separate file called "creds.txt" with the necessary information in it. Please create a `.env` (simply named `.env`) file in the root directory of `jukeboxd-app` and copy and paste the data from `creds.txt` into it.

**Manual Setup Instructions:**

1. Open your terminal.

3. Check if Node.js is installed:

    ```
    node -v
    ```

   If it's not installed, please install it from the [Node.js website](https://nodejs.org/).

4. Check if npm is installed:

    ```
    npm -v
    ```

   If it's not installed, it should have been installed with Node.js. If it's missing, reinstall Node.js.

5. Clone the Jukeboxd repository by running:

    ```
    git clone git@github.com:mayajosifo/jukeboxd.git my-react-app
    ```

   Replace `my-react-app` with the name of the folder where you want to clone the repository.

6. Change to the directory of the cloned repository:

    ```
    cd my-react-app
    ```

7. If there is a `jukeboxd-app` directory within, navigate into it:

    ```
    cd jukeboxd-app
    ```

   If this directory does not exist, check that you have cloned the correct repository and that the repository structure has not changed.

8. Install the application dependencies:

    ```
    npm install
    ```
    
9. Create .env file in root directory of jukeboxd-app and copy and paste the contents from "creds.txt" into it, which we emailed directly to the TA for security purposes.
    

10. Now, everything should be set up. You can start the application by running:

    ```
    npm start
    ```

This will start your application and typically open a browser window displaying the Jukeboxd site.

**Structure of our Database**

    users (Collection)
    └── usersId (Document)
        ├── userName, email, dateJoined, followingList, followersList, likedAlbumsList (Fields)
        └── userReviews (SubCollection)
            └── userReviewsId (Document)

    albums (Collection)
    └── albumsId (Document)
        ├── albumName, artistName, coverUrl, releaseYear (Fields)
        └── albumReviews (SubCollection)
            └── albumReviewsId (Document)

    reviews (Collection)
    └── reviewId (Document)
        └── usersId, albumsId, rating, reviewText, reviewDate (Fields)


    There are currently 2837 "albums" in the firestore database.
    I say "albums" because some of them are technically not studio albums, but instead are greatest hits compilations, EPs, single releases, etc.
    These albums come from the following 98 artists...
        The Beatles
        Steely Dan
        Pink Floyd
        Coldplay
        Queen
        Metallica
        Michael Jackson
        Adele
        Foo Fighters
        Linkin Park
        Daft Punk
        Eminem
        Muse
        David Bowie
        The Prodigy
        U2
        Gorillaz
        Evanescence
        Katy Perry
        2Pac
        Red Hot Chili Peppers
        Nirvana
        Lindsey Stirling
        ABBA
        a-ha
        The Cranberries
        Radiohead
        Bruce Springsteen
        Rammstein
        The xx
        Nightwish
        Taylor Swift
        Dire Straits
        Bruno Mars
        Faithless
        The Chemical Brothers
        Rihanna
        Moby
        Avril Lavigne
        Pearl Jam
        Death
        Nine Inch Nails
        Sade
        Iron Maiden
        Air
        Die Ärzte
        blink-182
        Björk
        Jamiroquai
        Armin van Buuren
        Elvis Presley
        2NE1
        Robbie Williams
        Dream Theater
        Blur
        Green Day
        Korn
        Britney Spears
        Supertramp
        Mike Oldfield
        Megadeth
        Imagine Dragons
        Die Antwoord
        Limp Bizkit
        Skrillex
        Alanis Morissette
        Arcade Fire
        Marilyn Manson
        Guns N' Roses
        Tiësto
        Jean Michel Jarre
        Placebo
        Jay-Z
        Fatboy Slim
        Aaliyah
        Dead Can Dance
        Lady Gaga
        Black Sabbath
        Avicii
        deadmau5
        Slayer
        Oasis
        Of Monsters and Men
        Arctic Monkeys
        Madonna
        Motörhead
        Led Zeppelin
        Fleetwood Mac
        The Corrs
        The Black Keys
        David Guetta
        Girls' Generation
        Ghost
        The Rolling Stones
        Aerosmith
        Pentatonix
        Peter Gabriel
        LMFAO


**Authors and Contributors:**
John Reinker,
Maya Josifovska,
Garratt Army,
Andrew Bistras,
Leah George,

**Happy Reviewing!**
 
