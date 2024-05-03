import axios from 'axios';
import { ParamsRequest } from '../components/App/App.types';

const instance = axios.create({
  baseURL: "https://api.unsplash.com/search/photos",
});
export default async function getImagesAPI<T>(paramsRequest: ParamsRequest
): Promise<T> {
      const response = await instance.get('', { params: paramsRequest });
  const data = response.data as T;
  return data;
}