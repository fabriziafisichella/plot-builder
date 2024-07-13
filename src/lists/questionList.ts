import { FormStateI } from "@/types/types";

const lists = {
  genresList: [
    "Adventure",
    "Classic Literature",
    "Contemporary Fiction",
    "Detective Fiction",
    "Dystopian",
    "Fantasy",
    "Fiction",
    "Gothic",
    "Historical Fiction",
    "Horror",
    "Literary Fiction",
    "Mystery",
    "Post-Apocalyptic",
    "Psychological Thriller",
    "Romance",
    "Science Fiction",
    "Superhero Fiction",
    "Thriller",
    "Urban Fantasy",
    "Young Adult",
  ],
  gendersList: ["Female", "Male", "Non-binary", "Transgender"],
  tropesList: [
    "Anti-Hero",
    "Call to Adventure",
    "Character Arc",
    "Chekhov's Gun",
    "Cliché",
    "Deus ex Machina",
    "Foil",
    "Friends to Lovers",
    "Love Triangle",
    "Plot Twist",
    "Red Herring",
    "Rags to Riches",
    "Tragic Hero",
    "Unrequited Love",
    "Unreliable Narrator",
    "Villain Protagonist",
    "Willing Suspension of Disbelief",
    "The Hero's Journey",
    "Forbidden Love",
    "Second Chance Romance",
    "Opposites Attract",
    "Slow Burn Romance",
    "Enemies to Lovers",
    "Fate vs. Free Will",
  ],
};

export const questionsList: {
  question: string;
  answers: string[];
  type: "choice" | "selection" | "text";
  value: keyof FormStateI;
}[] = [
  {
    question: "Select plot lenght:",
    answers: ["Short plot", "Long plot"],
    type: "choice",
    value: "lenght",
  },
  {
    question: "Select point of view:",
    answers: ["First person", "Third person"],
    type: "choice",
    value: "pov",
  },
  {
    question: "Type your protagonist's name:",
    answers: [],
    type: "text",
    value: "protagonist",
  },
  {
    question: "Choose your protagonist's gender:",
    answers: lists.gendersList,
    type: "selection",
    value: "protagonistGender",
  },
  {
    question: "Type your antagonist's name:",
    answers: [],
    type: "text",
    value: "antagonist",
  },
  {
    question: "Choose your antagonist's gender:",
    answers: lists.gendersList,
    type: "selection",
    value: "antagonistGender",
  },
  {
    question: "Choose your plot's genre:",
    answers: lists.genresList,
    type: "selection",
    value: "genre",
  },
  {
    question: "Choose your favourite trope:",
    answers: lists.tropesList,
    type: "selection",
    value: "trope",
  },
];
