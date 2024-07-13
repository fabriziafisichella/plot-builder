"use client";

import { useState } from "react";
import styles from "./form.module.scss";
import { FormStateI } from "@/types/types";
import {
  GenerateContentCandidate,
  GoogleGenerativeAI,
} from "@google/generative-ai";
import { questionsList } from "@/lists/questionList";
import PlotBox from "../PlotBox/PlotBox";

const InitialFormState: FormStateI = {
  lenght: "Short Plot",
  pov: "Third person",
  protagonist: "",
  protagonistGender: "Female",
  antagonist: "",
  antagonistGender: "Female",
  genre: "Adventure",
  trope: "Anti-Hero",
};

export default function Form() {
  const [formState, setFormState] = useState<FormStateI>(InitialFormState);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isStory, setIsStory] = useState<boolean>(false);

  const handleChange = (key: keyof FormStateI, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const promptGenerator = async () => {
    setIsStory(true);
    setLoading(true);

    if (process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY
      );

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent(
        `Generate a ${formState.lenght} narrated in ${formState.pov}.
        The protagonist's name is ${formState.protagonist} and their gender is ${formState.protagonistGender}.
        The antagonist's name is ${formState.antagonist} and their gender is ${formState.antagonistGender}.
        The genre of the story is ${formState.genre} and the trope is ${formState.trope}.
        Always give me a title.`
      );

      const output = (
        result.response.candidates as GenerateContentCandidate[]
      )[0].content.parts[0].text;

      if (output) {
        setPrompt(output);
      }
      setLoading(false);
    }
  };


  return (
    <>
      {isStory ? (
        <>
          {loading ? <div className={styles.loader}></div> :
            <PlotBox story={prompt} />}
        </>
      ) : (
        <div>
          <div className={styles.formBox}>
            {questionsList.map((question, index) => (
              <div key={index} className={styles.questions}>
                <p>{question.question}</p>

                {(() => {
                  switch (question.type) {
                    case "choice":
                      return (
                        <div>
                          {question.answers.map((answer, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                handleChange(question.value, answer);
                              }}
                            >
                              {answer}
                            </button>
                          ))}

                          {(() => {
                            switch (question.value) {
                              case "lenght":
                                return <p>You choose: {formState.lenght}</p>;
                                break;
                              case "pov":
                                return <p>You choose: {formState.pov}</p>;
                                break;
                              default:
                                return null;
                            }
                          })()}
                        </div>
                      );
                      break;
                    case "selection":
                      return (
                        <select
                          className={styles.select}
                          defaultValue={question.answers[0]}
                          onChange={(e) => {
                            handleChange(question.value, e.target.value);
                          }}
                        >
                          {question.answers.map((answer, index) => (
                            <option key={index}>{answer}</option>
                          ))}
                        </select>
                      );
                      break;
                    case "text":
                      return (
                        <input
                          className={styles.input}
                          placeholder="Your text here..."
                          onChange={(e) => {
                            handleChange(question.value, e.target.value);
                          }}
                        />
                      );
                      break;
                    default:
                      return null;
                  }
                })()}
              </div>
            ))}
          </div>
          <div>
            <div className={styles.buttonContainer}>
              <button onClick={promptGenerator}>Generate plot</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
