import axios from 'axios';
import { ParamsRequest } from './App/App.types';
import { ErrorAxios } from './App/App.types';



axios.defaults.baseURL = 'https://api.unsplash.com/search/photos1';
/* const paramsRequest = {
  query: '',
  client_id: '5oq-O0l79UtWEfgesuk7FNxEhMjgmglWAfYeOAPGJFs',
}; */
export default async function getImagesAPI<T>(paramsRequest: ParamsRequest
): Promise<T> {
      const response = await axios.get('', { params: paramsRequest });
  const data = response.data as T;
  return data;
}
