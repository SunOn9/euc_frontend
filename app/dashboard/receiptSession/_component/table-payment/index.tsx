// "use client";
// import React, { useEffect, useState } from "react";
// import { Table } from "antd";
// import type { TableProps } from "antd";
// import {
//   ActionType,
//   DataType,
//   intoTable,
//   statusColorMapMoneyMethod,
// } from "./type";
// import {
//   Modal,
//   Button,
//   Chip,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   Tooltip,
// } from "@nextui-org/react";
// import {
//   EyeIcon,
//   EditIcon,
//   DeleteIcon,
//   AddIcon,
//   SearchIcon,
// } from "@/components/icons";
// import { paymentRemove } from "@/service/api/payment/remove";
// import { useQueryClient } from "@tanstack/react-query";
// import { ToastType, customToast } from "@/components/hooks/useToast";
// import { Payment } from "@/generated/payment/payment";
// import { paymentDetail } from "@/service/api/payment/detail";
// import PaymentForm from "../form-create-receipt";
// import { PaymentSession } from "@/generated/paymentSession/paymentSession";
// import { EnumProto_SessionStatus } from "@/generated/enumps";

// type Props = {
//   paymentSession: PaymentSession;
//   onChange: CallableFunction;
// };

// export default function PaymentTable(props: Props) {
//   const columns: TableProps<DataType>["columns"] = [
//     {
//       title: "STT",
//       dataIndex: "stt",
//       width: 15,
//     },
//     {
//       title: "Tiêu đề",
//       dataIndex: "title",
//       width: 30,
//     },
//     {
//       title: "Mô tả",
//       dataIndex: "description",
//       width: 30,
//     },
//     {
//       title: "Số tiền",
//       dataIndex: "amount",
//       width: 30,
//     },
//     {
//       title: "Ngày tạo",
//       dataIndex: "createdAt",
//       width: 30,
//     },

//     {
//       title: "Phương thức",
//       dataIndex: "method",
//       width: 30,
//       render: (value) => {
//         return (
//           <Chip
//             className="capitalize"
//             color={statusColorMapMoneyMethod[value]}
//             size="sm"
//             variant="flat"
//           >
//             {value}
//           </Chip>
//         );
//       },
//     },
//     {
//       title: "Biến động quỹ",
//       dataIndex: "fundAmount",
//       width: 30,
//     },
//     {
//       title: "Hành động",
//       dataIndex: "action",
//       width: 15,
//       fixed: "right",
//       render: (value: ActionType) => {
//         if (value.isDeleted) {
//           return null;
//         } else
//           return (
//             <div className="relative flex items-center">
//               {/* <Tooltip content="Chi tiết">
//                 <Button
//                   className="text-md text-default-400 cursor-pointer active:opacity-50"
//                   variant="light"
//                   isIconOnly
//                   disableRipple
//                   disableAnimation
//                   startContent={<EyeIcon />}
//                   onPress={() => {
//                     router.push(`payment/${value.id}`);
//                   }}
//                 />
//               </Tooltip> */}
//               {/* <Tooltip content="Sửa">
//                 <Button
//                   className="text-md text-default-400 cursor-pointer active:opacity-50"
//                   variant="light"
//                   isIconOnly
//                   disableRipple
//                   disableAnimation
//                   onPress={() => handleOpenPaymentModal(3, value.id)}
//                   startContent={<EditIcon />}
//                 />
//               </Tooltip> */}
//               <Tooltip color="danger" content="Xoá">
//                 <Button
//                   isDisabled={
//                     props.paymentSession.status !==
//                     EnumProto_SessionStatus.JUST_CREATE
//                   }
//                   className="text-md text-danger cursor-pointer active:opacity-50"
//                   variant="light"
//                   isIconOnly
//                   disableRipple
//                   disableAnimation
//                   onPress={() => handleOpen(value.id)}
//                   startContent={<DeleteIcon />}
//                 />
//               </Tooltip>
//             </div>
//           );
//       },
//     },
//   ];

//   const handleOpen = (props: number) => {
//     setOpen(true);
//     setId(props);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setId(0);
//   };

//   const handleOpenPaymentModal = async (type: number) => {
//     setTypeModal(type);
//     setOpenPayment(true);
//   };

//   const handleClosePaymentModal = () => {
//     setTypeModal(0);
//     setOpenPayment(false);
//   };

//   const onRemove = () => {
//     paymentRemove({ id: id })
//       .then((res) => {
//         if (res.statusCode !== 200) {
//           customToast("Xóa phiên chi thất bại", ToastType.ERROR);
//           handleClose();
//           return;
//         }
//         customToast(`Xóa phiên chi Id: ${id} thành công`, ToastType.SUCCESS);
//         queryClient.invalidateQueries(["paymentSearch"]);
//         handleClose();
//         props.onChange();
//       })
//       .catch(() => {
//         customToast(`${err.response?.data?.message}`, ToastType.ERROR);
//         handleClose();
//         return;
//       });
//   };

//   const handleChange = () => {
//     props.onChange();
//   };

//   const [page, setPage] = useState(1);
//   const [open, setOpen] = useState(false);
//   const [openPayment, setOpenPayment] = useState(false);
//   const [typeModal, setTypeModal] = useState(0);
//   const queryClient = useQueryClient();
//   const [id, setId] = useState(0);
//   const [paymentList, setPaymentList] = useState<Payment[]>([]);

//   useEffect(() => {
//     setPaymentList(props.paymentSession.payment);
//   }, [props.paymentSession]);

//   return (
//     <div>
//       <div className="flex items-center	 max-w-lg py-4">
//         <Button
//           isDisabled={
//             props.paymentSession.status !== EnumProto_SessionStatus.JUST_CREATE
//           }
//           color="primary"
//           className="bold text-sm cursor-pointer active:opacity-50"
//           disableRipple
//           disableAnimation
//           startContent={<AddIcon />}
//           onPress={() => handleOpenPaymentModal(1)}
//         >
//           Tạo phiên chi{" "}
//         </Button>
//       </div>

//       <Table
//         size="small"
//         className="pt-4"
//         columns={columns}
//         dataSource={intoTable(paymentList, page)}
//         rowKey={(record) => record.action.id}
//         pagination={false}
//         // pagination={{
//         //   total: total,
//         //   defaultPageSize: 5,
//         //   current: page,
//         //   onChange: (page) => {
//         //     setPage(page);
//         //     setPaymentSearchParam({
//         //       page: page,
//         //     });
//         //   },
//         //   showSizeChanger: false,
//         // }}
//         bordered
//         scroll={{
//           x: 1300,
//         }}
//       />
//       <Modal
//         size="xs"
//         isOpen={open}
//         onClose={handleClose}
//         placement="top-center"
//         isDismissable={false}
//       >
//         <ModalContent>
//           <>
//             <ModalHeader className="flex flex-col">Xoá</ModalHeader>
//             <ModalBody>Xác nhận xoá dữ liệu này?</ModalBody>
//             <ModalFooter>
//               <Button
//                 className="bold"
//                 color="danger"
//                 variant="flat"
//                 onPress={handleClose}
//               >
//                 Huỷ
//               </Button>
//               <Button className="bold" color="primary" onPress={onRemove}>
//                 Xoá
//               </Button>
//             </ModalFooter>
//           </>
//         </ModalContent>
//       </Modal>
//       <Modal
//         isOpen={openPayment}
//         onClose={handleClosePaymentModal}
//         size="2xl"
//         isDismissable={false}
//       >
//         <ModalContent>
//           <ModalHeader className="">
//             {(() => {
//               switch (typeModal) {
//                 case 1:
//                   return <span>Tạo thành viên</span>;
//                 case 2:
//                   return <span>Chi tiết thành viên</span>;
//                 case 3:
//                   return <span>Chỉnh sửa thành viên</span>;
//                 default:
//                   return null;
//               }
//             })()}
//           </ModalHeader>
//           <ModalBody>
//             {(() => {
//               switch (typeModal) {
//                 case 1:
//                   return (
//                     <>
//                       <PaymentForm
//                         onClose={handleClosePaymentModal}
//                         id={props.paymentSession.id}
//                         onChange={handleChange}
//                       />
//                     </>
//                   );

//                 default:
//                   return null;
//               }
//             })()}
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }
