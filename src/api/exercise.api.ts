import axios, { AxiosResponse } from 'axios';
import { setupConfig } from './auth.api';

export const fetchExercises = async (): Promise<AxiosResponse> => {
  const config = await setupConfig('GET', '/exercises');
  return axios.request(config);
};
