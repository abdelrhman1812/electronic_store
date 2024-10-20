// src/pages/index.js
import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { FaEye } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useCartContext } from "../../context/CartContext";
import { useUserContext } from "../../context/UserContext";
import { useWishListContext } from "../../context/WishlistContext";
import { login } from "../../services/Apis/auth/auth.api";
import MessageError from "../../services/Apis/MessageError";
import MessageSuccess from "../../services/Apis/MessageSuccess";

export {
  BiLoaderCircle,
  FaCircleXmark,
  FaEye,
  IoIosCheckmarkCircleOutline,
  Link,
  login,
  MessageError,
  MessageSuccess,
  toast,
  useCartContext,
  useFormik,
  useMemo,
  useNavigate,
  useState,
  useUserContext,
  useWishListContext,
  Yup,
};
