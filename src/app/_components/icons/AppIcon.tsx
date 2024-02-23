import { Box, type BoxProps, forwardRef } from "@chakra-ui/react";

const AppIcon = forwardRef<BoxProps, "svg">((props, ref) => (
  <Box boxSize={"10rem"} ref={ref} {...props}>
    <svg width="100%" height="100%" viewBox="0 0 46 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M43.8125 16.9375L36.9375 6.125M36.9375 6.125L35.375 3.625H33.8125H29.125C28.4375 3.625 27.875 4.1875 27.875 4.875V16.125C27.875 16.8125 28.4375 17.375 29.125 17.375H42.875C43.5625 17.375 44.125 16.8125 44.125 16.125V7.375C44.125 6.6875 43.5625 6.125 42.875 6.125H36.9375Z"
        stroke="#F4B400"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.375 9.25H34.75"
        stroke="#F4B400"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.375 11.75H32.875"
        stroke="#F4B400"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 31.5H19V16.5H3V31.5H6"
        stroke="#4285F4"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 33.5C25.1046 33.5 26 32.6046 26 31.5C26 30.3954 25.1046 29.5 24 29.5C22.8954 29.5 22 30.3954 22 31.5C22 32.6046 22.8954 33.5 24 33.5Z"
        stroke="#4285F4"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 33.5C9.10457 33.5 10 32.6046 10 31.5C10 30.3954 9.10457 29.5 8 29.5C6.89543 29.5 6 30.3954 6 31.5C6 32.6046 6.89543 33.5 8 33.5Z"
        stroke="#4285F4"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M26 31.5H29V25.5L25 20.5H19V31.5H22"
        stroke="#4285F4"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 17.5H24"
        stroke="#DB4437"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 20.5V26.5"
        stroke="#DB4437"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 23.5H14"
        stroke="#DB4437"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </Box>
));

export default AppIcon;
