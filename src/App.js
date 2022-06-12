import "./App.css";
import {
  VechaiProvider,
  Button,
  extendTheme,
  colors,
  Image,
} from "@vechaiui/react";
import { useState } from "react";

const cool = {
  id: "cool",
  type: "dark",
  colors: {
    bg: {
      base: colors.coolGray["900"],
      fill: colors.coolGray["900"],
    },
    text: {
      foreground: colors.coolGray["100"],
      muted: colors.coolGray["300"],
    },
    primary: colors.cyan,
    neutral: colors.coolGray,
  },
};

const theme = extendTheme({
  cursor: "pointer",
  colorSchemes: {
    cool,
  },
});

function App() {
  const [gif, setGif] = useState(null);
  const [loading, setLoading] = useState(false);

  const vh =
    Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    ) - 120;
  const footer = {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    top: `${vh}px`,
  };

  const handleClick = () => {
    fetch("http://localhost:5000/api/v1/gif")
      .then((response) => response.json())
      .then((json) => {
        console.log(json.gif.url);
        setGif(json.gif.url);
      });
  };

  return (
    <VechaiProvider theme={theme} colorScheme="cool">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "40px",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        <Button
          onClick={() => {
            handleClick();
          }}
        >
          Get random gif
        </Button>
        {gif ? (
          <>
            <Image
              alt="image"
              htmlWidth={300}
              htmlHeight={300}
              className="object-cover"
              src={gif}
            />
          </>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-center align-center" style={footer}>
        by kintell33
      </div>
    </VechaiProvider>
  );
}

export default App;
