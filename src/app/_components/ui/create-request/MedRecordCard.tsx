import {
  Card,
  Heading,
  CardBody,
  VStack,
  HStack,
  Text,
  Box,
  Menu,
  Flex,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { InfoIcon, DownloadIcon, AttachmentIcon, DeleteIcon } from "@chakra-ui/icons";
import { useCallback, type FC } from "react";
import { MdOutlinePendingActions } from "react-icons/md";
import type { MedRecItem } from "@/app/_lib/definition";
import { useQuery } from "@tanstack/react-query";
import { getHopitalNameFromDoctorId } from "@/app/_actions/create-request/actions";
import { getUserById } from "@/app/_actions/back_office";
import { type getMedicalRecordsByCaseId } from "@/app/_actions/create-request/actions";

export type RemoteMedicDatas = Awaited<ReturnType<typeof getMedicalRecordsByCaseId>>;
export type RemoteMedicData = RemoteMedicDatas[0];

interface MedRecordCardProps {
  isPreview?: boolean;
  medicalData?: MedRecItem;
  remoteMedicData?: RemoteMedicData;
  onRemove?: () => void;
  onDownload?: (key: string) => void;
  onViewDetail?: (data: string) => void;
}

const MedRecordCard: FC<MedRecordCardProps> = ({
  isPreview,
  onDownload,
  onRemove,
  onViewDetail,
  medicalData,
  remoteMedicData,
}) => {
  const {
    data: doctorData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["hospitalName"],
    queryFn: async () => {
      if (!medicalData) throw new Error("No medical data");
      const hospitalName = getHopitalNameFromDoctorId(medicalData?.doctorId ?? "");
      const doctorName = getUserById(medicalData?.doctorId ?? "");

      const [a1, a2] = await Promise.all([hospitalName, doctorName]);

      if (a1.success && a2) {
        return {
          hospitalName: a1.data,
          doctorData: a2,
        };
      } else {
        throw new Error("Cannot fetch hospital name");
      }
    },
    staleTime: 0,
    enabled: isPreview,
  });

  const menuItemRender = useCallback(() => {
    if (isPreview) {
      return (
        <MenuItem onClick={onRemove} icon={<DeleteIcon color="red.400" boxSize={4} />}>
          ลบ
        </MenuItem>
      );
    } else {
      return [
        <MenuItem
          onClick={() => {
            return onViewDetail && remoteMedicData ? onViewDetail(remoteMedicData.detail) : null;
          }}
          key={"info"}
          icon={<InfoIcon />}
        >
          ดูรายละเอียด
        </MenuItem>,
        <MenuItem
          isDisabled={!remoteMedicData?.fileKey}
          onClick={() => {
            return onDownload && remoteMedicData ? onDownload(remoteMedicData.fileKey ?? "") : null;
          }}
          key={"download-pdf"}
          icon={<DownloadIcon />}
        >
          ดาวโหลด PDF
        </MenuItem>,
      ];
    }
  }, [isPreview, onDownload, onViewDetail, onRemove, remoteMedicData]);

  return (
    <Card>
      <CardBody>
        <Flex justifyContent={"space-between"}>
          <HStack spacing={5}>
            {isPreview ? (
              <Icon as={MdOutlinePendingActions} boxSize={10} color={"purple.400"} alignSelf={"start"} />
            ) : (
              <AttachmentIcon boxSize={10} color={"purple.400"} alignSelf={"start"} />
            )}

            <VStack alignItems={"stretch"}>
              <Heading size="sm">ประวัติการรักษาผู้ป่วย</Heading>
              <Box>
                <Text>
                  {!isPreview
                    ? remoteMedicData?.doctor.name ?? "ไม่พบข้อมูลชื่อแพทย์"
                    : isLoading
                      ? "กำลังโหลดข้อมูล..."
                      : isError
                        ? "ไม่สามารถโหลดข้อมูลแพทย์ได้"
                        : doctorData?.doctorData.name ?? "ไม่พบข้อมูลชื่อแพทย์"}
                </Text>
                <Text>
                  {!isPreview
                    ? remoteMedicData?.doctor.hospital?.hospitalName ?? "ไม่พบข้อมูลโรงพยาบาล"
                    : isLoading
                      ? "กำลังโหลดข้อมูล..."
                      : isError
                        ? "ไม่สามารถโหลดข้อมูล รพ. ได้"
                        : doctorData?.hospitalName ?? "ไม่พบข้อมูลโรงพยาบาล"}
                </Text>
                {!isPreview && remoteMedicData?.caseId && <Text>CaseId: {remoteMedicData.caseId}</Text>}
                {!isPreview && <Text>วันที่สร้าง {remoteMedicData?.createdAt.toLocaleDateString("en-GB")}</Text>}
              </Box>
            </VStack>
          </HStack>
          <Box alignSelf={"start"} justifySelf={"end"}>
            <Menu>
              <MenuButton>
                <BsThreeDots fontSize={"1.3rem"} color="var(--chakra-colors-purple-500)" />
              </MenuButton>
              <MenuList>{menuItemRender()}</MenuList>
            </Menu>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MedRecordCard;
