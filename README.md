# About ThirdWheel

ThirdWheel is a small scale Social Media web application mimicking the likes of X, Threads, etc.

## Technologies used

-   ReactJS
-   NextJS 13.4.12
-   Clerk (Authentication)
-   MongoDB (Database Management)
-   Uploadthing
-   Zod (Type-Schema Validation)
-   Tailwind CSS (styling)
-   ShadCN UI (UI components like forms)

# Features:

## Authentication

This app uses clerk (https://clerk.com) for it's authentication and User management. Users can login directly through 3rd Party accounts like Google, Github, etc.

## Posting Wheels (or Threads/Tweets)

As of now, there is no feature to Like, Comment, Share, or Repost a Post.

### Post UI:

-   Post UI has the mention of User Info like:
    -   Profile Picture
    -   Name of the user
    -   Username
    -   Verification
    -   Time the post was made (in Indian Standard Time)

## Profile and Homepage

-   The users have their own profile, containing usual social media profile info like username, name and bio.
-   The profile also has a tab which displays all the posts they have made in order. Easy to access user-specific posts that dissapear in the main page.

## Search Tab

-   It displays the list of users (except oneself) and gives an option to view them.

## Community (buggy and under development)

-   Peope can create communities through their clerk interface, and is integrated into the website using webhooks. Community uses the free version of Clerk's organization feature, hence, only three users are allowed in the community.
-   Community admin can create, delete communities and add, remove users. Users are invited through their mail ID's.
-   Communities have community-specific posts that can be accessed only through the members.

`NOTE: Community Profile as of now does not function as intended and can break the website.`
