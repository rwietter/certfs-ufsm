import axios from "axios";
import { ipfs } from "./ipfs";

export const api = axios.create({
  baseURL: ipfs,
  headers: {
    'pinata_api_key': process.env.PINATA_API_KEY,
    'pinata_secret_api_key': process.env.PINATA_API_SECRET
  },
});