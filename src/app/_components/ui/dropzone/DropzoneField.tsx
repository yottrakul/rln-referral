import { useCallback, useEffect, type FC } from "react";
import { Controller, type FieldValues, type UseFormSetValue, useFormContext } from "react-hook-form";
import { Input, VStack, Icon, Box, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";
import { BsCloudUpload } from "react-icons/bs";
import { MAX_MEDRECORD_IMAGE_FILE_SIZE } from "@/app/_lib/definition";
import { useFileUploadContext } from "@/app/_components/context/FileUploadContext";

interface DropzoneFieldProps {
  multiple?: boolean;
  name: string;
}

interface DropzoneProps {
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  setValue: UseFormSetValue<FieldValues>;
}

export const DropzoneField: FC<DropzoneFieldProps> = ({ name, multiple, ...rest }) => {
  const { control, setValue } = useFormContext();
  return (
    <Controller
      render={({ field: { onChange } }) => (
        <Dropzone
          name={name}
          multiple={multiple}
          setValue={setValue}
          onChange={(e) => onChange(multiple ? e.target.files : e.target.files?.[0] ?? null)}
          {...rest}
        />
      )}
      name={name}
      control={control}
    />
  );
};

const Dropzone: FC<DropzoneProps> = ({ multiple, onChange, name, setValue, ...rest }) => {
  const { addFiles, datas: filesData } = useFileUploadContext();
  const onDrop = useCallback(
    (acceptedFiles: unknown) => {
      // accept เอามาจาก context ที่สร้างไว้
      // เพื่อให้สามารถยังจำค่าเก่าได้
      addFiles(acceptedFiles as File[]);
    },
    [addFiles]
  );

  useEffect(() => {
    // if (filesData.length === 0) return;
    setValue(name, filesData);
  }, [filesData, name, setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple,
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    minSize: 0,
    maxSize: MAX_MEDRECORD_IMAGE_FILE_SIZE,
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
          backgroundColor: isDragActive ? "purple.50" : "transparent",
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

export default DropzoneField;
