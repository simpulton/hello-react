import axios from 'axios';
import { Course } from '@slvd/api-interfaces';

const baseURL = 'http://localhost:3000/';
const model = 'courses';

const getUrl = () => `${baseURL}${model}`;
const getUrlWithId = (id: string | null) => `${getUrl()}/${id}`;

const load = async () => await axios.get(`${getUrl()}`);
const find = async (id: string) => await axios.get(`${getUrlWithId(id)}`);
const create = async (course: Course) =>
  await axios.post(`${getUrl()}`, course);
const update = async (course: Course) =>
  await axios.put(`${getUrlWithId(course.id)}`, course);
const remove = async (id: string | null) => await axios.delete(`${getUrlWithId(id)}`);

export const coursesApi = {
  load,
  find,
  create,
  update,
  remove,
};
