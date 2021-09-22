import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./views/home";

test("renders learn react link", () => {
  render(<Home />);
  const linkElement = screen.getByText(/ADD/);
  expect(linkElement).toBeInTheDocument();
});
