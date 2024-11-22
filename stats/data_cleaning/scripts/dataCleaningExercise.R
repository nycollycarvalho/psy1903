setwd("~/Desktop/psy1903/stats")

dir.create("data_cleaning")
dir.create("data_cleaning/output")
dir.create("data_cleaning/scripts")
dir.create("data_cleaning/data")

setwd("~/Desktop/psy1903/stats/data_cleaning/scripts/")

if (!require("pacman")) {install.packages("pacman"); require("pacman")}
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")

iat_data_Partcipant5 <- read.csv("~/Desktop/psy1903/osfstorage-archive/eco-emotions-2024-11-05-22-39-51.csv", header = TRUE, na.strings = "NA")

#str(iat_data_Partcipant5)
#summary(iat_data_Partcipant5)

iat_data2_Partcipant5 <- iat_data_Partcipant5 [iat_data_Partcipant5$expectedCategoryAsDisplayed == 'nature or serenity'|
                                                 iat_data_Partcipant5$expectedCategoryAsDisplayed == 'school or anxiety'|
                                                 iat_data_Partcipant5$expectedCategoryAsDisplayed == 'nature or anxiety'|
                                                 iat_data_Partcipant5$expectedCategoryAsDisplayed == 'school or serenity',
                                               c("trial_index", "rt", "response", "word", "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]


#str(iat_data2_Partcipant5)
#summary(iat_data2_Partcipant5)

iat_data2_Partcipant5$expectedCategory <- as.factor(iat_data2_Partcipant5$expectedCategory)
iat_data2_Partcipant5$expectedCategoryAsDisplayed <- as.factor(iat_data2_Partcipant5$expectedCategoryAsDisplayed)
iat_data2_Partcipant5$leftCategory <- as.factor(iat_data2_Partcipant5$leftCategory)
iat_data2_Partcipant5$rightCategory <- as.factor(iat_data2_Partcipant5$rightCategory)

column_names <- c("expectedCategory, expectedCategoryAsDisplayed, leftCategory, rightCategory")


for (column_name in column_names) {
  iat_data2_Partcipant5[,column_name] <- as.factor(iat_data2_Partcipant5[,column_name])
}

iat_data2_Partcipant5$rt <- round(as.numeric(iat_data2_Partcipant5$rt), 0)

#str(iat_data2_Partcipant5) 
#summary(iat_data2_Partcipant5)

## Step 1: Specify your function with one argument, data
## Step 2: Filter out trials with rt < 300 ms (subset full data frame into new data frame called tmp)
## Step 3: Separate congruent and incongruent trials (subset tmp into two new data frames: congruent_trials and incongruent_trials) 
## Step 4: Calculate mean for congruent and mean for incongruent trials (mean_congruent, mean_incongruent)
## Step 5: Calculate standard deviation for all trials (pooled_sd) 
## Step 6: Calculate D-score
## Step 7: Return D-score

calculate_IAT_dscore <- function(data) {
  
  tmp <- data[data$rt > 300 & data$rt < 5000,]
  
  tmp <- tmp[tmp$correct == TRUE,]
  
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "nature or serenity" | tmp$expectedCategoryAsDisplayed == "school or anxiety", ]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "nature or anxiety" | tmp$expectedCategoryAsDisplayed == "school or serenity", ]
  
  mean_congruent <- mean(congruent_trials$rt, na.rm = TRUE)
  mean_incongruent <- mean(incongruent_trials$rt, na.rm = TRUE)

  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  
  d_score <- (mean_incongruent - mean_congruent) / pooled_sd
  
  return(d_score)
}


directory_path <- "~/Desktop/psy1903/osfstorage-archive"

files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

d_scores <- data.frame(matrix(nrow = length(files_list), ncol = 2))

colnames(d_scores) <- c("participant_ID", "d_scores")

i = 1

for (files in files_list) {
  
  tmp <- read.csv(files, header = TRUE, na.strings = "NA")  
  
  tmp$rt <- round(as.numeric(tmp$rt), 0)
  
  tmp$correct <- as.logical(tmp$correct)
  
  tmp$expectedCategory <- as.factor(tmp$expectedCategory)
  tmp$expectedCategoryAsDisplayed <- as.factor(tmp$expectedCategoryAsDisplayed)
  tmp$leftCategory <- as.factor(tmp$leftCategory)
  tmp$rightCategory <- as.factor(tmp$rightCategory)
  
#str(tmp) use when checking if as.factor/as.logical is working 
  
  participant_ID <- tools::file_path_sans_ext(basename(files)) 
  prime_label <- tmp[tmp$trialType == "prime", "whichPrime"]
  
  d_scores[i, "participant_ID"] <- participant_ID
  d_scores[i, "whichprime"] <- prime_label
  d_scores[i, "d_scores"] <- calculate_IAT_dscore(tmp)
  d_scores[i, "questionnaire"] <- score_questionnaire(tmp)
  
  
  rm(tmp)
  
  i <- i + 1
}

d_scores$whichprime <- as.factor(d_scores$whichprime)
d_scores$d_score <- as.numeric(d_scores$d_score)
d_scores$questionnaire <- as.numeric(d_scores$questionnaire)
d_scores$participant_ID <- as.character(d_scores$participant_ID)

str(d_scores)

write.csv(d_scores, "~/Desktop/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

directory_path <- "~/Desktop/psy1903/osfstorage-archive"

files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Initiate function called score_questionnaire that accepts a single argument called `data`. Within this function...

score_questionnaire <- function(data){
 
   ## Extract questionnaire data cell
  
  json_data <- data[data$trialType == "questionnaire", "response"]
  
  ## Use fromJSON to convert from JSON to data frame
  
  questionnaire <- fromJSON(json_data)

  questionnaire <- as.data.frame(questionnaire)
  
  ## Convert to numeric
  
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  
  ## Calculate & return questionnaire score (mean)
  
  score <- rowMeans(questionnaire, na.rm = TRUE)
  
  return(score) 

}










