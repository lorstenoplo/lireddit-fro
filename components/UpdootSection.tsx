import React from "react";
import { useVoteMutation } from "../src/generated/graphql";

const UpdootSection = ({ p }: any) => {
  const [, vote] = useVoteMutation();
  return (
    <div className="flex flex-col items-center justify-center mr-6">
      <button
        onClick={() => {
          if (p.voteStatus === 1) {
            return;
          }
          vote({
            postId: p.id,
            value: 1,
          });
        }}
        style={{ background: p.voteStatus === 1 ? "#269b26" : undefined }}
        className="bg-gray-100 p-2.5 rounded-md focus:ring-2 focus:ring-blue-400 mb-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ color: p.voteStatus === 1 ? "white" : undefined }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      {p.points}
      <button
        onClick={() => {
          if (p.voteStatus === -1) {
            return;
          }
          vote({
            postId: p.id,
            value: -1,
          });
        }}
        style={{ background: p.voteStatus === -1 ? "#e72a2a" : undefined }}
        className="bg-gray-100 p-2.5 rounded-md focus:ring-2 focus:ring-blue-400 mt-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ color: p.voteStatus === -1 ? "white" : undefined }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

export default UpdootSection;
