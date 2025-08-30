import { render, screen, fireEvent } from "@testing-library/react";
import PostComments from "./index";

describe("PostComments Component", () => {
  test("should add two comments correctly", () => {
    render(<PostComments />);

    const textareaElement = screen.getByTestId(
      "comment-input"
    ) as HTMLTextAreaElement;
    const buttonElement = screen.getByTestId("submit-button");
    const formElement = screen.getByTestId("comment-form");

    fireEvent.change(textareaElement, {
      target: { value: "Primeiro comentário de teste" },
    });
    fireEvent.submit(formElement);

    expect(
      screen.getByText("Primeiro comentário de teste")
    ).toBeInTheDocument();
    expect(textareaElement.value).toBe("");

    fireEvent.change(textareaElement, {
      target: { value: "Segundo comentário de teste" },
    });
    fireEvent.submit(formElement);

    expect(
      screen.getByText("Primeiro comentário de teste")
    ).toBeInTheDocument();
    expect(screen.getByText("Segundo comentário de teste")).toBeInTheDocument();

    const commentItems = screen.getAllByTestId("comment-item");
    expect(commentItems).toHaveLength(2);
  });

  test("should clear textarea after submitting comment", () => {
    render(<PostComments />);

    const textareaElement = screen.getByTestId(
      "comment-input"
    ) as HTMLTextAreaElement;
    const formElement = screen.getByTestId("comment-form");

    fireEvent.change(textareaElement, {
      target: { value: "Comentário teste" },
    });
    fireEvent.submit(formElement);

    expect(textareaElement.value).toBe("");
  });
});
