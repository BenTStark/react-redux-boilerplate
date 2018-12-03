import { AppOperations } from "./operations";
import AuthService from "./auth.service";
import types from "./types";

// Mocking auth.service
jest.mock("./auth.service");
AuthService.loggedIn.mockReturnValueOnce(false).mockReturnValue(true);
AuthService.getProfile.mockReturnValue({ name: "John Doe" });
AuthService.getAccessToken.mockReturnValue("token");
AuthService.setToken.mockReturnValue();
AuthService.setProfile.mockReturnValue();

describe(">>> App - Operations Test", () => {
  it("+++ checkLogin - When not logged in", () => {
    return AppOperations.checkLogin().then(response => {
      expect(response).toBeDefined();
      expect(response.result).toEqual("");
    });
  });

  it("+++ checkLogin - When logged in", () => {
    return AppOperations.checkLogin().then(response => {
      expect(response).toBeDefined();
      expect(response.result).toEqual(types.LOGIN_SUCCESS);
    });
  });

  // Missing: Tests for AuthService.authentication()
  // Problem: Auth0Lock has to mocked somehow. But How?
});
