"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { useState } from "react";
import { useLIFFContext } from "./context/LiffProvider";

export default function Home() {
  const { liff, liffError, userName, userId } = useLIFFContext();

  const questions = [
    "Do you take prescribed medication regularly?",
    "Have you ever experienced an allergic reaction to a medicine?",
    "Do you consult a doctor before taking new medicine?",
    "Have you been hospitalized due to a medical condition?",
    "Do you follow dosage instructions strictly?",
  ];

  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(null);

  const handleChange = (index: any, value: any) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    const newScore = answers.reduce(
      (acc, answer) => acc + (answer === "yes" ? 10 : 0),
      0
    );
    sendScoreToChat(newScore);
    setScore(newScore);
  };

  const sendScoreToChat = async (score: any) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || "", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `User ${userName} (ID: ${userId}) Based on your Medicine Quiz scored ${score} We recommend you Aspirin`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert("We recommend you Aspirin");
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error sending message to the channel", error);
    }
  };
  const allAnswered = answers.every((answer) => answer !== null);

  return (
    <section className="py-36">
      <div className="container flex items-center justify-center">
        <Card className="py-4 lg:w-3/4 xl:w-1/2">
          <CardBody className="overflow-visible py-2">
            <h2 className="text-lg font-bold uppercase text-center mb-4">
              Medicine Quiz
            </h2>
            {questions.map((question, index) => (
              <div key={index} className="mb-4">
                <p className="text-md font-semibold mb-2">{question}</p>
                <label className="mr-4">
                  <input
                    className="mr-1"
                    type="radio"
                    name={`question-${index}`}
                    value="yes"
                    onChange={() => handleChange(index, "yes")}
                  />
                  Yes
                </label>
                <label>
                  <input
                    className="mr-1"
                    type="radio"
                    name={`question-${index}`}
                    value="no"
                    onChange={() => handleChange(index, "no")}
                  />
                  No
                </label>
              </div>
            ))}
            <Button
              color="primary"
              onPress={calculateScore}
              className="mt-4"
              isDisabled={!allAnswered}
            >
              Submit
            </Button>
            {score !== null && (
              <div className="mt-6 p-4 bg-gray-200 rounded-lg text-center text-lg font-bold">
                Based on your Medicine Quiz Score {score} We recommend you
                Aspirin
              </div>
            )}
            {liff && <p className="mt-4 text-center">LIFF init succeeded.</p>}
            {liffError && (
              <>
                <p className="mt-4 text-center">LIFF init failed.</p>
                <p>
                  <code>{liffError}</code>
                </p>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
