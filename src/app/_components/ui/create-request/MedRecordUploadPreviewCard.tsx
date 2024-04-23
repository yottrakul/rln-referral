"use client";
import { Tooltip, Card, CardBody, CardFooter, Image, Text, IconButton, type SystemStyleObject } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { formatBytes } from "@/app/_lib";
import React from "react";

interface MedRecordUploadPreviewCardProps {
  imageUrl: string;
  name: string;
  filesize?: number;
  onRemove: () => void;
}

const styled: Record<string, SystemStyleObject> = {
  tooltipStyled: {
    fontSize: "md",
  },
  cardStyled: {
    border: "1px dashed var(--chakra-colors-purple-100)",
    maxWidth: "100%",
    overflow: "hidden",
  },
  iconButtonStyled: {
    position: "absolute",
    top: 2,
    right: 2,
    fontSize: "20px",
    "&:hover": {
      bg: "red.400",
      color: "white",
    },
  },
};

const MedRecordUploadPreviewCard: React.FC<MedRecordUploadPreviewCardProps> = ({
  imageUrl,
  filesize,
  name,
  onRemove,
}) => {
  const [showActions, setShowActions] = React.useState(false);
  const handleRemove = () => {
    onRemove();
  };
  return (
    <Tooltip sx={styled.tooltipStyled} hasArrow label={`${formatBytes(String(filesize))}`} placement="auto">
      <Card
        position={"relative"}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        sx={styled.cardStyled}
      >
        {/* Overlay actions */}

        <IconButton
          sx={styled.iconButtonStyled}
          display={showActions ? "flex" : "none"}
          isRound={true}
          variant="solid"
          aria-label="Remove Image"
          icon={<CloseIcon />}
          onClick={handleRemove}
        />
        <CardBody p={0}>
          <Image maxW={"100%"} aspectRatio={1} objectFit={"cover"} src={imageUrl} alt="upload image" />
        </CardBody>
        <CardFooter px={2} py={1}>
          <Text textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={"hidden"}>
            {name}
          </Text>
        </CardFooter>
      </Card>
    </Tooltip>
  );
};

export default MedRecordUploadPreviewCard;
