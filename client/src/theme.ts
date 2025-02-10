import { defineConfig, createSystem } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        "bg.default": {
          value: { base: "{gray.50}", _dark: "{gray.950}" },
        },
      },
    },
  },
});

export default createSystem(config);
