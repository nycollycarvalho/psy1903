#### Load Packages & Set Working Directory ------

setwd("~/Desktop/psy1903/stats")

dir.create("final_stats")

setwd("~/Desktop/psy1903/stats/final_stats")

if (!require("pacman")) {install.packages("pacman"); require("pacman")}
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")


#### D-score Function --------------------------------

calculate_IAT_dscore <- function(data) {
  
  tmp <- data[data$rt > 300 & data$rt < 5000,]
  
  tmp <- tmp[tmp$correct == TRUE,]
  
  congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "nature or serenity" | tmp$expectedCategoryAsDisplayed == "school or anxiety", ]
  incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "nature or anxiety" | tmp$expectedCategoryAsDisplayed == "school or serenity", ]
  
  congruent_mean <- mean(congruent_trials$rt, na.rm = TRUE)
  incongruent_mean <- mean(incongruent_trials$rt, na.rm = TRUE)
  
  pooled_sd <- sd(tmp$rt, na.rm = TRUE)
  
  d_score <- (incongruent_mean - congruent_mean) / pooled_sd
  
  return(d_score)
}

#### Questionnaire Scoring Function ---------------

score_questionnaire <- function(data){
  
  json_data <- data[data$trialType == "questionnaire", "response"]
  
  questionnaire <- fromJSON(json_data)
  
  questionnaire <- as.data.frame(questionnaire)
  
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  
  score <- rowMeans(questionnaire, na.rm = TRUE)
  
  return(score) 
  
}

#### For Loop ------------------------------------------

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

#### ANOVA -------------------------------------------

anova_iat <- aov(d_score ~ whichprime, data = d_scores) 
summary(anova_iat)

#### T-Test ---------------------------------------------

TukeyHSD(anova_iat)

#### Correlation ---------------------------------------

cor.test(d_scores$d_score, d_scores$questionnaire)

#### Base R Histogram -------------------------------

png("~/Desktop/psy1903/stats/data_cleaning/output/Fig1_baseR_histogram.png", width = 600, height = 500)

hist(d_scores$d_score,
     main = "Distribution of D-Scores",
     xlab = "D-Scores",
     ylab = "Frequency",
     col = "darkseagreen")

dev.off()  

#### ggplot Histogram --------------------------------

png("~/Desktop/psy1903/stats/data_cleaning/output/Fig2_ggplot_histogram.png", width = 600, height = 500)

ggplot(d_scores, aes(x = d_score)) +
  geom_histogram(
    binwidth = 0.1, 
    color = "black", 
    fill = "darkseagreen") +
  labs(
    title = "Distribution of D-Scores",  
    x = "D-Scores",                      
    y = "Frequency"                     
  ) +
  theme_minimal()

dev.off()  

#### ggplot Histogram by Prime ---------------------

png("~/Desktop/psy1903/stats/data_cleaning/output/Fig3_ggplot_histogram_by_prime.png", width = 600, height = 500)

ggplot(d_scores, aes(x = d_score)) +
  geom_histogram(
    binwidth = 0.1, 
    color = "black", 
    fill = "skyblue") +
  labs(
    title = "Distribution of D-Scores",  
    x = "D-Scores",                      
    y = "Frequency"                     
  ) +
  theme_classic() +
  facet_wrap(~whichprime)

dev.off()  

#### ggplot Box Plot ----------------------------------

png("~/Desktop/psy1903/stats/data_cleaning/output/Fig4_ggplot_boxplot.png", width = 600, height = 500)

ggplot(d_scores, aes(x = whichprime, y = d_score, fill = whichprime)) +
  geom_boxplot() +  
  labs(
    title = "Effect of Prime on D-Scores", 
    x = "Prime Condition",                 
    y = "D-Scores"                         
  ) +
  theme_classic() +                       
  theme(legend.position = "none") +        
  scale_x_discrete(labels = c(          
    "neutral" = "Neutral",
    "school-anxiety" = "School Anxiety",
    "climate-anxiety" = "Climate Anxiety"
  )) 

dev.off()  

#### ggplot Scatter Plot -------------------------------

png("~/Desktop/psy1903/stats/data_cleaning/output/Fig5_ggplot_scatter.png", width = 600, height = 500)

ggplot(d_scores, aes(x = questionnaire, y = d_score)) +
  geom_point() +  
  geom_smooth(method = "lm") + 
  labs(
    title = "Correlation Between Questionnaire and D-Scores",  
    x = "Questionnaire",                                    
    y = "D-Scores"                                          
  ) +
  theme_classic() 

dev.off() 

#### ggplot Custom Theme ---------------------------

theme_nature <- function() {
  theme(
    plot.title = element_text(
      face = "bold", size = 16, color = "forestgreen", family = "serif"
    ),
    axis.title = element_text(
      size = 14, color = "darkgreen", family = "serif"
    ),
    axis.text = element_text(
      size = 12, color = "forestgreen", family = "serif"
    ),
    panel.background = element_rect(fill = "honeydew"),
    panel.grid.major = element_line(color = "palegreen")
  )  
}

png("~/Desktop/psy1903/stats/data_cleaning/output/Fig6_ggplot_scatter.png", width = 600, height = 500)

ggplot(d_scores, aes(x = questionnaire, y = d_score)) +
  geom_point() +  
  geom_smooth(method = "lm") + 
  labs(
    title = "Correlation Between Questionnaire and D-Scores",  
    x = "Questionnaire",                                    
    y = "D-Scores"                                          
  ) +
  theme_nature() 

dev.off() 

png("~/Desktop/psy1903/stats/data_cleaning/output/Fig7_ggplot_boxplot.png", width = 600, height = 500)

ggplot(d_scores, aes(x = whichprime, y = d_score, fill = whichprime)) +
  geom_boxplot() +  
  labs(
    title = "Effect of Prime on D-Scores", 
    x = "Prime Condition",                 
    y = "D-Scores"                         
  ) +
  theme_nature() +                       
  theme(legend.position = "none") +        
  scale_x_discrete(labels = c(          
    "neutral" = "Neutral",
    "school-anxiety" = "School Anxiety",
    "climate-anxiety" = "Climate Anxiety"
  )) 

dev.off()  

