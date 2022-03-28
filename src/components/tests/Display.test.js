import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Display from "./../Display";
import mockFetchShow from "../../api/fetchShow";

jest.mock("../../api/fetchShow");

const testShow = {
  name: "test show",
  summary: "test summary",
  seasons: [
    {
      id: 0,
      name: "Season 1",
      episodes: [],
    },
    {
      id: 1,
      name: "Season 2",
      episodes: [],
    },
  ],
};

test("renders without errors with no props", () => {
  render(<Display />);
});

test("renders Show component when the button is clicked ", async () => {
  mockFetchShow.mockResolvedValueOnce(testShow);
  render(<Display />);
  const button = screen.queryByText("Press to Get Show Data");
  fireEvent.click(button);
  const show = await screen.findByTestId("show-container");
  expect(show).toBeInTheDocument();
});

test("renders show season options matching your data when the button is clicked", async () => {
  mockFetchShow.mockResolvedValueOnce(testShow);
  render(<Display />);
  const button = screen.queryByText("Press to Get Show Data");
  fireEvent.click(button);
  await waitFor(() => {
    const seasonOptions = screen.queryAllByTestId("season-option");
    expect(seasonOptions).toHaveLength(2);
  });
});

test("When fetch button is pressed, displayFunc is called", async () => {
  mockFetchShow.mockResolvedValueOnce(testShow);
  const displayFunc = jest.fn();
  render(<Display displayFunc={displayFunc} />);
  const button = screen.queryByText("Press to Get Show Data");
  fireEvent.click(button);
  await waitFor(() => {
    expect(displayFunc).toHaveBeenCalled();
  });
});
