import React from "react";
import { render, screen } from "@testing-library/react";
import CreateCampaigns from "./views/create";

test("renders learn react link", () => {
  render(<CreateCampaigns Open={true} handleClose={() => {}} />);
  const linkElement = screen.getByText(/Id/);
  expect(linkElement).toBeInTheDocument();
});
