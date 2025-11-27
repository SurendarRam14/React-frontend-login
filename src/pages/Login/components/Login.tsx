import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormHelperText } from '@mui/material';
import { useLoginMutation } from '../../../features/api/authApi';
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

interface LoginProps {
    setIsSignInComponent: React.Dispatch<React.SetStateAction<boolean>>,
    setIsForgetPasswordComponent: React.Dispatch<React.SetStateAction<boolean>>,
}

const Login: React.FC<LoginProps> = ({ setIsSignInComponent, setIsForgetPasswordComponent }) => {
    const navigate = useNavigate();
    const [emailError, setEmailError] = React.useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState<string>('');
    const [passwordError, setPasswordError] = React.useState<boolean>(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState<string>('');
    const [showPassword, setShowPassword] = React.useState(false);

    //Register API
    const [register, { isLoading, isError, error }] = useLoginMutation();
    const handleLogin = async (email: string, password: string) => {
        try {
            const response = await register({ email, password }).unwrap();
            console.log("Registration response -", response);
            navigate("/home");
        } catch (err) {
            console.error("Registration failed:", err);
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const validateInputs = () => {
        const emailInput = document.getElementById('email') as HTMLInputElement | null;
        const passwordInput = document.getElementById('password') as HTMLInputElement | null;

        // Ensure values are always strings (use empty string fallback)
        const email: string = emailInput?.value.trim() || "";
        const password: string = passwordInput?.value.trim() || "";

        let isValid = true;

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password || password.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (isValid) {
            handleLogin(email, password);
        }
    };

    return (
        <Card variant="outlined">
            <Typography
                component="h1"
                variant="h4"
                sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', display: "flex", justifyContent: "flex-start" }}
            >
                Login
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }} >
                <FormControl>
                    <div style={{ display: 'flex', justifyContent: "flex-start", fontSize: "13px" }}>
                        {/* <span>
                            Already have an account?{" "}
                            <a href="#" style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { setIsSignInComponent(true) }}>
                                Sign in
                            </a>
                        </span> */}
                        <span>
                            Not have an account?{" "}
                            <a href="#" style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { setIsSignInComponent(true) }}>
                                Create account
                            </a>
                        </span>
                    </div>
                </FormControl>
                <FormControl style={{ marginTop: "10px" }}>
                    <FormLabel className="custom-label" htmlFor="email">Email</FormLabel>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        placeholder="your@email.com"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        onChange={() => { setEmailErrorMessage(""); setEmailError(false) }}
                        error={emailError}
                        helperText={emailErrorMessage || " "}
                        color={emailError ? 'error' : 'primary'}
                        InputProps={{ className: 'custom-input' }} // Add class for input field
                        FormHelperTextProps={{ className: 'custom-helper-text' }} // Add class for helper text
                    />
                </FormControl>
                <FormControl>
                    <FormLabel className="custom-label" htmlFor="password">Password</FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="••••••"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        error={passwordError}
                        color={passwordError ? 'error' : 'primary'}
                        variant="outlined" // Ensures outlined styling
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={showPassword ? 'hide the password' : 'display the password'}
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                        size="small"
                                    >
                                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
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
                    <div style={{ display: 'flex', justifyContent: "flex-start", fontSize: "13px" }}>
                        {/* <span>
                            Already have an account?{" "}
                            <a href="#" style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { setIsSignInComponent(true) }}>
                                Sign in
                            </a>
                        </span> */}
                        <span>
                            <a href="#" style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={() => { setIsForgetPasswordComponent(true) }}>
                                Forget password?
                            </a>
                        </span>
                    </div>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                    style={{ marginTop: "10px" }}
                >
                    Login
                </Button>

            </Box>

        </Card>
    );
}

export default Login;
