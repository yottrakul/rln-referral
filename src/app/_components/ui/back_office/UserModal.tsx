"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  VStack,
  Avatar,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  Input,
  ModalFooter,
  Box,
  Button,
} from "@chakra-ui/react";

import { UserRegisterWithRefineSchema, UserUpdateSchema, type UserRegisterSchema } from "@/app/_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { PREFIX_NAME_TH as prefixNames } from "@/app/_lib/const";
import type { ModalProps } from "@chakra-ui/react";
import { type Hospital } from "@prisma/client";
import { ROLE_NAME } from "@/app/_lib/definition";
import { useMemo } from "react";
import ProfilePicture from "@/app/_components/ui/ProfilePicture";

// interface UserModalProps extends Omit<ModalProps, "children"> {
//   hospitals: Hospital[];
// }

type UserModalProps =
  | ({
      isEdit?: false;
      hospitals: Hospital[];
      data?: undefined;
    } & Omit<ModalProps, "children">)
  | ({
      isEdit?: true;
      hospitals: Hospital[];
      data: z.infer<typeof UserRegisterSchema> | null;
    } & Omit<ModalProps, "children">);

const UserModal = ({ data, isEdit, hospitals, onClose, ...rest }: UserModalProps) => {
  const schemaForm = useMemo(() => {
    if (isEdit) {
      return UserUpdateSchema;
    }
    return UserRegisterWithRefineSchema;
  }, [isEdit]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof schemaForm>>({
    resolver: zodResolver(schemaForm),
    defaultValues: isEdit
      ? {
          prefixName: data?.prefixName,
          firstName: data?.firstName,
          lastName: data?.lastName,
          name: data?.name,
          email: data?.email,
          hospitalId: data?.hospitalId,
          role: data?.role,
          // image: data?.image,
        }
      : undefined,
  });

  const onSubmit = (value: z.infer<typeof schemaForm>) => {
    console.log(value);
  };

  if (data !== null) {
    return (
      <Modal onClose={onClose} {...rest}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้งาน"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex>
                  <ProfilePicture register={register} label="image" />
                  {/* <Input {...register("image")} type="file" /> */}
                  {/* <Controller
                    control={control}
                    name="image"
                    render={({ field: { value, onChange, ...field } }) => {
                      const file = value as File;
                      return (
                        <Input
                          {...field}
                          value={file.name}
                          type="file"
                          onChange={(e) => onChange(e.target.files?.[0])}
                        />
                      );
                    }}
                  /> */}
                  <Box>
                    <FormControl isInvalid={!!errors.prefixName}>
                      <FormLabel>คำนำหน้าชื่อ</FormLabel>
                      <Select {...register("prefixName")} placeholder="-">
                        {prefixNames.map((prefix) => (
                          <option value={prefix} key={prefix}>
                            {prefix}
                          </option>
                        ))}
                      </Select>
                      {errors.prefixName && <FormErrorMessage>{errors.prefixName.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={!!errors.firstName}>
                      <FormLabel>ชื่อจริง</FormLabel>
                      <Input {...register("firstName")} />
                      {errors.firstName && <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={!!errors.lastName}>
                      <FormLabel>นามสกุล</FormLabel>
                      <Input {...register("lastName")} />
                      {errors.lastName && <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={!!errors.name}>
                      <FormLabel>ชื่อผู้ใช้งาน</FormLabel>
                      <Input {...register("name")} />
                      {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={!!errors.password}>
                      <FormLabel>รหัสผ่าน</FormLabel>
                      <Input type="password" {...register("password")} />
                      {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={!!errors.confirmPassword}>
                      <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
                      <Input type="password" {...register("confirmPassword")} />
                      {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={!!errors.email}>
                      <FormLabel>อีเมล</FormLabel>
                      <Input type="email" {...register("email")} />
                      {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={!!errors.hospitalId}>
                      <FormLabel>โรงพยาบาล</FormLabel>
                      <Select {...register("hospitalId")} placeholder="-">
                        {hospitals.map((hospital) => {
                          return (
                            <option key={hospital.id + hospital.hospitalName} value={hospital.id}>
                              {hospital.hospitalName}
                            </option>
                          );
                        })}
                      </Select>
                      {errors.hospitalId && <FormErrorMessage>{errors.hospitalId.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={!!errors.role}>
                      <FormLabel>สิทธิ์การใช้งาน</FormLabel>
                      <Select {...register("role")} placeholder="-">
                        {Object.keys(ROLE_NAME).map((role) => {
                          return (
                            <option key={role} value={role}>
                              {ROLE_NAME[role as keyof typeof ROLE_NAME]}
                            </option>
                          );
                        })}
                      </Select>
                      {errors.role && <FormErrorMessage>{errors.role.message}</FormErrorMessage>}
                    </FormControl>
                  </Box>
                </Flex>
              </form>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={isEdit ? "blue" : "green"} onClick={handleSubmit(onSubmit)}>
              {isEdit ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้"}
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              ยกเลิก
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  } else {
    return (
      <Modal onClose={onClose} {...rest}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้งาน"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Box>ไม่พบข้อมูลผู้ใช้</Box>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose}>
              ปิด
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
};

export default UserModal;
