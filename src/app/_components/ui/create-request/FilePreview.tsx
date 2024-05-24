import { useFileUploadContext } from "@/app/_components/context/FileUploadContext";
import PreviewCard from "@/app/_components/ui/create-request/MedRecordUploadPreviewCard";
import { AbsoluteCenter, Box, Divider, SimpleGrid } from "@chakra-ui/react";

const FilePreview = () => {
  const { datas: filesData, deleteFile } = useFileUploadContext();
  if (filesData.length === 0) return null;
  return (
    <Box>
      <Box position="relative" paddingBlock={4}>
        <Divider borderColor={"purple.200"} />
        <AbsoluteCenter bg="white" px="4" whiteSpace={"nowrap"}>
          รายการ Upload
        </AbsoluteCenter>
      </Box>
      <SimpleGrid
        sx={{
          overflow: "clip",
          overflowY: "scroll",
          overflowClipMargin: "10px",
          "&::-webkit-scrollbar": {
            width: "7px",
          },
        }}
        maxH={"378px"}
        columns={{ base: 2, md: 4, lg: 6 }}
        spacing={4}
      >
        {filesData.map((file) => {
          return (
            <PreviewCard
              imageUrl={URL.createObjectURL(file.data)}
              name={file.data.name}
              filesize={file.data.size}
              onRemove={() => deleteFile(file.id)}
              key={file.id}
            />
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default FilePreview;
