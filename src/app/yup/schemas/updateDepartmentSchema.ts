import * as yup from "yup";

export const updateDepartmentSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().min(2).required(),
});

export const updateSubDepartmentSchema = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().min(2).required(),
  department: yup.string().min(2).required(),
});
