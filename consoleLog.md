## Last modification at a3smecanique.fr 

# November 20, 2020
commit 61b9e82384d78a63c4eee6660406045c3b567f3b (HEAD -> update-style-css, origin/update-style-css)
Author: D-orlando84 <orlando.ducamp1@gmail.com>
Date:   Thu Nov 19 17:19:00 2020 +0100

    update style CSS

commit 61b9e82384d78a63c4eee6660406045c3b567f3b (HEAD -> update-style-css, origin/update-style-css)
Author: D-orlando84 <orlando.ducamp1@gmail.com>
Date:   Thu Nov 19 17:19:00 2020 +0100

    update style CSS

## what was the problem with the appearance of the site?
The problems we had with the appearance were partly the menu as well as the company logo.

## How to resolve this problem about the appearance of th site ?
To solve this problem, we have first of all modified our page where the menu is stored. We added different CSS classes and thus modified the code so that the contact element is detached from the menu and assigned to a separate CSS class. 
In the CSS part we have modified the class assigned to contact in order to shift the contact menu to the right and apply a black rectangle on top of it. We have created a second CSS class to be able to insert a second rectangle which is superimposed under our contact rectangle.



# November 18, 2020
commit aab240afe7ef6e1e00d586f33a22c68bbccfbd28 (origin/master, origin/HEAD, master)
Merge: 3941e7c 30c151b
Author: D-orlando84 <71486442+D-orlando84@users.noreply.github.com>
Date:   Wed Nov 18 10:21:28 2020 +0100

    Merge pull request #19 from sportelli/callback_to_await

    update Callback to await

commit 30c151be3d981f86391504bfa5e923d8a4feff69 (callback_to_await)
Author: D-orlando84 <orlando.ducamp1@gmail.com>
Date:   Wed Nov 18 09:32:13 2020 +0100

    update 2 callback to await

## What was the problem with this version? 
The old version of the site used the callback technique because it was the only way for us to communicate with the database. 

## how to resolve changes between callback and async?
To carry out all our changes we have switched almost all our functions to asynchronous, to be able to have a return from an asynchronous function we have used await which is a promise. If this promise is good then it can return us what we wanted in the function or an error.The advantage of this technique is that the code becomes shorter but also much more pleasant to read for a developer.



# November 05, 2020 
commit 765462d7cc97f99b7402311f9045dbfa956fd9d7 (HEAD -> mongodb_refresh, origin/mongodb_refresh)
Author: D-orlando84 <71486442+D-orlando84@users.noreply.github.com>
Date:   Wed Nov 4 18:59:45 2020 +0100

    Update PagesDAO.ts

commit 5aa3351c3ee2cd83467fb4908a7fab0ee7d5e045
Author: D-orlando84 <71486442+D-orlando84@users.noreply.github.com>
Date:   Wed Nov 4 18:57:23 2020 +0100

    Update App.ts

## What is the problem about this version ?
our problem was that we couldn't display were database update on the website. It was mandatory to restart the server for the website update

## how to resolve this ?
in pagesDAO we have added different functions that will allow us to load the data of the pages when we click on one of the pages.
    these functions are very useful for the maintenance of the website because if you need execute modification in the database, these update will be done by itself, it's not necessary to restart the server
