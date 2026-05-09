import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./layouts/navbar";
import i18n from "./i18n/i18n";
import { store } from "./store/store";

jest.mock("axios", () => ({
  __esModule: true,
  default: {
    create: () => ({
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
      },
    }),
  },
}));

const renderNavbar = () =>
  render(
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    </I18nextProvider>
  );

beforeEach(() => {
  localStorage.clear();
  i18n.changeLanguage("en");
  window.scrollTo = jest.fn();
});

afterEach(() => {
  localStorage.clear();
});

test("closes the mobile menu after selecting a navigation link", () => {
  renderNavbar();

  const menuButton = screen.getByRole("button", { name: /open menu/i });
  fireEvent.click(menuButton);
  expect(menuButton).toHaveAttribute("aria-expanded", "true");

  const aboutLinks = screen.getAllByText(/about us/i);
  fireEvent.click(aboutLinks[aboutLinks.length - 1]);
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("shows dashboard actions for authenticated mobile users", () => {
  localStorage.setItem("accessToken", "starter-task-token");
  renderNavbar();

  fireEvent.click(screen.getByRole("button", { name: /open menu/i }));

  expect(screen.getAllByText(/go to dashboard/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/settings/i).length).toBeGreaterThan(0);
});
