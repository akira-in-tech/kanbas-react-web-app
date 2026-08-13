import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import App from "./App";

vi.mock("./Kanbas/Account/client", async () => {
  const actual = await vi.importActual<typeof import("./Kanbas/Account/client")>(
    "./Kanbas/Account/client"
  );
  return {
    ...actual,
    profile: vi.fn().mockRejectedValue(new Error("unauthenticated")),
  };
});

test("redirects an unauthenticated visitor to the sign in screen", async () => {
  render(<App />);
  const heading = await screen.findByRole("heading", { name: /sign in/i });
  expect(heading).toBeInTheDocument();
});
