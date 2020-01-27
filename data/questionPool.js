/*
  For now this is just a javascript file that happens to return a json formatted object
  This could easily contain a call to a service that returns questions from an api
*/
const questionPool = {
  "questions": [
    { "correctAnswers": ["Hats"], "choices": ["Belts", "Shoes", "Shirts", "Hats"], "questionType": "multiple-choice", "question": "What does a milliner make and sell?" }
    , { "correctAnswers": ["A Tight Rope"], "choices": ["A Tight Rope", "Broken Glass", "The Moon", "Balls"], "questionType": "multiple-choice", "question": "What does a funambulist walk on?" }
    , { "correctAnswers": ["Watch"], "choices": ["Money", "Keys", "Notebook", "Watch"], "questionType": "multiple-choice", "question": "In past times, what would a gentleman keep in his fob pocket?" }
    , { "correctAnswers": ["True"], "choices": ["True", "False"], "questionType": "true-false", "question": "Gumbo is a stew that originated in Louisiana." }
    , { "correctAnswers": ["False"], "choices": ["False", "True"], "questionType": "true-false", "question": "The vapor produced by e-cigarettes is actually water." }
    , { "correctAnswers": ["Yale University"], "choices": ["Yale University", "Columbia University", "Harvard University", "Princeton University"], "questionType": "multiple-choice", "question": "Which of the following Ivy League universities has its official motto in Hebrew as well as in Latin?" }
    , { "correctAnswers": ["Rock Band"], "choices": ["Dance Dance Revolution", "Beast Mode Mania", "Rock Band", "Guitar Hero Live"], "questionType": "multiple-choice", "question": "Which one of the following rhythm games was made by Harmonix?" }
    , { "correctAnswers": ["True"], "choices": ["False", "True"], "questionType": "true-false", "question": "Furby was released in 1998." }
    , { "correctAnswers": ["Licorice"], "choices": ["Licorice", "Bubblegum", "Chocolate", "Lollipop"], "questionType": "multiple-choice", "question": "Red Vines is a brand of what type of candy?" }
    , { "correctAnswers": ["Kip"], "choices": ["Ruble", "Kip", "Konra", "Dollar"], "questionType": "multiple-choice", "question": "What is the unit of currency in Laos?" }
    , { "correctAnswers": ["False"], "choices": ["False", "True"], "questionType": "true-false", "question": "A scientific study on peanuts in bars found traces of over 100 unique specimens of urine." }
    , { "correctAnswers": ["Niagara Mohawk Building"], "choices": ["Niagara Mohawk Building", "Taipei 101", "Westendstrasse 1", "One Detroit Center"], "questionType": "multiple-choice", "question": "Which of the following buildings is example of a structure primarily built in the Art Deco architectural style?" }
    , { "correctAnswers": ["OCBC"], "choices": ["OCBC", "HSBC", "Standard Chartered", "Bank of China"], "questionType": "multiple-choice", "question": "Which of these banks are NOT authorized to issue currency notes in Hong Kong?" }
    , { "correctAnswers": ["Fiat"], "choices": ["Alfa Romeo", "Fiat", "Maserati", "Ferrari"], "questionType": "multiple-choice", "question": "Which Italian automobile manufacturer gained majority control of U.S. automobile manufacturer Chrysler in 2011?" }
    , { "correctAnswers": ["Pink"], "choices": ["Yellow", "Blue", "Pink", "Green"], "questionType": "multiple-choice", "question": "Which of these colours is NOT featured in the logo for Google?" }
    , { "correctAnswers": ["False"], "choices": ["False", "True"], "questionType": "true-false", "question": "The Sun rises from the North." }
    , { "correctAnswers": ["True"], "choices": ["True", "False"], "questionType": "true-false", "question": "The color orange is named after the fruit." }
    , { "correctAnswers": ["True"], "choices": ["False", "True"], "questionType": "true-false", "question": "When you cry in space, your tears stick to your face." }
    , { "correctAnswers": ["Southeast"], "choices": ["Southwest", "Southeast", "Northwest", "Northeast"], "questionType": "multiple-choice", "question": "What direction does the Statue of Liberty face?" }
    , { "correctAnswers": ["Kentucky Fried Chicken"], "choices": ["Kentucky Fresh Cheese", "Kiwi Food Cut", "Kentucky Fried Chicken", "Kibbled Freaky Cow"], "questionType": "multiple-choice", "question": "What do the letters of the fast food chain KFC stand for?" }
    , { "correctAnswers": ["2004"], "choices": ["2000", "2006", "2001", "2004"], "questionType": "multiple-choice", "question": "What year was the RoboSapien toy robot released?" }
    , { "correctAnswers": ["Bank of Italy"], "choices": ["Bank of Charlotte", "Bank of Italy", "Bank of Long Island", "Bank of Pennsylvania"], "questionType": "multiple-choice", "question": "What was Bank of America originally established as?" }
    , { "correctAnswers": ["Hewlett-Packard"], "choices": ["Asus", "Toshiba", "Hewlett-Packard", "Dell"], "questionType": "multiple-choice", "question": "Computer manufacturer Compaq was acquired for $25 billion dollars in 2002 by which company?" }
    , { "correctAnswers": ["Sal Khan"], "choices": ["Kitt Khan", "Ben Khan", "Adel Khan", "Sal Khan"], "questionType": "multiple-choice", "question": "Who founded the Khan Academy?" }
    , { "correctAnswers": ["South America"], "choices": ["Europe", "South America", "Hawaii", "Asia"], "questionType": "multiple-choice", "question": "Where did the pineapple plant originate?" }
    , { "correctAnswers": ["Brazil"], "choices": ["South Korea", "Brazil", "China", "United States of America"], "questionType": "multiple-choice", "question": "Which country, not including Japan, has the most people of Japanese decent?" }
    , { "correctAnswers": ["Finding shapes in clouds"], "choices": ["Swimming in freezing water", "Sleeping with your eyes open", "Finding shapes in clouds", "Breaking glass with your voice"], "questionType": "multiple-choice", "question": "Nephelococcygia is the practice of doing what?" }
    , { "correctAnswers": ["Belgium"], "choices": ["Belgium", "Netherlands", "USA", "France"], "questionType": "multiple-choice", "question": "Which country has the most Trappist breweries?" }
    , { "correctAnswers": ["Złoty"], "choices": ["Ruble", "Krone", "Euro", "Złoty"], "questionType": "multiple-choice", "question": "What is the currency of Poland?" }
    , { "correctAnswers": ["Dogs"], "choices": ["Flying", "Birds", "Germs", "Dogs"], "questionType": "multiple-choice", "question": "What is Cynophobia the fear of?" }
    , { "correctAnswers": ["Trees"], "choices": ["Vegetables", "Flowers", "Grains", "Trees"], "questionType": "multiple-choice", "question": "If you planted the seeds of Quercus robur, what would grow?" }
    , { "correctAnswers": ["True"], "choices": ["True", "False"], "questionType": "true-false", "question": "Slovakia is a member of European Union." }
    , { "correctAnswers": ["red"], "questionType": "text-based", "question": "What is Kevin's favorite color?" }
    , { "correctAnswers": ["coffee", "americano", "espresso", "cappuccino", "latte"], "questionType": "text-based", "question": "Name a major type of coffee drink." }
    , { "correctAnswers": ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"], "questionType": "text-based", "question": "Name a day of the week." }
    , { "correctAnswers": ["rain", "snow", "sleet", "hail", "mixed"], "questionType": "text-based", "question": "Name one type of precipitation." }
    , { "correctAnswers": ["Nashville"], "questionType": "text-based", "question": "What is the capital of Tennessee?" }
  ]
}
