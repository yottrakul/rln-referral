import { type ChangeEvent, useRef, useState } from "react";
import { Input, Avatar, Button, useMergeRefs, VStack } from "@chakra-ui/react";
import { type FieldValues, type UseFormRegister, type Path } from "react-hook-form";

interface ProfilePictureProps<TFormValue extends FieldValues> {
  isDisabled?: boolean;
  label: Path<TFormValue>;
  register: UseFormRegister<TFormValue>;
  src?: string;
}

export default function ProfilePicture<TFormValue extends FieldValues>({
  isDisabled,
  register,
  label,
  src,
}: ProfilePictureProps<TFormValue>) {
  const _inputRef = useRef<HTMLInputElement>(null);
  const { ref: registerRef, onChange, ...rest } = register(label);

  const [preview, setPreview] = useState<string>(src ?? "");

  const inputRef = useMergeRefs(_inputRef, registerRef);

  const handleUploadedFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const urlImage = URL.createObjectURL(file);
    // const blob = new Blob([urlImage], { type: "image/jpeg" });
    // const newFile = new File([blob], file.name, { type: "image/jpeg" });

    setPreview(urlImage);
    await onChange(e);
  };

  const onUpload = () => {
    _inputRef.current?.click();
  };

  const uploadButtonLabel = preview ? "เปลี่ยนรูป" : "อัปโหลดรูป";

  return (
    <VStack>
      <Input
        {...rest}
        type="file"
        hidden
        onChange={handleUploadedFile}
        ref={inputRef}
        accept="image/*"
        // ref={(e) => {
        //   registerRef(e);
        //   inputRef.current = e;
        // }}
      />

      <Avatar src={preview} size={"xl"} />

      <Button isDisabled={isDisabled} colorScheme="purple" onClick={onUpload}>
        {uploadButtonLabel}
      </Button>
    </VStack>
  );
}
