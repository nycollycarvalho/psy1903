#### (1) Setup initial directory structure -------------------------------------

## Start by setting your working directory to your psy1903 folder. Replace "~/Desktop/" with the correct path to your psy1903 directory:
setwd("~/Desktop/psy1903/")

## Create a new parent directory called "stats" where we will be doing all of our R work:
dir.create("stats/")

## Create a new directory called "rIntro" for today's exercises:
dir.create("stats/rIntro")
## Create new subdirectories "data", "scripts", & "output" for today's exercises:
dir.create("stats/rIntro/data")
dir.create("stats/rIntro/scripts")
dir.create("stats/rIntro/output")

## Set working directory to the rIntro/scripts parent directory, which will be our home base for today:
setwd("~/Desktop/psy1903/stats/rIntro/scripts")

## Save this script as R_introduction.R within your scripts directory (you can just use command+S or File → Save As)s