// imports.js
import { useFormik } from "formik";
import { useMemo, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import "../../assets/style/registration.css";
import { register } from "../../services/Apis/auth/auth.api";
import MessageError from "../../services/Apis/MessageError";
import MessageSuccess from "../../services/Apis/MessageSuccess";

export {
  FaCircleXmark,
  FaEye,
  IoIosCheckmarkCircleOutline,
  Link,
  MessageError,
  MessageSuccess,
  register,
  toast,
  useFormik,
  useMemo,
  useNavigate,
  useRef,
  useState,
  Yup,
};
