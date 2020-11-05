## last modification at a3s.mecanique
commit 765462d7cc97f99b7402311f9045dbfa956fd9d7 (HEAD -> mongodb_refresh, origin/mongodb_refresh)
Author: D-orlando84 <71486442+D-orlando84@users.noreply.github.com>
Date:   Wed Nov 4 18:59:45 2020 +0100

    Update PagesDAO.ts

commit 5aa3351c3ee2cd83467fb4908a7fab0ee7d5e045
Author: D-orlando84 <71486442+D-orlando84@users.noreply.github.com>
Date:   Wed Nov 4 18:57:23 2020 +0100

    Update App.ts

## What is the problem about last version ?
our problem was that we couldn't display were database update on the website. It was mandatory to restart the server for the website update

## how to resolve this ?
in pagesDAO we have added different functions that will allow us to load the data of the pages when we click on one of the pages.
    these functions are very adventages for the maintenance in the web site because if  you need executate modification in the database, these update will be done by itself,       it's not necessary to restart the server   
