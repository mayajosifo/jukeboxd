# jukeboxd
# **Description**
Welcome to Jukeboxd! Jukeboxd is an album review site / social media hybrid
where you can both write your own reviews on albums and interact with the reviews of your friends!

**On Jukeboxd, you can:**
1. Post your own reviews
2. View your reviews from newest to oldest
3. Search for your albums by its title or artist
4. View the reviews and average rating of an album
5. Search for other users and their reviews
6. Follow other users
7. View your followers and following lists

**How to Run Jukeboxd**

**Prerequisites**:
1. Node.js and npm must be installed

**Setting Up Firebase/Firstore Connection**
Hi! Allow me to walk you through how to setup the connection to Firebase/Firestore


For React:

    Initial Step:
        You will need to install firebase with the following terminal command:

            npm install firebase

    API Credentials:
        For security purposes, the .env file with the API credentials was not included in the Git repo. However, we have
        provided a separate file called "creds.txt" with the neccessary information in it.
        Please create a .env (simply named .env) file in the root directory of jukeboxd-app and copy and paste the data from creds.txt into it.
   
**In the root directory of the project, there is a shell script called setup.sh that:**
1. Checks the prerequisites
2. Clones the github repository
3. Navigates to the necessary directory
4. Installs program dependencies
5. Prompts you to enter your firebase information
6. Creates a custom .env file with your firebase information
7. Starts up the app.

To use our project, simply run ./setup.sh



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
John Reinker
Maya Josifovska
Garratt Army
Andrew Bistras
Leah George

**Happy Reviewing!**
 
