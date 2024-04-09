"use client";

import { isValidThaiID } from "@/app/_lib";
import {
  Grid,
  GridItem,
  type SystemStyleObject,
  Text,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Hospital } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateRequestProps {
  hospitals: Hospital[];
  containerStyle?: SystemStyleObject;
}

type Step = "patient" | "request" | "summary";

export default function CreateRequest({ hospitals, containerStyle }: CreateRequestProps) {
  const [step, setStep] = useState<Step>("patient");
  // const {} = useForm({
  //   resolver: zodResolver()
  // });

  if (step === "patient") {
    return (
      <div>
        <Grid
          templateAreas={`"header"
                       "main"`}
          gridTemplateRows={"auto 1fr"}
          sx={{
            ...containerStyle,
          }}
        >
          <GridItem area={"header"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              สร้างคำขอ
            </Text>
          </GridItem>

          <GridItem area={"main"}>
            <Text fontSize={"xl"} fontWeight={"bold"}>
              แบบฟอร์มการประเมินและส่งต่อผู้ป่วย
            </Text>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              ข้อมูลผู้ป่วย
            </Text>
            <form>
              <Grid gridTemplateColumns={`repeat(3, 1fr)`} gap={4}>
                <GridItem>
                  <FormControl>
                    <FormLabel>เลขหมายบัตรประชาชน</FormLabel>
                    <Input />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>ชื่อจริง</FormLabel>
                    <Input />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>นามสกุล</FormLabel>
                    <Input />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>เพศ</FormLabel>
                    <Select placeholder="เลือกเพศ">
                      <option>ชาย</option>
                      <option>หญิง</option>
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>วันเกิด</FormLabel>
                    <Input type="date" />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>เบอร์โทรศัพท์</FormLabel>
                    <Input type="tel" />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>บ้านเลขที่</FormLabel>
                    <Input />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>หมู่ที่</FormLabel>
                    <Input />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>แขวง/ตำบล</FormLabel>
                    <Input />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>เขต/อำเภอ</FormLabel>
                    <Input />
                  </FormControl>
                </GridItem>
                <GridItem>
                  <FormControl>
                    <FormLabel>จังหวัด</FormLabel>
                    <Input />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={3}>
                  <VStack>
                    <FormControl>
                      <FormLabel>ข้อมูลการแพ้ยา</FormLabel>
                      <Textarea />
                    </FormControl>
                    <FormControl>
                      <FormLabel>ประวัติการป่วยปัจจุบัน</FormLabel>
                      <Textarea />
                    </FormControl>
                    <FormControl>
                      <FormLabel>ผลการตรวจชันสูตรทางห้องปฎิบัติการที่สำคัญ</FormLabel>
                      <Textarea />
                    </FormControl>
                    <FormControl>
                      <FormLabel>วินิจฉัยโรคขั้นต้น</FormLabel>
                      <Textarea />
                    </FormControl>
                    <FormControl>
                      <FormLabel>การรักษาที่ให้ไว้แล้ว</FormLabel>
                      <Textarea />
                    </FormControl>
                    <FormControl>
                      <FormLabel>สาเหตุการส่งตัว</FormLabel>
                      <Textarea />
                    </FormControl>
                    <FormControl>
                      <FormLabel>สิทธิ์การรักษา</FormLabel>
                      <Input />
                    </FormControl>
                    <FormControl>
                      <FormLabel>รายละเอียดอื่นๆ</FormLabel>
                      <Textarea />
                    </FormControl>
                    <FormControl>
                      <FormLabel>ลงชื่อ</FormLabel>
                      <Input />
                    </FormControl>
                  </VStack>
                </GridItem>
              </Grid>
            </form>
          </GridItem>
        </Grid>
      </div>
    );
  }

  return null;
}
