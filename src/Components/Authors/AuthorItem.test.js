import React from "react";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import AuthorItem from "./AuthorItem";
import FormatDate from "../../Helpers/FormatDate";

jest.mock("../../Helpers/FormatDate");

const mockAuthor = {
  login: "testuser",
  name: "Test User",
  avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  lastIssue_at: "2023-10-01T00:00:00Z",
  issues: 5,
  followers: 10,
  bio: "This is a test bio",
  repositories: [
    { id: 1, name: "repo1", organization: { login: "tes-repo1" } },
    { id: 2, name: "repo2", organization: { login: "test-repo2" } },
  ],
};

describe("AuthorItem Component", () => {
  beforeEach(() => {
    FormatDate.mockReturnValue("October 1, 2023");
  });

  it("renders without crashing", () => {
    const router = createMemoryRouter(
      [{ path: "/", element: <AuthorItem author={mockAuthor} /> }],
      { initialEntries: ["/"] }
    );

    render(<RouterProvider router={router} />);
  });

  it("displays the author's name", () => {
    const { getByText } = render(
      <RouterProvider
        router={createMemoryRouter([{ path: "/", element: <AuthorItem author={mockAuthor} /> }])}
      />
    );
    expect(getByText("Test User")).toBeInTheDocument();
  });

  it("displays the author's avatar", () => {
    const { getByAltText } = render(
      <RouterProvider
        router={createMemoryRouter([{ path: "/", element: <AuthorItem author={mockAuthor} /> }])}
      />
    );
    const avatar = getByAltText("testuser");
    expect(avatar).toHaveAttribute(
      "src",
      "https://avatars.githubusercontent.com/u/1?v=4&size=48"
    );
  });

  it("displays the correct number of issues and followers", () => {
    const { getByText } = render(
      <RouterProvider
        router={createMemoryRouter([{ path: "/", element: <AuthorItem author={mockAuthor} /> }])}
      />
    );
    expect(getByText("5 vagas publicadas")).toBeInTheDocument();
    expect(getByText("10 seguidores")).toBeInTheDocument();
  });

  it("displays the formatted last issue date", () => {
    const { getByText } = render(
      <RouterProvider
        router={createMemoryRouter([{ path: "/", element: <AuthorItem author={mockAuthor} /> }])}
      />
    );
    expect(getByText("Última vaga em: October 1, 2023")).toBeInTheDocument();
  });

  it("displays the author's bio", () => {
    const { getByText } = render(
      <RouterProvider
        router={createMemoryRouter([{ path: "/", element: <AuthorItem author={mockAuthor} /> }])}
      />
    );
    expect(getByText("This is a test bio")).toBeInTheDocument();
  });

  it("displays the GitHub profile link", () => {
    const { getByText } = render(
      <RouterProvider
        router={createMemoryRouter([{ path: "/", element: <AuthorItem author={mockAuthor} /> }])}
      />
    );
    const profileLink = getByText("Ver perfil no GitHub");
    expect(profileLink).toHaveAttribute("href", "https://github.com/testuser");
  });
});
