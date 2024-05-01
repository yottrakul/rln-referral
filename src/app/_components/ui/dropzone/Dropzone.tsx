import { Input, VStack, Icon, Box, Text } from "@chakra-ui/react";
import type React from "react";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";

interface DropzoneProps {
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Dropzone: React.FC<DropzoneProps> = ({ multiple, onChange, ...rest }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    ...rest,
  });
  return (
    <Box {...getRootProps()}>
      <Input {...getInputProps({ onChange })} />
      {/* Dropzone */}
      <Box
        sx={{
          border: "2px dashed var(--chakra-colors-purple-400)",
          borderRadius: "md",
          paddingY: "3rem",
          textAlign: "center",
        }}
      >
        <VStack>
          <Icon
            _hover={{
              color: "purple.400",
            }}
            as={BsCloudUpload}
            boxSize={20}
            color={"purple.500"}
            cursor={"pointer"}
          />
          <Text as={"b"}>
            ลาก & วางไฟล์รูปภาพหรือ{" "}
            <Text
              _hover={{
                textColor: "purple.400",
              }}
              as="ins"
              cursor={"pointer"}
              textColor={"purple.500"}
            >
              เลือกไฟล์
            </Text>
          </Text>
          <Text>ไฟล์ที่รองรับ: JPEG, JPG, PNG</Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dropzone;
