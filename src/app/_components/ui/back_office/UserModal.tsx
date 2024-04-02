"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  Input,
  ModalFooter,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";

import { UserRegisterWithRefineSchema, UserUpdateSchema } from "@/app/_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { PREFIX_NAME_TH as prefixNames } from "@/app/_lib/const";
import type { ModalProps } from "@chakra-ui/react";
import { type Hospital } from "@prisma/client";
import { ROLE_NAME, type UserWithOutPassword } from "@/app/_lib/definition";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProfilePicture from "@/app/_components/ui/ProfilePicture";
import { uploadFile } from "@/app/_actions/s3/actions";
import { createUser, getUserByEmail } from "@/app/_actions/back_office";

// interface UserModalProps extends Omit<ModalProps, "children"> {
//   hospitals: Hospital[];
// }

export type AccountType = "oauth" | "credential";

type UserModalProps =
  | ({
      isEdit?: false;
      hospitals: Hospital[];
      data?: undefined;
      account?: undefined;
    } & Omit<ModalProps, "children">)
  | ({
      isEdit?: true;
      hospitals: Hospital[];
      data: UserWithOutPassword | null;
      account?: AccountType;
    } & Omit<ModalProps, "children">);

const UserModal = ({ account = "credential", data, isEdit, hospitals, onClose, ...rest }: UserModalProps) => {
  const toast = useToast();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOAuth = useMemo(() => account === "oauth", [account]);

  useEffect(() => {
    if (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error ?? "",
        status: "error",
      });
    }
  }, [error, toast]);

  const schemaForm = useMemo(() => {
    if (isEdit) {
      return UserUpdateSchema;
    }
    return UserRegisterWithRefineSchema;
  }, [isEdit]);

  const {
    handleSubmit,
    register,
    reset,
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

  const onSubmit = async (value: z.infer<typeof schemaForm>) => {
    setIsPending(true);
    const formDataImage = new FormData();

    const handleSubmit = async () => {
      setError(null);
      if (isEdit) {
        console.log(value);
        setIsPending(false);
      } else {
        let imageKey: string | undefined = "";

        // Upload image
        if (value.image) {
          formDataImage.append("image", value.image);
          try {
            const userExited = await getUserByEmail(value.email ?? "");
            if (userExited) {
              throw new Error("User already exists");
            }
            const res = await uploadFile(formDataImage);
            if (res.success) {
              console.log(res.data);
              imageKey = res.data;
            }
          } catch (error) {
            if (error instanceof Error) {
              setError(error.message);
            }
            setIsPending(false);
            throw new Error("Upload image failed");
          }
        }
        console.log("imageKey:", imageKey);

        // Create user
        const newUser = {
          ...value,
          image: imageKey ? imageKey : null,
        };

        try {
          const res = await createUser(newUser);
          if (res.success) {
            console.log(res.data);
            reset();
            onClose();
          } else {
            throw new Error("Create user failed");
          }
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }
          throw new Error("Create user failed");
        } finally {
          setIsPending(false);
        }
      }
    };

    toast.promise(handleSubmit(), {
      success: {
        title: isEdit ? "แก้ไขผู้ใช้สำเร็จ" : "สร้างผู้ใช้สำเร็จ",
      },
      error: {
        title: isEdit ? "แก้ไขผู้ใช้ไม่สำเร็จ" : "สร้างผู้ใช้ไม่สำเร็จ",
      },
      loading: {
        title: isEdit ? "กำลังแก้ไขผู้ใช้..." : "กำลังสร้างผู้ใช้...",
      },
    });
  };

  const handleOnClose = useCallback(() => {
    if (isPending) return;
    reset();
    onClose();
  }, [onClose, reset, isPending]);

  if (data !== null) {
    return (
      <Modal onClose={handleOnClose} {...rest}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้งาน"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                <Flex>
                  <ProfilePicture
                    src={data?.image ?? undefined}
                    isDisabled={isPending || isOAuth}
                    register={register}
                    label="image"
                  />
                  <Box>
                    <FormControl isRequired isInvalid={!!errors.prefixName}>
                      <FormLabel>คำนำหน้าชื่อ</FormLabel>
                      <Select isDisabled={isPending} {...register("prefixName")} placeholder="-">
                        {prefixNames.map((prefix) => (
                          <option value={prefix} key={prefix}>
                            {prefix}
                          </option>
                        ))}
                      </Select>
                      {errors.prefixName && <FormErrorMessage>{errors.prefixName.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isReadOnly={isPending} isRequired isInvalid={!!errors.firstName}>
                      <FormLabel>ชื่อจริง</FormLabel>
                      <Input {...register("firstName")} />
                      {errors.firstName && <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isReadOnly={isPending} isRequired isInvalid={!!errors.lastName}>
                      <FormLabel>นามสกุล</FormLabel>
                      <Input {...register("lastName")} />
                      {errors.lastName && <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isReadOnly={isPending} isRequired isInvalid={!!errors.name}>
                      <FormLabel>ชื่อผู้ใช้งาน</FormLabel>
                      <Input {...register("name")} />
                      {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl
                      isDisabled={isOAuth}
                      isReadOnly={isPending}
                      isRequired={!isEdit}
                      isInvalid={!!errors.password}
                    >
                      <FormLabel>รหัสผ่าน</FormLabel>
                      <Input type="password" {...register("password")} />
                      {errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl
                      isDisabled={isOAuth}
                      isReadOnly={isPending}
                      isRequired={!isEdit}
                      isInvalid={!!errors.confirmPassword}
                    >
                      <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
                      <Input type="password" {...register("confirmPassword")} />
                      {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl
                      isDisabled={isOAuth || isEdit}
                      isReadOnly={isPending}
                      isRequired={!isEdit}
                      isInvalid={!!errors.email}
                    >
                      <FormLabel>อีเมล</FormLabel>
                      <Input type="email" {...register("email")} />
                      {errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                    </FormControl>
                    <FormControl isInvalid={!!errors.hospitalId}>
                      <FormLabel>โรงพยาบาล</FormLabel>
                      <Select isDisabled={isPending} {...register("hospitalId")} placeholder="-">
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
                    <FormControl isRequired isInvalid={!!errors.role}>
                      <FormLabel>สิทธิ์การใช้งาน</FormLabel>
                      <Select isDisabled={isPending} {...register("role")} placeholder="-">
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
            <Button isDisabled={isPending} colorScheme={isEdit ? "blue" : "green"} onClick={handleSubmit(onSubmit)}>
              {isEdit ? "แก้ไขผู้ใช้" : "เพิ่มผู้ใช้"}
            </Button>
            <Button isDisabled={isPending} colorScheme="red" onClick={handleOnClose}>
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
