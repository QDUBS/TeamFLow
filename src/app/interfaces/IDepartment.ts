export interface IDepartmentCard {
  id?: number;
  name: string;
  subDepartments?: ISubDepartment[];
}

export interface IDepartment {
  id?: number;
  name: string;
  subDepartments?: ISubDepartment[];
}

export interface ISubDepartment {
  name: string;
  department: string;
}

export interface IUpdateDepartment {
  name: string;
}

export interface IUpdateSubDepartment {
  name: string;
  department: string;
}

export interface DepartmentProps {
  name: string;
  departmentId: number;
  onEdit: () => void;
  onDelete: () => void;
}
