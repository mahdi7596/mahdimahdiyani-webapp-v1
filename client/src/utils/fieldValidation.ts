export type FieldValidation = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
};

export const validateField = (value: string, rules: FieldValidation) => {
  if (rules.required && !value) {
    return "پر کردن این فیلد الزامی است";
  }

  if (rules.minLength && value.length < rules.minLength) {
    return `حداقل طول ${rules.minLength} کاراکتر است`;
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    return `طول حداکثر ${rules.maxLength} کاراکتر است`;
  }

  if (rules.email && !/\S+@\S+\.\S+/.test(value)) {
    return "لطفاً یک آدرس ایمیل معتبر وارد کنید";
  }

  return null; // No error
};
