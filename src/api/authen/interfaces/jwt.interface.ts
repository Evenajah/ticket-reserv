import { USER_ROLE, USER_STATUS } from 'src/shared/enums';

export interface JwtPayload {
  id: string;
  email: string;
  status: USER_STATUS;
  role: USER_ROLE;
}
