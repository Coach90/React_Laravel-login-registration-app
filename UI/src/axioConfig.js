import { BASE_URL } from "./config";
import axios from "axios";
import { useSelector } from "react-redux";

export const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
  });