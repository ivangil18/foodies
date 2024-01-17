"use client";

import { useFormStatus } from "react-dom";

function MealSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit meal"}{" "}
    </button>
  );
}

export default MealSubmitButton;
