import { Box, type SystemStyleObject, Card, CardHeader, Heading, CardBody } from "@chakra-ui/react";
import type { FC } from "react";

interface ChatProps {
  containerStyle?: SystemStyleObject;
}

const Chat: FC<ChatProps> = ({ containerStyle }) => {
  return (
    <Box sx={containerStyle}>
      <Card minH={"100%"} variant={"solid"}>
        <CardHeader>
          <Heading as={"h3"} size={"md"}>
            Chat
          </Heading>
        </CardHeader>
        <CardBody>Coming Soon</CardBody>
      </Card>
    </Box>
  );
};

export default Chat;
