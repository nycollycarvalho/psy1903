setwd("~/Desktop/psy1903/stats")

dir.create("data_cleaning")
dir.create("data_cleaning/output")
dir.create("data_cleaning/scripts")
dir.create("data_cleaning/data")

setwd("~/Desktop/psy1903/stats/data_cleaning/scripts/")

if (!require("pacman")) {install.packages("pacman"); require("pacman")}
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")

iat_data_Partcipant5 <- read.csv("~/Desktop/psy1903/osfstorage-archive/eco-emotions-2024-11-05-22-39-51.csv", header = TRUE, na.strings = "NA")

str(iat_data_Partcipant5)
summary(iat_data_Partcipant5)

iat_data2_Partcipant5 <- iat_data_Partcipant5 [iat_data_Partcipant5$expectedCategoryAsDisplayed == 'nature or serenity'|
                                                 iat_data_Partcipant5$expectedCategoryAsDisplayed == 'school or anxiety'|
                                                 iat_data_Partcipant5$expectedCategoryAsDisplayed == 'nature or anxiety'|
                                                 iat_data_Partcipant5$expectedCategoryAsDisplayed == 'school or serenity',
                                               c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]


str(iat_data2_Partcipant5)
summary(iat_data2_Partcipant5)

iat_data2_Partcipant5$expectedCategory <- as.factor(iat_data2_Partcipant5$expectedCategory)
iat_data2_Partcipant5$expectedCategoryAsDisplayed <- as.factor(iat_data2_Partcipant5$expectedCategoryAsDisplayed)
iat_data2_Partcipant5$leftCategory <- as.factor(iat_data2_Partcipant5$leftCategory)
iat_data2_Partcipant5$rightCategory <- as.factor(iat_data2_Partcipant5$rightCategory)

column_names <- c("expectedCategory, expectedCategoryAsDisplayed, leftCategory, rightCategory")


for (column_name in column_names) {
  iat_data2_Partcipant5[,column_name] <- as.factor(iat_data2_Partcipant5[,column_name])
}

iat_data2_Partcipant5$rt <- round(as.numeric(iat_data2_Partcipant5$rt), 0)

str(iat_data2_Partcipant5) 
summary(iat_data2_Partcipant5)

## Step 1: Specify your function with one argument, data
## Step 2: Filter out trials with rt < 300 ms (subset full data frame into new data frame called tmp)
## Step 3: Separate congruent and incongruent trials (subset tmp into two new data frames: congruent_trials and incongruent_trials) 
## Step 4: Calculate mean for congruent and mean for incongruent trials (mean_congruent, mean_incongruent)
## Step 5: Calculate standard deviation for all trials (pooled_sd) 
## Step 6: Calculate D-score
## Step 7: Return D-score

calculate_IAT_dscore <- function(data) {
  
  tmp <- data[data$rt >= 300, ]
  
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "nature or serenity" | tmp$expectedCategoryAsDisplayed == "school or anxiety", ]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "nature or anxiety" | tmp$expectedCategoryAsDisplayed == "school or serenity", ]
  
  mean_congruent <- mean(congruent_trials$rt, na.rm = TRUE)
  mean_incongruent <- mean(incongruent_trials$rt, na.rm = TRUE)
  
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  
  d_score <- (mean_incongruent - mean_congruent) / pooled_sd
  
  return(d_score)
}

## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* contain your raw participant csv data files and no other files.
## Create a list of all the files in that directory.
## Create an empty data frame called dScores that has two columns (IAT) and as many rows as you have data files (e.g., participants)
## Rename the default column names to something meaningful
## Initiate variable i to represent row numbers for each iteration, starting with 1
## Initiate a for loop that iterates across each file in files_list
# Use read.csv to read in your file as a temporary data frame called tmp
# Assign participant_ID as the basename of the file
# Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
# Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
# Remove the temporary data file tmp  
# Increase our row number variable i by one for the next iteration
## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory

directory_path <- "~/Desktop/psy1903/osfstorage-archive"

files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

d_scores <- data.frame(matrix(nrow = length(files_list), ncol = 2))

colnames(d_scores) <- c("participant_ID", "d_scores")

i = 1

for (files in files_list) {
  
  tmp <- read.csv(files, header = TRUE, na.strings = "NA")  
  
  tmp$rt <- round(as.numeric(tmp$rt), 0)
  
  participant_ID <- tools::file_path_sans_ext(basename(files))  
  
  d_scores[i, "participant_ID"] <- participant_ID
  d_scores[i, "d_scores"] <- calculate_IAT_dscore(tmp)
  
  rm(tmp)
  
  i <- i + 1
}

write.csv(d_scores, "~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)





