import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Home, { GET_WILDERS } from './Home';

function renderHome(mocks?: any) {
  render(
    <MockedProvider mocks={[mocks]}>
      <Home />
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );
}

describe("Home", () => {
  describe("before wilders have been fetched", () => {
    it("renders a loading indicator", () => {
      const mockGetWildersEmpty = {
        request: {
          query: GET_WILDERS,
        },
        result: {
          data: {
            wilders: [],
          },
        },
      };
      renderHome(mockGetWildersEmpty);

      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
  describe("after wilders list have been fetched", () => {
    describe("when wilders list empty", () => {
      const mockGetWildersEmpty = {
        request: {
          query: GET_WILDERS,
        },
        result: {
          data: {
            wilders: [],
          },
        },
      };

      it("renders specific message", async () => {
        renderHome(mockGetWildersEmpty);
        await waitFor(() => {
          expect(
            screen.getByText("Aucun wilder à afficher.")
          ).toBeInTheDocument();
        });
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
      });
    });

    describe("when wilders list has data", () => {
      const mockGetWildersNotEmpty = {
        request: {
          query: GET_WILDERS,
        },
        result: {
          data: {
            wilders: [
              {
                id: "1234",
                firstName: "Jean",
                lastName: "Wilder",
                skills: [{ id: "1234", skillName: "React" }],
              },
              {
                id: "1234567",
                firstName: "Jeanne",
                lastName: "Wilder",
                skills: [{ id: "1234", skillName: "React" }],
              },
            ],
          },
        },
      };

      it("renders wilders list", async () => {
        renderHome(mockGetWildersNotEmpty);

        await waitFor(() => {
          expect(screen.getByTestId("wilder-list")).toBeInTheDocument();
        });
        expect(screen.queryByRole("status")).not.toBeInTheDocument();
        expect(screen.getAllByTestId("wilder-list-element")).toHaveLength(2);
      });
    });
  });
});
