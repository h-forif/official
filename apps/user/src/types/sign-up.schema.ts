import z from 'zod';

export const phoneRegex = new RegExp(
  /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
);

export const SignUpSchema = z.object({
  email: z.string().min(1, '이메일은 필수 입력값입니다.'),
  name: z.string().min(1, '이름은 필수 입력값입니다.'),
  department: z.string().min(1, '학과를 선택해주세요.'),
  id: z.string().length(10, '학번은 10자리여야 합니다.'),
  phoneNumber: z.string().regex(phoneRegex, '허용되지 않는 양식입니다.'),
});
