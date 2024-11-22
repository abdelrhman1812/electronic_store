import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImagesSpecificProduct from "../../components/layouts/Products/ImagesSpecificProduct";
import ProductData from "../../components/layouts/Products/ProductData";
import ProductTabs from "../../components/layouts/Products/ProductTaps";
import RelatedProduct from "../../components/layouts/Products/RelatedProduct";
import IsLoading from "../../components/shared/IsLoading/IsLoading";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import {
  getProductSpecific,
  getRelatedProducts,
} from "../../services/Apis/productApi/ProductApi";

export {
  getProductSpecific,
  getRelatedProducts,
  ImagesSpecificProduct,
  IsLoading,
  PageHeader,
  ProductData,
  ProductTabs,
  RelatedProduct,
  useCallback,
  useEffect,
  useParams,
  useState,
};
