import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImagesSpecificProduct from "../../components/layouts/ShopPage/Products/ProductDetails/ImagesSpecificProduct";
import ProductData from "../../components/layouts/ShopPage/Products/ProductDetails/ProductData";
import ProductTabs from "../../components/layouts/ShopPage/Products/ProductDetails/ProductTaps";
import RelatedProduct from "../../components/layouts/ShopPage/Products/ProductDetails/RelatedProduct";
import IsLoading from "../../components/shared/IsLoading/IsLoading";
import PageHeader from "../../components/shared/PageHeader/PageHeader";
import {
  getProductSpecific,
  getRelatedProducts,
} from "../../services/Apis/productApi/productApi";

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
