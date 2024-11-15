setwd("~/Desktop/psy1903/stats")
dir.create('data_cleaning')
dir.create('data_cleaning/output')
dir.create('data_cleaning/scripts')
sdir.create('data_cleaning/data')

setwd("~/Desktop/psy1903/stats/data_cleaning/scripts")

if (!require("pacman")) {install.packages("pacman"); require("pacman")}  # First install and load in pacman to R
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot","jsonlite") 

iat_data_Partcipant5 <- read.csv("~/Desktop/psy1903/osfstorage-archive/eco-emotions-2024-11-05-22-39-51.csv", header = TRUE, stringsAsFactors = FALSE, sep = ",", na.strings = "NA")

str(iat_data_Partcipant5) 
summary(iat_data_Partcipant5)

s