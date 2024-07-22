import regex from '@utils/regex';
import z from 'zod';

export const SignUpSchema = z.object({
  email: z.string().min(1, '이메일은 필수 입력값입니다.'),
  name: z.string().min(1, '이름은 필수 입력값입니다.'),
  department: z.string().min(1, '학과를 선택해주세요.'),
  id: z.string().length(10, '학번은 10자리여야 합니다.'),
  phoneNumber: z.string().regex(regex.phoneNumber, '허용되지 않는 양식입니다.'),
  privacyPolicyAccepted: z.boolean({
    message: '개인정보 처리방침에 동의해주세요.',
  }),
});
