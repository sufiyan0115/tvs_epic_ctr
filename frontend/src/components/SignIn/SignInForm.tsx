import { TextInput, Button, LoadingOverlay } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import {useForm} from "@mantine/form"
import { Card } from "@mantine/core";


const SignInForm = () => {
  const { login, loading, adminLogin } = useAuth();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) => value.trim().length > 7,
    },
    errorMessages: {
      email: "Please enter a valid email",
      password: "Password must contain 8 letters",
    },
  });

  const formSubmitHandler = form.onSubmit((values, event) => {
    if (admin) {
      adminLogin(values);
    } else {
      login(values);
    }
  });

  return (
    <Card shadow="sm" style={{ width: "100%" }}>
      <form onSubmit={formSubmitHandler} style={{ width: "100%" }}>
        <LoadingOverlay visible={loading} />
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          onBlur={() => form.validateField("email")}
          style={{ padding: "10px" }}
        />

        <PasswordInput
          placeholder="Password"
          label="Password"
          description=""
          required
          {...form.getInputProps("password")}
          onBlur={() => form.validateField("password")}
          style={{ padding: "10px" }}
        />

        <Button type="submit" style={{ margin: "10px" }}>
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default SignInForm;
