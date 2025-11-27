import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FormHelperText } from "@mui/material";
import { useRegisterMutation } from "../../../features/api/authApi";
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

interface LoginProps {
  isSignInComponent: boolean;
  setIsSignInComponent: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<LoginProps> = ({
  isSignInComponent,
  setIsSignInComponent,
}) => {
  //username
  const [usernameError, setUsernameError] = React.useState<boolean>(false);
  const [usernameErrorMessage, setUsernameErrorMessage] =
    React.useState<string>("");
  //email
  const [emailError, setEmailError] = React.useState<boolean>(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState<string>("");
  //Password
  const [passwordError, setPasswordError] = React.useState<boolean>(false);
  const [passwordErrorMessage, setPasswordErrorMessage] =
    React.useState<string>("");
  const [showPassword, setShowPassword] = React.useState(false);
  //confirm Password
  const [confirmPasswordError, setConfirmPasswordError] =
    React.useState<boolean>(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    React.useState<string>("");
  const [showConfirmPassword, setConfirmShowPassword] = React.useState(false);

  //Register API
  const [register, { isLoading, isError, error }] = useRegisterMutation();
  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await register({ username, email, password }).unwrap();
      console.log("Registration response -", response);
      setIsSignInComponent(false); //display the login page
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setConfirmShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const validateInputsAndCreateAccount = async () => {
    const usernameInput = document.getElementById(
      "username"
    ) as HTMLInputElement | null;
    const emailInput = document.getElementById(
      "email"
    ) as HTMLInputElement | null;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement | null;
    const confirmPasswordInput = document.getElementById(
      "confirmPassword"
    ) as HTMLInputElement | null;

    // Ensure values are always strings (use empty string fallback)
    const username: string = usernameInput?.value.trim() || "";
    const email: string = emailInput?.value.trim() || "";
    const password: string = passwordInput?.value.trim() || "";
    const confirmPassword: string = confirmPasswordInput?.value.trim() || "";
    console.log(email, password, confirmPassword);
    let isValid = true;

    // Username validation
    if (!username || username.length === 0) {
      setUsernameError(true);
      setUsernameErrorMessage("Please enter username.");
      isValid = false;
    } else {
      setUsernameError(false);
      setUsernameErrorMessage("");
    }
    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    // Password validation
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    // Confirm password validation
    if (!confirmPassword || confirmPassword.length < 6) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage(
        "Confirm password must be at least 6 characters long."
      );
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }

    if (isValid) {
      handleRegister(username, email, password);
    }
  };

  return (
    <Card variant="outlined">
      <Typography
        component="h1"
        variant="h4"
        sx={{
          width: "100%",
          fontSize: "clamp(2rem, 10vw, 2.15rem)",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        Create an account
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <FormControl>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              fontSize: "13px",
            }}
          >
            <span>
              Already have an account?{" "}
              <a
                href="#"
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setIsSignInComponent(false);
                }}
              >
                Login
              </a>
            </span>
            {/* <span>
                            Not have an account?{" "}
                            <a href="#" style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { setIsSignInComponent(true) }}>
                                Create account
                            </a>
                        </span> */}
          </div>
        </FormControl>
        <FormControl style={{ marginTop: "10px" }}>
          <FormLabel className="custom-label" htmlFor="email">
            Username
          </FormLabel>
          <TextField
            required
            fullWidth
            id="username"
            placeholder=""
            name="username"
            autoComplete="email"
            variant="outlined"
            onChange={() => {
              setUsernameErrorMessage("");
              setUsernameError(false);
            }}
            error={usernameError}
            helperText={usernameErrorMessage || " "}
            color={usernameError ? "error" : "primary"}
            InputProps={{ className: "custom-input" }} // Add class for input field
            FormHelperTextProps={{ className: "custom-helper-text" }} // Add class for helper text
          />
        </FormControl>
        <FormControl>
          <FormLabel className="custom-label" htmlFor="email">
            Email
          </FormLabel>
          <TextField
            required
            fullWidth
            id="email"
            placeholder="your@email.com"
            name="email"
            autoComplete="email"
            variant="outlined"
            onChange={() => {
              setEmailErrorMessage("");
              setEmailError(false);
            }}
            error={emailError}
            helperText={emailErrorMessage || " "}
            color={emailError ? "error" : "primary"}
            InputProps={{ className: "custom-input" }} // Add class for input field
            FormHelperTextProps={{ className: "custom-helper-text" }} // Add class for helper text
          />
        </FormControl>
        <FormControl>
          <FormLabel className="custom-label" htmlFor="password">
            Password
          </FormLabel>
          <TextField
            required
            fullWidth
            name="password"
            placeholder="••••••"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            error={passwordError}
            color={passwordError ? "error" : "primary"}
            variant="outlined" // Ensures outlined styling
            onChange={() => {
              setPasswordErrorMessage("");
              setPasswordError(false);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              className: "custom-input-password", // Custom styling for input field
            }}
          />
          <FormHelperText className="custom-helper-text">
            {passwordErrorMessage || " "}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel className="custom-label" htmlFor="password">
            Confirm Password
          </FormLabel>
          <TextField
            required
            fullWidth
            name="confirmPassword"
            placeholder="••••••"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="new-password"
            error={confirmPasswordError}
            color={confirmPasswordError ? "error" : "primary"}
            variant="outlined" // Ensures outlined styling
            onChange={() => {
              setConfirmPasswordErrorMessage("");
              setConfirmPasswordError(false);
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showConfirmPassword
                        ? "hide the confirm password"
                        : "display the confirm password"
                    }
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                    size="small"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
              className: "custom-input-password", // Custom styling for input field
            }}
          />
          <FormHelperText className="custom-helper-text">
            {confirmPasswordErrorMessage || " "}
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={validateInputsAndCreateAccount}
          style={{ marginTop: "10px" }}
        >
          Create account
        </Button>
      </Box>
    </Card>
  );
};

export default SignUp;
