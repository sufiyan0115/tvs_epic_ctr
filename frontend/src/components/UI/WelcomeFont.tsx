import { Text } from "@mantine/core";

const WelcomeFont = (props:any) => {
  return (
    <Text
      style={{
        fontSize: "2rem",
        fontWeight: "bold",
        marginBottom: "1rem",
        textAlign: "center",
        padding: "10px",
        ...props.style,
      }}
      inline
      component="span"
      gradient={{ from: "blue", to: "cyan", deg: 45 }}
      variant="gradient"
    >
      {props.children}
    </Text>
  );
};

export default WelcomeFont;
