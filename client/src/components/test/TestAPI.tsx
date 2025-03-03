import { Button, Fieldset, Input, Stack } from "@chakra-ui/react";
import { Field } from "../ui/field";
import userServices from "@/services/userServices";
import blogServices from "@/services/blogServices";

const TestAPI = () => {
  const { fetchUsername } = userServices();
  const { fetchBlogByID } = blogServices();

  const handleOnClick = async () => {
    const blog = await fetchBlogByID("67bf0a269f4d936bf5500add");
    if (blog?.authorUserID) {
      const authorID = blog.authorUserID;

      const username = await fetchUsername(authorID);
      alert(`Username is: ${username}`);
    }
  };
  return (
    <Fieldset.Root size="lg" maxW="md" spaceY={16}>
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field label="Name" invalid={true}>
          <Input name="name" />
          <Fieldset.ErrorText>Error</Fieldset.ErrorText>
        </Field>

        <Field label="Email address">
          <Input name="email" type="email" />
        </Field>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  );
};

export default TestAPI;
