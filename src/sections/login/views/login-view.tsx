'use client';

import  React from 'react';
import { useState,useEffect, FormEvent } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { signInSchema } from '@/zodValidations';
import { useRouter } from "next/navigation";

// Styled components
const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));



export default function SignIn() {
    const [err, setErr] = useState('');
    const router=useRouter();
   useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            router.push('/'); // Redirect only if token exists on mount
        }
    }, [router])
    // Local state for form fields
    const [email, setEmail] =useState('');
    const [password, setPassword] =useState('');
    const [errors, setErrors] =useState<{ email?: string; password?: string }>({});

    // Handle form submission
    const handleSubmit = async(e:FormEvent) => {
        e.preventDefault();

        // Validate inputs using Zod schema
        const result = signInSchema.safeParse({ email, password });

        if (!result.success) {
            const newErrors: { email?: string; password?: string } = {};
            result.error.errors.forEach((err) => {
                if (err.path[0] === 'email') newErrors.email = err.message;
                if (err.path[0] === 'password') newErrors.password = err.message;
            });
            setErrors(newErrors);
        } else {
          
            // Implement the login api
                const response = await fetch('https://dummy-1.hiublue.com/api/login',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                if (!response.ok) {
                  setErr("Invalid email or password");
                }
                const data = await response.json();

                // after successfully login redirect to home page
                if(data.token){
                    localStorage.setItem('token', data.token);
                    window.location.href = '/';
                }
        }
    };

    return (
        <>
            <CssBaseline enableColorScheme />
            <SignInContainer direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        {/* Email Field */}
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                size="small"
                                sx={{ mt: 1 }}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </FormControl>

                        {/* Password Field */}
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                required
                                fullWidth
                                variant="outlined"
                                size="small"
                                sx={{ mt: 1 }}
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                            <Typography component='p' sx={{color:'red'}}>
                                {err}
                            </Typography>
                        </FormControl>

                        {/* Remember Me Checkbox */}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        {/* Submit Button */}
                        <Button type="submit" fullWidth variant="contained">
                            Sign in
                        </Button>

                        {/* Forgot Password Link */}
                        <Link
                            component="button"
                            type="button"
                            onClick={() => {
                                // Forgot password logic
                            }}
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                        >
                            Forgot your password?
                        </Link>
                    </Box>
                </Card>
            </SignInContainer>
        </>
    );
}
