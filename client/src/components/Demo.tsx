import { Field, Input } from "@chakra-ui/react";

const Demo = () => {
  return (
    <Field.Root invalid={false}>
      <Field.Label>Email</Field.Label>
      <Input placeholder="me@example.com" />
      <Field.ErrorText>This is an error text</Field.ErrorText>
    </Field.Root>
  );
};

export default Demo;
