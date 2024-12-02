"use client";
// Route: /client/sign-in
import * as React from "react";
import { useRouter } from "next/navigation";
import { CssVarsProvider, useColorScheme } from "@mui/joy/styles";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Checkbox from "@mui/joy/Checkbox";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import IconButton, { IconButtonProps } from "@mui/joy/IconButton";
import Link from "@mui/joy/Link";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import Divider from "@mui/joy/Divider";

// import GoogleIcon from './GoogleIcon';

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

function ColorSchemeToggle(props: IconButtonProps) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <IconButton
      aria-label="toggle light/dark mode"
      size="sm"
      variant="outlined"
      disabled={!mounted}
      onClick={(event) => {
        setMode(mode === "light" ? "dark" : "light");
        onClick?.(event);
      }}
      {...other}
    >
      {mode === "light" ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function JoySignIn() {
  const router = useRouter();

  const handleIconClick = () => {
    router.push("/client"); // Navigate to /client when clicked
  };

  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
      <GlobalStyles
        styles={{
          ":root": {
            "--Form-maxWidth": "800px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: { xs: "100%", md: "100%" },
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ gap: 2, display: "flex", alignItems: "center" }}>
              <IconButton
                variant="soft"
                color="primary"
                size="sm"
                onClick={handleIconClick}
              >
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Imaginarium of Vancouver</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: "hidden",
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Typography component="h1" level="h3">
                Sign in
              </Typography>

              {/* <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Continue with Google
              </Button> */}
            </Stack>

            <Stack gap={4} sx={{ mt: 2 }}>
              <form
                onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                  event.preventDefault();
                  const formElements = event.currentTarget.elements;
                  const data = {
                    email: formElements.email.value,
                    password: formElements.password.value,
                    persistent: formElements.persistent.checked,
                  };
                  alert(JSON.stringify(data, null, 2));
                }}
              >
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox size="sm" label="Remember me" name="persistent" />
                    <Link
                      level="title-sm"
                      href="#replace-with-a-link"
                      sx={(theme) => ({
                        [theme.getColorSchemeSelector("light")]: {
                          color: { xs: "#text.tertiary", md: "text.tertiary" },
                        },
                        [theme.getColorSchemeSelector("dark")]: {
                          color: { xs: "#d3d3d3", md: "#d3d3d3" },
                        },
                      })}
                    >
                      Forgot your password?
                    </Link>
                  </Box>
                  <Button type="submit" fullWidth>
                    Sign in
                  </Button>
                  <Divider
                    color="transparent" // Keeps the text color customizable while not affecting the line
                    sx={(theme) => ({
                      "&::before, &::after": {
                        borderWidth: "0.1px", // Default red color for the divider line (light mode)
                        // In dark mode, change the divider line color to #d3d3d3
                        [theme.getColorSchemeSelector("dark")]: {
                          borderColor: "#d3d3d3",
                        },
                      },
                      [theme.getColorSchemeSelector("light")]: {
                        color: "#text.tertiary", // Text color for light mode
                      },
                      [theme.getColorSchemeSelector("dark")]: {
                        color: "#d3d3d3", // Text color for dark mode
                      },
                    })}
                  >
                    or
                  </Divider>

                  <Typography
                    level="body-sm"
                    color="primary"
                    sx={(theme) => ({
                      [theme.getColorSchemeSelector("light")]: {
                        color: { xs: "#text.tertiary", md: "text.tertiary" },
                      },
                      [theme.getColorSchemeSelector("dark")]: {
                        color: { xs: "#d3d3d3", md: "#d3d3d3" },
                      },
                    })}
                  >
                    New to here?{" "}
                    <Link
                      href="/client/sign-up"
                      level="title-sm"
                      sx={(theme) => ({
                        [theme.getColorSchemeSelector("light")]: {
                          color: { xs: "#text.tertiary", md: "text.tertiary" },
                        },
                        [theme.getColorSchemeSelector("dark")]: {
                          color: { xs: "#d3d3d3", md: "#d3d3d3" },
                        },
                      })}
                    >
                      Create an account
                    </Link>
                  </Typography>
                </Stack>
              </form>
            </Stack>
          </Box>

          <Box component="footer" sx={{ py: 3 }}>
            <Typography
              level="body-xs"
              textAlign="center"
              sx={(theme) => ({
                [theme.getColorSchemeSelector("light")]: {
                  color: { xs: "#text.tertiary", md: "text.tertiary" },
                },
                [theme.getColorSchemeSelector("dark")]: {
                  color: { xs: "#d3d3d3", md: "#d3d3d3" },
                },
              })}
            >
              © Imaginarium of Vancouver {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
