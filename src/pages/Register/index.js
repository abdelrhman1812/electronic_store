// imports.js
import { useFormik } from "formik";
import { useMemo, useRef, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import bgImageLight from "../../assets/Images/bg4-light.jpg";
import bgImageDark from "../../assets/Images/Hero/bg-1.jpg";
import "../../assets/style/registration.css";
import { useTheme } from "../../context/ThemeProvider";
import notify from "../../lib/notify";
import { register } from "../../services/Apis/auth/auth.api";
import MessageError from "../../services/Apis/MessageError";
import MessageSuccess from "../../services/Apis/MessageSuccess";
export {
  bgImageDark,
  bgImageLight,
  BiLoaderCircle,
  FaCircleXmark,
  FaEye,
  IoIosCheckmarkCircleOutline,
  Link,
  MessageError,
  MessageSuccess,
  notify,
  register,
  toast,
  useFormik,
  useMemo,
  useNavigate,
  useRef,
  useState,
  useTheme,
  Yup,
};
