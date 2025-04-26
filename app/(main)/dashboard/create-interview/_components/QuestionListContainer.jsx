import React from "react";

function QuestionListContainer({ questionList }) {
  return (
    <div>
      {" "}
      <h2 className="font-bold text-lg mb-4">
        Generated Interview Questions:-
      </h2>
      <div className="mt-4 p-8 space-y-4 bg-white rounded-xl">
        {questionList.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-white shadow-sm dark:bg-gray-800"
          >
            <h3 className="font-semibold">
              {index + 1}. {item.question}
            </h3>
            <p className="text-sm text-primary dark:text-gray-300">
              Type: {item.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionListContainer;
