import { create, enforce, test, warn, only } from "vest";
import "vest/enforce/email";

export const loginSuite = create("form", data => {
  test("username", "Username is required.", () => {
    enforce(data.username).isNotEmpty();
  });

  test("password", "Password is required.", () => {
    enforce(data.password).isNotEmpty();
  });
});

export const registerSuite = create("form", (data, currentField) => {
  only(currentField);

  test("username", "Username is required.", () => {
    enforce(data.username).isNotEmpty();
  });

  test("email", "Email is required.", () => {
    enforce(data.email).isNotEmpty();
  });

  test("email", "Email must be in correct format.", () => {
    enforce(data.email).isEmail();
  });

  test("password", "Password is required.", () => {
    enforce(data.password).isNotEmpty();
  });

  test("password", "Password must be 8 characters or longer.", () => {
    warn();
    if (!data.password) return;
    enforce(data.password).longerThanOrEquals(8);
  });

  if (data.password) {
    test("passwordConfirm", "Passwords do not match!", () => {
      enforce(data.passwordConfirm).equals(data.password);
    });
  }
});

export const editEmailSuite = create("form", data => {
  test("email", "Email must be in correct format", () => {
    enforce(data.newEmail).isEmail();
  });
});

export const addChara = create("form", data => {
  test("name", "Name is required", () => {
    enforce(data.name).isNotEmpty();
  });

  test("content", "Content must not be empty", () => {
    enforce(data.content).isNotEmpty();
  });
});