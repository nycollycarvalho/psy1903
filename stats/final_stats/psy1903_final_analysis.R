setwd("~/Desktop/psy1903/stats")

dir.create("final_stats")

setwd("~/Desktop/psy1903/stats/final_stats")

if (!require("pacman")) {install.packages("pacman"); require("pacman")}
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")