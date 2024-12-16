import * as yup from "yup";

export const createDepartmentSchema = yup.object().shape({
  id: yup.number().optional(),
  name: yup.string().min(2).required(),
  subDepartments: yup
    .array()
    .of(
      yup.object({
        name: yup.string().min(2).required(),
        department: yup.string().min(2).required(),
      })
    )
    .optional(),
});

export const createSubDepartmentSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  department: yup.string().min(2).required(),
});
